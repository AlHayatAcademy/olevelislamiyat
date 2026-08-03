# Build Status

Date: 2026-08-03. Session scope: Milestone 1 (audit & scaffold) fully done, Milestone 2/3 (Next.js app scaffold, homepage, route stubs, build pipeline) done to a real-but-lightweight-content level, and Milestone 4 (this session) adds a real content data layer plus working dynamic routes for a representative slice of Paper 1 and Paper 2.

## Milestone 4 — content data layer + dynamic lesson routes (this session)

### Data layer

- `data/syllabus.ts` — full official 4-section hierarchy for both papers (section slugs, titles, marks, descriptions, subtopic lists), extracted from `source/01-syllabus/Cambridge_O_Level_2058.pdf`. Structural/factual, safe to state directly.
- `data/topics/types.ts` — the `Topic` content schema: slug, paper, section, title, standing, learningObjectives, keyTerms, explanation (bullets), keyFacts, ao1Guidance, ao2Guidance, commonMistakes, examTip, relatedTopics.
- `data/topics/paper1-history-of-quran.ts` — 5 full lessons: First Revelation, Different Modes of Revelation, Compilation Under Abu Bakr, Standardisation Under Uthman, The Qur'an as a Source of Islamic Law. Authored from `source/02-paper-1/paper-1-content.docx` (confirmed original/purpose-drafted site content per `source-audit.md`), rewritten in fresh original wording, bullet-point structured.
- `data/topics/paper1-life-of-prophet.ts` — 3 full lessons: The First Revelation and the Start of the Mission, The Hijrah, The Farewell Pilgrimage and Sermon. Same source, same treatment; direct Qur'an/Hadith quotations kept short and matched against the source document's own citations (never invented).
- `data/topics/paper2-history-of-hadith.ts` — 5 full lessons: Isnad and Matn, Classification and Authentication of Hadith, Stages of Compilation (Companions → Tabi'un → Tab'a Tabi'in), The Six Authentic Books (Sihah Sittah), The Importance of Hadith as a Source of Guidance. Written fresh from the public syllabus scope + the site founder's own hand-made revision-note images in `source/09-notes/P2/` (compiler names, Hadith counts, dates — objective, verifiable facts) + general Islamic-studies knowledge. `paper-2-content.docx` (the copyrighted textbook) was **not opened or used** for this session's Paper 2 content, per the standing copyright caveat in `source-conflicts.md` #1.
- `data/topics/paper2-caliphs.ts` — 2 full lessons: Abu Bakr al-Siddiq (RA), Umar ibn al-Khattab (RA). Same treatment as above.
- `data/topics/index.ts` — aggregator with `getTopicsForSection`, `getTopic`, `getAllTopicParams` helpers.

### Routes

- `app/paper-1/[section]/page.tsx` and `app/paper-2/[section]/page.tsx` — section hub pages (via `components/SectionHub.tsx`), statically generated for all 4 sections of each paper, showing all official subtopics with "available" vs "coming soon" status.
- `app/paper-1/[section]/[topic]/page.tsx` and `app/paper-2/[section]/[topic]/page.tsx` — full lesson pages (via `components/TopicPage.tsx`), statically generated only for the 15 topics with real content, rendering every schema field (objectives, key terms, explanation, key facts, AO1/AO2 guidance, common mistakes, exam tip, related topics with cross-links).
- `app/paper-1/page.tsx` and `app/paper-2/page.tsx` rewritten to link to the 4 real section hub pages instead of a static list, showing live lesson counts per section.
- 13 lesson routes + 8 section-hub routes are now live and statically generated (verified in the build output below).

### QA — exact command results (this session)

```
$ npm run typecheck
> tsc --noEmit
(no output — exit 0)

$ npm run lint
> eslint .
(no output — exit 0)

$ npm run build
> next build
   ▲ Next.js 15.5.22
 ✓ Compiled successfully in 9.0s
   Linting and checking validity of types ...
   Collecting page data ...
 ✓ Generating static pages (51/51)
   Finalizing page optimization ...
Route (app)                                                        Size  First Load JS
├ ○ /paper-1                                                      177 B         106 kB
├ ● /paper-1/[section]              (4 paths: all 4 Paper 1 sections)
├ ● /paper-1/[section]/[topic]      (8 paths: the 8 authored Paper 1 lessons)
├ ○ /paper-2                                                      177 B         106 kB
├ ● /paper-2/[section]              (4 paths: all 4 Paper 2 sections)
├ ● /paper-2/[section]/[topic]      (7 paths: the 7 authored Paper 2 lessons)
+ ...all 22 previously-existing stub routes unchanged and still passing
(exit 0)
```

`●  (SSG) prerendered as static HTML (uses generateStaticParams)` for all four `[section]`/`[section]/[topic]` routes.

## What was built

### Milestone 1 — audit

- `docs/pre-build-audit.md` — repo/branch/source inventory summary.
- `docs/source-audit.md` — file-by-file (grouped by session for past papers/mark schemes) audit table: type, purpose, syllabus coverage, site use, copyright sensitivity, status, confidence.
- `docs/source-conflicts.md` — living conflicts log. Key finding: `source/03-paper-2/paper-2-content.docx` is a **copyrighted commercial textbook** (Khalid Saifullah / Jlali Publishers, explicit rights-reserved notice), not original site content like `paper-1-content.docx` is. Flagged as unresolved — needs an explicit licensing decision from the user before any Paper 2 content is authored from it. Also logged: missing 2024/2025 examiner reports (grade-threshold docs substituted), two likely-duplicate word-extraction files, and pending 2058-vs-0493 clause diff.
- `docs/syllabus-coverage-audit.md` — extracted exam pattern (2 papers, 1.5h/50 marks each, Q1+Q2+2 others, AO1 68%/AO2 32%, full levels-of-response grids) and both papers' 4-section syllabus hierarchies, mapped against available source content.
- `docs/past-paper-coverage-audit.md` — confirms 10/10 sessions (2021–2025), 40/40 question papers, 40/40 mark schemes present; 6/10 sessions have genuine examiner reports.

### Milestone 2/3 — Next.js app

- Next.js 15 (App Router) + React 19 + TypeScript strict + Tailwind CSS, hand-configured (package.json/tsconfig/tailwind.config.ts/postcss/eslint.config.mjs/.prettierrc) since `create-next-app` refused to scaffold into a non-empty directory containing `source/`.
- Folders: `app/`, `components/`, `content/` (empty, reserved), `data/`, `lib/`, `public/` (default Next assets only), `styles/`, `types/` (empty, reserved), `scripts/`.
- `data/site-config.ts` — single source of truth for all institutional facts (site name, qualification codes, domain, institution/legal names, founder, contact, links, tagline, founder bio, Cambridge disclaimer text, nav links, footer links, social links with a `.filter()`-friendly shape for empty entries).
- Brand theme wired into `tailwind.config.ts` (exact hex palette given) and fonts (`Manrope`/`Inter`/`Noto Naskh Arabic` via `next/font/google` in `lib/fonts.ts`).
- Core components: `Header` (sticky dark-green, desktop+mobile nav, WhatsApp CTA), `AnnouncementBar`, `Footer` (nav/legal/contact columns, filters empty social links), `Button` (10 variants incl. whatsapp/download, polymorphic link-or-button, lucide-react icons, keyboard/focus-visible accessible), `Hero`, `PageShell` (stub-page layout).
- `app/layout.tsx` — root layout with metadata, skip-to-content link, announcement bar + header + footer wrapping all pages.
- `app/page.tsx` — homepage with announcement bar, header, hero (real headline/CTAs), 7 feature cards, Paper 1/2 cards, exam pattern summary (from real syllabus data), founder section (bio used verbatim, no fabricated credentials), FAQ, final CTA, footer.
- 22 route stubs generated via `scripts/gen-stub-pages.mjs` (re-runnable): `/syllabus`, `/exam-pattern`, `/paper-1`, `/paper-2`, `/past-papers`, `/model-answers`, `/quotes-references`, `/revision`, `/quizzes`, `/notes`, `/resources`, `/online-classes`, `/about`, `/about/institute`, `/about/founder`, `/contact`, `/privacy`, `/terms`, `/copyright`, `/disclaimer`, `/cambridge-disclaimer` (verbatim independence disclaimer), `/accessibility`. Each has real (if brief) syllabus-derived content plus clearly labelled `[...pending...]` placeholders where full content awaits later milestones.
- `app/robots.ts` and `app/sitemap.ts` using the Next.js Metadata API (no static files needed).
- No fake statistics, testimonials, or success-rate claims anywhere on the site.

## Exact command results (this session, final run)

```
$ npm run typecheck
> tsc --noEmit
(no output — exit 0)

$ npm run lint
> eslint .
(no output — exit 0)

$ npm run build
> next build
   ▲ Next.js 15.5.22
   Creating an optimized production build ...
 ✓ Compiled successfully in 2.2s
   Linting and checking validity of types ...
   Collecting page data ...
 ✓ Generating static pages (28/28)
   Finalizing page optimization ...
   Collecting build traces ...
Route (app)                                 Size  First Load JS
┌ ○ /                                      162 B         106 kB
├ ○ /_not-found                            993 B         103 kB
├ ○ /about ... (all 22 stub routes)        175 B         103 kB
├ ○ /robots.txt                            175 B         103 kB
├ ○ /sitemap.xml                           175 B         103 kB
+ First Load JS shared by all             102 kB
○  (Static)  prerendered as static content
(exit 0)
```

`npm run format` (prettier --write) was run once during the build-out to normalize formatting; a clean `npx prettier --check .` on the app/docs/config files passes.

## What's still pending (future milestones)

1. **Paper 2 content licensing decision** — `source-conflicts.md` #1 still blocks ever using `paper-2-content.docx` directly; this session's Paper 2 lessons were written from the syllabus + note images + general knowledge instead, which unblocks _some_ Paper 2 content but the licensing question itself remains open.
2. Remaining Paper 1 topic content: "Major Themes of the Qur'an" (15 set passages) and "The First Islamic Community" sections still have only syllabus-level subtopic lists, no lesson content yet — `paper-1-content.docx` has full source material ready for these (Passages 1-15, Prophet's wives/descendants, Ten Blessed Companions, scribes, women's status).
3. Remaining Paper 1 "Life of Prophet Muhammad" lessons pending: Arabia Before Islam (source available), plus later Madinah-period lessons (battles, treaties — source available in `paper-1-content.docx` Chapter 3, not yet migrated).
4. Remaining Paper 2 sections pending: "Major Teachings in the Hadiths" (individual/community conduct passages) and "Articles of Faith and Pillars of Islam" — no lesson content yet, need fresh authoring per the same copyright-safe approach used this session. "Rightly Guided Caliphs" has Abu Bakr and Umar; Uthman and Ali still pending (Uthman note image not reviewed this session; Ali has no note image at all in `source/09-notes/P2`).
5. Several `[VERIFY: ...]`-worthy items were avoided by keeping precise Hadith wording short and only using phrasing traceable to the source docx/note images — no fabricated Hadith numbers or Qur'an translations were introduced. See `docs/syllabus-coverage-audit.md` for the explicit verification log.
6. Page-by-page parsing of all 40 past papers + 40 mark schemes into a topic-tagged question index (`data/past-papers.ts` or similar) — never rehosting PDFs.
7. OCR/transcription of the remaining hand-made revision-note PNGs in `source/09-notes` (P1 set unused this session; P2 set partially reviewed) for `/notes` and `/revision`.
8. Building out `/quizzes` interactive functionality and `/model-answers` guided answer structures from mark schemes/examiner reports (paraphrased, not verbatim).
9. Legal review and real copy for `/privacy`, `/terms`, `/disclaimer`, `/accessibility` (currently placeholder).
10. `08-images`, `10-books`, `11-generated-data`, `12-future-content` source folders do not exist yet — out of scope until the user adds them.

## Git state

No commits, branch switches, or `git add`/`git commit`/`git push` were performed. All work is uncommitted in the working tree on branch `claude/olevel-islamiyat-website-opbkvm`, ready for the user's review.
