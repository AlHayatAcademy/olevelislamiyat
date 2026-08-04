import { PageShell } from "@/components/PageShell";
import { siteConfig } from "@/data/site-config";
import { canonical } from "@/lib/seo";

export const metadata = {
  title: "Privacy Policy",
  description:
    "How O Level Islamiyat (Cambridge O Level 2058 / IGCSE 0493) handles personal data — no accounts, no database, no tracking by default.",
  ...canonical("/privacy"),
};

export default function PrivacyPage() {
  return (
    <PageShell
      title="Privacy Policy"
      description="How this site handles personal data. Last updated 3 August 2026."
    >
      <p>
        {siteConfig.siteName} is published by {siteConfig.institution.legalName}. This policy
        explains, honestly and in plain language, what happens to your data when you use this
        website.
      </p>

      <h2 className="mt-8 text-xl font-heading font-bold text-primary">No accounts, no database</h2>
      <p>
        This site does not require you to register or log in, and it does not store user accounts,
        profiles, or quiz results on a server. There is currently no backend database. Anything you
        do in a quiz or revision tool on this site stays in your own browser and is not transmitted
        to us.
      </p>

      <h2 className="mt-8 text-xl font-heading font-bold text-primary">Analytics and tracking</h2>
      <p>
        This site does not use Google Analytics or any third-party advertising or tracking scripts.
        Cloudflare Web Analytics is available on Cloudflare-hosted sites but is{" "}
        <strong>disabled by default</strong> here. If that ever changes, this policy will be updated
        first, and analytics will remain limited to aggregate, non-identifying traffic statistics —
        never individual tracking or cross-site profiling.
      </p>

      <h2 className="mt-8 text-xl font-heading font-bold text-primary">Cookies</h2>
      <p>
        This site does not set marketing or tracking cookies. Any cookies used are limited to
        essential functionality and contain no personal data.
      </p>

      <h2 className="mt-8 text-xl font-heading font-bold text-primary">Contact and enquiries</h2>
      <p>
        Where this site offers a contact or enquiry option, it currently works by opening your own
        email client (a &quot;mailto&quot; link) or a WhatsApp chat, or by directing you to email{" "}
        <a className="text-primary underline" href={`mailto:${siteConfig.contact.email}`}>
          {siteConfig.contact.email}
        </a>{" "}
        directly. What you choose to send is handled by your own email or WhatsApp provider under
        their own privacy policies, and is read by {siteConfig.institution.name} solely to respond
        to your enquiry. We do not sell, rent, or share your contact details with third parties.
      </p>
      <p className="mt-3">
        A server-side enquiry form (via a Cloudflare Worker) is planned for a future update. When it
        launches, this policy will be revised in advance to describe exactly what is collected,
        where it is processed, and how long it is retained.
      </p>

      <h2 className="mt-8 text-xl font-heading font-bold text-primary">Hosting and server logs</h2>
      <p>
        Like virtually all websites, the hosting infrastructure that serves these pages may keep
        standard technical logs (such as IP address, browser type, and requested page) for security
        and reliability purposes. These logs are not used by us for tracking or profiling and are
        not sold or shared.
      </p>

      <h2 className="mt-8 text-xl font-heading font-bold text-primary">External links</h2>
      <p>
        This site links to external services including YouTube, WhatsApp, and other pages within the
        Al-Hayat academic ecosystem ({siteConfig.links.personalSite} and{" "}
        {siteConfig.links.instituteSite}). Once you leave this site, that destination&apos;s own
        privacy policy applies.
      </p>

      <h2 className="mt-8 text-xl font-heading font-bold text-primary">Children&apos;s privacy</h2>
      <p>
        This site is study material aimed at O Level / IGCSE-age students and their teachers. It
        does not knowingly collect personal information from children, and no personal information
        is required to read or use its content.
      </p>

      <h2 className="mt-8 text-xl font-heading font-bold text-primary">Changes to this policy</h2>
      <p>
        As this site adds functionality (for example, a proper enquiry form), this policy will be
        updated to reflect it. The date above marks the most recent revision.
      </p>

      <h2 className="mt-8 text-xl font-heading font-bold text-primary">Contact</h2>
      <p>
        Questions about this policy can be sent to{" "}
        <a className="text-primary underline" href={`mailto:${siteConfig.contact.email}`}>
          {siteConfig.contact.email}
        </a>
        .
      </p>
    </PageShell>
  );
}
