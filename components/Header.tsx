"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  ClipboardList,
  FileText,
  FileStack,
  NotebookPen,
  MessageSquareQuote,
  GraduationCap,
  Puzzle,
  StickyNote,
  LibraryBig,
  Users,
  Presentation,
  Info,
  Mail,
  Menu,
  X,
  ChevronDown,
  Search,
  LayoutDashboard,
} from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { SearchModal } from "@/components/SearchModal";

type NavIcon = React.ComponentType<{ size?: number; className?: string; "aria-hidden"?: boolean }>;

const navIcons: Record<string, NavIcon> = {
  "/syllabus": BookOpen,
  "/exam-pattern": ClipboardList,
  "/paper-1": FileText,
  "/paper-2": FileText,
  "/past-papers": FileStack,
  "/model-answers": NotebookPen,
  "/quotes-references": MessageSquareQuote,
  "/revision": GraduationCap,
  "/quizzes": Puzzle,
  "/dashboard": LayoutDashboard,
  "/notes": StickyNote,
  "/resources": LibraryBig,
  "/online-classes": Users,
  "/teacher-resources": Presentation,
  "/about": Info,
  "/contact": Mail,
};

const navDescriptions: Record<string, string> = {
  "/syllabus": "The full 2058/0493 syllabus, section by section.",
  "/exam-pattern": "How Paper 1 and Paper 2 are structured and marked.",
  "/paper-1": "Qur'an, Seerah and the first Islamic community.",
  "/paper-2": "Hadith, the Caliphs, faith and practice.",
  "/past-papers": "Real exam questions, organised by topic and by year.",
  "/model-answers": "Worked, examiner-style answers to real questions.",
  "/quotes-references": "Qur'an and Hadith references for special study.",
  "/revision": "Notes, key dates, personalities and exam technique.",
  "/quizzes": "Self-check quizzes with instant feedback.",
  "/dashboard": "Your progress, bookmarks, and quiz results in one place.",
  "/notes": "Concise section-by-section revision notes.",
  "/resources": "The full study resource hub in one place.",
  "/online-classes": "Live and recorded classes with Al-Hayat Academy.",
  "/teacher-resources": "Lesson plans and classroom material for teachers.",
  "/about": "About Al-Hayat Academy and the founder.",
  "/contact": "Get in touch by email or WhatsApp.",
};

const navGroups = [
  {
    label: "Study",
    hrefs: ["/syllabus", "/exam-pattern", "/paper-1", "/paper-2"],
  },
  {
    label: "Practice",
    hrefs: ["/past-papers", "/model-answers", "/quizzes", "/quotes-references", "/dashboard"],
  },
  {
    label: "Resources",
    hrefs: ["/revision", "/notes", "/resources", "/online-classes", "/teacher-resources"],
  },
  {
    label: "About",
    hrefs: ["/about", "/contact"],
  },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  // Close mobile menu on route change and lock body scroll while open.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Global Cmd/Ctrl+K shortcut to open search from anywhere on the site.
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Escape closes whichever menu is open, so keyboard users aren't stuck.
  useEffect(() => {
    if (!mobileOpen && !megaOpen) return;
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setMegaOpen(null);
      }
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [mobileOpen, megaOpen]);

  const navByHref = new Map(siteConfig.primaryNav.map((l) => [l.href, l]));

  return (
    <header className="sticky top-0 z-50 bg-primary text-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          className="rounded-md font-heading text-lg font-bold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
        >
          {siteConfig.siteName}
        </Link>

        {/* Desktop mega-menu nav */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1 text-sm">
            {navGroups.map((group) => (
              <li
                key={group.label}
                className="relative"
                onMouseEnter={() => setMegaOpen(group.label)}
                onMouseLeave={() => setMegaOpen((cur) => (cur === group.label ? null : cur))}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 rounded-md px-3 py-2 font-medium transition-colors hover:bg-white/10 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  aria-expanded={megaOpen === group.label}
                  onClick={() => setMegaOpen((cur) => (cur === group.label ? null : group.label))}
                  onFocus={() => setMegaOpen(group.label)}
                >
                  {group.label}
                  <ChevronDown
                    aria-hidden="true"
                    size={14}
                    className={`transition-transform duration-200 ${megaOpen === group.label ? "rotate-180" : ""}`}
                  />
                </button>

                <div
                  inert={megaOpen !== group.label}
                  className={`absolute left-0 top-full pt-2 transition-all duration-150 ${
                    megaOpen === group.label
                      ? "pointer-events-auto translate-y-0 opacity-100"
                      : "pointer-events-none -translate-y-1 opacity-0"
                  }`}
                >
                  <div className="w-80 rounded-xl border border-border bg-surface p-2 text-text shadow-card-hover">
                    <ul>
                      {group.hrefs.map((href) => {
                        const link = navByHref.get(href);
                        if (!link) return null;
                        const Icon = navIcons[href];
                        const active = isActive(pathname, href);
                        return (
                          <li key={href}>
                            <Link
                              href={href}
                              className={`flex items-start gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                                active
                                  ? "bg-primary/10 text-primary"
                                  : "text-text hover:bg-surface-soft hover:text-primary"
                              }`}
                            >
                              {Icon && (
                                <span
                                  className={`mt-0.5 flex shrink-0 items-center justify-center rounded-lg p-1.5 ${
                                    active ? "bg-primary/15 text-primary" : "bg-surface-soft text-secondary"
                                  }`}
                                >
                                  <Icon aria-hidden={true} size={16} />
                                </span>
                              )}
                              <span>
                                <span className={`block font-semibold ${active ? "text-primary" : "text-text"}`}>
                                  {link.label}
                                </span>
                                {navDescriptions[href] && (
                                  <span className="mt-0.5 block text-xs leading-snug text-text-muted">
                                    {navDescriptions[href]}
                                  </span>
                                )}
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 rounded-md px-2.5 py-2 text-sm text-white/90 transition-colors hover:bg-white/10 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Search the site"
          >
            <Search aria-hidden="true" size={18} />
            <span className="text-xs text-white/60">Ctrl K</span>
          </button>
          <Link
            href={siteConfig.contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-primary shadow-soft transition-all duration-150 hover:-translate-y-0.5 hover:bg-secondary hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            WhatsApp
          </Link>
        </div>

        {/* Mobile search + menu toggle */}
        <div className="flex items-center gap-1 lg:hidden">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="rounded-md p-2 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Search the site"
          >
            <Search aria-hidden="true" size={22} />
          </button>
          <button
            type="button"
            className="rounded-md p-2 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X aria-hidden="true" size={24} /> : <Menu aria-hidden="true" size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile slide-in overlay menu */}
      <div
        id="mobile-nav"
        className={`fixed inset-0 z-40 lg:hidden ${mobileOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!mobileOpen}
        inert={!mobileOpen}
      >
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-200 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
        />
        <nav
          aria-label="Primary mobile"
          className={`absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-primary-dark text-white shadow-2xl transition-transform duration-250 ease-out ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
            <span className="font-heading font-bold">Menu</span>
            <button
              type="button"
              className="rounded-md p-2 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            >
              <X aria-hidden="true" size={22} />
            </button>
          </div>
          <div className="px-3 pt-3">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                setSearchOpen(true);
              }}
              className="flex min-h-[44px] w-full items-center gap-3 rounded-lg bg-white/10 px-3 py-2.5 text-base transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Search aria-hidden="true" size={18} className="shrink-0 text-accent" />
              Search
            </button>
          </div>
          <div className="flex-1 space-y-5 overflow-y-auto px-3 py-4">
            {navGroups.map((group) => (
              <div key={group.label}>
                <p className="px-3 pb-1.5 text-xs font-semibold uppercase tracking-wide text-white/50">
                  {group.label}
                </p>
                <ul className="space-y-1">
                  {group.hrefs.map((href) => {
                    const link = navByHref.get(href);
                    if (!link) return null;
                    const Icon = navIcons[href];
                    const active = isActive(pathname, href);
                    return (
                      <li key={href}>
                        <Link
                          href={href}
                          className={`flex min-h-[44px] items-center gap-3 rounded-lg px-3 py-2.5 text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                            active ? "bg-white/15 font-semibold text-accent" : "hover:bg-white/10"
                          }`}
                        >
                          {Icon && <Icon aria-hidden={true} size={18} className="shrink-0 text-accent" />}
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 p-4">
            <Link
              href={siteConfig.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-primary transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Chat on WhatsApp
            </Link>
          </div>
        </nav>
      </div>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
