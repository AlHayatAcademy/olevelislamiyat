# Phase 13: AI Learning Aids Setup Guide

## 1. Get API Keys

### Claude API (Recommended)
1. Go to https://console.anthropic.com
2. Sign up or log in
3. Navigate to API Keys
4. Create new API key
5. Copy the key

### OpenAI API (Alternative)
1. Go to https://platform.openai.com/account/api-keys
2. Create new API key
3. Copy the key

## 2. Add Environment Variables

Create `.env.local` in your project root:

```
# Claude API (Recommended)
NEXT_PUBLIC_ANTHROPIC_API_KEY=sk-ant-xxxxx

# OR OpenAI API (Alternative)
# NEXT_PUBLIC_OPENAI_API_KEY=sk-xxxxx

# Firebase (should already exist from Phase 10)
NEXT_PUBLIC_FIREBASE_API_KEY=xxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxx.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxx
```

## 3. Copy Files to Project

```bash
# Copy service files
cp lib__ai-service.ts → src/lib/ai-service.ts
cp lib__explanation-service.ts → src/lib/explanation-service.ts
cp lib__qa-service.ts → src/lib/qa-service.ts
cp lib__path-service.ts → src/lib/path-service.ts

# Copy components
cp components__ExplanationCard.tsx → src/components/ExplanationCard.tsx
cp components__QAInterface.tsx → src/components/QAInterface.tsx
```

## 4. Install Dependencies

```bash
npm install @anthropic-ai/sdk
# OR for OpenAI:
# npm install openai
```

## 5. Create App Routes

### Create `app/topics/[id]/explain/page.tsx`

```typescript
'use client';

import { useAuth } from '@/lib/auth-context';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ExplanationCard } from '@/components/ExplanationCard';
import { getDocWithId } from '@/lib/firestore-utils';

export default function ExplainTopicPage() {
  const { user } = useAuth();
  const params = useParams();
  const router = useRouter();
  const topicId = params.id as string;
  const [topic, setTopic] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const loadTopic = async () => {
      try {
        const topicData = await getDocWithId('quizzes', topicId);
        setTopic(topicData);
      } catch (err) {
        console.error('Failed to load topic:', err);
        router.push('/');
      } finally {
        setIsLoading(false);
      }
    };

    loadTopic();
  }, [user, topicId, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin w-6 h-6 border-3 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!topic) {
    return <div>Topic not found</div>;
  }

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto">
      <ExplanationCard
        topicId={topicId}
        topicName={topic.title}
        topicContent={topic.description || topic.content}
        userId={user?.uid}
      />
    </div>
  );
}
```

### Create `app/ask-ai/page.tsx`

```typescript
'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { QAInterface } from '@/components/QAInterface';
import { getTeacherClasses } from '@/lib/class-service';
import { getQAHistory } from '@/lib/qa-service';

export default function AskAIPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [classes, setClasses] = useState<any[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [qaHistory, setQAHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const loadData = async () => {
      try {
        const userClasses = await getTeacherClasses(user.uid).catch(() =>
          // If not a teacher, get enrolled classes
          Promise.resolve([])
        );
        
        if (userClasses.length > 0) {
          setClasses(userClasses);
          setSelectedClassId(userClasses[0].id);
        }

        const history = await getQAHistory(user.uid, 5);
        setQAHistory(history);
      } catch (err) {
        console.error('Failed to load data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin w-6 h-6 border-3 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto space-y-8">
      {/* Q&A Interface */}
      {selectedClassId && (
        <QAInterface
          classId={selectedClassId}
          userId={user!.uid}
          userName={user!.displayName || 'Student'}
          userEmail={user!.email || ''}
        />
      )}

      {/* Recent Questions */}
      {qaHistory.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 sm:p-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Your Recent Questions
          </h2>

          <div className="space-y-3">
            {qaHistory.map((qa) => (
              <div
                key={qa.id}
                className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <p className="font-medium text-slate-900 dark:text-slate-100">
                  {qa.question}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {new Date(qa.createdAt?.toDate?.() || 0).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

### Create `app/my-learning/page.tsx`

```typescript
'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getProgressSummary } from '@/lib/path-service';
import { generateLearningPath } from '@/lib/path-service';

export default function MyLearningPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [classId] = useState('default-class'); // Get from user's enrolled class
  const [progress, setProgress] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const loadProgress = async () => {
      try {
        // Generate or update learning path
        await generateLearningPath(user.uid, classId);

        // Get progress summary
        const summary = await getProgressSummary(user.uid, classId);
        setProgress(summary);
      } catch (err) {
        console.error('Failed to load progress:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProgress();
  }, [user, classId, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin w-6 h-6 border-3 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!progress) {
    return <div>Failed to load learning progress</div>;
  }

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
        My Learning Path
      </h1>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Completed Topics */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {progress.completedTopics}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Topics Completed
          </div>
        </div>

        {/* Mastery Percent */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">
            {progress.masterPercent}%
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Overall Mastery
          </div>
        </div>

        {/* Time Remaining */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
          <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
            {Math.round(progress.timeRemaining / 60)}h
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Estimated Time Left
          </div>
        </div>

        {/* Total Topics */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            {progress.totalTopics}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Total Topics
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
          Progress
        </h2>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-8 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-green-500 h-full flex items-center justify-center text-white text-sm font-bold transition-all duration-500"
            style={{ width: `${progress.masterPercent}%` }}
          >
            {progress.masterPercent > 10 && `${progress.masterPercent}%`}
          </div>
        </div>
      </div>
    </div>
  );
}
```

## 6. Add Navigation Links

Update your Header or Navigation component:

```typescript
import Link from 'next/link';

// Add these links to your navigation
<Link href="/ask-ai" className="flex items-center gap-2 hover:text-blue-600">
  ✨ Ask AI
</Link>

<Link href="/my-learning" className="flex items-center gap-2 hover:text-blue-600">
  📚 My Learning
</Link>
```

## 7. Configure Firestore Indexes

Add to your Firestore security rules if not already present:

```
match /ai_usage/{doc} {
  allow write: if request.auth != null;
  allow read: if request.auth.uid == resource.data.userId;
}

match /ai_qna/{doc} {
  allow write: if request.auth != null;
  allow read: if request.auth.uid == resource.data.userId;
}

match /ai_cache/{doc} {
  allow read: if request.auth != null;
  allow write: if false; // Server-only writes
}

match /learning_paths/{doc} {
  allow read, write: if request.auth != null;
}

match /ai_explanations/{doc} {
  allow read: if request.auth != null;
  allow write: if false; // Teacher-only (implement via Cloud Function)
}
```

## 8. Testing Procedures

### Test Explanations
1. Navigate to a quiz topic
2. Click "Explain" (or create route `/topics/[id]/explain`)
3. Try Simple explanation
4. Try Detailed explanation
5. Try Visual description
6. Verify streaming works
7. Test Copy button

### Test Q&A
1. Navigate to `/ask-ai`
2. Ask a sample question: "What is the meaning of Surah Al-Fatiha?"
3. Verify answer appears with sources
4. Try different question types
5. Check question history

### Test Learning Path
1. Navigate to `/my-learning`
2. Verify progress displays
3. Check recommended topics
4. Complete a quiz
5. Verify path updates

### Test Rate Limiting
1. Ask 10 questions in quick succession (free tier)
2. Verify 11th question is blocked
3. Check error message is helpful

## 9. Cost Optimization

### Claude API Pricing
- ~$0.003 per 1K input tokens
- ~$0.015 per 1K output tokens
- Average explanation: ~$0.05
- Budget: $100/month = ~2000 explanations

### Strategies to Reduce Costs
1. **Cache explanations** - Store AI-generated content
2. **Limit topics** - Only generate for current topics
3. **User tiers** - Free tier: 10 questions/day, Pro: unlimited
4. **Batch generation** - Generate explanations during off-hours
5. **Monitor usage** - Track costs in real-time

## 10. Performance Considerations

- **Streaming responses** - Show answers as they're generated
- **Caching** - Store commonly asked questions
- **Lazy loading** - Load explanations only when requested
- **Worker threads** - Use Cloud Functions for batch processing
- **Connection pooling** - Reuse API connections

## Troubleshooting

### API Key Issues
- Verify key is in `.env.local`
- Check key has correct permissions
- Ensure API is enabled in console
- Check rate limits haven't been exceeded

### No Explanations Generated
- Check API key is valid
- Verify topic content is being passed
- Check browser console for errors
- Try with different topic

### Streaming Not Working
- Check browser supports ReadableStream
- Verify server supports streaming
- Check network connection

### Rate Limit Errors
- User has reached daily limit
- Upgrade to Pro tier
- Wait until next day
- Check Firestore usage counts

## Security Checklist

- ✅ API keys in `.env.local` (not committed)
- ✅ Rate limiting prevents abuse
- ✅ User authentication required
- ✅ No PII in prompts
- ✅ Content filtering for safety
- ✅ Firestore RLS enforces authorization
- ✅ Cost monitoring in place

## Next Steps

1. ✅ Add API keys to `.env.local`
2. ✅ Copy all files to project
3. ✅ Create routes for AI features
4. ✅ Test explanations and Q&A
5. ✅ Monitor usage and costs
6. → Proceed to Phase 14 (Analytics Dashboard)

## Phase 13 Features Recap

✅ AI-Generated Explanations (Simple/Detailed/Visual)
✅ Streaming Responses for Real-Time Feedback
✅ Smart Q&A with Source Topics
✅ Personalized Learning Paths
✅ Usage Analytics & Cost Tracking
✅ Rate Limiting for Free/Pro Tiers
✅ Caching for Performance
✅ Mobile-Responsive Interface
✅ Dark Mode Support
✅ Accessibility Features
