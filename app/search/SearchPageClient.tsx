"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { search, groupByCategory, popularSearches } from "@/lib/search";

export function SearchPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);

  const results = search(query);
  const grouped = groupByCategory(results);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.replace(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold font-heading text-text">Search</h1>
      <p className="mt-3 text-text-muted">
        Search across Paper 1 &amp; Paper 2 lessons, past-paper questions, model answers, quizzes, and references.
      </p>

      <form onSubmit={handleSubmit} className="mt-6">
        <label htmlFor="search-page-input" className="sr-only">
          Search query
        </label>
        <div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 shadow-soft focus-within:ring-2 focus-within:ring-primary">
          <Search aria-hidden="true" size={18} className="shrink-0 text-text-muted" />
          <input
            id="search-page-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lessons, past papers, quizzes, references..."
            className="w-full bg-transparent text-base text-text placeholder:text-text-muted focus:outline-none"
          />
        </div>
      </form>

      <div className="mt-8">
        {query.trim() === "" && (
          <div className="rounded-xl border border-border bg-surface-soft px-6 py-10 text-center text-text-muted">
            <p>Type to search the whole site.</p>
          </div>
        )}

        {query.trim() !== "" && results.length === 0 && (
          <div className="rounded-xl border border-border bg-surface-soft px-6 py-10 text-center">
            <p className="text-text">
              No results for &ldquo;<span className="font-semibold">{query}</span>&rdquo;.
            </p>
            <p className="mt-1 text-text-muted">Try a related term, or one of these popular searches:</p>
            <ul className="mt-4 flex flex-wrap justify-center gap-2">
              {popularSearches.map((s) => (
                <li key={s.query}>
                  <button
                    type="button"
                    onClick={() => {
                      setQuery(s.query);
                      router.replace(`/search?q=${encodeURIComponent(s.query)}`);
                    }}
                    className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {grouped.map((group) => (
          <div key={group.category} className="mb-8">
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-text-muted">
              {group.category}
            </h2>
            <ul className="space-y-2">
              {group.results.map((result) => (
                <li key={`${result.category}-${result.url}`}>
                  <Link
                    href={result.url}
                    className="block rounded-lg border border-border bg-surface px-4 py-3 shadow-soft transition-colors hover:bg-surface-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <span className="block font-medium text-text">{result.title}</span>
                    <span className="mt-0.5 block text-sm text-text-muted">{result.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
