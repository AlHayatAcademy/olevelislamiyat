# IA / Navigation Polish Audit — 2026-08-04

Full route-tree review done before making changes, per the "polish structure/navigation" task.
Scope: every route under `app/`, `data/site-config.ts` `primaryNav`, and `components/Header.tsx`'s
mega-menu grouping.

## Findings

1. **Orphaned page: `/teacher-resources`.** Not present in `siteConfig.primaryNav`, not present in
   the header's mega-menu, and not linked from the mobile menu. Its only entry point sitewide was
   one inline text link inside the `/resources` page body ("Visit the Teacher Resources hub").
   A teacher-facing hub with its own dedicated metadata/sitemap entry with no nav path in is a
   genuine discoverability gap. **Fixed** — added to `primaryNav` and the header's "Resources"
   mega-menu group.

2. **Breadcrumbs component built but unused sitewide.** `components/Breadcrumbs.tsx` (and the
   `breadcrumbs` prop on `components/PageShell.tsx`) existed and was well-built (visible trail +
   matching `BreadcrumbList` JSON-LD) but before this pass it was used on **zero** pages — a
   `grep -rl "Breadcrumbs" app` returned nothing. For a site this deep (four-level routes under
   `/paper-1/[section]/[topic]`, `/past-papers/topical/[section]/[subtopic]`,
   `/quotes-references/[category]/[id]`), this was the single biggest missed navigation aid — no
   way to jump up a level except the browser back button or the header. **Fixed** — added
   breadcrumbs (or wired the existing prop) to every top-level and mid-level page; deep `[topic]`
   and `[id]` pages already had ad-hoc breadcrumbs via shared components (`TopicPage`,
   `past-papers/question/[id]`, etc.) and needed no change.

3. **Revision sub-pages used a bespoke "← Revision Centre" back-link instead of breadcrumbs.**
   Not wrong, but inconsistent with the rest of the site once breadcrumbs became the sitewide
   convention. **Fixed** — swapped for `Breadcrumbs` in all four sub-pages
   (`common-mistakes`, `exam-technique`, `key-dates`, `key-personalities`), keeping their existing
   icon+title header row untouched.

4. **Mega-menu grouping ("Study / Practice / More") had an overloaded catch-all group.** "More"
   held `/revision`, `/notes`, `/resources`, `/online-classes`, `/about`, `/contact` — six items
   spanning study tools, a company-info page and a contact form, with no discernible internal
   order. **Fixed** — split into "Resources" (revision, notes, resources hub, online classes,
   teacher resources) and "About" (about, contact), so each group now has one clear job: Study =
   syllabus content, Practice = assessment practice, Resources = supporting study/teaching
   material, About = who runs the site / how to reach them.

5. **No pages found that should be merged, renamed, or removed.** Reviewed the full route list
   (43 top-level/nested routes) against the nav and did not find genuine redundancy — e.g.
   `/past-papers` (yearly + FAQ landing) and `/past-papers/topical` (topic-regrouped landing) look
   similar at a glance but serve different real user intents (browse by year vs. drill a specific
   topic across years) and both are already cross-linked from each other's page body. Left as-is;
   restructuring here would be change for its own sake, which the task explicitly said to avoid.

6. **Legal/utility pages (`/privacy`, `/terms`, `/copyright`, `/disclaimer`,
   `/cambridge-disclaimer`, `/accessibility`) are intentionally footer-only, not in the header nav**
   — correct existing pattern (`siteConfig.footerLegalLinks`), left unchanged. They did, however,
   lack breadcrumbs, which is now fixed (item 2).

## Not changed (considered, rejected)

- Considered moving `/notes` under `/revision` in the IA (both are "revision material"), but
  `/notes` is linked directly from `/resources`, `/revision`, and the header, and merging routes
  would break existing internal links and the sitemap for no real usability gain — the task asked
  for surgical improvements only where genuinely beneficial.
- Considered a 5th mega-menu group to split "Practice" further, but 4 items (Past Papers, Model
  Answers, Quizzes, Quotes & References) is already a comfortable single-column dropdown size;
  splitting further would add a group for its own sake.

## Result

Header now has 4 clearly-scoped mega-menu groups (Study / Practice / Resources / About), every
group item shows a semantically-matched Lucide icon plus a one-line description, the mobile menu
mirrors the same 4-section structure, `/teacher-resources` is a discoverable first-class route, and
breadcrumbs (with matching `BreadcrumbList` JSON-LD) are present on every page in the site.
