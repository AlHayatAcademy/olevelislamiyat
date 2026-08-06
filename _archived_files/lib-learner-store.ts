"use client";

// Client-side "learner profile" store: bookmarks, recently viewed, continue-learning, and
// per-section progress. localStorage-backed for now, but the schema is designed to migrate to
// an account-backed store later without breaking compatibility — see
// docs/Content-System-Design.md's content-vs-learner-progress separation.
//
// Content is referenced by stable (type, paper, section, slug) fields only, never by array index
// or any value that could change if content is re-authored or re-tagged - matching how the rest
// of the site links content together (see data/topics, data/questions).

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "olevelislamiyat:learner:v1";
const RECENTLY_VIEWED_LIMIT = 12;

// Must match the prefix Quiz.tsx's storageKey() writes to (components/Quiz.tsx). Not imported
// directly since Quiz.tsx doesn't export it and quiz progress intentionally stays in its own
// per-quiz keys (unchanged, pre-existing behavior) - this store only *reads* that data to build
// dashboard summaries, it never writes to it.
const QUIZ_STORAGE_PREFIX = "olevelislamiyat:quiz:";

export type ContentType = "topic";

export interface ContentRef {
  type: ContentType;
  paper: 1 | 2;
  section: string;
  slug: string;
  title: string;
  url: string;
}

export interface RecentlyViewedEntry extends ContentRef {
  viewedAt: string; // ISO timestamp
}

export interface BookmarkEntry extends ContentRef {
  bookmarkedAt: string; // ISO timestamp
}

export interface LearnerProfile {
  version: 1;
  recentlyViewed: RecentlyViewedEntry[]; // most-recent first, capped at RECENTLY_VIEWED_LIMIT
  bookmarks: BookmarkEntry[];
  viewedTopicKeys: string[]; // unique contentKey() values, for per-section progress
  lastVisited: RecentlyViewedEntry | null; // drives "Continue Learning"
}

function emptyProfile(): LearnerProfile {
  return { version: 1, recentlyViewed: [], bookmarks: [], viewedTopicKeys: [], lastVisited: null };
}

export function contentKey(ref: Pick<ContentRef, "type" | "paper" | "section" | "slug">): string {
  return `${ref.type}:${ref.paper}:${ref.section}:${ref.slug}`;
}

function loadProfile(): LearnerProfile {
  if (typeof window === "undefined") return emptyProfile();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProfile();
    const parsed = JSON.parse(raw) as Partial<LearnerProfile>;
    // Defensive defaults, in case a future schema version adds fields - old data still loads.
    return {
      version: 1,
      recentlyViewed: parsed.recentlyViewed ?? [],
      bookmarks: parsed.bookmarks ?? [],
      viewedTopicKeys: parsed.viewedTopicKeys ?? [],
      lastVisited: parsed.lastVisited ?? null,
    };
  } catch {
    return emptyProfile();
  }
}

function saveProfile(profile: LearnerProfile) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    window.dispatchEvent(new Event("learner-store:change"));
  } catch {
    // localStorage unavailable (private browsing, quota) - fail silently, matching Quiz.tsx.
  }
}

/** Record that a piece of content was viewed - updates recently-viewed, the viewed-set used for
 * progress tracking, and "continue learning". Call once per page view (see RecordView.tsx). */
export function recordView(ref: ContentRef) {
  const profile = loadProfile();
  const key = contentKey(ref);
  const entry: RecentlyViewedEntry = { ...ref, viewedAt: new Date().toISOString() };

  const recentlyViewed = [entry, ...profile.recentlyViewed.filter((e) => contentKey(e) !== key)].slice(
    0,
    RECENTLY_VIEWED_LIMIT,
  );
  const viewedTopicKeys = profile.viewedTopicKeys.includes(key)
    ? profile.viewedTopicKeys
    : [...profile.viewedTopicKeys, key];

  saveProfile({ ...profile, recentlyViewed, viewedTopicKeys, lastVisited: entry });
}

/** Toggle a bookmark on/off. Returns the new bookmarked state. */
export function toggleBookmark(ref: ContentRef): boolean {
  const profile = loadProfile();
  const key = contentKey(ref);
  const exists = profile.bookmarks.some((b) => contentKey(b) === key);

  const bookmarks = exists
    ? profile.bookmarks.filter((b) => contentKey(b) !== key)
    : [{ ...ref, bookmarkedAt: new Date().toISOString() }, ...profile.bookmarks];

  saveProfile({ ...profile, bookmarks });
  return !exists;
}

export function isBookmarked(ref: Pick<ContentRef, "type" | "paper" | "section" | "slug">): boolean {
  const key = contentKey(ref);
  return loadProfile().bookmarks.some((b) => contentKey(b) === key);
}

export function getBookmarks(): BookmarkEntry[] {
  return loadProfile().bookmarks;
}

export function getRecentlyViewed(): RecentlyViewedEntry[] {
  return loadProfile().recentlyViewed;
}

export function getLastVisited(): RecentlyViewedEntry | null {
  return loadProfile().lastVisited;
}

/** Number of distinct topics viewed within a given paper/section, for progress bars. */
export function getViewedCountForSection(paper: 1 | 2, section: string): number {
  const prefix = `topic:${paper}:${section}:`;
  return loadProfile().viewedTopicKeys.filter((k) => k.startsWith(prefix)).length;
}

export interface QuizStatSummary {
  quizId: string;
  bestScorePercent: number;
  lastAttemptPercent: number;
  attempts: number;
}

/** Reads every per-quiz progress record Quiz.tsx has written to localStorage, for the dashboard.
 * Read-only - never writes to quiz keys, so Quiz.tsx's own storage format stays authoritative. */
export function getQuizStatsSummary(): QuizStatSummary[] {
  if (typeof window === "undefined") return [];
  const results: QuizStatSummary[] = [];
  try {
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (!key || !key.startsWith(QUIZ_STORAGE_PREFIX)) continue;
      const raw = window.localStorage.getItem(key);
      if (!raw) continue;
      const parsed = JSON.parse(raw) as {
        bestScorePercent?: number;
        lastAttemptPercent?: number;
        attempts?: number;
      };
      if (typeof parsed.bestScorePercent !== "number" || typeof parsed.attempts !== "number") continue;
      results.push({
        quizId: key.slice(QUIZ_STORAGE_PREFIX.length),
        bestScorePercent: parsed.bestScorePercent,
        lastAttemptPercent: parsed.lastAttemptPercent ?? parsed.bestScorePercent,
        attempts: parsed.attempts,
      });
    }
  } catch {
    return results;
  }
  return results;
}

// --- Reactive hook -----------------------------------------------------------------------
// A cached read-through snapshot, so components can subscribe to changes made by *other*
// components (e.g. a BookmarkButton toggling a bookmark updates a dashboard already on screen).
// useSyncExternalStore requires getSnapshot to return a stable reference when nothing changed -
// re-parsing JSON on every call would return a new object each time and cause an infinite
// render loop, so the cache below only re-parses when the raw stored string actually changes.

let cachedRaw: string | null | undefined;
let cachedProfile: LearnerProfile = emptyProfile();

function getSnapshot(): LearnerProfile {
  if (typeof window === "undefined") return cachedProfile;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedProfile = loadProfile();
  }
  return cachedProfile;
}

function getServerSnapshot(): LearnerProfile {
  return emptyProfile();
}

function subscribe(onStoreChange: () => void): () => void {
  window.addEventListener("learner-store:change", onStoreChange);
  window.addEventListener("storage", onStoreChange); // keep multiple open tabs in sync
  return () => {
    window.removeEventListener("learner-store:change", onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

/** Reactive read of the learner profile - re-renders the calling component whenever any
 * bookmark/view/etc. is recorded, including by a different component on the same page. */
export function useLearnerProfile(): LearnerProfile {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
