"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Simple two-way tab switch between the Paper 1 and Paper 2 syllabus
 * overview pages. Each "tab" is a real link to its own route (so the page
 * stays server-rendered and crawlable); this component only supplies the
 * active-state styling client-side.
 */
export function PaperTabs() {
  const pathname = usePathname();

  const tabs = [
    { href: "/paper-1", label: "Paper 1" },
    { href: "/paper-2", label: "Paper 2" },
  ];

  return (
    <div role="tablist" aria-label="Syllabus paper" className="inline-flex rounded-full border border-border bg-surface-soft p-1">
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
