import { PageShell } from "@/components/PageShell";

export const metadata = {
  title: "About",
  description: "About O Level Islamiyat and Al-Hayat Academy.",
};

export default function AboutPage() {
  return (
    <PageShell title="About" description="About O Level Islamiyat and Al-Hayat Academy.">
      <p>
        O Level Islamiyat is an education initiative of Al-Hayat Academy, the education division of
        Al-Hayat Research Institute of Social Sciences.
      </p>
    </PageShell>
  );
}
