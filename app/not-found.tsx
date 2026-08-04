import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/Button";

export const metadata = {
  title: "Page Not Found",
  description: "This page could not be found. Browse Islamiyat 2058 / 0493 notes, past papers and revision resources.",
};

const links = [
  { href: "/syllabus", label: "Syllabus overview" },
  { href: "/paper-1", label: "Paper 1 notes (Qur'an & Seerah)" },
  { href: "/paper-2", label: "Paper 2 notes (Hadith & Caliphs)" },
  { href: "/past-papers", label: "Past papers by year and topic" },
  { href: "/model-answers", label: "Model answers" },
  { href: "/revision", label: "Revision centre" },
];

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <Search aria-hidden="true" className="mx-auto text-secondary" size={40} />
      <h1 className="mt-4 text-3xl font-bold font-heading text-text">Page Not Found</h1>
      <p className="mt-3 text-text-muted">
        We couldn&apos;t find that page. It may have moved, or the link may be out of date. Try one
        of these instead:
      </p>

      <div className="mt-8 grid gap-2 sm:grid-cols-2 text-left">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="rounded-md border border-surface-soft px-4 py-3 text-sm hover:border-primary transition-colors"
          >
            {l.label}
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <Button href="/">Back to homepage</Button>
      </div>
    </div>
  );
}
