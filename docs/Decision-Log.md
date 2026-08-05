# Decision Log

Significant architectural decisions made on this project, and why. Ordered roughly by when each
area was first decided.

## Cloudflare Workers via OpenNext, not static export

**Decision**: Deploy as a real Cloudflare Worker (`@opennextjs/cloudflare`), not a static export.

**Why**: `app/api/contact/route.ts` needs a live server to handle POST requests, and
`app/opengraph-image.tsx` / `twitter-image.tsx` / `icon.tsx` / `apple-icon.tsx` use `next/og` for
on-demand image generation, which needs a runtime. A static export can't serve either. The
alternative — dropping the contact API route and generating OG images at build time instead —
was rejected because the contact form and dynamic OG images were both wanted, and Cloudflare
Workers' free tier comfortably serves this site's traffic level.

## `data/` as typed TypeScript, not a CMS or database

**Decision**: All content lives as TypeScript literal arrays, validated by `tsc --noEmit`, not in
a headless CMS or database.

**Why**: At the project's current scale (~450 content items), a CMS adds real overhead — a second
system to run, sync, and reason about — for a benefit (non-technical content editing) that isn't
needed yet, since content authoring in this project has so far been a code-review-driven process.
TypeScript arrays get type-checking for free, diff cleanly in git, and every content item's shape
is enforced by the compiler. See [Content-Architecture.md](./Content-Architecture.md) for the
full structure. **Revisit this decision** if/when non-technical contributors need to add content
directly, or content volume grows enough that hand-editing TypeScript files becomes the
bottleneck (see [Roadmap.md](./Roadmap.md)).

## Splitting `data/questions.ts` and `data/topics` by natural boundary

**Decision**: Split the once-monolithic `data/questions.ts` (6,917 lines) into
`data/questions/<year>.ts`, and keep `data/topics` split by syllabus-section group, each with a
`types.ts` + `index.ts` barrel.

**Why**: A single huge file is a real maintenance cost — slow diffs, slow IDE indexing, higher
merge-conflict risk — that gets worse as content grows toward the thousands. Splitting by a
natural, stable boundary (exam year; syllabus section) keeps files reviewable while the `index.ts`
barrel means every existing import keeps working unchanged (verified byte-for-byte identical
output when this was done). See [Migration-History.md](./Migration-History.md) for the specific
migration.

## `static-assets-incremental-cache`, not the default `"dummy"` cache

**Decision**: `open-next.config.ts` explicitly sets `incrementalCache` to
`staticAssetsIncrementalCache`.

**Why**: This project hit Cloudflare's **Error 1102** (Worker exceeded resource limits) on
`/syllabus` in production. Root cause: `defineCloudflareConfig()` called with no arguments
defaults every unset override — including `incrementalCache` — to `"dummy"`, a no-op cache that
never stores anything. Even though almost every route here is fully static
(`generateStaticParams` + static `metadata`), the Worker was re-running the **entire Next.js SSR
pipeline from scratch on every single request**, because nothing short-circuited it. `/syllabus`
renders slightly more markup than most pages (an FAQ section + JSON-LD on top of the shared
header/layout), which pushed its from-scratch cost over the free-tier CPU cap. The fix: since this
site has no ISR/revalidation needs (everything is prerendered at build time), it just needs the
Worker to serve prerendered output instead of re-rendering it — `staticAssetsIncrementalCache`
does exactly that, reading straight from the Worker's own `ASSETS` binding. **Trade-off accepted**:
this cache doesn't support on-demand revalidation, which is fine only because nothing on this site
currently needs it — a future feature that does (e.g. live quiz leaderboards) would need a
different cache strategy (KV or D1-backed).

## Centralized SEO helpers (`lib/seo.ts` + `components/JsonLd.tsx`)

**Decision**: Extract `faqSchema()` and `articleSchema()` into `lib/seo.ts`, and a `JsonLd`
wrapper component, rather than leaving each page to hand-build its own JSON-LD `<script>` tag.

**Why**: Two real, byte-identical duplications had crept in independently — the Paper 1 and Paper
2 topic pages built an identical `Article` schema object (differing only in paper number), and 7
different pages built an identical `FAQPage` schema from a local `faqs` array. This is exactly the
kind of duplication that causes SEO regressions at scale (one page's schema gets updated, six
others don't). Deliberately **did not** centralize per-page titles/descriptions/FAQ *content* —
that's real, unique content, not duplication.

## Testing strategy: Vitest + Playwright, data-integrity-first

**Decision**: Vitest for unit/integration (jsdom + Testing Library), Playwright for e2e against a
production build, with data-integrity tests treated as first-class (not an afterthought).

**Why**: No test framework existed before this project's testing pass — every change was verified
manually. Given the content-heavy nature of this app, the highest-leverage tests are the ones
that catch data problems (an orphaned lesson, a duplicate ID, a broken syllabus cross-reference)
immediately, since those are exactly the errors that are easy to introduce by hand and easy to
miss in a manual review of a 6,000-line data file. E2e tests run against `next build && next
start` (not the dev server) specifically because this app's Cloudflare deployment has its own
caching behavior (see the incremental-cache decision above) that the dev server doesn't
replicate.

## Accessibility: `inert` over manual tabindex management, native HTML over ARIA

**Decision**: Use the native `inert` attribute to remove hidden menus from the tab order (Header's
mega-menu and mobile nav), rather than manually toggling `tabIndex={-1}` on every focusable
descendant; prefer semantic HTML (`<article>`, `<nav>`, `<ul>/<li>`, `<caption>`) over ARIA
attributes wherever a native element already carries the right semantics.

**Why**: `inert` is now supported by React 19's typings and every evergreen browser, and it
correctly handles focus, tab order, *and* screen-reader visibility in one attribute, instead of
error-prone manual bookkeeping. The broader "native HTML over ARIA" bias follows the standard WAI
guidance ("no ARIA is better than bad ARIA") and reduces the amount of behavior this codebase has
to hand-implement and keep correct.

## Source documents stay in the repo

**Decision**: Keep `source/` (the `.docx` syllabus and past-paper extraction documents, ~1.8MB)
versioned in the main repository rather than moving it to Git LFS or out of the repo entirely.

**Why**: Every past-paper question's `sourceNote` field cites one of these files as its
provenance/verification trail — they're the project's evidence that questions are genuinely
verbatim, not paraphrased, which is a core credibility claim of the site. At ~1.8MB total, this is
far below the size where Git LFS's added complexity (a separate storage backend, LFS-aware clone
tooling) would pay for itself; GitHub's normal repo-size guidance only becomes a concern in the
hundreds of MB. **Revisit** if this directory grows substantially (e.g. adding scanned PDFs
instead of `.docx` extractions).

## Repository cleanup: accidental duplicates removed, not the whole directory

**Decision**: Delete only the two confirmed byte-identical accidental-duplicate `.docx` files
(see [Migration-History.md](./Migration-History.md)), not any other `source/` file.

**Why**: Every other file in `source/` is either actively cited by a `sourceNote` in `data/`, or
is original syllabus/authoring material still needed for future content work. "Historical working
document" and "obsolete" are not the same thing here — a document being old doesn't mean it's
unneeded when it's the sole citation trail for already-published content.
