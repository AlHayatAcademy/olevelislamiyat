export type NavLink = { label: string; href: string };

export const siteConfig = {
  domain: "https://olevelislamiyat.drimranhayat.com",
  siteName: "O Level Islamiyat",
  tagline: "Comprehensive Islamic Education Resource",
  institution: {
    name: "Al Hayat Academy",
    legalName: "Al Hayat Academy Pvt. Ltd.",
    founder: "Yasir Hayat",
    educationDivision: "Al-Hayat Education Division",
    location: "Online",
  },
  founderBio: "Educator and founder dedicated to providing comprehensive Islamic education resources for Cambridge O Level and IGCSE Islamiyat students.",
  qualifications: {
    oLevel: {
      name: "Cambridge O Level Islamiyat",
      code: "2058",
    },
    igcse: {
      name: "Cambridge IGCSE Islamiyat",
      code: "0493",
    },
  },
  cambridgeDisclaimer: "This resource is not endorsed by Cambridge Assessment International Education.",
  contact: {
    email: "info@alhayatacademy.com",
    phone: "",
    whatsapp: "https://wa.me/YOUR_PHONE_NUMBER",
  },
  links: {
    youtube: "https://youtube.com/@alhayatacademy",
    personalSite: "https://drimranhayat.com",
    instituteSite: "https://alhayatacademy.com",
    academyPage: "https://alhayatacademy.com",
  },
  socialLinks: [
    { label: "Twitter", href: "https://twitter.com/alhayatacademy" },
    { label: "LinkedIn", href: "https://linkedin.com/company/alhayatacademy" },
    { label: "YouTube", href: "https://youtube.com/@alhayatacademy" },
  ] satisfies NavLink[],
  footerLegalLinks: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Disclaimer", href: "/disclaimer" },
  ] satisfies NavLink[],
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