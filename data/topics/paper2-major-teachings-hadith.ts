import type { Topic } from "./types";

const section = "major-teachings-of-hadith";

// NOTE ON HADITH TEXT: each lesson cites the exact collection and Hadith number (as listed on
// sunnah.com) alongside the original explanation of the theme. See docs/build-status.md,
// "Verification Pass", for the full list of Hadiths verified and the sources used.
//
// NOTE ON THE OFFICIAL 20-HADITH LIST: the syllabus Appendix 2 prescribes exactly 20 named
// Hadiths (see docs/syllabus-coverage-audit.md for the full reconciliation table). All 20 are
// accounted for across the 14 lessons below — most map onto their own lesson; a few sit inside
// an existing lesson alongside a closely related teaching, noted in that lesson's comment.
// Mapping: #1 sincerity -> sincerity-ikhlas. #2 love for brother -> rights-and-brotherhood.
// #3 speak good/silence, neighbour, guest -> social-ethical-responsibilities (expanded).
// #4 obligatory worship & halal/haram -> shahadah-and-worship. #5 daily charity via body's
// "joints" -> charity-and-sharing. #6 change evil hand/tongue/heart -> fighting-against-evil.
// #7 best believer strives with self & wealth -> serving-the-cause-of-allah. #8 expanded
// martyrdom -> expanded-meanings-of-martyrdom (new). #9 best food from own work ->
// honest-livelihood (new). #10 serving widows/poor & #11 caring for orphan ->
// caring-for-the-vulnerable (new, combines both as one coherent "care for the weak" teaching).
// #12 gentleness/glad tidings -> gentleness-in-guidance (new). #13 Qur'an/tethered camels ->
// retaining-the-quran (new). #14 kindness in trade -> kindness-in-commerce (new). #15 Allah's
// mercy/mercy to people -> mercy-to-others (new). #16 believers as one body -> rights-and-
// brotherhood (already covers the "one body"/"one structure" images). #17 modesty, #18 pride
// barring Paradise, #20 Allah looks at hearts not appearances -> character-humility-and-sincerity
// (new, groups these three closely related "inner character" teachings together). #19 the world
// as a prison for the believer -> worldly-restraint-and-the-hereafter (new).

export const paper2MajorTeachingsHadithTopics: Topic[] = [
  {
    slug: "shahadah-and-worship",
    paper: 2,
    section,
    title: "Individual Conduct: Belief and the Obligatory Acts of Worship",
    standing: "Hadith teachings on the Shahadah as the foundation of faith, and on fulfilling the obligatory acts of worship as the path to Paradise.",
    learningObjectives: [
      "State the Shahadah and explain its role as the foundation of individual belief.",
      "Explain the Hadith teaching that even a small amount of true faith can save a person, while even a small amount of arrogance can bar them from Paradise.",
      "Explain the Hadith teaching linking fulfilment of obligatory duties to entry into Paradise.",
    ],
    keyTerms: [
      { term: "Shahadah", meaning: "The testimony of faith: that there is no deity worthy of worship except Allah, and that Muhammad (pbuh) is His slave and Messenger." },
      { term: "Kibr", meaning: "Pride/arrogance — warned against in Hadith as capable of barring a person from Paradise even in a small amount." },
    ],
    explanation: [
      "The Hadith literature teaches that the foundation of Islam for the individual is the Shahadah, the declaration that there is no deity worthy of worship except Allah and that Muhammad (pbuh) is His slave and Messenger, listed as the first of the five pillars in the well-known Hadith \"Islam is built upon five [pillars]...\" (Sahih al-Bukhari 8).",
      "A recurring theme in these teachings is that faith and pride exist on a fine balance: even a very small amount of sincere faith in the heart is described as enough to eventually save a person from the Hellfire, while even a very small amount of arrogance is described as capable of barring a person from Paradise — showing that both sincerity of belief and humility of character are essential, not optional extras.",
      "A further teaching addresses the fulfilment of obligatory duties directly: a man is reported to have asked the Prophet (pbuh) whether he would enter Paradise if he performed the obligatory prayers, fasted Ramadan, treated as lawful what is lawful and as forbidden what is forbidden, and added nothing more than what is required — and to have been told, \"Yes\" (Sahih Muslim 15).",
      "Taken together, these teachings establish belief (Shahadah), humility, and the disciplined fulfilment of core religious duties as the starting framework for individual Muslim conduct that the rest of the Hadith teachings on personal life build upon.",
    ],
    keyFacts: [
      { label: "Foundation of Islam", detail: "The Shahadah — belief in Allah's oneness and Muhammad's (pbuh) messengership." },
      { label: "Balance taught", detail: "Even minimal sincere faith can save; even minimal arrogance can exclude from Paradise." },
      { label: "Path to Paradise (as taught)", detail: "Fulfilling obligatory prayer and fasting, respecting what is lawful and forbidden, without needless addition." },
    ],
    ao1Guidance: [
      "State the Shahadah accurately in your own words and know that it is the foundational declaration of individual Muslim belief.",
      "Be able to explain the \"mustard seed\" balance between faith and arrogance as a distinct, examinable teaching, not just a general statement about humility.",
    ],
    ao2Guidance: [
      "Explain why teaching that even a small amount of pride can bar a person from Paradise is significant for individual conduct — it makes humility a serious, continuous personal responsibility rather than a minor virtue.",
      "Discuss the significance of linking obligatory worship so directly and simply to the promise of Paradise — it presents religious duty as achievable and not overwhelming, encouraging consistent practice over occasional extremes.",
    ],
    commonMistakes: [
      "Treating the Shahadah as only a verbal formula without explaining its role as the starting point for the rest of individual conduct.",
      "Missing the two-sided nature of the faith/arrogance teaching (both the positive promise and the warning) and stating only one half.",
    ],
    examTip:
      "For 'teachings on individual conduct' questions, begin with the Shahadah as the foundation before moving to specific behavioural teachings — this shows the examiner you understand the logical structure of Hadith teaching on personal life, not just isolated facts.",
    relatedTopics: [
      { paper: 2, section, slug: "sincerity-ikhlas", title: "Individual Conduct: Sincerity (Ikhlas)" },
      { paper: 2, section: "articles-of-faith-and-pillars", slug: "shahadah-pillar", title: "Pillar of Islam: Shahadah" },
    ],
  },
  {
    slug: "sincerity-ikhlas",
    paper: 2,
    section,
    title: "Individual Conduct: Sincerity (Ikhlas)",
    standing: "Hadith teachings that true worship must be done purely for Allah's sake, and that the reward of an action depends on the intention behind it.",
    learningObjectives: [
      "Explain the meaning of Ikhlas (sincerity) as taught in Hadith.",
      "Explain the teaching that the reward of deeds depends on intention.",
      "Discuss why sincerity is presented as central to acceptable worship rather than an optional quality.",
    ],
    keyTerms: [
      { term: "Ikhlas", meaning: "Sincerity — doing every act, whether great or small, purely for the sake of Allah's pleasure." },
      { term: "Niyyah", meaning: "Intention — the inner purpose behind an action, which Hadith teaches determines its religious reward." },
    ],
    explanation: [
      "A well-known Hadith teaching states directly that \"the religion is sincerity (nasihah)\" (Sahih Muslim 55), establishing Ikhlas as central to what makes an act of worship or good conduct genuinely religious, rather than an external formality.",
      "A closely connected teaching holds that the reward of deeds depends upon the intentions behind them, and that a person receives credit according to what they intended, not merely according to the outward form of the action (\"Actions are judged by intentions...\", Sahih al-Bukhari 1 / Sahih Muslim 1907a).",
      "Together these teachings mean that two people could perform an identical outward act — such as giving charity or attending the mosque — and receive very different reward from Allah, depending on whether the act was done sincerely for His sake or for some other motive such as being seen or praised by others.",
      "This places a continuous internal responsibility on the individual Muslim: good conduct is not just about correct outward behaviour, but about consistently examining and purifying the motive behind every act, however small.",
    ],
    keyFacts: [
      { label: "Core teaching", detail: "\"The religion is sincerity\" — Ikhlas is central to acceptable worship." },
      { label: "Related teaching", detail: "The reward of deeds depends upon the intentions behind them." },
      { label: "Practical implication", detail: "Identical outward acts can carry very different reward depending on sincerity of intention." },
    ],
    ao1Guidance: [
      "State both teachings (sincerity as the essence of religion; reward depends on intention) as distinct but connected points.",
      "Be ready to give an everyday example of how intention changes the value of an act (e.g. charity given to be seen versus charity given sincerely).",
    ],
    ao2Guidance: [
      "Explain why grounding reward in intention rather than only outward form is significant for individual accountability — it makes sincerity, not just correct action, the standard Allah judges by.",
      "Discuss the practical challenge this teaching sets for a Muslim's daily life: maintaining sincerity in ordinary, repeated actions (prayer, work, charity) requires continuous self-examination, not a one-off decision.",
    ],
    commonMistakes: [
      "Explaining only the \"intention\" Hadith and omitting the \"religion is sincerity\" teaching, or vice versa — both are commonly expected together.",
      "Giving a definition of Ikhlas without an example showing how it changes the value of an identical outward act.",
    ],
    examTip:
      "When asked to link a teaching to 'why it is important', use the two-people-same-action-different-reward illustration — it demonstrates understanding of the significance of intention far more clearly than a definition alone.",
    relatedTopics: [
      { paper: 2, section, slug: "shahadah-and-worship", title: "Individual Conduct: Belief and the Obligatory Acts of Worship" },
      { paper: 2, section, slug: "serving-the-cause-of-allah", title: "Individual Conduct: Serving the Cause of Allah" },
    ],
  },
  {
    slug: "fighting-against-evil",
    paper: 2,
    section,
    title: "Individual Conduct: Fighting Against Evil",
    standing: "Hadith teachings on the individual duty to resist and change wrongdoing, and on personal responsibility for those under one's care.",
    learningObjectives: [
      "Explain the three ways of opposing evil described in Hadith (by hand, tongue and heart).",
      "Explain the teaching that every person is a guardian, responsible for those in their charge.",
      "Discuss the significance of these teachings for individual moral responsibility.",
    ],
    keyTerms: [
      { term: "Munkar", meaning: "Wrong/evil — what a Muslim is instructed to oppose according to their ability." },
      { term: "Ra'in", meaning: "\"Guardian/shepherd\" — the term used to describe every individual's responsibility over those in their charge." },
    ],
    explanation: [
      "A foundational Hadith teaches that whoever among the believers sees an evil should change it with their hand (by direct action, where they have the authority or ability); if unable, then with their tongue (by speaking out against it); and if unable even to do that, then with their heart (by disliking it inwardly) — and that this last response is described as the weakest level of faith (Sahih Muslim 49a).",
      "This teaching establishes a graded, realistic framework: a Muslim is expected to act against wrong to the extent of their genuine ability, rather than being expected to always take direct physical action regardless of their position or power.",
      "A related teaching states that every person is a guardian and is responsible for those in their charge — giving examples such as a ruler over his people, a man over his family, and a woman over her household — establishing that resisting evil begins with taking responsibility for one's own sphere of authority (\"Each of you is a shepherd and each of you is responsible for his flock...\", Sahih al-Bukhari 7138 / Sahih Muslim 1829).",
      "Together these teachings frame moral responsibility as both personal and proportionate: every individual has some sphere of influence in which they are expected to actively promote good and resist evil, according to their genuine capacity.",
    ],
    keyFacts: [
      { label: "Three levels of response to evil", detail: "By hand (action), by tongue (speech), by heart (inward disapproval — the weakest level of faith)." },
      { label: "Guardianship teaching", detail: "Every person is a guardian, responsible for those in their charge (e.g. ruler, spouse, parent)." },
    ],
    ao1Guidance: [
      "State the three levels of response in the correct order (hand, tongue, heart) and know which is described as the weakest level of faith.",
      "Give at least two of the named examples of guardianship (ruler, family member) from the second teaching.",
    ],
    ao2Guidance: [
      "Explain why a graded response to evil (hand/tongue/heart) is a realistic and significant teaching — it does not demand the same physical action from someone with limited power as from someone in authority, while still requiring some response from everyone.",
      "Discuss the significance of describing every individual as a \"guardian\" — it extends moral responsibility beyond formal leadership roles into everyday family and social life, making resisting evil a universal, not exceptional, duty.",
    ],
    commonMistakes: [
      "Reversing or omitting one of the three levels of responding to evil.",
      "Treating the guardianship teaching as applying only to political rulers, missing its application to ordinary family and household responsibility.",
    ],
    examTip:
      "When discussing 'fighting evil' in exam answers, explicitly link the three-level framework to real examples (e.g. a teacher correcting a student by speech, an ordinary bystander only able to disapprove inwardly) to demonstrate understanding rather than rote recall.",
    relatedTopics: [
      { paper: 2, section, slug: "enjoining-good-forbidding-evil", title: "Community Life: Enjoining Good and Forbidding Evil" },
      { paper: 2, section, slug: "serving-the-cause-of-allah", title: "Individual Conduct: Serving the Cause of Allah" },
    ],
  },
  {
    slug: "serving-the-cause-of-allah",
    paper: 2,
    section,
    title: "Individual Conduct: Serving the Cause of Allah",
    standing: "Hadith teachings that a Muslim's life, wealth and effort should be directed to Allah's cause, and on the merit of striving in His way.",
    learningObjectives: [
      "Explain the teaching that a Muslim's worship, life and death belong to Allah.",
      "Explain the Hadith teaching on the merit of striving in Allah's cause with life and wealth.",
      "Discuss what \"serving the cause of Allah\" means for ordinary daily conduct, not only in exceptional circumstances.",
    ],
    keyTerms: [
      { term: "Jihad", meaning: "Striving in the way of Allah — a broad term covering struggle against wrongdoing, effort in good works, and, where legitimately required, physical struggle." },
      { term: "Fi sabilillah", meaning: "\"In the way/cause of Allah\" — the standard by which effort, wealth and striving are directed and evaluated." },
    ],
    explanation: [
      "The Qur'an states that a believer's prayer, sacrifice, living and dying are all for Allah, Lord of all the worlds (Qur'an 6:162) — a verse frequently paired with Hadith teaching on this theme to show that dedicating one's whole life, not only formal acts of worship, to Allah's cause is the standard expected of a Muslim.",
      "A Hadith teaching states that the best among people is a believer who strives in the cause of Allah with both life and wealth (Sahih al-Bukhari 2785), placing striving and generosity together as marks of excellence in faith.",
      "A further, sharper teaching warns that whoever dies without having fought, or without even having sincerely intended and desired to strive in Allah's cause, dies having shown a kind of hypocrisy in that regard (Sahih Muslim 1910) — understood as a warning against complacency and lack of genuine commitment to the wider good of the faith, not a requirement of literal warfare for every individual.",
      "Ways this can be lived out include obeying Allah in personal conduct, serving other people, spending wealth for good causes, and, where genuinely called for and lawfully undertaken, being willing to sacrifice for the cause of the faith and the community.",
    ],
    keyFacts: [
      { label: "Qur'anic anchor", detail: "\"My prayer, my rites of sacrifice, my living and my dying are for Allah\" (Qur'an 6:162)." },
      { label: "Core teaching", detail: "The best person is a believer who strives in Allah's cause with life and wealth." },
      { label: "Warning given", detail: "Dying without having fought or sincerely intended to strive is likened to a form of hypocrisy in this regard." },
    ],
    ao1Guidance: [
      "Quote or closely paraphrase the Qur'anic verse (6:162) accurately alongside the related Hadith teachings.",
      "Be clear that \"striving with life and wealth\" covers a range of legitimate effort and giving, not only physical combat.",
    ],
    ao2Guidance: [
      "Explain the significance of framing an entire life — not only prayer — as devoted to Allah's cause; it removes any separation between 'religious' acts and everyday conduct.",
      "Discuss why the warning against lacking even the sincere intention to strive is significant: it addresses complacency, not literal military inactivity, encouraging ongoing personal commitment to good causes.",
    ],
    commonMistakes: [
      "Interpreting \"striving in Allah's cause\" narrowly as only physical warfare — the syllabus theme concerns the broader principle of dedicating life and wealth to good causes for Allah's sake.",
      "Omitting the Qur'anic verse when it strengthens the AO1 evidence available for this teaching.",
    ],
    examTip:
      "When discussing this teaching, briefly clarify that 'striving' includes a wide range of legitimate service and generosity — showing this nuance protects against a common misreading and demonstrates deeper understanding to the examiner.",
    relatedTopics: [
      { paper: 2, section, slug: "sincerity-ikhlas", title: "Individual Conduct: Sincerity (Ikhlas)" },
      { paper: 2, section, slug: "charity-and-sharing", title: "Community Life: Charity and Sharing with Others" },
    ],
  },
  {
    slug: "charity-and-sharing",
    paper: 2,
    section,
    title: "Community Life: Charity and Sharing with Others",
    standing: "Hadith teachings on giving to the poor with dignity, and on small, everyday acts of kindness (sadaqah) as a form of charity available to everyone.",
    learningObjectives: [
      "Explain Hadith teachings on giving charity generously and with respect for the recipient's dignity.",
      "Explain the concept of sadaqah as covering more than just giving money.",
      "Discuss why this range of teaching matters for building a caring community.",
    ],
    keyTerms: [
      { term: "Sadaqah", meaning: "Voluntary charity — understood in Hadith to include not only money but any good, kind act done sincerely." },
      { term: "Karam", meaning: "Generosity — a quality repeatedly linked with the Prophet's (pbuh) own conduct as an example for the community." },
    ],
    explanation: [
      "Hadith teaching on community life places strong emphasis on helping the poor and needy, instructing Muslims to give with love and respect and to preserve the self-respect of the person receiving help, rather than giving in a way that humiliates them — reflected across the general body of Hadith on charity (sadaqah), including the teachings on Zakat cited below.",
      "One teaching encourages giving even a small amount of charity as protection from the Hellfire, illustrating that the value of charity is not measured only by its size (\"Save yourselves from Hell-fire even by giving half a date-fruit in charity\", Sahih al-Bukhari 1417); the Prophet (pbuh) is remembered in these teachings as an example of generosity, clothing and feeding those in need even when he had little left for himself.",
      "A further, broader teaching explains that charity is not limited to giving wealth: it describes a person's body as having many \"joints\", and states that a form of charity is due for each one every day, giving examples such as a kind word, a smiling face, giving water, removing something harmful from a road, offering fair advice, and helping settle a matter justly (Sahih Muslim 1009; the specific line on a smiling face is also recorded in Jami' at-Tirmidhi 1956, graded sahih by al-Albani).",
      "The lesson drawn from this range of teaching is that charity and generosity, in Islam, are not restricted to the wealthy or to formal donations — small, sincere acts of kindness performed daily are treated as valuable, accessible forms of charity available to everyone regardless of financial means.",
    ],
    keyFacts: [
      { label: "Dignity in giving", detail: "Charity should be given with love and respect, preserving the recipient's self-respect." },
      { label: "Small acts count", detail: "Even a small amount of charity, or a simple kind word or smile, is valued as sadaqah." },
      { label: "Broad definition of sadaqah", detail: "Examples given include kindness of speech, removing harm from a road, and fair, helpful advice." },
    ],
    ao1Guidance: [
      "Give named examples of sadaqah beyond monetary giving (kind word, smiling face, removing harm from the road) as these show breadth of teaching.",
      "Mention the dignity principle (preserving the self-respect of the recipient) as a distinct teaching, not just \"give to the poor\".",
    ],
    ao2Guidance: [
      "Explain the significance of teaching that even small, non-monetary acts count as charity — it makes generosity achievable for every member of the community, not only those with financial wealth.",
      "Discuss why preserving the recipient's dignity while giving matters for community cohesion — charity given without respect can damage social bonds rather than strengthen them.",
    ],
    commonMistakes: [
      "Assuming charity in Hadith teaching means only money — this significantly understates the breadth of what is taught.",
      "Omitting the dignity/respect dimension of giving when explaining this teaching.",
    ],
    examTip:
      "When asked for a range of examples on this teaching, mix at least one monetary example with at least one non-monetary example (e.g. a kind word) to show full understanding of how broadly sadaqah is defined.",
    relatedTopics: [
      { paper: 2, section, slug: "rights-and-brotherhood", title: "Community Life: Rights of Others and Muslim Brotherhood" },
      { paper: 2, section: "articles-of-faith-and-pillars", slug: "zakah", title: "Pillar of Islam: Zakah" },
    ],
  },
  {
    slug: "social-ethical-responsibilities",
    paper: 2,
    section,
    title: "Community Life: Social and Ethical Responsibilities",
    standing: "Hadith teachings on kindness, respect and avoiding harm to others in day-to-day community relationships.",
    learningObjectives: [
      "Explain Hadith teachings against mockery, offensive nicknames and suspicion within the community.",
      "Explain the teaching describing a true Muslim as one from whose tongue and hand others are safe.",
      "Discuss the significance of these teachings for maintaining a peaceful, respectful society.",
    ],
    keyTerms: [
      { term: "Ghibah", meaning: "Backbiting — speaking about someone in their absence in a way they would dislike, warned against in teachings on social conduct." },
      { term: "Suu' al-Zann", meaning: "Ill-suspicion of others, which the Qur'an and Hadith instruct Muslims to avoid, since much suspicion is sinful." },
      { term: "Diyafah", meaning: "Hospitality — the honour a Muslim is instructed to show a guest, listed alongside neighbourly conduct and speech in official teaching #3 below." },
    ],
    explanation: [
      "The Qur'an instructs believers not to ridicule one another, not to call one another by offensive nicknames, and to avoid excessive suspicion, spying and backbiting (Qur'an 49:11-12), and Hadith teaching reinforces and applies this guidance to everyday community relationships.",
      "One teaching instructs Muslims not to cut off relations with one another, not to hate one another, and not to envy one another, but to be, as servants of Allah, like brothers (Sahih al-Bukhari 6065).",
      "A well-known teaching defines the ideal Muslim in terms of social conduct: \"the Muslim is the one from whose tongue and hand other people are safe\" (Sahih al-Bukhari 10 / Sahih Muslim 40), making protection of others from one's own words and actions the practical test of good social character.",
      "A further, precisely worded teaching (official teaching #3 in the syllabus's list of 20 prescribed Hadiths) links three separate duties to the same standard, faith in Allah and the Last Day: \"Whoever believes in Allah and the Last Day should not harm his neighbour; whoever believes in Allah and the Last Day should honour his guest; and whoever believes in Allah and the Last Day should speak good or remain silent\" (Sahih al-Bukhari 6018 / Sahih Muslim 47) — making considerate speech, care for neighbours, and hospitality to guests all direct expressions of genuine faith rather than separate matters of etiquette.",
      "The overall lesson is that good manners, respect, and actively avoiding harm to others — whether through speech, action, ill-feeling, neglect of a neighbour or a failure to welcome a guest — are what keep a community united and at peace, rather than good conduct being reduced to formal ritual worship alone.",
    ],
    keyFacts: [
      { label: "Qur'anic basis", detail: "Qur'an 49:11-12 — against ridicule, offensive nicknames, suspicion, spying and backbiting." },
      { label: "Community harmony teaching", detail: "Do not cut off relations, hate or envy one another; be as brothers." },
      { label: "Definition of a true Muslim (social)", detail: "One from whose tongue and hand other people are safe." },
      { label: "Three-part faith test (official teaching #3)", detail: "Do not harm your neighbour; honour your guest; speak good or remain silent — each tied to belief in Allah and the Last Day." },
    ],
    ao1Guidance: [
      "Be able to cite the Qur'anic reference (49:11-12) alongside the Hadith teachings it supports.",
      "State the 'tongue and hand' definition precisely — it is a frequently quoted, exact formulation.",
      "State all three parts of the neighbour/guest/speech teaching in order, and note that each is introduced with the same formula (\"whoever believes in Allah and the Last Day...\").",
    ],
    ao2Guidance: [
      "Explain why defining a true Muslim by the safety others feel from their words and actions is significant — it makes social ethics, not just personal piety, a core measure of faith.",
      "Discuss the practical significance of warning against backbiting, suspicion and offensive nicknames for preventing the breakdown of trust and unity within a community.",
      "Discuss why the neighbour/guest/speech teaching repeatedly grounds each duty in belief in Allah and the Last Day rather than social custom alone — it raises everyday courtesy to the level of a test of genuine faith.",
    ],
    commonMistakes: [
      "Quoting the 'tongue and hand' Hadith inaccurately or vaguely rather than as the precise formulation examiners expect.",
      "Discussing only the negative prohibitions (do not envy, do not hate) without linking them to the positive teaching (be as brothers).",
      "Omitting one of the three parts of the neighbour/guest/speech teaching, or dropping its repeated \"believes in Allah and the Last Day\" framing.",
    ],
    examTip:
      "This teaching pairs naturally with the Unity/Brotherhood teachings — where relevant, connect the prohibition on harmful speech and suspicion to the wider goal of Ummah unity for a stronger AO2 answer.",
    relatedTopics: [
      { paper: 2, section, slug: "rights-and-brotherhood", title: "Community Life: Rights of Others and Muslim Brotherhood" },
      { paper: 2, section, slug: "fighting-against-evil", title: "Individual Conduct: Fighting Against Evil" },
    ],
  },
  {
    slug: "enjoining-good-forbidding-evil",
    paper: 2,
    section,
    title: "Community Life: Enjoining Good and Forbidding Evil",
    standing: "Hadith and Qur'anic teaching that the Muslim community as a whole is responsible for actively promoting good and preventing wrong.",
    learningObjectives: [
      "Explain the Qur'anic description of the believers as \"the best nation\" produced for mankind.",
      "Explain the Hadith warning that Allah may punish a whole community that fails to stop evil it is able to stop.",
      "Discuss what this teaching implies for collective, not just individual, responsibility.",
    ],
    keyTerms: [
      { term: "Amr bil Ma'ruf wa Nahy 'anil Munkar", meaning: "\"Enjoining what is right and forbidding what is wrong\" — the collective duty this teaching establishes for the Muslim community." },
      { term: "Ummah", meaning: "The single worldwide community of Muslims, described in this teaching as collectively responsible for promoting good and resisting evil." },
    ],
    explanation: [
      "The Qur'an describes the believers as \"the best nation produced for mankind\", explaining that this status rests on their enjoining what is right, forbidding what is wrong, and believing in Allah (Qur'an 3:110) — making moral responsibility for the wider community, not private piety alone, part of what defines this description.",
      "A related verse instructs believers to cooperate in goodness and righteousness and not to cooperate in sin and transgression, remaining mindful of Allah in all such cooperation (Qur'an 5:2).",
      "A Hadith teaching adds a serious warning: if evil appears among a people and they are able to stop it but do not, Allah may punish the whole community, not only the individuals directly responsible for the wrongdoing (Sunan Abi Dawud 4339).",
      "The lesson drawn is that a good, healthy society depends on every member playing their part in actively encouraging what is right and discouraging what is wrong — moral responsibility in Islam is understood as a shared, communal duty as well as a personal one.",
    ],
    keyFacts: [
      { label: "Qur'anic description", detail: "The believers as \"the best nation\", defined partly by enjoining right and forbidding wrong (Qur'an 3:110)." },
      { label: "Cooperation verse", detail: "Cooperate in goodness and righteousness, not in sin and transgression (Qur'an 5:2)." },
      { label: "Hadith warning", detail: "A whole community can be punished for failing to stop evil it was able to stop." },
    ],
    ao1Guidance: [
      "Cite both Qur'anic references (3:110 and 5:2) accurately alongside the Hadith warning.",
      "Distinguish this community-level teaching from the individual-level 'fighting evil' teaching (hand/tongue/heart) — this one emphasises collective, communal responsibility and consequence.",
    ],
    ao2Guidance: [
      "Explain the significance of describing collective moral failure as bringing collective consequence — it discourages passivity or indifference toward wrongdoing that a person is not personally involved in but is able to help stop.",
      "Discuss why linking the believers' status as 'the best nation' directly to this active moral responsibility, rather than to worship alone, is significant for how Islam defines a good community.",
    ],
    commonMistakes: [
      "Treating this teaching as identical to the individual 'fighting evil' Hadith — this one specifically addresses collective/communal responsibility and communal consequence, a distinct emphasis worth stating explicitly.",
      "Omitting the warning about collective punishment, which is the teaching's sharpest and most examinable point.",
    ],
    examTip:
      "When a question asks about 'teachings for community life', this topic is a strong example for AO2 evaluation of why communal responsibility (not just individual piety) matters — pair the 'best nation' verse with the collective-punishment warning for a complete answer.",
    relatedTopics: [
      { paper: 2, section, slug: "fighting-against-evil", title: "Individual Conduct: Fighting Against Evil" },
      { paper: 2, section, slug: "social-ethical-responsibilities", title: "Community Life: Social and Ethical Responsibilities" },
    ],
  },
  {
    slug: "rights-and-brotherhood",
    paper: 2,
    section,
    title: "Community Life: Rights of Others and Muslim Brotherhood",
    standing: "Hadith teachings on the specific rights one Muslim owes another, and on the unity, equality and mutual care that define Muslim brotherhood.",
    learningObjectives: [
      "List the rights a Muslim has over another Muslim as taught in Hadith.",
      "Explain the teaching that Muslims are like a single body or a single structure supporting one another.",
      "Explain the teaching that honour before Allah is based on piety (taqwa), not race, tribe or status.",
    ],
    keyTerms: [
      { term: "Ummah wahidah", meaning: "\"One community\" — the Qur'anic description of believers as united by a single faith regardless of background (Qur'an 21:92)." },
      { term: "Taqwa", meaning: "God-consciousness/piety — described in Hadith as the only true basis of honour between people, replacing distinctions of race or tribe." },
    ],
    explanation: [
      "The Qur'an teaches that the community of believers is a single Ummah, united by one faith, with Allah as their Lord, and calls on them to worship Him together on that basis (Qur'an 21:92) — this verse is often used as the foundation for Hadith teaching on brotherhood and mutual rights.",
      "A well-known Hadith lists specific rights a Muslim has over another Muslim in good conduct: to greet them with peace, to respond to their invitation, to respond when they sneeze, to visit them when ill, and to attend their funeral (Sahih Muslim 2162b lists six such rights; a closely related teaching that a believer should \"love for his brother what he loves for himself\" is at Sahih al-Bukhari 13 / Sahih Muslim 45).",
      "Another well-known image compares the believers to a single body: if one part suffers, the whole body responds with fever and sleeplessness (Sahih al-Bukhari 6011 / Sahih Muslim 2586a), and to a single structure that holds together and strengthens itself, part supporting part (Sahih al-Bukhari 481) — both images stress that the wellbeing of the community is interconnected rather than a collection of separate individuals.",
      "Islam also establishes equality as the basis of honour: the Qur'an teaches that Allah made people into different nations and tribes so that they would come to know one another, and that the most honoured before Allah is the most righteous, not the most privileged by lineage (Qur'an 49:13); a Hadith teaching reinforces this by stating that no Arab has superiority over a non-Arab, and no one has superiority over another except through piety (taqwa) — a line preserved from the Prophet's (pbuh) Farewell Sermon (Musnad Ahmad 22978).",
      "Together, these teachings on rights, unity and equality establish that Muslim brotherhood is not simply a sentiment but a structured set of mutual obligations and a levelling of social status based only on righteousness.",
    ],
    keyFacts: [
      { label: "Qur'anic basis for unity", detail: "\"This is your Ummah, one Ummah\" (Qur'an 21:92)." },
      { label: "Six rights of a Muslim over another", detail: "Greet with peace, respond to invitation, respond to a sneeze, visit when ill, attend the funeral prayer, love for them what you love for yourself." },
      { label: "Body/structure images", detail: "Believers compared to a single body (shared suffering) and a single supporting structure." },
      { label: "Basis of honour", detail: "Taqwa (piety), not race, tribe or lineage (Qur'an 49:13)." },
    ],
    ao1Guidance: [
      "Be able to list all six rights accurately in an exam — this is a defined, examinable list.",
      "Cite the Qur'anic verse on equality (49:13) alongside the Hadith on Arab/non-Arab equality for a complete AO1 answer.",
    ],
    ao2Guidance: [
      "Explain the significance of the body/structure images for understanding community responsibility — they teach that individual wellbeing and the wellbeing of the community are inseparable, not that the community is simply a group of unrelated individuals.",
      "Discuss why grounding honour in taqwa rather than lineage or race was a significant social teaching for the tribal society these teachings were addressed to, and remains relevant to addressing prejudice today.",
      "Evaluate how the combination of specific mutual rights and broader unifying principles (one body, one Ummah, equality through taqwa) together build a coherent vision of community life in Islam.",
    ],
    commonMistakes: [
      "Listing only some of the six rights, or listing rights from a different teaching (e.g. sadaqah examples) by mistake.",
      "Explaining the equality teaching without the specific Hadith example (no Arab superiority over non-Arab) that makes the point concrete.",
    ],
    examTip:
      "For 'community life' passage questions, this topic offers the richest set of specific, listable content (six rights, two vivid images, one equality teaching) — structure your answer as separate labelled points rather than blending them into a single narrative paragraph.",
    relatedTopics: [
      { paper: 2, section, slug: "charity-and-sharing", title: "Community Life: Charity and Sharing with Others" },
      { paper: 2, section, slug: "social-ethical-responsibilities", title: "Community Life: Social and Ethical Responsibilities" },
      { paper: 2, section, slug: "caring-for-the-vulnerable", title: "Community Life: Caring for Widows, the Poor and Orphans" },
    ],
  },
  {
    slug: "expanded-meanings-of-martyrdom",
    paper: 2,
    section,
    title: "Individual Conduct: Expanded Meanings of Martyrdom",
    standing: "Hadith teaching that martyrdom (shahadah) is not limited to dying in battle, but extends to several other difficult ways of dying.",
    learningObjectives: [
      "State the categories of death described as martyrdom beyond dying in battle.",
      "Explain why the Hadith broadens the meaning of martyrdom in this way.",
      "Discuss the significance of this teaching for how ordinary hardship and death are understood.",
    ],
    keyTerms: [
      { term: "Shahid", meaning: "Martyr — one whose death is recognised in Hadith as carrying the special status and reward associated with dying in Allah's cause." },
      { term: "Fi Sabilillah", meaning: "\"In the cause of Allah\" — the standard form of martyrdom (dying in battle) that this teaching's additional categories are compared to." },
    ],
    explanation: [
      "A Hadith teaching lists five kinds of death regarded as martyrdom: dying of plague, dying of an abdominal disease, drowning, being crushed by a collapsing building, and dying while fighting in Allah's cause (Sahih al-Bukhari 2829; a related listing appears in Sahih Muslim).",
      "This teaching (official teaching #8 in the syllabus's list of 20 prescribed Hadiths) extends the honoured status of martyrdom well beyond the battlefield, recognising that sudden, painful or involuntary deaths through illness, accident or natural disaster can carry the same spiritual reward as dying in armed struggle for the faith.",
      "The lesson drawn is that Allah's mercy and reward are not restricted to the most visibly dramatic or public forms of sacrifice; ordinary believers who suffer certain difficult deaths are shown the same honour as those who die in battle, without needing to have sought out danger themselves.",
      "This broadened understanding of martyrdom also offers comfort to families and communities facing loss through illness, disaster or accident, framing such deaths within a hopeful, rather than purely tragic, religious understanding.",
    ],
    keyFacts: [
      { label: "Reference", detail: "Sahih al-Bukhari 2829 (five kinds of martyrdom, also found in Sahih Muslim)." },
      { label: "Categories named", detail: "Dying of plague; dying of an abdominal disease; drowning; being crushed by a collapsing building; dying fighting in Allah's cause." },
      { label: "Core theme", detail: "Martyrdom's honour and reward are not restricted to death in battle." },
    ],
    ao1Guidance: [
      "List all five categories named in the Hadith accurately, not only battlefield death.",
      "Be able to state the exact collection and number (Sahih al-Bukhari 2829) for this teaching.",
    ],
    ao2Guidance: [
      "Explain the significance of including illness, drowning and accident alongside battle as forms of martyrdom — it shows Allah's reward reaching believers regardless of how dramatic or chosen their death was.",
      "Discuss how this teaching might offer comfort and religious meaning to a community facing loss through disease or disaster, rather than treating such deaths as merely misfortune.",
    ],
    commonMistakes: [
      "Assuming martyrdom in Islamic teaching refers only to dying in armed conflict — this teaching explicitly broadens that definition.",
      "Omitting or confusing one of the five listed categories.",
    ],
    examTip:
      "When this teaching is examined, pair the list of categories with the significance point (reward is not limited to battlefield death) — a list alone without explaining its significance will not gain full AO2 credit.",
    relatedTopics: [
      { paper: 2, section, slug: "serving-the-cause-of-allah", title: "Individual Conduct: Serving the Cause of Allah" },
      { paper: 2, section: "articles-of-faith-and-pillars", slug: "belief-in-resurrection", title: "Article of Faith: Belief in the Day of Resurrection" },
    ],
  },
  {
    slug: "honest-livelihood",
    paper: 2,
    section,
    title: "Individual Conduct: Honest Livelihood and One's Own Work",
    standing: "Hadith teaching that the best food a person eats is that earned through their own honest effort, using Prophet Dawud (AS) as the example.",
    learningObjectives: [
      "State the Hadith teaching on the value of earning one's own living through work.",
      "Explain the example given of Prophet Dawud (AS).",
      "Discuss the significance of dignifying manual and self-earned work in Islamic teaching.",
    ],
    keyTerms: [
      { term: "Kasb al-Yad", meaning: "\"The earnings of one's own hand\" — the standard of honest livelihood praised in this teaching." },
      { term: "Halal Rizq", meaning: "Lawful provision/sustenance — earned through permissible effort rather than unlawful or exploitative means." },
    ],
    explanation: [
      "A Hadith teaching states that no one has ever eaten a better meal than one earned by working with their own hands, adding that Prophet Dawud (AS), a Messenger of Allah, used to eat from the earnings of his own manual labour (Sahih al-Bukhari 2072).",
      "This teaching (official teaching #9 in the syllabus's list of 20 prescribed Hadiths) elevates ordinary, self-earned work — rather than relying on charity, inheritance or another person's effort — as the most honourable and best form of livelihood available to a believer.",
      "Using a Prophet (AS) as the example is significant: it shows that manual labour and self-sufficiency are not beneath dignity even for the most honoured of Allah's messengers, countering any idea that physical work is a lesser or shameful way to live.",
      "The lesson drawn is that Islam values economic independence and honest effort as a form of good conduct in itself, connecting personal discipline and self-respect to religious virtue rather than treating livelihood as a purely worldly, non-religious matter.",
    ],
    keyFacts: [
      { label: "Reference", detail: "Sahih al-Bukhari 2072." },
      { label: "Core teaching", detail: "The best food/livelihood is that earned through one's own manual work." },
      { label: "Example given", detail: "Prophet Dawud (AS) ate from the earnings of his own hands." },
    ],
    ao1Guidance: [
      "State the teaching precisely: no meal is better than one earned by one's own hands' work.",
      "Name Dawud (AS) specifically as the Prophet (AS) given as the example, and note his status as a Messenger of Allah.",
    ],
    ao2Guidance: [
      "Explain the significance of using a Prophet (AS) as the example of manual labour — it removes any social stigma from honest physical work by showing even the most honoured of Allah's messengers relied on it.",
      "Discuss why Islam treats self-earned, honest livelihood as a matter of religious virtue and dignity rather than merely an economic necessity.",
    ],
    commonMistakes: [
      "Omitting the specific example of Dawud (AS), which is the teaching's most memorable and examinable detail.",
      "Treating this teaching as only about manual labour in a literal sense, rather than as a broader principle valuing honest, self-earned livelihood.",
    ],
    examTip:
      "This teaching pairs well with 'Serving the Cause of Allah' for a question on dedicating one's whole life and effort to Allah — honest work is presented as a form of virtue in its own right, not only as a means to fund charity.",
    relatedTopics: [
      { paper: 2, section, slug: "serving-the-cause-of-allah", title: "Individual Conduct: Serving the Cause of Allah" },
      { paper: 2, section, slug: "kindness-in-commerce", title: "Community Life: Kindness in Buying, Selling and Claiming Dues" },
    ],
  },
  {
    slug: "caring-for-the-vulnerable",
    paper: 2,
    section,
    title: "Community Life: Caring for Widows, the Poor and Orphans",
    standing: "Hadith teachings that supporting widows and the poor equals the reward of striving for Allah's cause, and that caring for an orphan brings closeness to the Prophet (pbuh) in Paradise.",
    learningObjectives: [
      "State the Hadith teaching comparing the carer of a widow or poor person to a mujahid and a devoted worshipper.",
      "State the Hadith teaching on the reward of caring for an orphan.",
      "Discuss why supporting the vulnerable is given such high spiritual status in these teachings.",
    ],
    keyTerms: [
      { term: "Mujahid", meaning: "One who strives/struggles in Allah's cause — the comparison used to elevate the status of caring for a widow or the poor." },
      { term: "Yatim", meaning: "Orphan — a child who has lost one or both parents, whose care is given a specific, high reward in Hadith." },
    ],
    explanation: [
      "A Hadith teaching states that one who looks after a widow or a poor person is like a mujahid who fights for Allah's cause, or like one who prays through the night and fasts every day (Sahih al-Bukhari 5353) — placing quiet, sustained social care on the same level of merit as intense worship or striving in Allah's cause.",
      "This teaching (official teaching #10 in the syllabus's list of 20 prescribed Hadiths) removes any sense that supporting a widow or a poor person is a minor act of charity; it is given the reward associated with the most demanding, celebrated forms of devotion.",
      "A closely related teaching addresses care for orphans specifically: the Prophet (pbuh) said, \"I and the one who looks after an orphan and provides for him will be in Paradise like this,\" putting his index and middle fingers together to show the closeness intended (Sahih al-Bukhari 6005) — official teaching #11 in the syllabus's list.",
      "Together, these two teachings establish that caring for society's most vulnerable — widows, the poor and orphaned children — is treated in Islam as one of the highest forms of devotion available, promising closeness to the Prophet (pbuh) himself and reward equal to demanding worship, rather than being seen as a lesser, optional kindness.",
    ],
    keyFacts: [
      { label: "Widow/poor reference", detail: "Sahih al-Bukhari 5353." },
      { label: "Orphan reference", detail: "Sahih al-Bukhari 6005." },
      { label: "Widow/poor comparison", detail: "Equal to a mujahid, or to one who prays all night and fasts every day." },
      { label: "Orphan promise", detail: "Closeness to the Prophet (pbuh) in Paradise, illustrated by two joined fingers." },
    ],
    ao1Guidance: [
      "State both teachings separately with their exact comparisons (mujahid/night-worshipper for widows and the poor; two joined fingers for the orphan's carer).",
      "Cite both Hadith references (Bukhari 5353 and Bukhari 6005) accurately.",
    ],
    ao2Guidance: [
      "Explain the significance of comparing ordinary social care to demanding worship or armed struggle — it teaches that quiet, sustained kindness can carry equal or greater reward than dramatic acts of devotion.",
      "Discuss why promising closeness to the Prophet (pbuh) himself, rather than a general reward, is a particularly powerful incentive for caring for orphans specifically.",
    ],
    commonMistakes: [
      "Conflating the widow/poor teaching and the orphan teaching into one undifferentiated statement about \"being kind to the vulnerable\" — each has its own precise wording and comparison worth stating separately.",
      "Omitting the specific gesture (joined fingers) in the orphan teaching, which is a distinctive, examinable detail.",
    ],
    examTip:
      "For a question on community responsibilities, use this lesson's two teachings together as strong, specific evidence of Islam's concern for society's most vulnerable — far more effective than a general statement about 'being kind to the poor'.",
    relatedTopics: [
      { paper: 2, section, slug: "charity-and-sharing", title: "Community Life: Charity and Sharing with Others" },
      { paper: 2, section: "articles-of-faith-and-pillars", slug: "zakah", title: "Pillar of Islam: Zakah" },
    ],
  },
  {
    slug: "gentleness-in-guidance",
    paper: 2,
    section,
    title: "Community Life: Gentleness, Glad Tidings and Not Alienating Others",
    standing: "Hadith teaching that guiding and dealing with others should be done with ease and encouragement, not harshness or difficulty.",
    learningObjectives: [
      "State the Hadith teaching's four linked instructions on gentleness in guidance.",
      "Explain why the Prophet (pbuh) is reported to have given this instruction to those he sent to teach or lead others.",
      "Discuss the significance of this teaching for how Islam should be communicated to others.",
    ],
    keyTerms: [
      { term: "Tabshir", meaning: "Giving glad tidings/good news — the positive, encouraging approach this teaching instructs, as opposed to only warning or criticising." },
      { term: "Ta'sir", meaning: "Making things difficult — explicitly prohibited in this teaching, in contrast to making things easy (taysir)." },
    ],
    explanation: [
      "A Hadith teaching reports the Prophet (pbuh) instructing, \"Make things easy and do not make them difficult, give glad tidings and do not repel people, and cooperate with one another and do not be divided\" (Sahih al-Bukhari 69, with a closely related version at Sahih al-Bukhari 3038), reportedly given as guidance to companions sent to teach or lead others.",
      "This teaching (official teaching #12 in the syllabus's list of 20 prescribed Hadiths) sets out a clear standard for how guidance, correction and religious teaching should be delivered: with ease rather than harshness, with encouragement rather than only warning, and with unity rather than division.",
      "The instruction not to \"repel people\" (i.e. not to alienate them through excessive severity) matters especially for anyone in a position of religious teaching, leadership or parenting — the goal is to draw people toward good conduct and belief, not to drive them away through impatience or excessive strictness.",
      "This teaching complements the individual-conduct principle of 'fighting evil by hand, tongue and heart' by clarifying the tone that should accompany correction and guidance: firm on principle, but gentle and encouraging in delivery.",
    ],
    keyFacts: [
      { label: "Reference", detail: "Sahih al-Bukhari 69 (related version at Sahih al-Bukhari 3038)." },
      { label: "Four linked instructions", detail: "Make things easy, not difficult; give glad tidings, do not alienate; cooperate, do not divide." },
      { label: "Original context", detail: "Reportedly given as guidance to companions sent out to teach and guide others." },
    ],
    ao1Guidance: [
      "State all the linked instructions in this teaching, not only \"be gentle\" — examiners expect the specific paired contrasts (ease/difficulty, glad tidings/alienation, cooperation/division).",
      "Note the reported context: guidance given to those tasked with teaching or leading others.",
    ],
    ao2Guidance: [
      "Explain the significance of pairing a positive instruction with its opposite in each case (ease vs. difficulty, etc.) — it makes the standard for good conduct in guidance unusually precise and memorable.",
      "Discuss why gentleness in guidance matters practically: harsh or overly strict approaches can alienate people from good conduct rather than encourage it, undermining the purpose of teaching or correction.",
    ],
    commonMistakes: [
      "Reducing this teaching to a vague idea of \"be nice\" rather than citing its specific paired instructions.",
      "Missing the connection between this teaching and leadership/teaching roles specifically, rather than treating it as generic advice.",
    ],
    examTip:
      "This teaching works well as a counterbalance in an answer that also covers 'fighting evil' or 'enjoining good, forbidding evil' — showing that firmness on principle and gentleness in approach are both taught, not in tension with each other.",
    relatedTopics: [
      { paper: 2, section, slug: "fighting-against-evil", title: "Individual Conduct: Fighting Against Evil" },
      { paper: 2, section, slug: "enjoining-good-forbidding-evil", title: "Community Life: Enjoining Good and Forbidding Evil" },
    ],
  },
  {
    slug: "retaining-the-quran",
    paper: 2,
    section,
    title: "Individual Conduct: Retaining and Reciting the Qur'an",
    standing: "Hadith comparing the person who memorises the Qur'an to the owner of a tethered camel: dedicated care keeps it, neglect loses it.",
    learningObjectives: [
      "State the Hadith teaching's comparison between a memoriser of the Qur'an and a tethered camel.",
      "Explain what the comparison teaches about the effort needed to retain religious knowledge.",
      "Discuss why continual revision, not just initial learning, is emphasised in this teaching.",
    ],
    keyTerms: [
      { term: "Hifz", meaning: "Memorisation — specifically of the Qur'an, the effort this teaching says must be continually maintained, not treated as a one-off achievement." },
      { term: "Sahib al-Ibl al-Mu'aqqalah", meaning: "\"The owner/companion of the tethered camel\" — the image used to compare someone who retains the Qur'an through continued effort." },
    ],
    explanation: [
      "A Hadith teaching compares a person who has memorised the Qur'an to the owner of a tethered camel: if he holds onto it firmly (continues reciting and reviewing), he keeps it; if he lets it go, he loses it (Sahih al-Bukhari 5031, with a closely related version at Sahih al-Bukhari 5032/5033 and Sahih Muslim 789).",
      "This teaching (official teaching #13 in the syllabus's list of 20 prescribed Hadiths) makes the point that memorising the Qur'an is not a one-time achievement but requires ongoing, deliberate effort — like keeping an animal tethered so it cannot wander off, a person must actively revise and recite what they have learned or risk forgetting it.",
      "A related version adds that the Qur'an \"escapes from memory faster than a camel does from its tying ropes\", underlining just how quickly retained knowledge can be lost without consistent practice, and instructing believers to keep reciting it regularly.",
      "The broader lesson extends beyond Qur'an memorisation specifically: it models the general principle that religious knowledge and skill, once gained, must be actively maintained through repetition and practice, not assumed to remain secure once learned.",
    ],
    keyFacts: [
      { label: "Reference", detail: "Sahih al-Bukhari 5031 (related versions at 5032, 5033; also Sahih Muslim 789)." },
      { label: "Core image", detail: "A memoriser of the Qur'an is like the owner of a tethered camel — firm hold keeps it, letting go loses it." },
      { label: "Related instruction", detail: "Keep reciting the Qur'an regularly, since it is forgotten faster than a camel escapes its ropes." },
    ],
    ao1Guidance: [
      "State the comparison precisely: firm hold (continued recitation) keeps the Qur'an memorised; letting go (neglect) loses it, like a tethered camel.",
      "Mention the related point about the Qur'an escaping memory \"faster than a camel from its ropes\" as reinforcing evidence.",
    ],
    ao2Guidance: [
      "Explain the significance of using an everyday, physical image (a tethered camel) to convey an abstract point about memory and effort — it makes the teaching memorable and practical.",
      "Discuss why this teaching's emphasis on ongoing effort, not just initial learning, is significant for how Muslims are encouraged to engage with the Qur'an throughout life, not only during formal study.",
    ],
    commonMistakes: [
      "Describing the comparison only as \"the Qur'an is easily forgotten\" without the specific camel image, which is the teaching's distinguishing feature.",
      "Treating this teaching as relevant only to those who have formally memorised the whole Qur'an, rather than as a general principle about revision and retention.",
    ],
    examTip:
      "This teaching gives a strong, vivid example for any answer about the importance of regular Qur'an recitation — use the camel image directly rather than paraphrasing it away, since its specificity is what examiners are checking for.",
    relatedTopics: [
      { paper: 2, section: "history-of-hadith", slug: "importance-of-hadith", title: "The Importance of Hadith as a Source of Guidance" },
      { paper: 1, section: "history-of-the-quran", slug: "quran-as-source-of-law", title: "The Qur'an as a Source of Islamic Law" },
    ],
  },
  {
    slug: "kindness-in-commerce",
    paper: 2,
    section,
    title: "Community Life: Kindness in Buying, Selling and Claiming Dues",
    standing: "Hadith teaching that Allah's mercy is upon those who are lenient and easy-going in trade, whether buying, selling or collecting what is owed to them.",
    learningObjectives: [
      "State the Hadith teaching on leniency in commercial dealings.",
      "Explain what leniency in buying, selling and claiming dues means in practice.",
      "Discuss the significance of applying ethical conduct to ordinary trade, not only worship.",
    ],
    keyTerms: [
      { term: "Samahah", meaning: "Easy-going generosity/leniency — the quality praised in this teaching when applied to trade and the collection of debts." },
      { term: "Qadaa' al-Dayn", meaning: "Settling/claiming a debt — one of the three commercial situations in which leniency is specifically praised." },
    ],
    explanation: [
      "A Hadith teaching states, \"May Allah's mercy be on him who is lenient in his buying, selling, and in demanding back his money\" (Sahih al-Bukhari 2076).",
      "This teaching (official teaching #14 in the syllabus's list of 20 prescribed Hadiths) names three distinct commercial situations — buying, selling, and collecting money owed — and praises ease and generosity of spirit in each, rather than harsh bargaining or aggressive debt collection.",
      "The teaching extends ethical conduct into an area of life often treated as purely practical or self-interested: ordinary trade and financial dealings are shown to be a genuine arena for good character, not separate from religious virtue.",
      "Leniency here does not mean carelessness with one's own rights, but a generous, easy-going manner of exercising them — for example, accepting a fair price without excessive haggling, or giving a debtor reasonable time and courtesy when a debt is due, rather than demanding payment harshly.",
    ],
    keyFacts: [
      { label: "Reference", detail: "Sahih al-Bukhari 2076." },
      { label: "Three situations named", detail: "Buying, selling, and demanding back money owed (claiming dues)." },
      { label: "Core theme", detail: "Allah's mercy is linked to leniency and ease in commercial conduct." },
    ],
    ao1Guidance: [
      "Name all three commercial situations covered by the teaching, not only buying and selling.",
      "Quote the teaching's structure precisely: it links Allah's mercy directly to leniency in each of the three situations.",
    ],
    ao2Guidance: [
      "Explain the significance of extending religious virtue into ordinary trade — it shows that Islam evaluates everyday economic conduct by the same ethical standard as worship or social relations.",
      "Discuss why leniency in claiming a debt specifically is highlighted — it addresses a situation where a person has a legitimate right but is instructed to exercise it with grace rather than harshness.",
    ],
    commonMistakes: [
      "Treating this teaching as only about giving discounts, missing the third element on claiming dues/debts.",
      "Assuming leniency in trade means giving up one's rights entirely, rather than exercising them with courtesy and ease.",
    ],
    examTip:
      "This teaching provides strong evidence for a question asking how Islamic ethics apply beyond worship into everyday economic life — pair it with the 'Honest Livelihood' teaching for a fuller answer on Hadith guidance on work and trade.",
    relatedTopics: [
      { paper: 2, section, slug: "honest-livelihood", title: "Individual Conduct: Honest Livelihood and One's Own Work" },
      { paper: 2, section, slug: "rights-and-brotherhood", title: "Community Life: Rights of Others and Muslim Brotherhood" },
    ],
  },
  {
    slug: "mercy-to-others",
    paper: 2,
    section,
    title: "Community Life: Allah's Mercy and Showing Mercy to People",
    standing: "Hadith teaching that Allah's mercy toward a person is connected to how mercifully that person treats others.",
    learningObjectives: [
      "State the Hadith teaching linking mercy shown to others with mercy received from Allah.",
      "Explain the teaching's specific instruction to \"be merciful to those on earth\".",
      "Discuss why this teaching frames mercy as reciprocal rather than one-directional.",
    ],
    keyTerms: [
      { term: "Rahmah", meaning: "Mercy — a central attribute of Allah (al-Rahman, al-Rahim) that this teaching instructs believers to reflect in their own conduct toward others." },
      { term: "Ahl al-Ard", meaning: "\"The inhabitants of the earth\" — the intended recipients of mercy in this teaching, understood broadly rather than limited to one's own community." },
    ],
    explanation: [
      "A Hadith teaching states, \"Those who are merciful are shown mercy by the Most Merciful. Be merciful to the inhabitants of the earth and the One in the heaven will be merciful to you\" (Sunan Abi Dawud 4941 / Jami' at-Tirmidhi 1924).",
      "This teaching (official teaching #15 in the syllabus's list of 20 prescribed Hadiths) presents mercy as reciprocal: showing mercy to other people, described broadly as \"the inhabitants of the earth\" rather than only fellow Muslims or relatives, is directly connected to receiving Allah's mercy in return.",
      "By framing the instruction this way, the teaching makes mercy toward others a spiritually significant, self-interested act as well as a moral one — a Muslim's own hope for Allah's mercy is tied to the mercy they choose to extend to people (and, in the wider Hadith tradition, to animals) around them.",
      "This connects directly to Allah's own names and attributes, al-Rahman (the Entirely Merciful) and al-Rahim (the Especially Merciful), which open every surah but one in the Qur'an, showing that mercy is meant to be reflected from Allah's character into human conduct, not only received passively.",
    ],
    keyFacts: [
      { label: "Reference", detail: "Sunan Abi Dawud 4941 / Jami' at-Tirmidhi 1924." },
      { label: "Core teaching", detail: "Those who are merciful are shown mercy by Allah; be merciful to the inhabitants of the earth." },
      { label: "Related Qur'anic attribute", detail: "Allah as al-Rahman (Entirely Merciful) and al-Rahim (Especially Merciful)." },
    ],
    ao1Guidance: [
      "Quote the teaching's reciprocal structure precisely: mercy shown to others is directly connected to Allah's mercy received.",
      "Note the broad scope of \"inhabitants of the earth\", not limited to one's own family or community.",
    ],
    ao2Guidance: [
      "Explain the significance of framing mercy as reciprocal rather than a one-way command — it gives believers a direct spiritual incentive tied to their own hope of Allah's mercy, not just an abstract moral rule.",
      "Discuss why extending mercy broadly (\"inhabitants of the earth\") rather than narrowly is significant for building a compassionate, inclusive community.",
    ],
    commonMistakes: [
      "Treating this teaching as only about being emotionally kind, missing its precise reciprocal structure (mercy given, mercy received).",
      "Narrowing \"inhabitants of the earth\" to only fellow Muslims when the teaching's scope is deliberately broader.",
    ],
    examTip:
      "Link this teaching to Allah's names al-Rahman/al-Rahim where relevant — showing the connection between Allah's own attributes and the conduct expected of believers strengthens an AO2 answer on why mercy matters in Islam.",
    relatedTopics: [
      { paper: 2, section, slug: "caring-for-the-vulnerable", title: "Community Life: Caring for Widows, the Poor and Orphans" },
      { paper: 2, section: "articles-of-faith-and-pillars", slug: "belief-in-allah", title: "Article of Faith: Belief in Allah" },
    ],
  },
  {
    slug: "character-humility-and-sincerity",
    paper: 2,
    section,
    title: "Individual Conduct: Modesty, Humility and Allah Judging the Heart",
    standing: "Three linked Hadith teachings: modesty produces only good, pride bars a person from Paradise, and Allah judges people by their hearts and deeds, not their appearance or wealth.",
    learningObjectives: [
      "State the Hadith teaching that modesty (haya) brings only good.",
      "State the Hadith teaching that even a mustard seed's weight of pride can bar a person from Paradise.",
      "State the Hadith teaching that Allah looks at hearts and deeds, not bodies or wealth.",
    ],
    keyTerms: [
      { term: "Haya", meaning: "Modesty/a sense of shame that restrains a person from wrongdoing — described in Hadith as producing only good." },
      { term: "Kibr", meaning: "Pride/arrogance — described in Hadith as capable of barring a person from Paradise even in the smallest amount." },
    ],
    explanation: [
      "A Hadith teaching states simply that \"modesty (haya) does not bring anything except good\" (Sahih al-Bukhari 6117 / Sahih Muslim 37) — official teaching #17 in the syllabus's list of 20 prescribed Hadiths — presenting modesty as an unqualified virtue with no downside.",
      "A related teaching warns that whoever has in their heart the weight of a mustard seed of pride will not enter Paradise (Sahih Muslim 91), just as elsewhere even a small amount of sincere faith is described as enough to save a person — official teaching #18 in the syllabus's list, showing how seriously arrogance is treated as an obstacle to salvation.",
      "A further teaching states that Allah does not look at people's bodies or their wealth, but looks at their hearts and their deeds (Sahih Muslim 2564) — official teaching #20 in the syllabus's list — meaning that outward appearance, physical attractiveness and material possessions carry no weight whatsoever in Allah's judgement of a person.",
      "Grouped together, these three teachings build a single, coherent picture of inner character as the true basis of a person's standing before Allah: cultivate modesty, avoid even minor pride, and remember that sincerity of heart and quality of action, not appearance or possessions, are what is actually being judged.",
    ],
    keyFacts: [
      { label: "Modesty reference", detail: "Sahih al-Bukhari 6117 / Sahih Muslim 37 — \"Haya does not bring anything except good.\"" },
      { label: "Pride reference", detail: "Sahih Muslim 91 — a mustard seed's weight of pride bars a person from Paradise." },
      { label: "Judged by the heart reference", detail: "Sahih Muslim 2564 — Allah looks at hearts and deeds, not bodies or wealth." },
    ],
    ao1Guidance: [
      "State all three teachings separately with their exact collection/number, since each is individually listed in the syllabus's 20 prescribed Hadiths.",
      "Use the precise images given (mustard seed's weight; bodies and wealth vs. hearts and deeds) rather than vague paraphrases.",
    ],
    ao2Guidance: [
      "Explain why these three teachings work well together: modesty is praised as pure good, pride is condemned even in tiny amounts, and both point back to the same underlying standard — Allah judges the inner state of the heart, not outward appearance or possessions.",
      "Discuss the significance of \"even a mustard seed's weight\" of pride being enough to bar a person from Paradise — it removes any sense that minor arrogance is harmless, making humility a continuous, serious discipline.",
    ],
    commonMistakes: [
      "Treating these as one vague teaching about \"good character\" rather than three distinct, individually citable Hadiths.",
      "Confusing the pride/Paradise teaching with the separate faith/arrogance \"mustard seed\" teaching covered under Belief and the Obligatory Acts of Worship — note both use the mustard-seed image but for related, not identical, points, and cite each correctly.",
    ],
    examTip:
      "When a question asks for 'Hadith teachings on character', these three give a tightly linked, easily structured answer — state each teaching, then draw out the single shared theme (the heart's inner state, not outward appearance, is what matters to Allah) for a strong AO2 conclusion.",
    relatedTopics: [
      { paper: 2, section, slug: "shahadah-and-worship", title: "Individual Conduct: Belief and the Obligatory Acts of Worship" },
      { paper: 2, section, slug: "sincerity-ikhlas", title: "Individual Conduct: Sincerity (Ikhlas)" },
    ],
  },
  {
    slug: "worldly-restraint-and-the-hereafter",
    paper: 2,
    section,
    title: "Individual Conduct: The World as a Prison for the Believer",
    standing: "Hadith teaching that this worldly life is like a prison for a believer bound by religious duty, in contrast to a disbeliever who treats it as an unrestrained paradise.",
    learningObjectives: [
      "State the Hadith teaching describing the world as a prison for the believer and a paradise for the disbeliever.",
      "Explain the reasoning behind this comparison.",
      "Discuss the significance of this teaching for a believer's attitude toward worldly life and self-restraint.",
    ],
    keyTerms: [
      { term: "Dunya", meaning: "This worldly life — described in this teaching as a place of restraint (a \"prison\") for the believer, who lives within the limits Allah has set." },
      { term: "Akhirah", meaning: "The Hereafter — the lasting reward a believer is understood to be working toward, which gives meaning to restraint in this worldly life." },
    ],
    explanation: [
      "A Hadith teaching states that this world is a prison for the believer and a paradise for the disbeliever (Sahih Muslim 2956) — official teaching #19 in the syllabus's list of 20 prescribed Hadiths.",
      "The comparison reflects the believer's experience of worldly life as one of self-restraint: a believer chooses to limit their desires and conduct within the boundaries Allah has set (avoiding what is forbidden, fulfilling religious duties), which can feel confining compared to someone who pursues every worldly desire without such limits.",
      "For the disbeliever, by contrast, this world may feel like an unrestrained paradise precisely because they are not bound by the same religious limits — but the teaching's implicit point, consistent with wider Hadith and Qur'anic teaching on the Hereafter, is that this apparent freedom is temporary and ultimately reversed: true, lasting reward belongs to the believer in the life to come.",
      "The lesson drawn is not that worldly life itself is evil, but that a believer's discipline and self-restraint in this life should be understood as a worthwhile, temporary constraint in view of the far greater and lasting reward of the Hereafter, rather than as a loss.",
    ],
    keyFacts: [
      { label: "Reference", detail: "Sahih Muslim 2956 (Book of Zuhd, asceticism and softening of hearts)." },
      { label: "Core comparison", detail: "This world is a prison for the believer (bound by religious limits) and a paradise for the disbeliever (unrestrained)." },
      { label: "Underlying point", detail: "The believer's restraint in this life is temporary and outweighed by the lasting reward of the Hereafter." },
    ],
    ao1Guidance: [
      "State the comparison exactly as given: prison for the believer, paradise for the disbeliever — reversing either side loses the teaching's precise meaning.",
      "Be able to cite the reference (Sahih Muslim 2956) and its book context (Zuhd, asceticism/self-restraint).",
    ],
    ao2Guidance: [
      "Explain the significance of describing restraint from a believer's perspective as feeling like a \"prison\", while still teaching that this restraint is worthwhile — it is honest about the difficulty of self-discipline rather than presenting religious life as effortless.",
      "Discuss why this teaching's implicit contrast with the Hereafter (the disbeliever's apparent worldly freedom is not lasting) matters for sustaining a believer's motivation for ongoing self-restraint.",
    ],
    commonMistakes: [
      "Reversing the comparison (describing the world as a paradise for the believer) — the teaching's precise wording is the opposite.",
      "Treating this teaching as condemning worldly life itself, rather than describing the believer's experience of self-restraint within it.",
    ],
    examTip:
      "This teaching connects naturally to the Articles of Faith on the Hereafter — a strong answer notes that the 'prison' feeling is only bearable, and only makes sense, in light of the belief in lasting reward after death.",
    relatedTopics: [
      { paper: 2, section: "articles-of-faith-and-pillars", slug: "belief-in-resurrection", title: "Article of Faith: Belief in the Day of Resurrection" },
      { paper: 2, section, slug: "character-humility-and-sincerity", title: "Individual Conduct: Modesty, Humility and Allah Judging the Heart" },
    ],
  },
];
