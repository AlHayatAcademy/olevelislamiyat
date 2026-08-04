import { PageShell } from "@/components/PageShell";
import { siteConfig } from "@/data/site-config";
import { canonical } from "@/lib/seo";

export const metadata = {
  title: "Terms of Use",
  description:
    "Terms governing use of the O Level Islamiyat website, a free study resource for Cambridge O Level 2058 / IGCSE 0493.",
  ...canonical("/terms"),
};

export default function TermsPage() {
  return (
    <PageShell
      title="Terms of Use"
      description="Terms governing use of this website. Last updated 3 August 2026."
      breadcrumbs={[{ label: "Terms of Use", href: "/terms" }]}
    >
      <p>
        These terms govern your use of {siteConfig.siteName} ({siteConfig.domain}), published by{" "}
        {siteConfig.institution.legalName}. By using this site, you agree to these terms.
      </p>

      <h2 className="mt-8 text-xl font-heading font-bold text-primary">Purpose of this site</h2>
      <p>
        This site is a free educational resource offering original notes, model answers, revision
        material, quizzes, and reference guides for students and teachers preparing for the{" "}
        {siteConfig.qualifications.oLevel.name} ({siteConfig.qualifications.oLevel.code}) and{" "}
        {siteConfig.qualifications.igcse.name} ({siteConfig.qualifications.igcse.code})
        examinations. It is study support, not a substitute for a registered examination centre,
        a qualified teacher, or the official Cambridge syllabus documents.
      </p>

      <h2 className="mt-8 text-xl font-heading font-bold text-primary">Acceptable use</h2>
      <ul className="list-disc list-inside space-y-1">
        <li>You may read, browse, and use this site&apos;s content for your own personal study or classroom teaching.</li>
        <li>You may not scrape, mirror, or republish substantial parts of this site&apos;s original content elsewhere without permission — see the <a className="text-primary underline" href="/copyright">Copyright Policy</a>.</li>
        <li>You may not attempt to disrupt, overload, or gain unauthorised access to this site or its infrastructure.</li>
        <li>You may not use this site to distribute malware, spam, or unlawful content.</li>
      </ul>

      <h2 className="mt-8 text-xl font-heading font-bold text-primary">Accuracy of content</h2>
      <p>
        Every reasonable effort is made to keep syllabus references, past paper details, and
        explanatory content accurate and up to date. Cambridge syllabus and assessment documents
        change from time to time; always cross-check current requirements against the official
        Cambridge syllabus for your examination series. See also the{" "}
        <a className="text-primary underline" href="/disclaimer">
          Disclaimer
        </a>{" "}
        and{" "}
        <a className="text-primary underline" href="/cambridge-disclaimer">
          Cambridge Disclaimer
        </a>
        .
      </p>

      <h2 className="mt-8 text-xl font-heading font-bold text-primary">No accounts, no warranty of availability</h2>
      <p>
        This site currently requires no account or payment to access its content. It is provided
        &quot;as is&quot;, without warranty of uninterrupted availability. Features may be added,
        changed, or temporarily unavailable as the site develops.
      </p>

      <h2 className="mt-8 text-xl font-heading font-bold text-primary">Online classes and enquiries</h2>
      <p>
        Where this site describes online classes or teaching support offered through{" "}
        {siteConfig.institution.educationDivision}, any such arrangement is a separate agreement
        made directly between you and {siteConfig.institution.name}, and is not formed simply by
        browsing this website.
      </p>

      <h2 className="mt-8 text-xl font-heading font-bold text-primary">Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, {siteConfig.institution.legalName} is not liable for
        any loss or damage arising from your use of, or inability to use, this site, including
        reliance on its content for examination preparation. Examination outcomes depend on many
        factors beyond the content of any study website.
      </p>

      <h2 className="mt-8 text-xl font-heading font-bold text-primary">Changes to these terms</h2>
      <p>
        These terms may be updated as the site develops. Continued use of the site after changes
        are published constitutes acceptance of the revised terms.
      </p>

      <h2 className="mt-8 text-xl font-heading font-bold text-primary">Contact</h2>
      <p>
        Questions about these terms can be sent to{" "}
        <a className="text-primary underline" href={`mailto:${siteConfig.contact.email}`}>
          {siteConfig.contact.email}
        </a>
        .
      </p>
    </PageShell>
  );
}
