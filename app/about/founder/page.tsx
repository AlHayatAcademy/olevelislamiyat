import { PageShell } from "@/components/PageShell";
import { siteConfig } from "@/data/site-config";

export const metadata = {
  title: "About the Founder",
  description: "About Dr Imran Hayat, founder of Al-Hayat Research Institute of Social Sciences.",
};

export default function FounderPage() {
  return (
    <PageShell
      title="About the Founder"
      description="About Dr Imran Hayat, founder of Al-Hayat Research Institute of Social Sciences."
    >
      <p>{siteConfig.founderBio}</p>
    </PageShell>
  );
}
