import Link from "next/link";
import { User } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { siteConfig } from "@/data/site-config";
import { canonical } from "@/lib/seo";

export const metadata = {
  title: "About the Founder",
  description: `About ${siteConfig.institution.founder}, founder of ${siteConfig.institution.name} and the education initiatives behind O Level Islamiyat.`,
  ...canonical("/about/founder"),
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.institution.founder,
  description: siteConfig.founderBio,
  worksFor: {
    "@type": "EducationalOrganization",
    name: siteConfig.institution.name,
  },
  url: siteConfig.links.personalSite,
  sameAs: [
    siteConfig.links.personalSite,
    siteConfig.links.instituteSite,
    siteConfig.links.youtube,
  ].filter(Boolean),
};

export default function FounderPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Breadcrumbs
        items={[
          { label: "About", href: "/about" },
          { label: "Founder", href: "/about/founder" },
        ]}
      />
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <div
          aria-hidden="true"
          className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border border-border bg-surface-soft"
        >
          <User className="text-primary/40" size={48} />
        </div>
        <div>
          <h1 className="text-3xl font-bold font-heading text-text">
            {siteConfig.institution.founder}
          </h1>
          <p className="mt-1 text-text-muted">Founder, {siteConfig.institution.name}</p>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        <p className="text-lg leading-relaxed">{siteConfig.founderBio}</p>

        <section>
          <h2 className="text-xl font-heading font-bold text-primary">
            Role in {siteConfig.siteName}
          </h2>
          <p className="mt-3 text-text-muted">
            {siteConfig.institution.founder} leads the educational and scholarly initiatives within
            the Al-Hayat academic ecosystem, including {siteConfig.institution.educationDivision},
            under which this platform is published, and the online classes offered for{" "}
            {siteConfig.qualifications.oLevel.name} ({siteConfig.qualifications.oLevel.code}) and{" "}
            {siteConfig.qualifications.igcse.name} ({siteConfig.qualifications.igcse.code}).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-heading font-bold text-primary">Elsewhere</h2>
          <ul className="mt-3 space-y-2">
            <li>
              <a
                href={siteConfig.links.personalSite}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                {siteConfig.links.personalSite.replace("https://", "")}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.links.instituteSite}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                {siteConfig.links.instituteSite.replace("https://", "")}
              </a>{" "}
              — Al-Hayat Research Institute of Social Sciences
            </li>
            <li>
              <a
                href={siteConfig.links.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                YouTube channel
              </a>
            </li>
          </ul>
        </section>

        <p className="text-sm text-text-muted">
          Read more about{" "}
          <Link href="/about/institute" className="text-primary underline">
            Al-Hayat Research Institute of Social Sciences
          </Link>{" "}
          or{" "}
          <Link href="/online-classes" className="text-primary underline">
            online classes
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
