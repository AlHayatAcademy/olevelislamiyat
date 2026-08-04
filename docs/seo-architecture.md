# SEO Architecture

Documents what is implemented for SEO / structured data across the site as of 3 August 2026, and
what remains pending.

## Metadata

- Root `app/layout.tsx` sets `metadataBase`, a title template (`%s | O Level Islamiyat`), and a
  default title/description drawn from `data/site-config.ts`.
- Every route touched in this build (`about`, `about/founder`, `about/institute`, `contact`,
  `privacy`, `terms`, `copyright`, `disclaimer`, `cambridge-disclaimer`, `accessibility`, `notes`,
  `resources`, `online-classes`, `teacher-resources`) exports a static `metadata` object with a
  unique, descriptive title and description. Qualification codes 2058 / 0493 are used naturally in
  descriptions where relevant (e.g. contact, online-classes, notes, terms, disclaimer).
- Pages built by other agents (`paper-1`, `paper-2`, `past-papers`, `model-answers`,
  `quotes-references`, `quizzes`, `revision`) already had their own metadata and were not touched.

## Sitemap (`app/sitemap.ts`)

Extended from a short static list to a fully generated sitemap covering:

- All static top-level routes (including the new `/teacher-resources`).
- Every Paper 1 / Paper 2 syllabus section (`/paper-1/[section]`, `/paper-2/[section]`).
- Every individual lesson/topic page (`/paper-1/[section]/[topic]`, `/paper-2/[section]/[topic]`),
  generated from `data/topics/index.ts` (`allTopics`).
- Every past-paper year (`/past-papers/year-wise/[year]`) from `availableYears` in
  `data/questions.ts`.
- Every topical past-paper page (`/past-papers/topical/[section]`) for both papers' sections.
- Every model answer (`/model-answers/[id]`) from `data/model-answers.ts`.
- Every reference category (`/quotes-references/[category]`) from `referenceTypes` in
  `data/references.ts`.
- Every quiz (`/quizzes/[id]`) from `data/quizzes.ts` (read-only import; that file is owned by
  another agent but importing its exported array is safe and keeps the sitemap accurate as quizzes
  are added).

Individual quotes-references entries (`/quotes-references/[category]/[id]`) and individual
past-paper questions (`/past-papers/question/[id]`) are **not** included in the sitemap to keep its
size reasonable — these are reachable via their parent listing pages, which are indexed.

## `robots.ts`

Unchanged — already allows all crawling and points at `/sitemap.xml`. Reviewed and left as-is
since it was already correct.

## Structured data (JSON-LD)

- **`EducationalOrganization`** — added in `app/layout.tsx`, rendered on every page. Built entirely
  from `data/site-config.ts` (name, legal name, URL, contact, founder, sameAs links, education
  division as `department`). No invented fields (no ratings, no fabricated address beyond the city
  already in config).
- **`Person`** — added on `app/about/founder/page.tsx`, using the verbatim founder bio and only the
  links already present in `site-config.ts`.
- **`FAQPage`** — added on `app/contact/page.tsx` and `app/online-classes/page.tsx`. Each schema is
  generated directly from the same `faqs` array rendered visibly on the page (`mainEntity` mirrors
  the on-page questions/answers exactly), so there is no mismatch between visible and structured
  content. `app/about/page.tsx` has no visible FAQ block, so no `FAQPage` schema was added there, per
  the instruction not to add FAQ schema without matching visible content.

## Keyword research pass (added 3 August 2026)

Real search behaviour was researched via live web search (Quora/competitor page titles, Cambridge's
own resource naming) and captured in `docs/keyword-research.md`. Findings were mapped per page in
`docs/keyword-page-map.md` and applied as:

- **Canonical URLs** — `lib/seo.ts` exports `canonical(path)`, returning
  `{ alternates: { canonical: `${siteConfig.domain}${path}` } }`, spread into every page's
  `metadata` object (static) or `generateMetadata` return (dynamic), including the homepage. This
  closes the previously-pending canonical-URL gap.
- **Title/description rewrites** — homepage, `/syllabus`, `/exam-pattern`, `/past-papers`,
  `/paper-1`, `/paper-2` had titles/descriptions rewritten to lead with the verified primary
  keyword for that page (e.g. "Islamiyat Paper 1 Notes (Qur'an & Seerah)") while staying under
  ~60/155 characters and keeping both qualification codes where relevant.
- **FAQPage schema** — added to the homepage, `/syllabus`, `/past-papers`, `/paper-1`, `/paper-2`
  and `/exam-pattern`, each backed by a real, verifiable answer sourced from `data/syllabus.ts` /
  existing page content, with the schema's `mainEntity` generated directly from the same array
  rendered visibly (no drift between visible and structured FAQ text).
- **Article schema** — added to `app/paper-1/[section]/[topic]/page.tsx` and
  `app/paper-2/[section]/[topic]/page.tsx`, built only from the topic's own `title`/`standing`
  fields already rendered by `TopicPage`.
- **Internal linking** — paper-1/paper-2 hub pages now link to past-papers and quotes-references
  with descriptive anchor text; past-papers links to model-answers; exam-pattern links to the
  exam-technique guide.
- **404 page** — `app/not-found.tsx` added with links to the main study sections.
- **Thin/duplicate pages** — reviewed for any internal search or empty-filter-state pages; none
  exist, so no `noindex` was required.

## Pending / not implemented

- **OG images** — no Open Graph / Twitter card images exist yet (placeholder only). `metadata`
  objects do not currently set `openGraph.images`. A design pass for social preview images is
  pending.
- **Breadcrumb (`BreadcrumbList`) structured data** — not implemented; would be a reasonable future
  addition for deep topic/model-answer pages.
- **hreflang / alternate languages** — not applicable; site is English-only.
- **Cloudflare Web Analytics** — intentionally left disabled (see `/privacy`); no analytics script
  is wired into `layout.tsx`.
