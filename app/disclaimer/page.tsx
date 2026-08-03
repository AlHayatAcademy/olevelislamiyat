import { PageShell } from "@/components/PageShell";

export const metadata = {
  title: "Disclaimer",
  description: "General disclaimer for O Level Islamiyat.",
};

export default function DisclaimerPage() {
  return (
    <PageShell title="Disclaimer" description="General disclaimer for O Level Islamiyat.">
      <p className="text-sm text-text-muted">[General disclaimer content pending legal review]</p>
    </PageShell>
  );
}
