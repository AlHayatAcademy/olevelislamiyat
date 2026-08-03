import { siteConfig } from "@/data/site-config";

export function AnnouncementBar() {
  return (
    <div className="bg-primary-dark text-white text-sm text-center py-2 px-4">
      <p>
        {siteConfig.qualifications.oLevel.name} ({siteConfig.qualifications.oLevel.code}) &amp;{" "}
        {siteConfig.qualifications.igcse.name} ({siteConfig.qualifications.igcse.code}) —{" "}
        {siteConfig.tagline}
      </p>
    </div>
  );
}
