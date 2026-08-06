# Phase 5 Modifications

## Files to Modify

### 1. components/QuizAnalyticsDashboard.tsx
**Add import at the top:**
```typescript
import { RevisionQueue } from "@/components/RevisionQueue";
```

**In the return JSX, immediately after `<div className="space-y-8">`, add:**
```typescript
      <RevisionQueue />
```

---

### 2. components/Header.tsx

**Find `const navIcons` and add this line:**
```typescript
  "/revision-queue": Calendar,
```
(Make sure Calendar is imported from lucide-react - it already should be)

**Find `const navDescriptions` and add this line:**
```typescript
  "/revision-queue": "Your personalized revision schedule with spaced repetition.",
```

**Find `const navGroups` and in the "Practice" group, update hrefs to:**
```typescript
    hrefs: ["/past-papers", "/model-answers", "/quizzes", "/analytics", "/revision-queue", "/quotes-references", "/dashboard"],
```

---

### 3. data/site-config.ts

**In `primaryNav`, add this line after the Analytics entry:**
```typescript
  { label: "Revision Queue", href: "/revision-queue" },
```

---

## Files to Create

1. **lib/spaced-repetition.ts** → Copy `spaced-repetition.ts` from zip
2. **components/RevisionQueue.tsx** → Copy `RevisionQueue.tsx` from zip
3. **components/RevisionQueueClient.tsx** → Copy `RevisionQueueClient.tsx` from zip
4. **app/revision-queue/page.tsx** → Copy `revision-queue-page.tsx` from zip (rename to `page.tsx`)

---

## After applying all changes:

```powershell
npm run test
git add .
git commit -m "Phase 5: Adaptive Spaced Repetition System

- Implement forgetting curve algorithm for optimal review timing
- Calculate review intervals based on performance and time decay
- Create revision queue showing overdue, due soon, and upcoming topics
- Add RevisionQueue component to analytics dashboard
- Integrate /revision-queue route with full scheduling view
- Topics scored <50% review in 1 day, 50-75% in 3 days, 75%+ in 7 days"

git push origin claude/olevel-islamiyat-site-xoo6l3
```
