"use client";

import { useMemo, useState } from "react";
import { FileStack, ListChecks, RotateCcw } from "lucide-react";
import { Button } from "@/components/Button";

export interface YearStat {
  year: number;
  sessions: string[];
  papers: number[];
  questionCount: number;
}

const sessionOptions = ["May/June", "Oct/Nov"] as const;
const paperOptions = [1, 2] as const;

/**
 * Client-side filter + card list for the year-wise past papers index.
 * Filters operate on the real, precomputed per-year question counts passed
 * in as props — no fabricated data, purely visual filtering of what exists.
 */
export function PastPapersYearList({ years }: { years: YearStat[] }) {
  const [paper, setPaper] = useState<number | "all">("all");
  const [session, setSession] = useState<string | "all">("all");

  const filtered = useMemo(
    () =>
      years.filter((y) => {
        const paperMatch = paper === "all" || y.papers.includes(paper);
        const sessionMatch = session === "all" || y.sessions.includes(session);
        return paperMatch && sessionMatch;
      }),
    [years, paper, session]
  );

  const reset = () => {
    setPaper("all");
    setSession("all");
  };

  const hasFilter = paper !== "all" || session !== "all";

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-surface-soft p-4">
        <label className="flex items-center gap-2 text-sm">
          <span className="font-medium text-text-muted">Paper</span>
          <select
            value={paper}
            onChange={(e) => setPaper(e.target.value === "all" ? "all" : Number(e.target.value))}
            className="rounded-md border border-border bg-surface px-2 py-1.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <option value="all">All</option>
            {paperOptions.map((p) => (
              <option key={p} value={p}>
                Paper {p}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm">
          <span className="font-medium text-text-muted">Session</span>
          <select
            value={session}
            onChange={(e) => setSession(e.target.value)}
            className="rounded-md border border-border bg-surface px-2 py-1.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <option value="all">All</option>
            {sessionOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        {hasFilter && (
          <button
            type="button"
            onClick={reset}
            className="ml-auto inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <RotateCcw aria-hidden="true" size={14} />
            Reset
          </button>
        )}
      </div>

      <div className="mt-6 space-y-4">
        {filtered.length === 0 && (
          <p className="text-sm text-text-muted">No years match the selected filters.</p>
        )}
        {filtered.map((y) => (
          <div
            key={y.year}
            className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-5 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 font-heading text-lg font-bold text-primary">
                {y.year}
              </span>
              <div>
                <p className="font-heading font-semibold text-text">
                  {y.sessions.join(" & ")} {y.year}
                </p>
                <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-muted">
                  <span className="inline-flex items-center gap-1">
                    <FileStack aria-hidden="true" size={13} />
                    Papers {y.papers.join(", ")}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <ListChecks aria-hidden="true" size={13} />
                    {y.questionCount} question{y.questionCount === 1 ? "" : "s"} documented
                  </span>
                </p>
              </div>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <Button href={`/past-papers/year-wise/${y.year}`} variant="outline" size="sm">
                View Questions
              </Button>
              <Button href="/past-papers#browse-by-topic" variant="ghost" size="sm">
                Browse Topics
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
