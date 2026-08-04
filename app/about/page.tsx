import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { siteConfig } from "@/data/site-config";
import { canonical } from "@/lib/seo";

export const metadata = {
  title: "About",
  description:
    "About O Level Islamiyat: an independent study platform for Cambridge O Level 2058 / IGCSE 0493 Islamiyat, built by Al-Hayat Academy.",
  ...canonical("/about"),
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Breadcrumbs items={[{ label: "About", href: "/about" }]} />
      <h1 className="mt-4 text-3xl font-bold font-heading text-text">About {siteConfig.siteName}</h1>
      <p className="mt-3 text-lg text-text-muted">{siteConfig.tagline}</p>

      <div className="mt-8 space-y-6">
        <section>
          <h2 className="text-xl font-heading font-bold text-primary">What this site is</h2>
          <p className="mt-3">
            {siteConfig.siteName} is a free, independent study platform built specifically for
            candidates of the {siteConfig.qualifications.oLevel.name} (
            {siteConfig.qualifications.oLevel.code}) and {siteConfig.qualifications.igcse.name} (
            {siteConfig.qualifications.igcse.code}) examinations. Every section of the site — notes,
            model answers, past-paper coverage, quotations and references, revision tools and
            quizzes — is organised around the actual structure of the Cambridge syllabus, so that
            study time maps directly onto what is examined.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-heading font-bold text-primary">Our approach</h2>
          <p className="mt-3">
            Islamiyat papers reward candidates who can combine accurate knowledge (Qur&apos;anic
            verses, Hadith, historical detail — Assessment Objective 1) with the ability to explain,
            apply and evaluate that knowledge in relation to the question asked (Assessment Objective
            2). Content on this site is written to keep that distinction visible throughout — clearly
            separating what to know from how to use it in an answer — rather than presenting
            Islamiyat as a subject of memorisation alone.
          </p>
          <p className="mt-3">
            Wherever this site references past papers, mark schemes, or examiner reports, it does so
            to explain patterns in what is actually asked and rewarded, not to reproduce copyrighted
            Cambridge material — see the{" "}
            <Link href="/copyright" className="text-primary underline">
              Copyright Policy
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-heading font-bold text-primary">Who is behind it</h2>
          <p className="mt-3">
            {siteConfig.siteName} is a project of {siteConfig.institution.educationDivision}, the
            education division of {siteConfig.institution.name}, based in{" "}
            {siteConfig.institution.location}. Read more about{" "}
            <Link href="/about/founder" className="text-primary underline">
              the founder
            </Link>{" "}
            and{" "}
            <Link href="/about/institute" className="text-primary underline">
              the institute
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-heading font-bold text-primary">Independence</h2>
          <p className="mt-3">
            {siteConfig.cambridgeDisclaimer} See the{" "}
            <Link href="/cambridge-disclaimer" className="text-primary underline">
              Cambridge Disclaimer
            </Link>{" "}
            page for the full explanation.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-heading font-bold text-primary">Get in touch</h2>
          <p className="mt-3">
            Questions, corrections, or interest in online classes? Visit the{" "}
            <Link href="/contact" className="text-primary underline">
              Contact
            </Link>{" "}
            page.
          </p>
        </section>
      </div>
    </div>
  );
}
