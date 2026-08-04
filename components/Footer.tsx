import Link from "next/link";
import { Mail, MapPin, MessageCircle, Youtube, type LucideIcon } from "lucide-react";
import { siteConfig } from "@/data/site-config";

const socialIcons: Record<string, LucideIcon> = {
  YouTube: Youtube,
};

export function Footer() {
  const socialLinks = siteConfig.socialLinks.filter((s) => s?.href);

  return (
    <footer className="bg-primary-dark text-white/90">
      <div className="mx-auto max-w-7xl px-4 py-12 grid gap-10 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <h3 className="font-heading text-lg font-bold text-white">{siteConfig.siteName}</h3>
          <p className="mt-2 text-sm text-accent">{siteConfig.tagline}</p>
          <p className="mt-4 text-sm text-white/70">
            A project of {siteConfig.institution.educationDivision}, an education initiative of{" "}
            {siteConfig.institution.name}.
          </p>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-white">Quick Links</h4>
          <ul className="mt-3 space-y-2 text-sm">
            {siteConfig.primaryNav.slice(0, 6).map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-white/70 transition-colors hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-white">Contact Us</h4>
          <ul className="mt-3 space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-2">
              <MapPin aria-hidden="true" size={16} className="mt-0.5 shrink-0 text-accent" />
              <span>{siteConfig.institution.location}</span>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-2 transition-colors hover:text-accent"
              >
                <Mail aria-hidden="true" size={16} className="shrink-0 text-accent" />
                {siteConfig.contact.email}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-accent"
              >
                <MessageCircle aria-hidden="true" size={16} className="shrink-0 text-accent" />
                WhatsApp: {siteConfig.contact.phone}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-white">Follow Us</h4>
          {socialLinks.length > 0 ? (
            <div className="mt-3 flex gap-3">
              {socialLinks.map((s) => {
                const Icon = socialIcons[s.label];
                return (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-accent hover:text-primary"
                  >
                    {Icon ? <Icon aria-hidden="true" size={16} /> : <span className="text-xs">{s.label}</span>}
                  </a>
                );
              })}
            </div>
          ) : (
            <p className="mt-3 text-sm text-white/50">Coming soon.</p>
          )}
          <h4 className="mt-6 font-heading font-semibold text-white">Legal</h4>
          <ul className="mt-3 space-y-2 text-sm">
            {siteConfig.footerLegalLinks.slice(0, 3).map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-white/70 transition-colors hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-xs text-white/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.institution.legalName}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-accent">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-accent">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
