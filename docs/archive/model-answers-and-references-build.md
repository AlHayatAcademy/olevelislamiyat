# Model Answers, Past-Paper Questions & References — Build Notes

Date: 2026-08-03

## Scope of this pass

This session built Part A (Past Papers question index + browsing routes), Part B (Model
Answers), and Part C (Quotes/References bank), plus wired all three stub pages
(`app/past-papers`, `app/model-answers`, `app/quotes-references`) into full functioning route
trees. It deliberately did not touch `data/topics/*`, `docs/build-status.md`, or
`docs/syllabus-coverage-audit.md`, which another concurrent session owns.

## Part A — Past papers

- `data/questions.ts`: 21 documented questions spanning 2021, 2022, 2023, 2024, 2025, both
  May/June and Oct/Nov sessions, both Paper 1 and Paper 2, across 7 of the 8 syllabus sections
  (all except the two "set passage" appendix-style sections are covered by name — see
  per-section counts via `/past-papers/topical/<section>`).
- Every `prompt` field is an original paraphrase written from the topic/task type described in
  the word-extracted examiner reports (`source/07-word-extractions/*.docx`) and cross-checked
  against the raw PDFs in `source/04-past-papers/`. No question is a verbatim transcription of
  official wording. Two entries carry `[VERIFY: ...]` notes on session/variant pairing where the
  extraction filename naming was ambiguous and should be re-confirmed against the raw PDF
  metadata before being treated as exam-certain.
- This is a curated sample, not full coverage of all ~40 question papers / ~200+ individual
  parts across 2021–2025. A future pass should extend `data/questions.ts` to cover every part of
  every year, ideally driven by a script that walks all `source/07-word-extractions/*.docx`
  files systematically rather than manual selection.
- Routes built: `app/past-papers/page.tsx` (year + topic index), 
  `app/past-papers/year-wise/[year]/page.tsx`, `app/past-papers/topical/[section]/page.tsx`,
  `app/past-papers/question/[id]/page.tsx` (21 static question-detail pages).

## Part B — Model answers

- `data/model-answers.ts`: 10 full model answers, covering a mix of AO1 (8/10-mark) and AO2
  (4/6-mark) questions across both Paper 1 (Qur'an history, Seerah/Hijrah) and Paper 2 (Hadith
  structure/authentication, Rightly Guided Caliphs, Articles of Faith, Pillars of Islam).
- Each entry has: answer plan (bullet points), full original sample answer (bullet points),
  a marking-point breakdown with per-point mark allocation summing to the question's total
  marks, strengths, areas for improvement, and a self-assessment checklist. None of the prose is
  copied or closely paraphrased from any mark scheme — it is written from first principles based
  on the topic knowledge and general understanding of what AO1 (accurate recall/detail) and AO2
  (reasoned opinion/evaluation) reward at this level.
- A small number of specific claimed facts (e.g. the spider's-web tradition at Cave Thawr, the
  exact names of the grave-questioning angels) are flagged inline with `[VERIFY: ...]` rather
  than stated as certain, per the no-fabrication instruction.
- Routes built: `app/model-answers/page.tsx` (index), `app/model-answers/[id]/page.tsx` (10
  static detail pages), cross-linked from the matching question-detail page.

## Part C — Quotes / references bank

- `data/references.ts`: 29 entries across all 6 requested categories — Qur'anic References (5),
  Hadith References (4), Historical/Seerah Quotations (2), Companions & Caliphs (7), Articles of
  Faith (6), Pillars of Islam (5).
- Every `explanation` field is original prose, not copied from any mark scheme or textbook.
- Arabic text is **not included anywhere** in this pass — rather than risk transcribing verse
  text from memory, every Qur'anic/Hadith entry's `translation` field is a `[VERIFY: ...]`
  placeholder instructing a future editor to source a verified translation before publishing.
  Hadith reference citations follow the same rule: only well-established public facts (e.g. "the
  Hadith of Jibril," "the opening Hadith on intentions widely attributed to Sahih al-Bukhari")
  are stated, with exact book/number left as `[VERIFY: ...]` pending confirmation. No Hadith
  number, Qur'an verse text, or date was invented.
- Routes built: `app/quotes-references/page.tsx` (category index), 
  `app/quotes-references/[category]/page.tsx`, `app/quotes-references/[category]/[id]/page.tsx`
  (29 static detail pages), cross-linked back into the relevant `/paper-1/[section]` or
  `/paper-2/[section]` syllabus page.

## QA — command output

`npm run lint`:
```
> olevelislamiyat@0.1.0 lint
> eslint .
```
No errors or warnings.

`npm run typecheck`:
```
> olevelislamiyat@0.1.0 typecheck
> tsc --noEmit
```
No errors. (One fix made along the way: `ReferenceEntry.arabicVerified` changed from required to
optional since no entry in this pass has verified Arabic text yet.)

`npm run build`: succeeded — "Generating static pages (167/167)" — including all new routes:
- `/past-papers`, `/past-papers/year-wise/[year]` × 5, `/past-papers/topical/[section]` × 8,
  `/past-papers/question/[id]` × 21
- `/model-answers`, `/model-answers/[id]` × 10
- `/quotes-references`, `/quotes-references/[category]` × 6, `/quotes-references/[category]/[id]` × 29

## Counts summary

| Deliverable | Count |
| --- | --- |
| Past-paper questions documented | 21 |
| Model answers written | 10 |
| Reference entries | 29 |
| New/updated routes | ~11 route files, 60+ generated static pages |

## Pending for a future pass

1. **Full past-paper coverage.** Only 21 of an estimated 200+ individual question parts across
   2021–2025 are documented. A systematic extraction script over all
   `source/07-word-extractions/*.docx` files (and the remaining raw PDFs where no extraction
   exists) would let this scale to full coverage.
2. **Arabic text and exact translations.** No Arabic script or verse/Hadith translation was
   published in this pass — every Qur'anic and Hadith `translation` field is a `[VERIFY: ...]`
   placeholder. A future pass should source each from a verified, permissively-licensed
   translation (not copied from the copyrighted Paper 2 textbook) and fill these in, entry by
   entry.
3. **Exact Hadith numbering.** Several Hadith Reference entries cite collections/numbers as
   `[VERIFY: ...]` — these should be confirmed against a reliable Hadith database before being
   stated as fact.
4. **Two session/variant `[VERIFY]` flags** in `data/questions.ts` (2022 Oct/Nov and 2025
   Oct/Nov entries) where the source word-extraction filename's exact paper/session pairing
   should be re-confirmed against the corresponding raw PDF.
5. **More model answers.** Only 10 of the 21 documented questions have a full model answer;
   the remaining 11 could be filled in following the same template.
6. **Cross-linking with `data/topics/*`.** Once the concurrent topics-content session's work
   lands, past-paper questions/model-answers/references could link more tightly into the
   individual topic pages (currently they link at the section level only).
