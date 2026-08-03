import { PageShell } from "@/components/PageShell";

export const metadata = {
  title: "Terms of Use",
  description: "Terms governing use of the O Level Islamiyat website.",
};

export default function TermsPage() {
  return (
    <PageShell
      title="Terms of Use"
      description="Terms governing use of the O Level Islamiyat website."
    >
      <p className="text-sm text-text-muted">[Terms of use content pending legal review]</p>
    </PageShell>
  );
}
