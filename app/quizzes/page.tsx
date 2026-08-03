import { PageShell } from "@/components/PageShell";

export const metadata = {
  title: "Quizzes",
  description: "Self-check quizzes to test recall and understanding.",
};

export default function QuizzesPage() {
  return (
    <PageShell title="Quizzes" description="Self-check quizzes to test recall and understanding.">
      <p className="text-sm text-text-muted">[Quizzes pending development]</p>
    </PageShell>
  );
}
