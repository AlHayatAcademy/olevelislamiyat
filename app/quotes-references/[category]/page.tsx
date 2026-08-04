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
      <ul className="space-y-2">
        {items.map((ref) => (
          <li key={ref.id}>
            <Link
              href={`/quotes-references/${category}/${ref.id}`}
              className="block rounded-md border border-surface-soft px-4 py-3 hover:border-primary transition-colors"
            >
              <p className="font-medium">{ref.title}</p>
              <p className="text-sm text-text-muted mt-1">{ref.citation}</p>
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
