import Link from "next/link";
import { siteConfig } from "@/data/site-config";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-primary text-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="font-heading text-lg font-bold tracking-tight">
          {siteConfig.siteName}
        </Link>
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            {siteConfig.primaryNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-accent transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link
          href={siteConfig.contact.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-primary hover:bg-secondary transition-colors shrink-0"
        >
          WhatsApp
        </Link>
      </div>
      <nav aria-label="Primary mobile" className="lg:hidden border-t border-white/10">
        <ul className="flex flex-wrap gap-x-4 gap-y-2 px-4 py-2 text-xs">
          {siteConfig.primaryNav.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-accent transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
