"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { search, groupByCategory, popularSearches, type SearchGroup } from "@/lib/search";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const resultRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  const results = useMemo(() => search(query), [query]);
  const grouped: SearchGroup[] = useMemo(() => groupByCategory(results), [results]);

  // Focus trap + restore focus on close.
  useEffect(() => {
    if (open) {
      previouslyFocused.current = document.activeElement as HTMLElement | null;
      setQuery("");
      setActiveIndex(0);
      const t = setTimeout(() => inputRef.current?.focus(), 0);
      return () => clearTimeout(t);
    } else {
      previouslyFocused.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length - 1));
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        return;
      }

      if (e.key === "Enter") {
        const result = results[activeIndex];
        if (result) {
          e.preventDefault();
          onClose();
          router.push(result.url);
        }
        return;
      }

      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, results, activeIndex, onClose, router]);

  useEffect(() => {
    resultRefs.current[activeIndex]?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  if (!open) return null;

  let flatIndex = -1;

  return (
    <div className="fixed inset-0 z-[60]" role="presentation">
      <div className="absolute inset-0 bg-black/50 transition-opacity" onClick={onClose} />
      <div className="absolute inset-x-0 top-0 flex justify-center px-4 pt-20 sm:pt-28">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site search"
          className="flex max-h-[70vh] w-full max-w-xl flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-card-hover"
        >
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <Search aria-hidden="true" size={18} className="shrink-0 text-text-muted" />
            <input
              ref={inputRef}
              type="text"
              role="combobox"
              aria-expanded={results.length > 0}
              aria-controls="search-results-list"
              aria-autocomplete="list"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search lessons, past papers, quizzes, references..."
              className="w-full bg-transparent text-base text-text placeholder:text-text-muted focus:outline-none"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close search"
              className="shrink-0 rounded-md p-1.5 text-text-muted transition-colors hover:bg-surface-soft hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <X aria-hidden="true" size={18} />
            </button>
          </div>

          <div id="search-results-list" className="flex-1 overflow-y-auto px-2 py-2">
            {query.trim() === "" && (
              <div className="px-3 py-8 text-center text-sm text-text-muted">
                <p>Type to search the whole site.</p>
                <p className="mt-1">Try lessons, past-paper questions, quizzes, or references.</p>
              </div>
            )}

            {query.trim() !== "" && results.length === 0 && (
              <div className="px-3 py-8 text-center text-sm">
                <p className="text-text">
                  No results for &ldquo;<span className="font-semibold">{query}</span>&rdquo;.
                </p>
                <p className="mt-1 text-text-muted">Try a related term, or one of these:</p>
                <ul className="mt-3 flex flex-wrap justify-center gap-2">
                  {popularSearches.map((s: typeof popularSearches[number]) => (
                    <li key={s.query}>
                      <button
                        type="button"
                        onClick={() => setQuery(s.query as string)}
                        className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-surface-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        {s.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {grouped.map((group) => (
              <div key={group.category} className="mb-2">
                <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-text-muted">
                  {group.category}
                </p>
                <ul>
                  {group.results.map((result) => {
                    flatIndex += 1;
                    const idx = flatIndex;
                    const active = idx === activeIndex;
                    return (
                      <li key={`${result.category}-${result.url}`}>
                        <a
                          ref={(el) => {
                            resultRefs.current[idx] = el;
                          }}
                          href={result.url}
                          onMouseEnter={() => setActiveIndex(idx)}
                          onClick={(e) => {
                            e.preventDefault();
                            onClose();
                            router.push(result.url);
                          }}
                          className={`block rounded-lg px-3 py-2 transition-colors ${
                            active ? "bg-primary/10" : "hover:bg-surface-soft"
                          }`}
                        >
                          <span className="block text-sm font-medium text-text">{result.title}</span>
                          <span className="mt-0.5 block truncate text-xs text-text-muted">
                            {result.description}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-border px-4 py-2 text-xs text-text-muted">
            <span>&uarr;&darr; navigate &middot; Enter select &middot; Esc close</span>
            <a href="/search" className="text-primary hover:underline" onClick={onClose}>
              Advanced search
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}