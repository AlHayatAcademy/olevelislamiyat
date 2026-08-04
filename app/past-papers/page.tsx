import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { pastPaperQuestions, availableYears } from "@/data/questions";
import { paper1Sections, paper2Sections } from "@/data/syllabus";
import { canonical } from "@/lib/seo";

export const metadata = {
  title: "Islamiyat Past Papers (Topical & Yearly)",
  description: "Cambridge O Level Islamiyat 2058 / IGCSE 0493 past exam sessions, organised by paper, year and topic.",
  ...canonical("/past-papers"),
};

const faqs = [
  {
    q: "Where can I get Islamiyat past papers organised by topic?",
    a: "Use the \"Browse by topic\" index below, or visit Model Answers for full AO1/AO2 answer guidance on individual past-paper questions.",
  },
  {
    q: "Are past papers enough to prepare for Islamiyat?",
    a: "Past papers are essential practice, but pairing them with the topic notes on Paper 1 and Paper 2 and the AO1/AO2 exam technique guide gives a fuller picture of what examiners expect.",
  },
  {
    q: "What years of past papers are covered here?",
    a: "Sessions on file span May/June and Oct/Nov, 2021–2025 (10 sessions, 40 question papers, 40 mark schemes), indexed by year and by syllabus topic.",
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

export default function PastPapersPage() {
  const allSections = [...paper1Sections, ...paper2Sections];

  return (
    <PageShell
      title="Past Papers"
      description="Cambridge O Level Islamiyat 2058 past exam sessions, organised by paper and topic."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <p>
        Sessions on file: May/June and Oct/Nov, 2021–2025 (10 sessions, 40 question papers, 40 mark
        schemes). Below is a growing, hand-curated index of {pastPaperQuestions.length} questions,
        each rewritten in original wording (never a verbatim transcription of the official paper)
        and tagged to its syllabus section.
      </p>
      <p className="text-sm text-text-muted">
        In line with copyright policy, original question paper and mark scheme PDFs are not
        rehosted here.
      </p>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Browse by year</h2>
        <div className="flex flex-wrap gap-2">
          {availableYears.map((year) => (
            <Link
              key={year}
              href={`/past-papers/year-wise/${year}`}
              className="rounded-md border border-primary/30 px-4 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-white transition-colors"
            >
              {year}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Browse by topic</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {allSections.map((section) => (
            <Link
              key={section.slug}
              href={`/past-papers/topical/${section.slug}`}
              className="rounded-md border border-surface-soft px-4 py-3 text-sm hover:border-primary transition-colors"
            >
              <span className="font-medium">
                Paper {section.paper} · {section.title}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <p className="mt-8 text-sm">
        See{" "}
        <Link href="/model-answers" className="text-primary underline">
          model answers with AO1/AO2 mark-scheme guidance
        </Link>{" "}
        for detailed answer structure on individual questions.
      </p>

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
    </PageShell>
  );
}
