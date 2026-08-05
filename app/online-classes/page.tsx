import Link from "next/link";
import { MessageCircle, Mail, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/Button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { siteConfig } from "@/data/site-config";
import { canonical, faqSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

export const metadata = {
  title: "Online Classes",
  description:
    "Online classes and academic support for Cambridge O Level Islamiyat 2058 and IGCSE Islamiyat 0493, taught through Al-Hayat Academy.",
  ...canonical("/online-classes"),
};

const learningOutcomes = [
  "Work through every syllabus section for Paper 1 and Paper 2 in an examination-focused sequence.",
  "Build the Qur'anic, Hadith and historical knowledge (AO1) required for the syllabus, with correct references.",
  "Practise the application and evaluation skills (AO2) examiners look for, using real past-paper style questions.",
  "Learn how mark schemes are structured and how to write answers that meet the assessment objectives.",
  "Get individual feedback on written answers and exam technique.",
];

const approach = [
  "Teaching follows the official Cambridge syllabus structure section by section, cross-referenced against past papers and examiner reports.",
  "Every topic separates AO1 knowledge from AO2 application/evaluation, matching how the papers are actually marked.",
  "Lessons draw on the same notes, model answers and quotations bank published on this site, so classes and self-study reinforce each other.",
];

const faqs = [
  {
    q: "Who teaches the classes?",
    a: "Classes are led within Al-Hayat Academy, the education division of Al-Hayat Research Institute of Social Sciences, founded by Dr Imran Hayat.",
  },
  {
    q: "What is the schedule and fee?",
    a: "Schedules and fees vary by group and term. Please contact us directly by WhatsApp or email for the current schedule and fees — we do not publish fixed figures here as they change.",
  },
  {
    q: "Is this affiliated with Cambridge?",
    a: "No. This is an independent teaching service preparing candidates for Cambridge examinations; it is not affiliated with or endorsed by Cambridge International Education.",
  },
  {
    q: "Do you teach both Paper 1 and Paper 2?",
    a: "Yes — classes can cover both papers, or focus on specific sections a student needs the most support with.",
  },
];


export default function OnlineClassesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <JsonLd data={faqSchema(faqs)} />
      <Breadcrumbs items={[{ label: "Online Classes", href: "/online-classes" }]} />
      <h1 className="text-3xl font-bold font-heading text-text">Online Classes</h1>
      <p className="mt-3 text-text-muted">
        Structured online classes for {siteConfig.qualifications.oLevel.name} (
        {siteConfig.qualifications.oLevel.code}) and {siteConfig.qualifications.igcse.name} (
        {siteConfig.qualifications.igcse.code}), taught through{" "}
        {siteConfig.institution.educationDivision}, the education division of{" "}
        {siteConfig.institution.name}.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button href={siteConfig.contact.whatsapp} variant="whatsapp" icon={MessageCircle} external>
          Enquire on WhatsApp
        </Button>
        <Button href={`mailto:${siteConfig.contact.email}`} variant="outline" icon={Mail}>
          Email an enquiry
        </Button>
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-heading font-bold text-primary">What you will learn</h2>
        <ul className="mt-4 space-y-3">
          {learningOutcomes.map((o) => (
            <li key={o} className="flex items-start gap-3 text-text-muted">
              <CheckCircle2
                aria-hidden="true"
                size={18}
                className="mt-0.5 shrink-0 text-secondary"
              />
              <span>{o}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-heading font-bold text-primary">Our teaching approach</h2>
        <ul className="mt-4 list-disc list-inside space-y-2 text-text-muted">
          {approach.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </section>

      <section className="mt-12 rounded-xl border border-border bg-surface-soft p-6">
        <h2 className="text-xl font-heading font-bold text-primary">Schedule and fees</h2>
        <p className="mt-3 text-text-muted">
          Class schedules and fees are arranged individually and can change by term and group size.
          Please contact us for the current schedule and fees — see the buttons above.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-heading font-bold text-primary">
          Led by {siteConfig.institution.founder}
        </h2>
        <p className="mt-3 text-text-muted">{siteConfig.founderBio}</p>
        <Link
          href="/about/founder"
          className="mt-3 inline-block text-sm font-semibold text-primary underline"
        >
          Read the full founder profile
        </Link>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-heading font-bold text-primary">Frequently asked questions</h2>
        <div className="mt-4 space-y-4">
          {faqs.map((f) => (
            <div key={f.q} className="rounded-xl border border-border bg-surface p-5">
              <h3 className="font-heading font-semibold text-text">{f.q}</h3>
              <p className="mt-2 text-sm text-text-muted">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
