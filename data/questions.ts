// Copyright-safe past-paper question index for Cambridge O Level Islamiyat (2058).
//
// IMPORTANT: none of the "prompt" text below is a verbatim transcription of any official
// question paper. Every prompt is an original paraphrase, written by re-describing (in new
// wording) the topic and task type that the real question covered, cross-checked against the
// word-extracted examiner reports/mark-scheme summaries in source/07-word-extractions and the
// raw PDFs in source/04-past-papers. Marks, question/part numbers, and session/paper metadata
// are factual identifiers, not expressive text, so they are reproduced exactly, cross-checked
// against the raw past-paper PDFs in source/04-past-papers.
//
// This is a representative sample (not full 2021-2025 coverage) — see
// docs/model-answers-and-references-build.md for the coverage log.

export type Paper = 1 | 2;
export type AO = "AO1" | "AO2";

export interface PastPaperQuestion {
  id: string; // e.g. "2021-jj-p11-q2a"
  year: number;
  session: "May/June" | "Oct/Nov";
  qualification: "2058";
  paper: Paper;
  variant: string; // e.g. "11", "12", "21", "22"
  questionNumber: number;
  part: "a" | "b" | "whole";
  marks: number;
  ao: AO;
  syllabusPaper: Paper;
  sectionSlug: string; // links into data/syllabus.ts sections
  topicHint: string; // short human label of the specific topic examined
  prompt: string; // ORIGINAL paraphrase of what the question asked — never verbatim
  sourceNote: string; // where in source/ this was cross-checked
}

export const pastPaperQuestions: PastPaperQuestion[] = [
  {
    id: "2021-jj-p11-q1a",
    year: 2021,
    session: "May/June",
    qualification: "2058",
    paper: 1,
    variant: "11",
    questionNumber: 1,
    part: "a",
    marks: 8,
    ao: "AO1",
    syllabusPaper: 1,
    sectionSlug: "major-themes-of-the-quran",
    topicHint: "Tawhid and the natural world in the set passages",
    prompt:
      "Explain, using two of the three set Qur'an passages on God in Himself, how each passage points to Allah as the one true Creator who deserves worship.",
    sourceNote:
      "source/07-word-extractions/Islamiyat_2058_June2021_Compiled.docx, examiner report Q1(a) summary.",
  },
  {
    id: "2021-jj-p11-q1b",
    year: 2021,
    session: "May/June",
    qualification: "2058",
    paper: 1,
    variant: "11",
    questionNumber: 1,
    part: "b",
    marks: 6,
    ao: "AO2",
    syllabusPaper: 1,
    sectionSlug: "major-themes-of-the-quran",
    topicHint: "Practical response to tawhid themes",
    prompt:
      "Give your own view on how a Muslim's daily behaviour should change as a result of reflecting on Allah's power and generosity shown in creation.",
    sourceNote:
      "source/07-word-extractions/Islamiyat_2058_June2021_Compiled.docx, examiner report Q1(b) summary.",
  },
  {
    id: "2021-jj-p11-q2a",
    year: 2021,
    session: "May/June",
    qualification: "2058",
    paper: 1,
    variant: "11",
    questionNumber: 2,
    part: "a",
    marks: 8,
    ao: "AO1",
    syllabusPaper: 1,
    sectionSlug: "history-of-the-quran",
    topicHint: "Modes of revelation to the Prophet (pbuh)",
    prompt:
      "Describe the different forms in which the Prophet Muhammad (pbuh) received revelation from Allah.",
    sourceNote:
      "source/07-word-extractions/Islamiyat_2058_June2021_Compiled.docx, examiner report Q2(a) summary.",
  },
  {
    id: "2021-jj-p11-q2b",
    year: 2021,
    session: "May/June",
    qualification: "2058",
    paper: 1,
    variant: "11",
    questionNumber: 2,
    part: "b",
    marks: 6,
    ao: "AO2",
    syllabusPaper: 1,
    sectionSlug: "history-of-the-quran",
    topicHint: "Gradual revelation of the Qur'an",
    prompt:
      "Give reasons why the Qur'an was revealed gradually over 23 years rather than all at once, and justify which reason you find most convincing.",
    sourceNote:
      "source/07-word-extractions/Islamiyat_2058_June2021_Compiled.docx, examiner report Q2(b) summary.",
  },
  {
    id: "2021-jj-p11-q3a",
    year: 2021,
    session: "May/June",
    qualification: "2058",
    paper: 1,
    variant: "11",
    questionNumber: 3,
    part: "a",
    marks: 10,
    ao: "AO1",
    syllabusPaper: 1,
    sectionSlug: "life-of-prophet-muhammad",
    topicHint: "The journey of the Hijrah, including Cave Thawr",
    prompt:
      "Give a detailed account of the events of the Prophet's (pbuh) journey from Makkah to Madinah, including what happened at Cave Thawr.",
    sourceNote:
      "source/07-word-extractions/Islamiyat_2058_June2021_Compiled.docx, examiner report Q3(a) summary.",
  },
  {
    id: "2021-jj-p11-q3b",
    year: 2021,
    session: "May/June",
    qualification: "2058",
    paper: 1,
    variant: "11",
    questionNumber: 3,
    part: "b",
    marks: 4,
    ao: "AO2",
    syllabusPaper: 1,
    sectionSlug: "life-of-prophet-muhammad",
    topicHint: "Loyalty and friendship, inspired by the Hijrah companions",
    prompt:
      "Explain what the loyalty shown by the Prophet's (pbuh) companions during the Hijrah teaches Muslims about how they should treat their own friends.",
    sourceNote:
      "source/07-word-extractions/Islamiyat_2058_June2021_Compiled.docx, examiner report Q3(b) summary.",
  },
  {
    id: "2021-jj-p11-q5a",
    year: 2021,
    session: "May/June",
    qualification: "2058",
    paper: 1,
    variant: "11",
    questionNumber: 5,
    part: "a",
    marks: 10,
    ao: "AO1",
    syllabusPaper: 1,
    sectionSlug: "first-islamic-community",
    topicHint: "Life of Khadija (RA)",
    prompt:
      "Write an account of the life of Khadija (RA), including her life before marriage and her support of the Prophet (pbuh) during his mission.",
    sourceNote:
      "source/07-word-extractions/Islamiyat_2058_June2021_Compiled.docx, examiner report Q5(a) summary.",
  },
  {
    id: "2022-on-p12-q4a",
    year: 2022,
    session: "Oct/Nov",
    qualification: "2058",
    paper: 1,
    variant: "12",
    questionNumber: 4,
    part: "a",
    marks: 10,
    ao: "AO1",
    syllabusPaper: 1,
    sectionSlug: "first-islamic-community",
    topicHint: "The Ten Blessed Companions promised Paradise",
    prompt:
      "Name four of the Ten Companions given the glad tidings of Paradise and describe the service each of them gave to Islam.",
    sourceNote:
      "source/07-word-extractions/2058_W22_Question_Papers_Extracted.docx, cross-checked with source/04-past-papers/Oct Nov 2022/2058_w22_qp_12.pdf. \"W22\" is the standard Cambridge session code for the Oct/Nov 2022 series, confirmed against the matching PDF filenames present in that folder.",
  },
  {
    id: "2023-jj-p22-q2a",
    year: 2023,
    session: "May/June",
    qualification: "2058",
    paper: 2,
    variant: "22",
    questionNumber: 2,
    part: "a",
    marks: 10,
    ao: "AO1",
    syllabusPaper: 2,
    sectionSlug: "history-of-hadith",
    topicHint: "Structure of a Hadith: isnad and matn",
    prompt:
      "Explain what is meant by the isnad and the matn of a Hadith, and describe how scholars used the isnad to judge whether a Hadith was reliable.",
    sourceNote: "source/07-word-extractions/2058_June2023_Compilation.docx.",
  },
  {
    id: "2023-jj-p22-q2b",
    year: 2023,
    session: "May/June",
    qualification: "2058",
    paper: 2,
    variant: "22",
    questionNumber: 2,
    part: "b",
    marks: 4,
    ao: "AO2",
    syllabusPaper: 2,
    sectionSlug: "history-of-hadith",
    topicHint: "Why Hadith authentication mattered",
    prompt:
      "Explain in your own words why it was so important for early scholars to check the reliability of a Hadith's chain of narrators before accepting it.",
    sourceNote: "source/07-word-extractions/2058_June2023_Compilation.docx.",
  },
  {
    id: "2023-jj-p21-q3a",
    year: 2023,
    session: "May/June",
    qualification: "2058",
    paper: 2,
    variant: "21",
    questionNumber: 3,
    part: "a",
    marks: 10,
    ao: "AO1",
    syllabusPaper: 2,
    sectionSlug: "rightly-guided-caliphs",
    topicHint: "Umar (RA) as Caliph — administration and expansion",
    prompt:
      "Describe the main achievements of Umar ibn al-Khattab (RA) as Caliph, including his contribution to the administration of the growing Muslim state.",
    sourceNote: "source/07-word-extractions/2058_June2023_Compilation.docx.",
  },
  {
    id: "2023-jj-p21-q3b",
    year: 2023,
    session: "May/June",
    qualification: "2058",
    paper: 2,
    variant: "21",
    questionNumber: 3,
    part: "b",
    marks: 4,
    ao: "AO2",
    syllabusPaper: 2,
    sectionSlug: "rightly-guided-caliphs",
    topicHint: "Umar (RA) as a role model for leaders",
    prompt:
      "Give your own view on which quality of Umar's (RA) leadership is most needed in leaders today, with reasons.",
    sourceNote: "source/07-word-extractions/2058_June2023_Compilation.docx.",
  },
  {
    id: "2023-on-p11-q5a",
    year: 2023,
    session: "Oct/Nov",
    qualification: "2058",
    paper: 1,
    variant: "11",
    questionNumber: 5,
    part: "a",
    marks: 10,
    ao: "AO1",
    syllabusPaper: 1,
    sectionSlug: "first-islamic-community",
    topicHint: "Status and rights of women introduced by early Islam",
    prompt:
      "Describe the rights given to women by Islam in the areas of inheritance, marriage and education, compared with the position of women in pre-Islamic Arabia.",
    sourceNote:
      "source/07-word-extractions/Islamiyat_2058_October_November_2023_Question_Papers_Extracted.docx.",
  },
  {
    id: "2024-jj-p12-q4a",
    year: 2024,
    session: "May/June",
    qualification: "2058",
    paper: 1,
    variant: "12",
    questionNumber: 4,
    part: "a",
    marks: 10,
    ao: "AO1",
    syllabusPaper: 1,
    sectionSlug: "first-islamic-community",
    topicHint: "The scribes of revelation",
    prompt:
      "Describe the role played by the scribes of revelation in recording the Qur'an as it was revealed to the Prophet (pbuh).",
    sourceNote: "source/07-word-extractions/Islamiyat_2058_MJ24_Question_Papers_Extracted.docx.",
  },
  {
    id: "2024-jj-p21-q4a",
    year: 2024,
    session: "May/June",
    qualification: "2058",
    paper: 2,
    variant: "21",
    questionNumber: 4,
    part: "a",
    marks: 10,
    ao: "AO1",
    syllabusPaper: 2,
    sectionSlug: "articles-of-faith-and-pillars",
    topicHint: "Belief in Angels: their nature and roles",
    prompt:
      "Explain what Muslims believe about the nature of angels and describe the different duties assigned to them.",
    sourceNote: "source/07-word-extractions/Islamiyat_2058_MJ24_Question_Papers_Extracted.docx.",
  },
  {
    id: "2024-jj-p21-q4b",
    year: 2024,
    session: "May/June",
    qualification: "2058",
    paper: 2,
    variant: "21",
    questionNumber: 4,
    part: "b",
    marks: 4,
    ao: "AO2",
    syllabusPaper: 2,
    sectionSlug: "articles-of-faith-and-pillars",
    topicHint: "Effect of belief in angels on behaviour",
    prompt:
      "Explain how believing that angels record every deed might affect the way a Muslim behaves when alone.",
    sourceNote: "source/07-word-extractions/Islamiyat_2058_MJ24_Question_Papers_Extracted.docx.",
  },
  {
    id: "2024-on-p22-q5a",
    year: 2024,
    session: "Oct/Nov",
    qualification: "2058",
    paper: 2,
    variant: "22",
    questionNumber: 5,
    part: "a",
    marks: 10,
    ao: "AO1",
    syllabusPaper: 2,
    sectionSlug: "articles-of-faith-and-pillars",
    topicHint: "Zakah: conditions and recipients",
    prompt:
      "Describe the conditions under which Zakah becomes obligatory on a Muslim and outline the categories of people entitled to receive it.",
    sourceNote: "source/07-word-extractions/Cambridge_O_Level_Islamiyat_2058_Winter_2024_Extracted_Data.docx.",
  },
  {
    id: "2024-on-p22-q5b",
    year: 2024,
    session: "Oct/Nov",
    qualification: "2058",
    paper: 2,
    variant: "22",
    questionNumber: 5,
    part: "b",
    marks: 4,
    ao: "AO2",
    syllabusPaper: 2,
    sectionSlug: "articles-of-faith-and-pillars",
    topicHint: "Zakah and social justice",
    prompt:
      "Give your own view on how the payment of Zakah helps reduce inequality between rich and poor members of society.",
    sourceNote: "source/07-word-extractions/Cambridge_O_Level_Islamiyat_2058_Winter_2024_Extracted_Data.docx.",
  },
  {
    id: "2025-jj-p11-q1a",
    year: 2025,
    session: "May/June",
    qualification: "2058",
    paper: 1,
    variant: "11",
    questionNumber: 1,
    part: "a",
    marks: 8,
    ao: "AO1",
    syllabusPaper: 1,
    sectionSlug: "major-themes-of-the-quran",
    topicHint: "God's relationship with His Messengers — Adam and Isa passages",
    prompt:
      "Using two of the set passages about Adam and Isa (pbut), explain what each passage teaches about Allah's power to create.",
    sourceNote: "source/07-word-extractions/Islamiyat_2058_MJ25_Extracted.docx.",
  },
  {
    id: "2025-on-p12-q3a",
    year: 2025,
    session: "Oct/Nov",
    qualification: "2058",
    paper: 1,
    variant: "12",
    questionNumber: 3,
    part: "a",
    marks: 10,
    ao: "AO1",
    syllabusPaper: 1,
    sectionSlug: "life-of-prophet-muhammad",
    topicHint: "The Farewell Pilgrimage and Sermon",
    prompt:
      "Give an account of the Prophet's (pbuh) Farewell Pilgrimage, including the main instructions he gave in his final sermon.",
    sourceNote:
      "source/07-word-extractions/2058_O_N_2025_Paper_2_Extracted_Questions.docx, cross-checked against source/04-past-papers/Oct Nov 2025/2058_w25_qp_12.pdf (Paper 1, Variant 12). The extraction file's own name is a minor mislabel (it says \"Paper_2\") but its content and question numbering match Paper 1 Variant 12 as confirmed against the raw PDF.",
  },
  {
    id: "2025-on-p21-q4a",
    year: 2025,
    session: "Oct/Nov",
    qualification: "2058",
    paper: 2,
    variant: "21",
    questionNumber: 4,
    part: "a",
    marks: 10,
    ao: "AO1",
    syllabusPaper: 2,
    sectionSlug: "articles-of-faith-and-pillars",
    topicHint: "Salah: conditions and significance",
    prompt:
      "Describe the conditions that must be met for Salah to be valid and explain the significance of praying five times a day.",
    sourceNote: "source/07-word-extractions/2058_November_2025_Grade_Thresholds_and_Mark_Scheme_11.docx.",
  },
];

export function getQuestionsByYear(year: number): PastPaperQuestion[] {
  return pastPaperQuestions.filter((q) => q.year === year);
}

export function getQuestionsBySection(sectionSlug: string): PastPaperQuestion[] {
  return pastPaperQuestions.filter((q) => q.sectionSlug === sectionSlug);
}

export function getQuestionById(id: string): PastPaperQuestion | undefined {
  return pastPaperQuestions.find((q) => q.id === id);
}

export const availableYears = Array.from(new Set(pastPaperQuestions.map((q) => q.year))).sort(
  (a, b) => b - a,
);
