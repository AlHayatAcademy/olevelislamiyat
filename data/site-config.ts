export type NavLink = { label: string; href: string };

export const siteConfig = {
  domain: "olevelislamiyat.drimranhayat.com",
  primaryNav: [
    { label: "Syllabus", href: "/syllabus" },
    { label: "Exam Pattern", href: "/exam-pattern" },
    { label: "Paper 1", href: "/paper-1" },
    { label: "Paper 2", href: "/paper-2" },
    { label: "Past Papers", href: "/past-papers" },
    { label: "Model Answers", href: "/model-answers" },
    { label: "Quotes & References", href: "/quotes-references" },
    { label: "Revision", href: "/revision" },
    { label: "Quizzes", href: "/quizzes" },
    { label: "Analytics", href: "/analytics" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Notes", href: "/notes" },
    { label: "Resources", href: "/resources" },
    { label: "Online Classes", href: "/online-classes" },
    { label: "Teacher Resources", href: "/teacher-resources" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavLink[],
} as const;