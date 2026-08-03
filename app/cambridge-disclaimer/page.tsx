import { PageShell } from "@/components/PageShell";
import { siteConfig } from "@/data/site-config";

export const metadata = {
  title: "Cambridge Disclaimer",
  description: "Independence disclaimer regarding Cambridge International Education.",
};

export default function CambridgeDisclaimerPage() {
  return (
    <PageShell
      title="Cambridge Disclaimer"
      description="Independence disclaimer regarding Cambridge International Education."
    >
      <p className="text-lg">{siteConfig.cambridgeDisclaimer}</p>
    </PageShell>
  );
}
