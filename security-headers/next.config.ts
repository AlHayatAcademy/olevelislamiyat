import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// The site has no third-party scripts, no analytics, no iframes, no remote images, and no
// external font/style CDNs (fonts are self-hosted via next/font). script-src/style-src keep
// 'unsafe-inline' because Next.js's own hydration payload and the site's JSON-LD <script>
// blocks and one dynamic-width inline style (quiz progress bar) rely on it; tightening further
// to a nonce-based policy would require middleware and is left as a follow-up.
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

// Enable the Cloudflare context (`getCloudflareContext`) in `next dev`.
// Only active during local development; no-op in production builds.
// See https://opennext.js.org/cloudflare/get-started
initOpenNextCloudflareForDev();
