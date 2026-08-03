import { PageShell } from "@/components/PageShell";

export const metadata = {
  title: "Quotes & References",
  description: "Qur&apos;an and Hadith references relevant to each syllabus topic.",
};

export default function QuotesReferencesPage() {
  return (
    <PageShell
      title="Quotes & References"
      description="Qur'an and Hadith references relevant to each syllabus topic."
    >
      <p>
        Appendix 1 of the syllabus lists 15 Qur&apos;an passages for special study (Allah in
        Himself, Allah&apos;s relationship with the created world, Allah&apos;s Messengers).
        Appendix 2 lists Hadiths for special study on individual conduct and community life.
      </p>
      <p className="text-sm text-text-muted mt-6">
        [Full reference library pending — see docs/syllabus-coverage-audit.md]
      </p>
    </PageShell>
  );
}
