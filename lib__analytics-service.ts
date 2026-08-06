import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  Timestamp,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";

export interface StudentAnalytics {
  userId: string;
  totalQuizzes: number;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  totalTimeSpent: number; // seconds
  quizzesThisWeek: number;
  scoreThisWeek: number;
  engagementScore: number; // 0-100
  topicsStarted: number;
  topicsCompleted: number;
  currentStreak: number;
  lastActiveDate: Date | null;
}

export interface ClassAnalytics {
  classId: string;
  className: string;
  totalStudents: number;
  averageScore: number;
  completionRate: number; // 0-100
  engagementRate: number; // 0-100
  topPerformers: { userId: string; name: string; score: number }[];
  needsSupport: { userId: string; name: string; score: number }[];
  commonWeakTopics: { topic: string; percentage: number }[];
}

export interface QuizAnalyticsRecord {
  id: string;
  userId: string;
  quizId: string;
  quizTitle: string;
  classId: string;
  score: number;
  maxScore: number;
  percentage: number;
  timeSpent: number; // seconds
  attemptNumber: number;
  timestamp: Timestamp;
}

export interface PerformanceTrend {
  date: string;
  score: number;
  attemptCount: number;
}

// Get student analytics
export async function getStudentAnalytics(
  userId: string,
  classId: string,
): Promise<StudentAnalytics> {
  try {
    const q = query(
      collection(db, "quiz_attempts"),
      where("userId", "==", userId),
      where("classId", "==", classId),
      orderBy("timestamp", "desc"),
    );

    const snapshot = await getDocs(q);
    const attempts = snapshot.docs.map((doc) => doc.data()) as any[];

    if (attempts.length === 0) {
      return {
        userId,
        totalQuizzes: 0,
        averageScore: 0,
        highestScore: 0,
        lowestScore: 0,
        totalTimeSpent: 0,
        quizzesThisWeek: 0,
        scoreThisWeek: 0,
        engagementScore: 0,
        topicsStarted: 0,
        topicsCompleted: 0,
        currentStreak: 0,
        lastActiveDate: null,
      };
    }

    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const thisWeek = attempts.filter(
      (a) => a.timestamp?.toDate?.() >= oneWeekAgo,
    );

    const scores = attempts.map((a) => a.scorePercent || 0);
    const totalTime = attempts.reduce((sum, a) => sum + (a.timeSpent || 0), 0);

    return {
      userId,
      totalQuizzes: attempts.length,
      averageScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      highestScore: Math.max(...scores),
      lowestScore: Math.min(...scores),
      totalTimeSpent: totalTime,
      quizzesThisWeek: thisWeek.length,
      scoreThisWeek:
        thisWeek.length > 0
          ? Math.round(
              thisWeek.reduce((sum, a) => sum + (a.scorePercent || 0), 0) /
                thisWeek.length,
            )
          : 0,
      engagementScore: calculateEngagementScore(attempts),
      topicsStarted: new Set(attempts.map((a) => a.quizId)).size,
      topicsCompleted: attempts.filter((a) => (a.scorePercent || 0) >= 80).length,
      currentStreak: calculateStreak(attempts),
      lastActiveDate: attempts[0]?.timestamp?.toDate?.() || null,
    };
  } catch (err) {
    console.error("Failed to get student analytics:", err);
    return {
      userId,
      totalQuizzes: 0,
      averageScore: 0,
      highestScore: 0,
      lowestScore: 0,
      totalTimeSpent: 0,
      quizzesThisWeek: 0,
      scoreThisWeek: 0,
      engagementScore: 0,
      topicsStarted: 0,
      topicsCompleted: 0,
      currentStreak: 0,
      lastActiveDate: null,
    };
  }
}

// Get class analytics
export async function getClassAnalytics(
  classId: string,
): Promise<ClassAnalytics> {
  try {
    // Get all attempts for class
    const q = query(
      collection(db, "quiz_attempts"),
      where("classId", "==", classId),
      orderBy("timestamp", "desc"),
      limit(1000),
    );

    const snapshot = await getDocs(q);
    const attempts = snapshot.docs.map((doc) => doc.data()) as any[];

    if (attempts.length === 0) {
      const classDoc = await getDoc(doc(db, "classes", classId));
      return {
        classId,
        className: classDoc.data()?.name || "Unknown",
        totalStudents: classDoc.data()?.studentCount || 0,
        averageScore: 0,
        completionRate: 0,
        engagementRate: 0,
        topPerformers: [],
        needsSupport: [],
        commonWeakTopics: [],
      };
    }

    // Group by user
    const byUser: { [userId: string]: any[] } = {};
    attempts.forEach((attempt) => {
      if (!byUser[attempt.userId]) {
        byUser[attempt.userId] = [];
      }
      byUser[attempt.userId].push(attempt);
    });

    // Calculate per-user metrics
    const userMetrics = Object.entries(byUser).map(([userId, userAttempts]) => {
      const scores = userAttempts.map((a) => a.scorePercent || 0);
      return {
        userId,
        averageScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
        highScore: Math.max(...scores),
        attempts: userAttempts.length,
      };
    });

    // Sort by average score
    userMetrics.sort((a, b) => b.averageScore - a.averageScore);

    const classDoc = await getDoc(doc(db, "classes", classId));
    const classData = classDoc.data();

    // Get user names
    const topPerformers = userMetrics
      .slice(0, 5)
      .map((m) => ({
        userId: m.userId,
        name: `Student ${m.userId.slice(0, 8)}`,
        score: m.averageScore,
      }));

    const needsSupport = userMetrics
      .filter((m) => m.averageScore < 60)
      .slice(0, 5)
      .map((m) => ({
        userId: m.userId,
        name: `Student ${m.userId.slice(0, 8)}`,
        score: m.averageScore,
      }));

    // Find weak topics
    const byTopic: { [topicId: string]: any[] } = {};
    attempts.forEach((attempt) => {
      if (!byTopic[attempt.quizId]) {
        byTopic[attempt.quizId] = [];
      }
      byTopic[attempt.quizId].push(attempt);
    });

    const weakTopics = Object.entries(byTopic)
      .map(([topicId, topicAttempts]) => {
        const scores = topicAttempts.map((a) => a.scorePercent || 0);
        const avgScore =
          scores.reduce((a, b) => a + b, 0) / scores.length;
        return {
          topic: topicId,
          percentage: Math.round(avgScore),
          failureRate: Math.round(
            (topicAttempts.filter((a) => (a.scorePercent || 0) < 60).length /
              topicAttempts.length) *
              100,
          ),
        };
      })
      .filter((t) => t.percentage < 70)
      .sort((a, b) => a.percentage - b.percentage)
      .slice(0, 5);

    const allScores = attempts.map((a) => a.scorePercent || 0);
    const avgScore = Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length);

    return {
      classId,
      className: classData?.name || "Unknown",
      totalStudents: classData?.studentCount || 0,
      averageScore: avgScore,
      completionRate: Math.round(
        (attempts.filter((a) => (a.scorePercent || 0) >= 80).length /
          attempts.length) *
          100,
      ),
      engagementRate: Math.round(
        (userMetrics.filter((m) => m.attempts >= 3).length /
          userMetrics.length) *
          100,
      ),
      topPerformers,
      needsSupport,
      commonWeakTopics: weakTopics.map((t) => ({
        topic: t.topic,
        percentage: t.percentage,
      })),
    };
  } catch (err) {
    console.error("Failed to get class analytics:", err);
    return {
      classId,
      className: "Unknown",
      totalStudents: 0,
      averageScore: 0,
      completionRate: 0,
      engagementRate: 0,
      topPerformers: [],
      needsSupport: [],
      commonWeakTopics: [],
    };
  }
}

// Get performance trend for student
export async function getPerformanceTrend(
  userId: string,
  classId: string,
  days: number = 30,
): Promise<PerformanceTrend[]> {
  try {
    const q = query(
      collection(db, "quiz_attempts"),
      where("userId", "==", userId),
      where("classId", "==", classId),
      orderBy("timestamp", "asc"),
    );

    const snapshot = await getDocs(q);
    const attempts = snapshot.docs.map((doc) => doc.data()) as any[];

    // Group by date
    const byDate: { [date: string]: any[] } = {};
    attempts.forEach((attempt) => {
      const date = attempt.timestamp?.toDate?.()?.toISOString?.()?.split("T")[0];
      if (date) {
        if (!byDate[date]) {
          byDate[date] = [];
        }
        byDate[date].push(attempt);
      }
    });

    // Convert to trend data
    return Object.entries(byDate)
      .map(([date, dailyAttempts]) => ({
        date,
        score: Math.round(
          dailyAttempts.reduce((sum, a) => sum + (a.scorePercent || 0), 0) /
            dailyAttempts.length,
        ),
        attemptCount: dailyAttempts.length,
      }))
      .slice(-days);
  } catch (err) {
    console.error("Failed to get performance trend:", err);
    return [];
  }
}

// Get topic-specific analytics
export async function getTopicAnalytics(
  classId: string,
  quizId: string,
): Promise<{
  topic: string;
  attempts: number;
  averageScore: number;
  passRate: number;
  averageTime: number;
}> {
  try {
    const q = query(
      collection(db, "quiz_attempts"),
      where("classId", "==", classId),
      where("quizId", "==", quizId),
    );

    const snapshot = await getDocs(q);
    const attempts = snapshot.docs.map((doc) => doc.data()) as any[];

    if (attempts.length === 0) {
      return {
        topic: quizId,
        attempts: 0,
        averageScore: 0,
        passRate: 0,
        averageTime: 0,
      };
    }

    const scores = attempts.map((a) => a.scorePercent || 0);
    const times = attempts.map((a) => a.timeSpent || 0);

    return {
      topic: quizId,
      attempts: attempts.length,
      averageScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      passRate: Math.round(
        (attempts.filter((a) => (a.scorePercent || 0) >= 60).length /
          attempts.length) *
          100,
      ),
      averageTime: Math.round(times.reduce((a, b) => a + b, 0) / times.length),
    };
  } catch (err) {
    console.error("Failed to get topic analytics:", err);
    return {
      topic: quizId,
      attempts: 0,
      averageScore: 0,
      passRate: 0,
      averageTime: 0,
    };
  }
}

// Calculate engagement score
function calculateEngagementScore(attempts: any[]): number {
  if (attempts.length === 0) return 0;

  const recentAttempts = attempts.slice(0, 10);
  const avgScore =
    recentAttempts.reduce((sum, a) => sum + (a.scorePercent || 0), 0) /
    recentAttempts.length;
  const consistency =
    100 -
    Math.abs(
      avgScore -
        recentAttempts.reduce((sum, a) => sum + (a.scorePercent || 0), 0) /
          recentAttempts.length,
    );

  return Math.round((avgScore * 0.7 + consistency * 0.3) / 100 * 100);
}

// Calculate current study streak
function calculateStreak(attempts: any[]): number {
  if (attempts.length === 0) return 0;

  const sortedByDate = attempts.sort((a, b) => {
    const dateA = a.timestamp?.toDate?.() || new Date();
    const dateB = b.timestamp?.toDate?.() || new Date();
    return dateB.getTime() - dateA.getTime();
  });

  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  for (const attempt of sortedByDate) {
    const attemptDate = attempt.timestamp?.toDate?.() || new Date();
    attemptDate.setHours(0, 0, 0, 0);

    const diffTime = Math.abs(currentDate.getTime() - attemptDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0 || (diffDays === 1 && streak > 0)) {
      streak++;
      currentDate = new Date(attemptDate);
    } else {
      break;
    }
  }

  return streak;
}

// Get quiz attempts for specific period
export async function getQuizAttempts(
  userId: string,
  classId: string,
  limit_: number = 50,
): Promise<QuizAnalyticsRecord[]> {
  try {
    const q = query(
      collection(db, "quiz_attempts"),
      where("userId", "==", userId),
      where("classId", "==", classId),
      orderBy("timestamp", "desc"),
      limit(limit_),
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    } as QuizAnalyticsRecord));
  } catch (err) {
    console.error("Failed to get quiz attempts:", err);
    return [];
  }
}

// Get class performance distribution
export async function getScoreDistribution(
  classId: string,
): Promise<{ range: string; count: number }[]> {
  try {
    const q = query(
      collection(db, "quiz_attempts"),
      where("classId", "==", classId),
      limit(500),
    );

    const snapshot = await getDocs(q);
    const attempts = snapshot.docs.map((doc) => doc.data()) as any[];

    const ranges = {
      "0-20": 0,
      "21-40": 0,
      "41-60": 0,
      "61-80": 0,
      "81-100": 0,
    };

    attempts.forEach((attempt) => {
      const score = attempt.scorePercent || 0;
      if (score <= 20) ranges["0-20"]++;
      else if (score <= 40) ranges["21-40"]++;
      else if (score <= 60) ranges["41-60"]++;
      else if (score <= 80) ranges["61-80"]++;
      else ranges["81-100"]++;
    });

    return Object.entries(ranges).map(([range, count]) => ({
      range,
      count,
    }));
  } catch (err) {
    console.error("Failed to get score distribution:", err);
    return [];
  }
}
