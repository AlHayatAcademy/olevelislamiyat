import { PageShell } from "@/components/PageShell";

export const metadata = {
  title: "Notes",
  description: "Hand-made revision notes for Paper 1 and Paper 2 topics.",
};

export default function NotesPage() {
  return (
    <PageShell title="Notes" description="Hand-made revision notes for Paper 1 and Paper 2 topics.">
      <p className="text-sm text-text-muted">
        [Notes pending — 46 source images available for Paper 1 and Paper 2, to be processed and
        published]
      </p>
    </PageShell>
  );
}
