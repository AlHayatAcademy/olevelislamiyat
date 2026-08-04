import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { referenceTypes, slugifyType, getReferencesByType } from "@/data/references";
import { canonical } from "@/lib/seo";

interface PageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return referenceTypes.map((type) => ({ category: slugifyType(type) }));
}

function findType(categorySlug: string) {
  return referenceTypes.find((t) => slugifyType(t) === categorySlug);
}

export async function generateMetadata({ params }: PageProps) {
  const { category } = await params;
  const type = findType(category);
  if (!type) return {};
  return {
    title: `Quotes & References: ${type}`,
    description: `${type} used across Cambridge O Level Islamiyat 2058.`,
    ...canonical(`/quotes-references/${category}`),
  };
}

export default async function ReferenceCategoryPage({ params }: PageProps) {
  const { category } = await params;
  const type = findType(category);
  if (!type) notFound();

  const items = getReferencesByType(type);

  return (
    <PageShell
      title={type}
      description={`${items.length} entr${items.length === 1 ? "y" : "ies"} in this category.`}
      breadcrumbs={[
        { label: "Quotes & References", href: "/quotes-references" },
        { label: type, href: `/quotes-references/${category}` },
      ]}
    >
      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map((ref) => (
          <li key={ref.id}>
            <Link
              href={`/quotes-references/${category}/${ref.id}`}
              className="block rounded-lg border border-border bg-surface px-4 py-3 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-card"
            >
              <p className="font-medium text-text">{ref.title}</p>
              <p className="text-sm text-text-muted mt-1">{ref.citation}</p>
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
