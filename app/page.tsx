import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/Hero";
import { Button } from "@/components/Button";
import { siteConfig } from "@/data/site-config";
import { features, examPatternSummary, faqs } from "@/data/homepage-content";
import { canonical } from "@/lib/seo";

export const metadata = {
  title: `${siteConfig.siteName} — Cambridge O Level 2058 / IGCSE 0493`,
  description:
    "Free Islamiyat notes, past papers, model answers and quizzes for Cambridge O Level Islamiyat (2058) and IGCSE Islamiyat (0493).",
  ...canonical("/"),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />

      {/* Feature cards */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">
          Everything You Need to Succeed
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-border bg-surface p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <f.icon aria-hidden="true" className="text-secondary" size={28} />
              <h3 className="mt-4 font-heading font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-text-muted">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Paper 1 / Paper 2 cards */}
      <section className="bg-surface-soft py-16">
        <div className="mx-auto max-w-5xl px-4 grid gap-6 sm:grid-cols-2">
          {[
            {
              href: "/paper-1",
              title: "Paper 1",
              desc: "Qur'an themes, the history of the Qur'an, the life of the Prophet Muhammad (pbuh), and the first Islamic community.",
            },
            {
              href: "/paper-2",
              title: "Paper 2",
              desc: "Hadith teachings, the history of the Hadiths, the Rightly Guided Caliphs, and the Articles of Faith & Pillars of Islam.",
            },
          ].map((p) => (
            <div key={p.href} className="rounded-xl bg-surface border border-border p-8">
              <h3 className="font-heading text-xl font-bold text-primary">{p.title}</h3>
              <p className="mt-3 text-text-muted">{p.desc}</p>
              <div className="mt-5">
                <Button href={p.href} variant="outline" icon={ArrowRight} iconPosition="right">
                  View {p.title}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Exam pattern summary */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">Exam Pattern at a Glance</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {[examPatternSummary.paper1, examPatternSummary.paper2].map((p) => (
            <div key={p.title} className="rounded-xl border border-border p-6">
              <h3 className="font-heading font-bold">
                {p.title} — {p.duration}, {p.marks} marks
              </h3>
              <ul className="mt-3 space-y-1 text-sm text-text-muted list-disc list-inside">
                {p.sections.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-text-muted">
          {examPatternSummary.aos.map((ao) => (
            <p key={ao.code}>
              <span className="font-semibold text-primary">{ao.code}</span> — {ao.label} (
              {ao.weight})
            </p>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button href="/exam-pattern" variant="ghost" icon={ArrowRight} iconPosition="right">
            Full exam pattern details
          </Button>
        </div>
      </section>

      {/* Founder section */}
      <section className="bg-primary text-white py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">About the Founder</h2>
          <p className="mt-3 font-heading text-accent">{siteConfig.institution.founder}</p>
          <p className="mt-5 text-white/85 leading-relaxed">{siteConfig.founderBio}</p>
          <div className="mt-6">
            <Button href="/about/founder" variant="gold">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
        <div className="mt-8 space-y-4">
          {faqs.map((f) => (
            <details key={f.question} className="rounded-lg border border-border p-4 group">
              <summary className="cursor-pointer font-heading font-semibold">{f.question}</summary>
              <p className="mt-2 text-sm text-text-muted">{f.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-secondary py-14">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold text-primary sm:text-3xl">Ready to Start Studying?</h2>
          <p className="mt-3 text-primary/80">
            Explore the full syllabus breakdown and start working through Paper 1 and Paper 2 today.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button href="/syllabus" variant="primary">
              Explore Syllabus
            </Button>
            <Button
              href="/contact"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
