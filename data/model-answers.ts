// Original model answers for a representative set of past-paper questions.
// Written from scratch based on understanding of what the syllabus/mark schemes reward —
// never copied or closely paraphrased from any mark scheme or examiner report wording.
// See docs/model-answers-and-references-build.md for methodology and coverage notes.

import type { AO, Paper } from "./questions";

export interface ModelAnswer {
  id: string; // matches PastPaperQuestion.id
  questionId: string;
  marks: number;
  ao: AO;
  paper: Paper;
  plan: string[];
  sampleAnswer: string[];
  markingPoints: { point: string; marksAvailable: number }[];
  strengths: string[];
  improvements: string[];
  selfAssessment: string[];
}

export const modelAnswers: ModelAnswer[] = [
  {
    id: "ma-2021-jj-p11-q2a",
    questionId: "2021-jj-p11-q2a",
    marks: 8,
    ao: "AO1",
    paper: 1,
    plan: [
      "Open with a one-line statement that revelation came to the Prophet (pbuh) in several distinct forms.",
      "Cover the ringing-bell sensation and its intensity.",
      "Cover the angel appearing in human form to speak directly.",
      "Cover true dreams (ru'ya sadiqah) during the early Makkan period.",
      "Cover direct inspiration placed into the Prophet's heart without a visible angel.",
      "Close by noting these forms are drawn from his companions' reported observations.",
    ],
    sampleAnswer: [
      "Revelation reached the Prophet Muhammad (pbuh) through more than one method, and companions who observed him described noticeable physical effects each time.",
      "One method was accompanied by a sound like a ringing bell, during which the Prophet (pbuh) would sweat heavily and appear to struggle with concentration, even on a cold day; this was reportedly the most intense form.",
      "On other occasions the Angel Jibril appeared in the form of a man, most famously as a stranger who sat and asked the Prophet (pbuh) questions about faith, Islam and excellence in front of his companions.",
      "In the earliest period of his mission, revelation also came through true dreams, which he experienced for roughly six months before the first waking revelation in the Cave of Hira.",
      "A further form involved ideas or meanings being placed directly into the Prophet's heart without any external sound or visible figure, which he described as the hardest to bear despite there being no visible messenger.",
      "Together these varied forms show that revelation was not a single fixed experience, and companions' accounts of his physical reactions are part of how Muslims understand the seriousness and authenticity of the process.",
    ],
    markingPoints: [
      { point: "Identifies the bell-like sound / ringing sensation form with physical effects", marksAvailable: 2 },
      { point: "Identifies the angel appearing as a man (e.g. the stranger/Hadith of Jibril)", marksAvailable: 2 },
      { point: "Identifies true dreams in the early Makkan period", marksAvailable: 2 },
      { point: "Identifies direct inspiration into the heart with no visible form", marksAvailable: 1 },
      { point: "Coherent structure and use of relevant detail/examples throughout", marksAvailable: 1 },
    ],
    strengths: [
      "Covers four distinct, clearly separated forms rather than blending them into vague description.",
      "Uses a specific example (the man asking about faith, Islam, excellence) to anchor one form in concrete detail.",
    ],
    improvements: [
      "Could add the exact wording tradition names (e.g. naming the episode as the 'Hadith of Jibril') if confident, but only if the fact is verified rather than guessed.",
      "A weaker candidate risks writing only about the Cave of Hira dream episode and stopping there — the question needs the range of forms, not one story in isolation.",
    ],
    selfAssessment: [
      "Did I name at least three distinct forms of revelation, not just one?",
      "Did I include a specific supporting detail (sensation, example, or context) for at least two forms?",
      "Did I avoid drifting into a narrative about the first revelation story alone?",
    ],
  },
  {
    id: "ma-2021-jj-p11-q2b",
    questionId: "2021-jj-p11-q2b",
    marks: 6,
    ao: "AO2",
    paper: 1,
    plan: [
      "State a clear personal line of argument: gradual revelation served practical, pastoral and pedagogical purposes.",
      "Give reason 1: responding to real events and questions as they arose.",
      "Give reason 2: allowing gradual legal/social reform (e.g. phased prohibition of alcohol).",
      "Give reason 3: easing memorisation and strengthening the Prophet's resolve.",
      "Justify which reason is most convincing with a brief evaluative comment.",
    ],
    sampleAnswer: [
      "In my view, the Qur'an was revealed gradually mainly so that guidance could match the real situations Muslims were facing, rather than arriving as an abstract text disconnected from daily life.",
      "One reason is that many verses directly answered questions the early community asked or responded to specific incidents, which made the guidance feel immediately relevant and easier to accept.",
      "A second reason is that gradual revelation allowed difficult social changes, such as the eventual prohibition of alcohol, to be introduced in stages, which made the new rules realistic for people to follow rather than an overwhelming, sudden demand.",
      "A third reason is practical: since the Qur'an was memorised and recorded by hand rather than printed, receiving it in smaller portions over 23 years made accurate memorisation and transmission far more achievable.",
      "I find the argument about phased social reform most convincing, because it explains not just why revelation was gradual but why it had to be gradual for the message to be workable for real people, whereas the memorisation argument is more about convenience than necessity.",
    ],
    markingPoints: [
      { point: "Clear own view/argument stated, not just a list of facts", marksAvailable: 1 },
      { point: "Reason: responding to events/questions as they occurred", marksAvailable: 1 },
      { point: "Reason: phased introduction of new laws/social change (example given)", marksAvailable: 2 },
      { point: "Reason: aiding memorisation/easing the burden of receiving revelation", marksAvailable: 1 },
      { point: "Evaluative justification of which reason is strongest", marksAvailable: 1 },
    ],
    strengths: [
      "Gives a specific example (alcohol) rather than a vague reference to 'gradual laws'.",
      "Ends with genuine evaluation/comparison between reasons rather than just restating them.",
    ],
    improvements: [
      "Could strengthen AO2 marks further by briefly acknowledging a counter-consideration (e.g. that gradual revelation also caused early critics to doubt its divine origin) before dismissing it.",
    ],
    selfAssessment: [
      "Have I given my own view explicitly, using words like 'in my view' or 'I find'?",
      "Do I have at least two distinct, well-explained reasons rather than a single point repeated?",
      "Have I compared/evaluated the reasons rather than just listing them?",
    ],
  },
  {
    id: "ma-2021-jj-p11-q3a",
    questionId: "2021-jj-p11-q3a",
    marks: 10,
    ao: "AO1",
    paper: 1,
    plan: [
      "Set the context: the Makkan leadership's plot to kill the Prophet (pbuh) forced the migration.",
      "Describe departure with Abu Bakr (RA) and the decoy of Ali (RA) sleeping in his bed.",
      "Describe the stop at Cave Thawr: pursuers reaching the cave mouth, the spider's web/dove nest tradition, three days of hiding.",
      "Describe the role of Asma bint Abi Bakr and Abdullah ibn Abi Bakr in supplying food and information.",
      "Describe the journey with the guide Abdullah ibn Uraiqit along the coastal route.",
      "End with arrival and welcome at Quba, then Madinah.",
    ],
    sampleAnswer: [
      "The migration to Madinah became necessary once the leaders of Makkah agreed on a plan to have the Prophet (pbuh) killed, choosing young men from different clans so that responsibility for his death could not be traced to one tribe.",
      "Warned in time, the Prophet (pbuh) left his house at night after arranging for Ali (RA) to sleep in his bed as a decoy, and made his way with Abu Bakr (RA) to Cave Thawr rather than taking the direct northern road, in order to mislead any pursuers.",
      "The Qur'an itself confirms that the search party came right to the cave mouth without finding them: it describes the Prophet (pbuh) reassuring Abu Bakr (RA), \"Do not grieve; indeed Allah is with us\" (Qur'an 9:40). A popular story that a spider's web and a bird's nest at the entrance made the pursuers assume no one had gone in is widely told in popular retellings of the Hijrah, but it is not found in Sahih al-Bukhari or Sahih Muslim and has been judged by hadith specialists, including al-Albani, to have no authentic chain of narration — so it is best avoided as a factual claim in an exam answer, even though it may be mentioned as popular tradition if clearly labelled as such.",
      "During the three days spent in the cave, Abu Bakr's son Abdullah would visit at night to report what was being said in Makkah, while his daughter Asma brought food, and a shepherd employed by the family, Amir ibn Fuhayrah, brought milk and used his flock to cover their tracks.",
      "Once the search had died down, the two set out on the less obvious coastal route towards Madinah, guided by a hired non-Muslim guide, Abdullah ibn Uraiqit, who knew the desert paths well.",
      "The journey ended with a joyful reception, first at Quba on the outskirts, where a mosque was built, and then in Madinah itself, where the people had been waiting daily to welcome him.",
    ],
    markingPoints: [
      { point: "Context: plot against the Prophet's (pbuh) life prompting departure", marksAvailable: 1 },
      { point: "Departure detail: Ali (RA) as decoy / leaving with Abu Bakr (RA)", marksAvailable: 2 },
      { point: "Cave Thawr episode with specific detail (pursuers, concealment signs, three days)", marksAvailable: 2 },
      { point: "Supporting roles: Asma, Abdullah ibn Abi Bakr, Amir ibn Fuhayrah", marksAvailable: 2 },
      { point: "Journey detail: guide, coastal route", marksAvailable: 1 },
      { point: "Arrival: Quba and Madinah welcome", marksAvailable: 2 },
    ],
    strengths: [
      "Names specific individuals and their specific contributions rather than saying 'his companions helped him'.",
      "Follows clean chronological order, which examiner reports consistently reward for this style of question.",
    ],
    improvements: [
      "The spider's-web/dove detail is a well-known tradition but its precise Hadith sourcing should be verified before being stated as fact in a real answer — flagged here rather than invented.",
      "Could add specific timing details (e.g. approximate number of nights in the cave, date of departure) if confidently verified.",
    ],
    selfAssessment: [
      "Did I name at least three specific individuals with their specific roles?",
      "Is my account in clear chronological order from Makkah to Madinah?",
      "Did I flag any detail I was not fully certain of, rather than guessing a fact?",
    ],
  },
  {
    id: "ma-2021-jj-p11-q3b",
    questionId: "2021-jj-p11-q3b",
    marks: 4,
    ao: "AO2",
    paper: 1,
    plan: [
      "Identify the specific loyal actions from the Hijrah story that model good friendship.",
      "Draw out the general principle each teaches.",
      "Apply the principle to a modern example of friendship.",
    ],
    sampleAnswer: [
      "The willingness of Ali (RA) to risk his own safety by sleeping in the Prophet's (pbuh) bed shows that real friendship sometimes requires personal sacrifice for someone else's safety, not just convenient support.",
      "Abu Bakr's decision to accompany the Prophet (pbuh) in person, rather than simply helping from a distance, teaches that loyalty is shown through presence and shared risk, not only words of support.",
      "The discreet, reliable help given by Asma and Abdullah — passing on information carefully and not revealing it to outsiders — teaches Muslims that a good friend keeps secrets and does not gossip about a friend's private affairs.",
      "Applying this today, a Muslim might show the same qualities by standing by a friend during a difficult or unpopular situation, keeping their private struggles confidential, and being willing to help even when it is inconvenient.",
    ],
    markingPoints: [
      { point: "Draws a general principle from at least two specific Hijrah actions", marksAvailable: 2 },
      { point: "Explains the principle in the candidate's own words (not just restating the story)", marksAvailable: 1 },
      { point: "Applies the principle to a modern/practical example of friendship", marksAvailable: 1 },
    ],
    strengths: [
      "Turns narrative detail into a clear, generalised moral lesson rather than just retelling the story again.",
    ],
    improvements: [
      "Could briefly acknowledge a limit — e.g. not every friendship requires physical risk — to show more nuanced AO2 thinking.",
    ],
    selfAssessment: [
      "Did I explain a lesson/principle, not just repeat the Hijrah story?",
      "Did I give a present-day application of the lesson?",
    ],
  },
  {
    id: "ma-2023-jj-p22-q2a",
    questionId: "2023-jj-p22-q2a",
    marks: 10,
    ao: "AO1",
    paper: 2,
    plan: [
      "Define isnad as the chain of narrators and matn as the actual text/content of the Hadith.",
      "Explain why both parts exist together in a recorded Hadith.",
      "Describe the criteria scholars used to judge narrators: reliability (thiqah), memory, moral character, and unbroken chain.",
      "Describe how a broken or weak link downgraded a Hadith's classification.",
      "Mention the resulting categories (sahih, hasan, da'if) as the outcome of this checking process.",
    ],
    sampleAnswer: [
      "A Hadith is made up of two parts: the isnad, which is the chain of narrators listing everyone who passed the report down from the Prophet (pbuh) to the person recording it, and the matn, which is the actual wording or content of what the Prophet (pbuh) said or did.",
      "Scholars treated the isnad as essential evidence, not just a formality, because without knowing exactly who reported a statement and from whom, there would be no way to judge whether the report could be trusted.",
      "To assess a chain, scholars examined each narrator individually, checking whether that person was known for honesty and strong memory, whether they had actually met the person they claimed to be narrating from, and whether their reporting was consistent across different occasions.",
      "If even one narrator in the chain was found to be unreliable, forgetful, or if a link between two narrators could not be confirmed (a broken chain), the whole Hadith's reliability was reduced, however sound its content seemed.",
      "Based on this checking process, Hadiths were classified into grades such as sahih (authentic, with a complete and trustworthy chain), hasan (good, generally reliable but slightly weaker), and da'if (weak, where doubts remained about the chain or narrators).",
    ],
    markingPoints: [
      { point: "Correct definition of isnad", marksAvailable: 2 },
      { point: "Correct definition of matn", marksAvailable: 2 },
      { point: "Explains criteria used to judge narrators (honesty, memory, continuity)", marksAvailable: 3 },
      { point: "Explains effect of a weak/broken link on classification", marksAvailable: 2 },
      { point: "Names resulting grades (sahih/hasan/da'if)", marksAvailable: 1 },
    ],
    strengths: [
      "Clearly separates definition from explanation of process, which suits the two-part demand of the question.",
      "Explains consequence (what happens if a narrator fails the test) rather than only listing criteria.",
    ],
    improvements: [
      "Could add a specific named example of an authentication scholar (e.g. from the science of Hadith) if the fact is verified, to lift the answer from generic to precisely supported.",
    ],
    selfAssessment: [
      "Did I define both isnad and matn accurately and separately?",
      "Did I explain at least two criteria used to judge a narrator?",
      "Did I explain what happens to classification when a chain is weak?",
    ],
  },
  {
    id: "ma-2023-jj-p22-q2b",
    questionId: "2023-jj-p22-q2b",
    marks: 4,
    ao: "AO2",
    paper: 2,
    plan: [
      "State the underlying stake: Hadith guide practice and law, so errors have real consequences.",
      "Give reason 1: guarding against fabrication for political/sectarian gain.",
      "Give reason 2: protecting correct religious practice from being built on false information.",
      "Close with a brief evaluative comment on why this mattered more for Hadith than ordinary historical reports.",
    ],
    sampleAnswer: [
      "Checking a Hadith's reliability mattered because Hadiths were used to explain the Qur'an and guide how Muslims worship and behave, so an inaccurate report could lead an entire community to practise something the Prophet (pbuh) never actually said or did.",
      "There was also a real risk of fabrication, since at times individuals invented sayings to support particular political or sectarian positions, so a careful chain-check was the main tool available to filter out these false additions.",
      "Because Hadith carried this much religious weight, scholars treated verification far more rigorously than they would an ordinary historical anecdote, since a mistake here could shape law and worship for generations rather than just recording an isolated event.",
    ],
    markingPoints: [
      { point: "Identifies the practical/legal consequences of an unreliable Hadith", marksAvailable: 2 },
      { point: "Identifies risk of deliberate fabrication as a motivating reason", marksAvailable: 1 },
      { point: "Evaluative comment on why this scrutiny was distinctively important for Hadith", marksAvailable: 1 },
    ],
    strengths: ["Connects the abstract process (isnad-checking) to concrete stakes (worship, law, fabrication)."],
    improvements: ["Could include a brief real example of a known fabricated Hadith category to strengthen AO1 support within the AO2 answer."],
    selfAssessment: [
      "Did I explain a real consequence of getting authentication wrong?",
      "Did I mention the risk of deliberate fabrication?",
    ],
  },
  {
    id: "ma-2023-jj-p21-q3a",
    questionId: "2023-jj-p21-q3a",
    marks: 10,
    ao: "AO1",
    paper: 2,
    plan: [
      "Frame Umar's (RA) caliphate as one of major territorial and administrative expansion.",
      "Cover military/territorial achievements: expansion into Persian and Byzantine territories.",
      "Cover administrative innovations: the diwan (register for stipends), Hijri calendar, provincial governors.",
      "Cover judicial/social reforms: introduction of formal court system, welfare measures.",
      "Close with his reputation for personal accountability and simple living alongside these achievements.",
    ],
    sampleAnswer: [
      "Umar ibn al-Khattab (RA) ruled during a period of rapid expansion, in which Muslim forces gained control of large parts of the Persian and Byzantine empires, including significant cities in the region.",
      "To manage this much larger state, Umar (RA) introduced the diwan, a register used to organise and distribute stipends fairly among soldiers and citizens according to need and service.",
      "He is also credited with establishing the Hijri calendar, based on the year of the migration to Madinah, giving the growing Muslim administration a consistent dating system for records and governance.",
      "Administratively, he appointed governors to the newly conquered provinces and required regular reporting from them, and he is remembered for holding officials to strict standards of honesty, removing those who abused their position.",
      "Alongside these achievements, Umar (RA) remained known for a simple personal lifestyle and for making himself directly accessible to ordinary people with complaints, which reinforced trust in the new administrative structures he built.",
    ],
    markingPoints: [
      { point: "Territorial/military expansion achievements named", marksAvailable: 2 },
      { point: "Diwan / stipend administration explained", marksAvailable: 2 },
      { point: "Hijri calendar introduction", marksAvailable: 2 },
      { point: "Provincial governance / accountability of officials", marksAvailable: 2 },
      { point: "Personal character linked to administrative trust", marksAvailable: 2 },
    ],
    strengths: ["Balances military, administrative and personal-character achievements rather than listing battles only."],
    improvements: ["Named cities/dates should be added only once verified — this answer intentionally stays general where a precise date was not confirmed."],
    selfAssessment: [
      "Did I cover more than one type of achievement (military AND administrative)?",
      "Did I mention at least one specific administrative institution (e.g. diwan)?",
    ],
  },
  {
    id: "ma-2023-jj-p21-q3b",
    questionId: "2023-jj-p21-q3b",
    marks: 4,
    ao: "AO2",
    paper: 2,
    plan: [
      "Pick one quality (personal accountability/accessibility) and justify why it is most needed today.",
      "Give a modern-context reason.",
      "Briefly acknowledge an alternative quality before defending the chosen one.",
    ],
    sampleAnswer: [
      "In my view, the quality of holding officials personally accountable is the one most needed in leaders today, because modern institutions are large and it is easy for individual misconduct to go unchecked without a leader willing to intervene directly.",
      "A leader who, like Umar (RA), is willing to remove or question someone in power regardless of their status sets a visible standard that discourages corruption throughout an organisation, not just at the top.",
      "Someone might instead argue that his simple lifestyle is the more important quality, since it builds public trust, but I think trust without active accountability can still allow abuse to continue unnoticed, so accountability has the more direct practical effect.",
    ],
    markingPoints: [
      { point: "Clear choice of quality with justification", marksAvailable: 2 },
      { point: "Modern relevance explained", marksAvailable: 1 },
      { point: "Evaluative comparison with an alternative quality", marksAvailable: 1 },
    ],
    strengths: ["Explicitly weighs one quality against another rather than only praising the chosen one."],
    improvements: ["Could add a real-world (non-invented) contemporary example to ground the argument further."],
    selfAssessment: ["Did I justify my choice with a clear reason rather than just asserting it?", "Did I compare against at least one alternative?"],
  },
  {
    id: "ma-2024-jj-p21-q4a",
    questionId: "2024-jj-p21-q4a",
    marks: 10,
    ao: "AO1",
    paper: 2,
    plan: [
      "State the core belief: angels are beings of light created to obey Allah completely, without free will to disobey.",
      "Describe named angels and their specific roles: Jibril (revelation), Mika'il (sustenance/rain), Israfil (the trumpet), Izra'il (taking souls).",
      "Describe the recording angels (Kiraman Katibin) who note good and bad deeds.",
      "Describe guardian/protective angels and angels present at death and in the grave.",
      "Summarise: angels are unseen but constantly active in carrying out Allah's commands.",
    ],
    sampleAnswer: [
      "Muslims believe angels are beings created by Allah from light, who have no free will and therefore never disobey any command given to them, unlike humans and jinn.",
      "Certain angels are given specific, named responsibilities: Jibril is responsible for delivering revelation to the prophets, Mika'il is associated with sustenance and the delivery of rain, Israfil will sound the trumpet to signal the Day of Judgement, and Izra'il is tasked with taking the souls of the dying.",
      "Two further angels, often called Kiraman Katibin, are believed to accompany every person throughout life, one recording good deeds and the other recording wrong deeds, forming the basis of the record that will be reviewed on the Day of Judgement.",
      "Muslims also believe in angels who question a person in the grave about their faith and deeds, as well as protective angels who accompany and safeguard individuals during their life.",
      "Overall, angels are understood as constantly active, obedient servants of Allah who are not seen by humans but who are involved in almost every stage of a person's existence, from birth to the afterlife.",
    ],
    markingPoints: [
      { point: "Core nature of angels (created from light, no free will)", marksAvailable: 2 },
      { point: "Named angels with correct specific roles (at least three)", marksAvailable: 4 },
      { point: "Recording angels (deeds)", marksAvailable: 2 },
      { point: "Grave-questioning/guardian angels", marksAvailable: 2 },
    ],
    strengths: ["Groups angels by function rather than a random list, which makes the answer easier to mark and read."],
    improvements: ["Could name the questioning angels explicitly as Munkar and Nakir (named in Jami' at-Tirmidhi 1071, graded hasan) to show precise knowledge rather than describing them only generally."],
    selfAssessment: ["Did I name at least three angels with correct, specific roles?", "Did I mention the recording of deeds and the questioning in the grave?"],
  },
  {
    id: "ma-2024-on-p22-q5a",
    questionId: "2024-on-p22-q5a",
    marks: 10,
    ao: "AO1",
    paper: 2,
    plan: [
      "State the basic obligation: Zakah is due annually on wealth above a minimum threshold (nisab) held for a full lunar year.",
      "Explain the standard rate applied to savings/tradeable wealth.",
      "List the categories of eligible recipients drawn from the Qur'anic description.",
      "Note who is exempt (e.g. below nisab, in debt beyond their means).",
      "Close by linking the conditions to the underlying purpose of fair redistribution.",
    ],
    sampleAnswer: [
      "Zakah becomes obligatory on a Muslim who owns wealth at or above a minimum threshold, known as the nisab, and who has held that wealth for a complete lunar year without it falling below the threshold in between.",
      "On qualifying savings and tradeable wealth, the standard proportion due is two and a half percent, calculated on the total amount held once the year has passed, though different rates apply to categories such as agricultural produce or livestock.",
      "The Qur'an identifies specific categories of people entitled to receive Zakah, including the poor, the needy, those in debt, travellers in difficulty, new converts to Islam who need support, and those working to collect and administer the Zakah itself.",
      "A person whose wealth stays below the nisab throughout the year, or whose debts exceed their disposable wealth, is not obligated to pay, since Zakah is designed to be paid from surplus wealth rather than from what is needed for basic living.",
      "These conditions together reflect the underlying purpose of Zakah: to ensure that a fixed, predictable share of the wealth of those who can afford it circulates back to those in genuine need, rather than being left to voluntary generosity alone.",
    ],
    markingPoints: [
      { point: "Nisab threshold and full-year holding condition", marksAvailable: 2 },
      { point: "Standard rate explained (2.5% on qualifying wealth)", marksAvailable: 2 },
      { point: "At least three recipient categories named", marksAvailable: 3 },
      { point: "Exemption condition explained (below nisab / debt)", marksAvailable: 2 },
      { point: "Link back to underlying purpose", marksAvailable: 1 },
    ],
    strengths: ["Answer covers both the giving side (conditions/rate) and the receiving side (categories), matching the two-part demand of the question."],
    improvements: ["Rates for categories like livestock/agricultural produce should only be added with verified figures rather than approximated."],
    selfAssessment: ["Did I explain the nisab and time conditions clearly?", "Did I list at least three recipient categories?"],
  },
];

export function getModelAnswer(questionId: string): ModelAnswer | undefined {
  return modelAnswers.find((a) => a.questionId === questionId);
}
