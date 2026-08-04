import type { Topic } from "./types";

const section = "major-themes-of-the-quran";

// NOTE ON VERSE TEXT: quoted wording below is the Sahih International English translation,
// checked against the surah/ayah numbering given (see docs/build-status.md, "Verification Pass",
// for the full list of sources used). Each lesson states the passage reference, quotes the key
// wording, and gives an original explanation of its themes.

export const paper1MajorThemesTopics: Topic[] = [
  {
    slug: "ayat-al-kursi",
    paper: 1,
    section,
    title: "Theme 1 (God in Himself): Ayat al-Kursi — Qur'an 2:255",
    standing: "The best-known single verse on Tawhid: Allah's oneness, self-sufficiency and total knowledge and power.",
    learningObjectives: [
      "Identify Ayat al-Kursi as Qur'an 2:255 and place it under the theme of Tawhid (God in Himself).",
      "State the main attributes of Allah taught in the verse.",
      "Explain why this passage is regarded as central to Islamic belief about God.",
    ],
    keyTerms: [
      { term: "Tawhid", meaning: "The oneness and uniqueness of Allah — the central theme of this passage group." },
      { term: "Al-Hayy al-Qayyum", meaning: "Two of Allah's names occurring in this verse: the Ever-Living, the Self-Subsisting (Sustainer of all)." },
      { term: "Kursi", meaning: "Often translated \"Footstool\" — used in the verse as an image of the vastness of Allah's authority over the heavens and earth." },
    ],
    explanation: [
      "Ayat al-Kursi (Qur'an 2:255) is one of the passages set under Theme 1, God in Himself (Tawhid), and is widely regarded by Muslims as the single verse that most concentrates the Qur'an's teaching about Allah's nature.",
      "Sahih International translation: \"Allah - there is no deity except Him, the Ever-Living, the Sustaining. Neither drowsiness overtakes Him nor sleep...\" — the verse declares that Allah alone deserves worship, that He is Ever-Living and Self-Subsisting, that neither drowsiness nor sleep overtakes Him, and that everything in the heavens and the earth belongs to Him.",
      "It teaches that no one can intercede with Allah except by His permission, that His knowledge encompasses everything (what is before and behind creation), and that His authority (Kursi) extends over the heavens and the earth without any effort or fatigue to Him.",
      "The verse closes by describing Allah as the Most High, the Most Great — reinforcing that He is above and beyond any limitation that applies to created things.",
      "Together these statements reject weaknesses that idolatrous Arabia had sometimes projected onto its gods (needing rest, needing helpers, being limited in knowledge) and instead present a God who is complete, self-sufficient and all-encompassing.",
    ],
    keyFacts: [
      { label: "Reference", detail: "Qur'an 2:255 (Surah al-Baqarah)." },
      { label: "Common name", detail: "Ayat al-Kursi (\"the Verse of the Throne/Footstool\")." },
      { label: "Core theme", detail: "Allah's oneness, self-sufficiency, complete knowledge and unlimited authority." },
      { label: "Attributes named", detail: "The Ever-Living (al-Hayy), the Self-Subsisting (al-Qayyum), the Most High, the Most Great." },
    ],
    ao1Guidance: [
      "Be able to state the reference (2:255) and name (Ayat al-Kursi) accurately.",
      "List the specific attributes and claims made about Allah in the verse rather than a vague summary — e.g. no sleep/drowsiness, ownership of the heavens and earth, complete knowledge, intercession only by His permission.",
    ],
    ao2Guidance: [
      "Explain why a verse describing Allah as needing no rest and having complete knowledge is significant for a believer's sense of security and trust — nothing escapes Allah's awareness or control.",
      "Discuss why the rejection of unauthorised intercession matters for the theme of Tawhid: it removes any middle figure between the worshipper and Allah, reinforcing direct accountability and direct worship.",
      "Reflect on how belief in Allah's total authority (Kursi extending over the heavens and earth) can shape a Muslim's humility and reliance on Allah in daily life.",
    ],
    commonMistakes: [
      "Treating \"Kursi\" as a literal physical throne identical to a human seat rather than as a description conveying the vastness of Allah's authority.",
      "Confusing this passage with Surah al-Ikhlas — both concern Tawhid but Ayat al-Kursi is longer and focuses more on Allah's knowledge, power and sustaining role, while al-Ikhlas is a short declaration of absolute oneness.",
      "Giving only the theme (\"it's about Tawhid\") without any specific content from the verse — examiners expect named attributes and ideas, not just the label.",
    ],
    examTip:
      "For passage questions, always link specific content back to the theme heading given in the syllabus (God in Himself) — state the attribute, then explain briefly what it teaches about who Allah is, rather than just paraphrasing the verse.",
    relatedTopics: [
      { paper: 1, section, slug: "al-ikhlas-112", title: "Theme 1 (God in Himself): Surah al-Ikhlas — Qur'an 112:1-4" },
      { paper: 1, section, slug: "al-anam-6-101-103", title: "Theme 1 (God in Himself): Qur'an 6:101-103" },
    ],
  },
  {
    slug: "al-anam-6-101-103",
    paper: 1,
    section,
    title: "Theme 1 (God in Himself): Qur'an 6:101-103",
    standing: "A passage rejecting the idea that Allah could have a son or partner, and affirming Him as Originator of the heavens and earth.",
    learningObjectives: [
      "State the reference and main claim of this passage.",
      "Explain what the passage teaches about Allah as Creator and about His uniqueness.",
      "Explain why rejecting the idea of a divine son or partner matters for Tawhid.",
    ],
    keyTerms: [
      { term: "Badi' al-Samawati wal-Ard", meaning: "\"Originator of the heavens and the earth\" — a description of Allah used in this passage." },
      { term: "Shirk", meaning: "Associating partners with Allah in His divinity or worship — the belief this passage rejects." },
    ],
    explanation: [
      "This passage (Qur'an 6:101-103), set under Theme 1, God in Himself, addresses the question of how Allah could have a son when He has no consort or equal, and affirms Him as the Originator of the heavens and the earth who created everything that exists.",
      "Sahih International translation: \"[He is] Originator of the heavens and the earth. How could He have a son when He does not have a companion and He created all things? And He is, of all things, Knowing.\" (Qur'an 6:101) — the passage's reasoning is presented as a direct challenge to polytheistic and other beliefs current in pre-Islamic Arabia and among some other communities that attributed offspring or partners to God.",
      "It states that Allah's knowledge encompasses all things, and that human vision cannot fully perceive Him while He perceives all things — again stressing His transcendence above the limitations of created beings.",
      "The passage concludes that Allah alone deserves to be relied upon and worshipped as the one Guardian and Sustainer (Wakil) over all things, since He alone is their Creator.",
    ],
    keyFacts: [
      { label: "Reference", detail: "Qur'an 6:101-103 (Surah al-An'am)." },
      { label: "Core theme", detail: "Allah has no son, no partner and no equal; He is the sole Creator of everything." },
      { label: "Key description used", detail: "Originator of the heavens and the earth (Badi' al-Samawati wal-Ard)." },
    ],
    ao1Guidance: [
      "State clearly that the passage rejects the idea of Allah having a son or a partner, and give the reasoning offered (He has no consort/equal, so how could He have offspring).",
      "Mention both the point about creation (Originator of everything) and the point about vision/perception (human sight cannot encompass Him, but He encompasses all sight).",
    ],
    ao2Guidance: [
      "Explain the significance of rejecting the idea of a divine son or partner for Muslim belief — it protects the absolute uniqueness of Allah, distinguishing Islamic monotheism from beliefs that attribute offspring or family relationships to God.",
      "Discuss why grounding worship in Allah's role as sole Creator (rather than in tradition or fear) gives Tawhid a rational, reasoned basis that this passage is keen to establish.",
    ],
    commonMistakes: [
      "Describing this passage only as \"anti-Christian\" — while it is relevant to any belief attributing a son to God, in its Makkan context it primarily addresses Arabian polytheist beliefs; keep the explanation general to what the text itself says.",
      "Forgetting to mention the reasoning given (no consort, so no offspring) and only stating the conclusion.",
    ],
    examTip:
      "When two passages share a theme (here, rejecting shirk, similar to Ayat al-Kursi and al-Ikhlas), make sure your answer identifies what is distinctive about each one — this passage's distinctive feature is the reasoning from \"no consort\" to \"no son\".",
    relatedTopics: [
      { paper: 1, section, slug: "ayat-al-kursi", title: "Theme 1 (God in Himself): Ayat al-Kursi — Qur'an 2:255" },
      { paper: 1, section, slug: "al-ikhlas-112", title: "Theme 1 (God in Himself): Surah al-Ikhlas — Qur'an 112:1-4" },
    ],
  },
  {
    slug: "al-ikhlas-112",
    paper: 1,
    section,
    title: "Theme 1 (God in Himself): Surah al-Ikhlas — Qur'an 112:1-4",
    standing: "The shortest and most concentrated statement of Tawhid in the Qur'an: Allah is One, Eternal, without offspring or equal.",
    learningObjectives: [
      "State the reference and structure of Surah al-Ikhlas.",
      "Explain each of its four short statements about Allah.",
      "Explain why this surah is considered to summarise the whole theme of Tawhid.",
    ],
    keyTerms: [
      { term: "Al-Ikhlas", meaning: "\"Sincerity/Purity [of faith]\" — the name of this short surah, reflecting its pure statement of Allah's oneness." },
      { term: "Al-Samad", meaning: "\"The Eternal Refuge\"/\"The One depended upon by all, who depends on none\" — a name of Allah occurring in this surah." },
    ],
    explanation: [
      "Surah al-Ikhlas (Qur'an 112:1-4) is set under Theme 1, God in Himself, and is often treated as the clearest and most compact declaration of Tawhid in the entire Qur'an, traditionally understood to be equal in merit to a substantial portion of the Qur'an's teaching because of how directly it addresses Allah's nature.",
      "Sahih International translation: \"Say, 'He is Allah, [who is] One, Allah, the Eternal Refuge. He neither begets nor is born, nor is there to Him any equivalent.'\" — its four short statements affirm, in turn, that Allah is One; that He is al-Samad (the Eternal Refuge on whom everything depends, while He depends on nothing); that He neither begets nor was begotten; and that there is nothing comparable or equal to Him.",
      "Each statement closes off a different possible misunderstanding of God: plurality (answered by \"One\"), need or dependency (answered by al-Samad), family relationships such as parent or child (answered by \"neither begets nor is begotten\"), and any equal or resemblance (answered by \"none comparable to Him\").",
    ],
    keyFacts: [
      { label: "Reference", detail: "Qur'an 112:1-4 (Surah al-Ikhlas)." },
      { label: "Length", detail: "Four short verses — the most concise Qur'anic statement of Tawhid." },
      { label: "Four claims made", detail: "Allah is One; He is al-Samad; He neither begets nor is begotten; none is comparable to Him." },
    ],
    ao1Guidance: [
      "Be able to state all four claims of the surah in order, not just \"Allah is One\" — examiners reward completeness on a short, defined passage like this.",
      "Know the meaning of al-Samad as more than just \"eternal\" — it conveys total independence combined with being the one all creation depends upon.",
    ],
    ao2Guidance: [
      "Explain why a surah this short is regarded as carrying such theological weight — its concentrated, unambiguous language leaves no room for compromise on Allah's absolute oneness.",
      "Discuss how each of the four statements individually rules out a specific false belief (polytheism, dependency, divine offspring, resemblance to creation), giving a complete picture of correct belief about Allah in a few words.",
    ],
    commonMistakes: [
      "Only quoting \"Say, He is Allah, One\" and stopping there — all four clauses are examinable content.",
      "Translating al-Samad loosely as just \"eternal\", missing the equally important idea of total self-sufficiency/being depended upon by all creation.",
    ],
    examTip:
      "Because this surah is so short and precise, model answers should quote or closely paraphrase all four statements in sequence, then briefly explain what false belief each one rules out — this structure demonstrates full AO1 coverage efficiently within limited time.",
    relatedTopics: [
      { paper: 1, section, slug: "ayat-al-kursi", title: "Theme 1 (God in Himself): Ayat al-Kursi — Qur'an 2:255" },
      { paper: 1, section, slug: "al-anam-6-101-103", title: "Theme 1 (God in Himself): Qur'an 6:101-103" },
    ],
  },
  {
    slug: "al-fatiha-1-7",
    paper: 1,
    section,
    title: "Theme 2 (God and Creation): Surah al-Fatiha — Qur'an 1:1-7",
    standing: "The opening surah of the Qur'an: Allah as Lord of all worlds, Most Merciful, Master of Judgement, and the one asked for guidance.",
    learningObjectives: [
      "State the reference and structure of Surah al-Fatiha.",
      "Explain what the surah teaches about Allah's relationship with creation.",
      "Explain why it is recited in every unit (rak'ah) of the five daily prayers.",
    ],
    keyTerms: [
      { term: "Rabb al-'Alamin", meaning: "\"Lord of all the worlds\" — the description of Allah that opens the surah, emphasising His care and authority over all creation." },
      { term: "Al-Sirat al-Mustaqim", meaning: "\"The straight path\" — the guidance the worshipper asks Allah for at the close of the surah." },
    ],
    explanation: [
      "Surah al-Fatiha (Qur'an 1:1-7) is set under Theme 2, God's relationship with the created world, because rather than describing Allah in the abstract, it addresses Him directly as Lord and Sustainer of creation and expresses the worshipper's dependence on Him.",
      "Sahih International translation: \"In the name of Allah, the Entirely Merciful, the Especially Merciful. [All] praise is [due] to Allah, Lord of the worlds... Sovereign of the Day of Recompense. It is You we worship and You we ask for help...\" — it opens by praising Allah as Lord of all the worlds, the Most Merciful, and Master of the Day of Judgement, before the worshipper declares that Allah alone is worshipped and Allah alone is asked for help.",
      "The surah then asks Allah to guide the worshipper to the straight path — the path of those He has favoured, not of those who have earned His anger or gone astray.",
      "Because it establishes worship, dependence and guidance as the core of the relationship between Allah and human beings, this surah is recited in every rak'ah of the five daily prayers, making it the most repeated passage in Muslim daily life.",
    ],
    keyFacts: [
      { label: "Reference", detail: "Qur'an 1:1-7 (Surah al-Fatiha, \"The Opening\")." },
      { label: "Core theme", detail: "Allah as Lord, Merciful, and Master of Judgement; total worship and dependence on Him; a prayer for guidance." },
      { label: "Liturgical significance", detail: "Recited in every rak'ah of the five daily prayers." },
    ],
    ao1Guidance: [
      "Sequence the surah's content accurately: praise of Allah's names/titles → declaration of exclusive worship and help-seeking → request for guidance to the straight path.",
      "Know that it is recited in every rak'ah of every prayer — a frequently tested fact linking this passage to the Pillars of Islam.",
    ],
    ao2Guidance: [
      "Explain why opening with Allah's mercy (Most Merciful) alongside His authority (Master of Judgement) balances hope and accountability in a believer's relationship with Allah.",
      "Discuss the significance of the worshipper declaring dependence on Allah alone (\"You alone we worship, You alone we ask for help\") for the theme of God's relationship with creation — it defines that relationship as one of total reliance.",
      "Reflect on why asking for guidance to \"the straight path\" repeatedly, several times a day, is significant for shaping ongoing moral and spiritual direction rather than being a one-off request.",
    ],
    commonMistakes: [
      "Describing al-Fatiha only as \"the first chapter\" without engaging with its content or theme.",
      "Missing the link to the five daily prayers when asked about the surah's importance — this liturgical role is a key examinable point.",
    ],
    examTip:
      "Al-Fatiha connects naturally to Paper 2's Pillars of Islam (Salah) content — cross-reference this connection briefly if relevant to strengthen an AO2 answer on the surah's ongoing importance in Muslim life.",
    relatedTopics: [
      { paper: 1, section, slug: "al-alaq-96-1-5", title: "Theme 2 (God and Creation): Qur'an 96:1-5" },
      { paper: 2, section: "articles-of-faith-and-pillars", slug: "salah", title: "Pillar of Islam: Salah" },
    ],
  },
  {
    slug: "al-alaq-96-1-5",
    paper: 1,
    section,
    title: "Theme 2 (God and Creation): Qur'an 96:1-5",
    standing: "The opening verses of the first revelation: Allah as Creator of humanity and Teacher of knowledge by the pen.",
    learningObjectives: [
      "State the reference and context of this passage as the first revelation.",
      "Explain what it teaches about Allah's relationship with human beings through creation and knowledge.",
      "Explain why knowledge is presented as a divine gift in this passage.",
    ],
    keyTerms: [
      { term: "Iqra", meaning: "\"Read/Recite\" — the opening command of the passage and of the Qur'an's revelation as a whole." },
      { term: "'Alaq", meaning: "A clinging substance — the stage of development from which the passage says Allah created man." },
    ],
    explanation: [
      "Qur'an 96:1-5, the opening verses of Surah al-'Alaq, is set under Theme 2, God's relationship with the created world, because it presents Allah directly as the one who creates and sustains human life and teaches human beings what they did not know.",
      "Sahih International translation: \"Recite in the name of your Lord who created - Created man from a clinging substance. Recite, and your Lord is the most Generous - Who taught by the pen - Taught man that which he knew not.\" — the passage commands \"Recite in the name of your Lord who created\", then states that He created man from a clinging substance ('alaq), and that this same Lord is Most Generous, having taught by the pen and taught human beings what they did not know.",
      "This is the same passage historically revealed first to the Prophet (pbuh) in the Cave of Hira, so it carries a double significance: as the start of the Qur'an's revelation, and as a passage that ties creation directly to the gift of knowledge and learning.",
      "By pairing \"created\" with \"taught\", the passage presents Allah's care for humanity as extending beyond physical creation into intellectual and moral guidance.",
    ],
    keyFacts: [
      { label: "Reference", detail: "Qur'an 96:1-5 (Surah al-'Alaq)." },
      { label: "Historical significance", detail: "The opening verses of the first revelation, received in the Cave of Hira." },
      { label: "Core theme", detail: "Allah as Creator of human beings and Teacher of knowledge \"by the pen\"." },
    ],
    ao1Guidance: [
      "State that this is the first revealed passage and give its content: the command to read, creation from a clinging substance, and Allah as Teacher by the pen.",
      "Avoid duplicating the full narrative of the first revelation event here (Khadijah, Waraqah etc.) — that belongs to the History of the Qur'an topic; for this passage, focus on its content and theme.",
    ],
    ao2Guidance: [
      "Explain the significance of Allah being described as Teacher (\"taught by the pen\", \"taught man what he did not know\") for the Islamic view of knowledge and education as a sacred pursuit connected to God.",
      "Discuss why beginning revelation with a command to \"read\" — addressed to a Prophet (pbuh) who could not read or write — is often understood as showing that guidance and knowledge come ultimately from Allah rather than from human ability alone.",
    ],
    commonMistakes: [
      "Confusing this passage-theme question (God's relationship with creation, focused on knowledge/creation) with the History of the Qur'an question about the first revelation event — answer according to what the specific question is asking.",
      "Omitting the reference to the \"pen\" and knowledge, focusing only on the creation of man.",
    ],
    examTip:
      "If a question asks specifically about this passage's theme, keep the focus on creation and knowledge as evidence of Allah's relationship with humanity, rather than retelling the full story of the night in Hira.",
    relatedTopics: [
      { paper: 1, section: "history-of-the-quran", slug: "first-revelation", title: "The First Revelation" },
      { paper: 1, section, slug: "al-zilzal-99-1-8", title: "Theme 2 (God and Creation): Surah al-Zilzal — Qur'an 99:1-8" },
    ],
  },
  {
    slug: "al-zilzal-99-1-8",
    paper: 1,
    section,
    title: "Theme 2 (God and Creation): Surah al-Zilzal — Qur'an 99:1-8",
    standing: "A short surah on the final earthquake and the Day of Judgement, teaching that even the smallest deed is seen and weighed by Allah.",
    learningObjectives: [
      "State the reference and main scene described in this surah.",
      "Explain the teaching that even the smallest good or evil deed will be shown and accounted for.",
      "Explain why this passage falls under God's relationship with creation rather than only under judgement.",
    ],
    keyTerms: [
      { term: "Zilzal", meaning: "Earthquake/violent shaking — the event described at the start of the surah, understood as part of the signs of the Last Day." },
      { term: "Mithqal Dharrah", meaning: "\"The weight of an atom/a speck\" — the phrase used to describe how small a deed can be and still be accounted for." },
    ],
    explanation: [
      "Surah al-Zilzal (Qur'an 99:1-8) is set under Theme 2, God's relationship with the created world, because it describes creation (the earth itself) responding to Allah's command and testifying on the Day of Judgement, linking the physical world directly to divine accountability.",
      "Sahih International translation: \"When the earth is shaken with its [final] earthquake and the earth discharges its burdens... That Day, it will report its news because your Lord has commanded it. That Day, the people will depart separated [into categories] to be shown [the result of] their deeds.\" — it describes the earth being shaken with its [final] earthquake, casting out its burdens, and, by Allah's inspiration, reporting its news, on a day when people will come forward in scattered groups to be shown their deeds.",
      "The surah closes with the well-known statement that whoever does an atom's weight of good will see it, and whoever does an atom's weight of evil will see it — stressing that no deed, however small, is beneath Allah's notice.",
      "This passage links the created world (the earth, treated almost as a witness) to Allah's justice, showing that His relationship with creation includes accountability as well as sustenance and guidance.",
    ],
    keyFacts: [
      { label: "Reference", detail: "Qur'an 99:1-8 (Surah al-Zilzal, \"The Earthquake\")." },
      { label: "Core theme", detail: "The earth testifying on the Last Day; every deed, however small, is seen and accounted for by Allah." },
      { label: "Key phrase", detail: "\"Whoever does an atom's weight of good will see it, and whoever does an atom's weight of evil will see it.\"" },
    ],
    ao1Guidance: [
      "Describe the scene accurately: the earth's shaking, its burdens cast out, it reporting its news by Allah's command, people shown their deeds in groups.",
      "Quote or closely paraphrase the closing statement about the atom's weight of good and evil — this is the surah's best-known and most examinable line.",
    ],
    ao2Guidance: [
      "Explain why teaching that even an atom's weight of good or evil counts is significant for daily moral behaviour — it removes the excuse that \"small\" wrongs or acts of kindness do not matter.",
      "Discuss the significance of the earth itself being described as testifying — it presents all of creation, not only human witnesses, as part of Allah's system of justice and accountability.",
    ],
    commonMistakes: [
      "Treating this purely as a Day of Judgement passage disconnected from the \"created world\" theme — the earth's role as an active witness is the link that places it under Theme 2.",
      "Paraphrasing the closing statement inaccurately (e.g. omitting that it applies to evil as well as good).",
    ],
    examTip:
      "When a passage links two ideas (here: the created world and the Last Day), explicitly state both in your answer — examiners are checking that you can place a passage under the correct set theme with reasoning, not just recall its content.",
    relatedTopics: [
      { paper: 1, section, slug: "al-alaq-96-1-5", title: "Theme 2 (God and Creation): Qur'an 96:1-5" },
      { paper: 2, section: "articles-of-faith-and-pillars", slug: "belief-in-resurrection", title: "Article of Faith: Belief in the Day of Resurrection" },
    ],
  },
  {
    slug: "adam-al-baqarah-2-30-37",
    paper: 1,
    section,
    title: "Theme 3 (God and His Messengers): Adam — Qur'an 2:30-37",
    standing: "Allah teaching Adam knowledge, honouring him as vicegerent, and forgiving him after his error — the pattern of guidance, dignity and mercy.",
    learningObjectives: [
      "State the reference and outline of the passage about Adam.",
      "Explain what the passage teaches about human dignity, knowledge and accountability.",
      "Explain why this passage is grouped under God's relationship with His Messengers even though Adam is not usually the focus of a \"mission\" narrative in the same way as later prophets.",
    ],
    keyTerms: [
      { term: "Khalifah", meaning: "Vicegerent/steward — the role Allah announces for Adam on earth in this passage." },
      { term: "Tawbah", meaning: "Repentance — what Adam turns to after his error, and what Allah accepts from him." },
    ],
    explanation: [
      "Qur'an 2:30-37 is set under Theme 3, God's relationship with His Messengers, because it establishes the pattern seen with every prophet afterwards: Allah communicates directly, grants knowledge and honour, and responds to human weakness with guidance and mercy rather than abandonment.",
      "Sahih International translation (2:30): \"And [mention, O Muhammad], when your Lord said to the angels, 'Indeed, I will make upon the earth a successive authority.' They said, 'Will You place upon it one who causes corruption therein and sheds blood, while we declare Your praise and sanctify You?' Allah said, 'Indeed, I know that which you do not know.'\" — the passage describes Allah informing the angels that He is placing a vicegerent (khalifah) on earth; the angels question this, given the potential for corruption and bloodshed, but Allah responds that He knows what they do not.",
      "Allah then teaches Adam the names of things and asks the angels to name them; they cannot, and Iblis (Satan) is shown refusing to prostrate to Adam out of pride, setting up the ongoing theme of arrogance versus humility.",
      "Adam and his wife are tested, make an error, and turn to Allah in sincere repentance; Allah, described as Oft-Returning and Merciful, accepts their repentance.",
    ],
    keyFacts: [
      { label: "Reference", detail: "Qur'an 2:30-37 (Surah al-Baqarah)." },
      { label: "Core theme", detail: "Human dignity through knowledge and vicegerency; the danger of pride (Iblis); the mercy of accepted repentance." },
      { label: "Key figures", detail: "Adam, the angels, Iblis." },
    ],
    ao1Guidance: [
      "Sequence the passage: announcement of vicegerency → angels' question and Allah's reply → Adam taught the names → Iblis's refusal to prostrate → the test, error and accepted repentance.",
      "Be precise that it is knowledge (\"the names\") that distinguishes Adam and demonstrates his honour, not simply his creation.",
    ],
    ao2Guidance: [
      "Explain the significance of Allah teaching Adam directly as showing that guidance for humanity begins from the very first human being, establishing a consistent pattern of divine communication continued through later prophets.",
      "Discuss what the passage teaches about human responsibility and forgiveness: error is part of the human condition, but sincere repentance is always met with Allah's mercy — a reassuring and repeated Qur'anic theme.",
      "Evaluate the contrast between Iblis's pride and Adam's humility as a moral lesson about the danger of arrogance and the value of acknowledging fault.",
    ],
    commonMistakes: [
      "Treating Adam as outside the theme of \"Messengers\" — in the Islamic tradition Adam is recognised as a prophet, and this passage is explicitly grouped under this theme in the syllabus.",
      "Omitting the angels' question and Allah's reply, which is an important part of the passage's content on divine knowledge.",
    ],
    examTip:
      "Because this theme groups several different prophets' stories together, always be ready to compare passages when asked — note that Adam's story emphasises knowledge, honour and repentance, distinct from Ibrahim's emphasis on reasoned rejection of false gods.",
    relatedTopics: [
      { paper: 1, section, slug: "isa-al-maidah-5-110", title: "Theme 3 (God and His Messengers): Isa — Qur'an 5:110" },
      { paper: 1, section, slug: "muhammad-al-duha-93", title: "Theme 3 (God and His Messengers): Muhammad (pbuh) — Qur'an 93:1-11" },
    ],
  },
  {
    slug: "isa-al-maidah-5-110",
    paper: 1,
    section,
    title: "Theme 3 (God and His Messengers): Isa — Qur'an 5:110",
    standing: "Allah addressing Isa (Jesus), recounting the favours and miracles granted to him as a human messenger, not a divine being.",
    learningObjectives: [
      "State the reference and content of the passage about Isa (AS).",
      "Explain the miracles and blessings the passage attributes to Isa (AS) and to whom they are credited.",
      "Explain why the passage insists on Isa's (AS) status as a messenger rather than as divine.",
    ],
    keyTerms: [
      { term: "Ruh al-Qudus", meaning: "The Holy Spirit — named in the passage as strengthening Isa (AS) in his mission." },
      { term: "Bi-idhni", meaning: "\"By My [Allah's] permission\" — the repeated phrase attributing Isa's (AS) miracles to Allah's power, not his own." },
    ],
    explanation: [
      "Qur'an 5:110 is set under Theme 3, God's relationship with His Messengers, and takes the form of Allah addressing Isa (AS) directly, recalling the favours granted to him and his mother and the miracles performed through him.",
      "Sahih International translation (5:110, opening): \"...when I supported you with the Pure Spirit and you spoke to the people in the cradle and in maturity; and [remember] when I taught you writing and wisdom and the Torah and the Gospel; and when you designed from clay [what was] like the form of a bird with My permission, then you breathed into it, and it became a bird with My permission; and you healed the blind and the leper with My permission; and when you brought forth the dead with My permission...\" — the passage recalls Allah strengthening Isa (AS) with the Holy Spirit, enabling him to speak to people in infancy and maturity, teaching him the Scripture, wisdom, the Torah and the Gospel, and enabling him — always \"by Allah's permission\" — to shape a form like a bird and breathe life into it, heal the blind and the leper, and raise the dead.",
      "The repeated phrase \"by My permission\" is the passage's central theological point: every miracle credited to Isa (AS) is explicitly attributed to Allah's power acting through him, not to any independent divine power of his own.",
      "This directly supports the Islamic understanding of Isa (AS) as a human prophet and messenger, honoured with extraordinary miracles as a sign for his people, rather than as divine.",
    ],
    keyFacts: [
      { label: "Reference", detail: "Qur'an 5:110 (Surah al-Ma'idah)." },
      { label: "Core theme", detail: "Isa's (AS) miracles are performed by Allah's permission; he is a messenger, not divine." },
      { label: "Miracles listed", detail: "Speaking in infancy, shaping a bird from clay and giving it life, healing the blind and the leper, raising the dead — all \"by Allah's permission\"." },
    ],
    ao1Guidance: [
      "List the specific miracles named in the passage, and in each case note the accompanying phrase \"by Allah's permission\".",
      "Mention that Isa (AS) was also taught the Scripture, wisdom, the Torah and the Gospel — the passage is not only about miracles.",
    ],
    ao2Guidance: [
      "Explain the theological significance of \"by My permission\" being repeated for every miracle — it is the passage's method of firmly establishing that the miracles are Allah's doing, and Isa (AS) is the channel, not the source, of the power involved.",
      "Discuss why this passage matters for interfaith understanding: it affirms respect for Isa (AS) as a great prophet with real miracles while maintaining a clear distinction from later Christian doctrines of his divinity.",
    ],
    commonMistakes: [
      "Listing the miracles without the phrase \"by Allah's permission\" attached, which loses the passage's central point.",
      "Assuming this passage denies Isa's (AS) miracles happened — it affirms them fully, while clarifying their source.",
    ],
    examTip:
      "When this passage comes up, structure your answer as \"miracle → attributed explicitly to Allah's permission\" for each example, since the repeated attribution is exactly what the syllabus theme (God's relationship with His Messengers, not the messengers' independent power) is testing.",
    relatedTopics: [
      { paper: 1, section, slug: "adam-al-baqarah-2-30-37", title: "Theme 3 (God and His Messengers): Adam — Qur'an 2:30-37" },
      { paper: 1, section, slug: "muhammad-al-duha-93", title: "Theme 3 (God and His Messengers): Muhammad (pbuh) — Qur'an 93:1-11" },
    ],
  },
  {
    slug: "muhammad-al-duha-93",
    paper: 1,
    section,
    title: "Theme 3 (God and His Messengers): Muhammad (pbuh) — Qur'an 93:1-11",
    standing: "Surah al-Duha: Allah reassuring the Prophet (pbuh) during a pause in revelation that he has not been abandoned, and instructing him in gratitude and kindness.",
    learningObjectives: [
      "State the reference and historical context of Surah al-Duha.",
      "Explain the reassurance and instructions the passage gives to the Prophet (pbuh).",
      "Explain what the passage teaches more broadly about Allah's care for His Messengers in times of hardship.",
    ],
    keyTerms: [
      { term: "Al-Duha", meaning: "\"The Morning Brightness\" — the name of this surah, taken from its opening oath." },
      { term: "Fatrat al-Wahy", meaning: "The pause in revelation after the first revelation, understood to be the background to this surah's reassurance." },
    ],
    explanation: [
      "Surah al-Duha (Qur'an 93:1-11) is set under Theme 3, God's relationship with His Messengers, as it shows Allah speaking directly to comfort and guide Prophet Muhammad (pbuh) during a difficult period, traditionally associated with a pause in revelation that caused him distress.",
      "Sahih International translation (93:1-5): \"By the morning brightness and [by] the night when it covers with darkness, your Lord has not taken leave of you, [O Muhammad], nor has He detested [you]. And the Hereafter is better for you than the first [life]. And your Lord is going to give you, and you will be satisfied.\" — Allah reassures the Prophet (pbuh) that He has not forsaken him nor become displeased with him, and that what is to come will be better for him than what came before, and that Allah will soon give him so much that he will be satisfied.",
      "The passage then recalls Allah's earlier care for him — finding him an orphan and giving him shelter, finding him astray/unguided and guiding him, finding him in need and enriching him — before instructing him, in light of this care, not to oppress the orphan, not to repel the one who asks (for help), and to speak of and be grateful for Allah's favour.",
      "The passage links a personal reassurance to the Prophet (pbuh) with practical moral instruction — gratitude for divine care should translate into compassion for the vulnerable.",
    ],
    keyFacts: [
      { label: "Reference", detail: "Qur'an 93:1-11 (Surah al-Duha)." },
      { label: "Core theme", detail: "Allah reassures the Prophet (pbuh) that he has not been abandoned, recalls His past care for him, and instructs him in kindness and gratitude." },
      { label: "Traditional context", detail: "Associated with a pause in revelation (fatrat al-wahy) after the first revelation, which caused the Prophet (pbuh) distress." },
    ],
    ao1Guidance: [
      "State the reassurance given (\"not forsaken you, nor is He displeased\") and the three past favours recalled (orphan sheltered, guided when astray, enriched when in need).",
      "List the three instructions given at the end of the surah accurately (do not oppress the orphan, do not repel the one who asks, speak of Allah's favour).",
    ],
    ao2Guidance: [
      "Explain the significance of Allah personally reassuring a Prophet (pbuh) experiencing doubt or distress — it shows that even messengers face hardship, and that divine support is constant even when it does not feel immediate.",
      "Discuss why the surah moves from personal reassurance to instructions about caring for the orphan and the needy — gratitude for Allah's care is presented as something that must be expressed through compassion to others, not just felt privately.",
    ],
    commonMistakes: [
      "Omitting the historical context (a pause in revelation causing the Prophet (pbuh) distress) when explaining why this surah was revealed.",
      "Listing only the reassurance and missing the three closing instructions, which are equally examinable.",
    ],
    examTip:
      "This passage connects naturally to the Prophet's (pbuh) own biography (the fatrat al-wahy after the first revelation) — a strong answer briefly notes this historical link before explaining the passage's content and theme.",
    relatedTopics: [
      { paper: 1, section: "history-of-the-quran", slug: "first-revelation", title: "The First Revelation" },
      { paper: 1, section, slug: "adam-al-baqarah-2-30-37", title: "Theme 3 (God and His Messengers): Adam — Qur'an 2:30-37" },
    ],
  },
];
