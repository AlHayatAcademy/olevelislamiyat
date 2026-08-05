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

/**
 * FAQPage JSON-LD from a list of { q, a } pairs. Used by every page that renders an
 * on-page FAQ section, so the schema always matches what's visibly on the page.
 */
export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/**
 * Article JSON-LD for a single lesson/topic page. `path` is site-relative (must start
 * with "/") and is resolved against siteConfig.domain, matching `canonical()` above.
 */
export function articleSchema(opts: { headline: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    url: `${siteConfig.domain}${opts.path}`,
    author: { "@type": "Organization", name: siteConfig.institution.name },
    publisher: { "@type": "Organization", name: siteConfig.institution.name },
    about: "Cambridge O Level Islamiyat 2058 / IGCSE Islamiyat 0493",
  };
}
