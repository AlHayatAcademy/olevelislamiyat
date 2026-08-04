// Synonym groups for site-wide search. Each group is a set of interchangeable spellings/terms
// for the same underlying concept; a query containing any term in a group should also match
// content containing any other term in the same group.
//
// Coverage is intentionally scoped to the terms specified in the search feature brief — not an
// exhaustive Islamic-terminology glossary.

export const synonymGroups: string[][] = [
  ["islamiyat", "islamiat"],
  ["quran", "qur'an", "quran'", "koran"],
  ["hadith", "ahadith"],
  ["makka", "makkah", "mecca"],
  ["madina", "madinah", "medina"],
  ["salah", "salat", "prayer", "namaz"],
  ["zakat", "zakah"],
  ["sawm", "fasting", "roza"],
  ["hajj", "pilgrimage"],
  ["ijma", "consensus"],
  ["qiyas", "analogy"],
  ["caliph", "khalifa", "khalifah"],
];

// Normalize a token for lookup: lowercase and strip common punctuation (apostrophes etc.)
// so "Qur'an" and "quran" hash to the same key.
function normalizeToken(token: string): string {
  return token.toLowerCase().replace(/['’]/g, "").trim();
}

// Map from every normalized term -> the full group (including itself), built once.
const termToGroup = new Map<string, string[]>();
for (const group of synonymGroups) {
  const normalizedGroup = group.map(normalizeToken);
  for (const term of normalizedGroup) {
    termToGroup.set(term, normalizedGroup);
  }
}

/**
 * Given a single word, return all its synonym variants (including the word itself,
 * normalized). If the word has no synonym group, returns just the normalized word.
 */
export function expandTerm(term: string): string[] {
  const normalized = normalizeToken(term);
  return termToGroup.get(normalized) ?? [normalized];
}

/**
 * Expand a whitespace-separated query into an array of token-variant arrays, one per token,
 * e.g. "quran hajj" -> [["quran","qur'an","koran"], ["hajj","pilgrimage"]] (values normalized).
 */
export function expandQueryTokens(query: string): string[][] {
  return query
    .split(/\s+/)
    .map((t) => t.trim())
    .filter(Boolean)
    .map(expandTerm);
}

export const synonymGroupCount = synonymGroups.length;
