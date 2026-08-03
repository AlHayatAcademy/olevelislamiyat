import Link from "next/link";
import { siteConfig } from "@/data/site-config";

export function Footer() {
  const socialLinks = siteConfig.socialLinks.filter((s) => s?.href);

  return (
    <footer className="bg-primary-dark text-white/90">
      <div className="mx-auto max-w-7xl px-4 py-12 grid gap-8 md:grid-cols-4">
        <div>
          <h3 className="font-heading text-white font-bold">{siteConfig.siteName}</h3>
          <p className="mt-2 text-sm text-white/70">{siteConfig.tagline}</p>
          <p className="mt-4 text-sm text-white/70">
            A project of {siteConfig.institution.educationDivision}, an education initiative of{" "}
            {siteConfig.institution.name}.
          </p>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-white">Study</h4>
          <ul className="mt-3 space-y-2 text-sm">
            {siteConfig.primaryNav.slice(0, 6).map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-white">Legal</h4>
          <ul className="mt-3 space-y-2 text-sm">
            {siteConfig.footerLegalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-white">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li>{siteConfig.institution.location}</li>
            <li>
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-accent">
                {siteConfig.contact.email}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent"
              >
                WhatsApp: {siteConfig.contact.phone}
              </a>
            </li>
            {socialLinks.length > 0 && (
              <li className="flex gap-3 pt-1">
                {socialLinks.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent"
                  >
                    {s.label}
                  </a>
                ))}
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/60">
        © {new Date().getFullYear()} {siteConfig.institution.legalName}. All rights reserved.
      </div>
    </footer>
  );
}
