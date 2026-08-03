import { PageShell } from "@/components/PageShell";

export const metadata = {
  title: "Paper 1",
  description:
    "Major themes of the Qur&apos;an, its history, the life of the Prophet Muhammad (pbuh), and the first Islamic community.",
};

export default function Paper1Page() {
  return (
    <PageShell
      title="Paper 1"
      description="Major themes of the Qur'an, its history, the life of the Prophet Muhammad (pbuh), and the first Islamic community."
    >
      <ol className="list-decimal list-inside space-y-1">
        <li>Major themes of the Qur&apos;an</li>
        <li>The history and importance of the Qur&apos;an</li>
        <li>The life and importance of the Prophet Muhammad (pbuh)</li>
        <li>The first Islamic community</li>
      </ol>
      <p className="text-sm text-text-muted mt-6">
        [Full topic content pending — draft source available, see docs/syllabus-coverage-audit.md]
      </p>
    </PageShell>
  );
}
