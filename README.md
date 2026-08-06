# Phase 13: AI Learning Aids & Adaptive Learning

## Overview
Integrate Claude AI API to provide intelligent tutoring features including adaptive explanations, smart search, personalized learning paths, and AI-powered question answering.

## Architecture

### 1. AI Services Layer
- **OpenAI/Claude API Integration** - Leverage LLM for intelligent responses
- **Prompt Engineering** - Optimized prompts for education context
- **Rate Limiting** - Prevent abuse and manage API costs
- **Caching** - Cache common explanations to reduce API calls

### 2. Core AI Features

#### Adaptive Explanations
- Adjust complexity based on student level
- Provide multiple explanation styles (simple, detailed, visual)
- Include real-world examples relevant to Islamiyat
- Generate follow-up questions

#### Smart Q&A
- Answer student questions in real-time
- Cite relevant topics from curriculum
- Suggest related learning materials
- Track unanswered questions for teacher

#### Personalized Learning Paths
- Analyze quiz performance
- Recommend topics to review
- Suggest next topics to learn
- Track progress toward goals

#### Concept Breakdown
- Simplify complex concepts
- Create concept maps
- Link to related topics
- Provide mnemonic devices

## Database Schema

```typescript
// ai_explanations table
interface AIExplanation {
  id: string;
  topicId: string;
  originalContent: string;
  simpleExplanation: string;
  detailedExplanation: string;
  visualDescription: string;
  examples: string[];
  relatedTopics: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  rating: number; // teacher rating 1-5
  usageCount: number;
}

// ai_qna table
interface AIQA {
  id: string;
  userId: string;
  classId: string;
  question: string;
  answer: string;
  sources: string[]; // topic references
  followUpQuestions: string[];
  helpful: boolean;
  rating: number; // user rating
  createdAt: Timestamp;
}

// learning_paths table
interface LearningPath {
  id: string;
  userId: string;
  classId: string;
  recommendedTopics: string[];
  completedTopics: string[];
  currentTopic: string;
  estimatedTimeRemaining: number; // minutes
  adaptiveScore: number; // 0-100
  lastUpdated: Timestamp;
}

// ai_usage_analytics table
interface AIUsageAnalytics {
  id: string;
  userId: string;
  classId: string;
  featureType: 'explanation' | 'qa' | 'suggestion' | 'path';
  topicId: string;
  usedAt: Timestamp;
  timeSpent: number; // seconds
  helpful: boolean;
}
```

## File Structure

```
src/
├── lib/
│   ├── ai-service.ts          // Claude/OpenAI API integration
│   ├── explanation-service.ts // Generate explanations
│   ├── qa-service.ts          // Q&A generation
│   ├── path-service.ts        // Learning path recommendations
│   ├── ai-cache.ts            // Caching layer
│   └── ai-prompts.ts          // Prompt templates
├── hooks/
│   ├── useAIExplanation.ts    // Fetch explanations
│   ├── useAIQA.ts            // Ask questions
│   └── useLearnigPath.ts      // Get recommendations
├── components/
│   ├── ExplanationCard.tsx    // Display explanations
│   ├── ExplanationTabs.tsx    // Simple/detailed/visual tabs
│   ├── QAInterface.tsx        // Question input interface
│   ├── QAResponse.tsx         // Answer display with sources
│   ├── LearningPathCard.tsx   // Progress and recommendations
│   └── ConceptMap.tsx         // Visual topic relationships
└── app/
    ├── topics/[id]/explain/page.tsx
    ├── ask-ai/page.tsx
    └── my-learning/page.tsx
```

## Key Services

### ai-service.ts
```typescript
// Initialize AI client
initializeAIClient(apiKey: string): void

// Call Claude API
callClaude(prompt: string, temperature?: number): Promise<string>

// Stream responses
streamClaude(prompt: string, onChunk: (text: string) => void): Promise<void>

// Manage rate limiting
checkRateLimit(userId: string): Promise<boolean>
incrementRateLimit(userId: string): Promise<void>
```

### explanation-service.ts
```typescript
// Generate explanations
generateSimpleExplanation(topicId: string, content: string): Promise<string>
generateDetailedExplanation(topicId: string, content: string): Promise<string>
generateVisualDescription(topicId: string, content: string): Promise<string>

// Get cached or generate
getExplanation(topicId: string, style: 'simple'|'detailed'|'visual'): Promise<string>

// Generate examples
generateExamples(topicId: string, count: number): Promise<string[]>

// Create follow-ups
generateFollowUpQuestions(topicId: string): Promise<string[]>
```

### qa-service.ts
```typescript
// Answer student questions
answerQuestion(question: string, context: {userId, classId, topicId?}): Promise<AIQA>

// Get sources from curriculum
findRelevantTopics(question: string): Promise<string[]>

// Rate answers
rateAnswer(qaId: string, helpful: boolean): Promise<void>

// Get Q&A history
getQAHistory(userId: string, limit?: number): Promise<AIQA[]>

// Unanswered questions
getUnansweredQuestions(classId: string): Promise<{question, askedBy, count}[]>
```

### path-service.ts
```typescript
// Generate learning path
generateLearningPath(userId: string, classId: string): Promise<LearningPath>

// Get recommendations
getRecommendations(userId: string): Promise<{topic, reason, difficulty}[]>

// Update progress
updatePathProgress(userId: string, topicId: string): Promise<void>

// Suggest next topics
getNextTopics(userId: string): Promise<string[]>

// Time estimate
estimateTopicTime(topicId: string, userLevel: number): Promise<number>
```

## API Integration

### Using Claude API (Recommended)
```typescript
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const message = await client.messages.create({
  model: "claude-3-5-sonnet-20241022",
  max_tokens: 1024,
  messages: [
    { role: "user", content: "Explain Surah Al-Fatiha in simple terms" }
  ],
});
```

### Using OpenAI API (Alternative)
```typescript
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const response = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [
    { role: "user", content: "Explain Surah Al-Fatiha in simple terms" }
  ],
});
```

## Prompt Templates

### Simple Explanation
```
Explain "{topic}" in very simple terms suitable for a 15-year-old student.
Use everyday language and relatable examples.
Keep it to 2-3 paragraphs.
Include: definition, key point, real-world example.
```

### Detailed Explanation
```
Provide a comprehensive explanation of "{topic}".
Include: historical context, theological significance, practical applications.
Add references to relevant Quranic verses or Hadith if applicable.
Use academic but accessible language.
Include 3-5 follow-up questions.
```

### Visual Description
```
Describe "{topic}" as if creating a visual diagram or infographic.
Include: main concept at center, related ideas branching out, connections between ideas.
Use visual metaphors and spatial descriptions.
Suggest color coding or symbols that would help students remember.
```

### Q&A Response
```
Answer this student question about Islamiyat: "{question}"
Context: The student is at {level} level, studying {topic}.
Response guidelines:
1. Answer directly and clearly
2. If uncertain, explain your uncertainty
3. Cite relevant Quranic verses or Hadith if applicable
4. Suggest related topics to explore
5. End with 1-2 follow-up questions

Answer:
```

## Component Specs

### ExplanationCard.tsx
- Displays explanation with tabs (Simple/Detailed/Visual)
- Loading state with skeleton
- Copy to clipboard button
- Like/save functionality
- Related topics section
- Follow-up questions list

### QAInterface.tsx
- Text input for questions
- Character limit indicator (500)
- Send button (with loading state)
- Recent questions quick-select
- Suggested topics
- Mobile: full-screen input

### QAResponse.tsx
- Display answer with streaming effect
- Highlight source topics
- Rate helpful/not helpful
- Copy answer button
- Follow-up questions as buttons
- Related topics sidebar

### LearningPathCard.tsx
- Overall progress bar
- Recommended topics with difficulty
- Completed topics count
- Time remaining estimate
- Start learning button
- Performance analytics

### ConceptMap.tsx
- Visual network of topics
- Click to explore topics
- Color-coded by difficulty
- Interactive edges
- Search functionality

## Real-Time Streaming

```typescript
// Stream explanations for real-time feedback
async function* streamExplanation(topicId: string) {
  const prompt = buildPrompt(topicId);
  
  for await (const chunk of await streamClaude(prompt)) {
    yield chunk.text;
  }
}

// UI updates as response arrives
const [explanation, setExplanation] = useState('');
const stream = streamExplanation(topicId);
for await (const chunk of stream) {
  setExplanation(prev => prev + chunk);
}
```

## Caching Strategy

### Cache Layers
1. **Browser Cache** - Explanations cached for 1 week
2. **Redis Cache** - API responses cached for 24 hours
3. **Firestore Cache** - Frequently used explanations stored
4. **CDN Cache** - Static explanations cached for 7 days

### Cache Invalidation
- Refresh when topic content updates
- Invalidate on teacher rating changes
- Clear old entries (>30 days)
- Manual refresh option

## Rate Limiting

```typescript
// Free tier: 10 requests/day per user
// Pro tier: 100 requests/day per user

// Store usage in Firestore
interface RateLimitRecord {
  userId: string;
  date: string; // YYYY-MM-DD
  count: number;
  tier: 'free' | 'pro';
}

// Check before API call
const canUseAI = await checkRateLimit(userId);
if (!canUseAI) {
  showUpgradePrompt();
}
```

## Privacy & Safety

- **No data sent to AI** beyond current question/topic
- **Filter inappropriate content** before caching
- **User consent** required for analytics
- **FERPA compliance** - no PII in prompts
- **Data deletion** on student account removal

## Mobile Optimizations

- Streaming responses with progressive display
- Offline explanations cache
- Smaller text input on mobile
- Touch-friendly response cards
- Auto-scroll to latest response
- Quick-action buttons (Copy, Share, Save)

## Dark Mode
- All components support `dark:` prefixes
- Code blocks with syntax highlighting
- Equations readable in both themes

## Testing Checklist

- [ ] Simple explanation generates
- [ ] Detailed explanation generates
- [ ] Visual description generates
- [ ] Q&A accepts and answers questions
- [ ] Sources are correctly identified
- [ ] Learning path generates
- [ ] Caching works (reuse cached explanations)
- [ ] Rate limiting prevents abuse
- [ ] Streaming displays progressively
- [ ] Mobile layout responsive
- [ ] Dark mode works
- [ ] Keyboard navigation functional
- [ ] Screen reader announces content
- [ ] Cost tracking accurate

## Cost Considerations

### Claude API
- ~$0.003 per 1K input tokens
- ~$0.015 per 1K output tokens
- Average explanation: ~$0.05
- Budget: $100/month = ~2000 explanations

### OpenAI GPT-4
- ~$0.03 per 1K input tokens
- ~$0.06 per 1K output tokens
- Average explanation: ~$0.18
- Budget: $100/month = ~550 explanations

**Recommendation:** Use Claude API for better cost efficiency.

## Success Metrics

- Daily active users using AI features
- Explanation helpfulness rating (target: 4.5/5)
- Q&A response time (target: <10s)
- Cache hit rate (target: 60%)
- User satisfaction score
- Cost per explanation

## Next Steps

1. Add `.env` variables for API keys
2. Copy service files to `src/lib/`
3. Copy components to `src/components/`
4. Create routes for AI features
5. Implement caching layer
6. Set up rate limiting
7. Test with sample topics
8. Monitor costs and adjust
9. Proceed to Phase 14 (Analytics)

## Support

- Claude API docs: https://docs.anthropic.com/claude/reference/getting-started-with-the-api
- OpenAI docs: https://platform.openai.com/docs
- Rate limiting patterns: https://developers.google.com/analytics/devguides/config/admin/v1/rate-limits
- Streaming implementation: Web Streams API for progressive rendering
