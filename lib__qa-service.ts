import {
  callClaude,
  streamClaude,
  getEducationSystemPrompt,
} from "./ai-service";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export interface QARecord {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  classId: string;
  question: string;
  answer: string;
  sources: string[]; // topic IDs referenced
  sourceTopics: string[]; // topic names
  followUpQuestions: string[];
  helpful: boolean | null;
  rating: number; // 1-5 if rated
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface QuestionAnalysis {
  relevantTopics: string[];
  estimatedLevel: "beginner" | "intermediate" | "advanced";
  category: string;
}

// Find relevant topics for a question
export async function findRelevantTopics(
  question: string,
  classId: string,
): Promise<{ topicId: string; topicName: string; relevance: number }[]> {
  try {
    // Get all quiz topics for the class
    const quizzesRef = collection(db, "quizzes");
    const q = query(
      quizzesRef,
      where("classId", "==", classId),
      limit(100),
    );

    const snapshot = await getDocs(q);
    const topics = snapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().title,
    }));

    if (topics.length === 0) return [];

    // Use Claude to find relevant topics
    const topicsList = topics.map((t) => `- ${t.name}`).join("\n");

    const response = await callClaude(
      `Given this student question, identify which of these topics are relevant:

Question: "${question}"

Available Topics:
${topicsList}

Return a JSON array with topic IDs and relevance scores (0-1):
[{"topicId": "id", "relevance": 0.9}, ...]

Response:`,
      {
        maxTokens: 500,
        temperature: 0.3,
      },
    );

    try {
      const relevantTopics = JSON.parse(response.content);
      return relevantTopics.map((topic: any) => ({
        topicId: topic.topicId,
        topicName: topics.find((t) => t.id === topic.topicId)?.name || "",
        relevance: topic.relevance,
      }));
    } catch (e) {
      return [];
    }
  } catch (err) {
    console.error("Failed to find relevant topics:", err);
    return [];
  }
}

// Analyze question complexity
export async function analyzeQuestion(
  question: string,
): Promise<QuestionAnalysis> {
  try {
    const response = await callClaude(
      `Analyze this Islamic Studies student question and return JSON with analysis:

Question: "${question}"

Return JSON:
{
  "estimatedLevel": "beginner|intermediate|advanced",
  "category": "concept|hadith|quran|jurisprudence|history|practice|other",
  "complexity": 1-5
}

Response:`,
      {
        maxTokens: 200,
        temperature: 0.3,
      },
    );

    try {
      const analysis = JSON.parse(response.content);
      return {
        relevantTopics: [],
        estimatedLevel: analysis.estimatedLevel || "beginner",
        category: analysis.category || "concept",
      };
    } catch (e) {
      return {
        relevantTopics: [],
        estimatedLevel: "intermediate",
        category: "concept",
      };
    }
  } catch (err) {
    console.error("Failed to analyze question:", err);
    return {
      relevantTopics: [],
      estimatedLevel: "intermediate",
      category: "concept",
    };
  }
}

// Answer student question
export async function answerQuestion(
  question: string,
  context: {
    userId: string;
    userEmail: string;
    userName: string;
    classId: string;
    topicId?: string;
  },
): Promise<QARecord> {
  try {
    // Find relevant topics
    const topics = await findRelevantTopics(question, context.classId);
    const topicIds = topics.map((t) => t.topicId);
    const topicNames = topics.map((t) => t.topicName);

    // Build context-aware prompt
    let contextStr = "";
    if (topicNames.length > 0) {
      contextStr = `This question relates to these topics: ${topicNames.join(", ")}. `;
    }

    const prompt = `Answer this Islamic Studies student question:

${contextStr}
Question: "${question}"

Guidelines:
1. Answer clearly and accurately
2. Cite relevant Quranic verses or Hadith if applicable
3. Relate to the student's level (secondary school - age 14-18)
4. Include ONE real-world example or application
5. Suggest 2-3 follow-up questions
6. Keep answer concise but comprehensive (3-5 paragraphs)

If uncertain about something, explain your uncertainty respectfully.

Answer:`;

    const response = await callClaude(prompt, {
      maxTokens: 1024,
      temperature: 0.7,
      systemPrompt: getEducationSystemPrompt(),
      userId: context.userId,
    });

    // Generate follow-up questions
    let followUpQuestions: string[] = [];
    try {
      // Extract questions from response if included
      const questionMatches = response.content.match(/\d+\.\s+(.+?)\?/g);
      if (questionMatches) {
        followUpQuestions = questionMatches.slice(0, 3);
      }
    } catch (e) {
      // Ignore parsing errors
    }

    // Save Q&A to Firestore
    const qaRef = await addDoc(collection(db, "ai_qna"), {
      userId: context.userId,
      userEmail: context.userEmail,
      userName: context.userName,
      classId: context.classId,
      question,
      answer: response.content,
      sources: topicIds,
      sourceTopics: topicNames,
      followUpQuestions,
      helpful: null,
      rating: 0,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    return {
      id: qaRef.id,
      userId: context.userId,
      userEmail: context.userEmail,
      userName: context.userName,
      classId: context.classId,
      question,
      answer: response.content,
      sources: topicIds,
      sourceTopics: topicNames,
      followUpQuestions,
      helpful: null,
      rating: 0,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };
  } catch (err) {
    console.error("Failed to answer question:", err);
    throw err;
  }
}

// Stream answer as it's generated
export async function streamAnswer(
  question: string,
  context: {
    userId: string;
    classId: string;
  },
  onChunk: (chunk: string) => void,
): Promise<{ topicIds: string[]; topicNames: string[] }> {
  try {
    // Find relevant topics
    const topics = await findRelevantTopics(question, context.classId);
    const topicIds = topics.map((t) => t.topicId);
    const topicNames = topics.map((t) => t.topicName);

    const contextStr =
      topicNames.length > 0
        ? `This question relates to these topics: ${topicNames.join(", ")}. `
        : "";

    const prompt = `Answer this Islamic Studies student question:

${contextStr}
Question: "${question}"

Provide a comprehensive but concise answer (3-4 paragraphs) that includes:
1. Clear, direct answer
2. Relevant Quranic verse or Hadith if applicable
3. Practical example or application
4. Connection to student's learning

Answer:`;

    await streamClaude(prompt, onChunk, {
      maxTokens: 1024,
      temperature: 0.7,
      systemPrompt: getEducationSystemPrompt(),
      userId: context.userId,
    });

    return { topicIds, topicNames };
  } catch (err) {
    console.error("Failed to stream answer:", err);
    throw err;
  }
}

// Rate answer as helpful/not helpful
export async function rateAnswer(
  qaId: string,
  helpful: boolean,
  rating?: number,
): Promise<void> {
  try {
    const docRef = doc(db, "ai_qna", qaId);

    await updateDoc(docRef, {
      helpful,
      rating: rating || 0,
      updatedAt: Timestamp.now(),
    });
  } catch (err) {
    console.error("Failed to rate answer:", err);
  }
}

// Get Q&A history for user
export async function getQAHistory(
  userId: string,
  limitCount: number = 20,
): Promise<QARecord[]> {
  try {
    const q = query(
      collection(db, "ai_qna"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
      limit(limitCount),
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    } as QARecord));
  } catch (err) {
    console.error("Failed to get Q&A history:", err);
    return [];
  }
}

// Get unanswered questions in class (for teacher)
export async function getUnansweredQuestions(
  classId: string,
): Promise<{ question: string; askedBy: string; count: number; id: string }[]> {
  try {
    const q = query(
      collection(db, "ai_qna"),
      where("classId", "==", classId),
      where("helpful", "==", false),
      orderBy("createdAt", "desc"),
      limit(50),
    );

    const snapshot = await getDocs(q);

    // Group by question to show duplicates
    const questionMap = new Map<
      string,
      { askedBy: string; count: number; id: string }
    >();

    snapshot.docs.forEach((doc) => {
      const data = doc.data() as QARecord;
      const existing = questionMap.get(data.question);

      if (existing) {
        existing.count++;
      } else {
        questionMap.set(data.question, {
          askedBy: data.userName,
          count: 1,
          id: doc.id,
        });
      }
    });

    return Array.from(questionMap.entries()).map(([question, data]) => ({
      question,
      ...data,
    }));
  } catch (err) {
    console.error("Failed to get unanswered questions:", err);
    return [];
  }
}

// Get top questions by frequency
export async function getTopQuestions(
  classId: string,
  limitCount: number = 10,
): Promise<{ question: string; frequency: number; averageRating: number }[]> {
  try {
    const q = query(
      collection(db, "ai_qna"),
      where("classId", "==", classId),
      limit(100),
    );

    const snapshot = await getDocs(q);

    // Count question frequency and average rating
    const questionStats = new Map<
      string,
      { frequency: number; totalRating: number; count: number }
    >();

    snapshot.docs.forEach((doc) => {
      const data = doc.data() as QARecord;
      const existing = questionStats.get(data.question);

      if (existing) {
        existing.frequency++;
        existing.totalRating += data.rating || 0;
        existing.count++;
      } else {
        questionStats.set(data.question, {
          frequency: 1,
          totalRating: data.rating || 0,
          count: 1,
        });
      }
    });

    return Array.from(questionStats.entries())
      .map(([question, stats]) => ({
        question,
        frequency: stats.frequency,
        averageRating: stats.totalRating / stats.count,
      }))
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, limitCount);
  } catch (err) {
    console.error("Failed to get top questions:", err);
    return [];
  }
}

// Search Q&A history
export async function searchQAHistory(
  userId: string,
  searchTerm: string,
): Promise<QARecord[]> {
  try {
    const qaHistory = await getQAHistory(userId, 100);

    return qaHistory.filter(
      (qa) =>
        qa.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        qa.answer.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  } catch (err) {
    console.error("Failed to search Q&A history:", err);
    return [];
  }
}
