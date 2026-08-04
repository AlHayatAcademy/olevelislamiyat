import { PageShell } from "@/components/PageShell";
import { siteConfig } from "@/data/site-config";
import { canonical } from "@/lib/seo";

export const metadata = {
  title: "Cambridge Disclaimer",
  description:
    "O Level Islamiyat is an independent educational platform, not affiliated with or endorsed by Cambridge International Education.",
  ...canonical("/cambridge-disclaimer"),
};

export default function CambridgeDisclaimerPage() {
  return (
    <PageShell
      title="Cambridge Disclaimer"
      description="Independence disclaimer. Last updated 3 August 2026."
      breadcrumbs={[{ label: "Cambridge Disclaimer", href: "/cambridge-disclaimer" }]}
    >
      <p className="rounded-lg border border-secondary/40 bg-surface-soft p-4 text-lg font-semibold text-text">
        {siteConfig.cambridgeDisclaimer}
      </p>

      <h2 className="mt-8 text-xl font-heading font-bold text-primary">What this means</h2>
      <p>
        &quot;Cambridge&quot;, &quot;Cambridge International Education&quot;, &quot;Cambridge
        Assessment International Education&quot;, and the syllabus codes{" "}
        {siteConfig.qualifications.oLevel.code} ({siteConfig.qualifications.oLevel.name}) and{" "}
        {siteConfig.qualifications.igcse.code} ({siteConfig.qualifications.igcse.name}) refer to
        qualifications and an examination board operated by Cambridge University Press &amp;
        Assessment, part of the University of Cambridge. {siteConfig.siteName} is an independent
        study resource built to support candidates preparing for those examinations. It is not
        produced by, reviewed by, licensed by, or affiliated in any way with Cambridge University
        Press &amp; Assessment.
      </p>

      <h2 className="mt-8 text-xl font-heading font-bold text-primary">Why we say this clearly</h2>
      <p>
        Because this site closely follows the structure and content of the official Cambridge
        syllabus — as any serious exam-preparation resource must — it is important that students,
        parents, and teachers understand that following the syllabus is not the same as being part
        of Cambridge. This site references the publicly available syllabus, past papers, mark
        schemes, and examiner reports published by Cambridge, and builds original explanatory notes,
        model answers, and revision material around them. It does not reproduce or rehost copyrighted
        Cambridge documents themselves — see the{" "}
        <a className="text-primary underline" href="/copyright">
          Copyright Policy
        </a>
        .
      </p>

      <h2 className="mt-8 text-xl font-heading font-bold text-primary">Always verify against the official syllabus</h2>
      <p>
        Cambridge syllabus content, assessment objectives, and past paper requirements are reviewed
        and can change between examination series. Candidates and teachers should always check the
        current, official syllabus document for their examination series as the authoritative
        source, and treat this site as a supporting study aid rather than a replacement for it.
      </p>

      <h2 className="mt-8 text-xl font-heading font-bold text-primary">Who runs this site</h2>
      <p>
        {siteConfig.siteName} is a project of {siteConfig.institution.educationDivision}, the
        education division of {siteConfig.institution.legalName}, an independent research and
        educational institute based in {siteConfig.institution.location}. It is not a Cambridge
        examination centre, and cannot register candidates for examinations or issue Cambridge
        qualifications.
      </p>
    </PageShell>
  );
}
