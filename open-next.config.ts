// open-next.config.ts created for the @opennextjs/cloudflare adapter.
// This site has no ISR/data revalidation needs beyond Next.js's built-in
// static generation, so we use the adapter's default (in-memory) caches
// rather than wiring up an R2 bucket. See https://opennext.js.org/cloudflare/caching
// if page-level revalidation is ever added and a persistent cache is needed.
import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig();
