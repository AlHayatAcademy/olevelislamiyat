import Link from "next/link";
import { ChevronRight, MessageSquareQuote, ScrollText, Crown, ListChecks, Download, ClipboardList } from "lucide-react";
import { paper2Sections } from "@/data/syllabus";
import { getTopicsForSection } from "@/data/topics";
import { PaperTabs } from "@/components/PaperTabs";
import { Button } from "@/components/Button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { canonical } from "@/lib/seo";

const sectionIcons = [MessageSquareQuote, ScrollText, Crown, ListChecks];

export const metadata = {
  title: "Islamiyat Paper 2 Notes (Hadith & Caliphs)",
  description:
    "Islamiyat 2058 / 0493 Paper 2 notes: Hadith teachings, their history, the Rightly Guided Caliphs, and the Articles of Faith & Pillars of Islam.",
  ...canonical("/paper-2"),
};

const faqs = [
  {
    q: "How do I compare Abu Bakr, Umar, Uthman and Ali as leaders?",
    a: "The Rightly Guided Caliphs section covers the leadership, achievements and character of each of the four caliphs individually, giving the material needed to build a comparison for exam questions.",
  },
  {
    q: "What is the difference between isnad and matn?",
    a: "Isnad is the chain of narrators through which a Hadith was transmitted; matn is the actual text/content of the Hadith. Both are explained in the History and Importance of the Hadiths section.",
  },
  {
    q: "What are the six authentic books of Hadith?",
    a: "The Sihah Sittah (six authentic books) are covered in the History and Importance of the Hadiths section, alongside the stages of compilation from the Companions to the Tabi'un.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Paper2Page() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Breadcrumbs items={[{ label: "Paper 2", href: "/paper-2" }]} />
      <h1 className="mt-4 text-3xl font-bold font-heading text-text">Paper 2</h1>
      <p className="mt-3 text-text-muted">
        Hadith teachings, their history, the Rightly Guided Caliphs, and the Articles of Faith &amp; Pillars of
        Islam. 1½ hours, 50 marks — answer Question 1, Question 2 and two others. See also{" "}
        <Link href="/past-papers" className="text-primary underline">
          Islamiyat past papers by topic
        </Link>{" "}
        and{" "}
        <Link href="/quotes-references" className="text-primary underline">
          Hadith quotes and references
        </Link>
        .
      </p>

      <div className="mt-6">
        <PaperTabs />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {paper2Sections.map((section, i) => {
          const topicCount = getTopicsForSection(2, section.slug).length;
          const Icon = sectionIcons[i % sectionIcons.length];
          return (
            <Link
              key={section.slug}
              href={`/paper-2/${section.slug}`}
              className="block rounded-xl border border-border bg-surface p-5 transition-colors hover:border-primary hover:bg-surface-soft"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon aria-hidden="true" size={22} />
                </span>
                <ChevronRight size={20} className="mt-2 shrink-0 text-primary" aria-hidden="true" />
              </div>
              <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-secondary">
                Section {section.number} &middot; {section.marks} marks
              </p>
              <h2 className="mt-1 text-xl font-semibold font-heading text-text">{section.title}</h2>
              <p className="mt-2 text-sm text-text-muted">{section.description}</p>
              <p className="mt-2 text-xs text-text-muted">
                {topicCount > 0
                  ? `${topicCount} lesson${topicCount === 1 ? "" : "s"} available`
                  : "Lessons coming soon"}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/syllabus" variant="outline" icon={Download} iconPosition="left">
          View Full Syllabus
        </Button>
        <Button href="/exam-pattern" variant="ghost" icon={ClipboardList} iconPosition="left">
          View Exam Pattern
        </Button>
      </div>

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
