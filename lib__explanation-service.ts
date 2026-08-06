import {
  callClaude,
  streamClaude,
  getCachedResponse,
  cacheResponse,
  generateCacheKey,
  getEducationSystemPrompt,
} from "./ai-service";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "./firebase";

export interface ExplanationStyle {
  simple: string;
  detailed: string;
  visual: string;
}

export interface ExplanationWithFollowUp {
  explanation: string;
  followUpQuestions: string[];
  relatedTopics: string[];
  examples: string[];
}

// Generate simple explanation
export async function generateSimpleExplanation(
  topicId: string,
  topicContent: string,
  userId?: string,
): Promise<string> {
  const cacheKey = generateCacheKey("simple_explanation", topicId);

  // Check cache first
  const cached = await getCachedResponse(cacheKey);
  if (cached) return cached;

  const prompt = `Explain the following Islamic Studies topic in very simple terms suitable for a 15-year-old student.

Topic: ${topicContent}

Guidelines:
1. Use everyday language and relatable examples
2. Keep it to 2-3 short paragraphs
3. Start with a simple definition
4. Include ONE relevant example from daily life
5. End with a key takeaway

Simple Explanation:`;

  const response = await callClaude(prompt, {
    maxTokens: 500,
    temperature: 0.6,
    systemPrompt: getEducationSystemPrompt(),
    userId,
  });

  // Cache the response
  await cacheResponse(cacheKey, response.content);

  return response.content;
}

// Generate detailed explanation
export async function generateDetailedExplanation(
  topicId: string,
  topicContent: string,
  userId?: string,
): Promise<ExplanationWithFollowUp> {
  const cacheKey = generateCacheKey("detailed_explanation", topicId);

  // Check cache
  const cached = await getCachedResponse(cacheKey);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      // Cache is corrupted, regenerate
    }
  }

  const prompt = `Provide a comprehensive explanation of this Islamic Studies topic:

Topic: ${topicContent}

Structure your response as JSON with these fields:
{
  "explanation": "Detailed explanation (5-7 paragraphs including historical context, theological significance, and practical applications)",
  "followUpQuestions": ["Question 1", "Question 2", "Question 3"],
  "relatedTopics": ["Related Topic 1", "Related Topic 2"],
  "examples": ["Example 1", "Example 2", "Example 3"]
}

Guidelines:
- Include relevant Quranic verses or Hadith if applicable
- Use academic but accessible language
- Connect to students' lives
- Provide 3 follow-up questions
- Suggest 2-3 related topics
- Include 3 concrete examples

JSON Response:`;

  const response = await callClaude(prompt, {
    maxTokens: 1500,
    temperature: 0.7,
    systemPrompt: getEducationSystemPrompt(),
    userId,
  });

  let result: ExplanationWithFollowUp;

  try {
    result = JSON.parse(response.content);
  } catch (e) {
    result = {
      explanation: response.content,
      followUpQuestions: [],
      relatedTopics: [],
      examples: [],
    };
  }

  // Cache the response
  await cacheResponse(cacheKey, JSON.stringify(result));

  return result;
}

// Generate visual description
export async function generateVisualDescription(
  topicId: string,
  topicContent: string,
  userId?: string,
): Promise<string> {
  const cacheKey = generateCacheKey("visual_explanation", topicId);

  // Check cache
  const cached = await getCachedResponse(cacheKey);
  if (cached) return cached;

  const prompt = `Describe how to visually represent this Islamic Studies topic using a diagram, infographic, or mind map:

Topic: ${topicContent}

Provide instructions for creating a visual representation that includes:
1. Main concept (center point)
2. Key related ideas (branches)
3. Connections between ideas
4. Visual symbols or colors to use
5. Suggested layout

Format your response as clear, actionable instructions for a student to create their own visual summary.

Visual Description:`;

  const response = await callClaude(prompt, {
    maxTokens: 800,
    temperature: 0.6,
    systemPrompt: getEducationSystemPrompt(),
    userId,
  });

  // Cache the response
  await cacheResponse(cacheKey, response.content);

  return response.content;
}

// Get all explanation styles
export async function getExplanations(
  topicId: string,
  topicContent: string,
  userId?: string,
): Promise<ExplanationStyle> {
  const [simple, detailed, visual] = await Promise.all([
    generateSimpleExplanation(topicId, topicContent, userId),
    generateDetailedExplanation(topicId, topicContent, userId).then(
      (e) => e.explanation,
    ),
    generateVisualDescription(topicId, topicContent, userId),
  ]);

  return { simple, detailed, visual };
}

// Generate examples for a topic
export async function generateExamples(
  topicId: string,
  topicContent: string,
  count: number = 3,
  userId?: string,
): Promise<string[]> {
  const cacheKey = generateCacheKey("examples", topicId, `count_${count}`);

  // Check cache
  const cached = await getCachedResponse(cacheKey);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      // Cache corrupted
    }
  }

  const prompt = `Generate ${count} clear, realistic examples that illustrate this Islamic Studies concept:

Topic: ${topicContent}

Guidelines for each example:
1. Make it relatable to teenage students
2. Include context (time, place, situation)
3. Show how the concept applies
4. Keep each example to 2-3 sentences
5. Use modern or historical Islamic contexts

Format as JSON array:
["Example 1", "Example 2", ...]

Examples:`;

  const response = await callClaude(prompt, {
    maxTokens: 600,
    temperature: 0.7,
    systemPrompt: getEducationSystemPrompt(),
    userId,
  });

  let examples: string[] = [];

  try {
    examples = JSON.parse(response.content);
  } catch (e) {
    // Fallback: split by newlines
    examples = response.content
      .split("\n")
      .filter((e) => e.trim())
      .slice(0, count);
  }

  // Cache
  await cacheResponse(cacheKey, JSON.stringify(examples));

  return examples;
}

// Generate follow-up questions
export async function generateFollowUpQuestions(
  topicId: string,
  topicContent: string,
  count: number = 3,
  userId?: string,
): Promise<string[]> {
  const cacheKey = generateCacheKey("followup_questions", topicId, `count_${count}`);

  // Check cache
  const cached = await getCachedResponse(cacheKey);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      // Cache corrupted
    }
  }

  const prompt = `Generate ${count} follow-up questions that help deepen understanding of this Islamic Studies topic:

Topic: ${topicContent}

Guidelines:
1. Questions should encourage critical thinking
2. Progress from basic to more complex
3. Link to practical applications
4. Be open-ended (not yes/no)
5. Suitable for 15-18 year old students

Format as JSON array:
["Question 1?", "Question 2?", ...]

Questions:`;

  const response = await callClaude(prompt, {
    maxTokens: 500,
    temperature: 0.7,
    systemPrompt: getEducationSystemPrompt(),
    userId,
  });

  let questions: string[] = [];

  try {
    questions = JSON.parse(response.content);
  } catch (e) {
    questions = response.content
      .split("\n")
      .filter((q) => q.trim().endsWith("?"))
      .slice(0, count);
  }

  // Cache
  await cacheResponse(cacheKey, JSON.stringify(questions));

  return questions;
}

// Generate mnemonic device
export async function generateMnemonic(
  topicId: string,
  topicContent: string,
  userId?: string,
): Promise<string> {
  const cacheKey = generateCacheKey("mnemonic", topicId);

  // Check cache
  const cached = await getCachedResponse(cacheKey);
  if (cached) return cached;

  const prompt = `Create a memorable mnemonic device or acronym to help students remember key points about this Islamic Studies topic:

Topic: ${topicContent}

Requirements:
1. Use an acronym or memory technique
2. Make it easy to remember
3. Cover the main points
4. Explain what each letter/word represents
5. Include an example of how to use it

Format:
- Mnemonic/Acronym: [THE ACRONYM]
- Meaning: [What each letter stands for]
- How to remember: [The memory trick]
- Example: [Show how it's used]

Mnemonic Device:`;

  const response = await callClaude(prompt, {
    maxTokens: 400,
    temperature: 0.6,
    systemPrompt: getEducationSystemPrompt(),
    userId,
  });

  // Cache
  await cacheResponse(cacheKey, response.content);

  return response.content;
}

// Stream explanation as it's generated
export async function streamExplanation(
  topicId: string,
  topicContent: string,
  style: "simple" | "detailed" | "visual",
  onChunk: (chunk: string) => void,
  userId?: string,
): Promise<void> {
  let prompt = "";
  let maxTokens = 500;

  if (style === "simple") {
    prompt = `Explain this Islamic Studies topic in very simple terms for a 15-year-old student.

Topic: ${topicContent}

Keep it to 2-3 short paragraphs with a simple definition and everyday example.`;
    maxTokens = 500;
  } else if (style === "detailed") {
    prompt = `Provide a comprehensive explanation of this Islamic Studies topic.

Topic: ${topicContent}

Include historical context, theological significance, and practical applications with relevant Quranic verses or Hadith.`;
    maxTokens = 1500;
  } else if (style === "visual") {
    prompt = `Describe how to create a visual representation of this Islamic Studies topic.

Topic: ${topicContent}

Provide clear instructions for creating a diagram, mind map, or infographic.`;
    maxTokens = 800;
  }

  await streamClaude(prompt, onChunk, {
    maxTokens,
    temperature: 0.6,
    systemPrompt: getEducationSystemPrompt(),
    userId,
  });
}

// Save explanation to Firestore (teacher rated)
export async function saveExplanation(
  topicId: string,
  topicContent: string,
  explanations: ExplanationStyle,
  rating: number,
): Promise<void> {
  try {
    const docRef = doc(db, "ai_explanations", topicId);

    await setDoc(docRef, {
      topicId,
      topicContent,
      simpleExplanation: explanations.simple,
      detailedExplanation: explanations.detailed,
      visualDescription: explanations.visual,
      rating, // 1-5 stars
      usageCount: 0,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
  } catch (err) {
    console.error("Failed to save explanation:", err);
  }
}

// Get saved explanation if teacher-approved
export async function getSavedExplanation(
  topicId: string,
): Promise<ExplanationStyle | null> {
  try {
    const docRef = doc(db, "ai_explanations", topicId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;

    const data = docSnap.data();

    return {
      simple: data.simpleExplanation,
      detailed: data.detailedExplanation,
      visual: data.visualDescription,
    };
  } catch (err) {
    console.error("Failed to get saved explanation:", err);
    return null;
  }
}
