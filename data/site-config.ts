// Central institutional configuration.
// All institutional facts, links, and copy fragments used across the site
// should be sourced from here — never hardcode them in components/pages.

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon?: string;
}

export const siteConfig = {
  siteName: "O Level Islamiyat",
  tagline: "Understand Islam. Master the Syllabus. Excel in the Examination.",
  domain: "https://olevelislamiyat.drimranhayat.com",

  qualifications: {
    oLevel: { code: "2058", name: "Cambridge O Level Islamiyat" },
    igcse: { code: "0493", name: "Cambridge IGCSE Islamiyat" },
  },

  institution: {
    name: "Al-Hayat Research Institute of Social Sciences",
    legalName: "Al-Hayat Research Institute of Social Sciences (SMC-Private) Limited",
    educationDivision: "Al-Hayat Academy",
    founder: "Dr Imran Hayat",
    location: "Lahore, Pakistan",
  },

  contact: {
    email: "drimranhayatmalik@gmail.com",
    phone: "+923354910481",
    whatsapp: "https://wa.me/923354910481",
  },

  links: {
    youtube: "https://www.youtube.com/@dr.imranhayatmalik9384",
    personalSite: "https://drimranhayat.com",
    instituteSite: "https://institute.drimranhayat.com",
    academyPage: "https://drimranhayat.com/ecosystem/academy",
  },

  founderBio:
    "Dr Imran Hayat is a university lecturer, researcher, educator, journal editor and academic consultant specialising in Islamic Studies, Islamic jurisprudence, Quranic studies, interfaith relations, research development, curriculum design and examination-oriented Islamiyat education. He is the founder of Al-Hayat Research Institute of Social Sciences and leads educational and scholarly initiatives within the Al-Hayat academic ecosystem.",

  cambridgeDisclaimer:
    "O Level Islamiyat is an independent educational platform. It is not affiliated with or endorsed by Cambridge International Education.",

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
    { label: "Dashboard", href: "/dashboard" },
    { label: "Notes", href: "/notes" },
    { label: "Resources", href: "/resources" },
    { label: "Online Classes", href: "/online-classes" },
    { label: "Teacher Resources", href: "/teacher-resources" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavLink[],

  footerLegalLinks: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
    { label: "Copyright Policy", href: "/copyright" },
    { label: "Disclaimer", href: "/disclaimer" },
    { label: "Cambridge Disclaimer", href: "/cambridge-disclaimer" },
    { label: "Accessibility", href: "/accessibility" },
  ] satisfies NavLink[],

  socialLinks: [
    { label: "YouTube", href: "https://www.youtube.com/@dr.imranhayatmalik9384" },
    // Add further social links here; empty/unset ones should be filtered by
    // consuming components using `socialLinks.filter(Boolean)` semantics.
  ] satisfies SocialLink[],
};

export type SiteConfig = typeof siteConfig;
