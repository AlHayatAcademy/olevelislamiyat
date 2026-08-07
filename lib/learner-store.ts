import type { QuizStats } from "@/lib/quiz-analytics";

export type ContentRef = {
  type: 'topic' | 'section';
  id?: string;
  paper?: number;
  section?: string;
  slug?: string;
  title?: string;
  url?: string;
};

export type RecentlyViewedEntry = { 
  ref: ContentRef; 
  viewedAt: string;
  url: string;
  title: string;
};

export type Bookmark = {
  url: string;
  title: string;
  addedAt: string;
};

export interface LearnerProfile {
  progress: Record<string, unknown>;
  bookmarks: Bookmark[];
  recentlyViewed: RecentlyViewedEntry[];
  lastVisited: RecentlyViewedEntry | null;
}

export type SearchFiltersPreference = {
  papers?: (number | string)[];
  types?: (number | string)[];
  sections?: (number | string)[];
  years?: (number | string)[];
};

export function recordView(_ref: ContentRef): void {
  // Stub implementation
}

export function isBookmarked(_ref: ContentRef): boolean {
  return false;
}

export function toggleBookmark(_ref: ContentRef): boolean {
  return false;
}

export function getLastVisited(): RecentlyViewedEntry | null {
  return null;
}

export function getViewedCountForSection(_paper: number, _slug: string): number {
  return 0;
}

export function useLearnerProfile(): LearnerProfile {
  return { 
    progress: {}, 
    bookmarks: [],
    recentlyViewed: [],
    lastVisited: null,
  };
}

export function getQuizStatsSummary(): QuizStats[] {
  return [];
}

export function saveSearchFilters(_filters: SearchFiltersPreference): void {
  // Stub implementation
}

export function getSearchFilters(): SearchFiltersPreference {
  return {};
}
