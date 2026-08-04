import { PageShell } from "@/components/PageShell";
import { siteConfig } from "@/data/site-config";
import { canonical } from "@/lib/seo";

export const metadata = {
  title: "Disclaimer",
  description:
    "General educational disclaimer for O Level Islamiyat covering academic and religious content accuracy.",
  ...canonical("/disclaimer"),
};

export default function DisclaimerPage() {
  return (
    <PageShell
      title="Disclaimer"
      description="General disclaimer. Last updated 3 August 2026."
      breadcrumbs={[{ label: "Disclaimer", href: "/disclaimer" }]}
    >
      <h2 className="text-xl font-heading font-bold text-primary">Educational purpose only</h2>
      <p>
        The content on {siteConfig.siteName} is provided for general educational purposes to
        support study for the {siteConfig.qualifications.oLevel.name} (
        {siteConfig.qualifications.oLevel.code}) and {siteConfig.qualifications.igcse.name} (
        {siteConfig.qualifications.igcse.code}) examinations. It is intended as a study aid, and is
        not a replacement for a candidate&apos;s registered examination centre, class teacher, or the
        official Cambridge syllabus and specimen assessment materials, which always take precedence.
      </p>

      <h2 className="mt-8 text-xl font-heading font-bold text-primary">No guarantee of examination outcome</h2>
      <p>
        While this site is prepared carefully and with reference to the official syllabus and past
        papers, no guarantee is made or implied about any candidate&apos;s grade, mark, or examination
        result. Examination performance depends on many factors beyond any single study resource,
        including individual preparation, examination technique, and how mark schemes are applied
        by examiners.
      </p>

      <h2 className="mt-8 text-xl font-heading font-bold text-primary">Religious content</h2>
      <p>
        This site presents Islamic religious knowledge — including Qur&apos;anic verses, Hadith, the
        life of Prophet Muhammad (peace be upon him), and the history of the early Muslim community
        — in the specific way required for the Cambridge Islamiyat syllabus. It is written for
        examination preparation and is not a substitute for study with a qualified scholar (alim/
        aalimah) for matters of religious practice, jurisprudence (fiqh), or worship. Readers seeking
        religious rulings or guidance for personal practice should consult a qualified scholar.
      </p>

      <h2 className="mt-8 text-xl font-heading font-bold text-primary">Independent platform</h2>
      <p>{siteConfig.cambridgeDisclaimer}</p>
      <p className="mt-2">
        See the{" "}
        <a className="text-primary underline" href="/cambridge-disclaimer">
          Cambridge Disclaimer
        </a>{" "}
        page for the full explanation.
      </p>

      <h2 className="mt-8 text-xl font-heading font-bold text-primary">External links</h2>
      <p>
        This site links to external resources, including a YouTube channel and other Al-Hayat
        ecosystem pages. We are not responsible for the content or availability of external sites
        once you leave {siteConfig.siteName}.
      </p>

      <h2 className="mt-8 text-xl font-heading font-bold text-primary">Corrections</h2>
      <p>
        If you notice an error of fact, reference, or attribution anywhere on this site, please
        report it to{" "}
        <a className="text-primary underline" href={`mailto:${siteConfig.contact.email}`}>
          {siteConfig.contact.email}
        </a>{" "}
        so it can be corrected.
      </p>
    </PageShell>
  );
}
