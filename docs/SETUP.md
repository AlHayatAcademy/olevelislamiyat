# Phase 15: Certificates & Recognition Setup

## Files Included

### Services (4)
- `lib__certificate-service.ts` - Certificate generation and management
- `lib__badge-service.ts` - Badge awarding and retrieval
- `lib__leaderboard-service.ts` - Ranking calculations and updates
- `lib__pdf-generator.ts` - PDF/HTML generation for exports

### Components (6)
- `components__CertificatePreview.tsx` - Certificate display with print/download
- `components__BadgeCollection.tsx` - Badge showcase with filtering
- `components__Leaderboard.tsx` - Rankings display with sorting
- `components__CertificateDownload.tsx` - Download and share functionality
- `components__ExportModal.tsx` - Multi-format export dialog
- `components__AchievementUnlocked.tsx` - Badge notification animation

## Quick Setup (8 Steps)

### 1. Copy Files to Project

```bash
# Copy services
cp lib__certificate-service.ts → src/lib/certificate-service.ts
cp lib__badge-service.ts → src/lib/badge-service.ts
cp lib__leaderboard-service.ts → src/lib/leaderboard-service.ts
cp lib__pdf-generator.ts → src/lib/pdf-generator.ts

# Copy components
cp components__CertificatePreview.tsx → src/components/CertificatePreview.tsx
cp components__BadgeCollection.tsx → src/components/BadgeCollection.tsx
cp components__Leaderboard.tsx → src/components/Leaderboard.tsx
cp components__CertificateDownload.tsx → src/components/CertificateDownload.tsx
cp components__ExportModal.tsx → src/components/ExportModal.tsx
cp components__AchievementUnlocked.tsx → src/components/AchievementUnlocked.tsx
```

### 2. Install Dependencies (Optional)

For PDF generation support (recommended):
```bash
npm install jspdf html2canvas
```

### 3. Update Firestore Security Rules

Add to your Firestore RLS:

```javascript
match /certificates/{certificateId} {
  allow read: if request.auth.uid == resource.data.userId || request.auth.token.admin == true;
  allow create: if request.auth.uid != null;
  allow update, delete: if request.auth.token.admin == true;
}

match /badges/{badgeId} {
  allow read: if request.auth.uid == resource.data.userId || request.auth.token.admin == true;
  allow create: if request.auth.token.admin == true;
  allow delete: if request.auth.token.admin == true;
}

match /leaderboards/{docId} {
  allow read: if true; // Leaderboards are public
  allow write: if request.auth.token.admin == true;
}

match /export_history/{docId} {
  allow read, create: if request.auth.uid != null;
  allow write: if request.auth.token.admin == true;
}
```

### 4. Create Certificate Routes

#### Student Certificates (`app/certificates/page.tsx`)
```typescript
'use client';

import { useAuth } from '@/lib/auth-context';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getUserCertificates } from '@/lib/certificate-service';
import { CertificatePreview } from '@/components/CertificatePreview';
import { CertificateDownload } from '@/components/CertificateDownload';
import { Certificate } from '@/lib/certificate-service';

export default function CertificatesPage() {
  const { user } = useAuth();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [selected, setSelected] = useState<Certificate | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadCertificates = async () => {
      try {
        const certs = await getUserCertificates(user.uid);
        setCertificates(certs);
        if (certs.length > 0) {
          setSelected(certs[0]);
        }
      } catch (error) {
        console.error('Error loading certificates:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCertificates();
  }, [user]);

  if (isLoading) return <div>Loading certificates...</div>;

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Certificates</h1>

      {certificates.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-600">No certificates yet. Complete a course to earn one!</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Certificate List */}
          <div className="lg:col-span-1 space-y-2">
            {certificates.map((cert) => (
              <button
                key={cert.id}
                onClick={() => setSelected(cert)}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  selected?.id === cert.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <p className="font-semibold">{cert.className}</p>
                <p className="text-sm text-slate-600">{cert.finalScore}%</p>
              </button>
            ))}
          </div>

          {/* Certificate Preview & Download */}
          <div className="lg:col-span-2 space-y-6">
            {selected && (
              <>
                <CertificatePreview certificate={selected} />
                <CertificateDownload certificate={selected} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
```

#### Achievements (`app/achievements/page.tsx`)
```typescript
'use client';

import { useAuth } from '@/lib/auth-context';
import { useState, useEffect } from 'react';
import { getUserBadges } from '@/lib/badge-service';
import { BadgeCollection } from '@/components/BadgeCollection';
import { Badge } from '@/lib/badge-service';

export default function AchievementsPage() {
  const { user } = useAuth();
  const [badges, setBadges] = useState<Badge[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadBadges = async () => {
      try {
        const userBadges = await getUserBadges(user.uid);
        setBadges(userBadges);
      } catch (error) {
        console.error('Error loading badges:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBadges();
  }, [user]);

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Achievements</h1>
      <BadgeCollection badges={badges} isLoading={isLoading} />
    </div>
  );
}
```

#### Leaderboard (`app/leaderboard/page.tsx`)
```typescript
'use client';

import { useAuth } from '@/lib/auth-context';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getLeaderboard } from '@/lib/leaderboard-service';
import { Leaderboard } from '@/components/Leaderboard';
import { LeaderboardEntry } from '@/lib/leaderboard-service';

export default function LeaderboardPage() {
  const { user } = useAuth();
  const params = useParams();
  const classId = (params.classId as string) || 'default';
  
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'score' | 'progress' | 'streak'>('score');

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const data = await getLeaderboard(classId, sortBy);
        setEntries(data);
      } catch (error) {
        console.error('Error loading leaderboard:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLeaderboard();
  }, [classId, sortBy]);

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Class Leaderboard</h1>
      <Leaderboard
        entries={entries}
        currentUserId={user?.uid}
        isLoading={isLoading}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
    </div>
  );
}
```

### 5. Add Navigation Links

Update your Header/Navigation component:

```typescript
<Link href="/certificates" className="flex items-center gap-2">
  🎓 Certificates
</Link>
<Link href="/achievements" className="flex items-center gap-2">
  🏆 Achievements
</Link>
<Link href="/leaderboard" className="flex items-center gap-2">
  📊 Leaderboard
</Link>
```

### 6. Award Badges on Quiz Completion

In your quiz completion handler, add badge checking:

```typescript
import { checkBadgeEligibility } from '@/lib/badge-service';
import { AchievementUnlocked } from '@/components/AchievementUnlocked';

async function onQuizComplete(userId, classId, score, topicId) {
  // ... existing quiz completion logic ...

  // Check and award badges
  const totalQuizzes = await getTotalQuizzes(userId, classId);
  const topicScores = await getTopicScores(userId, classId);
  const currentStreak = await getCurrentStreak(userId, classId);
  const classRank = await getUserRank(userId, classId);
  const classSize = await getClassSize(classId);

  const newBadges = await checkBadgeEligibility(
    userId,
    classId,
    totalQuizzes,
    topicScores,
    currentStreak,
    classRank,
    classSize
  );

  // Show achievement notification for each new badge
  newBadges.forEach(badge => {
    showAchievementNotification(badge);
  });
}
```

### 7. Update Leaderboard Daily (Optional)

Create a Cloud Function to update leaderboards daily:

```typescript
// functions/src/index.ts
import * as functions from 'firebase-functions';
import { updateLeaderboard } from '../lib/leaderboard-service';

export const updateLeaderboards = functions.pubsub
  .schedule('0 0 * * *') // 12 AM UTC daily
  .onRun(async (context) => {
    const classes = await getClassesCollection();
    for (const classId of classes) {
      await updateLeaderboard(classId);
    }
  });
```

### 8. Test Everything

- [ ] Generate a certificate for a student
- [ ] Download certificate as PDF
- [ ] Share certificate link
- [ ] Award test badges
- [ ] View badge collection
- [ ] Check leaderboard rankings
- [ ] Export data in different formats
- [ ] Verify animations work
- [ ] Test mobile layout
- [ ] Test dark mode

## Key Features

### Certificate Generation
```typescript
const certificate = await generateCertificate(
  userId,
  classId,
  className,
  studentName,
  studentEmail,
  finalScore,
  'default', // templateId
  'Teacher Name' // signature
);
```

### Badge Awarding
```typescript
const badge = await awardBadge(
  userId,
  'milestone',
  'milestone_10',
  { quizCount: 10 }
);
```

### Leaderboard Calculation
```typescript
const entries = await calculateLeaderboard(classId);
// Returns ranked list sorted by score
```

### Export Data
```typescript
const csv = exportStudentAnalyticsCSV(analytics);
downloadFile(csv, 'analytics.csv', 'text/csv');
```

## Database Schema

### Collections to Create

**certificates**
```javascript
{
  id: "string",
  userId: "string",
  classId: "string",
  className: "string",
  studentName: "string",
  studentEmail: "string",
  completionDate: timestamp,
  issuanceDate: timestamp,
  finalScore: number,
  certificateNumber: "string",
  templateId: "string",
  signature: "string",
  status: "issued|revoked",
  downloadCount: number,
  shareLink: "string"
}
```

**badges**
```javascript
{
  id: "string",
  userId: "string",
  badgeType: "milestone|mastery|streak|performance",
  name: "string",
  description: "string",
  icon: "string",
  rarity: "common|rare|epic|legendary",
  awardedDate: timestamp,
  metadata: { ... }
}
```

**leaderboards**
```javascript
{
  userId: "string",
  userName: "string",
  userEmail: "string",
  classId: "string",
  rank: number,
  score: number,
  quizzesCompleted: number,
  topicsCompleted: number,
  streak: number,
  badges: ["id1", "id2", ...],
  lastUpdated: timestamp
}
```

## Performance Tips

1. **Caching**: Cache leaderboards for 24 hours
2. **Lazy Loading**: Load badge details on demand
3. **Batch Operations**: Update multiple certificates at once
4. **Pagination**: Show 50 items per page on leaderboards
5. **Firestore Indexes**: Create composite indexes for queries

## Troubleshooting

### Certificates not generating?
- Verify Firestore `certificates` collection exists
- Check Firestore RLS allows certificate creation
- Verify user is authenticated

### Badges not awarding?
- Ensure `checkBadgeEligibility` is called after quiz completion
- Check badge definitions are complete
- Verify user hasn't already earned badge (duplicates prevented)

### Leaderboard empty?
- Run `calculateLeaderboard(classId)` manually to populate
- Verify `quiz_attempts` collection has data
- Check Firestore RLS allows leaderboard writes

### Export not working?
- Install `jspdf` and `html2canvas` for PDF support
- Check browser allows file downloads
- Verify data exists before exporting

## Customization

### Change Badge Icons
Edit `badge-service.ts` BADGE_DEFINITIONS:
```typescript
milestone_10: {
  name: 'Your Badge Name',
  icon: 'your-emoji',
  ...
}
```

### Add Custom Certificate Template
Create new template in `generateCertificateHTML()` function

### Customize Colors
Edit Tailwind classes in component files

## Security Checklist

- ✅ Verify user owns certificate/badge before showing
- ✅ Firestore RLS restricts access
- ✅ No PII in public leaderboards (consider hiding emails)
- ✅ Rate limit certificate generation
- ✅ Log all certificate revocations
- ✅ Sanitize exported data

## Next Steps

1. ✅ Copy all files to project
2. ✅ Create certificate, achievement, and leaderboard routes
3. ✅ Set up Firestore collections and RLS
4. ✅ Test certificate generation
5. ✅ Award initial badges
6. ✅ Deploy leaderboard
7. ✅ Monitor badge awards
8. → **Launch to production**

## Support

For issues with:
- **Certificates**: Check PDF generator and Firestore access
- **Badges**: Verify eligibility logic and metadata
- **Leaderboards**: Check quiz_attempts data and indexes
- **Exports**: Install dependencies and verify browser permissions
