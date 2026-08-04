// Shared SEO helpers. Canonical URLs are built from the single source of truth
// (siteConfig.domain) so every page stays consistent if the domain ever changes.
import { siteConfig } from "@/data/site-config";

/**
 * Returns a Next.js Metadata `alternates` object with an absolute canonical URL
 * for the given site-relative path (must start with "/").
 */
export function canonical(path: string) {
  return {
    alternates: {
      canonical: `${siteConfig.domain}${path}`,
    },
  };
}
