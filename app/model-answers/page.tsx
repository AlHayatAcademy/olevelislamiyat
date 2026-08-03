import { PageShell } from "@/components/PageShell";

export const metadata = {
  title: "Model Answers",
  description: "Answer-structure guidance aligned with AO1/AO2 mark schemes.",
};

export default function ModelAnswersPage() {
  return (
    <PageShell
      title="Model Answers"
      description="Answer-structure guidance aligned with AO1/AO2 mark schemes."
    >
      <p className="text-sm text-text-muted">
        [Model answer guidance pending — will be derived from official mark schemes and examiner
        reports without reproducing them verbatim]
      </p>
    </PageShell>
  );
}
