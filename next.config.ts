import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;

// Enable the Cloudflare context (`getCloudflareContext`) in `next dev`.
// Only active during local development; no-op in production builds.
// See https://opennext.js.org/cloudflare/get-started
initOpenNextCloudflareForDev();
