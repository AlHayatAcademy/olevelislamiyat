// Quotes / references bank for Cambridge O Level Islamiyat (2058).
//
// Verification pass: every Qur'anic translation below is the Sahih International rendering,
// checked against the corresponding surah/ayah numbering; every Hadith reference gives the
// exact collection and number as listed on sunnah.com, with authenticity grading noted where a
// tradition's chain is disputed among scholars. All "explanation" text is original, written from
// understanding of the topic — never copied from a mark scheme. See
// docs/model-answers-and-references-build.md and the "Verification Pass" section of
// docs/build-status.md for the full source list.

export type ReferenceType =
  | "Qur'anic Reference"
  | "Hadith Reference"
  | "Historical/Seerah Quotation"
  | "Companions & Caliphs"
  | "Articles of Faith"
  | "Pillars of Islam";

export interface ReferenceEntry {
  id: string;
  type: ReferenceType;
  title: string;
  arabic?: string; // omitted entirely (not placeholder text) if not confidently verified
  arabicVerified?: boolean;
  translation: string;
  citation: string;
  explanation: string; // ORIGINAL, own-words explanation
  paper: 1 | 2;
  sectionSlug: string;
  topic: string;
  ao1Use: string;
  ao2Use: string;
  examUsageNote: string;
}

export const references: ReferenceEntry[] = [
  {
    id: "ref-ayat-al-kursi",
    type: "Qur'anic Reference",
    title: "Ayat al-Kursi (the Throne Verse)",
    translation:
      "\"Allah - there is no deity except Him, the Ever-Living, the Sustaining. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is [presently] before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.\" (Sahih International translation.)",
    citation: "Qur'an 2:255",
    explanation:
      "This verse is used in the syllabus to illustrate the theme of Allah's total, unmatched authority over everything that exists. It describes Allah as eternally living and sustaining, never overtaken by tiredness or sleep, and as the sole owner of everything in the heavens and earth, whose knowledge nothing escapes and whose position nothing can challenge without His permission. It is one of the three set passages under the 'God in Himself' theme.",
    paper: 1,
    sectionSlug: "major-themes-of-the-quran",
    topic: "Tawhid — Allah's power and authority",
    ao1Use: "Recall the verse's content and identify which specific qualities of Allah it emphasises (life, knowledge, authority, sustaining power).",
    ao2Use: "Reflect on how believing Allah is constantly watchful and all-knowing should shape a Muslim's private conduct.",
    examUsageNote: "Commonly appears in Paper 1 Question 1 as one of the two/three set passages candidates choose between.",
  },
  {
    id: "ref-al-ikhlas",
    type: "Qur'anic Reference",
    title: "Surah al-Ikhlas (Sincerity)",
    translation:
      "\"Say, 'He is Allah, [who is] One, Allah, the Eternal Refuge. He neither begets nor is born, nor is there to Him any equivalent.'\" (Sahih International translation.)",
    citation: "Qur'an 112:1-4",
    explanation:
      "This short surah is used to teach the concept of tawhid in its purest, most concentrated form. It affirms that Allah is one, that He is not dependent on anything and nothing is dependent-on-Him-in-a-created-sense, and that nothing is comparable or equal to Him. Its brevity makes it a frequently quoted anchor for explaining monotheism at O Level.",
    paper: 1,
    sectionSlug: "major-themes-of-the-quran",
    topic: "Tawhid — Allah's absolute oneness",
    ao1Use: "State the core claims of the surah about Allah's oneness and self-sufficiency.",
    ao2Use: "Discuss why rejecting any comparison to Allah matters for how Muslims worship (avoiding intermediaries or images).",
    examUsageNote: "One of the three set 'God in Himself' passages; frequently the easiest to summarise accurately due to its short length.",
  },
  {
    id: "ref-al-alaq",
    type: "Qur'anic Reference",
    title: "Surah al-Alaq, opening verses (the first revelation)",
    translation:
      "\"Recite in the name of your Lord who created - Created man from a clinging substance. Recite, and your Lord is the most Generous - Who taught by the pen - Taught man that which he knew not.\" (Sahih International translation.)",
    citation: "Qur'an 96:1-5",
    explanation:
      "These verses are traditionally identified as the first revealed to the Prophet Muhammad (pbuh) in the Cave of Hira, opening with the command to 'read/recite' and going on to describe Allah as the one who taught humankind by the pen and taught what was not known. They connect the theme of Allah as Creator with the theme of Allah as the source of knowledge.",
    paper: 1,
    sectionSlug: "major-themes-of-the-quran",
    topic: "God and Creation — knowledge and creation",
    ao1Use: "Identify this passage as the traditional first revelation and outline its content.",
    ao2Use: "Discuss the value the Qur'an places on seeking knowledge, and how that should shape a Muslim's attitude to education.",
    examUsageNote: "Doubles as content relevant to the 'History and Importance of the Qur'an' section (first revelation) as well as the set-passage question.",
  },
  {
    id: "ref-al-fatiha",
    type: "Qur'anic Reference",
    title: "Surah al-Fatiha (the Opening)",
    translation:
      "\"In the name of Allah, the Entirely Merciful, the Especially Merciful. [All] praise is [due] to Allah, Lord of the worlds - The Entirely Merciful, the Especially Merciful, Sovereign of the Day of Recompense. It is You we worship and You we ask for help. Guide us to the straight path - The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.\" (Sahih International translation.)",
    citation: "Qur'an 1:1-7",
    explanation:
      "Recited in every unit of the five daily prayers, this surah is used in the syllabus to show the relationship between Allah and His creation: praise, mercy, and reliance on Allah for guidance along a straight path. It functions as a concise statement of a believer's relationship of dependence on and gratitude towards Allah.",
    paper: 1,
    sectionSlug: "major-themes-of-the-quran",
    topic: "God and Creation — guidance and dependence on Allah",
    ao1Use: "Outline the structure and content of the surah (praise, mercy, request for guidance).",
    ao2Use: "Explain why reciting this surah repeatedly in prayer might reinforce humility and reliance on Allah in daily life.",
    examUsageNote: "One of the three set 'God and Creation' passages for Question 1.",
  },
  {
    id: "ref-al-zilzal",
    type: "Qur'anic Reference",
    title: "Surah al-Zilzal (the Earthquake)",
    translation:
      "\"When the earth is shaken with its [final] earthquake and the earth discharges its burdens and man says, 'What is [wrong] with it?' - That Day, it will report its news because your Lord has commanded it. That Day, the people will depart separated [into categories] to be shown [the result of] their deeds. So whoever does an atom's weight of good will see it, And whoever does an atom's weight of evil will see it.\" (Sahih International translation.)",
    citation: "Qur'an 99:1-8",
    explanation:
      "This surah describes the earth shaking and giving up what it holds, and states that on that day people will be shown even the smallest of their good and bad deeds. It is used to teach accountability — that no action, however small, is disregarded by Allah — linking the theme of creation's upheaval on the Last Day to personal moral responsibility.",
    paper: 1,
    sectionSlug: "major-themes-of-the-quran",
    topic: "God and Creation — accountability on the Last Day",
    ao1Use: "State the content: the earth's upheaval and the weighing of even minor deeds.",
    ao2Use: "Discuss how belief that even small deeds are recorded might change everyday behaviour.",
    examUsageNote: "One of the three set 'God and Creation' passages for Question 1.",
  },
  {
    id: "ref-hadith-intentions",
    type: "Hadith Reference",
    title: "Hadith on intentions (actions are judged by intentions)",
    translation:
      "\"Actions are judged by intentions, and every person will get what he intended...\" (translation as given on sunnah.com).",
    citation: "Sahih al-Bukhari 1 (also narrated as Sahih Muslim 1907a); narrated by Umar ibn al-Khattab (RA)",
    explanation:
      "This is one of the most frequently cited Hadiths in Islamic study, teaching that the value of an action is judged by the sincerity of intention (niyyah) behind it, not by its outward appearance alone. It underpins the syllabus theme of sincerity (ikhlas) and is often used to explain why two people performing the same visible act of worship may not receive equal reward.",
    paper: 2,
    sectionSlug: "major-teachings-of-hadith",
    topic: "Individual Conduct — Sincerity (Ikhlas)",
    ao1Use: "State the core teaching: actions are judged according to intention.",
    ao2Use: "Apply the principle to a scenario, e.g. two people giving charity for different underlying reasons.",
    examUsageNote: "A foundational Hadith likely to appear in questions on sincerity or on the purpose of worship generally.",
  },
  {
    id: "ref-hadith-greater-jihad",
    type: "Hadith Reference",
    title: "Tradition distinguishing the struggle against one's own soul from armed conflict",
    translation:
      "The commonly circulated wording has the Prophet (pbuh) telling companions returning from a campaign, \"You have come from the lesser jihad to the greater jihad\" — the greater jihad being explained as the struggle against one's own desires.",
    citation: "Widely quoted, but graded weak (da'if) by hadith specialists including Ibn Hajar al-'Asqalani and al-'Iraqi, due to weak narrators in its chain; its meaning is nonetheless supported by authentic Qur'anic and Hadith teaching on self-discipline",
    explanation:
      "This tradition is commonly used to explain that struggling against one's own desires and moral weaknesses is regarded as a demanding, ongoing form of jihad, alongside — not as a replacement for — any physical defensive struggle. It supports the syllabus theme of 'fighting against evil' understood primarily as an internal, personal struggle for self-discipline.",
    paper: 2,
    sectionSlug: "major-teachings-of-hadith",
    topic: "Individual Conduct — Fighting Against Evil",
    ao1Use: "Explain the distinction drawn between struggling against the self and other forms of struggle.",
    ao2Use: "Discuss what 'fighting against evil' means in a Muslim's everyday personal conduct rather than only in conflict situations.",
    examUsageNote: "Because authenticity is debated, an exam answer should present the idea carefully and could pair it with an undisputed Qur'anic reference on self-discipline for safety.",
  },
  {
    id: "ref-hadith-neighbour",
    type: "Hadith Reference",
    title: "Hadith on the rights of the neighbour",
    translation:
      "\"By Allah, he does not believe! By Allah, he does not believe! By Allah, he does not believe!\" It was said, \"Who, O Messenger of Allah?\" He said, \"The one whose neighbour does not feel safe from his evil.\" A related narration adds: \"He is not a believer whose stomach is filled while his neighbour goes hungry.\"",
    citation: "Sahih al-Bukhari 6016 (also Sahih Muslim 46); the neighbour-hunger narration is in al-Adab al-Mufrad 112 (graded hasan by al-Albani)",
    explanation:
      "This tradition is used to teach that true faith is incomplete if a person allows their neighbour to go hungry or suffer while they themselves are comfortable, or if their neighbour is not safe from their harm. It grounds the syllabus theme of community responsibility and social ethics in a concrete, everyday relationship (the neighbour) rather than an abstract principle.",
    paper: 2,
    sectionSlug: "major-teachings-of-hadith",
    topic: "Community Life — Social and Ethical Responsibilities",
    ao1Use: "State the specific obligation described towards neighbours.",
    ao2Use: "Discuss how this principle could be applied to modern community relationships, including with non-Muslim neighbours.",
    examUsageNote: "Useful for questions on rights of others, community life, or brotherhood, since it is concrete and easy to apply to real scenarios.",
  },
  {
    id: "ref-hadith-charity-smile",
    type: "Hadith Reference",
    title: "Tradition on small acts counting as charity",
    translation:
      "\"Your smiling in the face of your brother is charity, commanding good and forbidding evil is charity, ... your removal of a rock, a thorn, or a bone from the road is charity for you.\"",
    citation: "Jami' at-Tirmidhi 1956, narrated by Abu Dharr (RA); graded sahih by al-Albani. A related tradition on charity due for each of the body's \"joints\" (a kind word, a good deed, removing something harmful from the road) is found in Sahih Muslim 1009",
    explanation:
      "This tradition broadens the definition of charity (sadaqah) beyond giving money, to include small everyday kindnesses such as smiling at someone or clearing an obstacle from a path. It supports the syllabus theme of charity and sharing by showing that generosity is expected to be a constant, low-barrier attitude, not only an occasional formal donation.",
    paper: 2,
    sectionSlug: "major-teachings-of-hadith",
    topic: "Community Life — Charity and Sharing with Others",
    ao1Use: "List examples of small acts described as counting as charity.",
    ao2Use: "Evaluate why widening the definition of charity this way might encourage more consistent generosity than a narrow definition would.",
    examUsageNote: "Good for AO2 discussion questions asking candidates to evaluate different forms of charity.",
  },
  {
    id: "ref-seerah-first-revelation",
    type: "Historical/Seerah Quotation",
    title: "The first revelation in the Cave of Hira",
    translation:
      "Not a quotation requiring translation — a historical/biographical account, summarised in original wording below.",
    citation: "Traditional Seerah account; corresponding Qur'anic passage at Qur'an 96:1-5",
    explanation:
      "During a period of regular retreat and reflection in the Cave of Hira outside Makkah, the Prophet Muhammad (pbuh) is reported to have been approached by the Angel Jibril and commanded to recite, beginning his role as a prophet at around the age of forty. Khadija (RA), his wife, is remembered for comforting him and affirming her belief in him when he returned home shaken by the experience.",
    paper: 1,
    sectionSlug: "history-of-the-quran",
    topic: "The First Revelation",
    ao1Use: "Recall the setting, key figures and sequence of the first revelation.",
    ao2Use: "Discuss the significance of Khadija's (RA) immediate support for the Prophet's (pbuh) confidence in his mission.",
    examUsageNote: "Core content for both the 'History of the Qur'an' section and the 'Life of the Prophet' section.",
  },
  {
    id: "ref-seerah-farewell-sermon",
    type: "Historical/Seerah Quotation",
    title: "The Farewell Sermon at the Farewell Pilgrimage",
    translation:
      "One widely-transmitted line states directly: \"There is no superiority of an Arab over a non-Arab, nor of a non-Arab over an Arab, ... except by piety (taqwa).\" The summary below is an original paraphrase of the sermon's other known themes, not a direct quotation.",
    citation:
      "Delivered during the Farewell Pilgrimage, in the final year of the Prophet's (pbuh) life (9 Dhu al-Hijjah, 10 AH / March 632 CE, at Mount Arafat); the equality line is preserved in Musnad Ahmad 22978",
    explanation:
      "In his final public address, delivered to a very large gathering of pilgrims, the Prophet (pbuh) is remembered for summarising core principles of the faith he had established: the sanctity of life and property, fair treatment and rights of women, the abolition of pre-Islamic practices of interest and tribal revenge, and the equal standing of all believers regardless of race or lineage. It is treated as a summary statement of Islamic ethics delivered near the end of his mission.",
    paper: 1,
    sectionSlug: "life-of-prophet-muhammad",
    topic: "The Farewell Pilgrimage and Sermon",
    ao1Use: "Recall the setting and the main themes covered in the sermon.",
    ao2Use: "Discuss why these particular themes might have been chosen as the Prophet's (pbuh) final message to the community.",
    examUsageNote: "A high-value topic for 10-mark Paper 1 questions on the Prophet's (pbuh) later life.",
  },
  {
    id: "ref-companion-abu-bakr",
    type: "Companions & Caliphs",
    title: "Abu Bakr al-Siddiq (RA) — the first Caliph",
    translation: "Not applicable — biographical entry.",
    citation: "Caliphate: immediately following the Prophet's (pbuh) death, approx. two years in duration",
    explanation:
      "Known by the title al-Siddiq (the truthful/believing one) for his immediate acceptance of the Prophet's (pbuh) account of the Night Journey, Abu Bakr (RA) was the Prophet's (pbuh) closest companion during the Hijrah and was chosen as the first Caliph after his death. His short caliphate is remembered chiefly for holding the young Muslim community together during the Wars of Apostasy (Riddah) and for authorising the first formal compilation of the Qur'an into a single collected text.",
    paper: 2,
    sectionSlug: "rightly-guided-caliphs",
    topic: "Abu Bakr al-Siddiq (RA)",
    ao1Use: "Recall his relationship with the Prophet (pbuh), his title, and his main achievements as Caliph.",
    ao2Use: "Evaluate why maintaining unity during the Wars of Apostasy is considered his most significant achievement.",
    examUsageNote: "Frequently the subject of Paper 2 Question 3 (a)/(b) achievement-and-evaluation question pairs.",
  },
  {
    id: "ref-companion-umar",
    type: "Companions & Caliphs",
    title: "Umar ibn al-Khattab (RA) — the second Caliph",
    translation: "Not applicable — biographical entry.",
    citation: "Caliphate: approx. 10 years, following Abu Bakr (RA)",
    explanation:
      "Umar (RA) is remembered for presiding over major territorial expansion and for building lasting administrative institutions, including a register (diwan) for organising state welfare payments and the introduction of the Hijri calendar. He is also remembered for personally holding officials accountable and for living simply despite his authority, which shaped later ideas about Islamic governance and accountability.",
    paper: 2,
    sectionSlug: "rightly-guided-caliphs",
    topic: "Umar ibn al-Khattab (RA)",
    ao1Use: "List his key administrative and territorial achievements.",
    ao2Use: "Evaluate which of his qualities (accountability, simplicity, administrative skill) is most valuable in a modern leader.",
    examUsageNote: "A high-frequency topic across sessions for both descriptive and evaluative Paper 2 questions.",
  },
  {
    id: "ref-companion-uthman",
    type: "Companions & Caliphs",
    title: "Uthman ibn Affan (RA) — the third Caliph",
    translation: "Not applicable — biographical entry.",
    citation: "Caliphate: approx. 12 years, following Umar (RA)",
    explanation:
      "Uthman (RA) is remembered above all for authorising the standardisation of the Qur'anic text into a single agreed written form, distributed to major centres of the growing Muslim territories to prevent regional variation in recitation. His later years were marked by growing political unrest, which is often discussed alongside his achievements to give a balanced picture of his caliphate.",
    paper: 2,
    sectionSlug: "rightly-guided-caliphs",
    topic: "Uthman ibn Affan (RA)",
    ao1Use: "Recall his role in standardising the Qur'anic text and other key events of his rule.",
    ao2Use: "Discuss why standardising the Qur'an is considered such a historically significant achievement.",
    examUsageNote: "Also directly relevant to the 'History of the Qur'an' section (standardisation under Uthman).",
  },
  {
    id: "ref-companion-ali",
    type: "Companions & Caliphs",
    title: "Ali ibn Abi Talib (RA) — the fourth Caliph",
    translation: "Not applicable — biographical entry.",
    citation: "Caliphate: approx. 5 years, following Uthman (RA)",
    explanation:
      "Ali (RA), the Prophet's (pbuh) cousin and son-in-law, is remembered for his early acceptance of Islam, his role as a scribe of revelation, and his reputation for knowledge and judicial insight. His caliphate was dominated by internal conflict within the Muslim community, which candidates are expected to discuss with balance rather than presenting his rule as untroubled.",
    paper: 2,
    sectionSlug: "rightly-guided-caliphs",
    topic: "Ali ibn Abi Talib (RA)",
    ao1Use: "Recall his relationship to the Prophet (pbuh) and his role before and during his caliphate.",
    ao2Use: "Discuss the challenges of leading during a period of internal division within the community.",
    examUsageNote: "Often paired with Uthman's caliphate in questions about the causes of early internal conflict.",
  },
  {
    id: "ref-companion-khadija",
    type: "Companions & Caliphs",
    title: "Khadija bint Khuwaylid (RA)",
    translation: "Not applicable — biographical entry.",
    citation: "First wife of the Prophet (pbuh); first person to accept Islam",
    explanation:
      "A successful and respected businesswoman in Makkah before her marriage to the Prophet (pbuh), Khadija (RA) is remembered as the first person to believe in his prophethood and as a source of emotional, social and financial support throughout the difficult early years of his mission, including the period of the Makkan boycott.",
    paper: 1,
    sectionSlug: "first-islamic-community",
    topic: "Mothers of the Faithful (Ummahat al-Mu'minin)",
    ao1Use: "Recall key biographical facts and her role in supporting the Prophet's (pbuh) mission.",
    ao2Use: "Discuss what her example teaches about the qualities of a supportive spouse.",
    examUsageNote: "A very frequently examined figure in the 'First Islamic Community' section.",
  },
  {
    id: "ref-companion-aisha",
    type: "Companions & Caliphs",
    title: "Aisha bint Abi Bakr (RA)",
    translation: "Not applicable — biographical entry.",
    citation: "Wife of the Prophet (pbuh); daughter of Abu Bakr (RA)",
    explanation:
      "Aisha (RA) is remembered as a major source of Hadith narration after the Prophet's (pbuh) death, particularly regarding matters of private and family life, and for her scholarly role in teaching and correcting reports among the following generation. Her contribution is a key example used in the syllabus to illustrate women's role in preserving religious knowledge.",
    paper: 1,
    sectionSlug: "first-islamic-community",
    topic: "Mothers of the Faithful (Ummahat al-Mu'minin)",
    ao1Use: "Recall her role in narrating and preserving Hadith.",
    ao2Use: "Discuss the significance of women's contribution to the preservation of religious knowledge.",
    examUsageNote: "Relevant to both Paper 1 (First Islamic Community) and Paper 2 (History of Hadith) questions.",
  },
  {
    id: "ref-companion-bilal",
    type: "Companions & Caliphs",
    title: "Bilal ibn Rabah (RA) — the first mu'adhin",
    translation: "Not applicable — biographical entry.",
    citation: "Early companion; formerly enslaved; appointed to give the call to prayer",
    explanation:
      "Bilal (RA) is remembered for his endurance of severe persecution in Makkah for his early acceptance of Islam, and for later being appointed by the Prophet (pbuh) to give the call to prayer (adhan), a role of significant honour. His story is commonly used to illustrate the syllabus theme that Islam rejected distinctions of race and social status among early Muslims.",
    paper: 1,
    sectionSlug: "first-islamic-community",
    topic: "The Muhajirun (Emigrants) and Ansar (Helpers)",
    ao1Use: "Recall his background, persecution, and appointment as mu'adhin.",
    ao2Use: "Discuss what his example teaches about equality within the early Muslim community.",
    examUsageNote: "Frequently used to support discussion of equality/status themes across both papers.",
  },
  {
    id: "ref-article-belief-in-allah",
    type: "Articles of Faith",
    title: "Belief in Allah (Tawhid)",
    translation: "Not applicable — doctrinal summary.",
    citation: "First Article of Faith",
    explanation:
      "This is the foundational Article of Faith: belief that Allah alone is the Creator and Sustainer of everything, without partner, equal or comparison, and that all worship must be directed to Him alone. It underlies every other article and pillar, since actions of worship only have meaning within this framework of exclusive devotion to one God.",
    paper: 2,
    sectionSlug: "articles-of-faith-and-pillars",
    topic: "Article of Faith: Belief in Allah",
    ao1Use: "State the core content of the belief in Allah's oneness.",
    ao2Use: "Discuss how belief in Allah's oneness should influence a Muslim's priorities in daily decision-making.",
    examUsageNote: "Often used as a linking theme between Paper 1's tawhid passages and Paper 2's articles of faith.",
  },
  {
    id: "ref-article-belief-in-angels",
    type: "Articles of Faith",
    title: "Belief in Angels",
    translation: "Not applicable — doctrinal summary.",
    citation: "Second Article of Faith",
    explanation:
      "Muslims believe angels are beings created from light who carry out specific tasks assigned by Allah without deviation, including delivering revelation, recording deeds, and taking souls at the time of death. This belief reinforces the sense that a person's actions are always observed and recorded, even when no human witness is present.",
    paper: 2,
    sectionSlug: "articles-of-faith-and-pillars",
    topic: "Article of Faith: Belief in Angels",
    ao1Use: "Name specific angels and their designated roles.",
    ao2Use: "Discuss how awareness of recording angels might affect private behaviour.",
    examUsageNote: "See linked model answer for Q4(a)/2058 on this topic.",
  },
  {
    id: "ref-article-belief-in-books",
    type: "Articles of Faith",
    title: "Belief in the Revealed Books",
    translation: "Not applicable — doctrinal summary.",
    citation: "Third Article of Faith",
    explanation:
      "Muslims believe Allah sent revealed scriptures to earlier prophets, and that the Qur'an is the final, complete and preserved revelation superseding them. This belief situates the Qur'an within a wider history of divine guidance rather than presenting it as an isolated text.",
    paper: 2,
    sectionSlug: "articles-of-faith-and-pillars",
    topic: "Article of Faith: Belief in the Revealed Books",
    ao1Use: "Name the revealed books referenced in Islamic belief and their associated prophets.",
    ao2Use: "Discuss why Muslims regard the Qur'an as distinct in its preservation compared with earlier scriptures.",
    examUsageNote: "Can be linked with Paper 1 content on the Qur'an's preservation and compilation for cross-topic revision.",
  },
  {
    id: "ref-article-belief-in-prophets",
    type: "Articles of Faith",
    title: "Belief in the Prophets",
    translation: "Not applicable — doctrinal summary.",
    citation: "Fourth Article of Faith",
    explanation:
      "Muslims believe Allah sent a long line of prophets to different peoples with the same essential message of monotheism, and that Muhammad (pbuh) is the final prophet in that line. This belief connects the specific stories of individual prophets studied in Paper 1's set passages (e.g. Adam, Isa) to the broader doctrinal framework in Paper 2.",
    paper: 2,
    sectionSlug: "articles-of-faith-and-pillars",
    topic: "Article of Faith: Belief in the Prophets",
    ao1Use: "State the belief that prophets shared a common core message and that Muhammad (pbuh) is the final prophet.",
    ao2Use: "Discuss why belief in a continuous line of prophets matters for how Muslims relate to other faith communities.",
    examUsageNote: "Useful bridge topic between Paper 1 prophetic passages and Paper 2 doctrinal questions.",
  },
  {
    id: "ref-article-predestination",
    type: "Articles of Faith",
    title: "Belief in Predestination (Qadr)",
    translation: "Not applicable — doctrinal summary.",
    citation: "Article of Faith on Qadr",
    explanation:
      "This is the belief that Allah's knowledge and will encompass all that happens, while Muslims are still held responsible for the choices they make. It is often examined as a nuanced topic because candidates must show they understand it does not remove personal responsibility, avoiding an oversimplified 'everything is fixed so effort doesn't matter' framing.",
    paper: 2,
    sectionSlug: "articles-of-faith-and-pillars",
    topic: "Article of Faith: Belief in Predestination (Qadr)",
    ao1Use: "State the core belief in Allah's foreknowledge and decree.",
    ao2Use: "Discuss how belief in Qadr can be reconciled with personal responsibility for actions.",
    examUsageNote: "A topic where AO2 answers are rewarded for nuance rather than a flat statement of the belief.",
  },
  {
    id: "ref-article-last-day",
    type: "Articles of Faith",
    title: "Belief in the Day of Resurrection",
    translation: "Not applicable — doctrinal summary.",
    citation: "Article of Faith on the Last Day",
    explanation:
      "Muslims believe all people will be resurrected and held accountable for their deeds before Allah, with the balance of good and bad actions determining their fate in the hereafter. This belief connects directly to the Qur'anic passage al-Zilzal studied under the set-passage themes, which describes even the smallest deeds being shown on this day.",
    paper: 2,
    sectionSlug: "articles-of-faith-and-pillars",
    topic: "Article of Faith: Belief in the Day of Resurrection",
    ao1Use: "State the core content of the belief (resurrection, accountability, judgement).",
    ao2Use: "Discuss how belief in ultimate accountability might affect a person's everyday ethical choices.",
    examUsageNote: "Pairs naturally with the al-Zilzal set passage from Paper 1 for cross-referenced revision.",
  },
  {
    id: "ref-pillar-shahadah",
    type: "Pillars of Islam",
    title: "Shahadah (the Declaration of Faith)",
    arabic: "أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ",
    arabicVerified: true,
    translation:
      "\"I bear witness that there is no god but Allah, and I bear witness that Muhammad is the Messenger of Allah.\"",
    citation: "First Pillar of Islam; the five pillars (including this testimony) are listed in Sahih al-Bukhari 8",
    explanation:
      "The Shahadah is the verbal testimony that there is no god but Allah and that Muhammad (pbuh) is His messenger, and sincere pronouncement of it is considered the entry point into Islam. It is treated in the syllabus both as a pillar of practice and as the foundational summary of Islamic belief covered under the Articles of Faith.",
    paper: 2,
    sectionSlug: "articles-of-faith-and-pillars",
    topic: "Pillar of Islam: Shahadah",
    ao1Use: "State the content and significance of the declaration.",
    ao2Use: "Discuss why sincerity, not just the words themselves, is considered essential to a valid Shahadah.",
    examUsageNote: "Often the simplest pillar to define but a common area for candidates to lose AO2 marks by not discussing sincerity.",
  },
  {
    id: "ref-pillar-salah",
    type: "Pillars of Islam",
    title: "Salah (the five daily prayers)",
    translation: "Not applicable — practice summary.",
    citation: "Second Pillar of Islam",
    explanation:
      "Salah refers to the five obligatory daily prayers performed at set times, preceded by ritual purification, and is regarded as a direct, structured connection between the worshipper and Allah. The syllabus expects candidates to know both the practical conditions for valid prayer and its wider spiritual and social significance, including its role in maintaining daily discipline.",
    paper: 2,
    sectionSlug: "articles-of-faith-and-pillars",
    topic: "Pillar of Islam: Salah",
    ao1Use: "Describe the conditions for valid Salah and its basic structure.",
    ao2Use: "Discuss the significance of praying at fixed times throughout the day.",
    examUsageNote: "See linked model answer for the 2025 Oct/Nov Paper 2 question on Salah's conditions and significance.",
  },
  {
    id: "ref-pillar-zakah",
    type: "Pillars of Islam",
    title: "Zakah (obligatory almsgiving)",
    translation: "Not applicable — practice summary.",
    citation: "Third Pillar of Islam",
    explanation:
      "Zakah is an annual, calculated payment owed by Muslims whose wealth exceeds a set threshold (nisab), distributed among specified categories of people in need. It is distinguished in the syllabus from general voluntary charity (sadaqah) by being a fixed, obligatory amount rather than an optional gift.",
    paper: 2,
    sectionSlug: "articles-of-faith-and-pillars",
    topic: "Pillar of Islam: Zakah",
    ao1Use: "State the conditions, rate and recipient categories of Zakah.",
    ao2Use: "Discuss how Zakah functions as a built-in mechanism for social and economic justice.",
    examUsageNote: "See linked model answer for the 2024 Oct/Nov Paper 2 question on Zakah's conditions and recipients.",
  },
  {
    id: "ref-pillar-sawm",
    type: "Pillars of Islam",
    title: "Sawm (fasting in Ramadan)",
    translation: "Not applicable — practice summary.",
    citation: "Fourth Pillar of Islam",
    explanation:
      "Sawm is the obligation to abstain from food, drink and other specified acts from dawn to sunset throughout the month of Ramadan, with recognised exemptions for illness, travel and other genuine hardship. Beyond the physical discipline, it is presented in the syllabus as a means of developing self-restraint and empathy with those who go without.",
    paper: 2,
    sectionSlug: "articles-of-faith-and-pillars",
    topic: "Pillar of Islam: Sawm",
    ao1Use: "State the conditions of fasting and recognised exemptions.",
    ao2Use: "Discuss how the experience of hunger during fasting might build empathy for the poor.",
    examUsageNote: "Frequently paired with Zakah in questions comparing how different pillars build social awareness.",
  },
  {
    id: "ref-pillar-hajj",
    type: "Pillars of Islam",
    title: "Hajj (the pilgrimage to Makkah)",
    translation: "Not applicable — practice summary.",
    citation: "Fifth Pillar of Islam",
    explanation:
      "Hajj is the pilgrimage to Makkah, obligatory once in a lifetime for Muslims who are physically and financially able, performed during a specified period and involving a defined sequence of rites. It is presented in the syllabus as an act that unites Muslims from different backgrounds in identical dress and ritual, reinforcing the theme of equality also seen in the Farewell Sermon.",
    paper: 2,
    sectionSlug: "articles-of-faith-and-pillars",
    topic: "Pillar of Islam: Hajj",
    ao1Use: "Describe the conditions for Hajj becoming obligatory and outline its main rites.",
    ao2Use: "Discuss how the shared dress and rituals of Hajj express the idea of equality among Muslims.",
    examUsageNote: "Can be cross-referenced with the Farewell Sermon material from Paper 1 for a combined equality-themed answer.",
  },
];

export const referenceTypes: ReferenceType[] = [
  "Qur'anic Reference",
  "Hadith Reference",
  "Historical/Seerah Quotation",
  "Companions & Caliphs",
  "Articles of Faith",
  "Pillars of Islam",
];

export function slugifyType(type: ReferenceType): string {
  return type.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function getReferencesByType(type: ReferenceType): ReferenceEntry[] {
  return references.filter((r) => r.type === type);
}

export function getReferenceById(id: string): ReferenceEntry | undefined {
  return references.find((r) => r.id === id);
}
