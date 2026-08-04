import type { Topic } from "./types";

const section = "major-teachings-of-hadith";

// NOTE ON HADITH TEXT: each lesson cites the exact collection and Hadith number (as listed on
// sunnah.com) alongside the original explanation of the theme. See docs/build-status.md,
// "Verification Pass", for the full list of Hadiths verified and the sources used.

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
    ],
    explanation: [
      "The Qur'an instructs believers not to ridicule one another, not to call one another by offensive nicknames, and to avoid excessive suspicion, spying and backbiting (Qur'an 49:11-12), and Hadith teaching reinforces and applies this guidance to everyday community relationships.",
      "One teaching instructs Muslims not to cut off relations with one another, not to hate one another, and not to envy one another, but to be, as servants of Allah, like brothers (Sahih al-Bukhari 6065).",
      "A well-known teaching defines the ideal Muslim in terms of social conduct: \"the Muslim is the one from whose tongue and hand other people are safe\" (Sahih al-Bukhari 10 / Sahih Muslim 40), making protection of others from one's own words and actions the practical test of good social character.",
      "The overall lesson is that good manners, respect, and actively avoiding harm to others — whether through speech, action or ill-feeling — are what keep a community united and at peace, rather than good conduct being reduced to formal ritual worship alone.",
    ],
    keyFacts: [
      { label: "Qur'anic basis", detail: "Qur'an 49:11-12 — against ridicule, offensive nicknames, suspicion, spying and backbiting." },
      { label: "Community harmony teaching", detail: "Do not cut off relations, hate or envy one another; be as brothers." },
      { label: "Definition of a true Muslim (social)", detail: "One from whose tongue and hand other people are safe." },
    ],
    ao1Guidance: [
      "Be able to cite the Qur'anic reference (49:11-12) alongside the Hadith teachings it supports.",
      "State the 'tongue and hand' definition precisely — it is a frequently quoted, exact formulation.",
    ],
    ao2Guidance: [
      "Explain why defining a true Muslim by the safety others feel from their words and actions is significant — it makes social ethics, not just personal piety, a core measure of faith.",
      "Discuss the practical significance of warning against backbiting, suspicion and offensive nicknames for preventing the breakdown of trust and unity within a community.",
    ],
    commonMistakes: [
      "Quoting the 'tongue and hand' Hadith inaccurately or vaguely rather than as the precise formulation examiners expect.",
      "Discussing only the negative prohibitions (do not envy, do not hate) without linking them to the positive teaching (be as brothers).",
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
    ],
  },
];
