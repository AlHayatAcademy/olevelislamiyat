// Quiz bank for Cambridge O Level Islamiyat (2058) / IGCSE Islamiyat (0493).
//
// Every question below is derived from facts genuinely stated in the corresponding lesson in
// data/topics/*.ts (keyFacts, keyTerms, explanation). Question wording is original — written
// fresh for this quiz engine, not copied from lesson prose. Each quiz links back to its source
// lesson via `topicSlug` so learners can revise the full lesson before or after attempting it.

export type QuestionType = "multiple-choice" | "true-false" | "matching";

export interface McqQuestion {
  id: string;
  type: "multiple-choice";
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TrueFalseQuestion {
  id: string;
  type: "true-false";
  question: string;
  correctAnswer: boolean;
  explanation: string;
}

export interface MatchingQuestion {
  id: string;
  type: "matching";
  question: string;
  pairs: { left: string; right: string }[];
  explanation: string;
}

export type QuizQuestion = McqQuestion | TrueFalseQuestion | MatchingQuestion;

export interface Quiz {
  id: string;
  title: string;
  paper: 1 | 2;
  section: string;
  topicSlug: string;
  topicTitle: string;
  description: string;
  questions: QuizQuestion[];
}

export const quizzes: Quiz[] = [
  {
    id: "the-first-revelation",
    title: "The First Revelation",
    paper: 1,
    section: "history-of-the-quran",
    topicSlug: "first-revelation",
    topicTitle: "The First Revelation",
    description: "Test your recall of the events of the first revelation in the Cave of Hira.",
    questions: [
      {
        id: "q1",
        type: "multiple-choice",
        question: "Where was the Prophet (pbuh) when he received the first revelation?",
        options: ["The Cave of Thawr", "The Cave of Hira", "The plain of Arafat", "The Ka'bah"],
        correctIndex: 1,
        explanation: "The first revelation came to the Prophet (pbuh) in the Cave of Hira, on a mountain near Makkah, where he regularly withdrew for solitary worship.",
      },
      {
        id: "q2",
        type: "multiple-choice",
        question: "Approximately how old was the Prophet (pbuh) when he received the first revelation?",
        options: ["About twenty-five", "About thirty", "About forty", "About fifty"],
        correctIndex: 2,
        explanation: "The Prophet (pbuh) was about forty years old at the time of the first revelation.",
      },
      {
        id: "q3",
        type: "true-false",
        question: "The first revelation took place during the month of Ramadan.",
        correctAnswer: true,
        explanation: "The first revelation occurred in the month of Ramadan.",
      },
      {
        id: "q4",
        type: "multiple-choice",
        question: "What was the first word of the revelation brought by the angel Jibril?",
        options: ["Qul (\"Say\")", "Iqra (\"Read\")", "Bismillah", "Alhamdulillah"],
        correctIndex: 1,
        explanation: "The first revealed verses, the opening of Surah al-'Alaq (96:1-3), began with the command \"Iqra\" (\"Read\").",
      },
      {
        id: "q5",
        type: "multiple-choice",
        question: "Who comforted the Prophet (pbuh) after the frightening experience of the first revelation?",
        options: ["Abu Bakr (RA)", "His wife Khadijah (RA)", "Umar (RA)", "Waraqah ibn Nawfal"],
        correctIndex: 1,
        explanation: "His wife Khadijah bint Khuwaylid (RA) comforted him and reassured him after he returned home shaken by the experience.",
      },
      {
        id: "q6",
        type: "true-false",
        question: "Waraqah ibn Nawfal was a young companion who had never heard of earlier scriptures.",
        correctAnswer: false,
        explanation: "Waraqah ibn Nawfal was Khadijah's (RA) elderly cousin, who was familiar with earlier scriptures and helped confirm the nature of the experience.",
      },
      {
        id: "q7",
        type: "multiple-choice",
        question: "Which angel delivered the revelation to the Prophet (pbuh)?",
        options: ["Israfil", "Mika'il", "Jibril", "Malik al-Mawt"],
        correctIndex: 2,
        explanation: "Jibril is the angel entrusted with delivering Allah's revelation to the prophets, including Muhammad (pbuh).",
      },
    ],
  },
  {
    id: "compilation-under-abu-bakr",
    title: "Compilation of the Qur'an Under Abu Bakr",
    paper: 1,
    section: "history-of-the-quran",
    topicSlug: "compilation-under-abu-bakr",
    topicTitle: "Compilation Under Abu Bakr",
    description: "Test your knowledge of how and why the Qur'an was compiled into a single written collection.",
    questions: [
      {
        id: "q1",
        type: "multiple-choice",
        question: "Who first proposed compiling the Qur'an into a single written collection?",
        options: ["Zayd ibn Thabit (RA)", "Umar ibn al-Khattab (RA)", "Uthman ibn Affan (RA)", "Ali ibn Abi Talib (RA)"],
        correctIndex: 1,
        explanation: "Umar ibn al-Khattab (RA) proposed the compilation, prompted by the heavy loss of huffaz (those who had memorised the Qur'an) at the Battle of Yamama.",
      },
      {
        id: "q2",
        type: "true-false",
        question: "The compilation was carried out under the authority of Caliph Abu Bakr (RA).",
        correctAnswer: true,
        explanation: "Abu Bakr al-Siddiq (RA), the first caliph, authorised and ordered the compilation.",
      },
      {
        id: "q3",
        type: "multiple-choice",
        question: "Who was entrusted with leading the compilation work?",
        options: ["Zayd ibn Thabit (RA)", "Abdullah ibn Mas'ud (RA)", "Hafsa bint Umar (RA)", "Abu Ubaydah ibn al-Jarrah (RA)"],
        correctIndex: 0,
        explanation: "Zayd ibn Thabit (RA), a trusted scribe of revelation, led the compilation.",
      },
      {
        id: "q4",
        type: "multiple-choice",
        question: "What was the resulting written collection of the Qur'an known as?",
        options: ["The Mus'haf", "The Suhuf", "The Sihah Sittah", "The Matn"],
        correctIndex: 1,
        explanation: "The result was the suhuf — a single, verified written collection of the complete Qur'an.",
      },
      {
        id: "q5",
        type: "true-false",
        question: "The event that triggered the urgency of compiling the Qur'an was heavy loss of huffaz at the Battle of Yamama.",
        correctAnswer: true,
        explanation: "Heavy losses among the Qur'an's memorisers at the Battle of Yamama, during the Ridda wars, made the risk of losing parts of the Qur'an urgent and real.",
      },
      {
        id: "q6",
        type: "multiple-choice",
        question: "After completion, who kept custody of the compiled suhuf, in order?",
        options: [
          "Abu Bakr (RA), then Umar (RA), then Hafsa (RA)",
          "Umar (RA), then Uthman (RA), then Ali (RA)",
          "Zayd ibn Thabit (RA), then Abu Bakr (RA), then Uthman (RA)",
          "Khadijah (RA), then Abu Bakr (RA), then Umar (RA)",
        ],
        correctIndex: 0,
        explanation: "The suhuf was kept first by Abu Bakr (RA), then passed to Umar (RA), and then to Hafsa bint Umar (RA).",
      },
    ],
  },
  {
    id: "the-hijrah",
    title: "The Hijrah: Migration to Madinah",
    paper: 1,
    section: "life-of-prophet-muhammad",
    topicSlug: "hijrah",
    topicTitle: "The Hijrah: Migration to Madinah",
    description: "Test your recall of the key people, places and events of the Hijrah.",
    questions: [
      {
        id: "q1",
        type: "multiple-choice",
        question: "In which year did the Hijrah take place?",
        options: ["610 CE", "622 CE", "632 CE", "610 AH"],
        correctIndex: 1,
        explanation: "The Hijrah took place in 622 CE.",
      },
      {
        id: "q2",
        type: "multiple-choice",
        question: "Which companion accompanied the Prophet (pbuh) on the journey to Madinah?",
        options: ["Umar ibn al-Khattab (RA)", "Ali ibn Abi Talib (RA)", "Abu Bakr al-Siddiq (RA)", "Zayd ibn Thabit (RA)"],
        correctIndex: 2,
        explanation: "Abu Bakr al-Siddiq (RA) accompanied the Prophet (pbuh) on the journey.",
      },
      {
        id: "q3",
        type: "true-false",
        question: "The Prophet (pbuh) and Abu Bakr (RA) hid in the Cave of Hira for three nights during the Hijrah.",
        correctAnswer: false,
        explanation: "They hid in the Cave of Thawr, not the Cave of Hira (which is where the first revelation had earlier been received), for three nights.",
      },
      {
        id: "q4",
        type: "multiple-choice",
        question: "Who slept in the Prophet's (pbuh) bed as a decoy on the night of the Hijrah?",
        options: ["Abu Bakr (RA)", "Ali ibn Abi Talib (RA)", "Zayd ibn Thabit (RA)", "Abdullah ibn Urayqit"],
        correctIndex: 1,
        explanation: "Ali ibn Abi Talib (RA) slept in the Prophet's (pbuh) bed as a decoy.",
      },
      {
        id: "q5",
        type: "multiple-choice",
        question: "Who brought provisions to the Prophet (pbuh) and Abu Bakr (RA) in the cave, earning the title Dhat al-Nitaqayn?",
        options: ["Khadijah bint Khuwaylid (RA)", "Hafsa bint Umar (RA)", "Asma bint Abi Bakr (RA)", "Fatimah bint Muhammad (RA)"],
        correctIndex: 2,
        explanation: "Asma bint Abi Bakr (RA) brought provisions and was titled Dhat al-Nitaqayn (\"the woman of the two waist-belts\") for tearing her belt to carry them.",
      },
      {
        id: "q6",
        type: "true-false",
        question: "The first stop near Madinah, where a mosque was established, was Quba.",
        correctAnswer: true,
        explanation: "Quba was the first stop, and a mosque was established there.",
      },
      {
        id: "q7",
        type: "multiple-choice",
        question: "What lasting significance does the Hijrah carry for Muslims?",
        options: [
          "It marks the revelation of the final verse of the Qur'an",
          "It became the starting point (Year 1 AH) of the Islamic calendar",
          "It marks the date of the Farewell Sermon",
          "It marks the compilation of the Qur'an",
        ],
        correctIndex: 1,
        explanation: "The Hijrah became the starting point (Year 1 AH) of the Islamic (Hijri) calendar.",
      },
    ],
  },
  {
    id: "the-farewell-sermon",
    title: "The Farewell Pilgrimage and Sermon",
    paper: 1,
    section: "life-of-prophet-muhammad",
    topicSlug: "farewell-sermon",
    topicTitle: "The Farewell Pilgrimage and Sermon",
    description: "Test your knowledge of the Farewell Pilgrimage and the sermon delivered at Arafat.",
    questions: [
      {
        id: "q1",
        type: "multiple-choice",
        question: "In which year (AH) did the Prophet (pbuh) perform his only Hajj after the Hijrah?",
        options: ["1 AH", "5 AH", "10 AH", "13 AH"],
        correctIndex: 2,
        explanation: "The Farewell Pilgrimage took place in 10 AH — the Prophet's (pbuh) only Hajj after the Hijrah.",
      },
      {
        id: "q2",
        type: "multiple-choice",
        question: "Where was the Farewell Sermon delivered?",
        options: ["The plain of Arafat", "The Cave of Hira", "Madinah's mosque", "Mina"],
        correctIndex: 0,
        explanation: "The sermon was delivered on the plain of Arafat, on 9th Dhu al-Hijjah.",
      },
      {
        id: "q3",
        type: "true-false",
        question: "In the Farewell Sermon, the Prophet (pbuh) declared usury (riba) and pre-Islamic blood feuds abolished.",
        correctAnswer: true,
        explanation: "Among the sermon's key themes was the abolition of usury (riba) and pre-Islamic blood feuds.",
      },
      {
        id: "q4",
        type: "multiple-choice",
        question: "Roughly how many pilgrims are commonly cited as attending the Farewell Pilgrimage?",
        options: ["About 10,000", "About 50,000", "About 124,000", "About 300,000"],
        correctIndex: 2,
        explanation: "An estimated attendance of around 124,000 pilgrims is commonly cited.",
      },
      {
        id: "q5",
        type: "multiple-choice",
        question: "Which verse was recited to close the sermon, declaring the completion of the religion?",
        options: ["Al-Fatiha 1:1-7", "Al-Ikhlas 112:1-4", "Al-Ma'idah 5:3", "Al-'Alaq 96:1-5"],
        correctIndex: 2,
        explanation: "Al-Ma'idah 5:3 was recited, declaring the completion and perfection of the religion.",
      },
      {
        id: "q6",
        type: "true-false",
        question: "The Farewell Sermon addressed racial equality and the rights of women.",
        correctAnswer: true,
        explanation: "Among its key themes, the sermon addressed the rights of women, racial equality, and Muslim brotherhood.",
      },
    ],
  },
  {
    id: "the-ten-blessed-companions",
    title: "The Ten Blessed Companions",
    paper: 1,
    section: "first-islamic-community",
    topicSlug: "ten-blessed-companions",
    topicTitle: "The Ten Blessed Companions",
    description: "Test your recall of the ten companions promised Paradise during their lifetime.",
    questions: [
      {
        id: "q1",
        type: "multiple-choice",
        question: "How many companions make up the group known as Al-'Asharah al-Mubashsharah?",
        options: ["Four", "Six", "Eight", "Ten"],
        correctIndex: 3,
        explanation: "\"Al-'Asharah al-Mubashsharah\" means \"the ten given glad tidings\" — ten companions individually promised Paradise during their lifetime.",
      },
      {
        id: "q2",
        type: "true-false",
        question: "All four Rightly Guided Caliphs (Abu Bakr, Umar, Uthman and Ali) are among the Ten Blessed Companions.",
        correctAnswer: true,
        explanation: "All four Rightly Guided Caliphs are counted among the ten.",
      },
      {
        id: "q3",
        type: "multiple-choice",
        question: "Which companion carried the title Amin al-Ummah (\"the trustworthy one of this nation\")?",
        options: ["Abdur Rahman ibn Awf (RA)", "Abu Ubaydah ibn al-Jarrah (RA)", "Sa'd ibn Abi Waqqas (RA)", "Zubayr ibn al-Awwam (RA)"],
        correctIndex: 1,
        explanation: "Abu Ubaydah ibn al-Jarrah (RA) held the title Amin al-Ummah.",
      },
      {
        id: "q4",
        type: "multiple-choice",
        question: "Which companion among the ten is particularly known for his wealth and charity?",
        options: ["Sa'id ibn Zayd (RA)", "Abdur Rahman ibn Awf (RA)", "Talhah ibn Ubaydillah (RA)", "Ali ibn Abi Talib (RA)"],
        correctIndex: 1,
        explanation: "Abdur Rahman ibn Awf (RA) is remembered particularly for his wealth and his generous charity.",
      },
      {
        id: "q5",
        type: "true-false",
        question: "The term \"Sahabah\" refers only to companions who fought in the Battle of Badr.",
        correctAnswer: false,
        explanation: "\"Sahabah\" refers to those who met the Prophet (pbuh), believed in him, and died as Muslims — not solely those who fought at Badr.",
      },
    ],
  },
  {
    id: "abu-bakr-al-siddiq",
    title: "Abu Bakr al-Siddiq (RA): The First Caliph",
    paper: 2,
    section: "rightly-guided-caliphs",
    topicSlug: "abu-bakr",
    topicTitle: "Abu Bakr al-Siddiq (RA)",
    description: "Test your knowledge of the caliphate of Abu Bakr (RA).",
    questions: [
      {
        id: "q1",
        type: "multiple-choice",
        question: "At which meeting was Abu Bakr (RA) chosen as the first caliph?",
        options: ["Saqifah Bani Sa'idah", "The Farewell Sermon", "The shura council", "Badr"],
        correctIndex: 0,
        explanation: "Abu Bakr (RA) was elected at a meeting held at Saqifah Bani Sa'idah in Madinah.",
      },
      {
        id: "q2",
        type: "multiple-choice",
        question: "Who was the first to pledge allegiance to Abu Bakr (RA) as caliph?",
        options: ["Uthman ibn Affan (RA)", "Umar ibn al-Khattab (RA)", "Ali ibn Abi Talib (RA)", "Zayd ibn Thabit (RA)"],
        correctIndex: 1,
        explanation: "Umar ibn al-Khattab (RA) stepped forward and pledged allegiance to Abu Bakr (RA) first, and others followed.",
      },
      {
        id: "q3",
        type: "true-false",
        question: "Abu Bakr's (RA) caliphate lasted just over two years and was dominated by the Ridda wars.",
        correctAnswer: true,
        explanation: "His caliphate (11-13 AH) lasted little more than two years and was dominated by the Ridda (apostasy) wars.",
      },
      {
        id: "q4",
        type: "multiple-choice",
        question: "What does the title \"Al-Siddiq\", given to Abu Bakr (RA), mean?",
        options: ["The Truthful/Trusting One", "The One Who Distinguishes", "Possessor of the Two Lights", "The Trustworthy One of this Nation"],
        correctIndex: 0,
        explanation: "Al-Siddiq means \"the Truthful/Trusting One\".",
      },
      {
        id: "q5",
        type: "true-false",
        question: "During his caliphate, Abu Bakr (RA) authorised the first complete written compilation of the Qur'an.",
        correctAnswer: true,
        explanation: "This is one of his most significant, examinable achievements as caliph.",
      },
      {
        id: "q6",
        type: "multiple-choice",
        question: "What were the Ridda wars fought over?",
        options: [
          "Territorial expansion into Persia",
          "Tribes rebelling against the Muslim state or refusing to pay zakah",
          "A succession dispute between the Muhajirun and Ansar",
          "Defence of Madinah against the Quraysh",
        ],
        correctIndex: 1,
        explanation: "The Ridda wars were fought against tribes that rebelled against the Muslim state or refused to pay zakah after the Prophet's (pbuh) death.",
      },
    ],
  },
  {
    id: "uthman-ibn-affan",
    title: "Uthman ibn Affan (RA): The Third Caliph",
    paper: 2,
    section: "rightly-guided-caliphs",
    topicSlug: "uthman",
    topicTitle: "Uthman ibn Affan (RA)",
    description: "Test your knowledge of the caliphate of Uthman ibn Affan (RA).",
    questions: [
      {
        id: "q1",
        type: "multiple-choice",
        question: "How was Uthman (RA) chosen as the third caliph?",
        options: [
          "Nominated directly by Abu Bakr (RA)",
          "Elected by public discussion at Saqifah",
          "Selected by the six-member shura council appointed by Umar (RA)",
          "Appointed by his own family",
        ],
        correctIndex: 2,
        explanation: "Uthman (RA) was selected by the six-member shura council that Umar (RA) had appointed before his death.",
      },
      {
        id: "q2",
        type: "multiple-choice",
        question: "What does the title \"Dhun-Nurayn\" (given to Uthman) mean, and why was it given?",
        options: [
          "\"Possessor of the two lights\" — he married two of the Prophet's (pbuh) daughters in succession",
          "\"The Truthful One\" — for his honesty in trade",
          "\"The one who distinguishes\" — for his sound judgement",
          "\"Trustworthy of this nation\" — for his reliability",
        ],
        correctIndex: 0,
        explanation: "Dhun-Nurayn (\"possessor of the two lights\") was given because Uthman (RA) married two of the Prophet's (pbuh) daughters in succession.",
      },
      {
        id: "q3",
        type: "true-false",
        question: "Uthman (RA) is remembered for standardising the Qur'anic text into a small number of master copies.",
        correctAnswer: true,
        explanation: "His lasting achievement was standardising the Qur'anic text into master copies (mesahif), preserving textual uniformity across the growing Muslim state.",
      },
      {
        id: "q4",
        type: "multiple-choice",
        question: "How did Uthman (RA) die?",
        options: [
          "In battle at Yamama",
          "Killed by rebels besieging his house in Madinah, while reading the Qur'an",
          "Assassinated while leading Fajr prayer",
          "Of natural causes in old age",
        ],
        correctIndex: 1,
        explanation: "Uthman (RA) was killed in 35 AH by rebels besieging his house in Madinah, while he was reading the Qur'an.",
      },
      {
        id: "q5",
        type: "true-false",
        question: "Uthman's (RA) reign lasted approximately twelve years.",
        correctAnswer: true,
        explanation: "He reigned 23-35 AH (644-656 CE), approximately twelve years.",
      },
    ],
  },
  {
    id: "belief-and-obligatory-worship",
    title: "Individual Conduct: Belief and Obligatory Worship",
    paper: 2,
    section: "major-teachings-of-hadith",
    topicSlug: "shahadah-and-worship",
    topicTitle: "Individual Conduct: Belief and the Obligatory Acts of Worship",
    description: "Test your understanding of the Hadith teachings on faith and obligatory worship.",
    questions: [
      {
        id: "q1",
        type: "multiple-choice",
        question: "What is described in the syllabus material as the foundation of Islam?",
        options: ["Zakah", "The Shahadah", "Hajj", "Sawm"],
        correctIndex: 1,
        explanation: "The Shahadah — belief in Allah's oneness and Muhammad's (pbuh) messengership — is the foundation of Islam.",
      },
      {
        id: "q2",
        type: "true-false",
        question: "The Hadith teachings covered balance faith and pride: even minimal sincere faith can save, and even minimal arrogance can exclude a person from Paradise.",
        correctAnswer: true,
        explanation: "This balance — the saving power of even a small amount of sincere faith, against the excluding danger of even a small amount of arrogance (kibr) — is a key point in this lesson.",
      },
      {
        id: "q3",
        type: "multiple-choice",
        question: "What Arabic term refers to pride/arrogance, warned against as capable of barring a person from Paradise?",
        options: ["Kibr", "Riba", "Kufr", "Shirk"],
        correctIndex: 0,
        explanation: "Kibr (pride/arrogance) is warned against in Hadith as capable of excluding a person from Paradise even in a small amount.",
      },
      {
        id: "q4",
        type: "true-false",
        question: "The Shahadah is a testimony that there is no deity worthy of worship except Allah, and that Muhammad (pbuh) is His slave and Messenger.",
        correctAnswer: true,
        explanation: "This is the precise content of the Shahadah as defined in the lesson.",
      },
    ],
  },
  {
    id: "belief-in-angels",
    title: "Article of Faith: Belief in Angels",
    paper: 2,
    section: "articles-of-faith-and-pillars",
    topicSlug: "belief-in-angels",
    topicTitle: "Article of Faith: Belief in Angels",
    description: "Test your knowledge of the nature and roles of angels in Islamic belief.",
    questions: [
      {
        id: "q1",
        type: "multiple-choice",
        question: "What are angels created from, according to Islamic belief?",
        options: ["Clay", "Fire", "Light", "Water"],
        correctIndex: 2,
        explanation: "Angels (Mala'ikah) are created from light, and are obedient, unable to disobey Allah.",
      },
      {
        id: "q2",
        type: "true-false",
        question: "Angels have free will and are able to choose to disobey Allah.",
        correctAnswer: false,
        explanation: "Angels are obedient and unable to disobey Allah — they have no free will to sin.",
      },
      {
        id: "q3",
        type: "multiple-choice",
        question: "Which angel is entrusted with delivering divine revelation to the prophets?",
        options: ["Israfil", "Jibril", "Malik al-Mawt", "Mika'il"],
        correctIndex: 1,
        explanation: "Jibril delivers divine revelation to the prophets, including the Qur'an to Muhammad (pbuh).",
      },
      {
        id: "q4",
        type: "multiple-choice",
        question: "Which angel is associated with blowing the trumpet to signal the Day of Judgement?",
        options: ["Jibril", "Malik al-Mawt", "Israfil", "Ridwan"],
        correctIndex: 2,
        explanation: "Israfil is associated with the trumpet blown to signal the Day of Judgement.",
      },
      {
        id: "q5",
        type: "true-false",
        question: "Malik al-Mawt is the Angel of Death, responsible for taking souls.",
        correctAnswer: true,
        explanation: "Malik al-Mawt is the Angel of Death, responsible for taking souls at the appointed time.",
      },
    ],
  },
  {
    id: "pillar-of-salah",
    title: "Pillar of Islam: Salah",
    paper: 2,
    section: "articles-of-faith-and-pillars",
    topicSlug: "salah",
    topicTitle: "Pillar of Islam: Salah",
    description: "Test your knowledge of the five daily prayers and their requirements.",
    questions: [
      {
        id: "q1",
        type: "multiple-choice",
        question: "How many obligatory daily prayers are there in Salah?",
        options: ["Three", "Four", "Five", "Six"],
        correctIndex: 2,
        explanation: "There are five daily prayers: Fajr, Zuhr, Asr, Maghrib and Isha.",
      },
      {
        id: "q2",
        type: "matching",
        question: "Match each key term to its correct meaning.",
        pairs: [
          { left: "Salah", right: "The five daily obligatory prayers, forming the second Pillar of Islam" },
          { left: "Rak'ah", right: "A single unit of prayer with set postures and recitations" },
          { left: "Wudu", right: "Ritual purification required before prayer" },
          { left: "Qiblah", right: "The direction of the Ka'bah, faced during prayer" },
        ],
        explanation: "These four terms cover the essential vocabulary of Salah as a Pillar of Islam.",
      },
      {
        id: "q3",
        type: "true-false",
        question: "Wudu (ritual purification) is required before performing Salah.",
        correctAnswer: true,
        explanation: "Ritual purification (wudu) is required as preparation before Salah.",
      },
      {
        id: "q4",
        type: "multiple-choice",
        question: "Which direction do Muslims face during Salah?",
        options: ["Madinah", "Jerusalem", "The Ka'bah in Makkah (qiblah)", "The east"],
        correctIndex: 2,
        explanation: "Muslims face the Ka'bah in Makkah (the qiblah) during Salah.",
      },
      {
        id: "q5",
        type: "true-false",
        question: "The Friday Jumu'ah prayer has particular communal significance in Islam.",
        correctAnswer: true,
        explanation: "Congregational Friday Jumu'ah prayer carries particular communal significance.",
      },
    ],
  },
  {
    id: "pillar-of-hajj",
    title: "Pillar of Islam: Hajj",
    paper: 2,
    section: "articles-of-faith-and-pillars",
    topicSlug: "hajj",
    topicTitle: "Pillar of Islam: Hajj",
    description: "Test your knowledge of the rites and conditions of Hajj.",
    questions: [
      {
        id: "q1",
        type: "multiple-choice",
        question: "How often is Hajj obligatory for a Muslim who is physically and financially able?",
        options: ["Once a year", "Once in a lifetime", "Once every five years", "Only during Ramadan"],
        correctIndex: 1,
        explanation: "Hajj is obligatory once in a lifetime for those physically and financially able (istita'ah).",
      },
      {
        id: "q2",
        type: "multiple-choice",
        question: "What is the state of ritual consecration entered before Hajj called?",
        options: ["Wudu", "Ihram", "Tawaf", "Sa'i"],
        correctIndex: 1,
        explanation: "Ihram is the state entered before the rites, marked by simple garments that remove distinctions of wealth or status.",
      },
      {
        id: "q3",
        type: "true-false",
        question: "The central rite of Hajj is standing at Arafat, on the ninth of Dhul-Hijjah.",
        correctAnswer: true,
        explanation: "Standing at Arafat, on the ninth of Dhul-Hijjah, is the central rite of Hajj.",
      },
      {
        id: "q4",
        type: "matching",
        question: "Match each Hajj rite to its correct description.",
        pairs: [
          { left: "Tawaf", right: "Circling the Ka'bah" },
          { left: "Sa'i", right: "Walking between Safa and Marwah" },
          { left: "Standing at Arafat", right: "The central rite, on 9th Dhul-Hijjah" },
          { left: "Qurbani", right: "The sacrifice performed during Hajj" },
        ],
        explanation: "These are the key rites of Hajj that candidates should be able to describe in sequence.",
      },
      {
        id: "q5",
        type: "true-false",
        question: "Ihram garments distinguish pilgrims by their wealth and social status.",
        correctAnswer: false,
        explanation: "Ihram garments are simple and plain, specifically removing distinctions of wealth or status among pilgrims.",
      },
    ],
  },
  {
    id: "isnad-and-matn",
    title: "Isnad and Matn: The Structure of a Hadith",
    paper: 2,
    section: "history-of-hadith",
    topicSlug: "isnad-and-matn",
    topicTitle: "Isnad and Matn: The Structure of a Hadith",
    description: "Test your understanding of how a Hadith is structured and authenticated.",
    questions: [
      {
        id: "q1",
        type: "multiple-choice",
        question: "What are the two parts that make up a Hadith?",
        options: ["Isnad and matn", "Sahih and da'if", "Qur'an and Sunnah", "Sanad and Sihah"],
        correctIndex: 0,
        explanation: "A Hadith consists of the isnad (chain of narrators) and the matn (text/content).",
      },
      {
        id: "q2",
        type: "multiple-choice",
        question: "What does \"al-dabt\" refer to, as a required quality of a narrator?",
        options: ["Upright character", "Precise memory", "Physical presence at the event", "Wealth and status"],
        correctIndex: 1,
        explanation: "Al-dabt is precision of memory: the ability to retain and transmit a report accurately without confusion.",
      },
      {
        id: "q3",
        type: "true-false",
        question: "For a Hadith's isnad to be sound, each narrator must be shown to have met the one before them, tracing back to a companion of the Prophet (pbuh).",
        correctAnswer: true,
        explanation: "An unbroken chain, with each narrator's meeting with the one before them established, is a core requirement of a sound isnad.",
      },
      {
        id: "q4",
        type: "multiple-choice",
        question: "What quality does \"al-'adalah\" refer to in a narrator?",
        options: ["Precise memory", "Upright character, piety and integrity", "Being a scribe of revelation", "Wealth"],
        correctIndex: 1,
        explanation: "Al-'adalah is just and upright character: piety, integrity and avoidance of major sins.",
      },
      {
        id: "q5",
        type: "true-false",
        question: "The matn of a Hadith is permitted to directly contradict the Qur'an, provided the isnad is sound.",
        correctAnswer: false,
        explanation: "The matn must not contradict the Qur'an, other authentic Hadith, or sound reason — a sound isnad alone is not sufficient.",
      },
    ],
  },
  {
    id: "the-six-authentic-books",
    title: "The Six Authentic Books (Sihah Sittah)",
    paper: 2,
    section: "history-of-hadith",
    topicSlug: "six-authentic-books",
    topicTitle: "The Six Authentic Books (Sihah Sittah)",
    description: "Test your recall of the six major Hadith collections and their compilers.",
    questions: [
      {
        id: "q1",
        type: "multiple-choice",
        question: "Which collection is regarded as the most authentic and rigorously screened of the six?",
        options: ["Sahih Muslim", "Sahih al-Bukhari", "Sunan Abu Dawud", "Jami' al-Tirmidhi"],
        correctIndex: 1,
        explanation: "Sahih al-Bukhari, compiled by Imam Bukhari, is regarded as the most authentic and rigorously screened of the six.",
      },
      {
        id: "q2",
        type: "matching",
        question: "Match each collection to its compiler.",
        pairs: [
          { left: "Sahih al-Bukhari", right: "Imam Bukhari" },
          { left: "Sahih Muslim", right: "Imam Muslim" },
          { left: "Sunan Abu Dawud", right: "Imam Abu Dawud" },
          { left: "Sunan Ibn Majah", right: "Imam Ibn Majah" },
        ],
        explanation: "Each of the Sihah Sittah is attributed to its named compiler, as covered in the lesson's key facts.",
      },
      {
        id: "q3",
        type: "true-false",
        question: "The Sihah Sittah were compiled during the third century after the Hijrah.",
        correctAnswer: true,
        explanation: "The six collections were compiled in the third century after the Hijrah.",
      },
      {
        id: "q4",
        type: "multiple-choice",
        question: "Which collection is noted for containing unique Hadith not found in the other five?",
        options: ["Sunan al-Nasa'i", "Sunan Ibn Majah", "Jami' al-Tirmidhi", "Sahih Muslim"],
        correctIndex: 1,
        explanation: "Sunan Ibn Majah, compiled by Imam Ibn Majah, contains unique Hadith not found in the other five collections.",
      },
      {
        id: "q5",
        type: "multiple-choice",
        question: "What does the term \"Sihah Sittah\" mean?",
        options: ["The Six Companions", "The Six Authentic [Books]", "The Six Pillars", "The Six Caliphs"],
        correctIndex: 1,
        explanation: "\"Sihah Sittah\" means \"the Six Authentic [Books]\" — the collective name for these six most authoritative Hadith collections.",
      },
    ],
  },
  {
    id: "ayat-al-kursi",
    title: "Theme 1: Ayat al-Kursi (The Throne Verse)",
    paper: 1,
    section: "major-themes-of-the-quran",
    topicSlug: "ayat-al-kursi",
    topicTitle: "Theme 1 (God in Himself): Ayat al-Kursi — Qur'an 2:255",
    description: "Test your knowledge of Ayat al-Kursi and the attributes of Allah it describes.",
    questions: [
      {
        id: "q1",
        type: "multiple-choice",
        question: "Where in the Qur'an is Ayat al-Kursi found?",
        options: ["Qur'an 1:1-7", "Qur'an 2:255", "Qur'an 112:1-4", "Qur'an 96:1-5"],
        correctIndex: 1,
        explanation: "Ayat al-Kursi is Qur'an 2:255, in Surah al-Baqarah.",
      },
      {
        id: "q2",
        type: "multiple-choice",
        question: "What is the core theme of Ayat al-Kursi?",
        options: [
          "The rites of Hajj",
          "Allah's oneness, self-sufficiency, complete knowledge and unlimited authority",
          "The stages of the Day of Judgement",
          "The importance of charity",
        ],
        correctIndex: 1,
        explanation: "The verse's core theme is Allah's oneness, self-sufficiency, complete knowledge and unlimited authority.",
      },
      {
        id: "q3",
        type: "true-false",
        question: "\"Al-Hayy al-Qayyum\" are two of Allah's names occurring in Ayat al-Kursi, meaning the Ever-Living and the Self-Subsisting.",
        correctAnswer: true,
        explanation: "Al-Hayy al-Qayyum — the Ever-Living, the Self-Subsisting — are named in the verse.",
      },
      {
        id: "q4",
        type: "multiple-choice",
        question: "\"Kursi\", the term giving this verse its common name, is often translated as what?",
        options: ["Throne of judgement", "Footstool", "Book of deeds", "Scale"],
        correctIndex: 1,
        explanation: "\"Kursi\" is often translated \"Footstool\", used as an image of the vastness of Allah's authority over the heavens and earth.",
      },
      {
        id: "q5",
        type: "true-false",
        question: "Ayat al-Kursi belongs to the syllabus theme group \"God's relationship with the created world\".",
        correctAnswer: false,
        explanation: "Ayat al-Kursi belongs to Theme 1, \"God in Himself\", not the \"God and Creation\" theme group.",
      },
    ],
  },
];

export function getQuiz(id: string): Quiz | undefined {
  return quizzes.find((q) => q.id === id);
}

export function getQuizzesForPaper(paper: 1 | 2): Quiz[] {
  return quizzes.filter((q) => q.paper === paper);
}
