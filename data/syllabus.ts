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
      { slug: "ayat-al-kursi", title: "Theme 1 (God in Himself): Ayat al-Kursi — Qur'an 2:255" },
      { slug: "al-anam-6-101-103", title: "Theme 1 (God in Himself): Qur'an 6:101-103" },
      { slug: "fussilat-41-37", title: "Theme 1 (God in Himself): Qur'an 41:37" },
      { slug: "al-shura-42-4-5", title: "Theme 1 (God in Himself): Qur'an 42:4-5" },
      { slug: "al-ikhlas-112", title: "Theme 1 (God in Himself): Surah al-Ikhlas — Qur'an 112:1-4" },
      { slug: "al-fatiha-1-7", title: "Theme 2 (God and Creation): Surah al-Fatiha — Qur'an 1:1-7" },
      { slug: "al-baqarah-2-21-22", title: "Theme 2 (God and Creation): Qur'an 2:21-22" },
      { slug: "al-alaq-96-1-5", title: "Theme 2 (God and Creation): Qur'an 96:1-5" },
      { slug: "al-zilzal-99-1-8", title: "Theme 2 (God and Creation): Surah al-Zilzal — Qur'an 99:1-8" },
      { slug: "al-nas-114", title: "Theme 2 (God and Creation): Surah al-Nas — Qur'an 114:1-6" },
      { slug: "adam-al-baqarah-2-30-37", title: "Theme 3 (God and His Messengers): Adam — Qur'an 2:30-37" },
      { slug: "ibrahim-al-anam-6-75-79", title: "Theme 3 (God and His Messengers): Ibrahim — Qur'an 6:75-79" },
      { slug: "isa-al-maidah-5-110", title: "Theme 3 (God and His Messengers): Isa — Qur'an 5:110" },
      { slug: "muhammad-al-duha-93", title: "Theme 3 (God and His Messengers): Muhammad (pbuh) — Qur'an 93:1-11" },
      { slug: "al-kawthar-108", title: "Theme 3 (God and His Messengers): Muhammad (pbuh) — Surah al-Kawthar, Qur'an 108:1-3" },
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
      { slug: "revelation-over-23-years", title: "Revelation Over 23 Years: Makkan and Madinan Periods" },
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
      { slug: "birth-and-family-background", title: "Birth and Family Background" },
      { slug: "childhood-and-early-upbringing", title: "Childhood and Early Upbringing" },
      { slug: "early-character-and-reputation", title: "Early Character and Reputation (al-Amin)" },
      { slug: "hilf-al-fudul-and-kabah-rebuilding", title: "The Hilf al-Fudul and Rebuilding the Ka'bah" },
      { slug: "marriage-to-khadijah", title: "Marriage to Khadijah (RA)" },
      { slug: "first-revelation-event", title: "The First Revelation and the Start of the Mission" },
      { slug: "secret-preaching", title: "Secret Preaching and the First Converts" },
      { slug: "public-preaching-and-early-opposition", title: "Public Preaching and Early Opposition" },
      { slug: "persecution-of-early-muslims", title: "Persecution of the Early Muslims" },
      { slug: "migration-to-abyssinia", title: "Migration to Abyssinia" },
      { slug: "social-boycott-of-banu-hashim", title: "The Social Boycott of the Prophet's (pbuh) Clan" },
      { slug: "year-of-sorrow", title: "The Year of Sorrow" },
      { slug: "visit-to-taif", title: "The Visit to Ta'if" },
      { slug: "isra-and-miraj", title: "Isra and Mi'raj: The Night Journey and Ascension" },
      { slug: "pledges-of-aqabah", title: "The Pledges of Aqabah" },
      { slug: "hijrah", title: "The Hijrah: Migration to Madinah" },
      { slug: "establishing-madinan-community", title: "Establishing the Madinan Community" },
      { slug: "battle-of-badr", title: "The Battle of Badr" },
      { slug: "battle-of-uhud", title: "The Battle of Uhud" },
      { slug: "battle-of-the-trench", title: "The Battle of the Trench (Khandaq)" },
      { slug: "treaty-of-hudaybiyyah", title: "The Treaty of Hudaybiyyah" },
      { slug: "conquest-of-khaybar", title: "The Conquest of Khaybar" },
      { slug: "conquest-of-makkah", title: "The Conquest of Makkah" },
      { slug: "hunayn-and-tabuk", title: "The Battle of Hunayn and the Expedition to Tabuk" },
      { slug: "farewell-sermon", title: "The Farewell Pilgrimage and Sermon" },
      { slug: "character-and-personal-conduct", title: "The Prophet's (pbuh) Character and Personal Conduct" },
      { slug: "example-in-relations-with-women", title: "His Example in Relations with Women" },
      { slug: "example-in-relations-with-non-muslims", title: "His Example in Relations with Non-Muslims" },
      { slug: "example-for-communities-with-other-states", title: "His Example for Muslim Communities in Relations with Other States" },
      { slug: "seal-of-the-prophets", title: "His Significance as the Seal of the Prophets" },
      { slug: "death-and-impact", title: "His Death and Its Impact on the Muslim Community" },
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
      { slug: "emigrants-and-helpers", title: "The Muhajirun (Emigrants) and Ansar (Helpers)" },
      { slug: "four-caliphs-in-prophets-lifetime", title: "Abu Bakr, Umar, Uthman and Ali in the Prophet's (pbuh) Lifetime" },
      { slug: "descendants-and-shia-imamate", title: "The Prophet's (pbuh) Descendants and the Shi'a Imamate" },
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
      { slug: "shahadah-and-worship", title: "Individual Conduct: Belief and the Obligatory Acts of Worship" },
      { slug: "sincerity-ikhlas", title: "Individual Conduct: Sincerity (Ikhlas)" },
      { slug: "fighting-against-evil", title: "Individual Conduct: Fighting Against Evil" },
      { slug: "serving-the-cause-of-allah", title: "Individual Conduct: Serving the Cause of Allah" },
      { slug: "expanded-meanings-of-martyrdom", title: "Individual Conduct: Expanded Meanings of Martyrdom" },
      { slug: "honest-livelihood", title: "Individual Conduct: Honest Livelihood and One's Own Work" },
      { slug: "retaining-the-quran", title: "Individual Conduct: Retaining and Reciting the Qur'an" },
      { slug: "character-humility-and-sincerity", title: "Individual Conduct: Modesty, Humility and Allah Judging the Heart" },
      { slug: "worldly-restraint-and-the-hereafter", title: "Individual Conduct: The World as a Prison for the Believer" },
      { slug: "charity-and-sharing", title: "Community Life: Charity and Sharing with Others" },
      { slug: "social-ethical-responsibilities", title: "Community Life: Social and Ethical Responsibilities" },
      { slug: "enjoining-good-forbidding-evil", title: "Community Life: Enjoining Good and Forbidding Evil" },
      { slug: "rights-and-brotherhood", title: "Community Life: Rights of Others and Muslim Brotherhood" },
      { slug: "caring-for-the-vulnerable", title: "Community Life: Caring for Widows, the Poor and Orphans" },
      { slug: "gentleness-in-guidance", title: "Community Life: Gentleness, Glad Tidings and Not Alienating Others" },
      { slug: "kindness-in-commerce", title: "Community Life: Kindness in Buying, Selling and Claiming Dues" },
      { slug: "mercy-to-others", title: "Community Life: Allah's Mercy and Showing Mercy to People" },
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
      { slug: "four-shia-hadith-collections", title: "The Four Shi'a Hadith Collections (Kutub al-Arba'ah)" },
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
      "The six Articles of Faith (belief in Allah, angels, Books, Messengers, the Last Day, and predestination), the Five Pillars of Islam (Shahadah, Salah, Zakah, Sawm, Hajj), and Jihad — its physical, mental and spiritual meanings.",
    subtopics: [
      { slug: "belief-in-allah", title: "Article of Faith: Belief in Allah" },
      { slug: "belief-in-angels", title: "Article of Faith: Belief in Angels" },
      { slug: "belief-in-revealed-books", title: "Article of Faith: Belief in the Revealed Books" },
      { slug: "belief-in-prophets", title: "Article of Faith: Belief in the Prophets" },
      { slug: "belief-in-predestination", title: "Article of Faith: Belief in Predestination (Qadr)" },
      { slug: "belief-in-resurrection", title: "Article of Faith: Belief in the Day of Resurrection" },
      { slug: "shahadah-pillar", title: "Pillar of Islam: Shahadah" },
      { slug: "salah", title: "Pillar of Islam: Salah" },
      { slug: "zakah", title: "Pillar of Islam: Zakah" },
      { slug: "sawm", title: "Pillar of Islam: Sawm" },
      { slug: "hajj", title: "Pillar of Islam: Hajj" },
      { slug: "jihad-physical-mental-spiritual", title: "Jihad: Its Physical, Mental and Spiritual Meanings" },
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
