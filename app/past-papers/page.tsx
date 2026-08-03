import { PageShell } from "@/components/PageShell";

export const metadata = {
  title: "Past Papers",
  description: "Cambridge O Level Islamiyat 2058 past exam sessions, organised by paper and topic.",
};

export default function PastPapersPage() {
  return (
    <PageShell
      title="Past Papers"
      description="Cambridge O Level Islamiyat 2058 past exam sessions, organised by paper and topic."
    >
      <p>
        Sessions on file: May/June and Oct/Nov, 2021–2025 (10 sessions, 40 question papers, 40 mark
        schemes).
      </p>
      <p className="text-sm text-text-muted mt-3">
        In line with copyright policy, original question paper and mark scheme PDFs are not rehosted
        here. Topic-tagged question indexes are in progress — see docs/past-paper-coverage-audit.md.
      </p>
    </PageShell>
  );
}
