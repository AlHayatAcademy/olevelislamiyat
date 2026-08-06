"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { paper1Sections, paper2Sections } from "@/data/syllabus";
import { SearchFiltersPreference, saveSearchFilters, getSearchFilters } from "@/lib/learner-store";

const CONTENT_TYPES = ["lesson", "past-paper", "model-answer", "reference", "quiz", "page"];
const PAPERS = [1, 2] as const;
const AVAILABLE_YEARS = [2019, 2020, 2021, 2022, 2023, 2024, 2025];

interface SearchFiltersProps {
  onFiltersChange: (filters: SearchFiltersPreference) => void;
}

export function SearchFilters({ onFiltersChange }: SearchFiltersProps) {
  const [filters, setFilters] = useState<SearchFiltersPreference>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = getSearchFilters();
    if (saved) setFilters(saved);
    setMounted(true);
  }, []);

  const allSections = Array.from(
    new Set([...paper1Sections, ...paper2Sections].map((s) => s.slug))
  ).sort();

  const updateFilter = (key: keyof SearchFiltersPreference, value: string | number | (string | number)[] | undefined) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    saveSearchFilters(updated);
    onFiltersChange(updated);
  };

  const toggleArrayValue = (key: keyof SearchFiltersPreference, value: string | number): void => {
    const current = (filters[key] as (string | number)[]) || [];
    const updated: (string | number)[] = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    updateFilter(key, updated.length > 0 ? updated : undefined);
  };

  const clearAll = () => {
    setFilters({});
    saveSearchFilters({});
    onFiltersChange({});
  };

  const hasActiveFilters = Object.values(filters).some((v) => v && (Array.isArray(v) ? v.length > 0 : true));

  if (!mounted) return null;

  return (
    <div className="space-y-6 rounded-lg border border-border bg-surface-soft p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-sm font-semibold text-text">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 text-xs text-text-muted hover:text-primary transition-colors"
          >
            <X size={14} aria-hidden="true" />
            Clear all
          </button>
        )}
      </div>

      {/* Paper Filter */}
      <fieldset className="space-y-2">
        <legend className="text-xs font-semibold uppercase tracking-wide text-text-muted">Paper</legend>
        <div className="space-y-1">
          {PAPERS.map((paper) => (
            <label key={paper} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={(filters.papers || []).includes(paper)}
                onChange={() => toggleArrayValue("papers", paper as string | number)}
                className="rounded border-border"
              />
              <span className="text-sm text-text">Paper {paper}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Type Filter */}
      <fieldset className="space-y-2">
        <legend className="text-xs font-semibold uppercase tracking-wide text-text-muted">Type</legend>
        <div className="space-y-1">
          {CONTENT_TYPES.map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={(filters.types || []).includes(type)}
                onChange={() => toggleArrayValue("types", type)}
                className="rounded border-border"
              />
              <span className="text-sm text-text capitalize">{type.replace("-", " ")}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Section Filter */}
      <fieldset className="space-y-2">
        <legend className="text-xs font-semibold uppercase tracking-wide text-text-muted">Section</legend>
        <div className="space-y-1 max-h-40 overflow-y-auto">
          {allSections.map((section) => (
            <label key={section} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={(filters.sections || []).includes(section)}
                onChange={() => toggleArrayValue("sections", section)}
                className="rounded border-border"
              />
              <span className="text-sm text-text">{section}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Year Filter */}
      <fieldset className="space-y-2">
        <legend className="text-xs font-semibold uppercase tracking-wide text-text-muted">Year</legend>
        <div className="space-y-1">
          {AVAILABLE_YEARS.map((year) => (
            <label key={year} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={(filters.years || []).includes(year)}
                onChange={() => toggleArrayValue("years", year as string | number)}
                className="rounded border-border"
              />
              <span className="text-sm text-text">{year}</span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}