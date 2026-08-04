"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { RotateCcw } from "lucide-react";
import type { PastPaperQuestion } from "@/data/questions";

const aoOptions = ["AO1", "AO2"] as const;

/**
 * Client-side sort + filter for a flat list of past-paper questions, used on the
 * topical subtopic and general/whole-section question lists. Filters and sorts
 * operate purely over the real questions passed in as props — no fabricated data.
 */
export function TopicalQuestionList({ questions }: { questions: PastPaperQuestion[] }) {
  const [year, setYear] = useState<number | "all">("all");
  const [ao, setAo] = useState<string | "all">("all");
  const [sort, setSort] = useState<"year-desc" | "year-asc" | "marks-desc" | "marks-asc">(
    "year-desc"
  );

  const years = useMemo(
    () => Array.from(new Set(questions.map((q) => q.year))).sort((a, b) => b - a),
    [questions]
  );

  const filtered = useMemo(() => {
    const list = questions.filter((q) => {
      const yearMatch = year === "all" || q.year === year;
      const aoMatch = ao === "all" || q.ao === ao;
      return yearMatch && aoMatch;
    });
    const sorted = [...list].sort((a, b) => {
      switch (sort) {
        case "year-asc":
          return a.year - b.year;
        case "marks-desc":
          return b.marks - a.marks;
        case "marks-asc":
          return a.marks - b.marks;
        case "year-desc":
        default:
          return b.year - a.year;
      }
    });
    return sorted;
  }, [questions, year, ao, sort]);

  const hasFilter = year !== "all" || ao !== "all";

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-surface-soft p-4">
        <label className="flex items-center gap-2 text-sm">
          <span className="font-medium text-text-muted">Year</span>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value === "all" ? "all" : Number(e.target.value))}
            className="rounded-md border border-border bg-surface px-2 py-1.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <option value="all">All</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm">
          <span className="font-medium text-text-muted">AO</span>
          <select
            value={ao}
            onChange={(e) => setAo(e.target.value)}
            className="rounded-md border border-border bg-surface px-2 py-1.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <option value="all">All</option>
            {aoOptions.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm">
          <span className="font-medium text-text-muted">Sort</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="rounded-md border border-border bg-surface px-2 py-1.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <option value="year-desc">Newest first</option>
            <option value="year-asc">Oldest first</option>
            <option value="marks-desc">Marks: high to low</option>
            <option value="marks-asc">Marks: low to high</option>
          </select>
        </label>
        {hasFilter && (
          <button
            type="button"
            onClick={() => {
              setYear("all");
              setAo("all");
            }}
            className="ml-auto inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <RotateCcw aria-hidden="true" size={14} />
            Reset
          </button>
        )}
      </div>

      <ul className="mt-4 space-y-2">
        {filtered.length === 0 && (
          <p className="text-sm text-text-muted">No questions match the selected filters.</p>
        )}
        {filtered.map((q) => (
          <li key={q.id}>
            <Link
              href={`/past-papers/question/${q.id}`}
              className="block rounded-md border border-surface-soft px-4 py-3 hover:border-primary transition-colors"
            >
              <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-text-muted">
                <span className="rounded bg-primary/10 px-1.5 py-0.5 font-medium text-primary">
                  {q.session} {q.year}
                </span>
                <span>Paper {q.paper} ({q.variant})</span>
                <span>
                  Q{q.questionNumber}
                  {q.part !== "whole" ? `(${q.part})` : ""}
                </span>
                <span className="rounded bg-secondary/10 px-1.5 py-0.5 font-medium text-secondary">
                  {q.marks} marks
                </span>
                <span className="rounded bg-surface-soft px-1.5 py-0.5">{q.ao}</span>
              </span>
              <p className="mt-1.5 font-medium">{q.topicHint}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
