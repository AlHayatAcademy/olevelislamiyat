# Testing

## Philosophy

Before this project had any test framework, every change was verified by manual review and eyeballing the live site. The testing setup added since favors:

- **Data-integrity tests over exhaustive UI tests** — with ~450 typed content items and growing, the highest-value tests are the ones that catch a broken cross-reference (an orphaned lesson, a duplicate question ID) the moment it's introduced, not just UI rendering.
- **Real production builds for e2e** — Playwright tests run against `next build && next start`, the same artifact that ships, not the dev server. This is deliberate: this app is deployed as a Cloudflare Worker with a specific caching strategy (see [Decision-Log.md](./Decision-Log.md)), and dev-server behavior doesn't always match it.
- **No brittle tests** — tests assert behavior and accessible structure (roles, labels, visible text), not implementation details like exact class names or DOM node counts, so refactors don't require touching tests unless behavior actually changed.

## Vitest (unit + integration)

Config: `vitest.config.mts`. Environment: `jsdom`. Setup file: `tests/setup.ts` (registers
`@testing-library/jest-dom` matchers and `afterEach(cleanup)` — cleanup isn't automatic here
because `test.globals` is intentionally off, matching the rest of the codebase's explicit-import
style).

```
tests/
  setup.ts
  unit/
    lib-utils.test.ts              cn()
    seo.test.ts                    canonical(), faqSchema(), articleSchema()
    search.test.ts                 lib/search.ts against the real search index
    search-synonyms.test.ts        synonym expansion + data-integrity checks
    questions.test.ts              data/questions: no dupes, every helper function
    topics-and-syllabus.test.ts    syllabus <-> topics 1:1 invariant, getTopic/getSections/etc.
    tile-accent.test.ts            all 8 tile accent colors present and correctly wired
  integration/
    Quiz.test.tsx                  full Quiz component behavior via a fixture quiz
```

Run:

```bash
npm run test              # single run
npm run test:watch        # watch mode
npm run test:coverage     # with a coverage report (text + HTML in coverage/, gitignored)
```

## Playwright (end-to-end)

Config: `playwright.config.ts`. Runs against Chromium only (matches this project's actual user
base and keeps CI fast). The `webServer` config runs `npm run build && npm run start -p 3100`
automatically before tests start — you don't need to build/serve manually.

```
e2e/
  homepage.spec.ts                 loads, landmarks present
  navigation.spec.ts               desktop mega-menu, mobile menu, breadcrumbs, 404 page
  search.spec.ts                   Ctrl/Cmd+K modal, no-results state, Escape, /search page
  quiz.spec.ts                     full quiz attempt end to end
  topic-pages.spec.ts              Paper 1/2 topic pages, paper index pages
  contact-form.spec.ts             validation errors + successful submission
  sitemap-and-robots.spec.ts       robots.txt, sitemap.xml, manifest.webmanifest
```

Run:

```bash
npm run test:e2e          # headless run
npm run test:e2e:ui       # Playwright's interactive UI mode — useful for debugging a failure
```

**Chromium version note**: `playwright.config.ts` prefers a preinstalled Chromium at
`/opt/pw-browsers/chromium-1194/chrome-linux/chrome` when present (some sandboxed dev
environments ship this to avoid a version-pinned download), and falls back to Playwright's
normal managed browser otherwise — which is what CI uses, after `npx playwright install
--with-deps chromium`.

## CI workflow

`.github/workflows/ci.yml`, two jobs on every push to `main` and every PR:

1. **`verify`**: `npm ci` → `lint` → `typecheck` → `test` (Vitest) → `build`.
2. **`e2e`** (needs `verify`): `npm ci` → install Chromium → `test:e2e` → uploads the Playwright
   HTML report as a build artifact (`playwright-report/`, retained 14 days), even on failure.

## Coverage

`npm run test:coverage` uses `@vitest/coverage-v8`. Coverage is scoped to `lib/**`, `data/**`,
`components/**` (excludes `data/questions/**` and `data/topics/**` — huge pure-data arrays with no
logic to cover). Current coverage is low on `components/` overall (~18%) since most presentational
components are only exercised indirectly via Playwright, not in isolation — see
[Roadmap.md](./Roadmap.md) for planned expansion.

## Running tests locally

```bash
npm install                 # once
npm run test                # fast — a few seconds
npm run test:e2e            # slower — builds the app first, ~50s total
```

## Adding new tests

**Unit test for a `lib/` utility**: add `tests/unit/<name>.test.ts`, import the function under
test via the `@/` alias, no mocking needed for pure functions.

**Data-integrity test for a new content domain**: follow the pattern in
`tests/unit/topics-and-syllabus.test.ts` or `tests/unit/questions.test.ts` — assert uniqueness of
IDs, non-empty required fields, and any cross-reference invariant the domain relies on (e.g. "every
X maps back to a real Y"). See [Content-Architecture.md](./Content-Architecture.md#data-validation-rules).

**Component test**: use `@testing-library/react` + `@testing-library/user-event`, in
`tests/integration/`. Use accessible queries (`getByRole`, `getByLabelText`) over
`getByTestId`/CSS selectors — this both tests real accessibility and survives markup refactors.
Remember `beforeEach(() => window.localStorage.clear())` if the component under test persists
state, matching `Quiz.test.tsx`.

**E2E test**: add `e2e/<feature>.spec.ts`. Prefer `page.getByRole(...)` scoped to a landmark
(`page.getByRole("navigation", { name: "Primary" })`) over broad text matches, which can
accidentally match the same text in a footer/breadcrumb — see the fix in
`e2e/navigation.spec.ts`'s history for a concrete example of this gotcha.

## What a soft-404 test looks like (a real example)

`e2e/topic-pages.spec.ts` has a test documenting a real, still-open bug: an unknown topic slug
under a valid section renders the "Page Not Found" UI but responds `200` instead of `404`. Rather
than skip or delete the test, it asserts the *current actual* behavior with a comment explaining
the known gap and the likely fix — so the test still catches any further regression, and flips to
asserting `404` the moment the underlying bug is fixed. This is the preferred pattern for a known,
out-of-scope issue: document it in a test, don't silently ignore it.
