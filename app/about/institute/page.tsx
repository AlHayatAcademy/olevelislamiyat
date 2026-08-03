import { PageShell } from "@/components/PageShell";

export const metadata = {
  title: "About the Institute",
  description: "About Al-Hayat Research Institute of Social Sciences.",
};

export default function InstitutePage() {
  return (
    <PageShell
      title="About the Institute"
      description="About Al-Hayat Research Institute of Social Sciences."
    >
      <p>
        Al-Hayat Research Institute of Social Sciences (SMC-Private) Limited is based in Lahore,
        Pakistan, and leads educational and scholarly initiatives within the Al-Hayat academic
        ecosystem, including Al-Hayat Academy.
      </p>
    </PageShell>
  );
}
