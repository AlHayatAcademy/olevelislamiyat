# Source Conflicts

Living document — updated as more source files are parsed. Last updated: 2026-08-03 (Milestone 1).

## Confirmed conflicts / issues found so far

### 1. `paper-2-content.docx` is a copyrighted commercial textbook, not original site content — ⚠ NEEDS USER DECISION

Unlike `paper-1-content.docx` (labelled "Website Content Master", appears purpose-drafted for this project), `paper-2-content.docx` is a published book: _"Islamiyat: Paper 2 [IGCSE 0493/2 – O Level 2058/2]"_, author Khalid Saifullah, Jlali Publishers Lahore, June 2024 edition, with an explicit rights-reserved / legal-advisor notice threatening legal action for unauthorized use.

**Impact:** Paper 2 content pages cannot be populated from this file the way Paper 1 pages can be populated from `paper-1-content.docx`, unless the user confirms they hold a licence/permission from the author/publisher. Until confirmed, Paper 2 topic pages must either (a) be written fresh from the public Cambridge syllabus + Qur'an/Hadith primary sources, or (b) remain placeholder-flagged.

**Action taken:** Flagged HIGH severity in `source-audit.md`; no content from this file has been or will be copied into the app.

### 2. Examiner reports missing for 2024 and 2025 sessions

`06-examiner-reports/May June 2024`, `Oct Nov 2024`, `May June 2025`, `Oct Nov 2025` each contain a `*_gt.pdf` (grade thresholds) instead of the expected `*_er.pdf` (examiner report). Only 2021–2023 have genuine examiner reports (6 of 10 expected files).

**Impact:** `/model-answers` and `/revision` "common examiner feedback" call-outs can only be sourced from 2021–2023 for now; 2024/2025 sessions will need a placeholder or grade-threshold-only summary until real examiner reports are supplied.

### 3. Duplicate-looking files in `07-word-extractions`

- `2058_November_2025_Grade_Thresholds_and_Mark_Scheme_11 (1).docx` vs `2058_November_2025_Grade_Thresholds_and_Mark_Scheme_11.docx`
- `2058_O_N_2025_Paper_2_Extracted_Questions (1).docx` vs `2058_O_N_2025_Paper_2_Extracted_Questions.docx`

Not yet diff-checked for content differences; assumed accidental duplicate uploads. No action taken beyond noting it — files are read-only and untouched.

### 4. Syllabus 2058 vs 0493 — not yet fully cross-checked

Both syllabus PDFs were extracted at page level but not compared clause-by-clause. The site presents 2058 and 0493 as parallel/equivalent qualifications; any wording differences between the two syllabuses (e.g. component codes, weighting tables) still need a side-by-side pass before the `/syllabus` page asserts full equivalence. Logged as pending in `syllabus-coverage-audit.md`.

## No contradictions found (so far) between:

- The Cambridge 2058 syllabus's stated exam pattern (2 papers × 1.5 hrs × 50 marks, Q1+Q2+2 others, AO1 68%/AO2 32%) and the question-paper filename pattern observed across all 10 sessions (`qp_11`, `qp_12`, `qp_21`, `qp_22` — consistent with 2 papers × 2 variants).
- The Paper 1 syllabus's four stated sections and the four-part structure found in `paper-1-content.docx` headings (Qur'an themes → preservation/compilation → revelation → sources of law, followed by Seerah chapters and first-Islamic-community chapters).

This document will be revised as past papers, mark schemes, and note images are parsed in later milestones.
