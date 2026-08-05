# Fixing "Error 1102 — Worker exceeded resource limits" on `/syllabus`

## Symptom

The live Worker deployment at
`https://olevelislamiyat.drimranhayatmalik.workers.dev/syllabus` returned
Cloudflare's **Error 1102 (Worker exceeded resource limits)**. This is a
Cloudflare-edge error, not an application error — it never appeared in
`npm run dev` or `npm run build`, because those don't run under the real
Workers runtime's CPU-time enforcement.

## Root cause

`open-next.config.ts` called `defineCloudflareConfig()` with no arguments.
Looking at the adapter's source
(`node_modules/@opennextjs/cloudflare/dist/api/config.js`), every override
that isn't explicitly set — including `incrementalCache` — defaults to the
string `"dummy"`, i.e. a **no-op cache that never stores anything**
(despite the file's original comment claiming an "in-memory" default).

The practical effect: even though almost every route in this app
(`/syllabus` included) is fully static — prerendered at build time via
`generateStaticParams` / static `metadata`, shown as `○`/`●` in the
`next build` output — the Worker still re-ran the **entire Next.js
server-side rendering pipeline from scratch on every single request**,
because there was no cache to short-circuit it. The rendered result was
thrown away immediately after each response.

On Cloudflare's free Workers plan, per-request CPU time is tightly capped.
`/syllabus` renders slightly more markup than most pages (an FAQ section
with a `FAQPage` JSON-LD schema built from an array, on top of the shared
root layout's own JSON-LD and mega-menu header), which was apparently
enough to push its from-scratch SSR cost over the free-tier CPU limit on
that route specifically, tripping 1102. Lighter pages happened to stay
under the limit, which matches the reported "only `/syllabus`" symptom.

This was **not** a self-reference-loop bug: `WORKER_SELF_REFERENCE` was
never invoked, because there was no cache implementation to use it in the
first place. It also wasn't a bug in `/syllabus`'s own code — the page is a
plain static component with no loops or heavy computation. Confirmed via:

- Reading `app/syllabus/page.tsx`, `app/layout.tsx`, `Header`, `Footer`,
  `PageShell`, `AnnouncementBar` — nothing unusual, no recursion.
- Running the real Workers runtime locally (`npx wrangler dev` against the
  `.open-next` bundle, and the actual `npm run preview` script) and
  inspecting the local Cache API / `spans` observability table for
  self-fetch loops — none found; requests to `WORKER_SELF_REFERENCE`
  showed zero child spans, consistent with the cache being a no-op.
- Confirming `middleware.ts` doesn't exist at the repo root — no
  per-request middleware overhead to account for.

## Fix

Since this site has no ISR/on-demand revalidation needs (everything is
prerendered at build time), it doesn't need a persistent cache store
(KV/R2/D1) — it just needs the Worker to stop re-rendering prerendered
pages on every request. `@opennextjs/cloudflare` ships exactly this: a
**static-assets-backed incremental cache**
(`@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache`)
that serves prerendered output straight from the Worker's own `ASSETS`
binding (already configured in `wrangler.jsonc`) — no new Cloudflare
bindings required, and it's explicitly documented as being for apps that
"do NOT want revalidation and ONLY want to serve prerendered data."

`open-next.config.ts` now sets:

```ts
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
```

This cache type requires an extra build step: the adapter's
`populateCache` command copies the build's `.open-next/cache/**` files into
`.open-next/assets/cdn-cgi/_next_cache/**` so they ship as part of the
Worker's static assets. Without this step the cache directory doesn't
exist and every request would silently fall back to a cache miss (i.e. the
original bug). `package.json` scripts were updated to always run it after
`opennextjs-cloudflare build`:

```json
"pages:build": "opennextjs-cloudflare build && opennextjs-cloudflare populateCache local",
"preview": "opennextjs-cloudflare build && opennextjs-cloudflare populateCache local && opennextjs-cloudflare preview",
"deploy": "opennextjs-cloudflare build && opennextjs-cloudflare populateCache local && opennextjs-cloudflare deploy",
```

(For this cache type, `populateCache local` and `populateCache remote` do
the same thing — a local filesystem copy into `.open-next/assets` before
the assets directory is uploaded/served — so `local` is used uniformly.)

Since `docs/deployment-cloudflare.md` documents Cloudflare Pages picking up
`npm run pages:build` as the build command, updating that one script
covers the Cloudflare-dashboard deploy path too; no changes to
`docs/deployment-cloudflare.md` build-command instructions were needed.

No application code, OG image routes, or the `/api/contact` route were
touched or simplified — the fix is entirely in the caching configuration.

## Verification

1. `npm run lint` — clean.
2. `npm run typecheck` — clean.
3. `npm run build` — succeeds; `/syllabus` confirmed as a static (`○`)
   route in the route summary, as before.
4. `npm run preview` (the real check — runs `opennextjs-cloudflare build`,
   then `populateCache local`, then boots the actual Workers runtime via
   `wrangler dev` against the compiled `.open-next/worker.js`):
   - First request to `/syllabus`: `200 OK`, ~420ms (cache-populate/cold
     read from the `ASSETS` binding).
   - Every subsequent request to `/syllabus`: `200 OK`, ~14–20ms — no
     full Next.js re-render, served from the static-assets cache.
   - Response body verified to contain the full expected page content
     (`Frequently asked questions` section, `docs/syllabus-coverage-audit`
     reference note) — i.e. this is the real page, not a stub.
   - Spot-checked `/` (homepage), `/quizzes`, `/past-papers/topical`,
     `/revision` — all `200 OK`, all fast on repeat requests, same pattern.
   - No 1102/resource-limit errors, no errors of any kind in the
     `wrangler dev` log for any of these requests (the only errors present
     in the log are pre-existing, unrelated `Request.cf` sandbox warnings
     that appear before the server even starts handling requests).

This confirms the fix under the same local Workers runtime that reproduces
Cloudflare-specific resource constraints, which is the environment that
matters for this bug.
