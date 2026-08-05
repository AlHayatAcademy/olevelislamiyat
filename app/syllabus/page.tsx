import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { canonical, faqSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

export const metadata = {
  title: "Islamiyat 2058 / 0493 Syllabus",
  description:
    "Full breakdown of the Cambridge O Level Islamiyat (2058) and IGCSE Islamiyat (0493) syllabus content, Paper 1 and Paper 2.",
  ...canonical("/syllabus"),
};

const faqs = [
  {
    q: "What topics are in O Level Islamiyat Paper 1?",
    a: "Paper 1 covers major themes of the Qur'an, the history and importance of the Qur'an, the life and importance of the Prophet Muhammad (pbuh), and the first Islamic community.",
  },
  {
    q: "What topics are in O Level Islamiyat Paper 2?",
    a: "Paper 2 covers major teachings in the Hadiths of the Prophet, the history and importance of the Hadiths, the Rightly Guided Caliphs and their importance as leaders, and the Articles of Faith and the Pillars of Islam.",
  },
  {
    q: "How many marks is each paper worth?",
    a: "Each paper is 1½ hours long and worth 50 marks, with five questions of which candidates must answer Question 1, Question 2 and two others.",
  },
];


export default function SyllabusPage() {
  return (
    <PageShell
      title="Syllabus"
      description="Full breakdown of the Cambridge O Level Islamiyat (2058) and IGCSE Islamiyat (0493) syllabus content."
      breadcrumbs={[{ label: "Syllabus", href: "/syllabus" }]}
    >
      <JsonLd data={faqSchema(faqs)} />
      <p>
        Both papers are answered in English. Each paper is 1½ hours long and worth 50 marks, with
        five questions of which candidates must answer Question 1, Question 2 and two others.
      </p>
      <h2 className="text-xl font-heading font-bold mt-6">Paper 1</h2>
      <ol className="list-decimal list-inside space-y-1">
        <li>
          <Link href="/paper-1" className="text-primary underline">
            Major themes of the Qur&apos;an
          </Link>
        </li>
        <li>The history and importance of the Qur&apos;an</li>
        <li>The life and importance of the Prophet Muhammad (pbuh)</li>
        <li>The first Islamic community</li>
      </ol>
      <h2 className="text-xl font-heading font-bold mt-6">Paper 2</h2>
      <ol className="list-decimal list-inside space-y-1">
        <li>
          <Link href="/paper-2" className="text-primary underline">
            Major teachings in the Hadiths of the Prophet
          </Link>
        </li>
        <li>The history and importance of the Hadiths</li>
        <li>The period of rule of the Rightly Guided Caliphs and their importance as leaders</li>
        <li>The Articles of Faith and the Pillars of Islam</li>
      </ol>
      <p className="text-sm text-text-muted mt-6">
        [Detailed topic-by-topic content pending full source verification — see
        docs/syllabus-coverage-audit.md]
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
