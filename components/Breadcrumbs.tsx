import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import { JsonLd } from "@/components/JsonLd";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

/**
 * Visible breadcrumb trail plus matching BreadcrumbList JSON-LD.
 * `items` should NOT include "Home" — it is prepended automatically so every
 * trail and its structured data stay in lockstep with the real route hierarchy.
 */
export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const trail: BreadcrumbItem[] = [{ label: "Home", href: "/" }, ...items];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${siteConfig.domain}${item.href}`,
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <nav aria-label="Breadcrumb" className="text-sm text-text-muted">
        <ol className="flex flex-wrap items-center gap-1">
          {trail.map((item, index) => {
            const isLast = index === trail.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-1">
                {index > 0 && (
                  <span aria-hidden="true" className="text-border">
                    /
                  </span>
                )}
                {isLast ? (
                  <span aria-current="page" className="font-medium text-text">
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} className="hover:underline hover:text-primary">
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
