# Developer Guide

Everything a new contributor needs to become productive. For the "why" behind technical choices,
see [Decision-Log.md](./Decision-Log.md); for the "what's where", see
[Architecture.md](./Architecture.md).

## Project setup

Requirements: Node.js 22.x (matches `.github/workflows/ci.yml`), npm.

```bash
git clone <repo-url>
cd olevelislamiyat
npm install
```

## Local development

```bash
npm run dev
```

Starts the standard Next.js dev server at `http://localhost:3000` with fast refresh. No
Cloudflare-specific setup is needed for day-to-day editing — the Cloudflare/OpenNext layer only
matters for deployment.

## Commands reference

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server with fast refresh |
| `npm run build` | Standard Next.js production build (sanity check) |
| `npm run start` | Serve the `npm run build` output locally |
| `npm run lint` | ESLint (`next/core-web-vitals` + `next/typescript`) |
| `npm run format` | Prettier, writes in place |
| `npm run typecheck` | `tsc --noEmit`, strict mode |
| `npm run test` | Vitest unit + integration tests, single run |
| `npm run test:watch` | Vitest in watch mode |
| `npm run test:coverage` | Vitest with a coverage report |
| `npm run test:e2e` | Playwright end-to-end tests (builds + boots a production server automatically) |
| `npm run test:e2e:ui` | Playwright's interactive UI mode |
| `npm run pages:build` | Cloudflare-specific build via `@opennextjs/cloudflare` |
| `npm run preview` | Build + preview the Cloudflare Worker bundle locally |
| `npm run deploy` | Build + deploy to Cloudflare Workers |
| `npm run cf-typegen` | Regenerate `cloudflare-env.d.ts` from `wrangler.jsonc` |

## Before every commit

Run the same checks CI runs:

```bash
npm run lint && npm run typecheck && npm run test && npm run build
```

For anything touching navigation, forms, search, or a page template, also run:

```bash
npm run test:e2e
```

## Coding conventions

- **TypeScript strict mode** is on (`tsconfig.json`) and genuinely enforced — avoid `any`; the
  codebase currently has zero real uses of it.
- **Components**: named exports (`export function ComponentName`), PascalCase filenames matching
  the component name (`components/Header.tsx` → `export function Header()`). No default exports
  for components.
- **Imports**: use the `@/` path alias (maps to the repo root) for anything outside the current
  directory; relative imports (`./`, `../`) are fine — and used throughout the codebase — for
  same-folder siblings (e.g. `data/questions/2021.ts` importing `./types`).
- **Styling**: Tailwind utility classes directly in JSX. No CSS-in-JS, no separate stylesheet per
  component. Shared design tokens (colors, shadows, fonts) live in `tailwind.config.ts`.
- **Comments**: sparse by design — only where the *why* isn't obvious from the code (a workaround,
  a non-obvious constraint). Don't add comments that restate what the code already says.
- **No unnecessary abstraction**: prefer three similar lines over a premature shared helper. Only
  extract a shared function/component once real duplication exists (see
  `lib/seo.ts`'s `faqSchema()`/`articleSchema()` for an example of extraction done *after*
  duplication was found, not in anticipation of it).

## Folder conventions

- `app/**/page.tsx` — one per route; keep route-specific logic (data lookups, `notFound()` checks)
  here, and hand rendering off to a shared component (`PageShell`, `TopicPage`, `SectionHub`) where
  the shape is reused across routes.
- `components/` — shared, reusable UI. If a component is only ever used by one page, it can live
  co-located with that page instead (e.g. `app/contact/ContactForm.tsx`,
  `app/search/SearchPageClient.tsx`).
- `data/` — content only. No React, no rendering logic — just typed arrays and small pure-function
  helpers (`getQuestionById`, `getTopic`, etc.) that operate on them.
- `lib/` — framework-agnostic utilities that don't belong to a specific content domain (`cn()`,
  the search engine, SEO helpers).
- Large data domains that risk becoming a single huge file should be split by a natural boundary
  (year, section) with a `types.ts` + `index.ts` barrel, matching `data/questions/` and
  `data/topics/` — see [Content-Architecture.md](./Content-Architecture.md) for the pattern to
  follow when adding a new content domain at scale.

## Branch workflow

This repository is currently maintained via a single long-lived `main` branch. Commits are made
locally (in this project's case, by an AI assistant working through the codebase) and pushed to
`main` directly by the repository owner — there is not yet a pull-request-per-change workflow or
branch protection in place. If/when the team grows, the recommended next step is:

1. Feature branches off `main` (`feature/<short-description>`).
2. Pull requests into `main`, gated by the existing CI workflow (`verify` + `e2e` jobs already
   required to pass).
3. Squash-merge to keep `main`'s history linear.

This isn't enforced today, but the CI pipeline is already built to support it — enabling branch
protection with required status checks is a configuration change, not a code change.

## Adding a new page

1. Create `app/<route>/page.tsx`.
2. Export `metadata` (or `generateMetadata` for dynamic routes) — use `canonical()` from
   `@/lib/seo` for the canonical URL.
3. If the page needs breadcrumbs and a simple heading+content shape, use `PageShell` from
   `@/components/PageShell` (pass `article` if the page is a single standalone piece of content,
   e.g. a detail page rather than a listing page — see [Architecture.md](./Architecture.md)).
4. Add the route to `app/sitemap.ts` if it's not already covered by an existing
   `generateStaticParams`-driven loop.

## Adding content

See [Content-Architecture.md](./Content-Architecture.md) for lessons, questions, quizzes, and
references specifically.

## Getting help

Start with [Architecture.md](./Architecture.md) for the big picture, then the specific doc for
the area you're touching (Content, Testing, Deployment). [Decision-Log.md](./Decision-Log.md)
explains *why* things are the way they are, which is often faster than re-deriving it from the
code.
