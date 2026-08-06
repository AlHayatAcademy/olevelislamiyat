# Phase 13: AI-Powered Learning Aids

## Overview
Integrate Claude AI for intelligent hints, explanations, and personalized learning support.

## Features

### 1. Smart Explanations
```typescript
export async function getQuestionExplanation(
  question: QuizQuestion,
  userAnswer: StoredAnswer,
  isCorrect: boolean,
): Promise<string>
```

- When user gets question wrong, offer AI explanation
- Explain why the answer is correct
- Point out common misconceptions
- Link to related lesson content

### 2. Hint System
```typescript
export async function getHint(
  question: QuizQuestion,
  difficulty: "easy" | "medium" | "hard",
): Promise<string>
```

- Progressive hints (don't give away answer)
- Vary by question difficulty
- Track hint usage for personalization
- Learn what topics need better explanations

### 3. Personalized Learning Recommendations
```typescript
export async function generateLearningPlan(
  studentProfile: StudentProfile,
): Promise<LearningPlan>
```

- Analyze quiz patterns with AI
- Generate personalized study tips
- Suggest areas for focused practice
- Predict areas of difficulty before quiz

### 4. Question Difficulty Prediction
```typescript
export async function predictQuestionDifficulty(
  question: QuizQuestion,
  cohortData: QuizStats[],
): Promise<"easy" | "medium" | "hard">
```

- ML model learns from student performance
- Rank questions by difficulty for cohort
- Adapt quiz difficulty dynamically
- Identify outlier questions

### 5. Content Generation (Optional)
- Generate practice questions from topics
- Create summary notes from lesson content
- Auto-generate quiz questions from text

## Implementation

### API Setup
- Use Anthropic API (Claude) for explanations
- Cache expensive API calls
- Rate limit per student
- Log all AI interactions for improvement

### Cost Management
- Limit explanations/hints per user (e.g., 3/day)
- Batch requests where possible
- Cache common explanations
- Premium tier for unlimited AI help

## Example Flows

**Incorrect Answer:**
1. User selects wrong answer
2. Submit quiz → See feedback
3. "Get explanation" button triggered
4. Call Claude: "Explain why [correct answer] is right, not [their answer]"
5. Display formatted explanation with learning tips

**Before Quiz:**
1. Student reviews recommended topics
2. Click "Get study tip"
3. Claude analyzes their weak areas
4. Provides personalized advice
5. Suggests specific quiz to take

## Implementation Priority
MEDIUM-HIGH - Significantly improves learning outcomes
