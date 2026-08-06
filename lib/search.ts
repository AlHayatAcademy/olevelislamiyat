export interface SearchEntry {
  id: string;
  title: string;
  type: string;
  category: string;
  url: string;
  description?: string;
  paper?: number;
  year?: number;
  score?: number;
  query: string;
  label: string;
}

export interface SearchGroup {
  category: string;
  results: SearchEntry[];
}

export const RESULT_LIMIT = 10;

export function search(_query: string, _filters?: Record<string, unknown>): SearchEntry[] {
  // Stub implementation - ignores filters and query
  // Returns empty array; real implementation would search the content
  return [];
}

export function groupByCategory(entries: SearchEntry[]): SearchGroup[] {
  const grouped: Record<string, SearchEntry[]> = {};
  entries.forEach((entry) => {
    if (!grouped[entry.category]) {
      grouped[entry.category] = [];
    }
    grouped[entry.category].push(entry);
  });

  return Object.entries(grouped).map(([category, results]): SearchGroup => ({
    category,
    results,
  }));
}

export const popularSearches: SearchEntry[] = [
  { id: '1', title: 'Syllabus Overview', type: 'document', category: 'Popular', url: '/syllabus', query: 'syllabus', label: 'Syllabus' },
  { id: '2', title: 'Paper 1 Guide', type: 'document', category: 'Popular', url: '/paper-1', query: 'paper 1', label: 'Paper 1' },
  { id: '3', title: 'Past Papers', type: 'document', category: 'Popular', url: '/past-papers', query: 'past papers', label: 'Past Papers' },
];
