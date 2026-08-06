import {
  callClaude,
  getEducationSystemPrompt,
} from "./ai-service";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export interface LearningPath {
  id: string;
  userId: string;
  classId: string;
  recommendedTopics: RecommendedTopic[];
  completedTopics: string[];
  currentTopic: string | null;
  mastery: {
    [topicId: string]: number; // 0-100
  };
  estimatedTimeRemaining: number; // minutes
  lastUpdated: Timestamp;
}

export interface RecommendedTopic {
  topicId: string;
  topicName: string;
  priority: "urgent" | "high" | "medium" | "low";
  reason: string;
  estimatedTime: number; // minutes
  difficulty: "beginner" | "intermediate" | "advanced";
}

// Generate learning path based on quiz performance
export async function generateLearningPath(
  userId: string,
  classId: string,
): Promise<LearningPath> {
  try {
    // Get quiz attempts to analyze performance
    const attemptsRef = collection(db, "quiz_attempts");
    const q = query(
      attemptsRef,
      where("userId", "==", userId),
      where("classId", "==", classId),
      orderBy("timestamp", "desc"),
      limit(50),
    );

    const snapshot = await getDocs(q);
    const attempts = snapshot.docs.map((doc) => doc.data());

    if (attempts.length === 0) {
      // No attempts yet, recommend all topics
      return createInitialLearningPath(userId, classId);
    }

    // Analyze performance by topic
    const topicPerformance = analyzePerformance(attempts);

    // Get all available topics
    const allTopics = await getAvailableTopics(classId);

    // Use Claude to generate recommendations
    const recommendations = await generateRecommendations(
      topicPerformance,
      allTopics,
    );

    // Calculate total time remaining
    const totalTime = recommendations.reduce(
      (sum, rec) => sum + rec.estimatedTime,
      0,
    );

    const completedTopics = Object.keys(topicPerformance).filter(
      (topicId) => topicPerformance[topicId].score >= 80,
    );

    const learningPath: LearningPath = {
      id: `${userId}_${classId}`,
      userId,
      classId,
      recommendedTopics: recommendations,
      completedTopics,
      currentTopic: recommendations.length > 0 ? recommendations[0].topicId : null,
      mastery: topicPerformance,
      estimatedTimeRemaining: totalTime,
      lastUpdated: Timestamp.now(),
    };

    // Save to Firestore
    await setDoc(doc(db, "learning_paths", learningPath.id), learningPath);

    return learningPath;
  } catch (err) {
    console.error("Failed to generate learning path:", err);
    return createInitialLearningPath(userId, classId);
  }
}

// Create initial path for new students
async function createInitialLearningPath(
  userId: string,
  classId: string,
): Promise<LearningPath> {
  const topics = await getAvailableTopics(classId);

  const recommendations: RecommendedTopic[] = topics
    .slice(0, 5)
    .map((topic, index) => ({
      topicId: topic.id,
      topicName: topic.name,
      priority: index === 0 ? "high" : "medium",
      reason: "Start with fundamentals",
      estimatedTime: 30,
      difficulty: "beginner",
    }));

  const path: LearningPath = {
    id: `${userId}_${classId}`,
    userId,
    classId,
    recommendedTopics: recommendations,
    completedTopics: [],
    currentTopic: recommendations.length > 0 ? recommendations[0].topicId : null,
    mastery: {},
    estimatedTimeRemaining: 150,
    lastUpdated: Timestamp.now(),
  };

  await setDoc(doc(db, "learning_paths", path.id), path);

  return path;
}

// Analyze quiz performance
function analyzePerformance(attempts: any[]): {
  [topicId: string]: { score: number; attempts: number }
} {
  const performance: {
    [topicId: string]: { score: number; attempts: number }
  } = {};

  attempts.forEach((attempt) => {
    const topicId = attempt.quizId;

    if (!performance[topicId]) {
      performance[topicId] = { score: 0, attempts: 0 };
    }

    performance[topicId].score =
      (performance[topicId].score + (attempt.scorePercent || 0)) / 2;
    performance[topicId].attempts++;
  });

  return performance;
}

// Get available topics for class
async function getAvailableTopics(
  classId: string,
): Promise<{ id: string; name: string }[]> {
  try {
    const quizzesRef = collection(db, "quizzes");
    const q = query(quizzesRef, where("classId", "==", classId), limit(100));

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().title,
    }));
  } catch (err) {
    console.error("Failed to get topics:", err);
    return [];
  }
}

// Generate recommendations using Claude
async function generateRecommendations(
  performance: { [topicId: string]: { score: number; attempts: number } },
  allTopics: { id: string; name: string }[],
): Promise<RecommendedTopic[]> {
  try {
    // Identify weak areas (score < 70)
    const weakAreas = Object.entries(performance)
      .filter(([_, perf]) => perf.score < 70)
      .map(([topicId, _]) => topicId);

    const completedTopics = Object.entries(performance)
      .filter(([_, perf]) => perf.score >= 80)
      .map(([topicId, _]) => topicId);

    const topicsToRecommend = allTopics.filter(
      (t) =>
        weakAreas.includes(t.id) ||
        (!completedTopics.includes(t.id) && Math.random() > 0.5),
    );

    const prompt = `Based on a student's quiz performance, prioritize these topics for learning:

Weak areas (needs review): ${weakAreas
      .map((id) => allTopics.find((t) => t.id === id)?.name)
      .join(", ") || "None"}

Topics to study: ${topicsToRecommend.map((t) => t.name).join(", ")}

For each topic, return JSON with:
{
  "topicId": "id",
  "priority": "urgent|high|medium|low",
  "reason": "why this is recommended",
  "estimatedTime": 30,
  "difficulty": "beginner|intermediate|advanced"
}

Format as array. Prioritize weak areas first.`;

    const response = await callClaude(prompt, {
      maxTokens: 1000,
      temperature: 0.5,
      systemPrompt: getEducationSystemPrompt(),
    });

    try {
      const recommendations = JSON.parse(response.content);

      return recommendations
        .map((rec: any) => ({
          topicId: rec.topicId,
          topicName: allTopics.find((t) => t.id === rec.topicId)?.name || rec.topicId,
          priority: rec.priority,
          reason: rec.reason,
          estimatedTime: rec.estimatedTime || 30,
          difficulty: rec.difficulty,
        }))
        .sort((a: RecommendedTopic, b: RecommendedTopic) => {
          const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        })
        .slice(0, 10);
    } catch (e) {
      // Fallback: recommend weak areas
      return weakAreas
        .map((id) => ({
          topicId: id,
          topicName: allTopics.find((t) => t.id === id)?.name || id,
          priority: "high" as const,
          reason: "Low performance detected",
          estimatedTime: 30,
          difficulty: "intermediate" as const,
        }))
        .slice(0, 5);
    }
  } catch (err) {
    console.error("Failed to generate recommendations:", err);
    return [];
  }
}

// Get current learning path
export async function getLearningPath(
  userId: string,
  classId: string,
): Promise<LearningPath | null> {
  try {
    const docRef = doc(db, "learning_paths", `${userId}_${classId}`);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;

    return docSnap.data() as LearningPath;
  } catch (err) {
    console.error("Failed to get learning path:", err);
    return null;
  }
}

// Update progress on topic
export async function updatePathProgress(
  userId: string,
  classId: string,
  topicId: string,
  scorePercent: number,
): Promise<void> {
  try {
    const pathRef = doc(db, "learning_paths", `${userId}_${classId}`);
    const pathSnap = await getDoc(pathRef);

    if (!pathSnap.exists()) {
      console.warn("Learning path not found");
      return;
    }

    const path = pathSnap.data() as LearningPath;

    // Update mastery score
    const currentMastery = path.mastery[topicId] || 0;
    const newMastery = Math.max(currentMastery, scorePercent);

    // Check if topic is completed
    if (newMastery >= 80 && !path.completedTopics.includes(topicId)) {
      path.completedTopics.push(topicId);
    }

    // Update document
    path.mastery[topicId] = newMastery;
    path.lastUpdated = Timestamp.now();

    await setDoc(pathRef, path);
  } catch (err) {
    console.error("Failed to update path progress:", err);
  }
}

// Get next recommended topics
export async function getNextTopics(
  userId: string,
  classId: string,
  count: number = 3,
): Promise<RecommendedTopic[]> {
  try {
    const path = await getLearningPath(userId, classId);

    if (!path) {
      return [];
    }

    // Return top recommended topics not yet completed
    return path.recommendedTopics
      .filter((topic) => !path.completedTopics.includes(topic.topicId))
      .slice(0, count);
  } catch (err) {
    console.error("Failed to get next topics:", err);
    return [];
  }
}

// Estimate time to complete remaining topics
export async function getTimeRemaining(
  userId: string,
  classId: string,
): Promise<number> {
  try {
    const path = await getLearningPath(userId, classId);

    if (!path) {
      return 0;
    }

    return path.estimatedTimeRemaining;
  } catch (err) {
    console.error("Failed to get time remaining:", err);
    return 0;
  }
}

// Get mastery score (0-100)
export async function getMasteryScore(
  userId: string,
  classId: string,
): Promise<number> {
  try {
    const path = await getLearningPath(userId, classId);

    if (!path || Object.keys(path.mastery).length === 0) {
      return 0;
    }

    const scores = Object.values(path.mastery);
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  } catch (err) {
    console.error("Failed to get mastery score:", err);
    return 0;
  }
}

// Get progress summary
export async function getProgressSummary(
  userId: string,
  classId: string,
): Promise<{
  totalTopics: number;
  completedTopics: number;
  masterPercent: number;
  timeRemaining: number;
}> {
  try {
    const path = await getLearningPath(userId, classId);

    if (!path) {
      return {
        totalTopics: 0,
        completedTopics: 0,
        masterPercent: 0,
        timeRemaining: 0,
      };
    }

    const totalTopics = Object.keys(path.mastery).length;
    const completedTopics = path.completedTopics.length;
    const masterPercent = Math.round(
      (completedTopics / Math.max(totalTopics, 1)) * 100,
    );

    return {
      totalTopics,
      completedTopics,
      masterPercent,
      timeRemaining: path.estimatedTimeRemaining,
    };
  } catch (err) {
    console.error("Failed to get progress summary:", err);
    return {
      totalTopics: 0,
      completedTopics: 0,
      masterPercent: 0,
      timeRemaining: 0,
    };
  }
}
