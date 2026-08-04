import Link from "next/link";
import { Mail, Phone, MessageCircle, Youtube } from "lucide-react";
import { trustBadges } from "@/data/homepage-content";
import { siteConfig } from "@/data/site-config";

const socialIcons: Record<string, typeof Youtube> = {
  YouTube: Youtube,
};

/**
 * Dark-green trust band combining honest, mechanically-derived fact badges
 * (see data/homepage-content.ts trustBadges — every number sourced from the
 * real data files, never invented) with contact/social details from
 * site-config, so no fabricated statistics appear anywhere on the site.
 */
export function TrustBar() {
  const socialLinks = siteConfig.socialLinks.filter((s) => s?.href);

  return (
    <section className="bg-primary-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {trustBadges.map((b) => (
            <div key={b.label} className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                <b.icon aria-hidden="true" size={20} />
              </span>
              <p className="text-sm font-medium text-white/90">{b.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/80 sm:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="inline-flex items-center gap-2 hover:text-accent"
            >
              <Phone aria-hidden="true" size={16} />
              {siteConfig.contact.phone}
            </a>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="inline-flex items-center gap-2 hover:text-accent"
            >
              <Mail aria-hidden="true" size={16} />
              {siteConfig.contact.email}
            </a>
            <a
              href={siteConfig.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-accent"
            >
              <MessageCircle aria-hidden="true" size={16} />
              WhatsApp
            </a>
          </div>

          {socialLinks.length > 0 && (
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => {
                const Icon = socialIcons[s.label];
                return (
                  <Link
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-accent hover:text-primary"
                  >
                    {Icon ? <Icon aria-hidden="true" size={16} /> : <span className="text-xs">{s.label}</span>}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
