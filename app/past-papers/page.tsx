import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PastPapersYearList, type YearStat } from "@/components/PastPapersYearList";
import { pastPaperQuestions, availableYears, getQuestionsByYear } from "@/data/questions";
import { paper1Sections, paper2Sections } from "@/data/syllabus";
import { siteConfig } from "@/data/site-config";
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

  const yearStats: YearStat[] = availableYears.map((year) => {
    const questions = getQuestionsByYear(year);
    return {
      year,
      sessions: Array.from(new Set(questions.map((q) => q.session))),
      papers: Array.from(new Set(questions.map((q) => q.paper))).sort((a, b) => a - b),
      questionCount: questions.length,
    };
  });

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

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <h2 className="text-xl font-semibold mb-3">Browse by year</h2>
          <PastPapersYearList years={yearStats} />

          <div id="browse-by-topic" className="mt-10 scroll-mt-24">
            <h2 className="text-xl font-semibold mb-3">Browse by topic</h2>
            <p className="mb-4 text-sm text-text-muted">
              Each syllabus section below opens onto its own subtopics (real lesson pages), with a
              question count next to each — drill down to see only the past-paper questions that
              test that specific subtopic. Questions too broad for one subtopic are grouped under a
              &ldquo;General / Whole-Section Questions&rdquo; bucket instead of being hidden.
            </p>
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
        </div>

        <aside className="space-y-6">
          <div className="rounded-xl border border-border bg-surface p-5 shadow-soft">
            <h3 className="font-heading font-semibold text-text">Quick Links</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/model-answers" className="text-primary hover:underline">
                  Model Answers
                </Link>
              </li>
              <li>
                <Link href="/quotes-references" className="text-primary hover:underline">
                  Quotes &amp; References
                </Link>
              </li>
              <li>
                <Link href="/revision" className="text-primary hover:underline">
                  Revision Centre
                </Link>
              </li>
              <li>
                <Link href="/quizzes" className="text-primary hover:underline">
                  Quizzes
                </Link>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-surface-soft p-5">
            <h3 className="font-heading font-semibold text-text">Need Help?</h3>
            <p className="mt-2 text-sm text-text-muted">
              Can&apos;t find a past-paper question or session? Reach out directly.
            </p>
            <div className="mt-4 space-y-2 text-sm">
              <a
                href={siteConfig.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-medium text-primary hover:underline"
              >
                <MessageCircle aria-hidden="true" size={16} />
                Chat on WhatsApp
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-2 font-medium text-primary hover:underline"
              >
                <Mail aria-hidden="true" size={16} />
                {siteConfig.contact.email}
              </a>
            </div>
          </div>
        </aside>
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
    </PageShell>
  );
}
