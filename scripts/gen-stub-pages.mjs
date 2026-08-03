// One-off script used during Milestone 1 scaffold to generate lightweight
// but real route stub pages. Safe to re-run; it overwrites the listed files.
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const pages = [
  {
    route: "syllabus",
    title: "Syllabus",
    description:
      "Full breakdown of the Cambridge O Level Islamiyat (2058) and IGCSE Islamiyat (0493) syllabus content.",
    body: `<p>Both papers are answered in English. Each paper is 1½ hours long and worth 50 marks, with five questions of which candidates must answer Question 1, Question 2 and two others.</p>
<h2 className="text-xl font-heading font-bold mt-6">Paper 1</h2>
<ol className="list-decimal list-inside space-y-1">
  <li>Major themes of the Qur&apos;an</li>
  <li>The history and importance of the Qur&apos;an</li>
  <li>The life and importance of the Prophet Muhammad (pbuh)</li>
  <li>The first Islamic community</li>
</ol>
<h2 className="text-xl font-heading font-bold mt-6">Paper 2</h2>
<ol className="list-decimal list-inside space-y-1">
  <li>Major teachings in the Hadiths of the Prophet</li>
  <li>The history and importance of the Hadiths</li>
  <li>The period of rule of the Rightly Guided Caliphs and their importance as leaders</li>
  <li>The Articles of Faith and the Pillars of Islam</li>
</ol>
<p className="text-sm text-text-muted mt-6">[Detailed topic-by-topic content pending full source verification — see docs/syllabus-coverage-audit.md]</p>`,
  },
  {
    route: "exam-pattern",
    title: "Exam Pattern",
    description: "How Cambridge O Level Islamiyat 2058 / IGCSE 0493 is assessed.",
    body: `<ul className="list-disc list-inside space-y-1">
  <li>Two written papers, both required for a grade; answered in English</li>
  <li>Paper 1 and Paper 2: 1½ hours each, 50 marks each</li>
  <li>Each paper has five questions; candidates answer Question 1, Question 2, and two others</li>
  <li>AO1 (Recall, select and present relevant facts): 68% weighting</li>
  <li>AO2 (Understanding of significance in Islam and Muslim lives): 32% weighting</li>
</ul>
<p className="text-sm text-text-muted mt-6">[Full levels-of-response mark grids pending publication — see docs/syllabus-coverage-audit.md]</p>`,
  },
  {
    route: "paper-1",
    title: "Paper 1",
    description:
      "Major themes of the Qur&apos;an, its history, the life of the Prophet Muhammad (pbuh), and the first Islamic community.",
    body: `<ol className="list-decimal list-inside space-y-1">
  <li>Major themes of the Qur&apos;an</li>
  <li>The history and importance of the Qur&apos;an</li>
  <li>The life and importance of the Prophet Muhammad (pbuh)</li>
  <li>The first Islamic community</li>
</ol>
<p className="text-sm text-text-muted mt-6">[Full topic content pending — draft source available, see docs/syllabus-coverage-audit.md]</p>`,
  },
  {
    route: "paper-2",
    title: "Paper 2",
    description:
      "Hadith teachings, their history, the Rightly Guided Caliphs, and the Articles of Faith & Pillars of Islam.",
    body: `<ol className="list-decimal list-inside space-y-1">
  <li>Major teachings in the Hadiths of the Prophet</li>
  <li>The history and importance of the Hadiths</li>
  <li>The period of rule of the Rightly Guided Caliphs and their importance as leaders</li>
  <li>The Articles of Faith and the Pillars of Islam</li>
</ol>
<p className="text-sm text-text-muted mt-6">[Content pending — see docs/source-conflicts.md for an unresolved copyright question affecting this paper&apos;s source material]</p>`,
  },
  {
    route: "past-papers",
    title: "Past Papers",
    description:
      "Cambridge O Level Islamiyat 2058 past exam sessions, organised by paper and topic.",
    body: `<p>Sessions on file: May/June and Oct/Nov, 2021–2025 (10 sessions, 40 question papers, 40 mark schemes).</p>
<p className="text-sm text-text-muted mt-3">In line with copyright policy, original question paper and mark scheme PDFs are not rehosted here. Topic-tagged question indexes are in progress — see docs/past-paper-coverage-audit.md.</p>`,
  },
  {
    route: "model-answers",
    title: "Model Answers",
    description: "Answer-structure guidance aligned with AO1/AO2 mark schemes.",
    body: `<p className="text-sm text-text-muted">[Model answer guidance pending — will be derived from official mark schemes and examiner reports without reproducing them verbatim]</p>`,
  },
  {
    route: "quotes-references",
    title: "Quotes & References",
    description: "Qur&apos;an and Hadith references relevant to each syllabus topic.",
    body: `<p>Appendix 1 of the syllabus lists 15 Qur&apos;an passages for special study (Allah in Himself, Allah's relationship with the created world, Allah's Messengers). Appendix 2 lists Hadiths for special study on individual conduct and community life.</p>
<p className="text-sm text-text-muted mt-6">[Full reference library pending — see docs/syllabus-coverage-audit.md]</p>`,
  },
  {
    route: "revision",
    title: "Revision",
    description: "Revision resources organised by paper and topic.",
    body: `<p className="text-sm text-text-muted">[Revision content pending — will draw on hand-made revision notes in source/09-notes once processed]</p>`,
  },
  {
    route: "quizzes",
    title: "Quizzes",
    description: "Self-check quizzes to test recall and understanding.",
    body: `<p className="text-sm text-text-muted">[Quizzes pending development]</p>`,
  },
  {
    route: "notes",
    title: "Notes",
    description: "Hand-made revision notes for Paper 1 and Paper 2 topics.",
    body: `<p className="text-sm text-text-muted">[Notes pending — 46 source images available for Paper 1 and Paper 2, to be processed and published]</p>`,
  },
  {
    route: "resources",
    title: "Resources",
    description: "Additional study resources for O Level Islamiyat.",
    body: `<p className="text-sm text-text-muted">[Resources section pending]</p>`,
  },
  {
    route: "online-classes",
    title: "Online Classes",
    description: "Online classes and academic support through Al-Hayat Academy.",
    body: `<p className="text-sm text-text-muted">[Online classes information pending]</p>`,
  },
  {
    route: "about",
    title: "About",
    description: "About O Level Islamiyat and Al-Hayat Academy.",
    body: `<p>O Level Islamiyat is an education initiative of Al-Hayat Academy, the education division of Al-Hayat Research Institute of Social Sciences.</p>`,
  },
  {
    route: "about/institute",
    title: "About the Institute",
    description: "About Al-Hayat Research Institute of Social Sciences.",
    body: `<p>Al-Hayat Research Institute of Social Sciences (SMC-Private) Limited is based in Lahore, Pakistan, and leads educational and scholarly initiatives within the Al-Hayat academic ecosystem, including Al-Hayat Academy.</p>`,
  },
  {
    route: "about/founder",
    title: "About the Founder",
    description: "About Dr Imran Hayat, founder of Al-Hayat Research Institute of Social Sciences.",
    body: `<p>{siteConfig.founderBio}</p>`,
    extraImport: `import { siteConfig } from "@/data/site-config";`,
  },
  {
    route: "contact",
    title: "Contact",
    description: "Get in touch with O Level Islamiyat.",
    body: `<ul className="space-y-2">
  <li>Email: <a className="text-primary underline" href={\`mailto:\${siteConfig.contact.email}\`}>{siteConfig.contact.email}</a></li>
  <li>WhatsApp: <a className="text-primary underline" href={siteConfig.contact.whatsapp} target="_blank" rel="noopener noreferrer">{siteConfig.contact.phone}</a></li>
  <li>Location: {siteConfig.institution.location}</li>
</ul>`,
    extraImport: `import { siteConfig } from "@/data/site-config";`,
  },
  {
    route: "privacy",
    title: "Privacy Policy",
    description: "How O Level Islamiyat handles personal data.",
    body: `<p className="text-sm text-text-muted">[Privacy policy content pending legal review]</p>`,
  },
  {
    route: "terms",
    title: "Terms of Use",
    description: "Terms governing use of the O Level Islamiyat website.",
    body: `<p className="text-sm text-text-muted">[Terms of use content pending legal review]</p>`,
  },
  {
    route: "copyright",
    title: "Copyright Policy",
    description: "Copyright policy for O Level Islamiyat content.",
    body: `<p>Original Cambridge syllabus, past paper and mark scheme documents remain the copyright of Cambridge University Press &amp; Assessment and are not reproduced or rehosted on this site. Site-authored explanatory content is the property of {siteConfig.institution.legalName} unless otherwise credited.</p>`,
    extraImport: `import { siteConfig } from "@/data/site-config";`,
  },
  {
    route: "disclaimer",
    title: "Disclaimer",
    description: "General disclaimer for O Level Islamiyat.",
    body: `<p className="text-sm text-text-muted">[General disclaimer content pending legal review]</p>`,
  },
  {
    route: "cambridge-disclaimer",
    title: "Cambridge Disclaimer",
    description: "Independence disclaimer regarding Cambridge International Education.",
    body: `<p className="text-lg">{siteConfig.cambridgeDisclaimer}</p>`,
    extraImport: `import { siteConfig } from "@/data/site-config";`,
  },
  {
    route: "accessibility",
    title: "Accessibility",
    description: "Accessibility commitment for O Level Islamiyat.",
    body: `<p className="text-sm text-text-muted">[Accessibility statement pending]</p>`,
  },
];

for (const p of pages) {
  const componentName =
    p.route
      .split("/")
      .pop()
      .split("-")
      .map((s) => s[0].toUpperCase() + s.slice(1))
      .join("") + "Page";

  const file = `app/${p.route}/page.tsx`;
  const content = `import { PageShell } from "@/components/PageShell";
${p.extraImport ?? ""}

export const metadata = {
  title: "${p.title}",
  description: "${p.description}",
};

export default function ${componentName}() {
  return (
    <PageShell title="${p.title}" description="${p.description}">
      ${p.body}
    </PageShell>
  );
}
`;
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
  console.log("wrote", file);
}
