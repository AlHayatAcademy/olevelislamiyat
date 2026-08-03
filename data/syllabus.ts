// Official syllabus structure for Cambridge O Level Islamiyat (2058) / IGCSE Islamiyat (0493).
// Extracted from source/01-syllabus/*.pdf. This is structural/factual data (section titles,
// weightings, exam pattern) drawn directly from the public Cambridge syllabus documents —
// safe to state directly, not paraphrased-close prose. See docs/syllabus-coverage-audit.md.

export interface SyllabusSubtopic {
  slug: string;
  title: string;
}

export interface SyllabusSection {
  slug: string;
  paper: 1 | 2;
  number: number;
  title: string;
  marks: number;
  description: string;
  subtopics: SyllabusSubtopic[];
}

export const paper1Sections: SyllabusSection[] = [
  {
    slug: "major-themes-of-the-quran",
    paper: 1,
    number: 1,
    title: "Major Themes of the Qur'an",
    marks: 8,
    description:
      "Three passages are set from the syllabus Appendix (15 designated passages grouped under three themes); candidates answer on two of the three. Passages are grouped under God in Himself, God's relationship with the created world, and God's relationship with His Messengers.",
    subtopics: [
      { slug: "god-in-himself", title: "Theme 1: God in Himself (Tawhid)" },
      { slug: "gods-relationship-with-creation", title: "Theme 2: God's Relationship with the Created World" },
      { slug: "gods-relationship-with-messengers", title: "Theme 3: God's Relationship with His Messengers" },
    ],
  },
  {
    slug: "history-of-the-quran",
    paper: 1,
    number: 2,
    title: "History and Importance of the Qur'an",
    marks: 14,
    description:
      "The revelation of the Qur'an, its preservation and compilation, and its role as the primary source of Islamic law.",
    subtopics: [
      { slug: "first-revelation", title: "The First Revelation" },
      { slug: "modes-of-revelation", title: "Different Modes of Revelation" },
      { slug: "compilation-under-abu-bakr", title: "Compilation Under Abu Bakr" },
      { slug: "standardisation-under-uthman", title: "Standardisation Under Uthman" },
      { slug: "quran-as-source-of-law", title: "The Qur'an as a Source of Islamic Law" },
    ],
  },
  {
    slug: "life-of-prophet-muhammad",
    paper: 1,
    number: 3,
    title: "Life and Importance of Prophet Muhammad (pbuh)",
    marks: 14,
    description:
      "The Seerah from pre-Islamic Arabia through the Makkan and Madinan periods to the Prophet's (pbuh) demise, and its enduring importance for Muslims.",
    subtopics: [
      { slug: "arabia-before-islam", title: "Arabia Before Islam" },
      { slug: "first-revelation-event", title: "The First Revelation and the Start of the Mission" },
      { slug: "hijrah", title: "The Hijrah: Migration to Madinah" },
      { slug: "farewell-sermon", title: "The Farewell Pilgrimage and Sermon" },
    ],
  },
  {
    slug: "first-islamic-community",
    paper: 1,
    number: 4,
    title: "The First Islamic Community",
    marks: 14,
    description:
      "The Prophet's (pbuh) wives and descendants, the Ten Blessed Companions, other prominent Companions, the scribes of revelation, and the status of women in early Islam.",
    subtopics: [
      { slug: "mothers-of-the-faithful", title: "Mothers of the Faithful (Ummahat al-Mu'minin)" },
      { slug: "ten-blessed-companions", title: "The Ten Blessed Companions" },
      { slug: "scribes-of-revelation", title: "Scribes of the Divine Revelation" },
      { slug: "status-of-women", title: "Status and Rights of Women in Islam" },
    ],
  },
];

export const paper2Sections: SyllabusSection[] = [
  {
    slug: "major-teachings-of-hadith",
    paper: 2,
    number: 1,
    title: "Major Teachings in the Hadiths of the Prophet",
    marks: 8,
    description:
      "Four passages are set from the syllabus Appendix, grouped under teachings for individual conduct and teachings for community life; candidates answer on two of the four.",
    subtopics: [
      { slug: "individual-conduct", title: "Teachings for Individual Conduct" },
      { slug: "community-life", title: "Teachings for Community Life" },
    ],
  },
  {
    slug: "history-of-hadith",
    paper: 2,
    number: 2,
    title: "History and Importance of the Hadiths",
    marks: 14,
    description:
      "The structure of a Hadith, its preservation and compilation across the generations of Companions, Successors and later scholars, and the methods used to establish authenticity.",
    subtopics: [
      { slug: "isnad-and-matn", title: "Isnad and Matn: The Structure of a Hadith" },
      { slug: "authentication-of-hadith", title: "Classification and Authentication of Hadith" },
      { slug: "compilation-stages", title: "Stages of Compilation: Companions to Tabi'un" },
      { slug: "six-authentic-books", title: "The Six Authentic Books (Sihah Sittah)" },
      { slug: "importance-of-hadith", title: "The Importance of Hadith as a Source of Guidance" },
    ],
  },
  {
    slug: "rightly-guided-caliphs",
    paper: 2,
    number: 3,
    title: "The Rightly Guided Caliphs and Their Importance as Leaders",
    marks: 14,
    description:
      "The leadership, achievements and character of Abu Bakr, Umar, Uthman and Ali (RA), and the lessons their example offers for leadership and governance.",
    subtopics: [
      { slug: "abu-bakr", title: "Abu Bakr al-Siddiq (RA)" },
      { slug: "umar", title: "Umar ibn al-Khattab (RA)" },
      { slug: "uthman", title: "Uthman ibn Affan (RA)" },
      { slug: "ali", title: "Ali ibn Abi Talib (RA)" },
    ],
  },
  {
    slug: "articles-of-faith-and-pillars",
    paper: 2,
    number: 4,
    title: "The Articles of Faith and the Pillars of Islam",
    marks: 14,
    description:
      "The six Articles of Faith (belief in Allah, angels, Books, Messengers, the Last Day, and predestination) and the Five Pillars of Islam (Shahadah, Salah, Zakah, Sawm, Hajj).",
    subtopics: [
      { slug: "articles-of-faith", title: "The Six Articles of Faith" },
      { slug: "pillars-of-islam", title: "The Five Pillars of Islam" },
    ],
  },
];

export const examPattern = {
  papers: 2,
  durationHours: 1.5,
  marksPerPaper: 50,
  questionsRequired: "Question 1, Question 2, and two others from the remaining three",
  ao1Weighting: 68,
  ao2Weighting: 32,
};

export function getSection(paper: 1 | 2, sectionSlug: string): SyllabusSection | undefined {
  const sections = paper === 1 ? paper1Sections : paper2Sections;
  return sections.find((s) => s.slug === sectionSlug);
}

export function getSections(paper: 1 | 2): SyllabusSection[] {
  return paper === 1 ? paper1Sections : paper2Sections;
}
