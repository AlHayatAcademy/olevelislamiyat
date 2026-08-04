# Past-Paper Question Extraction Log

This log records the systematic extraction of verbatim question-paper text from
`source/07-word-extractions/*.docx` into `data/questions.ts`, carried out in response to the
explicit instruction to use actual question wording (not paraphrase) going forward.

Extraction method: each `.docx` was parsed with `python-docx` (paragraphs + tables) into plain
text, then read in full and transcribed by hand into structured `PastPaperQuestion` records,
preserving exact wording, punctuation and mark allocations as printed in the source file.

## Files processed (17 total, plus 2 duplicate copies)

| File | Content type | Used for verbatim questions? | Notes |
|---|---|---|---|
| `Islamiyat_2058_S21_Extracted_Questions.docx` | Full question-paper text, May/June 2021, 11/12/21/22 | Yes — all 4 papers | Clean, complete |
| `Islamiyat_2058_ON21_Question_Extract.docx` | Full question-paper text, Oct/Nov 2021, 11/12/21/22 | Yes — all 4 papers | Clean, complete |
| `Islamiyat_2058_MayJune2022_Questions.docx` | Full question-paper text, May/June 2022, 11/12/21/22 | Yes — all 4 papers | Clean, complete |
| `2058_W22_Question_Papers_Extracted.docx` | Full question-paper text, Oct/Nov 2022, 11/12/21/22 | Yes — all 4 papers | Clean, complete |
| `Islamiyat_2058_SJ23_Question_Papers.docx` | Full question-paper text, May/June 2023, 11/12/21/22 | Yes — all 4 papers | Clean, complete |
| `Islamiyat_2058_October_November_2023_Question_Papers_Extracted.docx` | Full question-paper text, Oct/Nov 2023, 11/12/21/22 | Yes — all 4 papers | Clean, complete |
| `Islamiyat_2058_MJ24_Question_Papers_Extracted.docx` | Full question-paper text, May/June 2024, 11/12/21/22 | Yes — all 4 papers | Clean, complete |
| `2058_Winter_2024_Question_Papers_Extracted.docx` | Full question-paper text, Oct/Nov 2024, 11/12/21/22 | Yes — all 4 papers | Clean, complete |
| `Islamiyat_2058_MJ25_Extracted.docx` | Full question-paper text, May/June 2025, 11/12/21/22 | Yes — all 4 papers | Marks not printed in brackets in this file for Q2–5; the standard Cambridge 10/4 split (confirmed by every other session and by `Islamiyat_2058_S25_GradeThresholds_MarkScheme.docx`) was applied. Q1 remains 4/4. |
| `2058_O_N_2025_Paper_2_Extracted_Questions.docx` | Full question-paper text, Oct/Nov 2025, Paper 2 (21 & 22) | Yes — 21 and 22 | Filename says "Paper 2" for both variants, matches content (2058/21 and 2058/22 headers present) |
| `2058_November_2025_Grade_Thresholds_and_Mark_Scheme_11.docx` (+ duplicate `(1)` copy) | Mark scheme for Paper 1 Variant 11, Oct/Nov 2025 | Yes — 2058/11 only | The mark scheme reproduces each question's stem verbatim ahead of the indicative-content bullet points (standard Cambridge MS layout); those stems were extracted. Indicative-content/marking-point prose was **not** used anywhere in the site content. |
| `Islamiyat_2058_June2021_Compiled.docx` | Principal Examiner Report + Mark Scheme, June 2021 | No | Contains only examiner commentary/paraphrase of what candidates wrote, not the original question wording — no verbatim question text present |
| `2058_June2023_Compilation.docx` | Grade thresholds, Examiner Report, Mark Schemes (11 & 12), June 2023 | No | Same as above — examiner report style |
| `2058_s24_summary.docx` | Grade thresholds & mark scheme summary, June 2024 | No (cross-check only) | Confirms AO1/AO2 mark split (part a = AO1, part b = AO2; Q1 = 4/4, Q2–5 = 10/4) used throughout this dataset |
| `Islamiyat_2058_June2022_Data_Extraction.docx` | Mark scheme / examiner summary, June 2022 | No (cross-check only) | No standalone verbatim question stems distinct from `Islamiyat_2058_MayJune2022_Questions.docx` |
| `Islamiyat_2058_MarkScheme_Summary.docx` | Generic mark-scheme summary | No | No session-specific verbatim question text |
| `Cambridge_O_Level_Islamiyat_2058_Winter_2022_Extracted_Data.docx` | Full mark-scheme extraction, Oct/Nov 2022 | No (cross-check only) | Long (1026 lines) mark scheme; question wording already fully covered by `2058_W22_Question_Papers_Extracted.docx` |
| `Cambridge_O_Level_Islamiyat_2058_Winter_2023_Extracted_Data.docx` | Full mark-scheme extraction, Oct/Nov 2023 | No (cross-check only) | 1608 lines; redundant with the dedicated Oct/Nov 2023 question-paper extraction file |
| `Cambridge_O_Level_Islamiyat_2058_Winter_2024_Extracted_Data.docx` | Full mark-scheme extraction, Oct/Nov 2024 | No (cross-check only) | 2176 lines; redundant with `2058_Winter_2024_Question_Papers_Extracted.docx` |
| `Cambridge_O_Level_Islamiyat_2058_W25_Mark_Schemes_Extracted.docx` | Mark schemes, Oct/Nov 2025 Paper 2 (21/22) | No (cross-check only) | Question stems already fully covered, verbatim, by `2058_O_N_2025_Paper_2_Extracted_Questions.docx` |
| `Islamiyat_2058_S25_GradeThresholds_MarkScheme.docx` | Grade thresholds & mark-scheme summary, May/June 2025 | No (cross-check only) | Used to confirm mark split for `Islamiyat_2058_MJ25_Extracted.docx`, which lacked bracketed marks |

## Coverage achieved

All four components (2058/11, 2058/12, 2058/21, 2058/22) across ten examination series
(May/June and Oct/Nov, 2021–2025 = 20 series × ~2 papers each = 40 paper instances) were targeted.
**39 of 40** paper instances have verbatim source text and are represented in
`data/questions.ts`. Each paper contributes 5 questions: Question 1 (parts a/b, one shared prompt
covering a choice of set passages) and Questions 2–5 (each with parts a/b) — 9 or 10 question-part
records per paper.

**Total extracted: 351 question-part records.**

### Known gap

- **Oct/Nov 2025, Paper 1 Variant 12 (2058/12)** — no verbatim question-paper text exists in any
  of the 17 extraction files. `2058_November_2025_Grade_Thresholds_and_Mark_Scheme_11.docx` covers
  only Variant 11 (component "11"); no equivalent extraction for "12" exists among the 17 files.
  This paper is *not* included in `data/questions.ts`. It should be added once a suitable
  extraction (question paper or mark scheme reproducing the question stems) becomes available.

### Extraction reliability

No files showed evidence of scanned-image content or OCR corruption — all 17 `.docx` files
extracted cleanly as text via `python-docx` (paragraphs and tables). The two `(1)`-suffixed files
(`2058_November_2025_Grade_Thresholds_and_Mark_Scheme_11 (1).docx` and
`2058_O_N_2025_Paper_2_Extracted_Questions (1).docx`) are exact duplicates of their non-suffixed
counterparts and were not processed twice.

## Data-integrity notes

- Every `prompt` field is verbatim from its source file, including original punctuation, spelling
  (British English as printed) and apostrophe style. Minor typographic differences between sessions
  (e.g. curly vs straight apostrophes, "and:" vs "and", "briefly describe" vs "Briefly describe")
  were preserved exactly as printed rather than normalised, since the user's instruction was to
  keep wording as-is.
- `ao` is assigned mechanically and consistently with the syllabus's own AO structure (confirmed by
  `2058_s24_summary.docx`): part (a) = AO1 (Knowledge), part (b) = AO2 (Understanding), for every
  question in every paper. This is a structural fact of the exam format, not an editorial guess.
- `sectionSlug` is an editorial classification made by reading each question's content against the
  syllabus sections in `data/syllabus.ts`. Question 1 always maps to `major-themes-of-the-quran`
  (Paper 1) or `major-teachings-of-hadith` (Paper 2) since it is fixed by the exam's own structure.
  Questions 2–5 were classified individually by topic (e.g. a question about a Battle → topic
  under `life-of-prophet-muhammad`; a question about a Caliph's administration →
  `rightly-guided-caliphs`; a question about Salah/Zakah/Hajj → `articles-of-faith-and-pillars`).
- `topicHint` fields are original short labels (not verbatim), generated by summarising each
  question for the site's index/browse views.
- The pre-existing 21 representative (paraphrased) entries have been superseded: every one of them
  had a matching verbatim source located in the extraction files and was replaced in place (same
  `id`) with the actual question wording. None had to be dropped for lack of a verbatim match.
