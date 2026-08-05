import { Mail, MessageCircle, MapPin } from "lucide-react";
import { Button } from "@/components/Button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { siteConfig } from "@/data/site-config";
import { ContactForm } from "./ContactForm";
import { canonical, faqSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

export const metadata = {
  title: "Contact",
  description:
    "Contact O Level Islamiyat / Al-Hayat Academy for online-class, resource, teacher-support or technical enquiries about Cambridge O Level 2058 / IGCSE 0493.",
  ...canonical("/contact"),
};

const faqs = [
  {
    q: "How quickly will I get a reply?",
    a: "We aim to respond within a few days. WhatsApp is usually the fastest way to reach us.",
  },
  {
    q: "Can I ask about joining online classes?",
    a: 'Yes — use the "Online class enquiry" category below, or see the Online Classes page for full details.',
  },
  {
    q: "I found an error in a note or reference — how do I report it?",
    a: 'Please use the "Resource enquiry" category and describe the page and the issue. Corrections are genuinely welcomed.',
  },
  {
    q: "Do you offer support for teachers?",
    a: 'Yes — select "Teacher support enquiry" and let us know what you need.',
  },
];


export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <JsonLd data={faqSchema(faqs)} />
      <Breadcrumbs items={[{ label: "Contact", href: "/contact" }]} />
      <h1 className="text-3xl font-bold font-heading text-text">Contact</h1>
      <p className="mt-3 text-text-muted">
        Get in touch with {siteConfig.siteName}, a project of{" "}
        {siteConfig.institution.educationDivision}.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-surface p-5">
          <MessageCircle aria-hidden="true" className="text-secondary" size={22} />
          <h2 className="mt-3 font-heading font-semibold text-text">WhatsApp</h2>
          <p className="mt-1 text-sm text-text-muted">{siteConfig.contact.phone}</p>
          <Button
            href={siteConfig.contact.whatsapp}
            variant="whatsapp"
            size="sm"
            className="mt-3"
            external
          >
            Chat on WhatsApp
          </Button>
        </div>
        <div className="rounded-xl border border-border bg-surface p-5">
          <Mail aria-hidden="true" className="text-secondary" size={22} />
          <h2 className="mt-3 font-heading font-semibold text-text">Email</h2>
          <p className="mt-1 break-words text-sm text-text-muted">{siteConfig.contact.email}</p>
          <Button
            href={`mailto:${siteConfig.contact.email}`}
            variant="outline"
            size="sm"
            className="mt-3"
          >
            Send an email
          </Button>
        </div>
        <div className="rounded-xl border border-border bg-surface p-5">
          <MapPin aria-hidden="true" className="text-secondary" size={22} />
          <h2 className="mt-3 font-heading font-semibold text-text">Location</h2>
          <p className="mt-1 text-sm text-text-muted">{siteConfig.institution.location}</p>
          <p className="mt-1 text-sm text-text-muted">{siteConfig.institution.name}</p>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-heading font-bold text-primary">Send an enquiry</h2>
        <p className="mt-2 text-sm text-text-muted">
          This form opens your email client with your message pre-filled — there is no server-side
          form yet (a Cloudflare Worker–based form is coming soon). Nothing you type here is sent
          anywhere until you send the resulting email yourself.
        </p>
        <div className="mt-5">
          <ContactForm />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-heading font-bold text-primary">Frequently asked questions</h2>
        <div className="mt-4 space-y-4">
          {faqs.map((f) => (
            <div key={f.q} className="rounded-xl border border-border bg-surface p-5">
              <h3 className="font-heading font-semibold text-text">{f.q}</h3>
              <p className="mt-2 text-sm text-text-muted">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
