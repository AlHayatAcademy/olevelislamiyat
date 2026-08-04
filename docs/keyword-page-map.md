# Keyword → Page Map

Final mapping of the primary keyword (from `docs/keyword-research.md`) to its target page and what
was implemented in this pass. "Status" reflects this build only.

| Page | Primary keyword | Implemented |
|---|---|---|
| `/` (homepage) | O Level Islamiyat 2058 / IGCSE Islamiyat 0493 | Title/description, canonical, FAQPage schema (6 Q&As incl. 2 new) |
| `/syllabus` | O Level Islamiyat syllabus 2058 | Title/description, canonical, FAQPage schema, internal links to Paper 1/2 |
| `/exam-pattern` | Islamiyat 2058 exam pattern | Title/description, canonical, FAQPage schema, link to exam-technique guide |
| `/past-papers` | Islamiyat 2058 past papers | Title/description, canonical, FAQPage schema, link to model-answers |
| `/paper-1` | Islamiyat Paper 1 notes | Title/description, canonical, FAQPage schema, links to past-papers/quotes-references |
| `/paper-2` | Islamiyat Paper 2 notes | Title/description, canonical, FAQPage schema, links to past-papers/quotes-references |
| `/paper-1/[section]/[topic]`, `/paper-2/[section]/[topic]` | topic-level long-tail (e.g. "compilation of Quran notes") | Canonical per topic, Article JSON-LD |
| `/model-answers`, `/model-answers/[id]` | Islamiyat model answers / AO2 answer technique | Canonical (detail pages already had metadata) |
| `/quotes-references`, `/quotes-references/[category]`, `/quotes-references/[category]/[id]` | Quran and Hadith references for Islamiyat | Canonical added to all three levels |
| `/quizzes`, `/quizzes/[id]` | Islamiyat quiz / MCQ practice | Canonical added to detail pages |
| `/revision`, `/revision/exam-technique`, `/revision/key-personalities`, `/revision/common-mistakes`, `/revision/key-dates` | Islamiyat revision notes / exam technique | Canonical added |
| `/notes`, `/resources`, `/teacher-resources` | Islamiyat notes 2058 free / teacher resources | Canonical added |
| `/online-classes`, `/about`, `/about/founder`, `/about/institute` | Islamiyat online classes / tutor | Canonical added; existing FAQPage/Person schema untouched |
| `/contact` | contact O Level Islamiyat | Canonical added; existing FAQPage schema untouched |
| `/past-papers/topical/[section]`, `/past-papers/year-wise/[year]`, `/past-papers/question/[id]` | topical/yearly past paper long-tail | Canonical added to all |
| Legal pages (`/privacy`, `/terms`, `/disclaimer`, `/copyright`, `/accessibility`, `/cambridge-disclaimer`) | n/a (not keyword targets) | Canonical added only |
| 404 | n/a | New `app/not-found.tsx` with navigation to major sections |

See `docs/keyword-research.md` for the underlying search evidence and `docs/seo-architecture.md`
for implementation detail.
