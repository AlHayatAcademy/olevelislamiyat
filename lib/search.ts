// Dependency-free client-side search over the site-wide search index, with synonym expansion
// and simple relevance ranking. No fuzzy-search library, no third-party search service.

import { searchIndex, type SearchEntry } from "@/data/search-index";
import { expandQueryTokens } from "@/data/search-synonyms";

export interface SearchResult extends SearchEntry {
  score: number;
}

export const RESULT_LIMIT = 20;

export const popularSearches: { label: string; query: string }[] = [
  { label: "Hajj", query: "hajj" },
  { label: "Past Papers", query: "past paper" },
  { label: "Model Answers", query: "model answer" },
  { label: "Salah / Prayer", query: "salah" },
  { label: "Caliphs", query: "caliph" },
];

function normalize(text: string): string {
  return text.toLowerCase().replace(/['’]/g, "");
}

/**
 * Score a single entry against the expanded query tokens. Each query token must match
 * *something* (title, description, or keywords) for the entry to be included; the score
 * weights title matches highest, then description, then keywords.
 */
function scoreEntry(entry: SearchEntry, tokenVariants: string[][]): number {
  const title = normalize(entry.title);
  const description = normalize(entry.description);
  const keywords = normalize(entry.keywords);

  let score = 0;

  for (const variants of tokenVariants) {
    let tokenMatched = false;

    for (const variant of variants) {
      if (!variant) continue;
      if (title.includes(variant)) {
        score += title.startsWith(variant) ? 12 : 8;
        tokenMatched = true;
      }
      if (description.includes(variant)) {
        score += 3;
        tokenMatched = true;
      }
      if (keywords.includes(variant)) {
        score += 1;
        tokenMatched = true;
      }
    }

    if (!tokenMatched) {
      // This query token (in any synonym form) matched nothing on this entry at all —
      // disqualify the entry so results stay relevant to every word typed.
      return 0;
    }
  }

  return score;
}

/**
 * Run a search over the site-wide index. Case-insensitive, token-based, synonym-expanded.
 * Returns up to RESULT_LIMIT results ranked by relevance (title > description > keywords).
 */
export function search(query: string): SearchResult[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const tokenVariants = expandQueryTokens(trimmed);
  if (tokenVariants.length === 0) return [];

  const results: SearchResult[] = [];
  for (const entry of searchIndex) {
    const score = scoreEntry(entry, tokenVariants);
    if (score > 0) results.push({ ...entry, score });
  }

  results.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
  return results.slice(0, RESULT_LIMIT);
}

/**
 * Group ranked results by category, preserving relevance order within each group and using
 * the order categories first appear in as the group order.
 */
export function groupByCategory(results: SearchResult[]): { category: string; results: SearchResult[] }[] {
  const order: string[] = [];
  const groups = new Map<string, SearchResult[]>();

  for (const r of results) {
    if (!groups.has(r.category)) {
      groups.set(r.category, []);
      order.push(r.category);
    }
    groups.get(r.category)!.push(r);
  }

  return order.map((category) => ({ category, results: groups.get(category)! }));
}
