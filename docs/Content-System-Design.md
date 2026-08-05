# Content System Design (Phase 3.2 — Design Only)

**Status: proposal, not implemented.** No code or content has been changed to produce this
document. This is the Architecture Design Document, data schemas, migration strategy, and
implementation roadmap requested for Phase 3.2, for review before any decision to build it.

For how the content system works *today*, see [Content-Architecture.md](./Content-Architecture.md)
— this document is the *proposed future state*, not a replacement for that one (yet).

---

## 1. Should this migrate at all right now?

**Recommendation: not yet.** Here's the honest assessment before the rest of the design:

| Signal | Current state | Migration-justifying threshold |
|---|---|---|
| Content volume | ~450 items (99 lessons, 351 questions, 14 quizzes, 29 references, 10 model answers) | Low thousands, where per-file review/diff starts hurting |
| Largest single file | `data/questions/2025.ts` (~1,230 lines) | A few thousand lines, post-split |
| Authoring model | Code review by whoever edits the TS files (currently an AI assistant + repo owner) | Multiple non-technical content authors needing a UI |
| Cross-reference integrity | Enforced by TypeScript + `tests/unit/topics-and-syllabus.test.ts` etc. | Same guarantees needed at 10x scale |
| Build time impact | Negligible (`npm run build` ~seconds) | Noticeable slowdown from parsing thousands of content files |

The current TypeScript-array approach, split by natural boundary (year, section) with a
`types.ts` + `index.ts` barrel per domain, **still has real headroom** — it comfortably
type-checks, diffs cleanly, and its cross-reference invariants are test-enforced. Migrating now
would trade a working, well-understood system for a new one, for a scale problem that doesn't
exist yet.

**What follows is the design to have ready** for when volume, contributor count, or content-type
diversity (flashcards, glossary, scholar bios — none of which exist yet) actually forces the
question — not a plan to execute immediately. Section 7 gives concrete trigger conditions.

---

## 2. Options considered

### Option A — Keep TypeScript arrays, scale the existing pattern
Extend the current `types.ts` + per-boundary-file + `index.ts` barrel pattern to new content types
(flashcards, glossary, scholar bios) as they're added, splitting further (e.g. per-subtopic
instead of per-section) if any single file gets unwieldy.

- **Pros**: zero migration risk, zero new tooling, full type-checking, already proven at current
  scale, content changes go through the same code-review process as everything else.
- **Cons**: still requires a code change (and, practically, developer involvement) for every
  content edit — real friction if non-technical subject-matter contributors are ever needed. No
  authoring UI. Doesn't reduce file count as volume grows, only file *size*.

### Option B — MDX (Markdown + JSX) content files
One `.mdx` file per content item, frontmatter for metadata, Markdown/JSX body for rich content.

- **Pros**: content is closer to prose (good for lessons/articles/glossary), can still be authored
  in a code editor and reviewed via git diff, supports rich formatting without a rendering engine
  to build. Good ecosystem support in Next.js (`@next/mdx` or `next-mdx-remote`).
- **Cons**: loses TypeScript's structural type-checking on the *body* content (frontmatter can
  still be schema-validated); another build step; less natural fit for highly structured data
  like `PastPaperQuestion` (marks, AO, session, variant — this is closer to a database row than
  prose) — MDX suits lessons/articles far better than questions/quizzes.

### Option C — Headless CMS (Contentful/Sanity/Payload/etc.)
Content authored in an external system, fetched at build or request time.

- **Pros**: real non-technical authoring UI, built-in versioning/preview/workflow, scales to any
  volume without repo bloat.
- **Cons**: a new external dependency and vendor relationship (cost, uptime, data ownership — a
  meaningful shift for a project that has otherwise deliberately avoided external services),
  requires content migration *into* a system with its own schema constraints, loses git-based
  review history for content changes, adds a runtime dependency (fetch/cache/revalidate) where
  today there is none. Overkill relative to current authoring needs (a small number of trusted
  contributors, not an open editorial team).

### Option D — Hybrid: structured data stays TypeScript, prose-heavy content moves to MDX
Highly structured, relationally-validated content (`PastPaperQuestion`, `Quiz`, `SyllabusSection`)
stays as typed TypeScript arrays (Option A). Prose-heavy, less structurally-constrained content
(long-form articles, glossary entries, scholar biographies — new content types being planned, not
yet built) moves to MDX (Option B) as they're introduced, since they benefit more from rich-text
authoring than from strict field validation.

### Recommendation: **Option A now, Option D as a future evolution, Option C only if non-technical
authoring becomes a hard requirement.**

Don't adopt Option C speculatively — it's the only option here with a real ongoing cost and
external dependency, and nothing in the current roadmap requires it. If a CMS is ever justified,
it should be by an explicit product decision to open content authoring beyond the current
trusted-contributor model, not by content volume alone.

---

## 3. Proposed folder structure (for when scale justifies it)

Matches the structure requested in the Phase 3 brief, adapted to fit the hybrid recommendation
above — note this is **not** a wholesale replacement of `data/`, it's what `data/` would grow
into if/when new prose-heavy content types are added:

```
content/                        (NEW - MDX content, Option D types only)
  articles/                     Long-form articles (exam tips, study guides)
  glossary/                     Glossary term entries
  scholars/                     Scholar biography entries

data/                           (EXISTING - stays TypeScript, Option A)
  syllabus.ts
  topics/                       Lessons - stays here (structured: learningObjectives,
                                 keyFacts, ao1Guidance etc. are exam-schema-shaped, not prose)
  questions/                    Past-paper questions - stays here (row-shaped data)
  quizzes.ts                    Stays here (discriminated-union question types)
  model-answers.ts              Stays here
  references.ts                 Stays here (structured citation fields)
  flashcards/                   NEW but stays TypeScript-structured (front/back + metadata
                                 is exactly as row-shaped as a quiz question)
```

**Why lessons/questions/quizzes/flashcards/references stay TypeScript even in the target
state**: every one of these has a fixed, small set of strictly-typed fields with real
cross-reference relationships (a question's `sectionSlug` must match a real syllabus section; a
flashcard's source lesson must exist) that TypeScript + the existing data-integrity test pattern
enforces well. **Why articles/glossary/scholars go to MDX**: these are long-form prose where the
value is in rich formatting and readability, not in a rigid field schema — a glossary entry is
closer to a dictionary definition than a database row.

---

## 4. Data schemas (proposed, for new content types)

All new content types would follow the existing project convention: a `types.ts` interface,
enforced by `tsc --noEmit`, plus a data-integrity test. Every content item — new or existing —
gains these previously-missing common fields, since none of the current types have them and
they're prerequisites for Phase 3.3 (search filters) and personalization features:

```typescript
// Proposed common fields, to be added to every content type over time (not a breaking change -
// additive, optional fields don't require touching existing data until each item is enriched).
interface ContentMeta {
  difficulty?: "foundation" | "standard" | "challenging";
  tags?: string[];                    // free-form, e.g. ["hajj", "pillars", "AO2"]
  relatedContent?: ContentRef[];      // cross-type links (a lesson -> its flashcards -> its quiz)
  lastReviewed?: string;              // ISO date - content-freshness signal, not a publish date
}

interface ContentRef {
  type: "topic" | "question" | "quiz" | "flashcard" | "reference" | "article" | "glossary";
  slug: string;
  paper?: 1 | 2;
}
```

### Flashcard (new content type)

```typescript
interface Flashcard {
  id: string;                    // "fc-<topic-slug>-<n>"
  front: string;                 // prompt/question side
  back: string;                  // answer side
  topicSlug: string;             // links to data/topics - which lesson this reinforces
  sectionSlug: string;
  paper: 1 | 2;
  sourceField: "keyFact" | "keyTerm" | "explanation"; // which part of the lesson this
                                                        // was derived from (provenance,
                                                        // matching the project's existing
                                                        // "never invent content" discipline)
}
```

Deliberately **not** including a spaced-repetition scheduling state (`easeFactor`,
`nextReviewDate`, etc.) in the content schema itself — that's *learner* state, not content, and
belongs in the localStorage-based (later account-based) data model from Phase 3.4/3.6, keyed by
flashcard `id`. Keeping content and learner-progress schemas separate is a deliberate design
principle carried through this whole document (see §6).

### Glossary entry (new content type, MDX)

```yaml
# content/glossary/zakah.mdx frontmatter
id: "glossary-zakah"
term: "Zakah"
arabicTerm: "زكاة"
shortDefinition: "One of the Five Pillars: obligatory almsgiving."
relatedTopics: ["paper2/articles-of-faith-and-pillars/zakah"]
tags: ["pillars", "paper-2"]
```
Body (Markdown/JSX below frontmatter): full definition, usage in Qur'an/Hadith, common
exam-answer pitfalls.

### Scholar biography (new content type, MDX)

```yaml
# content/scholars/abu-hanifa.mdx frontmatter
id: "scholar-abu-hanifa"
name: "Imam Abu Hanifa"
era: "699-767 CE"
relatedTopics: ["paper2/rightly-guided-caliphs/..."]
tags: ["scholars", "paper-2"]
```

### Article (new content type, MDX — "examiner tips", study guides)

```yaml
# content/articles/how-to-answer-ao2-questions.mdx frontmatter
id: "article-ao2-technique"
title: "How to Answer AO2 Questions"
category: "exam-technique"
relatedTopics: []          # can be broad/cross-cutting, unlike a lesson
tags: ["exam-technique", "AO2"]
```

### Existing types — additive changes only

`Topic`, `PastPaperQuestion`, `Quiz`, `ModelAnswer`, `ReferenceEntry` (all in `data/`) would each
gain the optional `ContentMeta` fields above, added incrementally (not a forced migration of all
existing ~450 items at once — see §5).

---

## 5. Migration strategy (if/when triggered)

Principle: **additive and reversible at every step**, matching how the `data/questions.ts` split
was done in this project (verified byte-identical output, zero importer changes, one commit).

1. **Add `ContentMeta` fields to existing `types.ts` files as optional.** No existing data needs
   to change; new items can populate them, old items default to `undefined`. Zero migration risk
   — this is a type-signature change, not a data change.
2. **Backfill `tags`/`difficulty` opportunistically**, not as a big-bang project — e.g. as part of
   the model-answer-coverage work (already the top content priority per
   [Roadmap.md](./Roadmap.md)), tag each question as it's touched.
3. **Introduce flashcards as a wholly new domain** (`data/flashcards/`), following the existing
   `types.ts` + `index.ts` + per-topic-or-section split pattern. No migration needed — this is new
   content, not a move of existing content.
4. **Only if/when articles/glossary/scholars are actually planned as features**: set up
   `content/` + MDX tooling (`@next/mdx`) as an isolated addition — it doesn't touch `data/` at
   all, so this can happen independently of anything else in this document, whenever those
   specific features are greenlit.
5. **Never migrate `data/topics`, `data/questions`, `data/quizzes`, `data/references`,
   `data/model-answers` to MDX or a CMS** under this design — per §2/§3, these stay TypeScript
   long-term because their structure benefits from it, not because migration hasn't gotten to
   them yet.

No step in this plan requires a "cutover" — everything is additive, and steps 1–3 can happen in
any order, independently, whenever there's capacity, without a dedicated "migration project."

---

## 6. Content vs. learner-progress: a deliberate separation

A key design decision for this document: **content schemas (above) never include learner state**
(progress, bookmarks, spaced-repetition scheduling, quiz history). That data lives entirely in the
Phase 3.4/3.6 personalization data model (localStorage now, account-backed later), referencing
content purely by stable `id`/`slug`. This means:

- Content can be re-authored, re-tagged, or restructured without touching a single student's
  saved progress (progress records reference `topicSlug`/`questionId`/`flashcardId` as opaque
  strings).
- The personalization data model (Phase 3.4/3.6) doesn't need to know *anything* about how
  content is stored (TypeScript array vs. MDX vs. future CMS) — it only ever needs a stable ID to
  key against. This is exactly why Phase 3.4 (student features) can be built now, on the current
  content system, with zero risk of needing rework if content architecture changes later.

---

## 7. Concrete triggers to revisit this decision

Don't migrate proactively. Revisit Option A vs. D vs. C when **any** of these becomes true:

- A single `data/` domain file exceeds ~2,000 lines even after splitting by the finest sensible
  natural boundary (currently: by year for questions, by section-group for topics).
- A non-technical contributor (a teacher, a second content author without git/TypeScript
  familiarity) needs to author content directly, without a developer in the loop.
- Content volume crosses roughly 2,000–3,000 total items across all types, where `npm run build`
  time or IDE responsiveness measurably degrades.
- A genuinely prose-heavy content type (articles, glossary, scholar bios) is actually greenlit as
  a feature — at that point, adopt MDX for *that type only*, per Option D, without touching
  anything else.

## 8. Implementation roadmap (if triggered)

| Step | Scope | Est. effort | Depends on |
|---|---|---|---|
| Add optional `ContentMeta` fields to existing types | `data/topics/types.ts`, `data/questions/types.ts`, `data/quizzes.ts`, `data/references.ts`, `data/model-answers.ts` | Small | Nothing — safe to do anytime |
| Flashcards as a new domain | New `data/flashcards/` (types + index + content), `app/flashcards/**` routes, one data-integrity test | Medium | Nothing — safe to do anytime, but should follow Phase 3.4 so it can plug into progress-tracking from day one |
| MDX tooling setup | `@next/mdx` config, `content/` directory, one new route family per type | Medium | An actual greenlit article/glossary/scholar-bio feature — don't build ahead of a real requirement |
| CMS evaluation | N/A — explicitly not recommended without a product decision to open authoring | — | A confirmed need for non-technical, multi-author content editing |

---

## Summary for decision-makers

- **No migration needed right now.** The current TypeScript-array system, already well-organized
  per [Decision-Log.md](./Decision-Log.md), has headroom for several times today's content
  volume.
- **The one gap worth closing soon, cheaply**: add optional `tags`/`difficulty` fields to existing
  types — this is a small, safe, additive change that unblocks Phase 3.3's search filters and
  Phase 3.6's personalization/recommendation features, without waiting for any larger migration.
- **Flashcards are new content, not a migration** — build them as a new TypeScript-structured
  domain whenever Phase 3.4/3.5 calls for them.
- **MDX is the right future home for articles/glossary/scholar-bios specifically**, but only once
  those are actual planned features, not speculatively.
- **A CMS is not recommended** under current authoring needs — it solves a problem (non-technical
  multi-author editing) this project doesn't have yet, at a real ongoing cost.
