import type { Topic } from "./types";

const section = "history-of-hadith";

export const paper2HistoryOfHadithTopics: Topic[] = [
  {
    slug: "isnad-and-matn",
    paper: 2,
    section,
    title: "Isnad and Matn: The Structure of a Hadith",
    standing: "Every Hadith has two parts — the chain of narrators and the reported text — and both must be examined to establish authenticity.",
    learningObjectives: [
      "Define Hadith, Isnad and Matn.",
      "Explain what qualities a narrator in the chain must possess.",
      "Explain why scholars examine both the isnad and the matn separately.",
    ],
    keyTerms: [
      { term: "Hadith", meaning: "A report recording something the Prophet (pbuh) said, did, or silently approved of." },
      { term: "Isnad (sanad)", meaning: "The chain of narrators through which a Hadith has been transmitted, running back from the person who recorded it to the Prophet (pbuh)." },
      { term: "Matn", meaning: "The actual text or content of the Hadith — the words or description of the action being reported." },
      { term: "Al-'adalah", meaning: "Just and upright character in a narrator: piety, integrity and avoidance of major sins." },
      { term: "Al-dabt", meaning: "Precision of memory: the ability to retain and transmit a report accurately without confusion." },
    ],
    explanation: [
      "A Hadith is made up of two distinct parts that scholars examine separately: the isnad, which is the list of narrators carrying the report from the person recording it all the way back to the Prophet (pbuh), and the matn, which is the actual wording or content being transmitted.",
      "For the isnad to be considered sound, every narrator in the chain needed to meet strict conditions: known identity (name, background, so their reliability could be assessed); upright moral character (al-'adalah) — freedom from lying, major sin or unreliable conduct; and a precise, retentive memory (al-dabt), so the report was carried without distortion.",
      "Scholars also required that each narrator could be shown to have actually met and learned directly from the narrator before them in the chain, that the chain was unbroken from the first narrator to the last, and that the first link in the chain was a companion who personally witnessed or heard what is being reported.",
      "Examining the matn was just as important as examining the isnad. Even with a chain of trustworthy narrators, scholars checked that the wording itself did not contradict the Qur'an, other well-established authentic Hadith, or basic principles of reason and known historical fact, and that it was free of exaggeration or content unbefitting the Prophet's (pbuh) position.",
      "This two-part scrutiny — verifying who said it was said, and checking what was actually said — is what allowed later generations of Muslims to distinguish genuine prophetic teaching from mistaken, exaggerated or fabricated reports that circulated for various motives after the Prophet's (pbuh) death.",
    ],
    keyFacts: [
      { label: "Two parts of a Hadith", detail: "Isnad (chain of narrators) and matn (text/content)." },
      { label: "Two core narrator qualities", detail: "Al-'adalah (upright character) and al-dabt (precise memory)." },
      { label: "Chain requirement", detail: "Must be unbroken, with each narrator shown to have met the one before them, tracing back to a companion of the Prophet (pbuh)." },
      { label: "Matn requirement", detail: "Must not contradict the Qur'an, other authentic Hadith, or sound reason." },
    ],
    ao1Guidance: [
      "Be able to define isnad and matn precisely and state that both are examined, not just one.",
      "List the narrator qualities (character and memory) as two distinct, named criteria.",
    ],
    ao2Guidance: [
      "Explain why relying on a chain of named, individually assessed narrators — rather than an anonymous oral tradition — gives Hadith scholarship a distinctive rigor comparable to source-verification in modern historical research.",
      "Discuss why checking the matn as well as the isnad was necessary: a chain could appear formally sound while the content itself was still inconsistent with established Islamic teaching, so both checks work together.",
    ],
    commonMistakes: [
      "Defining Hadith and Sunnah as identical terms without distinction — Hadith refers to the recorded report; Sunnah refers more broadly to the Prophet's (pbuh) example, of which Hadith is the main documented source.",
      "Only mentioning the isnad and forgetting that the matn is also formally examined.",
      "Vague answers like 'the chain had to be strong' without naming the specific qualities (character, memory, continuity) examiners expect.",
    ],
    examTip:
      "Whenever 'isnad' or 'matn' appears in a question, answer with both terms even if only one is named directly — showing you understand how the two work together is a reliable way to pick up extra AO2 marks on this topic.",
    relatedTopics: [
      { paper: 2, section: "history-of-hadith", slug: "authentication-of-hadith", title: "Classification and Authentication of Hadith" },
      { paper: 2, section: "history-of-hadith", slug: "compilation-stages", title: "Stages of Compilation: Companions to Tabi'un" },
    ],
  },
  {
    slug: "authentication-of-hadith",
    paper: 2,
    section,
    title: "Classification and Authentication of Hadith",
    standing: "How scholars sorted reports by reliability, from mass-transmitted certainty down to single-narrator reports.",
    learningObjectives: [
      "Explain how Hadith are classified according to the number of narrators at each stage of the chain.",
      "Define Mutawatir and the sub-types of Ahad Hadith (Mash'hur, Aziz, Gharib).",
      "Explain the difference in reliability between these categories.",
    ],
    keyTerms: [
      { term: "Mutawatir", meaning: "A Hadith narrated by so many people at every stage of the chain that collective fabrication or error is considered practically impossible." },
      { term: "Ahad", meaning: "A Hadith that is not mass-transmitted; it falls into further sub-categories depending on how many narrators carried it at each stage." },
      { term: "Mash'hur", meaning: "A 'well-known' Ahad Hadith narrated by three or more people at a given stage of transmission." },
      { term: "Aziz", meaning: "A 'rare' Ahad Hadith narrated through exactly two chains at a given stage." },
      { term: "Gharib", meaning: "A 'solitary' Ahad Hadith narrated by only one person at some stage of the chain." },
    ],
    explanation: [
      "One major way scholars classified Hadith was by counting how many independent narrators carried the report at each generation of the chain, since a wider spread of narrators makes fabrication or accidental error far less likely.",
      "Mutawatir Hadith sit at the top of this classification: they were transmitted by such a large number of narrators at every stage that it would have been practically impossible for them to have agreed, by coincidence or conspiracy, on a false report. Because of this, Mutawatir Hadith are accepted with the highest level of certainty.",
      "Any Hadith that does not meet this mass-transmission threshold is classified as Ahad, and Ahad Hadith are themselves divided further by how many chains or narrators carried the report: Mash'hur (well-known), where three or more narrators carried the report at a given level; Aziz (rare), carried through exactly two chains at a given level; and Gharib (solitary), where only a single narrator carried the report at some point in the chain.",
      "This does not mean Ahad Hadith are treated as unreliable — the vast majority of Hadith used in Islamic law and daily practice are Ahad, and when their isnad and matn meet the required standards of authenticity, they are accepted as a valid and binding source of guidance. The classification instead expresses the degree of certainty (yaqin for Mutawatir, versus a strong probability, zann, for Ahad) rather than a simple accepted/rejected division.",
      "This system allowed later generations of scholars to be transparent and precise about exactly how strongly a given report was attested, rather than treating all transmitted material as equally certain.",
    ],
    keyFacts: [
      { label: "Highest certainty category", detail: "Mutawatir — mass-transmitted, collective fabrication practically impossible." },
      { label: "Everything else", detail: "Ahad — divided into Mash'hur (3+ narrators at a stage), Aziz (2 chains), Gharib (1 narrator at a stage)." },
      { label: "What classification measures", detail: "The number of independent transmission chains/narrators at each generation, not the truth or falsity of the content on its own." },
    ],
    ao1Guidance: [
      "Learn the four category names (Mutawatir, Mash'hur, Aziz, Gharib) with the correct narrator-count definition for each.",
      "Be ready to state which category is considered strongest and why.",
    ],
    ao2Guidance: [
      "Explain why a numbers-based classification system is a rational, verifiable method for assessing reliability, rather than relying on subjective trust in any single narrator.",
      "Discuss why the existence of authentic single-narrator (Gharib) Hadith among core Islamic teachings shows that 'few narrators' does not automatically mean 'unreliable' — reliability depends on isnad and matn quality as much as on narrator count.",
    ],
    commonMistakes: [
      "Assuming Ahad Hadith are rejected or considered weak by definition — they are the normal category for the majority of accepted Hadith.",
      "Mixing up Aziz (two chains) and Mash'hur (three or more) — these are frequently confused in exam answers.",
      "Treating this classification (by narrator count) as the same thing as the Sahih/Hasan/Da'if classification (by narrator reliability and chain soundness) — they are related but distinct systems.",
    ],
    examTip:
      "If a question gives you a scenario describing a specific number of narrators at each stage, work out the classification methodically stage by stage rather than guessing from the total — examiners sometimes test this as an applied, not just a recall, question.",
    relatedTopics: [
      { paper: 2, section: "history-of-hadith", slug: "isnad-and-matn", title: "Isnad and Matn: The Structure of a Hadith" },
      { paper: 2, section: "history-of-hadith", slug: "six-authentic-books", title: "The Six Authentic Books (Sihah Sittah)" },
    ],
  },
  {
    slug: "compilation-stages",
    paper: 2,
    section,
    title: "Stages of Compilation: Companions to Tabi'un",
    standing: "How Hadith preservation moved from memory and scattered private notebooks to organised written collections over three generations.",
    learningObjectives: [
      "Describe how the Companions preserved Hadith during and after the Prophet's (pbuh) lifetime.",
      "Explain why organised compilation became necessary in the era of the Tabi'un (Successors).",
      "Name key early compilers and their contributions.",
    ],
    keyTerms: [
      { term: "Sahifah", meaning: "A private booklet or written collection of Hadith kept by an individual companion." },
      { term: "Tabi'un", meaning: "The generation of Muslims who learned directly from the Companions but did not personally meet the Prophet (pbuh)." },
      { term: "Tab'a Tabi'in", meaning: "The generation after the Tabi'un — the 'successors of the successors'." },
    ],
    explanation: [
      "The Companions of the Prophet (pbuh) preserved his teachings through a combination of memorisation, regular practice of what they had learned, and — for a considerable number of them — direct written documentation.",
      "Several companions kept private booklets known as Sahifah. Abu Hurairah (RA), who narrated the largest number of Hadith of any companion, is reported to have written many down, and his student is recorded as recalling that Abu Hurairah kept a written record of everything he narrated. Abdullah ibn Abbas (RA) similarly wrote extensively, and his surviving written material is described in early sources as filling a substantial load; Anas ibn Malik (RA), who served the Prophet (pbuh) for around ten years, and Abdullah ibn Amr (RA) also compiled their own written records.",
      "In the first century after the Hijrah, as Islam spread rapidly and new generations of Muslims further removed from the Companions needed reliable access to the Prophet's (pbuh) teaching, the Umayyad caliph Umar ibn Abd al-Aziz took the historic step of formally directing scholars to compile Hadith into organised books, out of concern that unwritten material could be lost as the Companions themselves grew fewer.",
      "Among the Tabi'un scholars who responded to this directive, Muhammad ibn Shihab al-Zuhri is particularly notable: he compiled material including a work known as al-Maghazi, and copies of his compiled Hadith were distributed by the caliph's instruction to different regions of the Muslim world. Other Tabi'un scholars, including Abu Bakr ibn Hazm and Qasim ibn Muhammad ibn Abi Bakr, carried out similar compilation work in this period.",
      "In the following generation, the Tab'a Tabi'in built further on this foundation with even more systematic scholarship: Imam Malik ibn Anas compiled al-Muwatta', a carefully selected collection organised by subject, and Imam Ahmad ibn Hanbal compiled the Musnad, an extensive collection arranged by the companion who narrated each Hadith. These works represent a maturing science of Hadith compilation that set the stage for the six major authenticated collections that followed.",
    ],
    keyFacts: [
      { label: "Companion who narrated the most Hadith", detail: "Abu Hurairah (RA)." },
      { label: "Caliph who ordered formal compilation", detail: "Umar ibn Abd al-Aziz." },
      { label: "Leading Tabi'un compiler", detail: "Muhammad ibn Shihab al-Zuhri (compiled al-Maghazi, among other material)." },
      { label: "Tab'a Tabi'in compilers", detail: "Imam Malik ibn Anas (al-Muwatta') and Imam Ahmad ibn Hanbal (Musnad Ahmad)." },
      { label: "Three generational stages", detail: "Companions (memorisation and private Sahifah) → Tabi'un (organised compilation under caliphal direction) → Tab'a Tabi'in (large, systematic collections)." },
    ],
    ao1Guidance: [
      "Learn the three-stage sequence (Companions → Tabi'un → Tab'a Tabi'in) as the backbone of any answer on this topic, with at least one named scholar/work per stage.",
      "Be able to state clearly why Umar ibn Abd al-Aziz ordered compilation (concern about loss of knowledge as the Companions' generation passed away).",
    ],
    ao2Guidance: [
      "Explain why moving from private, scattered Sahifah to caliph-directed, organised compilation was a necessary evolution as the Muslim world expanded far beyond Madinah and could no longer rely on direct access to the Companions.",
      "Discuss how this staged, cumulative process (each generation building carefully on the previous one's work rather than starting from scratch) reflects the seriousness with which early Muslims treated the responsibility of preserving the Prophet's (pbuh) teaching accurately.",
    ],
    commonMistakes: [
      "Assuming Hadith were entirely unwritten until the six authentic books were compiled — a considerable amount of material was already recorded by Companions in private Sahifah generations earlier.",
      "Forgetting to name Umar ibn Abd al-Aziz as the caliph who initiated formal, organised compilation.",
      "Treating Imam Malik's al-Muwatta' or Imam Ahmad's Musnad as one of the 'six authentic books' — they belong to an earlier and separate stage of compilation, distinct from the Sihah Sittah.",
    ],
    examTip:
      "Draw yourself a simple three-box timeline (Companions → Tabi'un → Tab'a Tabi'in) with one name and one fact in each box — reproducing this structure quickly in the exam prevents the generations and their scholars from blurring together under time pressure.",
    relatedTopics: [
      { paper: 2, section: "history-of-hadith", slug: "six-authentic-books", title: "The Six Authentic Books (Sihah Sittah)" },
      { paper: 2, section: "history-of-hadith", slug: "isnad-and-matn", title: "Isnad and Matn: The Structure of a Hadith" },
    ],
  },
  {
    slug: "six-authentic-books",
    paper: 2,
    section,
    title: "The Six Authentic Books (Sihah Sittah)",
    standing: "The six major Hadith collections compiled in the third century after Hijrah, still used today as the core reference works of Sunni Hadith scholarship.",
    learningObjectives: [
      "Name the six authentic books of Hadith and their compilers.",
      "State a distinguishing feature of each collection.",
      "Explain why these six books are given special status.",
    ],
    keyTerms: [
      { term: "Sihah Sittah", meaning: "\"The Six Authentic [Books]\" — the collective name for the six Hadith collections regarded as most authoritative in Sunni scholarship." },
      { term: "Sahih", meaning: "\"Authentic\" — a Hadith (or collection) that meets the full, rigorous conditions for reliability of isnad and matn." },
    ],
    explanation: [
      "By the third Islamic century, Hadith scholarship had matured into a precise science, and six collections compiled in this period came to be recognised collectively as the Sihah Sittah, the six most authoritative Sunni Hadith collections.",
      "Sahih al-Bukhari, compiled by Imam Muhammad ibn Ismail al-Bukhari, is regarded as the most rigorously verified collection, applying the strictest criteria of any compiler for accepting a report; it is organised thematically into books and chapters, with headings often drawn from the Qur'an and Hadith themselves.",
      "Sahih Muslim, compiled by Imam Muslim ibn al-Hajjaj, is considered the second most authoritative collection. Imam Muslim applied very exacting standards for chain continuity and reportedly sought the approval of his own teacher before finalising the work; it is arranged thematically and scientifically.",
      "Sunan Abu Dawud, compiled by Imam Abu Dawud, places particular emphasis on Hadith with legal and jurisprudential (fiqh) content, making it especially valuable for deriving rulings, and it notably comments on the reliability of weaker narrations it includes rather than silently omitting them.",
      "Jami' al-Tirmidhi, compiled by Imam Abu Isa al-Tirmidhi, is distinctive for regularly discussing the legal opinions of early scholars alongside each Hadith and for openly noting the strengths or weaknesses of narrations.",
      "Sunan al-Nasa'i, compiled by Imam Ahmad al-Nasa'i, is known for containing comparatively few weak narrations among the six and for careful attention to identifying subtle defects in narrations and unusual wording.",
      "Sunan Ibn Majah, compiled by Imam Ibn Majah, is valued in particular for including a number of authentic Hadith not found in any of the other five collections, adding genuinely new material to the shared body of Hadith literature.",
      "Together, these six works are regarded as important because their compilers independently applied rigorous, transparent standards of isnad and matn verification, because later generations of scholars scrutinised and affirmed their reliability, and because they collectively preserve the overwhelming core of authenticated Prophetic teaching in a structured, accessible form.",
    ],
    keyFacts: [
      { label: "1. Sahih al-Bukhari", detail: "Compiled by Imam Bukhari; the most authentic and rigorously screened of the six." },
      { label: "2. Sahih Muslim", detail: "Compiled by Imam Muslim; second in authority, very strict chain-continuity standards." },
      { label: "3. Sunan Abu Dawud", detail: "Compiled by Imam Abu Dawud; strong focus on legal/fiqh-related Hadith." },
      { label: "4. Jami' al-Tirmidhi", detail: "Compiled by Imam al-Tirmidhi; discusses early scholars' legal opinions alongside each Hadith." },
      { label: "5. Sunan al-Nasa'i", detail: "Compiled by Imam al-Nasa'i; comparatively few weak narrations, careful defect-analysis." },
      { label: "6. Sunan Ibn Majah", detail: "Compiled by Imam Ibn Majah; contains unique Hadith not found in the other five." },
      { label: "Century of compilation", detail: "Third century after the Hijrah." },
    ],
    ao1Guidance: [
      "Memorise the six books in a fixed order with their compiler's name — a simple mnemonic using the first letters (Bukhari, Muslim, Dawud, Tirmidhi, Nasa'i, Majah) helps under exam pressure.",
      "Learn one distinguishing feature per book so you are not just listing titles — 'name and one fact' is the expected minimum for full AO1 marks.",
    ],
    ao2Guidance: [
      "Explain why having six independently compiled collections, rather than relying on just one, strengthens confidence in the overall body of authenticated Hadith — cross-verification across compilers reduces the risk of any single compiler's error going unchecked.",
      "Discuss why these collections remain central to Islamic scholarship, law and daily practice today, centuries after their compilation — they continue to be the primary reference point whenever a question of the Prophet's (pbuh) example arises.",
    ],
    commonMistakes: [
      "Reversing the order of authority between Bukhari and Muslim, or omitting that Bukhari is considered the most rigorously verified.",
      "Confusing Sunan and Sahih as interchangeable titles — 'Sahih' signals the compiler screened only rigorously authenticated material, while 'Sunan' collections (Abu Dawud, Tirmidhi, Nasa'i, Ibn Majah) may include and comment on weaker narrations for completeness.",
      "Naming only two or three of the six books when a question asks for the full list.",
    ],
    examTip:
      "If asked to 'explain the importance of the six authentic books', do not simply repeat their titles — pick two or three specific features (e.g. Bukhari's strict criteria, Ibn Majah's unique material) and explain what each contributes to the reliability of the overall Hadith corpus; specificity outperforms a general list.",
    relatedTopics: [
      { paper: 2, section: "history-of-hadith", slug: "compilation-stages", title: "Stages of Compilation: Companions to Tabi'un" },
      { paper: 2, section: "history-of-hadith", slug: "authentication-of-hadith", title: "Classification and Authentication of Hadith" },
    ],
  },
  {
    slug: "importance-of-hadith",
    paper: 2,
    section,
    title: "The Importance of Hadith as a Source of Guidance",
    standing: "Why Hadith stands as the second source of Islamic guidance, explaining, applying and completing the teaching of the Qur'an.",
    learningObjectives: [
      "Explain the relationship between the Qur'an and Hadith/Sunnah.",
      "Give examples of how Hadith explains or completes Qur'anic guidance.",
      "Explain why authenticating Hadith carefully matters for Islamic practice.",
    ],
    keyTerms: [
      { term: "Sunnah", meaning: "The Prophet's (pbuh) example — his words, actions and approvals — documented primarily through Hadith." },
      { term: "Bayan", meaning: "Explanation/clarification: the role the Sunnah plays in making general Qur'anic commands practically applicable." },
    ],
    explanation: [
      "The Qur'an commands believers to obey the Prophet (pbuh) alongside obeying Allah, and describes him as sent to explain what was revealed to people — this gives the Sunnah, documented through Hadith, its authority as the second source of Islamic guidance after the Qur'an itself.",
      "Much Qur'anic instruction is given in general terms, and the Sunnah supplies the practical detail: the Qur'an commands prayer, but the precise number of daily prayers, their timings and their exact method come from the Prophet's (pbuh) recorded practice; the Qur'an commands pilgrimage, but its detailed rites were demonstrated by the Prophet (pbuh) himself, most fully in the Farewell Pilgrimage.",
      "Hadith also confirms and reinforces Qur'anic moral teaching (for example on honesty, kindness to parents and neighbours, and justice), and provides guidance on matters the Qur'an does not detail explicitly, while always remaining consistent with its principles.",
      "Because so much of Islamic worship and law depends directly on Hadith, the careful process of authentication — testing both isnad and matn — is not a dry academic exercise but a safeguard: an inaccurate or fabricated report, if accepted uncritically, could distort how Muslims worship or how Islamic rulings are derived.",
      "For this reason, Hadith scholarship developed into one of the most rigorous fields of classical Islamic learning, and the resulting six authentic books and related collections remain the primary reference whenever Muslims today seek to understand how the Prophet (pbuh) himself lived out the guidance of the Qur'an.",
    ],
    keyFacts: [
      { label: "Qur'anic basis for following the Sunnah", detail: "The Qur'an commands obedience to the Prophet (pbuh) and describes his role in explaining revelation." },
      { label: "Main function of the Sunnah", detail: "Explaining, detailing and applying general Qur'anic commands (e.g. the method of prayer and pilgrimage)." },
      { label: "Why authentication matters", detail: "Because worship and legal rulings depend directly on Hadith, unreliable reports could distort practice if accepted uncritically." },
    ],
    ao1Guidance: [
      "State the Qur'an-Sunnah relationship clearly: Qur'an as first source, Sunnah as the second, explaining and applying it.",
      "Give at least one concrete example (prayer or Hajj) showing how the Sunnah supplies practical detail the Qur'an does not.",
    ],
    ao2Guidance: [
      "Explain why Islam could not be practised correctly from the Qur'an text alone, without the explanatory role of the Sunnah — this is a strong AO2 point linking directly to the sources-of-law topic.",
      "Discuss why the rigour of Hadith authentication (isnad and matn checks) matters practically, not just historically — it directly protects the accuracy of worship and law derived from the Prophet's (pbuh) example today.",
    ],
    commonMistakes: [
      "Treating Hadith and Sunnah as two unrelated topics rather than explaining that Hadith is the documented record through which the Sunnah is known.",
      "Giving an answer with no concrete example of the Sunnah explaining the Qur'an — abstract claims without illustration lose AO1 marks.",
    ],
    examTip:
      "This topic is an excellent bridge between Paper 1's 'Sources of Islamic Law' and Paper 2's Hadith section — if a question allows it, briefly cross-reference how the Qur'an and Sunnah work together as the two primary sources; examiners reward candidates who show they understand the syllabus as connected, not as isolated topics.",
    relatedTopics: [
      { paper: 2, section: "history-of-hadith", slug: "six-authentic-books", title: "The Six Authentic Books (Sihah Sittah)" },
      { paper: 1, section: "history-of-the-quran", slug: "quran-as-source-of-law", title: "The Qur'an as a Source of Islamic Law" },
    ],
  },
];
