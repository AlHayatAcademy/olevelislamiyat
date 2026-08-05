export interface SearchFiltersPreference {
  papers?: (1 | 2)[];
  types?: string[];
  sections?: string[];
  years?: number[];
}

export function saveSearchFilters(filters: SearchFiltersPreference): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem("olevelislamiyat:search-filters", JSON.stringify(filters));
  } catch {
    // localStorage unavailable
  }
}

export function getSearchFilters(): SearchFiltersPreference | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const stored = window.localStorage.getItem("olevelislamiyat:search-filters");
    return stored ? JSON.parse(stored) : undefined;
  } catch {
    return undefined;
  }
}