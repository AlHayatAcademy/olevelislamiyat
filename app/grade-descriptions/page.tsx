import Link from "next/link";
import { Award } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { canonical } from "@/lib/seo";

export const metadata = {
  title: "Grade Descriptions: What A, C and F Answers Look Like",
  description:
    "What separates a Grade A, Grade C and Grade F answer in Cambridge O Level Islamiyat 2058 / IGCSE Islamiyat 0493 — knowledge, understanding, and personal-opinion skills explained.",
  ...canonical("/grade-descriptions"),
};

interface Dimension {
  heading: string;
  intro: string;
  a: string[];
  c: string[];
  f: string[];
}

const dimensions: Dimension[] = [
  {
    heading: "1. Knowledge and organisation of syllabus content",
    intro:
      "This is the AO1 dimension — how much accurate, specific factual material a candidate can recall and how well it is organised on the page.",
    a: [
      "Draws on a wide, accurate range of syllabus content — names, dates, references and sequences of events are correct and specific, not vague.",
      "Selects only the material that actually answers the question, rather than writing everything remembered on the topic.",
      "Structures the answer clearly, usually with a logical order (chronological, thematic, or point-by-point) that is easy for an examiner to follow and credit.",
    ],
    c: [
      "Shows solid but incomplete knowledge — some relevant facts are present and mostly accurate, but coverage has gaps or a few points are missing.",
      "Includes some material that is only loosely related to the question, alongside the relevant content.",
      "Organisation is reasonable but not tight — points may appear slightly out of order or some repetition creeps in.",
    ],
    f: [
      "Knowledge is thin, largely inaccurate, or barely related to the question asked.",
      "Facts are often generalised or vague (for example naming a general period or role rather than a specific person or reference).",
      "The answer has little clear structure and reads as a list of loosely connected remarks rather than a developed response.",
    ],
  },
  {
    heading: "2. Understanding of religious language, concepts, beliefs, and how belief connects to practice",
    intro:
      "This dimension checks whether a candidate genuinely understands what the Islamic terms and beliefs mean, and can connect a stated belief to how it shapes a Muslim's practice — not just recite them.",
    a: [
      "Uses key Islamic terms (for example Tawhid, Shirk, Sunnah, Ijma) precisely and in the right context, showing real comprehension rather than name-dropping.",
      "Explains clearly why a belief leads to a particular practice or attitude — for example, why belief in accountability on the Day of Judgement shapes everyday ethical conduct.",
      "Handles the relationship between belief and practice as a connected whole, rather than describing the two separately.",
    ],
    c: [
      "Understands the basic meaning of most key terms and beliefs used, though explanations are sometimes generic or partly muddled.",
      "Makes some connection between belief and practice, but the link is stated rather than fully explained.",
      "Occasionally treats a term correctly in one place but slightly misapplies it elsewhere in the same answer.",
    ],
    f: [
      "Misunderstands or misuses key terms, or avoids using the correct terminology at all.",
      "Describes a belief and a practice as separate facts without showing any grasp of how one flows from the other.",
      "Shows confusion between distinct concepts that are often tested together (for example blurring Sunnah and Hadith, or Zakah and general charity).",
    ],
  },
  {
    heading: "3. Seeing the significance of issues and expressing a supported personal opinion",
    intro:
      "This is the AO2 dimension most tested by \"evaluate\", \"discuss\" and \"to what extent\" questions — the ability to weigh an issue, reach a view, and back it with reasons rather than assertion.",
    a: [
      "Identifies why an issue matters — its significance for belief, practice, or Muslim life today — rather than only describing the issue itself.",
      "Considers more than one angle on a question before reaching a personal view, and the view given is clearly supported by reasoning or evidence already used earlier in the answer.",
      "Keeps the personal opinion proportionate and relevant — it answers the actual question asked rather than drifting into an unrelated general statement.",
    ],
    c: [
      "Shows some awareness that the issue has a wider significance, but the point is often asserted briefly rather than developed.",
      "Gives a personal opinion, but the supporting reasoning is thin, repeats earlier material rather than adding new reasoning, or only considers one side.",
      "The evaluative content is present but reads as an add-on at the end rather than woven through the answer.",
    ],
    f: [
      "Offers little or no sense of why the issue matters beyond the facts already stated.",
      "Any personal opinion given is unsupported — a bare assertion with no reasoning attached, or entirely absent.",
      "Does not engage with more than one viewpoint, even where the question invites it.",
    ],
  },
];

export default function GradeDescriptionsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Breadcrumbs
        items={[
          { label: "Exam Pattern", href: "/exam-pattern" },
          { label: "Grade Descriptions", href: "/grade-descriptions" },
        ]}
      />

      <div className="mt-4 flex items-center gap-2">
        <Award size={24} className="text-secondary" aria-hidden="true" />
        <h1 className="text-3xl font-bold font-heading text-text">
          Grade Descriptions: What A, C and F Answers Look Like
        </h1>
      </div>
      <p className="mt-3 text-text-muted">
        Cambridge publishes general grade descriptions setting out the standard expected at Grade
        A, Grade C and Grade F across three dimensions of performance. The explanations below are
        written in our own words to convey what actually distinguishes these grades in practice —
        useful for answering the question every candidate eventually asks: &ldquo;what do I need to
        do to move from a C to an A?&rdquo; These are general descriptions of typical performance,
        not a substitute for the official mark schemes on individual questions, and a genuine
        candidate&apos;s work is judged as a whole rather than by matching every bullet point below.
      </p>

      <section className="mt-10 space-y-10">
        {dimensions.map((d) => (
          <div key={d.heading} className="rounded-xl border border-border bg-surface p-6">
            <h2 className="font-heading text-xl font-semibold text-text">{d.heading}</h2>
            <p className="mt-2 text-text-muted">{d.intro}</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <div>
                <p className="text-sm font-semibold text-success">Grade A</p>
                <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-text-muted">
                  {d.a.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-secondary">Grade C</p>
                <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-text-muted">
                  {d.c.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-warning">Grade F</p>
                <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-text-muted">
                  {d.f.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-10 rounded-xl border border-border bg-surface-soft p-6">
        <h2 className="font-heading text-lg font-semibold text-text">How this connects to AO1/AO2</h2>
        <p className="mt-2 text-text-muted">
          The first dimension above (knowledge and organisation) maps most closely onto AO1, while
          the second and third (understanding of belief-practice links, and evaluating significance
          with a supported opinion) map onto AO2. Moving from a C-grade to an A-grade answer is
          rarely just a matter of writing more — it is a matter of tightening organisation,
          explaining connections rather than stating them, and backing every opinion with a reason.
          For command-word-by-command-word guidance on structuring answers this way, see the{" "}
          <Link href="/revision/exam-technique" className="text-primary underline">
            AO1/AO2 exam technique guide
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
