import Link from "next/link";
import { Target } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { allTopics } from "@/data/topics";
import { canonical } from "@/lib/seo";

export const metadata = {
  title: "AO1/AO2 Exam Technique Guide",
  description: "What the AO1 and AO2 command words expect, and how to structure answers that score on both.",
  ...canonical("/revision/exam-technique"),
};

// A small, representative sample of topics used to illustrate the guidance below with real
// examples drawn from the lesson data (not invented).
const EXAMPLE_SLUGS = ["compilation-under-abu-bakr", "abu-bakr", "salah"];

export default function ExamTechniquePage() {
  const examples = allTopics.filter((t) => EXAMPLE_SLUGS.includes(t.slug));

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Breadcrumbs
        items={[
          { label: "Revision", href: "/revision" },
          { label: "Exam Technique", href: "/revision/exam-technique" },
        ]}
      />

      <div className="mt-4 flex items-center gap-2">
        <Target size={24} className="text-secondary" aria-hidden="true" />
        <h1 className="text-3xl font-bold font-heading text-text">AO1/AO2 Exam Technique Guide</h1>
      </div>
      <p className="mt-3 text-text-muted">
        Cambridge Islamiyat papers reward two distinct skills, and most lost marks come from answering one when the
        question calls for the other. This guide explains the difference and how to structure your answers
        accordingly.
      </p>

      <section className="mt-8 space-y-4">
        <h2 className="font-heading text-xl font-semibold text-text">What AO1 actually wants</h2>
        <p className="text-text-muted">
          AO1 (Knowledge and Understanding) is tested by command words such as <em>describe</em>, <em>state</em>,{" "}
          <em>outline</em> and <em>what</em>. These questions want accurate, specific factual content — names,
          places, sequences of events, and the correct terminology — set out clearly and in the right order. A
          strong AO1 answer reads like a well-organised account: it does not need your opinion, and adding one
          rarely earns extra marks here. What loses marks is vagueness (saying &ldquo;the caliph did something
          about the Qur&apos;an&rdquo; instead of naming Abu Bakr and Zayd ibn Thabit specifically), and
          incompleteness (giving two facts when the question&apos;s mark allocation implies four or five are
          expected). Before writing, it helps to mentally list every key fact your revision notes give for that
          topic, then select the ones the question is actually asking for.
        </p>
        <h2 className="font-heading text-xl font-semibold text-text">What AO2 actually wants</h2>
        <p className="text-text-muted">
          AO2 (Application and Evaluation) is tested by command words such as <em>explain</em>, <em>why</em>,{" "}
          <em>evaluate</em>, <em>discuss</em> and <em>to what extent</em>. These questions want you to go beyond
          stating what happened and reason about significance, causes, effects, or competing viewpoints. The
          examiner is looking for a chain of reasoning — &ldquo;this happened, which mattered because&hellip;,
          and this is significant for Muslims today because&hellip;&rdquo; — not simply more facts. A common way
          to strengthen an AO2 answer is to link a historical or religious point back to its lasting relevance:
          why a leadership decision still models good governance, or why a Qur&apos;anic teaching still shapes
          everyday practice. Weaker AO2 answers restate AO1 content without ever explaining <em>why</em> it
          mattered; stronger ones use each fact as a springboard into reasoning.
        </p>
        <h2 className="font-heading text-xl font-semibold text-text">Reading the command word first</h2>
        <p className="text-text-muted">
          Before planning an answer, identify whether the command word is asking you to recall (AO1) or to reason
          (AO2), and check the mark allocation — a 2-mark question rarely wants extended evaluation, while an
          8-mark or 10-mark question almost always expects a mix of both: solid factual grounding followed by
          genuine explanation of significance. Many higher-tariff questions are actually two-part in disguise
          (state what happened, then explain why it mattered), so it is worth planning both halves before writing
          either.
        </p>
        <h2 className="font-heading text-xl font-semibold text-text">Structuring a mixed AO1/AO2 answer</h2>
        <p className="text-text-muted">
          A reliable structure for longer answers is: open with the key fact(s) the question needs (AO1), then
          devote at least a third of your answer to explaining why those facts matter — their cause, their
          consequence, or their lasting significance (AO2). Avoid the common trap of writing a long narrative and
          only adding a single evaluative sentence at the very end; examiners generally reward evaluation that is
          woven through the answer, addressing significance point by point rather than as an afterthought.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-heading text-xl font-semibold text-text">Worked examples from the lessons</h2>
        <p className="mt-2 text-text-muted">
          Each lesson already separates its own AO1 and AO2 guidance. Here is what that looks like in practice for
          a few representative topics — read the full lesson for the complete guidance list.
        </p>
        <div className="mt-4 space-y-6">
          {examples.map((topic) => (
            <div key={topic.slug} className="rounded-xl border border-border bg-surface p-5">
              <Link
                href={`/paper-${topic.paper}/${topic.section}/${topic.slug}`}
                className="font-heading font-semibold text-text hover:text-primary hover:underline"
              >
                {topic.title}
              </Link>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold text-primary">AO1 focus</p>
                  <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-text-muted">
                    {topic.ao1Guidance.slice(0, 2).map((g, i) => (
                      <li key={i}>{g}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-secondary">AO2 focus</p>
                  <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-text-muted">
                    {topic.ao2Guidance.slice(0, 2).map((g, i) => (
                      <li key={i}>{g}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
