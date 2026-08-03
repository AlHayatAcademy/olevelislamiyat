import {
  BookMarked,
  FileStack,
  ListChecks,
  MessageSquareQuote,
  NotebookPen,
  Puzzle,
  TrendingUp,
} from "lucide-react";

export const features = [
  {
    icon: BookMarked,
    title: "Syllabus Aligned",
    description: "Every page maps directly to the official Cambridge 2058 / 0493 syllabus content.",
  },
  {
    icon: FileStack,
    title: "Past Papers",
    description: "Structured access to past exam sessions, organised by paper and topic.",
  },
  {
    icon: ListChecks,
    title: "Topical Questions",
    description: "Practice questions grouped by syllabus topic, not just by session.",
  },
  {
    icon: NotebookPen,
    title: "Model Answers",
    description: "Guidance on answer structure aligned with AO1/AO2 mark schemes.",
  },
  {
    icon: MessageSquareQuote,
    title: "Quotes & References",
    description: "Qur'an and Hadith references relevant to each syllabus topic.",
  },
  {
    icon: Puzzle,
    title: "Quizzes",
    description: "Self-check quizzes to test recall and understanding as you study.",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Track which topics you have covered as you work through each paper.",
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
];
