# Phase 6 Modifications

## Files to Modify

### 1. components/QuizAnalyticsDashboard.tsx
**Add import at the top:**
```typescript
import { RevisionRecommendations } from "@/components/RevisionRecommendations";
```

**In the return JSX, after `<RevisionQueue />`, add:**
```typescript
      <RevisionRecommendations />
```

---

### 2. components/Header.tsx

**Find `const navIcons` and add this line:**
```typescript
  "/revision-recommendations": Lightbulb,
```

**Make sure Lightbulb is imported from lucide-react. If not, add to imports:**
```typescript
import { ..., Lightbulb, ... } from "lucide-react";
```

**Find `const navDescriptions` and add this line:**
```typescript
  "/revision-recommendations": "Personalized study plan based on your performance.",
```

**Find `const navGroups` and in the "Practice" group, update hrefs to:**
```typescript
    hrefs: ["/past-papers", "/model-answers", "/quizzes", "/analytics", "/revision-queue", "/revision-recommendations", "/quotes-references", "/dashboard"],
```

---

### 3. data/site-config.ts

**In `primaryNav`, add this line after the Revision Queue entry:**
```typescript
  { label: "Revision Recommendations", href: "/revision-recommendations" },
```

---

## Files to Create

1. **lib/revision-recommendations.ts** → Copy `revision-recommendations.ts` from zip
2. **components/RevisionRecommendations.tsx** → Copy `RevisionRecommendations.tsx` from zip
3. **components/RevisionRecommendationsClient.tsx** → Copy `RevisionRecommendationsClient.tsx` from zip
4. **app/revision-recommendations/page.tsx** → Copy `revision-recommendations-page.tsx` from zip (rename to `page.tsx`)

---

## After applying all changes:

```powershell
npm run test
git add .
git commit -m "Phase 6: Personalized Revision Recommendations

- Generate intelligent study plans based on quiz performance
- Prioritize topics by urgency (critical/high/medium/low)
- Estimate study time for each topic
- Show exam impact and difficulty levels
- Integrate recommendations into analytics dashboard
- Critical topics (<40%) need immediate focus
- High priority topics (40-60%) require practice
- Track study progress toward exam readiness"

git push origin claude/olevel-islamiyat-site-xoo6l3
```
