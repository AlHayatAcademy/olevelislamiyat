import { PageShell } from "@/components/PageShell";
import { siteConfig } from "@/data/site-config";
import { canonical } from "@/lib/seo";

export const metadata = {
  title: "Copyright Policy",
  description:
    "Copyright and content-licence policy for O Level Islamiyat's original lessons, model answers, quizzes and revision notes.",
  ...canonical("/copyright"),
};

export default function CopyrightPage() {
  return (
    <PageShell
      title="Copyright Policy"
      description="Copyright notice and content-licence terms. Last updated 3 August 2026."
      breadcrumbs={[{ label: "Copyright Policy", href: "/copyright" }]}
    >
      <p className="rounded-lg border border-border bg-surface-soft p-4 text-sm font-semibold text-text">
        © 2026 {siteConfig.institution.legalName}. All rights reserved.
      </p>

      <h2 className="mt-8 text-xl font-heading font-bold text-primary">Cambridge materials</h2>
      <p>
        Original Cambridge syllabus, past paper, mark scheme, and examiner report documents remain
        the copyright of Cambridge University Press &amp; Assessment and are not reproduced or
        rehosted on this site. Where this site refers to past paper questions or syllabus content,
        it does so in the form of original explanatory notes, references, and model answers written
        independently for study purposes.
      </p>

      <h2 className="mt-8 text-xl font-heading font-bold text-primary">Site-authored content</h2>
      <p>
        All original content on this site — including but not limited to lesson notes, model
        answers, quizzes, mind maps, revision notes, quotations and reference compilations, diagrams,
        and teacher resources — is the intellectual property of {siteConfig.institution.legalName}
        unless otherwise credited.
      </p>
      <p className="mt-3">This original content may not, without prior written permission:</p>
      <ul className="mt-2 list-disc list-inside space-y-1">
        <li>be copied, reproduced, or stored in another system in whole or substantial part;</li>
        <li>be sold, rented, or otherwise commercially exploited;</li>
        <li>be redistributed or republished on another website, app, or platform;</li>
        <li>be used to train, fine-tune, or evaluate machine learning or AI systems in bulk.</li>
      </ul>

      <h2 className="mt-8 text-xl font-heading font-bold text-primary">Permitted personal and classroom use</h2>
      <p>
        Students and teachers are welcome to read this site, print individual pages for their own
        personal study or classroom teaching, and share direct links to pages on this site. This
        permission does not extend to bulk copying, republishing, or commercial use.
      </p>

      <h2 className="mt-8 text-xl font-heading font-bold text-primary">Quranic and Hadith text</h2>
      <p>
        Qur&apos;anic verses and Hadith texts quoted on this site are religious primary sources and
        are not owned by any party; the specific translations, arrangement, cross-references, and
        surrounding commentary used on this site remain original site content as described above.
      </p>

      <h2 className="mt-8 text-xl font-heading font-bold text-primary">Requesting permission</h2>
      <p>
        To request permission to use site content beyond personal or classroom use, contact{" "}
        <a className="text-primary underline" href={`mailto:${siteConfig.contact.email}`}>
          {siteConfig.contact.email}
        </a>
        .
      </p>

      <h2 className="mt-8 text-xl font-heading font-bold text-primary">Reporting infringement</h2>
      <p>
        If you believe content on this site infringes your copyright, please contact us at the
        address above with details of the material and your claim, and it will be reviewed promptly.
      </p>
    </PageShell>
  );
}
