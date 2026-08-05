# Deploying to Cloudflare

This app is built with Next.js 15 (App Router) and includes a dynamic API
route (`app/api/contact/route.ts`) plus on-demand image generation
(`app/opengraph-image.tsx`, `app/twitter-image.tsx`, `app/icon.tsx`,
`app/apple-icon.tsx`). Because of this it is **not** a static export — it is
deployed to Cloudflare as a Worker using the
[`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare) adapter, which
runs the full Next.js server (API routes, dynamic image generation, and all
statically-generated pages) on Cloudflare's edge network, on the free tier.

Project name: `olevelislamiyat`
Target domain: `olevelislamiyat.drimranhayat.com`
Repository: `AlHayatAcademy/olevelislamiyat`, branch `main`

## 1. Local installation

```bash
npm install
```

## 2. Local development

```bash
npm run dev
```

Opens the site at `http://localhost:3000` using the normal Next.js dev
server (fast refresh, no Cloudflare-specific behaviour needed for day-to-day
editing).

## 3. Local production build verification

Two builds should both succeed before pushing:

```bash
npm run build          # standard Next.js build — sanity check
npm run pages:build    # Cloudflare-specific build (via @opennextjs/cloudflare)
```

`npm run pages:build` produces a `.open-next/` directory containing the
Cloudflare Worker bundle (`.open-next/worker.js`) and static assets
(`.open-next/assets/`). This directory is gitignored — it's a build output,
not something to commit.

To preview the Cloudflare build locally before deploying:

```bash
npm run preview
```

## 4. Connect the GitHub repo to Cloudflare Pages/Workers

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Go to **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Select the `AlHayatAcademy/olevelislamiyat` repository and the `main`
   branch.
4. Cloudflare will detect it as a Next.js project. Set the build
   configuration exactly as follows:
   - **Build command**: `npm run pages:build`
   - **Build output directory**: `.open-next/assets`
   - **Root directory**: `/` (repo root)
5. **Environment variables**: none are required for the app to build or run
   at this stage. If Cloudflare's build environment needs a specific Node
   version, add `NODE_VERSION` = `20` (or later) under
   **Settings → Environment variables** — this project was built and tested
   with the adapter's current recommended Node 20+ baseline.
6. Click **Save and Deploy**. The first deploy will run the build and
   publish the Worker.

> Note: `wrangler.jsonc` in the repo root already configures the Worker name
> (`olevelislamiyat`), the asset directory, and the `nodejs_compat`
> compatibility flag the adapter requires — Cloudflare Pages will pick this
> up automatically as part of the build.

## 5. Custom domain

1. In the Cloudflare dashboard, open the `olevelislamiyat` Pages/Workers
   project → **Custom domains** → **Add a custom domain**.
2. Enter `olevelislamiyat.drimranhayat.com`.
3. If `drimranhayat.com`'s DNS is already managed on this same Cloudflare
   account, Cloudflare can add the required record automatically. If the
   domain's DNS is hosted elsewhere, you'll need to add a `CNAME` record for
   `olevelislamiyat` pointing at the target Cloudflare Pages/Workers hostname
   shown on that screen — this is a manual step in whichever DNS provider
   currently manages `drimranhayat.com`, outside of this repository.

## 6. Preview deployments

Once the repo is connected, every push to a branch other than `main` (and
every pull request) automatically gets its own preview URL under
`*.olevelislamiyat.pages.dev`, without affecting the production deployment
on `main`. This is useful for reviewing content changes before merging.

## 7. Enabling Cloudflare Web Analytics (later)

Analytics is intentionally **not** wired in yet (per the project's privacy
approach — no tracking by default, no Google Analytics). To enable it later:

1. Cloudflare dashboard → **Analytics & Logs** → **Web Analytics** → **Add
   a site** → enter `olevelislamiyat.drimranhayat.com`.
2. Cloudflare will generate a small `<script>` snippet with a site token.
3. Add that snippet to `app/layout.tsx`, near the closing `</body>` tag —
   this is the one place all pages share a single root layout.
4. Do not hardcode a token into the repo ahead of time; add it only once
   analytics is actually being turned on, since the token identifies this
   specific site to Cloudflare.

## 8. Troubleshooting

- **Build fails with a Node version error**: set `NODE_VERSION` in the
  Cloudflare Pages project's environment variables to `20` or higher, and
  confirm your local `node -v` matches at least that version before
  debugging further.
- **Build fails with an `@opennextjs/cloudflare` or `wrangler` version
  mismatch**: the versions pinned in `package.json`
  (`@opennextjs/cloudflare` `^1.20.2`, `wrangler` `^4.118.0`) were the ones
  verified to build cleanly at the time this was set up. If Cloudflare's
  build environment installs a newer major version and something breaks,
  pin the exact working versions in `package.json` (remove the `^`) rather
  than debugging against a moving target.
- **API route (`/api/contact`) doesn't respond in production**: confirm the
  deploy actually used `npm run pages:build` (not `npm run build` alone) —
  a plain Next.js static build output does not include the Worker that
  serves dynamic routes.
- **Local preview needs Cloudflare bindings**: this project doesn't use any
  Cloudflare bindings (KV, D1, R2, etc.) yet, so `wrangler.jsonc` only
  configures the Worker name, assets, and a self-reference service binding
  used for caching by the adapter — no additional setup is needed for the
  current feature set.

## What's still pending

- Cloudflare Web Analytics is off by default (see step 7 above).
- No Cloudflare bindings (KV/D1/R2) are configured yet — the architecture
  notes elsewhere in `docs/` describe where these would plug in for future
  features (student accounts, progress tracking, etc.), but none are wired
  up for this initial deployment.
