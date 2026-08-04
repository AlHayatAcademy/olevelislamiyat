import { ArrowRight, ChevronDown } from "lucide-react";
import { Hero } from "@/components/Hero";
import { Button } from "@/components/Button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { GeometricPattern } from "@/components/GeometricPattern";
import { PaperIllustration } from "@/components/illustrations/PaperIllustration";
import { StudyBadgeIllustration } from "@/components/illustrations/StudyBadgeIllustration";
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
      <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
        <ScrollReveal className="text-center">
          <p className="font-heading text-sm font-semibold uppercase tracking-widest text-secondary">
            Why study here
          </p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Everything You Need to Succeed</h2>
        </ScrollReveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <ScrollReveal key={f.title} delayMs={i * 60}>
              <div className="group h-full rounded-xl border border-border bg-surface p-6 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-card-hover">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 text-secondary transition-all duration-200 group-hover:scale-110 group-hover:bg-secondary group-hover:text-white">
                  <f.icon aria-hidden="true" size={24} />
                </span>
                <h3 className="mt-4 font-heading font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{f.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Paper 1 / Paper 2 cards */}
      <section className="relative overflow-hidden bg-surface-soft py-16 sm:py-20">
        <GeometricPattern
          id="papers-pattern"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04]"
        />
        <div className="relative mx-auto grid max-w-5xl gap-6 px-4 sm:grid-cols-2">
          {[
            {
              href: "/paper-1",
              title: "Paper 1",
              desc: "Qur'an themes, the history of the Qur'an, the life of the Prophet Muhammad (pbuh), and the first Islamic community.",
              variant: "one" as const,
            },
            {
              href: "/paper-2",
              title: "Paper 2",
              desc: "Hadith teachings, the history of the Hadiths, the Rightly Guided Caliphs, and the Articles of Faith & Pillars of Islam.",
              variant: "two" as const,
            },
          ].map((p, i) => (
            <ScrollReveal key={p.href} delayMs={i * 80}>
              <div className="group h-full rounded-xl border border-border bg-surface p-8 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card-hover">
                <PaperIllustration
                  variant={p.variant}
                  className="h-24 w-24 transition-transform duration-200 group-hover:scale-105"
                />
                <p className="mt-4 font-heading text-xs font-semibold uppercase tracking-widest text-secondary">
                  Full syllabus coverage
                </p>
                <h3 className="mt-1 font-heading text-xl font-bold text-primary">{p.title}</h3>
                <p className="mt-3 text-text-muted">{p.desc}</p>
                <div className="mt-5">
                  <Button href={p.href} variant="outline" icon={ArrowRight} iconPosition="right">
                    View {p.title}
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Exam pattern summary */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
        <ScrollReveal className="text-center">
          <p className="font-heading text-sm font-semibold uppercase tracking-widest text-secondary">
            Assessment objectives
          </p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Exam Pattern at a Glance</h2>
        </ScrollReveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {[examPatternSummary.paper1, examPatternSummary.paper2].map((p, i) => (
            <ScrollReveal key={p.title} delayMs={i * 80}>
              <div className="h-full rounded-xl border border-border bg-surface p-6 shadow-soft transition-all duration-200 hover:shadow-card">
                <h3 className="font-heading font-bold">
                  {p.title} — {p.duration}, {p.marks} marks
                </h3>
                <ul className="mt-3 space-y-1 text-sm text-text-muted list-disc list-inside">
                  {p.sections.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
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
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary-dark py-16 text-white sm:py-20">
        <GeometricPattern
          id="founder-pattern"
          tone="dark"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]"
        />
        <ScrollReveal className="relative mx-auto max-w-3xl px-4 text-center">
          <div className="mx-auto flex justify-center">
            <StudyBadgeIllustration className="h-20 w-20" />
          </div>
          <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">About the Founder</h2>
          <p className="mt-3 font-heading text-accent">{siteConfig.institution.founder}</p>
          <p className="mt-5 text-white/85 leading-relaxed">{siteConfig.founderBio}</p>
          <div className="mt-6">
            <Button href="/about/founder" variant="gold" icon={ArrowRight} iconPosition="right">
              Learn More
            </Button>
          </div>
        </ScrollReveal>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
        <ScrollReveal className="text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
        </ScrollReveal>
        <div className="mt-8 space-y-4">
          {faqs.map((f) => (
            <details
              key={f.question}
              className="group rounded-lg border border-border bg-surface p-4 shadow-soft transition-colors duration-150 open:border-secondary/40"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-heading font-semibold marker:content-none">
                {f.question}
                <ChevronDown
                  aria-hidden="true"
                  size={18}
                  className="shrink-0 text-secondary transition-transform duration-200 group-open:rotate-180"
                />
              </summary>
              <p className="mt-2 text-sm text-text-muted">{f.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-gradient-to-r from-secondary to-accent py-14 sm:py-16">
        <ScrollReveal className="relative mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold text-primary sm:text-3xl">Ready to Start Studying?</h2>
          <p className="mt-3 text-primary/80">
            Explore the full syllabus breakdown and start working through Paper 1 and Paper 2 today.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button href="/syllabus" variant="primary" icon={ArrowRight} iconPosition="right">
              Explore Syllabus
            </Button>
            <Button
              href="/contact"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white focus-visible:ring-primary"
            >
              Contact Us
            </Button>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
