# Past Paper Coverage Audit

Living document. Tracks which exam sessions/papers are available in `source/` and how much has been parsed into structured, taggable question data for `/past-papers` and `/model-answers`.

## Sessions present (all confirmed on disk, Milestone 1)

| Session       | Paper 1 (11, 12) | Paper 2 (21, 22) | Mark schemes | Word extraction                                                                                                                                     | Examiner report                                         |
| ------------- | ---------------- | ---------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| May/June 2021 | present          | present          | present      | present (`Islamiyat_2058_June2021_Compiled.docx`, `Islamiyat_2058_S21_Extracted_Questions.docx`)                                                    | present (`2058_s21_er.pdf`)                             |
| Oct/Nov 2021  | present          | present          | present      | present (`Islamiyat_2058_Nov2021_Extract.docx`, `Islamiyat_2058_ON21_Question_Extract.docx`)                                                        | present (`2058_w21_er.pdf`)                             |
| May/June 2022 | present          | present          | present      | present (`Islamiyat_2058_June2022_Data_Extraction.docx`, `Islamiyat_2058_MayJune2022_Questions.docx`)                                               | present (`2058_s22_er.pdf`)                             |
| Oct/Nov 2022  | present          | present          | present      | present (`2058_W22_Question_Papers_Extracted.docx`, `Cambridge_O_Level_Islamiyat_2058_Winter_2022_Extracted_Data.docx`)                             | present (`2058_w22_er.pdf`)                             |
| May/June 2023 | present          | present          | present      | present (`2058_June2023_Compilation.docx`, `Islamiyat_2058_SJ23_Question_Papers.docx`)                                                              | present (`2058_s23_er.pdf`)                             |
| Oct/Nov 2023  | present          | present          | present      | present (`Islamiyat_2058_October_November_2023_Question_Papers_Extracted.docx`, `Cambridge_O_Level_Islamiyat_2058_Winter_2023_Extracted_Data.docx`) | present (`2058_w23_er.pdf`)                             |
| May/June 2024 | present          | present          | present      | present (`Islamiyat_2058_MJ24_Question_Papers_Extracted.docx`, `2058_s24_summary.docx`)                                                             | **missing — only grade thresholds (`2058_s24_gt.pdf`)** |
| Oct/Nov 2024  | present          | present          | present      | present (`Islamiyat_2058_Winter_2024_Question_Papers_Extracted.docx`, `Cambridge_O_Level_Islamiyat_2058_Winter_2024_Extracted_Data.docx`)           | **missing — only grade thresholds (`2058_w24_gt.pdf`)** |
| May/June 2025 | present          | present          | present      | present (`Islamiyat_2058_MJ25_Extracted.docx`, `Islamiyat_2058_S25_GradeThresholds_MarkScheme.docx`)                                                | **missing — only grade thresholds (`2058_s25_gt.pdf`)** |
| Oct/Nov 2025  | present          | present          | present      | present (`2058_O_N_2025_Paper_2_Extracted_Questions.docx` + dup, `2058_November_2025_Grade_Thresholds_and_Mark_Scheme_11.docx` + dup)               | **missing — only grade thresholds (`2058_w25_gt.pdf`)** |

Coverage: **10/10 sessions, 40/40 question papers, 40/40 mark schemes present.** 6/10 sessions have genuine examiner reports; 4/10 (2024–2025) have grade thresholds only.

## Parsing status

No individual question has yet been extracted into structured (topic-tagged, mark-scheme-linked) data — that is planned for the content-population milestone, not Milestone 1. This audit currently only confirms **file-level availability**, not question-level topic coverage.

## Milestone 1 scope note

Per task instructions, past papers/mark schemes/examiner reports are never to be reproduced verbatim or hosted publicly. Future work should build a `data/past-papers.ts` (or similar) index of session → paper → question metadata (topic tags, marks, AO focus) derived from parsing these PDFs, without copying full question text where avoidable, and with links pointing users to the official Cambridge site for the primary documents rather than rehosting PDFs.

## Open items for next milestone

1. Parse `04-past-papers` PDFs page-by-page to extract question numbers, sub-parts, and marks per question.
2. Cross-reference against `05-mark-schemes` to build topic tags per question.
3. Use the 6 genuine examiner reports to extract common-error guidance per topic (paraphrased, not verbatim).
4. Decide handling for the 4 sessions without genuine examiner reports (placeholder vs. omission).
5. Diff the two duplicate-looking `07-word-extractions` files noted in `source-conflicts.md`.
