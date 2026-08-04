import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { references, referenceTypes, slugifyType, getReferenceById } from "@/data/references";
import { getSection } from "@/data/syllabus";
import { canonical } from "@/lib/seo";

interface PageProps {
  params: Promise<{ category: string; id: string }>;
}

export function generateStaticParams() {
  return references.map((ref) => ({ category: slugifyType(ref.type), id: ref.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { category, id } = await params;
  const ref = getReferenceById(id);
  if (!ref) return {};
  return {
    title: ref.title,
    description: ref.citation,
    ...canonical(`/quotes-references/${category}/${id}`),
  };
}

export default async function ReferenceDetailPage({ params }: PageProps) {
  const { category, id } = await params;
  const ref = getReferenceById(id);
  if (!ref || slugifyType(ref.type) !== category) notFound();

  const section = getSection(ref.paper, ref.sectionSlug);

  return (
    <PageShell
      title={ref.title}
      description={`${ref.type} · ${ref.citation}`}
      breadcrumbs={[
        { label: "Quotes & References", href: "/quotes-references" },
        { label: ref.type, href: `/quotes-references/${category}` },
        { label: ref.title, href: `/quotes-references/${category}/${ref.id}` },
      ]}
    >
      {ref.arabic && (
        <p dir="rtl" className="text-2xl leading-loose font-arabic">
          {ref.arabic}
        </p>
      )}

      <div className="rounded-md border border-surface-soft p-4">
        <p className="text-xs uppercase tracking-wide text-text-muted mb-1">Translation</p>
        <p>{ref.translation}</p>
      </div>

      <div>
        <h2 className="text-lg font-semibold mt-6 mb-2">Explanation</h2>
        <p>{ref.explanation}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 mt-6">
        <div>
          <p className="text-xs uppercase tracking-wide text-text-muted mb-1">AO1 use</p>
          <p className="text-sm">{ref.ao1Use}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-text-muted mb-1">AO2 use</p>
          <p className="text-sm">{ref.ao2Use}</p>
        </div>
      </div>

      <p className="text-sm text-text-muted mt-4">Exam usage note: {ref.examUsageNote}</p>

      {section && (
        <p className="text-sm mt-2">
          Syllabus section:{" "}
          <Link href={`/paper-${ref.paper}/${section.slug}`} className="text-primary underline">
            Paper {section.paper} · {section.title}
          </Link>
        </p>
      )}

      <p className="text-sm mt-6">
        <Link href={`/quotes-references/${category}`} className="text-primary underline">
          ← Back to {referenceTypes.find((t) => slugifyType(t) === category)}
        </Link>
      </p>
    </PageShell>
  );
}
