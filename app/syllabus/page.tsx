import { PageShell } from "@/components/PageShell";

export const metadata = {
  title: "Syllabus",
  description:
    "Full breakdown of the Cambridge O Level Islamiyat (2058) and IGCSE Islamiyat (0493) syllabus content.",
};

export default function SyllabusPage() {
  return (
    <PageShell
      title="Syllabus"
      description="Full breakdown of the Cambridge O Level Islamiyat (2058) and IGCSE Islamiyat (0493) syllabus content."
    >
      <p>
        Both papers are answered in English. Each paper is 1½ hours long and worth 50 marks, with
        five questions of which candidates must answer Question 1, Question 2 and two others.
      </p>
      <h2 className="text-xl font-heading font-bold mt-6">Paper 1</h2>
      <ol className="list-decimal list-inside space-y-1">
        <li>Major themes of the Qur&apos;an</li>
        <li>The history and importance of the Qur&apos;an</li>
        <li>The life and importance of the Prophet Muhammad (pbuh)</li>
        <li>The first Islamic community</li>
      </ol>
      <h2 className="text-xl font-heading font-bold mt-6">Paper 2</h2>
      <ol className="list-decimal list-inside space-y-1">
        <li>Major teachings in the Hadiths of the Prophet</li>
        <li>The history and importance of the Hadiths</li>
        <li>The period of rule of the Rightly Guided Caliphs and their importance as leaders</li>
        <li>The Articles of Faith and the Pillars of Islam</li>
      </ol>
      <p className="text-sm text-text-muted mt-6">
        [Detailed topic-by-topic content pending full source verification — see
        docs/syllabus-coverage-audit.md]
      </p>
    </PageShell>
  );
}
