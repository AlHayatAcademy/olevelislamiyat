# Phase 7 Modifications

## Files to Modify

### 1. components/Dashboard.tsx (or wherever you want to add Progress widget)
Add the ProgressDashboard component to show exam readiness on the main dashboard.

**Add import:**
```typescript
import { ProgressDashboard } from "@/components/ProgressDashboard";
```

**In the JSX, add:**
```typescript
<ProgressDashboard />
```

---

### 2. components/Header.tsx

**Find `const navIcons` and add this line:**
```typescript
  "/progress": TrendingUp,
```

**Make sure TrendingUp is imported from lucide-react. If not, add to imports:**
```typescript
import { ..., TrendingUp, ... } from "lucide-react";
```

**Find `const navDescriptions` and add this line:**
```typescript
  "/progress": "Track your exam readiness, achievements, and learning journey.",
```

**Find `const navGroups` and in the "Practice" group, update hrefs to:**
```typescript
    hrefs: ["/past-papers", "/model-answers", "/quizzes", "/analytics", "/revision-queue", "/revision-recommendations", "/progress", "/quotes-references", "/dashboard"],
```

---

### 3. data/site-config.ts

**In `primaryNav`, add this line after the Revision Recommendations entry:**
```typescript
  { label: "Progress", href: "/progress" },
```

---

## Files to Create

1. **lib/progress-tracking.ts** → Copy `progress-tracking.ts` from zip
2. **components/ProgressDashboard.tsx** → Copy `ProgressDashboard.tsx` from zip
3. **components/ProgressClient.tsx** → Copy `ProgressClient.tsx` from zip
4. **app/progress/page.tsx** → Copy `progress-page.tsx` from zip (rename to `page.tsx`)

---

## Milestones Included

- 🎯 First Step - Complete your first quiz
- 📚 Committed Learner - Complete 5 quizzes
- 🔥 Consistent Practitioner - Complete 10 quizzes
- 💯 Flawless - Score 100% on a quiz
- 👑 Topic Master - Master a topic (75%+)
- 📄 Paper 1 Ready - Achieve 75%+ on Paper 1
- 📄 Paper 2 Ready - Achieve 75%+ on Paper 2
- 🎓 Exam Ready - Achieve 75%+ overall

---

## After applying all changes:

```powershell
npm run test
git add .
git commit -m "Phase 7: Progress Tracking & Milestones

- Calculate comprehensive exam readiness score
- Track topics mastered vs struggling
- Show paper-specific progress (Paper 1 & 2)
- Implement milestone achievement system with 8 badges
- Show next milestones to unlock
- Visualize learning journey with progress metrics
- Integrate progress dashboard into learner experience
- Track total attempts and learning engagement"

git push origin claude/olevel-islamiyat-site-xoo6l3
```
