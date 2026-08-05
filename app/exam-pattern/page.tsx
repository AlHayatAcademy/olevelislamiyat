import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { canonical, faqSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

export const metadata = {
  title: "Islamiyat 2058 / 0493 Exam Pattern",
  description: "How Cambridge O Level Islamiyat 2058 / IGCSE Islamiyat 0493 is assessed: papers, marks, AO1/AO2.",
  ...canonical("/exam-pattern"),
};

const faqs = [
  {
    q: "How many questions do I have to answer in each paper?",
    a: "Each paper has five questions; candidates answer Question 1, Question 2, and two others from the remaining three.",
  },
  {
    q: "What is the difference between AO1 and AO2 in Islamiyat?",
    a: "AO1 (Recall, select and present relevant facts) carries 68% weighting. AO2 (Understanding of significance in Islam and Muslim lives) carries 32% weighting.",
  },
  {
    q: "How long is each Islamiyat paper?",
    a: "Paper 1 and Paper 2 are each 1½ hours long and worth 50 marks. Both papers are required and are answered in English.",
  },
];


export default function ExamPatternPage() {
  return (
    <PageShell
      title="Exam Pattern"
      description="How Cambridge O Level Islamiyat 2058 / IGCSE 0493 is assessed."
      breadcrumbs={[{ label: "Exam Pattern", href: "/exam-pattern" }]}
    >
      <JsonLd data={faqSchema(faqs)} />
      <ul className="list-disc list-inside space-y-1">
        <li>Two written papers, both required for a grade; answered in English</li>
        <li>Paper 1 and Paper 2: 1½ hours each, 50 marks each</li>
        <li>
          Each paper has five questions; candidates answer Question 1, Question 2, and two others
        </li>
        <li>AO1 (Recall, select and present relevant facts): 68% weighting</li>
        <li>AO2 (Understanding of significance in Islam and Muslim lives): 32% weighting</li>
      </ul>
      <p className="text-sm text-text-muted mt-6">
        [Full levels-of-response mark grids pending publication — see
        docs/syllabus-coverage-audit.md]
      </p>
      <p className="text-sm mt-4">
        For guidance on how to structure a strong AO2 answer, see{" "}
        <Link href="/revision/exam-technique" className="text-primary underline">
          the AO1/AO2 exam technique guide
        </Link>
        . For what actually separates a Grade A answer from a Grade C or F answer, see{" "}
        <Link href="/grade-descriptions" className="text-primary underline">
          the grade descriptions guide
        </Link>
        .
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
