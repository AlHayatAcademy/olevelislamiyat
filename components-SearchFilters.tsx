"use client";

import { paper1Sections, paper2Sections } from "@/data/syllabus";
import { type SearchFiltersPreference } from "@/lib/learner-store";

interface SearchFiltersProps {
  filters: SearchFiltersPreference;
  onFilterChange: (filters: SearchFiltersPreference) => void;
  availableYears?: number[];
}

const RESULT_TYPES = [
  { value: "lesson", label: "Lessons" },
  { value: "past-paper", label: "Past Paper Questions" },
  { value: "model-answer", label: "Model Answers" },
  { value: "quiz", label: "Quizzes" },
  { value: "reference", label: "References" },
];

export function SearchFilters({ filters, onFilterChange, availableYears = [] }: SearchFiltersProps) {
  const handlePaperToggle = (paper: 1 | 2) => {
    const papers = filters.papers ?? [];
    const updated = papers.includes(paper) ? papers.filter((p) => p !== paper) : [...papers, paper];
    onFilterChange({ ...filters, papers: updated.length > 0 ? updated : undefined });
  };

  const handleTypeToggle = (type: string) => {
    const types = filters.types ?? [];
    const updated = types.includes(type) ? types.filter((t) => t !== type) : [...types, type];
    onFilterChange({ ...filters, types: updated.length > 0 ? updated : undefined });
  };

  const handleSectionToggle = (section: string) => {
    const sections = filters.sections ?? [];
    const updated = sections.includes(section) ? sections.filter((s) => s !== section) : [...sections, section];
    onFilterChange({ ...filters, sections: updated.length > 0 ? updated : undefined });
  };

  const handleYearToggle = (year: number) => {
    const years = filters.years ?? [];
    const updated = years.includes(year) ? years.filter((y) => y !== year) : [...years, year];
    onFilterChange({ ...filters, years: updated.length > 0 ? updated : undefined });
  };

  const handleClear = () => {
    onFilterChange({});
  };

  const isActive = (filters.papers?.length ?? 0) + (filters.types?.length ?? 0) + (filters.sections?.length ?? 0) + (filters.years?.length ?? 0) > 0;

  return (
    <div className="space-y-6 rounded-xl border border-border bg-surface p-6 shadow-soft">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-text">Filters</h2>
        {isActive && (
          <button
            type="button"
            onClick={handleClear}
            className="text-xs font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Paper filter */}
      <div>
        <h3 className="text-sm font-medium text-text">Paper</h3>
        <div className="mt-2 space-y-2">
          {[1, 2].map((paper) => (
            <label key={paper} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.papers?.includes(paper as 1 | 2) ?? false}
                onChange={() => handlePaperToggle(paper as 1 | 2)}
                className="h-4 w-4 rounded border-border text-primary focus-visible:ring-2 focus-visible:ring-primary"
              />
              <span className="text-sm text-text">Paper {paper}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Type filter */}
      <div>
        <h3 className="text-sm font-medium text-text">Content Type</h3>
        <div className="mt-2 space-y-2">
          {RESULT_TYPES.map((type) => (
            <label key={type.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.types?.includes(type.value) ?? false}
                onChange={() => handleTypeToggle(type.value)}
                className="h-4 w-4 rounded border-border text-primary focus-visible:ring-2 focus-visible:ring-primary"
              />
              <span className="text-sm text-text">{type.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Section filter */}
      <div>
        <h3 className="text-sm font-medium text-text">Section</h3>
        <div className="mt-2 max-h-48 space-y-2 overflow-y-auto">
          {[...paper1Sections, ...paper2Sections].map((section) => (
            <label key={section.slug} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.sections?.includes(section.slug) ?? false}
                onChange={() => handleSectionToggle(section.slug)}
                className="h-4 w-4 rounded border-border text-primary focus-visible:ring-2 focus-visible:ring-primary"
              />
              <span className="text-sm text-text">{section.title}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Year filter */}
      {availableYears.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-text">Year</h3>
          <div className="mt-2 space-y-2">
            {availableYears.sort((a, b) => b - a).map((year) => (
              <label key={year} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.years?.includes(year) ?? false}
                  onChange={() => handleYearToggle(year)}
                  className="h-4 w-4 rounded border-border text-primary focus-visible:ring-2 focus-visible:ring-primary"
                />
                <span className="text-sm text-text">{year}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
