import { BookOpen, FileText } from "lucide-react";
import { Button } from "@/components/Button";
import { GeometricPattern } from "@/components/GeometricPattern";
import { HeroIllustration } from "@/components/illustrations/HeroIllustration";
import { siteConfig } from "@/data/site-config";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary-dark text-white">
      <GeometricPattern
        id="hero-pattern"
        tone="dark"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-secondary/20 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <div className="text-center lg:text-left">
          <p className="font-heading text-sm uppercase tracking-widest text-accent">
            Cambridge O Level {siteConfig.qualifications.oLevel.code} / IGCSE{" "}
            {siteConfig.qualifications.igcse.code}
          </p>
          <h1 className="mt-4 font-heading text-3xl font-bold text-white sm:text-5xl">
            Master O Level Islamiyat {siteConfig.qualifications.oLevel.code} /{" "}
            {siteConfig.qualifications.igcse.code} with Confidence
          </h1>
          <p className="mt-4 text-lg text-white/85">{siteConfig.tagline}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
            <Button href="/syllabus" variant="gold" size="lg" icon={BookOpen} iconPosition="right">
              Explore Syllabus
            </Button>
            <Button
              href="/past-papers"
              variant="outline"
              size="lg"
              icon={FileText}
              iconPosition="right"
              className="border-white text-white hover:bg-white hover:text-primary focus-visible:ring-white"
            >
              Browse Past Papers
            </Button>
          </div>
        </div>

        <div className="hidden justify-self-center lg:flex lg:justify-self-end">
          <HeroIllustration className="h-72 w-auto max-w-full drop-shadow-[0_12px_28px_rgba(0,0,0,0.25)]" />
        </div>
      </div>
    </section>
  );
}
