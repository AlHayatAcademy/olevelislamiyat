# Roadmap

Tracks the platform engineering work from the initial audit through to today, and what's next
before feature development (accounts, progress tracking, etc.) begins.

## Priority 1 — Critical (done)

- [x] Split `data/questions.ts` into per-year files
- [x] CI pipeline (lint/typecheck/build gate on every push)
- [x] Baseline security headers (CSP, HSTS, X-Frame-Options, etc.)
- [x] `error.tsx` / `loading.tsx` boundaries
- [x] Accessibility pass on Header/Quiz/Search

## Priority 2 — Important (done)

- [x] Dead config cleanup (unused Tailwind glob, orphaned keyframe, duplicated manifest colors)
- [x] Rate limiting on `/api/contact`
- [x] Centralized SEO/JSON-LD generation (`lib/seo.ts`, `components/JsonLd.tsx`)
- [x] Test suite: Vitest (unit/integration) + Playwright (e2e), wired into CI
- [x] Semantic HTML & accessibility pass (`<article>` landmarks, list markup, table caption, form
      live-regions)
- [x] Repository cleanup: removed 2 accidental-duplicate `.docx` files, verified `.gitignore`
      covers all build artifacts, confirmed no unused dependencies
- [x] Documentation consolidation (this doc set)

## Priority 3 — Nice-to-have (not started)

- [ ] Bundle analysis (`@next/bundle-analyzer`) to verify no data file leaks into client bundles
- [ ] PWA polish: maskable/512 icon, offline fallback page
- [ ] Design-token single-sourcing beyond the two colors already centralized
      (`brandColors` in `tailwind.config.ts`)
- [ ] i18n architecture groundwork (Urdu/Arabic, RTL) — only worth doing once actually planned

## Known open issues (found via testing, not yet fixed)

- **Soft-404 on unknown topic slugs**: `/paper-1/<valid-section>/<invalid-slug>` renders the
  "Page Not Found" UI but responds HTTP 200, not 404 — documented and asserted (as current
  behavior) in `e2e/topic-pages.spec.ts`, with the likely cause noted in a comment there. Real fix
  is a routing/behavior change, intentionally out of scope for the docs/testing/a11y passes that
  found it.

## Before Phase 3 (feature development)

Recommendations, roughly in order of leverage:

1. **Fix the soft-404** above — small, isolated, and the kind of thing that quietly hurts SEO the
   longer it's left.
2. **Model answers coverage**: only ~10 of 351 past-paper questions currently have a model answer
   (`data/model-answers.ts`). This is a content task, not an engineering one, but it's the biggest
   visible gap between what the site promises and what it delivers today.
3. **Expand test coverage on presentational components** (Header, SearchModal, Breadcrumbs) —
   currently only exercised indirectly via e2e; see [Testing.md](./Testing.md#coverage).
4. **Add `@axe-core/playwright`** to the e2e suite and assert zero violations on a handful of
   representative routes — the existing manual accessibility pass (see
   [Decision-Log.md](./Decision-Log.md)) is solid, but automated regression coverage is cheap
   insurance now that the e2e infrastructure exists.
5. **Decide on data-layer scaling** *before* content volume forces the decision: the current
   typed-TypeScript-array approach (see [Decision-Log.md](./Decision-Log.md)) works well up to a
   few thousand items; if student accounts/progress-tracking/CMS-editing become real requirements,
   that's the trigger to introduce a database (Cloudflare D1 is already available in this stack
   and unused) rather than retrofitting one under pressure.
6. **Branch/PR workflow**: currently single-branch (`main`), commits pushed directly by the
   repository owner. CI is already built to gate pull requests (`verify` + `e2e` jobs) — enabling
   branch protection with required status checks is pure configuration, worth doing before more
   people touch the codebase. See [Developer-Guide.md](./Developer-Guide.md#branch-workflow).

## Future features (architecture should support, not build yet)

These are aspirational — noted so current architecture decisions don't accidentally foreclose
them, not because they're scheduled:

Student accounts, progress tracking, bookmarks, quiz history, leaderboards, AI tutor/marking,
flashcards, practice papers, saved notes, a proper full-text search engine (vs. the current
client-side index), a discussion system, a blog/newsletter. Most of these need real persistence
(Cloudflare D1 is the natural fit given the existing deployment target) and, for anything
account-related, an auth layer — neither exists today.
