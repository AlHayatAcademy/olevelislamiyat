"use client";

import Link from "next/link";
import { BookOpen, Bookmark, Clock, ListChecks, ArrowRight } from "lucide-react";
import { useLearnerProfile, getViewedCountForSection, getQuizStatsSummary } from "@/lib/learner-store";

export interface SectionTotal {
  paper: 1 | 2;
  slug: string;
  title: string;
  total: number;
}

function formatRelativeDate(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const diffMins = Math.round(diffMs / 60000);
  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.round(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.round(diffHours / 24);
  if (diffDays < 30) return `${diffDays}d ago`;
  return new Date(iso).toLocaleDateString();
}

function SectionProgressRow({ paper, slug, title, total }: SectionTotal) {
  const viewed = getViewedCountForSection(paper, slug);
  const percent = total > 0 ? Math.round((viewed / total) * 100) : 0;

  return (
    <li>
      <Link
        href={`/paper-${paper}/${slug}`}
        className="block rounded-lg border border-border bg-surface p-3 text-sm transition-colors hover:border-primary hover:bg-surface-soft"
      >
        <div className="flex items-center justify-between gap-3">
          <span className="font-medium text-text">{title}</span>
          <span className="shrink-0 text-xs text-text-muted">
            {viewed}/{total}
          </span>
        </div>
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-surface-soft">
          <div className="h-full rounded-full bg-success transition-all duration-300" style={{ width: `${percent}%` }} />
        </div>
      </Link>
    </li>
  );
}

export function DashboardClient({ sections }: { sections: SectionTotal[] }) {
  // Subscribes so the whole dashboard updates live if a bookmark/view changes elsewhere.
  const profile = useLearnerProfile();
  const quizStats = getQuizStatsSummary();

  const hasAnyActivity =
    profile.recentlyViewed.length > 0 || profile.bookmarks.length > 0 || quizStats.length > 0;

  if (!hasAnyActivity) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-surface-soft p-8 text-center">
        <BookOpen className="mx-auto text-text-muted" size={32} aria-hidden="true" />
        <p className="mt-4 font-heading text-lg font-semibold text-text">
          Your dashboard is empty — for now
        </p>
        <p className="mt-2 text-sm text-text-muted">
          Visit a lesson, bookmark a topic, or take a quiz, and your progress will start showing up
          here automatically.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/paper-1"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            Start with Paper 1
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link
            href="/quizzes"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-text transition-colors hover:border-primary hover:text-primary"
          >
            Try a quiz
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Continue learning */}
      {profile.lastVisited && (
        <section className="lg:col-span-2">
          <h2 className="flex items-center gap-2 font-heading text-lg font-semibold text-text">
            <BookOpen size={18} className="text-primary" aria-hidden="true" />
            Continue learning
          </h2>
          <Link
            href={profile.lastVisited.url}
            className="mt-3 flex items-center justify-between gap-4 rounded-xl border border-primary/20 bg-primary/5 px-5 py-4 transition-colors hover:bg-primary/10"
          >
            <span>
              <span className="block font-semibold text-text">{profile.lastVisited.title}</span>
              <span className="block text-sm text-text-muted">
                Last viewed {formatRelativeDate(profile.lastVisited.viewedAt)}
              </span>
            </span>
            <ArrowRight size={18} className="shrink-0 text-primary" aria-hidden="true" />
          </Link>
        </section>
      )}

      {/* Progress by section */}
      <section>
        <h2 className="flex items-center gap-2 font-heading text-lg font-semibold text-text">
          <ListChecks size={18} className="text-primary" aria-hidden="true" />
          Progress by section
        </h2>
        <ul className="mt-3 space-y-2">
          {sections.map((s) => (
            <SectionProgressRow key={`${s.paper}-${s.slug}`} {...s} />
          ))}
        </ul>
      </section>

      {/* Quiz stats */}
      <section>
        <h2 className="flex items-center gap-2 font-heading text-lg font-semibold text-text">
          <ListChecks size={18} className="text-primary" aria-hidden="true" />
          Quiz results
        </h2>
        {quizStats.length === 0 ? (
          <p className="mt-3 text-sm text-text-muted">
            No quizzes attempted yet.{" "}
            <Link href="/quizzes" className="text-primary hover:underline">
              Browse quizzes
            </Link>
            .
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            {quizStats.map((q) => (
              <li
                key={q.quizId}
                className="flex items-center justify-between rounded-lg border border-border bg-surface p-3 text-sm"
              >
                <Link href={`/quizzes/${q.quizId}`} className="font-medium text-text hover:text-primary">
                  {q.quizId.replace(/-/g, " ")}
                </Link>
                <span className="shrink-0 text-xs text-text-muted">
                  Best {q.bestScorePercent}% &middot; {q.attempts} attempt{q.attempts === 1 ? "" : "s"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Bookmarks */}
      <section>
        <h2 className="flex items-center gap-2 font-heading text-lg font-semibold text-text">
          <Bookmark size={18} className="text-primary" aria-hidden="true" />
          Bookmarks
        </h2>
        {profile.bookmarks.length === 0 ? (
          <p className="mt-3 text-sm text-text-muted">
            No bookmarks yet — look for the &ldquo;Bookmark this lesson&rdquo; button on any lesson page.
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            {profile.bookmarks.map((b) => (
              <li key={b.url}>
                <Link
                  href={b.url}
                  className="block rounded-lg border border-border bg-surface p-3 text-sm font-medium text-text transition-colors hover:border-primary hover:text-primary"
                >
                  {b.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Recently viewed */}
      <section>
        <h2 className="flex items-center gap-2 font-heading text-lg font-semibold text-text">
          <Clock size={18} className="text-primary" aria-hidden="true" />
          Recently viewed
        </h2>
        {profile.recentlyViewed.length === 0 ? (
          <p className="mt-3 text-sm text-text-muted">Nothing viewed yet.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {profile.recentlyViewed.map((r) => (
              <li key={r.url} className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface p-3 text-sm">
                <Link href={r.url} className="font-medium text-text hover:text-primary">
                  {r.title}
                </Link>
                <span className="shrink-0 text-xs text-text-muted">{formatRelativeDate(r.viewedAt)}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
