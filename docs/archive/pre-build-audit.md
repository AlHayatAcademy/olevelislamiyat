# Pre-Build Audit

Date: 2026-08-03

## Repo status

- Repo root: `/home/user/olevelislamiyat` (source checkout at `/home/user/olevelislamiyat/source` in this session — actually the git root IS the parent of `source/`; `source/` is a subdirectory of the repo).
- Branch: `claude/olevel-islamiyat-website-opbkvm` (pre-existing, checked out by harness). Do not switch branches or commit.
- `git status` at session start: clean, only `.gitignore` and `source/` tracked.
- No Next.js app existed yet. This session scaffolds it at the repo root, alongside `source/` and `docs/`.

## Source inventory summary

| Folder                | Contents                                                                                                                                                      | Count                                                                                  |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `00-readme`           | `SOURCE_STRUCTURE.md` (empty)                                                                                                                                 | 1                                                                                      |
| `01-syllabus`         | Cambridge O Level 2058 syllabus PDF + Cambridge IGCSE 0493 syllabus PDF (2026–2027 versions)                                                                  | 2                                                                                      |
| `02-paper-1`          | `paper-1-content.docx` — purpose-built "Website Content Master" draft content for Paper 1 (Qur'an themes, Seerah, first Islamic community)                    | 1                                                                                      |
| `03-paper-2`          | `paper-2-content.docx` — **a commercial copyrighted textbook** ("Islamiyat Paper 2", author Khalid Saifullah, Jlali Publishers Lahore, "All rights reserved") | 1                                                                                      |
| `04-past-papers`      | Question paper PDFs, May/June + Oct/Nov 2021–2025, `2058_*_qp_*`                                                                                              | 40                                                                                     |
| `05-mark-schemes`     | Mark scheme PDFs, matching sessions                                                                                                                           | 40                                                                                     |
| `06-examiner-reports` | Examiner report PDFs (partial — 10 files, not full 2021–2025 spread)                                                                                          | 10                                                                                     |
| `07-word-extractions` | Word-extracted versions of some past papers/mark schemes                                                                                                      | 24                                                                                     |
| `09-notes`            | Hand-made revision-note PNGs, split into `P1/` and `P2/`                                                                                                      | 46                                                                                     |
| **Total**             |                                                                                                                                                               | **~166 files** (documented in repo instructions; verified counts above are per-folder) |

Folders not yet present (expected, for later milestones): `08-images`, `10-books`, `11-generated-data`, `12-future-content`.

## Key finding carried into build

`source/03-paper-2/paper-2-content.docx` is a copyrighted third-party commercial publication, not original site content — this is flagged as a **high-severity copyright issue** in `docs/source-audit.md` and `docs/source-conflicts.md`. It must not be reproduced or closely paraphrased on the live site; it can only inform the _syllabus structure_ (which itself is derived from the public Cambridge syllabus, not from this book).

## Syllabus overview extracted

- Two written papers, 1.5 hours each, 50 marks each, answered in English.
- Each paper: 5 questions, candidates answer Q1, Q2 and two others.
- AO1 (Recall, select, present) 68% weighting; AO2 (Understanding) 32% weighting.
- Paper 1 sections: (1) Major themes of the Qur'an, (2) History and importance of the Qur'an, (3) Life and importance of the Prophet Muhammad (pbuh), (4) The first Islamic community.
- Paper 2 sections: (1) Major teachings in the Hadiths of the Prophet, (2) History and importance of the Hadiths, (3) The period of rule of the Rightly Guided Caliphs, (4) The Articles of Faith and the Pillars of Islam.

Full detail in `docs/syllabus-coverage-audit.md`.
