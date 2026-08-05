// open-next.config.ts created for the @opennextjs/cloudflare adapter.
//
// This site has no ISR/data revalidation needs beyond Next.js's built-in
// static generation — almost every route is prerendered at build time via
// `generateStaticParams`/static `metadata`. With no `incrementalCache`
// override, `defineCloudflareConfig()` defaults to the "dummy" (no-op)
// cache, which means every request — even for a fully static, prerendered
// page — pays the full cost of re-running Next.js's server-side rendering
// pipeline inside the Worker, with the result thrown away immediately
// afterwards. On Cloudflare's free Workers plan (tight per-request CPU
// limit) that per-request re-render was enough to trip a
// "Worker exceeded resource limits" (Error 1102) on heavier pages such as
// `/syllabus`.
//
// We don't need (or want) a persistent/revalidating cache — nothing here
// uses ISR — so we point the incremental cache at the adapter's
// static-assets-backed cache. It serves prerendered output straight from
// the Worker's own `ASSETS` binding (already configured in wrangler.jsonc)
// with no re-render and no extra Cloudflare bindings (KV/R2/D1) required.
// See https://opennext.js.org/cloudflare/caching
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
