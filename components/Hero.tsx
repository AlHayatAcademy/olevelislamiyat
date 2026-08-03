import { BookOpen, FileText } from "lucide-react";
import { Button } from "@/components/Button";
import { siteConfig } from "@/data/site-config";

export function Hero() {
  return (
    <section className="bg-primary text-white">
      <div className="mx-auto max-w-5xl px-4 py-16 text-center">
        <p className="font-heading text-sm uppercase tracking-widest text-accent">
          Cambridge O Level {siteConfig.qualifications.oLevel.code} / IGCSE{" "}
          {siteConfig.qualifications.igcse.code}
        </p>
        <h1 className="mt-4 font-heading text-3xl font-bold text-white sm:text-5xl">
          Master O Level Islamiyat {siteConfig.qualifications.oLevel.code} /{" "}
          {siteConfig.qualifications.igcse.code} with Confidence
        </h1>
        <p className="mt-4 text-lg text-white/85">{siteConfig.tagline}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/syllabus" variant="gold" size="lg" icon={BookOpen}>
            Explore Syllabus
          </Button>
          <Button
            href="/past-papers"
            variant="outline"
            size="lg"
            icon={FileText}
            className="border-white text-white hover:bg-white hover:text-primary"
          >
            Browse Past Papers
          </Button>
        </div>
      </div>
    </section>
  );
}
