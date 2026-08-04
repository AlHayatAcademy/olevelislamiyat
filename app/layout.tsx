import type { Metadata } from "next";
import { manrope, inter, notoNaskhArabic } from "@/lib/fonts";
import { siteConfig } from "@/data/site-config";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: `${siteConfig.siteName} — Cambridge O Level 2058 / IGCSE 0493`,
    template: `%s | ${siteConfig.siteName}`,
  },
  description: siteConfig.tagline,
};

const educationalOrgSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: siteConfig.institution.name,
  legalName: siteConfig.institution.legalName,
  url: siteConfig.domain,
  logo: `${siteConfig.domain}/favicon.ico`,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.institution.location.split(",")[0]?.trim(),
    addressCountry: "PK",
  },
  email: siteConfig.contact.email,
  telephone: siteConfig.contact.phone,
  founder: {
    "@type": "Person",
    name: siteConfig.institution.founder,
  },
  sameAs: [
    siteConfig.links.personalSite,
    siteConfig.links.instituteSite,
    siteConfig.links.youtube,
    ...siteConfig.socialLinks.map((s) => s.href),
  ].filter(Boolean),
  department: {
    "@type": "EducationalOrganization",
    name: siteConfig.institution.educationDivision,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable} ${notoNaskhArabic.variable}`}>
      <body className="min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalOrgSchema) }}
        />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <AnnouncementBar />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
