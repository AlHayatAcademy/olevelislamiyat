"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search as SearchIcon } from "lucide-react";
import { search, SearchEntry } from "@/lib/search";
import { SearchFilters } from "@/components/SearchFilters";
import { SearchFiltersPreference } from "@/lib/learner-store";

export function SearchPageClient({ initialQuery }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery || "");
  const [filters, setFilters] = useState<SearchFiltersPreference>({});

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return search(query, filters);
  }, [query, filters]);

  const groupedResults = useMemo(() => {
    const grouped: Record<string, SearchEntry[]> = {};
    for (const result of results) {
      if (!grouped[result.category]) grouped[result.category] = [];
      grouped[result.category].push(result);
    }
    return Object.entries(grouped).sort((a, b) => a[0].localeCompare(b[0]));
  }, [results]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Search header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <SearchIcon className="text-primary" size={32} aria-hidden="true" />
          <div>
            <h1 className="text-3xl font-bold font-heading text-text">Search</h1>
            <p className="mt-2 text-text-muted">Find lessons, past papers, quizzes, and resources.</p>
          </div>
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type to search..."
          className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
          autoFocus
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Filters sidebar */}
        <div className="lg:col-span-1">
          <SearchFilters onFiltersChange={setFilters} />
        </div>

        {/* Results */}
        <div className="lg:col-span-3">
          {!query.trim() ? (
            <div className="rounded-lg border border-dashed border-border bg-surface-soft p-8 text-center">
              <p className="text-text-muted">Enter a search term to see results.</p>
            </div>
          ) : results.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border bg-surface-soft p-8 text-center">
              <p className="font-semibold text-text">No results found</p>
              <p className="mt-2 text-text-muted">Try different keywords or adjust your filters.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {groupedResults.map(([category, entries]) => (
                <section key={category}>
                  <h2 className="mb-3 font-heading text-lg font-semibold text-text">{category}</h2>
                  <div className="space-y-2">
                    {entries.map((result) => (
                      <Link
                        key={result.url}
                        href={result.url}
                        className="block rounded-lg border border-border bg-surface p-4 transition-all hover:border-primary hover:shadow-soft"
                      >
                        <h3 className="font-semibold text-primary">{result.title}</h3>
                        <p className="mt-1 text-sm text-text-muted">{result.description}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {result.paper && (
                            <span className="inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                              Paper {result.paper}
                            </span>
                          )}
                          {result.type && (
                            <span className="inline-block rounded-full bg-secondary/10 px-2 py-0.5 text-xs font-semibold text-secondary capitalize">
                              {result.type.replace("-", " ")}
                            </span>
                          )}
                          {result.year && (
                            <span className="inline-block rounded-full bg-surface-soft px-2 py-0.5 text-xs font-semibold text-text-muted">
                              {result.year}
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}