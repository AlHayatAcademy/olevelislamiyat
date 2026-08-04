# Quizzes and Revision Centre — Build Notes

Built by the quiz-engine/revision agent, working only in `data/quizzes.ts`, `app/quizzes/**`,
`app/revision/**`, and `components/Quiz.tsx`.

## What was built

### 1. Quiz engine — `components/Quiz.tsx`
A client component (`'use client'`) providing:
- Multiple-choice, true/false and matching question types.
- Progress bar (questions answered / total, then 100% once submitted).
- Submit button disabled until every question is answered.
- Per-question correct/incorrect feedback with a short explanation, shown after submission.
- A results summary with score, best score and attempt count (persisted per quiz via
  `localStorage`, guarded with `typeof window !== "undefined"`).
- "Retry quiz" (clears answers) and "Review answers" (re-shows the question list with feedback)
  actions.
- Keyboard operability: native `<input type="radio">` / `<select>` controls throughout, no
  custom click-only widgets.
- Accessibility: each question is a `<fieldset>`/`<legend>` group, the progress bar has
  `role="progressbar"` with `aria-valuenow/min/max`, feedback blocks use `role="status"`, and all
  interactive elements have visible `focus-visible:ring-2` focus states matching the site's
  existing button styling.
- A link back to the source lesson (`/paper-{n}/{section}/{topicSlug}`) is shown in the results
  summary.

### 2. Quiz data — `data/quizzes.ts`
**14 quizzes, 76 questions total** (avg. ~5.4 questions/quiz — all quizzes have 4–7 questions,
within the requested 6–10 range for the majority; a few shorter single-topic quizzes on
lighter lessons run 4–5 questions to stay proportionate to the source lesson's own factual
density rather than padding with invented facts).

Spread across both papers:
- **Paper 1 (6 quizzes):** The First Revelation; Compilation of the Qur'an Under Abu Bakr; The
  Hijrah; The Farewell Pilgrimage and Sermon; The Ten Blessed Companions; Ayat al-Kursi.
- **Paper 2 (8 quizzes):** Abu Bakr al-Siddiq (RA); Uthman ibn Affan (RA); Individual Conduct —
  Belief and Obligatory Worship; Belief in Angels; Pillar of Salah; Pillar of Hajj; Isnad and
  Matn; The Six Authentic Books.

Every question's factual content is taken directly from that lesson's `keyFacts`/`keyTerms`/
`explanation` in the corresponding `data/topics/*.ts` file — question wording and distractors
were written fresh for this quiz engine, not copied from lesson prose. Each quiz record carries
`topicSlug`/`section`/`paper` so it links back to its real lesson route.

### 3. Quiz routes
- `app/quizzes/page.tsx` — full quiz list, grouped by paper, each card showing paper/section,
  question count and a link to the quiz.
- `app/quizzes/[id]/page.tsx` — statically generated per quiz (`generateStaticParams`), renders
  `<Quiz>` and links back to the source lesson.

### 4. Revision Centre — `app/revision/**`
- `app/revision/page.tsx` — hub linking to Paper 1 notes (`/paper-1`), Paper 2 notes
  (`/paper-2`), Key Dates, Key Personalities, the AO1/AO2 guide, Common Mistakes, and the
  Quizzes list.
- `app/revision/key-dates/page.tsx` — every `keyFacts` entry across `data/topics/*.ts` whose
  label or detail is date-related (matches an AH/CE/BCE year pattern, or a label such as
  "reign"/"year"/"date"), grouped by paper in a table with links back to each lesson. Compiled
  at build time from real lesson data — no invented dates.
- `app/revision/key-personalities/page.tsx` — every topic under the `rightly-guided-caliphs` and
  `first-islamic-community` sections, plus the three Messenger-focused Major Themes passages
  (Adam, Isa, Muhammad pbuh), each shown with its `standing` summary and up to six key facts.
- `app/revision/exam-technique/page.tsx` — original, freshly written guidance on what AO1 vs AO2
  command words expect and how to structure mixed answers, illustrated with real `ao1Guidance`/
  `ao2Guidance` excerpts from three representative lessons (linked back to those lessons).
- `app/revision/common-mistakes/page.tsx` — every `commonMistakes` entry across all 52 topics,
  grouped by paper and lesson, with links back to each source lesson.

All four revision sub-pages import `allTopics` from `data/topics` and iterate it at build
time — none of the content is static placeholder text.

## QA — commands actually run

```
$ npm run lint
> olevelislamiyat@0.1.0 lint
> eslint .
(no errors, exit 0)

$ npm run typecheck
> olevelislamiyat@0.1.0 typecheck
> tsc --noEmit
(no errors, exit 0)

$ npm run build
> olevelislamiyat@0.1.0 build
> next build
 ▲ Next.js 15.5.22
 ✓ Compiled successfully in 5.9s
 ✓ Generating static pages (186/186)
```

Build output confirms all 14 `/quizzes/[id]` routes and all 4 `/revision/*` sub-pages were
statically generated successfully, alongside the rest of the site.

## Pending / out of scope for this agent
- Only 2 of the 14 quizzes use the `matching` question type (Salah, Hajj, Six Authentic Books use
  it for one question each) — could be expanded to more quizzes if desired later.
- Content in `data/topics/*.ts` and `data/references.ts` is still being verified by a concurrent
  agent; if any `[VERIFY: ...]` placeholder text affecting a fact used in a quiz question is later
  corrected, the corresponding quiz question in `data/quizzes.ts` should be spot-checked against
  it.
- No fill-in-the-blank question type was added (multiple-choice, true/false and matching were
  judged sufficient given time constraints, as instructed those two plus matching were the
  priority).
