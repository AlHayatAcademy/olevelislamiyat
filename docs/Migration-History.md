# Migration History

Log of significant structural changes to the repository — the "what changed and when" companion
to [Decision-Log.md](./Decision-Log.md)'s "why". Historical build-session notes with more detail
than summarized here are preserved in [`docs/archive/`](./archive/).

## Data layer

- **`data/questions.ts` (6,917 lines) → `data/questions/{2021..2025}.ts` + `types.ts` +
  `index.ts`.** Verified byte-for-byte identical array output before/after. All 13 existing
  importers needed zero changes (bare `@/data/questions` specifier resolves to the new
  `index.ts` via directory-index resolution).
- **`data/topics` split by syllabus-section group**, each with its own file, plus shared
  `types.ts` and an `index.ts` barrel exporting `allTopics` and the lookup helpers.
- **351 verbatim past-paper questions** transcribed from `source/07-word-extractions/*.docx`,
  covering May/June and Oct/Nov series 2021–2025 (one known gap: Oct/Nov 2025 Paper 1 Variant 12
  has no verbatim source among the extraction files).
- **99 syllabus subtopics ↔ 99 lessons**, verified 1:1 against the official Cambridge syllabus —
  now enforced by `tests/unit/topics-and-syllabus.test.ts` rather than only a manual audit.

## SEO layer

- JSON-LD generation centralized: `lib/seo.ts` gained `faqSchema()` and `articleSchema()`,
  `components/JsonLd.tsx` added as the shared `<script>` wrapper. 13 files updated to use them;
  verified byte-identical rendered JSON-LD output across 10 representative routes before/after.

## Accessibility layer

- Header mega-menu and mobile nav: added `inert` to hidden panels (previously tab-focusable while
  invisible) and Escape-to-close (previously only closeable by click).
- Quiz radio inputs: restored a visible focus ring (previously `focus-visible:outline-none` with
  no replacement).
- `<article>` landmarks added to standalone content pages: `TopicPage.tsx`, and via a new opt-in
  `article` prop on `PageShell` — applied to `model-answers/[id]`, `past-papers/question/[id]`,
  `quotes-references/[category]/[id]`.
- `SectionHub.tsx`'s subtopic list and "Browse Other Sections" grid converted from `div.map()` to
  `<ul>/<li>`.
- `revision/key-dates` table gained a `<caption>` (already had `thead`/`tbody`/`th scope="col"`).
- Contact form: `autoComplete` attributes added, `role="alert"`/`role="status"` added so
  validation/success messages are announced to screen readers.

## Testing infrastructure

- Vitest + Playwright added from scratch (no test framework existed before). 61 unit/integration
  tests, 23 e2e tests, both wired into CI. See [Testing.md](./Testing.md).

## Repository cleanup

- **Removed 2 confirmed accidental-duplicate source files** (byte-identical `md5sum` match to
  their non-suffixed counterparts, already flagged in the archived `source-conflicts.md`, and
  referenced nowhere in `data/` under their `(1)` filename):
  - `source/07-word-extractions/2058_November_2025_Grade_Thresholds_and_Mark_Scheme_11 (1).docx`
  - `source/07-word-extractions/2058_O_N_2025_Paper_2_Extracted_Questions (1).docx`
- A stray Word lock file (`~$per-2-content.docx`) was already removed in an earlier commit
  (`c88a663`), before this documentation existed.
- 20 build-log/audit markdown files consolidated: moved into `docs/archive/` (preserved, not
  deleted — see below) and superseded by the structured docs in `docs/` (`Architecture.md`,
  `Developer-Guide.md`, `Content-Architecture.md`, `Deployment.md`, `Testing.md`, `Roadmap.md`,
  `Contributing.md`, `Decision-Log.md`, this file).

## Archived documents

The following are preserved in `docs/archive/` as historical project record — each was a
point-in-time build/audit log, superseded by the consolidated docs above:

`about-legal-resources-build.md`, `build-status.md`, `cloudflare-1102-fix.md`,
`completeness-report.md`, `deployment-cloudflare.md`, `ia-polish-audit.md`,
`keyword-page-map.md`, `keyword-research.md`, `model-answers-and-references-build.md`,
`past-paper-coverage-audit.md`, `past-paper-extraction-log.md`, `pre-build-audit.md`,
`quizzes-and-revision-build.md`, `remaining-gaps-build.md`, `seo-architecture.md`,
`seo-checklist.md`, `source-audit.md`, `source-conflicts.md`, `syllabus-coverage-audit.md`,
`ui-polish-audit.md`.

If you're looking for detail beyond what's in the current docs (e.g. the full per-session
extraction file mapping, or the original commercial-textbook copyright flag on
`paper-2-content.docx`), check the relevant archived file first — most of it is still accurate,
just no longer the primary reference.
