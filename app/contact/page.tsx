import { PageShell } from "@/components/PageShell";
import { siteConfig } from "@/data/site-config";

export const metadata = {
  title: "Contact",
  description: "Get in touch with O Level Islamiyat.",
};

export default function ContactPage() {
  return (
    <PageShell title="Contact" description="Get in touch with O Level Islamiyat.">
      <ul className="space-y-2">
        <li>
          Email:{" "}
          <a className="text-primary underline" href={`mailto:${siteConfig.contact.email}`}>
            {siteConfig.contact.email}
          </a>
        </li>
        <li>
          WhatsApp:{" "}
          <a
            className="text-primary underline"
            href={siteConfig.contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
          >
            {siteConfig.contact.phone}
          </a>
        </li>
        <li>Location: {siteConfig.institution.location}</li>
      </ul>
    </PageShell>
  );
}
