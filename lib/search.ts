import { searchIndex, SearchEntry } from "@/data/search-index";
import { SearchFiltersPreference } from "@/lib/learner-store";

export function search(query: string, filters?: SearchFiltersPreference): SearchEntry[] {
  if (!query.trim()) return [];

  const q = query.toLowerCase();
  let results = searchIndex.filter(
    (entry) =>
      entry.title.toLowerCase().includes(q) ||
      entry.description.toLowerCase().includes(q) ||
      entry.keywords.toLowerCase().includes(q)
  );

  if (filters) {
    results = results.filter((entry) => matchesFilters(entry, filters));
  }

  return results;
}

export function matchesFilters(entry: SearchEntry, filters: SearchFiltersPreference): boolean {
  if (filters.papers && filters.papers.length > 0) {
    if (!entry.paper || !filters.papers.includes(entry.paper)) return false;
  }

  if (filters.types && filters.types.length > 0) {
    if (!entry.type || !filters.types.includes(entry.type)) return false;
  }

  if (filters.sections && filters.sections.length > 0) {
    if (!entry.section || !filters.sections.includes(entry.section)) return false;
  }

  if (filters.years && filters.years.length > 0) {
    if (!entry.year || !filters.years.includes(entry.year)) return false;
  }

  return true;
}