import { PageShell } from "@/components/PageShell";

export const metadata = {
  title: "Paper 2",
  description:
    "Hadith teachings, their history, the Rightly Guided Caliphs, and the Articles of Faith & Pillars of Islam.",
};

export default function Paper2Page() {
  return (
    <PageShell
      title="Paper 2"
      description="Hadith teachings, their history, the Rightly Guided Caliphs, and the Articles of Faith & Pillars of Islam."
    >
      <ol className="list-decimal list-inside space-y-1">
        <li>Major teachings in the Hadiths of the Prophet</li>
        <li>The history and importance of the Hadiths</li>
        <li>The period of rule of the Rightly Guided Caliphs and their importance as leaders</li>
        <li>The Articles of Faith and the Pillars of Islam</li>
      </ol>
      <p className="text-sm text-text-muted mt-6">
        [Content pending — see docs/source-conflicts.md for an unresolved copyright question
        affecting this paper&apos;s source material]
      </p>
    </PageShell>
  );
}
