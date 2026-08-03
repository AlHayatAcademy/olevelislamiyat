import { PageShell } from "@/components/PageShell";

export const metadata = {
  title: "Revision",
  description: "Revision resources organised by paper and topic.",
};

export default function RevisionPage() {
  return (
    <PageShell title="Revision" description="Revision resources organised by paper and topic.">
      <p className="text-sm text-text-muted">
        [Revision content pending — will draw on hand-made revision notes in source/09-notes once
        processed]
      </p>
    </PageShell>
  );
}
