"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Tab switch between the two ways of browsing /quotes-references: the full syllabus outline
 * (default) and the flat reference-type listing. Mirrors PaperTabs.tsx — real links to real
 * routes, so both views stay server-rendered; this component only styles the active state.
 */
export function QuotesReferencesTabs() {
  const pathname = usePathname();

  const tabs = [
    { href: "/quotes-references", label: "Browse by Topic" },
    { href: "/quotes-references/by-type", label: "Browse by Type" },
  ];

  return (
    <div role="tablist" aria-label="Quotes & references view" className="inline-flex rounded-full border border-border bg-surface-soft p-1">
      {tabs.map((t) => {
        const active = pathname === t.href;
        return (
          <Link
            key={t.href}
            href={t.href}
            role="tab"
            aria-selected={active}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              active ? "bg-primary text-white shadow-soft" : "text-text-muted hover:text-primary"
            }`}
          >
            {t.label}
          </Link>
        );
      })}
    </div>
  );
}
