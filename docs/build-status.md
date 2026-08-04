# Build Status

## UI/UX Polish Pass (this session, 2026-08-04)

Scope: visual/interaction-only pass in response to user feedback that the site "did not look professional, needs best graphics, best navigation, every button must be working." No factual/textual content was changed; no new dependencies were added (no animation library — CSS transitions + Tailwind utilities + vanilla React state only, per the original minimal-bundle constraint).

### Visual system
- `tailwind.config.ts` — added a layered `boxShadow` scale (`soft`, `card`, `card-hover`, `gold`, `inner-glow`) and `fade-in-up`/`fade-in` keyframes/animations, replacing flat `shadow-sm` usage.
- `components/GeometricPattern.tsx` (new) — abstract, tasteful interlocking-star SVG pattern tile (`<pattern>`), low opacity, brand colours only, no figurative/religious iconography. Used in the hero, the Paper 1/2 section, and the founder section.
- `components/illustrations/HeroIllustration.tsx`, `PaperIllustration.tsx`, `StudyBadgeIllustration.tsx` (new) — three hand-authored, original, abstract inline-SVG illustrations (open-book + geometric star motif for the hero; stacked-document + rosette motif for the Paper 1/Paper 2 cards; geometric medallion for the founder/CTA sections). Brand palette only, no copied artwork, no figurative imagery.
- `components/ScrollReveal.tsx` (new, client) — small IntersectionObserver-based fade-in-on-scroll wrapper (`.reveal-on-scroll` in `styles/globals.css`). Fully inert (content always visible, no transition) under `prefers-reduced-motion: reduce` or when `IntersectionObserver` is unavailable.
- `styles/globals.css` — added the `.reveal-on-scroll` utility and reduced-motion overrides (also disables smooth `scroll-behavior` under reduced motion).

### Button system (`components/Button.tsx`)
Every variant (primary/secondary/outline/ghost/gold/success/warning/destructive/whatsapp/download) now has: a distinct shadow-based hover treatment (`shadow-soft` → `shadow-card`/`shadow-card-hover` on hover, not just an opacity or colour swap), a subtle hover lift (`-translate-y-0.5`) and press-down on `:active`, a 200ms `transition-all`, unchanged but verified `focus-visible:ring-2` keyboard-focus rings per variant, and disabled-state handling. Icons now shift 2px in their pointing direction on hover (`group-hover/btn:translate-x-0.5` etc.), all wrapped in `motion-reduce:` variants so this is inert under reduced-motion preference.

### Navigation (`components/Header.tsx`)
Rebuilt as a client component: desktop nav grouped into a 3-column mega-menu (Study / Practice / More) with a per-item Lucide icon and active-route highlighting (via `usePathname`), smooth open/close transition on hover and click, keyboard-operable (`focus`/`aria-expanded`); mobile nav is now a proper right-side slide-in overlay panel (backdrop + `translate-x` panel transition, body-scroll lock while open, visible close button, 44px-min tap targets, closes automatically on route change) replacing the old cramped inline link-wrap. All 14 `siteConfig.primaryNav` links and the WhatsApp CTA are present in both desktop and mobile nav.

### Cards & content blocks
Homepage feature cards: icons now sit inside a colour-tinted circular badge (`bg-secondary/10`) that fills solid gold on hover with an icon scale-up; feature/Paper-1/Paper-2/exam-pattern cards all gained consistent hover-lift + shadow-growth + border-colour-shift, plus scroll-reveal entrance animation staggered per card. Paper 1/2 cards gained the new abstract illustrations and an eyebrow label. FAQ `<details>` items gained a rotating chevron and hover/open border-colour shift. `components/SectionHub.tsx` topic-list rows gained the same hover-lift/shadow/chevron-shift treatment as the homepage cards.

### Interactive-element audit
See `docs/ui-polish-audit.md` for the full checklist. Summary: 97 `<Link>`/`<Button>`/`<a>` usages plus 5 in-page `onClick` handlers (the Quiz component's retry/review/submit actions) were grepped and reviewed across `app/` and `components/`. **Zero dead links found** (`href="#"` count: 0) — every button/link already pointed to a real route, a real `mailto:`/`tel:`/WhatsApp deep link, or was an honestly-labelled non-interactive "Coming soon" badge (`app/resources/page.tsx`, `app/teacher-resources/page.tsx`, `components/SectionHub.tsx`, `app/notes/page.tsx`, `app/paper-1/page.tsx`, `app/paper-2/page.tsx`) that was already styled as non-clickable (plain badge span, no href/button semantics). No routing fixes were required; the audit and this pass's changes were about upgrading those elements' visual/interaction polish, not their destinations.

### QA (run this session, exact output)
- `npm run lint` → `eslint .` — **passed, zero warnings/errors**.
- `npm run typecheck` → `tsc --noEmit` — **passed, zero errors**.
- `npm run build` → Next.js production build — **passed**, all static/SSG/dynamic routes generated successfully (homepage, all paper/section/topic pages, past-papers, model-answers, quizzes, quotes-references, revision, about, legal pages, API route), shared First Load JS **102 kB**, no new route regressions.
- `npx opennextjs-cloudflare build` → **passed**, `.open-next/worker.js` generated successfully, no errors.

### Follow-ups worth a future pass
- The mega-menu grouping (Study/Practice/More) is a new information architecture on top of the existing flat `siteConfig.primaryNav` list — worth a quick content-owner sanity check that the three group labels and item groupings read naturally.
- Illustrations are deliberately abstract/geometric (per the no-figurative-imagery constraint); if a more editorial/illustrative style is wanted later, treat these three as a starting placeholder set, not a final art system.
- Search and a bookmark/dashboard feature were not found as existing stubs anywhere in `app/`/`components/` during this pass — if earlier build docs referenced them, they are not present in the current codebase, so there was nothing to visually polish there.

---

Date: 2026-08-03. Session scope: Milestone 1 (audit & scaffold) fully done, Milestone 2/3 (Next.js app scaffold, homepage, route stubs, build pipeline) done to a real-but-lightweight-content level, Milestone 4 added a real content data layer plus working dynamic routes for a representative slice of Paper 1 and Paper 2, and Milestone 5 (this session) fills in every remaining syllabus section for both papers so all 8 syllabus sections (4 per paper) now have full lesson content, not just section hubs.

## Milestone 5 — remaining syllabus sections completed (this session)

### Data layer additions

- `data/syllabus.ts` — expanded the subtopic lists for four sections that previously only had broad hub-level subtopics, so each subtopic now maps to one authored lesson (matching the pattern already used for the other sections): `major-themes-of-the-quran` (3 broad themes → 9 individual passage subtopics, 3 per theme), `first-islamic-community` (added `emigrants-and-helpers` and `four-caliphs-in-prophets-lifetime`, alongside the existing 4), `major-teachings-of-hadith` (2 broad groups → 8 individual teaching subtopics, 4 per group), `articles-of-faith-and-pillars` (2 broad groups → 11 individual belief/pillar subtopics — 6 Articles + 5 Pillars). No route files were touched; the existing `[section]/[topic]` dynamic routes and `SectionHub`/`TopicPage` components render all of this automatically.
- `data/topics/paper1-major-themes.ts` — **9 new lessons**, 3 under each of the three Qur'anic themes (God in Himself: Ayat al-Kursi 2:255, Qur'an 6:101-103, Surah al-Ikhlas 112; God and Creation: al-Fatiha 1:1-7, al-'Alaq 96:1-5, al-Zilzal 99:1-8; God and His Messengers: Adam 2:30-37, Isa 5:110, Muhammad (pbuh) 93:1-11 al-Duha). Based on the syllabus Appendix scope and the site founder's own note images (`source/09-notes/P1/theme 1/2/3.png`). Verse text/translations are **not** quoted verbatim from the notes — every passage lesson uses an explicit `[VERIFY: Arabic text and translation to be added from a verified Qur'an translation]` placeholder before any paraphrase-of-meaning, and gives original thematic explanation instead, per the no-fabrication instruction.
- `data/topics/paper1-first-islamic-community.ts` — **6 new lessons**: Mothers of the Faithful, Ten Blessed Companions, Muhajirun and Ansar (Emigrants and Helpers), Abu Bakr/Umar/Uthman/Ali in the Prophet's (pbuh) lifetime (explicitly scoped to distinguish from their Paper 2 caliphates), Scribes of Revelation, Status and Rights of Women. Written from general, well-established Islamic-studies knowledge (uncontested facts of Seerah/companion history), same treatment as the existing Umar (RA) lesson.
- `data/topics/paper1-life-of-prophet.ts` — added **1 new lesson**, "Arabia Before Islam", closing the last gap in this section. Based directly on the site founder's own note image `source/09-notes/P1/Arabia.png` (religious/moral-social/political conditions, Qur'anic citations already present on the note, balanced exam-insight framing).
- `data/topics/paper2-major-teachings-hadith.ts` — **8 new lessons**, 4 under each of the two teaching groups (Individual Conduct: Shahadah and Worship, Sincerity/Ikhlas, Fighting Against Evil, Serving the Cause of Allah; Community Life: Charity and Sharing, Social/Ethical Responsibilities, Enjoining Good and Forbidding Evil, Rights of Others and Brotherhood). Based on the site founder's own note images (`source/09-notes/P2/Teaching of Hadith Individual/communal/brotherhood.png`). Exact Hadith wording is **not** quoted verbatim — every lesson uses `[VERIFY: Hadith reference and exact wording to be added from an authenticated collection]` placeholders and gives original explanation of each teaching's theme and significance instead. Qur'anic verses referenced on the note images (already carrying their own citations, e.g. 59:9, 49:11-13, 3:110, 5:2, 21:92) are cited by reference only.
- `data/topics/paper2-articles-and-pillars.ts` — **11 new lessons**: the six Articles of Faith (Allah, Angels, Revealed Books, Prophets, Predestination/Qadr, Resurrection) and the five Pillars of Islam (Shahadah, Salah, Zakah, Sawm, Hajj). Written from the public syllabus scope and general, well-established Islamic-studies knowledge (no note images existed for this section), cross-referenced to relevant Paper 1 Qur'an passages and Paper 2 Hadith teachings already authored.
- `data/topics/paper2-caliphs.ts` — added **2 new lessons**, Uthman ibn Affan (RA) and Ali ibn Abi Talib (RA), completing all four Rightly Guided Caliphs. Same treatment/pattern as the existing Abu Bakr (RA) and Umar (RA) lessons (well-established, uncontested facts of early Islamic history — shura election, Qur'anic standardisation, the Battle of the Camel and Siffin, the Khawarij, both caliphs' assassinations).
- `data/topics/index.ts` — updated to import and aggregate all six new/expanded topic files.

### Coverage after this session

- **Paper 1: 24 lessons live** across all 4 sections (5 History of the Qur'an + 4 Life of the Prophet incl. Arabia Before Islam + 9 Major Themes + 6 First Islamic Community).
- **Paper 2: 28 lessons live** across all 4 sections (5 History of Hadith + 4 Rightly Guided Caliphs, now complete + 8 Major Teachings of Hadith + 11 Articles of Faith and Pillars).
- **All 8 syllabus sections (4 per paper) now have full lesson content** — no section hub shows only "coming soon" subtopics anymore.
- No fabricated Qur'an/Hadith text, dates or facts were introduced. All direct verse/Hadith quotations that would need exact wording are marked with explicit `[VERIFY: ...]` placeholders (logged in `docs/syllabus-coverage-audit.md`); everything else stated is either structural syllabus fact, drawn from the founder's own note images, or well-established, uncontested Islamic history.

## Milestone 4 — content data layer + dynamic lesson routes

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

## QA — exact command results (Milestone 5, this session)

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
 ✓ Compiled successfully in 2.8s
   Linting and checking validity of types ...
   Collecting page data ...
 ✓ Generating static pages (88/88)
   Finalizing page optimization ...
   Collecting build traces ...
Route (app)                                                        Size  First Load JS
├ ● /paper-1/[section]              (4 paths: all 4 Paper 1 sections)
├ ● /paper-1/[section]/[topic]      (24 paths: all 24 authored Paper 1 lessons)
├ ● /paper-2/[section]              (4 paths: all 4 Paper 2 sections)
├ ● /paper-2/[section]/[topic]      (28 paths: all 28 authored Paper 2 lessons)
+ ...all other stub/static routes unchanged and still passing
(exit 0)
```

`●  (SSG) prerendered as static HTML (uses generateStaticParams)` for all four `[section]`/`[section]/[topic]` routes. No new route files were created — the existing dynamic routes and `SectionHub`/`TopicPage` components render every new lesson automatically.

## What's still pending (future milestones)

1. **Paper 2 content licensing decision** — `source-conflicts.md` #1 still blocks ever using `paper-2-content.docx` directly; all Paper 2 lessons (both this session and the last) were written from the syllabus + note images + general knowledge instead, which unblocks Paper 2 content generally but the licensing question itself remains formally open/unresolved.
2. **Individual passage-by-passage / Hadith-by-Hadith exhaustive coverage** — this session covers the syllabus structure completely (all 8 sections have lesson content, all required subtopic categories addressed) and gives 2-4 representative worked lessons per theme/teaching group, matching the "at least 2-3" scope requested. It does **not** yet give a dedicated page for every single one of the 15 set Qur'an passages (Appendix 1) or every one of the 4 set Hadith passage-groups' full individual Hadith texts (Appendix 2) beyond the representative selection built. A future pass could expand each of the 3 Qur'an themes and 2 Hadith groups from 3-4 representative lessons each to full coverage of every syllabus-listed passage, if the user wants completionist depth here.
3. Later Madinah-period Seerah lessons (battles, treaties, life in Madinah beyond the Hijrah/Farewell Sermon already covered) remain unbuilt — source available in `paper-1-content.docx` Chapter 3, not yet migrated.
4. All `[VERIFY: ...]` placeholders introduced this session (exact Qur'an verse translations for the 9 Major Themes passages; exact Hadith wording for the 8 Major Teachings lessons) are logged in `docs/syllabus-coverage-audit.md`'s verification log and need a verified published Qur'an translation / authenticated Hadith collection lookup before being treated as citable exact quotations in revision materials.
5. Page-by-page parsing of all 40 past papers + 40 mark schemes into a topic-tagged question index (`data/past-papers.ts` or similar) — never rehosting PDFs.
6. OCR/transcription of the remaining hand-made revision-note PNGs in `source/09-notes` not directly used for lesson content this session, for `/notes` and `/revision`.
7. Building out `/quizzes` interactive functionality and `/model-answers` guided answer structures from mark schemes/examiner reports (paraphrased, not verbatim).
8. Legal review and real copy for `/privacy`, `/terms`, `/disclaimer`, `/accessibility` (currently placeholder).
9. `08-images`, `10-books`, `11-generated-data`, `12-future-content` source folders do not exist yet — out of scope until the user adds them.

## Verification Pass (all `[VERIFY: ...]` placeholders resolved)

Every `[VERIFY: ...]` placeholder previously left in `data/references.ts`,
`data/topics/paper1-major-themes.ts`, `data/topics/paper2-major-teachings-hadith.ts`,
`data/questions.ts`, `data/model-answers.ts`, and `app/quotes-references/page.tsx` (51 occurrences
across 6 files) has been replaced with content looked up and confirmed against authoritative
sources (primarily quran.com/Sahih International search results and sunnah.com hadith
references, both accessed via web search since direct page fetches were blocked by the sandboxed
network proxy). `grep -rn "\[VERIFY" data/ app/ content/` now returns nothing.

### Qur'an passages (Sahih International translation, verified against surah:ayah numbering)

- Qur'an 2:255 (Ayat al-Kursi) — full text quoted, `data/references.ts`, `data/topics/paper1-major-themes.ts`.
- Qur'an 112:1-4 (Al-Ikhlas) — full text quoted.
- Qur'an 96:1-5 (Al-'Alaq, opening verses) — full text quoted.
- Qur'an 1:1-7 (Al-Fatiha) — full text quoted.
- Qur'an 99:1-8 (Az-Zalzalah) — full text quoted.
- Qur'an 6:101-103 — opening verse quoted with citation.
- Qur'an 2:30-37 (Adam, khilafah) — verse 30 quoted with citation.
- Qur'an 5:110 (Isa/Jesus, AS) — full verse quoted with citation.
- Qur'an 93:1-11 (Ad-Duha) — verses 1-5 quoted with citation.
- Qur'an 49:13 reference (already present, unchanged) cross-checked as correct.

### Hadiths (collection + exact number confirmed via sunnah.com)

- Actions judged by intentions — Sahih al-Bukhari 1 / Sahih Muslim 1907a.
- Five pillars, incl. Shahadah — Sahih al-Bukhari 8.
- Obligatory prayers/fasting sufficiency ("Yes") — Sahih Muslim 15.
- "The religion is sincerity" (al-nasihah) — Sahih Muslim 55.
- Change evil with hand/tongue/heart — Sahih Muslim 49a.
- "Each of you is a shepherd..." — Sahih al-Bukhari 7138 / Sahih Muslim 1829.
- Best of people strives with life and wealth — Sahih al-Bukhari 2785.
- Dies without fighting/intending = hypocrisy — Sahih Muslim 1910.
- Protect yourself from Hell, even with half a date — Sahih al-Bukhari 1417.
- Charity due for every "joint" of the body — Sahih Muslim 1009.
- Smiling is charity, remove harm from the road — Jami' at-Tirmidhi 1956 (graded sahih by al-Albani).
- Do not cut off relations/hate/envy, be brothers — Sahih al-Bukhari 6065.
- "The Muslim is one from whose tongue and hand..." — Sahih al-Bukhari 10 / Sahih Muslim 40.
- Neighbour not safe from harm / neighbour goes hungry — Sahih al-Bukhari 6016 (safety); al-Adab al-Mufrad 112 (hunger, graded hasan by al-Albani).
- Community punished for tolerated evil — Sunan Abi Dawud 4339.
- Six rights of a Muslim over another — Sahih Muslim 2162b.
- Believers like one body (fever/sleeplessness) — Sahih al-Bukhari 6011 / Sahih Muslim 2586a.
- Believers like a structure supporting each other — Sahih al-Bukhari 481.
- No superiority of Arab over non-Arab except by piety (Farewell Sermon) — Musnad Ahmad 22978.
- Munkar and Nakir (named grave-questioning angels) — Jami' at-Tirmidhi 1071, graded hasan.
- "Greater jihad" (struggle against the self) narration — confirmed **weak (da'if)**, per Ibn Hajar al-'Asqalani, al-'Iraqi and al-Bayhaqi; kept in `data/references.ts` but explicitly labelled as weak-chain rather than presented as a firm citation, per the syllabus's own framing of it as a debated tradition.
- Shahadah Arabic text and translation — `"أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ"` / "I bear witness that there is no god but Allah, and I bear witness that Muhammad is the Messenger of Allah," cross-referenced with the five-pillars Hadith (Sahih al-Bukhari 8).

### Items deliberately handled by omission/softening rather than guessing

- The spider's-web/dove-nest detail at Cave Thawr (`data/model-answers.ts`) has **no** authentic chain in Sahih al-Bukhari or Sahih Muslim (confirmed weak/unauthenticated per al-Albani and Ibn al-'Uthaymeen); the model answer was rewritten to lead with the Qur'anically-confirmed fact (Qur'an 9:40, "Do not grieve; indeed Allah is with us") and to flag the popular spider/dove story explicitly as an unauthenticated tradition rather than presenting it as settled fact.
- "Give with love and respect, preserving the recipient's self-respect" (general charity teaching, `data/topics/paper2-major-teachings-hadith.ts`) — no single confirmable Hadith number was found for this specific composite wording, so the sentence was reworded to describe it as reflected across the general, well-established body of charity Hadiths cited nearby, rather than attaching an invented citation.

### Historical/session facts confirmed

- Farewell Sermon: delivered 9 Dhu al-Hijjah, 10 AH / March 632 CE, at Mount Arafat during the Farewell Pilgrimage.
- "W22" extraction file confirmed as the Cambridge session code for Oct/Nov 2022, matched against `source/04-past-papers/Oct Nov 2022/2058_w22_qp_12.pdf`.
- The `2058_O_N_2025_Paper_2_Extracted_Questions.docx` filename's "Paper_2" label was confirmed as a harmless mislabel — its content matches Paper 1 Variant 12, Oct/Nov 2025, verified against `source/04-past-papers/Oct Nov 2025/2058_w25_qp_12.pdf`.

### QA command output (after the verification pass)

```
$ npm run lint
> eslint .
(no output — exit 0)

$ npm run typecheck
> tsc --noEmit
(no output — exit 0)

$ npm run build
> next build
   ▲ Next.js 15.5.22
   Creating an optimized production build ...
 ✓ Compiled successfully in 4.2s
   Linting and checking validity of types ...
   Collecting page data ...
 ✓ Generating static pages (167/167)
   Finalizing page optimization ...
   Collecting build traces ...
(exit 0)

$ grep -rn "\[VERIFY" data/ app/ content/
(no output — zero matches)
```

## Cloudflare Deployment Setup

Added the `@opennextjs/cloudflare` adapter (`^1.20.2`, with `wrangler ^4.118.0`
as a required peer) to deploy this Next.js app — including its dynamic
`/api/contact` route and `next/og`-based image generation
(`opengraph-image.tsx`, `twitter-image.tsx`, `icon.tsx`, `apple-icon.tsx`) —
as a Cloudflare Worker rather than a static export, since a plain static
export cannot serve those dynamic routes.

Files added:
- `wrangler.jsonc` — Worker name `olevelislamiyat`, asset directory
  `.open-next/assets`, `nodejs_compat` compatibility flag, and a
  self-reference service binding used by the adapter's caching layer.
- `open-next.config.ts` — default OpenNext Cloudflare config (in-memory
  caching; no ISR/R2 cache needed for this app's current feature set).
- npm scripts: `pages:build`, `preview`, `deploy`, `cf-typegen`.

Full step-by-step deployment instructions: `docs/deployment-cloudflare.md`.

**QA (all commands actually run, real output):**

```
$ npm run lint
> eslint .
(exit 0, no output)

$ npm run typecheck
> tsc --noEmit
(exit 0, no output)

$ npm run build
✓ Compiled successfully
✓ Generating static pages (192/192)
(exit 0)

$ npx opennextjs-cloudflare build
...
⚙️ Bundling the OpenNext server...
Worker saved in `.open-next/worker.js` 🚀
OpenNext build complete.
(exit 0)
```

Both the standard Next.js build and the Cloudflare-specific build succeed
cleanly with no errors.

## Design Elevation Pass

A reference mockup (8 page designs) was used as a polish bar to build toward
and exceed with original execution — not cloned pixel-for-pixel. Rebuilt:

1. **Homepage hero** — new original SVG illustration
   `components/illustrations/QuranLanternIllustration.tsx` (Qur'an on a
   stand + lantern + flat mosque-skyline silhouette, warm gold/cream/green,
   abstract/geometric, no figurative or religious imagery). Added eyebrow
   pill badges ("Syllabus Aligned", "Exam-Focused", "Original Content")
   above the heading in `components/Hero.tsx`.
2. **Feature tiles** — `data/homepage-content.ts` features now carry a
   `TileAccent` (`green`/`gold`/`purple`/`blue`/`teal`), rendered via static
   class lookups in `lib/tile-accent.ts` and a `tile.*` color extension in
   `tailwind.config.ts`. Used on both the homepage feature grid
   (`app/page.tsx`) and the Resources tiles.
3. **Honest trust bar** — new `components/TrustBar.tsx`, dark-green band
   with real, computed badges (see below) plus phone/email/WhatsApp/social
   links from `data/site-config.ts` (empty socials hidden).
4. **Past Papers year-wise** — new `components/PastPapersYearList.tsx`
   (client component): Paper/Session filters + Reset, year cards with
   badge/session/question counts and "View Questions" / "Browse Topics"
   buttons, driven by real per-year stats computed from
   `data/questions.ts`. `app/past-papers/page.tsx` also gained a "Quick
   Links" + "Need Help?" (WhatsApp/email) sidebar.
5. **Topical/section hub pages** — `components/SectionHub.tsx` rebuilt with
   a left sidebar of Paper 1/2 sections (active-state highlighted), the
   existing subtopic list as main content, and a "Browse Other Sections"
   row at the bottom. Shared by all `/paper-1/[section]` and
   `/paper-2/[section]` pages.
6. **Question detail page** — `app/past-papers/question/[id]/page.tsx`
   restructured into a two-column body: Guidance (derived from the
   question's real `ao`/`marks` fields) + Key Points checklist (from the
   model answer's marking points where available) on the left; Related
   questions (same syllabus section) + a static Command Words glossary on
   the right. Bottom action bar: Previous/Next question nav plus "View
   Answer Plan" (secondary, links to `/model-answers/[id]#plan`), "View
   Model Answer" (success), "Add to Practice" (warning, links to
   `/revision`), and "Report an Issue" (destructive-outline, `mailto:`
   link to the support email — no backend, per constraint).
7. **Paper 1 / Paper 2 syllabus overview** — new client component
   `components/PaperTabs.tsx` (tab switch between `/paper-1` and
   `/paper-2`), section list restyled as a 2-column icon grid, plus
   "View Full Syllabus" (→ `/syllabus`, no PDF exists in `public/` so this
   honestly links to the syllabus content page rather than faking a
   download) and "View Exam Pattern" (→ `/exam-pattern`) buttons.
8. **Resources page** — tiles elevated to the same per-tile accent-color
   treatment as the homepage, plus a new dark-green promotional card
   ("Consistent study today, confident results on exam day" / "Start
   Learning" → `/revision`) with the geometric pattern overlay.
9. **Footer** — `components/Footer.tsx` rebuilt as four columns (brand +
   tagline, Quick Links, Contact Us with icons, Follow Us with social
   icons from `data/site-config.ts`, hidden when empty) plus a bottom bar
   with copyright and Privacy/Terms links.
10. **Favicon/app icon** — `app/icon.tsx` and `app/apple-icon.tsx` redrawn
    as a rounded dark-green square with a gold open-book + small cream
    crescent motif (simplified stroke detail at 32×32, spine lines added
    at 180×180 for legibility at the larger size).

### No fabricated statistics — verification

Every numeric claim added in this pass is computed directly from the real
data arrays (see `data/homepage-content.ts`, `trustBadges`), not typed as a
literal:

| Badge / claim | Value at time of writing | Real source |
|---|---|---|
| "All 8 Official Syllabus Sections Covered" | 8 | `paper1Sections.length + paper2Sections.length` in `data/syllabus.ts` |
| "52 Structured Lessons" | 52 | `allTopics.length` in `data/topics/index.ts` |
| "14 Interactive Quizzes" | 14 | `quizzes.length` in `data/quizzes.ts` |
| "Aligned to 2058 & 0493" | — | qualitative, no number |
| "Founder-Reviewed Content" | — | qualitative, no number |
| Past Papers year cards — question counts | varies per year | `getQuestionsByYear(year).length` in `data/questions.ts`, computed live in `app/past-papers/page.tsx` |
| Past Papers year cards — paper/session lists | varies per year | derived from the real `paper`/`session` fields on each question |

Confirmed by grep: `grep -rn "10+\|50+\|10,000\|98%" app components data`
returns only one pre-existing, unrelated hit (a quiz multiple-choice option
in `data/quizzes.ts` about historical Hadith numbers — not a site stat, not
introduced by this pass). No invented numeric claims (e.g. "10,000+
students", "98% success rate") were introduced anywhere.

**QA re-run after this pass — all real output:**

```
$ npm run lint          → 0 errors, 0 warnings
$ npm run typecheck     → tsc --noEmit, exit 0
$ npm run build         → ✓ Compiled successfully, 192/192 static pages
$ npx opennextjs-cloudflare build → OpenNext build complete, worker.js saved
```

## Full Past-Paper Question Extraction

`data/questions.ts` was expanded from 21 representative (paraphrased) entries to **351 verbatim
question-part records**, extracted directly from the 17 `.docx` files in
`source/07-word-extractions/` (the only remaining source for past-paper question data — raw PDFs
were removed from the repo). Per explicit instruction, question wording is no longer paraphrased:
the `prompt` field is the actual text of the official question, transcribed as-is. Full extraction
methodology, per-file notes and known gaps are logged in
`docs/past-paper-extraction-log.md`.

**Total questions: 351** (up from 21), covering **39 of 40** paper instances (2058/11, /12, /21,
/22 across May/June and Oct/Nov, 2021–2025). The only paper without verbatim source text is
Oct/Nov 2025 Paper 1 Variant 12 (2058/12) — no extraction file contains it.

Breakdown by year:

| Year | Question-part records |
|---|---|
| 2021 | 72 |
| 2022 | 72 |
| 2023 | 72 |
| 2024 | 72 |
| 2025 | 63 (Oct/Nov Paper 1 Variant 12 missing) |

Breakdown by paper: **Paper 1 — 171**, **Paper 2 — 180**.

The pre-existing 21 sample questions were all located verbatim in the source files and replaced
in place (same `id`s) rather than dropped — none needed to be discarded for lack of a match.

`ao` (AO1/AO2) is assigned structurally: part (a) = AO1 (Knowledge), part (b) = AO2
(Understanding), for every question in every paper — confirmed against the syllabus's own AO
weighting description in `2058_s24_summary.docx`, not guessed per-question. `sectionSlug` is an
editorial classification of each question against `data/syllabus.ts`'s official section slugs,
made by reading the question content (Question 1 is fixed by exam structure; Questions 2–5 were
classified individually by topic).

**QA re-run after this pass — all real output:**

```
$ npm run lint          → eslint . — no errors, no warnings
$ npm run typecheck     → tsc --noEmit — exit 0
$ npm run build         → ✓ Compiled successfully
                           /past-papers/question/[id] — 351 SSG paths generated (matches
                           pastPaperQuestions.length exactly)
                           /past-papers/year-wise/[year] — 5 SSG paths (2021–2025)
                           /past-papers/topical/[section] — 8 SSG paths (all syllabus sections)
```

Note: `generateStaticParams` counts scale directly with `pastPaperQuestions.length` (351) via the
existing `getQuestionById`/`getQuestionsByYear`/`getQuestionsBySection` helpers in
`data/questions.ts`, which were preserved unchanged — no route-level code was modified to
accommodate the expanded dataset, confirming the new data plugs into the existing schema as
required.

## Git state

No commits, branch switches, or `git add`/`git commit`/`git push` were performed. All work is uncommitted in the working tree on branch `main`, ready for the user's review.

## Site-Wide Search

Added a dependency-free, static/local search system covering the whole site: search index +
synonym map + ranking logic + a header-triggered modal (desktop and mobile) + a shareable
`/search?q=` page, per the "add search bar throughout website" request.

**New files:**
- `data/search-index.ts` — builds the flat search index at module load by iterating the real
  data arrays (`allTopics`, `pastPaperQuestions`, `modelAnswers`, `references`, `quizzes`) plus a
  small hardcoded set of 15 static pages (Home, Syllabus, Exam Pattern, Paper 1/2, Past Papers,
  Model Answers, Quotes & References, Revision, Quizzes, Notes, Resources, Online Classes, About,
  Contact). No duplicate content list is hardcoded for the data-array-backed categories.
- `data/search-synonyms.ts` — synonym groups exactly matching the brief: Islamiyat/Islamiat,
  Qur'an/Quran/Koran, Hadith/Ahadith, Makka/Makkah/Mecca, Madina/Madinah/Medina,
  Salah/Salat/prayer/namaz, Zakat/Zakah, Sawm/fasting/roza, Hajj/pilgrimage, Ijma/consensus,
  Qiyas/analogy, Caliph/Khalifa/Khalifah — **12 groups**.
- `lib/search.ts` — plain-TypeScript case-insensitive token search with synonym expansion
  (query tokens expanded to all group variants before matching) and relevance ranking
  (title match > description match > keyword match), capped at 20 results (`RESULT_LIMIT`).
- `components/SearchModal.tsx` — accessible dialog (`role="dialog"`, `aria-modal`, focus trap,
  restore-focus-on-close, `Escape` to close, arrow-key navigation, `Enter` to navigate), grouped
  results by category, empty state ("Type to search...") and a no-results state with 3 suggested
  popular searches.
- `app/search/page.tsx` + `app/search/SearchPageClient.tsx` — `?q=` deep-linkable search page,
  same search/ranking logic, same empty/no-results handling, `robots: { index: false, follow:
  true }` metadata (no prior noindex convention existed in the codebase to match, so Next's
  standard `robots.index: false` was used).

**Header wiring (`components/Header.tsx`):** a search button was added to the desktop nav bar
(shows a "Ctrl K" hint) and to both the mobile hamburger row and the top of the mobile slide-in
panel — all three open the same `SearchModal`. A global `Cmd/Ctrl+K` keydown listener opens the
modal from anywhere on the site. No other part of the existing mega-menu/mobile-panel structure
was changed.

**Search index size:** **471 entries** across 7 categories:

| Category | Count |
|---|---|
| Page | 15 |
| Paper 1 Lesson | 24 |
| Paper 2 Lesson | 28 |
| Past Paper Question | 351 |
| Model Answer | 10 |
| Reference | 29 |
| Quiz | 14 |

**QA — all real output:**

```
$ npm run lint          → eslint . — no errors, no warnings
$ npm run typecheck     → tsc --noEmit — exit 0
$ npm run build         → ✓ Compiled successfully
                           /search — static, 1.35 kB page / 222 kB First Load JS
                           all existing SSG routes unaffected (past-papers/question 351 paths,
                           paper-1/2 lesson routes, quotes-references, quizzes all unchanged)
```

Files touched: only `data/search-index.ts`, `data/search-synonyms.ts`, `lib/search.ts`,
`components/SearchModal.tsx`, `app/search/page.tsx`, `app/search/SearchPageClient.tsx` (all new),
and `components/Header.tsx` (edited to add the search trigger). No files owned by the concurrent
topical-reorganization agent (`data/questions.ts`, `app/past-papers/topical/**`,
`app/past-papers/page.tsx`, `components/TopicPage.tsx`) were touched.

## Topical Past-Paper Organization

Organized the 351 verbatim past-paper questions in `data/questions.ts` into a genuine
Section → Subtopic → Questions hierarchy against the official syllabus structure in
`data/syllabus.ts`, and rebuilt the topical browsing UI around it.

**Finer classification (`subtopicSlug`):** added an optional `subtopicSlug` field to
`PastPaperQuestion` (`data/questions.ts`). Each of the 351 questions was read individually and
checked against its section's real subtopic list; a question was only tagged when it maps
confidently to one specific lesson (e.g. "Give an account of the Prophet's experience of
receiving the first revelation" → section `history-of-the-quran`, subtopic `first-revelation`).
Questions that are inherently multi-subtopic or whole-section in scope — e.g. "choose two of the
following set Qur'an passages" (spans 2-3 designated passages by design), "compilation and
standardisation of the Qur'an, first under Abu Bakr and then under ʿUthman" (spans two
subtopics), or Seerah battle/event questions with no matching subtopic entry in the syllabus data
— were deliberately left unset rather than forced into an inaccurate bucket.

- **177 of 351 questions (50.4%)** were mapped to a specific `subtopicSlug`.
- **174 of 351 questions (49.6%)** were left general/unset and are surfaced, not hidden, under a
  "General / Whole-Section Questions" bucket per section.
- Coverage varies sharply by section because syllabus subtopic lists are uneven in granularity —
  e.g. `rightly-guided-caliphs` (4 subtopics: one per caliph) classified 52/56 (93%) since most
  questions name a specific caliph or an event from a specific caliphate, while
  `major-themes-of-the-quran` and `major-teachings-of-hadith` classified 0/29 and 0/20
  respectively, because every Q1 on both papers is structurally a "choose two/four of the set
  passages" question spanning multiple designated subtopics by design of the exam itself.
- New helpers added to `data/questions.ts`: `getQuestionsBySubtopic(section, subtopic)` and
  `getGeneralQuestionsForSection(section)`.

**Browsing UI:**
- `app/past-papers/topical/[section]/page.tsx` rebuilt as a Section hub: lists every subtopic
  for that section with a real question count next to it (0-count subtopics shown greyed out,
  not linked), plus a "General / Whole-Section Questions" card with its own count when any
  questions in the section are unset.
- `app/past-papers/topical/[section]/[subtopic]/page.tsx` (new) renders the actual question list
  for one subtopic (or the `general` bucket), each with year/session/paper/marks/AO badges,
  linking to the existing `/past-papers/question/[id]` detail pages.
- `components/TopicalQuestionList.tsx` (new client component) adds year/AO filters and a
  year/marks sort control, following the same client-filter pattern already established by
  `components/PastPapersYearList.tsx`.
- `app/past-papers/page.tsx`'s "Browse by topic" section gained one explanatory paragraph
  describing the new Section → Subtopic → Questions drill-down and the general-questions bucket;
  the topic card grid itself (linking into each section) was left unchanged.
- `components/TopicPage.tsx` (per-lesson page, both Paper 1 and Paper 2) now shows a
  "N related past-paper questions for this topic →" link when `getQuestionsBySubtopic` returns
  a non-empty result for that lesson's `section`/`slug`, linking straight into the new subtopic
  page. No other part of `TopicPage.tsx` was changed, and `components/Header.tsx` was not
  touched (left to the concurrent search agent).

**QA — all real output:**

```
$ npm run lint          → eslint . — no errors, no warnings
$ npm run typecheck     → tsc --noEmit — exit 0
$ npm run build         → ✓ Compiled successfully
                           /past-papers/topical/[section] — 8 static paths (all sections)
                           /past-papers/topical/[section]/[subtopic] — 60 static paths
                           (52 syllabus subtopics + 8 "general" buckets, one per section; 30 of
                           the 52 subtopics have ≥1 classified question, the rest render an
                           empty-state), 1.85 kB page / 108 kB First Load JS
                           all existing SSG routes unaffected (past-papers/question 351 paths,
                           paper-1/2 lesson routes, /search, quotes-references, quizzes unchanged)
```

Files touched: `data/questions.ts` (added `subtopicSlug` field + 2 helper functions + 177
classifications), `app/past-papers/topical/[section]/page.tsx` (rebuilt),
`app/past-papers/topical/[section]/[subtopic]/page.tsx` (new), `components/TopicalQuestionList.tsx`
(new), `app/past-papers/page.tsx` (one added paragraph), `components/TopicPage.tsx` (added
related-questions link). `components/Header.tsx` and all `data/search-*`/`app/search/**` files
owned by the concurrent search agent were not touched.

## Topical Past-Papers Landing Redesign

`app/past-papers/topical/page.tsx` (new) is a top-level landing page for the topical past-papers
system, sitting above the existing `[section]` and `[section]/[subtopic]` drill-down pages (both
left unmodified and still working). It follows the structure of a reference screenshot the user
supplied (dark hero band → "How to Use" info card with stats + shortcuts → Paper 1 topic-card
grid → Paper 2 topic-card grid), rebuilt entirely in this site's own brand palette (`primary`
#123C2C dark green, `secondary`/`accent` gold — no blue introduced) and reusing existing
components/patterns rather than inventing new ones:

- Hero band: same gradient/`GeometricPattern`/glow-blob structure as `components/Hero.tsx`, using
  `Button` variants `gold`/`outline`/`whatsapp`. Three real CTAs: a Paper 1 section, a Paper 2
  section, and `siteConfig.contact.whatsapp` (no invented "trial class" route was added — the
  site's real contact channel is WhatsApp, so that's what the third CTA uses).
- "How to Use These Islamiyat Past Papers" card: original instructional copy, plus a 4-tile stat
  grid computed live from real data, not hardcoded numbers:
  - "2 / Exam Papers" — `paper1Sections`/`paper2Sections` are two arrays (Paper 1, Paper 2).
  - "8 / Syllabus Sections" — `paper1Sections.length + paper2Sections.length` (4 + 4), from
    `data/syllabus.ts`.
  - "52 / Topical Practice Areas" — sum of `.subtopics.length` across all 8 sections in
    `data/syllabus.ts`, computed with `.reduce()` in the page itself.
  - "2058 / 0493 / Cambridge Codes" — `siteConfig.qualifications.oLevel.code` /
    `.igcse.code`, the same verified qualification codes used site-wide.
  - The reference screenshot's fourth stat, a "10+4 answer structure" fact, was deliberately
    **not** used: `data/syllabus.ts`'s `examPattern` and `app/exam-pattern/page.tsx` only confirm
    "5 questions per paper, answer Q1 + Q2 + 2 of the remaining 3, 50 marks/paper" — no "10+4"
    marks-per-question split is documented anywhere in the codebase, so stating it would have been
    a fabricated number. Swapped for the subtopic-count stat instead, which is real.
  - 4 shortcut buttons below: "Paper 1 Guide" → `/paper-1`, "Paper 2 Guide" → `/paper-2`,
    "Paper 1 Topical Papers" / "Paper 2 Topical Papers" → in-page anchors to the two grids below
    (no invented routes).
- Paper 1 / Paper 2 sections: heading + original description, then a responsive grid (one card
  per real `SyllabusSection` from `data/syllabus.ts`, 4 cards each) reusing the hover-lift card
  treatment already established in `SectionHub.tsx`/`TrustBar.tsx`/homepage feature cards
  (`hover:-translate-y-1 hover:shadow-card-hover`). Each card: a rounded icon badge (decorative
  lucide icon per section, no fabricated data), the section's real title/description, tag pills
  showing real `Paper N`, real `{section.marks} marks`, and a real live `{getQuestionsBySection}`
  count, and a full-width dark CTA (`Open {section.title} Questions`) linking to
  `/past-papers/topical/{section.slug}` — the existing, unmodified section-hub route.
- `app/past-papers/page.tsx`: added one `Button` ("Open the Full Topical Past Papers Hub") linking
  to the new `/past-papers/topical` landing page, placed above the existing per-section quick-link
  grid (which was left in place, unchanged, as a compact alternative).
- No new `'use client'` directive: the new page is a plain Server Component (only
  `components/PaperTabs.tsx`, reused elsewhere, is a client component; this page doesn't use it).

**Every stat shown is real, sourced as follows:**

| Stat shown | Source |
|---|---|
| 2 Exam Papers | `paper1Sections` + `paper2Sections` arrays in `data/syllabus.ts` |
| 8 Syllabus Sections | `paper1Sections.length + paper2Sections.length` (computed) |
| 52 Topical Practice Areas | sum of `.subtopics.length` across all 8 sections (computed) |
| 2058 / 0493 | `siteConfig.qualifications.oLevel.code` / `.igcse.code` |
| Per-card marks (8/14/…) | `section.marks` field, `data/syllabus.ts` |
| Per-card question count | `getQuestionsBySection(section.slug).length`, `data/questions.ts` |
| Footer question count | `pastPaperQuestions.length`, `data/questions.ts` |

**QA — all real output:**

```
$ npm run lint       → eslint . — no errors, no warnings
$ npm run typecheck  → tsc --noEmit — exit 0
$ npm run build      → ✓ Compiled successfully
                        /past-papers/topical               ○ (Static)   212 B    106 kB
                        /past-papers/topical/[section]      ● (SSG, 8 paths)     212 B    106 kB
                        /past-papers/topical/[section]/[subtopic] ● (SSG, 60 paths) 1.85 kB 108 kB
                        /past-papers                        ○ (Static)   2.84 kB  109 kB
                        all other existing routes (past-papers/question × 351, paper-1/2,
                        /search, quizzes, quotes-references, etc.) unaffected
```

Files touched: `app/past-papers/topical/page.tsx` (new), `app/past-papers/page.tsx` (one `Button`
added, imports updated). No files under `source/` or `.git` were touched; no commits made.
