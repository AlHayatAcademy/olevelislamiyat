# Content Architecture

Where educational content lives, how it's organized, and how to add more of it. This is the doc
to read before authoring new lessons, questions, quizzes, or references.

> Looking for the proposal to scale this to thousands of items, flashcards, glossary entries, and
> more? See [Content-System-Design.md](./Content-System-Design.md) — a design-only document
> (nothing in it is implemented yet). Current recommendation: no migration needed yet; this
> document describes the system as it actually works today.

## Where content lives

All content is typed TypeScript data — no CMS, no database, no MDX. Every content item is a
plain object literal in an array, validated by `tsc --noEmit` (every field is type-checked) and,
for the invariants that matter most, by tests in `tests/unit/`.

```
data/
  syllabus.ts              Official syllabus structure: sections + subtopics, both papers
  topics/                  Lesson content, one file per syllabus section group
    types.ts               Shared `Topic` interface
    index.ts                `allTopics` barrel + getTopic/getTopicsForSection/getAllTopicParams
    paper1-major-themes.ts
    paper1-history-of-quran.ts
    paper1-life-of-prophet.ts
    paper1-first-islamic-community.ts
    paper2-history-of-hadith.ts
    paper2-caliphs.ts
    paper2-major-teachings-hadith.ts
    paper2-articles-and-pillars.ts
  questions/                Past-paper question bank, one file per exam year
    types.ts                Shared `PastPaperQuestion`/`Paper`/`AO` types
    index.ts                Barrel: concatenates all years, re-exports helper functions
    2021.ts … 2025.ts
  quizzes.ts                Quiz bank
  model-answers.ts          Worked model answers for a subset of questions
  references.ts             Qur'an/Hadith/Seerah quote & reference bank
  search-index.ts           Generated search index (built from the arrays above — don't edit directly)
  search-synonyms.ts        Synonym groups for search
  site-config.ts            Site-wide config (name, contact, nav, social links)
  homepage-content.ts       Homepage-specific copy (features, FAQ, trust badges)
```

## Why split by year/section instead of one file per domain

`data/questions.ts` used to be a single 6,917-line file; `data/topics` files are similarly split.
At ~450 content items today, splitting by a natural boundary (exam year for questions, syllabus
section group for topics) keeps individual files small enough to review and diff sanely, while a
thin `index.ts` barrel keeps every existing import (`import { pastPaperQuestions } from
"@/data/questions"`) working unchanged — TypeScript's directory-index resolution means
`@/data/questions` resolves to `data/questions/index.ts` automatically. **Follow this same
pattern** (`types.ts` + per-natural-boundary files + `index.ts` barrel) for any new content domain
that's likely to grow past a few hundred items.

## Adding a lesson (topic page)

1. Confirm the lesson's `slug` and `section` exist in `data/syllabus.ts` (`paper1Sections` or
   `paper2Sections`) — every lesson **must** correspond to a real syllabus subtopic. This 1:1
   mapping is enforced by `tests/unit/topics-and-syllabus.test.ts`.
2. Add a new object matching the `Topic` interface (`data/topics/types.ts`) to the appropriate
   `data/topics/paperX-*.ts` file (grouped by syllabus section — check the existing files for
   which one covers your section).
3. Required fields: `slug`, `paper`, `section`, `title`, `standing` (one-line summary),
   `learningObjectives`, `keyTerms`, `explanation`, `keyFacts`, `ao1Guidance`, `ao2Guidance`,
   `commonMistakes`, `examTip`, `relatedTopics`.
4. Run `npm run test` — the data-integrity tests will fail loudly if the slug doesn't match a real
   syllabus subtopic, if it duplicates an existing topic, or if a required field is empty.
5. The page at `/paper-{1|2}/{section}/{slug}` is generated automatically via
   `generateStaticParams` in `app/paper-1/[section]/[topic]/page.tsx` — no route file changes
   needed.

## Adding a past-paper question

1. Add to the array in the matching year file under `data/questions/` (e.g. a 2025 question goes
   in `data/questions/2025.ts`). If a new year needs to be added, create `data/questions/<year>.ts`
   following the same shape as the existing files and wire it into `data/questions/index.ts`'s
   import list and `pastPaperQuestions` spread.
2. Required fields match `PastPaperQuestion` in `data/questions/types.ts`: `id`, `year`, `session`,
   `qualification`, `paper`, `variant`, `questionNumber`, `part`, `marks`, `ao`, `syllabusPaper`,
   `sectionSlug`, optional `subtopicSlug`, `topicHint`, `prompt`, `sourceNote`.
3. **`prompt` must be verbatim** question wording from the official source document, and
   `sourceNote` must cite the exact source file it was transcribed from (see `source/` below).
   This is a content-integrity rule, not just a style preference — the project's credibility rests
   on questions being genuinely verbatim, not paraphrased.
4. `id` convention: `<year>-<session-short>-p<variant>-q<number><part>`, e.g.
   `"2021-jj-p11-q2a"` (2021, June/July session, Paper 1 Variant 11, Question 2 part a).
5. `sectionSlug`/`subtopicSlug` link the question back to `data/syllabus.ts` — set `subtopicSlug`
   only when the question maps confidently to one specific lesson; leave it unset for
   general/whole-section questions (these show under a "General" bucket on topical browsing
   pages).

## Adding a quiz

Add to `data/quizzes.ts`'s `quizzes` array, matching the `Quiz` interface. Each question is one of
`McqQuestion` | `TrueFalseQuestion` | `MatchingQuestion` (discriminated by `type`). Per the file's
own header comment: **question wording must be original** (written fresh for the quiz engine),
but every fact tested must be genuinely derivable from the corresponding lesson's `keyFacts`,
`keyTerms`, or `explanation` in `data/topics/` — link back via `topicSlug` so learners can revise
the source lesson.

## Adding a reference (Qur'an/Hadith/Seerah quote)

Add to `data/references.ts`'s `references` array, matching `ReferenceEntry`. Per the file's header
comment: Qur'anic translations should be Sahih International (checked against the real
surah/ayah), Hadith citations must give the exact collection and number, and `explanation` must be
original — never copied from a mark scheme.

## Adding a model answer

Add to `data/model-answers.ts`'s `modelAnswers` array, matching `ModelAnswer`. `id` should be
`ma-<questionId>` and `questionId` must match a real `PastPaperQuestion.id`. Per the file's header
comment: written from understanding of what the syllabus/mark schemes reward — never copied or
closely paraphrased from mark-scheme wording.

## Naming and slug conventions

- **Slugs**: kebab-case, descriptive, stable (changing a slug breaks every URL and internal link
  to that content — treat existing slugs as effectively permanent).
- **IDs**: see the per-domain conventions above (questions: `<year>-<session>-p<variant>-q<n><part>`;
  model answers: `ma-<questionId>`; references: `ref-<descriptive-slug>`).
- **Data files**: kebab-case matching their content boundary (`paper1-life-of-prophet.ts`,
  `2021.ts`).

## Data validation rules

There is no runtime schema validator (e.g. Zod) — validation is TypeScript's structural typing
(`tsc --noEmit`) plus the targeted data-integrity tests in `tests/unit/`:

- `tests/unit/topics-and-syllabus.test.ts` — every syllabus subtopic ↔ exactly one topic, no
  duplicates, every topic's core fields are non-empty.
- `tests/unit/questions.test.ts` — no duplicate question IDs, every question has a non-empty
  prompt/sectionSlug/sourceNote, positive marks, valid paper number.
- `tests/unit/search-synonyms.test.ts` — no term appears in two different synonym groups.

**When adding a new content domain at scale**, add an equivalent data-integrity test alongside it
— this is cheap insurance against the exact kind of silent drift (orphaned content, broken
cross-references) that's easy to introduce by hand at a few hundred items and very expensive to
untangle at a few thousand.

## Source documents (`source/`)

`source/` contains the original syllabus and past-paper documents content was transcribed/verified
from — `.docx` extractions of official Cambridge past-paper PDFs and syllabus documents. These are
**required for the content workflow** (every question's `sourceNote` cites one of these files as
its provenance trail) and should not be deleted. See
[Decision-Log.md](./Decision-Log.md#source-documents-stay-in-the-repo) for why they're kept
versioned in the repo rather than moved out, and
[Migration-History.md](./Migration-History.md) for what's been cleaned up from this directory so
far (duplicate/accidental files).

Two things to know before adding new source documents:

1. **Check for duplicates first** — accidental re-uploads have happened before (see
   Migration-History.md). A quick `md5sum` comparison against existing files in the target
   subfolder catches this.
2. **Copyright**: `source/03-paper-2/paper-2-content.docx` is a commercial textbook, not original
   material — content has never been and must never be transcribed from it directly. Public
   syllabus documents and verbatim past-paper question papers (used under fair use/citation for
   educational commentary, with clear sourcing) are fine; copyrighted third-party prose is not.
