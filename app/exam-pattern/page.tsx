import { PageShell } from "@/components/PageShell";

export const metadata = {
  title: "Exam Pattern",
  description: "How Cambridge O Level Islamiyat 2058 / IGCSE 0493 is assessed.",
};

export default function ExamPatternPage() {
  return (
    <PageShell
      title="Exam Pattern"
      description="How Cambridge O Level Islamiyat 2058 / IGCSE 0493 is assessed."
    >
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
    </PageShell>
  );
}
