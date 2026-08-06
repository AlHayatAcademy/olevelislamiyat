import {
  collection,
  doc,
  setDoc,
  getDoc,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  Timestamp,
  QueryConstraint,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface LeaderboardEntry {
  userId: string;
  userName: string;
  userEmail: string;
  classId: string;
  rank: number;
  score: number;
  quizzesCompleted: number;
  topicsCompleted: number;
  streak: number;
  badges: string[];
  lastUpdated: Timestamp;
}

export interface LeaderboardStats {
  totalStudents: number;
  averageScore: number;
  topScorer: LeaderboardEntry | null;
  bottomScorer: LeaderboardEntry | null;
}

export async function calculateLeaderboard(classId: string): Promise<LeaderboardEntry[]> {
  try {
    // Fetch all quiz attempts for the class
    const attemptsQ = query(
      collection(db, 'quiz_attempts'),
      where('classId', '==', classId)
    );
    const attemptsSnapshot = await getDocs(attemptsQ);

    // Group by user
    const userStats: {
      [userId: string]: {
        name: string;
        email: string;
        scores: number[];
        quizzes: string[];
        topics: Set<string>;
        lastAttempt: Timestamp;
      };
    } = {};

    attemptsSnapshot.docs.forEach((doc) => {
      const attempt = doc.data();
      const userId = attempt.userId;
      const topicId = attempt.topicId || attempt.quizId;

      if (!userStats[userId]) {
        userStats[userId] = {
          name: attempt.userName || 'Unknown',
          email: attempt.userEmail || '',
          scores: [],
          quizzes: [],
          topics: new Set(),
          lastAttempt: attempt.timestamp || Timestamp.now(),
        };
      }

      userStats[userId].scores.push(attempt.scorePercent || 0);
      userStats[userId].quizzes.push(attempt.quizId);
      userStats[userId].topics.add(topicId);
      userStats[userId].lastAttempt = attempt.timestamp;
    });

    // Fetch badges for each user
    const userBadges: { [userId: string]: string[] } = {};
    const badgesQ = query(collection(db, 'badges'));
    const badgesSnapshot = await getDocs(badgesQ);

    badgesSnapshot.docs.forEach((doc) => {
      const badge = doc.data();
      if (!userBadges[badge.userId]) {
        userBadges[badge.userId] = [];
      }
      userBadges[badge.userId].push(badge.id);
    });

    // Calculate streaks
    const userStreaks: { [userId: string]: number } = {};
    const attemptsPerDay: {
      [userId: string]: Set<string>;
    } = {};

    attemptsSnapshot.docs.forEach((doc) => {
      const attempt = doc.data();
      const userId = attempt.userId;
      const date = attempt.timestamp?.toDate?.()?.toDateString() || '';

      if (!attemptsPerDay[userId]) {
        attemptsPerDay[userId] = new Set();
      }
      attemptsPerDay[userId].add(date);
    });

    Object.entries(attemptsPerDay).forEach(([userId, dates]) => {
      userStreaks[userId] = dates.size; // Simplified streak (days with attempts)
    });

    // Create leaderboard entries
    const entries: LeaderboardEntry[] = Object.entries(userStats).map(
      ([userId, stats], index) => ({
        userId,
        userName: stats.name,
        userEmail: stats.email,
        classId,
        rank: index + 1,
        score: Math.round(
          stats.scores.reduce((a, b) => a + b, 0) / stats.scores.length || 0
        ),
        quizzesCompleted: new Set(stats.quizzes).size,
        topicsCompleted: stats.topics.size,
        streak: userStreaks[userId] || 0,
        badges: userBadges[userId] || [],
        lastUpdated: Timestamp.now(),
      })
    );

    // Sort by score descending
    entries.sort((a, b) => b.score - a.score);

    // Update ranks
    entries.forEach((entry, index) => {
      entry.rank = index + 1;
    });

    // Save to Firestore
    for (const entry of entries) {
      const docId = `${classId}_${entry.userId}`;
      await setDoc(doc(db, 'leaderboards', docId), entry);
    }

    return entries;
  } catch (error) {
    console.error('Error calculating leaderboard:', error);
    return [];
  }
}

export async function getLeaderboard(
  classId: string,
  sortBy: 'score' | 'progress' | 'streak' = 'score',
  limitCount: number = 100
): Promise<LeaderboardEntry[]> {
  try {
    const constraints: QueryConstraint[] = [
      where('classId', '==', classId),
    ];

    switch (sortBy) {
      case 'score':
        constraints.push(orderBy('score', 'desc'));
        break;
      case 'progress':
        constraints.push(orderBy('topicsCompleted', 'desc'));
        break;
      case 'streak':
        constraints.push(orderBy('streak', 'desc'));
        break;
    }

    constraints.push(limit(limitCount));

    const q = query(collection(db, 'leaderboards'), ...constraints);
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => doc.data() as LeaderboardEntry);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }
}

export async function getUserRank(
  userId: string,
  classId: string
): Promise<number | null> {
  try {
    const docId = `${classId}_${userId}`;
    const snapshot = await getDoc(doc(db, 'leaderboards', docId));

    if (snapshot.exists()) {
      return (snapshot.data() as LeaderboardEntry).rank;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user rank:', error);
    return null;
  }
}

export async function getTopPerformers(
  classId: string,
  limitCount: number = 10
): Promise<LeaderboardEntry[]> {
  try {
    const q = query(
      collection(db, 'leaderboards'),
      where('classId', '==', classId),
      orderBy('rank', 'asc'),
      limit(limitCount)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data() as LeaderboardEntry);
  } catch (error) {
    console.error('Error fetching top performers:', error);
    return [];
  }
}

export async function getLeaderboardStats(
  classId: string
): Promise<LeaderboardStats> {
  try {
    const q = query(
      collection(db, 'leaderboards'),
      where('classId', '==', classId)
    );
    const snapshot = await getDocs(q);

    const entries = snapshot.docs.map((doc) => doc.data() as LeaderboardEntry);

    if (entries.length === 0) {
      return {
        totalStudents: 0,
        averageScore: 0,
        topScorer: null,
        bottomScorer: null,
      };
    }

    entries.sort((a, b) => b.score - a.score);
    const averageScore = Math.round(
      entries.reduce((sum, e) => sum + e.score, 0) / entries.length
    );

    return {
      totalStudents: entries.length,
      averageScore,
      topScorer: entries[0] || null,
      bottomScorer: entries[entries.length - 1] || null,
    };
  } catch (error) {
    console.error('Error fetching leaderboard stats:', error);
    return {
      totalStudents: 0,
      averageScore: 0,
      topScorer: null,
      bottomScorer: null,
    };
  }
}

export async function updateLeaderboard(classId: string): Promise<void> {
  try {
    // This function is called daily via Firebase Cloud Function
    // or can be called manually to refresh leaderboard
    await calculateLeaderboard(classId);
  } catch (error) {
    console.error('Error updating leaderboard:', error);
    throw error;
  }
}

export async function getStudentLeaderboardPosition(
  userId: string,
  classId: string
): Promise<LeaderboardEntry | null> {
  try {
    const docId = `${classId}_${userId}`;
    const snapshot = await getDoc(doc(db, 'leaderboards', docId));

    if (snapshot.exists()) {
      return snapshot.data() as LeaderboardEntry;
    }
    return null;
  } catch (error) {
    console.error('Error fetching student leaderboard position:', error);
    return null;
  }
}

export async function getRankThreshold(
  classId: string,
  percentile: number // 0-100
): Promise<number | null> {
  try {
    const entries = await getLeaderboard(classId, 'score', 1000);

    if (entries.length === 0) return null;

    const index = Math.ceil((percentile / 100) * entries.length) - 1;
    return entries[index]?.score || null;
  } catch (error) {
    console.error('Error fetching rank threshold:', error);
    return null;
  }
}
