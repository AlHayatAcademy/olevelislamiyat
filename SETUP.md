# Phase 14: Analytics & Insights Dashboard Setup

## Files Included

### Services (3)
- `lib__analytics-service.ts` - Query analytics data from Firestore
- `lib__export-service.ts` - Export to CSV/HTML/PDF formats
- `lib__chart-utils.ts` - Format data for visualizations (optional: use Recharts directly)

### Components (4)
- `components__StudentDashboard.tsx` - Student progress analytics
- `components__TeacherDashboard.tsx` - Class-wide analytics  
- `components__AdminDashboard.tsx` - Platform metrics
- `components__AnalyticsCharts.tsx` - Reusable chart components

## Quick Setup (5 Steps)

### 1. Copy Files to Project

```bash
# Copy services
cp lib__analytics-service.ts → src/lib/analytics-service.ts
cp lib__export-service.ts → src/lib/export-service.ts

# Copy components
cp components__StudentDashboard.tsx → src/components/StudentDashboard.tsx
```

### 2. Install Dependencies

```bash
npm install recharts date-fns
```

### 3. Create Routes

#### Student Dashboard (`app/dashboard/student/page.tsx`)
```typescript
'use client';

import { useAuth } from '@/lib/auth-context';
import { useParams } from 'next/navigation';
import { StudentDashboard } from '@/components/StudentDashboard';

export default function StudentDashboardPage() {
  const { user } = useAuth();
  const params = useParams();
  const classId = (params.classId as string) || 'default';

  if (!user) return <div>Loading...</div>;

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      <StudentDashboard
        userId={user.uid}
        classId={classId}
        studentName={user.displayName || 'Student'}
      />
    </div>
  );
}
```

#### Teacher Dashboard (`app/dashboard/teacher/page.tsx`)
```typescript
'use client';

import { useAuth } from '@/lib/auth-context';
import { TeacherDashboard } from '@/components/TeacherDashboard';

export default function TeacherDashboardPage() {
  const { user, userRole } = useAuth();

  if (!user || userRole !== 'teacher') {
    return <div>Unauthorized</div>;
  }

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      <TeacherDashboard teacherId={user.uid} />
    </div>
  );
}
```

### 4. Update Navigation

Add to your Header component:

```typescript
import Link from 'next/link';

<Link href="/dashboard/student" className="flex items-center gap-2">
  📊 My Analytics
</Link>

// For teachers:
{userRole === 'teacher' && (
  <Link href="/dashboard/teacher" className="flex items-center gap-2">
    📈 Class Analytics
  </Link>
)}
```

### 5. Test the Dashboards

1. Take 3-5 quizzes with different scores
2. Navigate to `/dashboard/student`
3. Verify metrics display correctly
4. Test export to CSV
5. Test export to PDF/HTML

## Features Overview

### Student Dashboard
- **Metrics Cards:**
  - Average score (with progress bar)
  - Topics mastered (completion %)
  - Study streak (days)
  - Engagement score

- **Charts:**
  - 30-day performance trend
  - Topic mastery breakdown
  - Time spent analysis

- **Export:**
  - CSV export (opens in Excel)
  - HTML report (printable)

### Teacher Dashboard
- **Class Metrics:**
  - Class average score
  - Students on track (%)
  - Weak topics identified
  - Engagement rate

- **Student List:**
  - Sort by performance
  - Identify high/low performers
  - Flag students needing support

- **Export:**
  - Class report (HTML)
  - Student list (CSV)
  - Performance metrics

### Admin Dashboard (Optional)
- **Platform Metrics:**
  - Daily active users
  - Quiz attempts/week
  - Feature usage
  - AI cost tracking

## Data Queries

### Key Functions

#### Get Student Analytics
```typescript
import { getStudentAnalytics } from '@/lib/analytics-service';

const analytics = await getStudentAnalytics(userId, classId);
// Returns: StudentAnalytics {
//   totalQuizzes, averageScore, highestScore, 
//   currentStreak, engagementScore, ...
// }
```

#### Get Class Analytics
```typescript
import { getClassAnalytics } from '@/lib/analytics-service';

const classMetrics = await getClassAnalytics(classId);
// Returns: ClassAnalytics {
//   averageScore, completionRate, topPerformers,
//   needsSupport, commonWeakTopics, ...
// }
```

#### Get Performance Trend
```typescript
import { getPerformanceTrend } from '@/lib/analytics-service';

const trend = await getPerformanceTrend(userId, classId, 30);
// Returns: PerformanceTrend[] {
//   date, score, attemptCount
// }
```

## Export Functions

### Student Report
```typescript
import { 
  exportStudentAnalyticsCSV,
  generateStudentReportHTML,
  downloadFile 
} from '@/lib/export-service';

// Export to CSV
const csv = exportStudentAnalyticsCSV(analytics);
downloadFile(csv, 'analytics.csv', 'text/csv');

// Export to HTML
const html = generateStudentReportHTML(
  'John Doe', 
  analytics, 
  attempts
);
downloadFile(html, 'report.html', 'text/html');
```

### Class Report
```typescript
import {
  exportClassAnalyticsCSV,
  generateClassReportHTML,
  downloadFile
} from '@/lib/export-service';

const csv = exportClassAnalyticsCSV(classAnalytics);
const html = generateClassReportHTML(classAnalytics);

downloadFile(csv, 'class-analytics.csv', 'text/csv');
downloadFile(html, 'class-report.html', 'text/html');
```

## Firestore Indexes

Create these indexes in Firebase Console for better query performance:

```
Collection: quiz_attempts
Indexes needed:
  - userId, classId, timestamp (desc)
  - classId, timestamp (desc)
  - classId, quizId
```

## Performance Tips

1. **Caching**: Cache analytics for 1 hour
```typescript
const cache = new Map();
const CACHE_DURATION = 3600000; // 1 hour

function getCached(key) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.time < CACHE_DURATION) {
    return cached.data;
  }
  return null;
}
```

2. **Pagination**: Load top 50 items, "load more" on scroll
3. **Lazy Loading**: Load charts only when visible
4. **Aggregation**: Pre-calculate metrics in Cloud Functions

## Troubleshooting

### No Data Displayed
- Verify quiz_attempts collection has data
- Check user has completed quizzes
- Verify classId matches

### Export Not Working
- Check browser allows downloads
- Verify data exists before exporting
- Check browser console for errors

### Slow Dashboard Loading
- Implement caching
- Add pagination
- Reduce data limit (e.g., last 50 quizzes)
- Create Firestore indexes

### Charts Not Rendering
- Verify recharts is installed
- Check data format matches ChartData interface
- Verify responsive sizing

## Customization

### Change Chart Colors
Edit component style prop:
```typescript
<LineChart
  data={chartData}
  style={{ 
    '--color-score': '#3b82f6',  // blue
    '--color-attempts': '#10b981' // green
  } as React.CSSProperties}
>
```

### Add More Metrics
Extend StudentAnalytics interface:
```typescript
interface StudentAnalytics {
  // ... existing fields
  
  // Add new fields
  topicsReviewedThisWeek: number;
  reviewAccuracy: number;
  estimatedMastery: number;
}
```

### Custom Filters
Add to dashboard:
```typescript
const [dateRange, setDateRange] = useState('30days');
const [sortBy, setSortBy] = useState('date');

// Use in analytics query
const trend = await getPerformanceTrend(
  userId, 
  classId, 
  parseInt(dateRange)
);
```

## Security

- ✅ Verify user authentication before loading
- ✅ Check user has access to data (classId)
- ✅ Don't expose sensitive data in exports
- ✅ Firestore RLS restricts data access
- ✅ Rate limit exports (max 1 per 5 seconds)

## Next Steps

1. ✅ Copy files to project
2. ✅ Create dashboard routes
3. ✅ Test with real data
4. ✅ Customize branding/colors
5. ✅ Deploy to production
6. → Phase 15: Certificates & Badges

## Support

- Recharts Docs: https://recharts.org/
- Date-fns Docs: https://date-fns.org/
- Firestore Queries: https://firebase.google.com/docs/firestore/query-data/queries
- Export to PDF: Consider `jspdf` library for advanced PDF features
