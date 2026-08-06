# Phase 14: Analytics & Insights Dashboard

## Overview
Implement comprehensive analytics dashboards for students, teachers, and administrators with real-time insights, progress tracking, performance visualization, and export capabilities.

## Architecture

### 1. Student Dashboard
- Personal progress tracking
- Quiz performance analytics
- Learning path progress
- Topic mastery visualization
- Goal tracking
- Study streak counter
- Time spent analytics

### 2. Teacher Dashboard
- Class-wide performance metrics
- Student progress overview
- Quiz difficulty analysis
- Time-on-task metrics
- Engagement tracking
- Common weak areas
- Student grouping by performance

### 3. Admin Dashboard
- Platform-wide analytics
- User growth metrics
- System health
- Cost tracking (AI usage)
- Feature adoption
- Performance bottlenecks
- Revenue analytics (if applicable)

## Database Schema

```typescript
// quiz_analytics table
interface QuizAnalytics {
  id: string;
  quizId: string;
  classId: string;
  userId: string;
  score: number;
  maxScore: number;
  timeSpent: number; // seconds
  attemptNumber: number;
  questionAnalytics: {
    questionId: string;
    correct: boolean;
    timeSpent: number;
    difficulty: number;
  }[];
  createdAt: Timestamp;
}

// user_analytics table
interface UserAnalytics {
  userId: string;
  totalQuizzesAttempted: number;
  averageScore: number;
  totalTimeSpent: number; // seconds
  streakDays: number;
  lastActiveDate: Timestamp;
  topicsCompleted: string[];
  topicsInProgress: string[];
  engagementScore: number; // 0-100
  learningVelocity: number; // topics/week
  peakStudyTime: string; // 'morning' | 'afternoon' | 'evening'
}

// class_analytics table
interface ClassAnalytics {
  classId: string;
  totalStudents: number;
  averageScore: number;
  completionRate: number; // 0-100
  engagementRate: number; // 0-100
  commonWeakTopics: string[];
  topPerformers: string[];
  needsSupport: string[];
  lastUpdated: Timestamp;
}

// platform_analytics table
interface PlatformAnalytics {
  date: string; // YYYY-MM-DD
  dailyActiveUsers: number;
  newUsers: number;
  totalQuizzesTaken: number;
  averageScore: number;
  aiApiCost: number;
  engagementMetrics: {
    discussionCount: number;
    questionCount: number;
    explainationCount: number;
  };
}
```

## File Structure

```
src/
├── lib/
│   ├── analytics-service.ts       // Core analytics queries
│   ├── metrics-calculator.ts      // Metric computations
│   ├── export-service.ts          // PDF/CSV export
│   └── chart-utils.ts             // Chart data formatting
├── hooks/
│   ├── useStudentAnalytics.ts    // Student dashboard data
│   ├── useTeacherAnalytics.ts    // Teacher dashboard data
│   ├── useAdminAnalytics.ts      // Admin dashboard data
│   └── useChartData.ts           // Format data for charts
├── components/
│   ├── StudentDashboard.tsx       // Student analytics view
│   ├── TeacherDashboard.tsx       // Teacher analytics view
│   ├── AdminDashboard.tsx         // Admin analytics view
│   ├── charts/
│   │   ├── PerformanceChart.tsx  // Line/area chart
│   │   ├── DistributionChart.tsx // Bar chart
│   │   ├── MasteryHeatmap.tsx    // Heatmap visualization
│   │   ├── ProgressGauge.tsx     // Circular progress
│   │   └── TrendChart.tsx        // Trend analysis
│   ├── ProgressCard.tsx           // Stat card component
│   ├── ExportButton.tsx           // Export to PDF/CSV
│   └── FilterPanel.tsx            // Date/class filters
└── app/
    ├── dashboard/page.tsx         // Main dashboard router
    ├── analytics/student/page.tsx
    ├── analytics/teacher/page.tsx
    └── analytics/admin/page.tsx
```

## Key Services

### analytics-service.ts
```typescript
// Student analytics
getStudentAnalytics(userId: string, classId: string): Promise<StudentAnalytics>
getStudentProgress(userId: string, classId: string): Promise<ProgressData>
getStudentStreaks(userId: string): Promise<StreakData>

// Teacher analytics
getClassAnalytics(classId: string): Promise<ClassAnalytics>
getStudentComparison(classId: string): Promise<StudentComparison[]>
getWeakTopics(classId: string): Promise<{topic, percent}[]>
getStudentGrouping(classId: string): Promise<StudentGroup[]>

// Admin analytics
getPlatformAnalytics(dateRange: DateRange): Promise<PlatformMetrics>
getUserGrowth(dateRange: DateRange): Promise<GrowthData[]>
getEngagementMetrics(dateRange: DateRange): Promise<EngagementMetrics>
getCostAnalytics(): Promise<CostData>
```

### metrics-calculator.ts
```typescript
// Calculate composite metrics
calculateEngagementScore(userId: string): Promise<number>
calculateLearningVelocity(userId: string): Promise<number>
calculateStudyPatterns(userId: string): Promise<StudyPattern>
calculateMastery(userId: string, topicId: string): Promise<number>
calculateCompletion(classId: string): Promise<number>
```

### export-service.ts
```typescript
// Export to different formats
exportStudentReport(userId: string, format: 'pdf'|'csv'): Promise<Buffer>
exportClassReport(classId: string, format: 'pdf'|'csv'): Promise<Buffer>
exportPlatformReport(dateRange: DateRange, format: 'pdf'|'csv'): Promise<Buffer>

// Generate certificates
generateCertificate(userId: string, classId: string): Promise<Buffer>
generateBadges(userId: string): Promise<Badge[]>
```

### chart-utils.ts
```typescript
// Format data for different chart types
formatLineChartData(data: any[]): ChartData
formatBarChartData(data: any[]): ChartData
formatHeatmapData(data: any[]): HeatmapData
formatGaugeData(score: number): GaugeData
```

## Component Specs

### StudentDashboard.tsx
**Cards:**
- Overall score (gauge)
- Quizzes completed (counter)
- Topics mastered (counter)
- Study streak (counter)
- Current mastery level (gauge)

**Charts:**
- Performance trend (line chart - last 30 days)
- Topic mastery heatmap (grid)
- Time spent by topic (bar chart)
- Quiz score distribution (histogram)

**Actions:**
- View detailed analytics
- Export progress report
- Set goals
- Compare with class average

### TeacherDashboard.tsx
**Overview Cards:**
- Class average (gauge)
- Students on track (%)
- Needs attention (count)
- Completion rate (%)

**Charts:**
- Class performance trend (line chart)
- Student score distribution (histogram)
- Topic difficulty analysis (bar chart)
- Engagement heatmap by day/hour

**Student List:**
- Student name
- Current score
- Progress bar
- Last activity
- Action menu (view details, email)

**Filters:**
- By date range
- By topic
- By performance level

### AdminDashboard.tsx
**KPI Cards:**
- DAU (Daily Active Users)
- New users (week)
- Total quizzes (week)
- Platform engagement (%)
- AI usage cost

**Charts:**
- User growth (line chart)
- Daily quiz attempts (area chart)
- Feature usage (pie chart)
- Cost trends (line chart)

**Tables:**
- Top classes
- Most attempted topics
- System health metrics
- Cost breakdown

## Visualization Components

### PerformanceChart.tsx (Line/Area)
- X-axis: dates
- Y-axis: score/percentage
- Multiple series (if comparing)
- Tooltip on hover
- Legend
- Responsive sizing

### DistributionChart.tsx (Bar/Histogram)
- X-axis: score ranges or categories
- Y-axis: count
- Color coding
- Hover details
- Export as image

### MasteryHeatmap.tsx
- Rows: topics or students
- Columns: weeks
- Cell color: mastery level (0-100)
- Color scale: red(0%) → yellow(50%) → green(100%)
- Click to drill down

### ProgressGauge.tsx
- Circular progress indicator
- Percentage text in center
- Color coding (red/yellow/green)
- Optional target indicator
- Animation on load

### TrendChart.tsx
- Multi-line chart
- Compare trends over time
- Forecast next 30 days (with ML)
- Confidence interval
- Hover details

## Real-Time Updates

```typescript
// Listen to real-time quiz submissions
onSnapshot(
  query(collection(db, 'quiz_attempts'),
    where('classId', '==', classId),
    orderBy('timestamp', 'desc'),
    limit(100)
  ),
  (snapshot) => updateAnalytics()
)

// Update dashboards every 5 minutes
setInterval(() => refreshAnalytics(), 5 * 60 * 1000)
```

## Export Formats

### PDF Report
- Header with student/class info
- Charts as embedded images
- Summary statistics
- Detailed breakdown by topic
- Professional styling
- Page breaks for large reports

### CSV Export
- Simple tabular format
- One row per quiz attempt
- Columns: date, topic, score, time, etc.
- Compatible with Excel/Sheets
- Suitable for further analysis

### JSON Export
- Raw analytics data
- Complete structure
- For integration with BI tools
- All metrics included

## Performance Optimization

- **Materialized Views** - Pre-calculate common metrics
- **Caching** - Cache analytics for 1 hour
- **Lazy Loading** - Load charts on demand
- **Pagination** - Show top 50 items, load more on scroll
- **Aggregation** - Batch process analytics updates
- **Indexing** - Create Firestore indexes for common queries

## Dark Mode
- All charts support dark mode
- Proper contrast ratios (4.5:1+)
- Dark theme colors for charts
- Readable labels in both modes

## Mobile Optimization
- Stacked layout on mobile
- Smaller charts with touch interaction
- Scrollable tables
- Larger touch targets (44px+)
- Collapsible sections
- Swipe gestures for filtering

## Testing Checklist

- [ ] Student dashboard loads
- [ ] Student performance chart displays
- [ ] Topic mastery heatmap renders
- [ ] Teacher dashboard shows class metrics
- [ ] Student comparison table works
- [ ] Weak topics identified correctly
- [ ] Admin dashboard displays KPIs
- [ ] User growth chart updates
- [ ] Cost tracking accurate
- [ ] Export to PDF works
- [ ] Export to CSV works
- [ ] Filters apply correctly
- [ ] Real-time updates work
- [ ] Dark mode renders properly
- [ ] Mobile layout responsive
- [ ] Touch interactions work
- [ ] Accessibility labels present
- [ ] Performance < 3s load time

## Success Metrics

- Dashboard load time < 3s
- Chart render time < 1s
- Export generation < 5s
- Real-time updates every 5 min
- Student engagement +30%
- Teacher time saved: 5 hrs/week
- Export usage > 70% of users
- Mobile usage > 40%

## Next Steps

1. Copy service files to `src/lib/`
2. Copy components to `src/components/`
3. Create app routes
4. Integrate with existing analytics
5. Test all dashboards
6. Deploy and monitor
7. Proceed to Phase 15 (Certificates)

## Dependencies

- `recharts` - React charting library
- `pdfkit` - PDF generation
- `papaparse` - CSV parsing
- `date-fns` - Date utilities
- `firebase` - Real-time database

## Support

- Recharts docs: https://recharts.org/
- PDF generation: https://pdfkit.org/
- Firestore queries: https://firebase.google.com/docs/firestore/query-data/queries
