import Anthropic from "@anthropic-ai/sdk";
import { collection, doc, getDoc, getDocs, query, where, Timestamp, addDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY,
});

// Rate limiting constants
const DAILY_LIMIT_FREE = 10;
const DAILY_LIMIT_PRO = 100;
const API_TIMEOUT = 30000; // 30 seconds

interface RateLimitRecord {
  userId: string;
  date: string;
  count: number;
  tier: "free" | "pro";
}

interface AIResponse {
  content: string;
  tokensUsed: {
    input: number;
    output: number;
  };
  cacheHit: boolean;
}

// Check rate limit for user
export async function checkRateLimit(userId: string): Promise<boolean> {
  try {
    const today = new Date().toISOString().split("T")[0];

    // Get user tier (default to free)
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    const tier = userSnap.data()?.tier || "free";

    // Check today's usage
    const q = query(
      collection(db, "ai_usage"),
      where("userId", "==", userId),
      where("date", "==", today),
    );

    const snapshot = await getDocs(q);
    const todayUsage = snapshot.docs.length;

    const limit = tier === "pro" ? DAILY_LIMIT_PRO : DAILY_LIMIT_FREE;
    return todayUsage < limit;
  } catch (err) {
    console.error("Failed to check rate limit:", err);
    return false;
  }
}

// Record API usage
export async function recordAPIUsage(
  userId: string,
  featureType: string,
  inputTokens: number,
  outputTokens: number,
): Promise<void> {
  try {
    const today = new Date().toISOString().split("T")[0];

    await addDoc(collection(db, "ai_usage"), {
      userId,
      date: today,
      featureType,
      inputTokens,
      outputTokens,
      totalTokens: inputTokens + outputTokens,
      timestamp: Timestamp.now(),
      cost: (inputTokens * 0.003 + outputTokens * 0.015) / 1000, // Claude pricing
    });
  } catch (err) {
    console.error("Failed to record API usage:", err);
  }
}

// Call Claude API
export async function callClaude(
  prompt: string,
  options: {
    maxTokens?: number;
    temperature?: number;
    systemPrompt?: string;
    userId?: string;
  } = {},
): Promise<AIResponse> {
  const {
    maxTokens = 1024,
    temperature = 0.7,
    systemPrompt,
    userId,
  } = options;

  // Check rate limit if userId provided
  if (userId && !(await checkRateLimit(userId))) {
    throw new Error("Rate limit exceeded");
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: maxTokens,
      temperature,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    } as any);

    clearTimeout(timeoutId);

    const content =
      response.content[0].type === "text" ? response.content[0].text : "";

    // Record usage
    if (userId) {
      await recordAPIUsage(
        userId,
        "general",
        response.usage.input_tokens,
        response.usage.output_tokens,
      );
    }

    return {
      content,
      tokensUsed: {
        input: response.usage.input_tokens,
        output: response.usage.output_tokens,
      },
      cacheHit: false,
    };
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error("API request timeout");
    }
    throw err;
  }
}

// Stream Claude API response
export async function streamClaude(
  prompt: string,
  onChunk: (chunk: string) => void,
  options: {
    maxTokens?: number;
    temperature?: number;
    systemPrompt?: string;
    userId?: string;
  } = {},
): Promise<{ totalTokens: { input: number; output: number } }> {
  const {
    maxTokens = 1024,
    temperature = 0.7,
    systemPrompt,
    userId,
  } = options;

  // Check rate limit
  if (userId && !(await checkRateLimit(userId))) {
    throw new Error("Rate limit exceeded");
  }

  try {
    let inputTokens = 0;
    let outputTokens = 0;

    const stream = anthropic.messages.stream({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: maxTokens,
      temperature,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    // Process streamed events
    stream.on("text", (text) => {
      onChunk(text);
    });

    // Wait for stream completion
    const finalMessage = await stream.finalMessage();

    inputTokens = finalMessage.usage.input_tokens;
    outputTokens = finalMessage.usage.output_tokens;

    // Record usage
    if (userId) {
      await recordAPIUsage(userId, "streamed", inputTokens, outputTokens);
    }

    return {
      totalTokens: {
        input: inputTokens,
        output: outputTokens,
      },
    };
  } catch (err) {
    throw err;
  }
}

// Get monthly usage stats
export async function getMonthlyUsageStats(userId: string): Promise<{
  count: number;
  inputTokens: number;
  outputTokens: number;
  estimatedCost: number;
}> {
  try {
    const today = new Date();
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1)
      .toISOString()
      .split("T")[0];

    const q = query(
      collection(db, "ai_usage"),
      where("userId", "==", userId),
    );

    const snapshot = await getDocs(q);
    const monthlyUsage = snapshot.docs
      .map((doc) => doc.data())
      .filter((doc) => doc.date >= monthStart);

    const stats = monthlyUsage.reduce(
      (acc, doc) => ({
        count: acc.count + 1,
        inputTokens: acc.inputTokens + (doc.inputTokens || 0),
        outputTokens: acc.outputTokens + (doc.outputTokens || 0),
        estimatedCost: acc.estimatedCost + (doc.cost || 0),
      }),
      { count: 0, inputTokens: 0, outputTokens: 0, estimatedCost: 0 },
    );

    return stats;
  } catch (err) {
    console.error("Failed to get usage stats:", err);
    return {
      count: 0,
      inputTokens: 0,
      outputTokens: 0,
      estimatedCost: 0,
    };
  }
}

// Check if response is cached
export async function getCachedResponse(
  cacheKey: string,
): Promise<string | null> {
  try {
    const docRef = doc(db, "ai_cache", cacheKey);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;

    const cached = docSnap.data();

    // Check if cache is still valid (24 hours)
    const createdAt = cached.createdAt?.toDate?.() || new Date();
    const now = new Date();
    const diffHours = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);

    if (diffHours > 24) {
      // Cache expired
      return null;
    }

    // Update access time
    await updateDoc(docRef, {
      lastAccessed: Timestamp.now(),
      accessCount: (cached.accessCount || 0) + 1,
    });

    return cached.content;
  } catch (err) {
    console.error("Failed to get cached response:", err);
    return null;
  }
}

// Cache API response
export async function cacheResponse(
  cacheKey: string,
  content: string,
): Promise<void> {
  try {
    const docRef = doc(db, "ai_cache", cacheKey);

    await updateDoc(docRef, {
      content,
      lastUpdated: Timestamp.now(),
      accessCount: 0,
    }).catch(() =>
      // If doc doesn't exist, create it
      addDoc(collection(db, "ai_cache"), {
        id: cacheKey,
        content,
        createdAt: Timestamp.now(),
        lastAccessed: Timestamp.now(),
        accessCount: 0,
      }),
    );
  } catch (err) {
    console.error("Failed to cache response:", err);
  }
}

// Generate cache key
export function generateCacheKey(
  type: string,
  topicId: string,
  variant?: string,
): string {
  return `${type}:${topicId}:${variant || "default"}`;
}

// Clean up old cache entries
export async function cleanupCache(): Promise<void> {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const q = query(
      collection(db, "ai_cache"),
      where("lastAccessed", "<", Timestamp.fromDate(thirtyDaysAgo)),
    );

    const snapshot = await getDocs(q);

    for (const doc of snapshot.docs) {
      // Can implement batch delete here if needed
      console.log(`Would delete cache entry: ${doc.id}`);
    }
  } catch (err) {
    console.error("Failed to cleanup cache:", err);
  }
}

// Get system prompt for education context
export function getEducationSystemPrompt(): string {
  return `You are an expert Islamic Studies tutor helping 14-18 year old students understand Islamiyat (Islamic Studies) topics.

Your responsibilities:
1. Explain complex Islamic concepts in age-appropriate language
2. Provide relevant Quranic verses and Hadith references
3. Connect concepts to students' daily lives
4. Use analogies and examples from modern Islamic context
5. Be respectful and culturally sensitive
6. Encourage critical thinking and reflection
7. Suggest related topics for further learning

When answering:
- Start with a clear definition
- Provide historical or theological context
- Give practical examples
- Link to relevant Islamic sources
- Suggest follow-up questions for deeper learning
- Be encouraging and supportive

Always maintain accuracy in Islamic knowledge and respect scholarly interpretations.`;
}
