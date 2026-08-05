# Deployment

## Where it's deployed

- **Worker name**: `olevelislamiyat` (`wrangler.jsonc`)
- **Current live URL**: `olevelislamiyat.drimranhayatmalik.workers.dev`
- **Target custom domain**: `olevelislamiyat.drimranhayat.com`
- **Platform**: Cloudflare Workers, via the [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare)
  adapter — **not** a static export and **not** Cloudflare Pages' Git-integration flow. The app is
  built into a real Worker bundle and deployed directly with `wrangler`, because
  `app/api/contact/route.ts` and the `next/og`-based image generation
  (`opengraph-image.tsx`/`twitter-image.tsx`/`icon.tsx`/`apple-icon.tsx`) need a live server
  runtime, not just static hosting.

## Why a real Worker, not static export

See [Decision-Log.md](./Decision-Log.md#cloudflare-workers-via-opennext-not-static-export) for the
full reasoning.

## Build pipeline

```bash
npm run build          # standard Next.js build — fast sanity check, run this first
npm run pages:build    # opennextjs-cloudflare build && populateCache local
```

`npm run pages:build` produces `.open-next/` (gitignored):
- `.open-next/worker.js` — the actual Worker bundle (`wrangler.jsonc`'s `main`)
- `.open-next/assets/` — static assets served via the `ASSETS` binding

## Local preview before deploying

```bash
npm run preview
```

Runs the Cloudflare build and serves it locally through the real Workers runtime (via `wrangler`),
so you can catch Workers-runtime-specific issues (like the CPU-limit issue described in
[Decision-Log.md](./Decision-Log.md#static-assets-incremental-cache-not-the-default-dummy-cache))
before they reach production.

## Deploying

```bash
npm run deploy
```

Runs `opennextjs-cloudflare build && populateCache local && opennextjs-cloudflare deploy`, which
builds and pushes the Worker directly via `wrangler`. This requires Cloudflare credentials
(`wrangler login`, or `CLOUDFLARE_API_TOKEN`/`CLOUDFLARE_ACCOUNT_ID` env vars) to be available in
whatever environment runs this command.

There is **no automated deploy step in CI** today — `.github/workflows/ci.yml` only runs
lint/typecheck/tests/build verification, not `npm run deploy`. Deployment is a manual step run
by whoever has Cloudflare account access.

## Custom domain

Once ready to move off the `*.workers.dev` URL onto `olevelislamiyat.drimranhayat.com`:

1. Cloudflare dashboard → the `olevelislamiyat` Worker → **Triggers** → **Custom Domains** → **Add
   Custom Domain**.
2. Enter `olevelislamiyat.drimranhayat.com`.
3. If `drimranhayat.com`'s DNS is on the same Cloudflare account, Cloudflare adds the required
   record automatically. Otherwise, add a `CNAME` in whichever DNS provider manages
   `drimranhayat.com`, pointing at the hostname Cloudflare shows on that screen.
4. Update `siteConfig.domain` in `data/site-config.ts` if the canonical domain changes — this
   value drives every canonical URL, sitemap entry, and JSON-LD `url` field site-wide (see
   [Architecture.md](./Architecture.md#seo-architecture)).

## Environment variables / bindings

None are required today. `wrangler.jsonc` configures only:
- The Worker name and asset directory.
- A **self-reference service binding** (`WORKER_SELF_REFERENCE`) that the OpenNext caching layer
  uses internally — not something application code calls directly.

No KV/D1/R2 bindings exist yet. If a future feature needs persistence (accounts, progress
tracking — see [Roadmap.md](./Roadmap.md)), that's the point where a binding would be added to
`wrangler.jsonc` and provisioned in the Cloudflare dashboard.

## Analytics

Not wired in yet, by design — no tracking by default, no Google Analytics. To add Cloudflare Web
Analytics later: Cloudflare dashboard → **Analytics & Logs** → **Web Analytics** → add the site,
then add the generated `<script>` snippet to `app/layout.tsx` (the one place every page shares a
root layout). Don't hardcode a site token into the repo ahead of actually enabling it.

## Troubleshooting

- **Build fails with a Node version error**: this project targets Node 22 (matches
  `.github/workflows/ci.yml`); confirm your local `node -v` matches.
- **`@opennextjs/cloudflare`/`wrangler` version mismatch**: versions are pinned with `^` in
  `package.json`; if a newer major version breaks the build, pin exact versions (drop the `^`)
  rather than debugging against a moving target.
- **`/api/contact` doesn't respond in production**: confirm the deploy used `npm run pages:build`
  / `npm run deploy` — a plain `npm run build` alone does not produce a Worker bundle capable of
  serving the dynamic API route.
- **A previously-fine route suddenly hits Cloudflare's Error 1102 (Worker exceeded resource
  limits)**: see [Decision-Log.md](./Decision-Log.md#static-assets-incremental-cache-not-the-default-dummy-cache)
  for the root cause this project hit once already (an unconfigured incremental cache defaulting
  to a no-op, forcing full server-side re-render on every request) and how `open-next.config.ts`
  fixes it.
