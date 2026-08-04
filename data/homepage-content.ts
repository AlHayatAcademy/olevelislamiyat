import {
  BookMarked,
  FileStack,
  ListChecks,
  MessageSquareQuote,
  NotebookPen,
  Puzzle,
  TrendingUp,
  Layers,
  Award,
  Target,
} from "lucide-react";
import { paper1Sections, paper2Sections } from "@/data/syllabus";
import { allTopics } from "@/data/topics";
import { quizzes } from "@/data/quizzes";

export type TileAccent = "green" | "gold" | "purple" | "blue" | "teal";

export const features: { icon: typeof BookMarked; title: string; description: string; accent: TileAccent }[] = [
  {
    icon: BookMarked,
    title: "Syllabus Aligned",
    description: "Every page maps directly to the official Cambridge 2058 / 0493 syllabus content.",
    accent: "green",
  },
  {
    icon: FileStack,
    title: "Past Papers",
    description: "Structured access to past exam sessions, organised by paper and topic.",
    accent: "gold",
  },
  {
    icon: ListChecks,
    title: "Topical Questions",
    description: "Practice questions grouped by syllabus topic, not just by session.",
    accent: "purple",
  },
  {
    icon: NotebookPen,
    title: "Model Answers",
    description: "Guidance on answer structure aligned with AO1/AO2 mark schemes.",
    accent: "blue",
  },
  {
    icon: MessageSquareQuote,
    title: "Quotes & References",
    description: "Qur'an and Hadith references relevant to each syllabus topic.",
    accent: "teal",
  },
  {
    icon: Puzzle,
    title: "Quizzes",
    description: "Self-check quizzes to test recall and understanding as you study.",
    accent: "green",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Track which topics you have covered as you work through each paper.",
    accent: "gold",
  },
];

export const examPatternSummary = {
  paper1: {
    title: "Paper 1",
    duration: "1½ hours",
    marks: 50,
    sections: [
      "Major themes of the Qur'an (8 marks)",
      "History and importance of the Qur'an (14 marks)",
      "Life and importance of the Prophet Muhammad (pbuh) (14 marks)",
      "The first Islamic community (14 marks)",
    ],
  },
  paper2: {
    title: "Paper 2",
    duration: "1½ hours",
    marks: 50,
    sections: [
      "Major teachings in the Hadiths of the Prophet (8 marks)",
      "History and importance of the Hadiths (14 marks)",
      "The Rightly Guided Caliphs and their importance as leaders (14 marks)",
      "The Articles of Faith and the Pillars of Islam (14 marks)",
    ],
  },
  aos: [
    { code: "AO1", label: "Recall, select and present relevant facts", weight: "68%" },
    {
      code: "AO2",
      label: "Understanding of significance in Islam and Muslim lives",
      weight: "32%",
    },
  ],
};

// Every count below is computed directly from the real data arrays, never
// invented — no fabricated statistics per the site's content policy.
const sectionCount = paper1Sections.length + paper2Sections.length;

export const trustBadges = [
  {
    icon: BookMarked,
    label: `All ${sectionCount} Official Syllabus Sections Covered`,
  },
  {
    icon: Layers,
    label: `${allTopics.length} Structured Lessons`,
  },
  {
    icon: Target,
    label: `${quizzes.length} Interactive Quizzes`,
  },
  {
    icon: Award,
    label: "Aligned to 2058 & 0493",
  },
  {
    icon: TrendingUp,
    label: "Founder-Reviewed Content",
  },
];

export const faqs = [
  {
    question: "Is this site affiliated with Cambridge International?",
    answer:
      "No. O Level Islamiyat is an independent educational platform. It is not affiliated with or endorsed by Cambridge International Education.",
  },
  {
    question: "Which syllabuses does this site cover?",
    answer:
      "Cambridge O Level Islamiyat (2058) and Cambridge IGCSE Islamiyat (0493), which share a closely related syllabus structure.",
  },
  {
    question: "Where does the content come from?",
    answer:
      "Content is developed from the official Cambridge syllabus documents and original teaching material prepared for this platform. Where source verification is still in progress, pages are clearly labelled as pending.",
  },
  {
    question: "Can I access past papers here?",
    answer:
      "The Past Papers section indexes official exam sessions by paper and topic. In line with copyright policy, full past paper and mark scheme PDFs are not rehosted here — please refer to official Cambridge channels for original documents.",
  },
  {
    question: "What is the difference between O Level Islamiyat 2058 and IGCSE Islamiyat 0493?",
    answer:
      "Both are separate Cambridge syllabus codes covering closely related Islamiyat content — O Level 2058 and IGCSE 0493. Check the Syllabus and Exam Pattern pages for the specific paper structure of each.",
  },
  {
    question: "How many questions do I have to answer in each paper?",
    answer:
      "Each paper (Paper 1 and Paper 2) has five questions; candidates must answer Question 1, Question 2, and two others from the remaining three. See the Exam Pattern page for full detail.",
  },
];
