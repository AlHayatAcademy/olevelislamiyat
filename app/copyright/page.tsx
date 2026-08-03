import { PageShell } from "@/components/PageShell";
import { siteConfig } from "@/data/site-config";

export const metadata = {
  title: "Copyright Policy",
  description: "Copyright policy for O Level Islamiyat content.",
};

export default function CopyrightPage() {
  return (
    <PageShell
      title="Copyright Policy"
      description="Copyright policy for O Level Islamiyat content."
    >
      <p>
        Original Cambridge syllabus, past paper and mark scheme documents remain the copyright of
        Cambridge University Press &amp; Assessment and are not reproduced or rehosted on this site.
        Site-authored explanatory content is the property of {siteConfig.institution.legalName}{" "}
        unless otherwise credited.
      </p>
    </PageShell>
  );
}
