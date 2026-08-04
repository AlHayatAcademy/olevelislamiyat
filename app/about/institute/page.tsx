import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import { canonical } from "@/lib/seo";

export const metadata = {
  title: "About the Institute",
  description: `About ${siteConfig.institution.name}, its education division ${siteConfig.institution.educationDivision}, and how O Level Islamiyat fits within it.`,
  ...canonical("/about/institute"),
};

export default function InstitutePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold font-heading text-text">{siteConfig.institution.name}</h1>
      <p className="mt-3 text-text-muted">{siteConfig.institution.legalName}</p>

      <div className="mt-8 space-y-6">
        <p>
          {siteConfig.institution.legalName} is based in {siteConfig.institution.location}, and
          leads educational and scholarly initiatives within the Al-Hayat academic ecosystem,
          founded by {siteConfig.institution.founder}.
        </p>

        <section>
          <h2 className="text-xl font-heading font-bold text-primary">Education division: {siteConfig.institution.educationDivision}</h2>
          <p className="mt-3">
            {siteConfig.institution.educationDivision} is the education division of{" "}
            {siteConfig.institution.name}. It is the publisher of {siteConfig.siteName} and the
            provider of the{" "}
            <Link href="/online-classes" className="text-primary underline">
              online classes
            </Link>{" "}
            offered for {siteConfig.qualifications.oLevel.name} ({siteConfig.qualifications.oLevel.code})
            and {siteConfig.qualifications.igcse.name} ({siteConfig.qualifications.igcse.code}).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-heading font-bold text-primary">Links</h2>
          <ul className="mt-3 space-y-2">
            <li>
              <a
                href={siteConfig.links.instituteSite}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                {siteConfig.links.instituteSite.replace("https://", "")}
              </a>{" "}
              — institute website
            </li>
            <li>
              <a
                href={siteConfig.links.academyPage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                {siteConfig.links.academyPage.replace("https://", "")}
              </a>{" "}
              — {siteConfig.institution.educationDivision} on the broader Al-Hayat ecosystem site
            </li>
            <li>
              <a
                href={siteConfig.links.personalSite}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                {siteConfig.links.personalSite.replace("https://", "")}
              </a>{" "}
              — {siteConfig.institution.founder}
            </li>
          </ul>
        </section>

        <p className="text-sm text-text-muted">
          Read more about{" "}
          <Link href="/about/founder" className="text-primary underline">
            the founder
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
