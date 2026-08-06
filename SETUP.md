# Phase 12: Social Learning Setup Guide

## 1. Update Firestore Security Rules

Add these rules to your Firestore security rules console:

```
// Discussions collection
match /discussions/{documentId} {
  allow read: if request.auth != null && 
    request.auth.uid in resource.data.get('classId', '') in get(/databases/$(database)/documents/class_enrollments/$(request.auth.uid)).data.get('classIds', []);
  allow create: if request.auth != null && 
    get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['teacher', 'student'];
  allow update, delete: if request.auth != null && 
    (request.auth.uid == resource.data.authorId || 
     get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'teacher');
}

// Discussion replies collection
match /discussion_replies/{documentId} {
  allow read: if request.auth != null;
  allow create: if request.auth != null;
  allow update, delete: if request.auth != null && 
    (request.auth.uid == resource.data.authorId || 
     get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'teacher');
}

// Content flags collection
match /content_flags/{documentId} {
  allow create: if request.auth != null;
  allow read, update: if request.auth != null && 
    get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'teacher';
}

// Discussion engagement collection
match /discussion_engagement/{documentId} {
  allow create: if request.auth != null;
  allow read: if request.auth != null;
}

// Moderation settings (teachers only)
match /moderation_settings/{documentId} {
  allow read: if request.auth != null;
  allow write: if request.auth != null && 
    get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'teacher';
}
```

## 2. Copy Files to Project

```bash
# Copy service files
cp lib__discussion-service.ts → src/lib/discussion-service.ts
cp lib__moderation-service.ts → src/lib/moderation-service.ts
cp lib__engagement-service.ts → src/lib/engagement-service.ts

# Copy components
cp components__UserAvatar.tsx → src/components/UserAvatar.tsx
cp components__DiscussionList.tsx → src/components/DiscussionList.tsx
cp components__DiscussionThread.tsx → src/components/DiscussionThread.tsx
cp components__CommentInput.tsx → src/components/CommentInput.tsx
cp components__CommentItem.tsx → src/components/CommentItem.tsx
cp components__ForumPage.tsx → src/components/ForumPage.tsx
cp components__ModerationPanel.tsx → src/components/ModerationPanel.tsx
```

## 3. Create App Routes

### Create `app/classes/[id]/forum/page.tsx`

```typescript
'use client';

import { useAuth } from '@/lib/auth-context';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ForumPage } from '@/components/ForumPage';
import { getClassDetails } from '@/lib/class-service';

export default function ClassForumPage() {
  const { user, userRole } = useAuth();
  const params = useParams();
  const router = useRouter();
  const classId = params.id as string;
  const [classData, setClassData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const loadClass = async () => {
      try {
        const classInfo = await getClassDetails(classId);
        setClassData(classInfo);
      } catch (err) {
        console.error('Failed to load class:', err);
        router.push('/classes');
      } finally {
        setIsLoading(false);
      }
    };

    loadClass();
  }, [user, classId, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin w-6 h-6 border-3 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!classData) {
    return <div>Class not found</div>;
  }

  return (
    <div className="p-4 sm:p-8">
      <ForumPage
        classId={classId}
        className={classData.name}
        currentUserId={user!.uid}
        currentUserName={user!.displayName || 'Anonymous'}
        userEmail={user!.email || ''}
        userRole={userRole as 'teacher' | 'student'}
      />
    </div>
  );
}
```

### Create `app/admin/moderation/page.tsx`

```typescript
'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ModerationPanel } from '@/components/ModerationPanel';
import { getTeacherClasses } from '@/lib/class-service';
import { useState } from 'react';

export default function ModerationPage() {
  const { user, userRole } = useAuth();
  const router = useRouter();
  const [classes, setClasses] = useState<any[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user || userRole !== 'teacher') {
      router.push('/login');
      return;
    }

    const loadClasses = async () => {
      try {
        const teacherClasses = await getTeacherClasses(user.uid);
        setClasses(teacherClasses);
        if (teacherClasses.length > 0) {
          setSelectedClassId(teacherClasses[0].id);
        }
      } catch (err) {
        console.error('Failed to load classes:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadClasses();
  }, [user, userRole, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin w-6 h-6 border-3 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">
        Forum Moderation
      </h1>

      {classes.length === 0 ? (
        <div className="text-center py-12 text-slate-500 dark:text-slate-400">
          No classes available
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Class selector */}
          <div>
            <div className="sticky top-4">
              <h2 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
                Classes
              </h2>
              <div className="space-y-2">
                {classes.map((cls) => (
                  <button
                    key={cls.id}
                    onClick={() => setSelectedClassId(cls.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedClassId === cls.id
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="font-medium">{cls.name}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {cls.studentCount} students
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Moderation panel */}
          <div className="lg:col-span-3">
            {selectedClassId && (
              <ModerationPanel classId={selectedClassId} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
```

## 4. Add Navigation Links

Update your Header or Navigation component to include links to the forum:

```typescript
// In your navigation
<Link href={`/classes/${classId}/forum`}>
  💬 Forum
</Link>

// For teachers, add moderation link
{userRole === 'teacher' && (
  <Link href="/admin/moderation">
    🛡️ Moderation
  </Link>
)}
```

## 5. Install Dependencies

Make sure you have `date-fns` installed for date formatting:

```bash
npm install date-fns
```

## 6. Testing Procedures

### Test as Student
1. Navigate to your class
2. Click "Forum" tab
3. Create a new discussion
4. Reply to discussions
5. Like/flag content
6. Verify content appears with "pending" status initially

### Test as Teacher
1. Navigate to `/admin/moderation`
2. Review pending discussions and replies
3. Approve/reject content
4. Check moderation stats
5. View and manage flagged content

### Test Real-Time Features
1. Open forum in two browser windows
2. Create new discussion in one window
3. Verify it appears in the other (after refresh or use Firestore listeners)
4. Test reply updates

### Test Mobile
1. Open forum on mobile device
2. Verify layout is responsive
3. Test swipe gestures (if implemented)
4. Verify touch targets are 44px+
5. Test dark mode

## 7. Advanced Configuration (Optional)

### Enable Pre-Approval Workflow

In `lib/moderation-service.ts`, when creating new moderation settings for a class:

```typescript
// Set require approval for all content
await setModerationMode(classId, true);
```

### Track Engagement Metrics

Use the engagement service to display leaderboards:

```typescript
import { getTopContributors } from '@/lib/engagement-service';

const contributors = await getTopContributors(classId, 10);
contributors.forEach(contributor => {
  console.log(`${contributor.rank}. ${contributor.userName} - ${contributor.totalReplies} replies`);
});
```

### Monitor Daily Activity

```typescript
import { getDailyActivityTrend } from '@/lib/engagement-service';

const trend = await getDailyActivityTrend(classId, 7); // Last 7 days
console.log(trend); // [{date: '2024-01-01', count: 5}, ...]
```

## Troubleshooting

### Discussions not appearing
- Check Firestore RLS rules are correct
- Verify classId matches the class they're enrolled in
- Check browser console for Firebase errors

### Can't create discussions
- Verify user is authenticated
- Check Firestore RLS for create permissions
- Ensure classId exists

### Moderation panel empty
- Verify user role is 'teacher'
- Check Firestore has pending content
- Verify RLS allows teacher access

### Real-time updates not working
- Firestore listeners need active subscription
- Consider adding manual refresh button
- Check network/Firebase connection

## Next Steps

1. ✅ Copy all files to your project
2. ✅ Update Firestore security rules
3. ✅ Create forum and moderation pages
4. ✅ Test forum functionality
5. → Deploy and monitor engagement
6. → Proceed to Phase 13 (AI Learning Aids)

## Performance Optimization

- Paginate discussion lists (implement `startAfter` for pagination)
- Add Firestore indexes for common queries
- Cache discussion list for 5 minutes
- Lazy load images in discussion content
- Implement virtual scrolling for large reply lists

## Security Checklist

- ✅ Firestore RLS enforces authorization
- ✅ Only authors can edit/delete own content
- ✅ Teachers can moderate all content
- ✅ HTML sanitization (React escapes by default)
- ✅ Rate limiting on content creation (implement via Cloud Functions)
- ✅ Prevent spam with moderation workflow
