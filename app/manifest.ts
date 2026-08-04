import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.siteName} — Cambridge O Level 2058 / IGCSE 0493`,
    short_name: siteConfig.siteName,
    description: siteConfig.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#FAF8F2",
    theme_color: "#123C2C",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
