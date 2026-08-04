# SEO Checklist

Quick-reference status as of 3 August 2026 (keyword-research pass). See `docs/seo-architecture.md`
for detail and `docs/keyword-research.md` / `docs/keyword-page-map.md` for the research behind this
pass.

## Implemented

- [x] Unique `<title>` / meta description on every page owned by this build.
- [x] Title template site-wide (`%s | O Level Islamiyat`) via `app/layout.tsx`.
- [x] `app/sitemap.ts` generated dynamically from real data (syllabus, topics, past papers, model
      answers, reference categories, quizzes) — no hardcoded/fake URLs.
- [x] `app/robots.ts` reviewed — correct, unchanged.
- [x] `EducationalOrganization` JSON-LD site-wide, sourced from `data/site-config.ts` only.
- [x] `Person` JSON-LD on the founder page, using the verbatim bio.
- [x] `FAQPage` JSON-LD on `/contact`, `/online-classes`, homepage, `/syllabus`, `/past-papers`,
      `/paper-1`, `/paper-2`, `/exam-pattern` — each exactly mirroring visible FAQ text.
- [x] `Article` JSON-LD on every individual lesson/topic page (`/paper-1/[section]/[topic]` and
      `/paper-2/[section]/[topic]`), built only from fields already rendered on the page.
- [x] Semantic heading hierarchy (`h1` → `h2` → `h3`) on all new/extended pages.
- [x] Descriptive, non-generic link text throughout new pages.
- [x] Qualification codes 2058 / 0493 used naturally in copy and metadata, not stuffed.
- [x] Canonical URL metadata (`alternates.canonical`, via `lib/seo.ts` `canonical()` helper) on
      every static and dynamic page (38 static-metadata pages + all `generateMetadata` dynamic
      routes + homepage).
- [x] Titles/descriptions on key hub pages (homepage, syllabus, exam-pattern, past-papers, paper-1,
      paper-2) rewritten to lead with the real primary keyword per `docs/keyword-research.md`.
- [x] Internal linking improved with descriptive keyword-bearing anchor text between paper-1/paper-2,
      past-papers, model-answers, quotes-references and the exam-technique guide.
- [x] Custom `app/not-found.tsx` with helpful navigation links to major sections.
- [x] Checked for thin/duplicate/filter-only pages — none found (no internal search or empty
      filter-state pages exist), so no `noindex` was needed.

## Pending (not done in this build)

- [ ] Open Graph / Twitter card images — currently no OG image asset exists at all.
- [ ] `BreadcrumbList` structured data for deep pages.
- [ ] Formal Lighthouse/PageSpeed pass.
- [ ] Cloudflare Web Analytics — deliberately left off; enable only with a privacy-policy update
      first (see `/privacy`).

## Verification performed

- `npm run lint` — 0 errors, 0 warnings.
- `npm run typecheck` — clean.
- `npm run build` — succeeded, 186 pages generated (unchanged count; `/_not-found` now uses the
  custom page), sitemap unaffected.
