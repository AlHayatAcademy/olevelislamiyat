import { PageShell } from "@/components/PageShell";
import { siteConfig } from "@/data/site-config";
import { canonical } from "@/lib/seo";

export const metadata = {
  title: "Accessibility",
  description:
    "The accessibility practices used to build O Level Islamiyat, and how to report an accessibility issue.",
  ...canonical("/accessibility"),
};

export default function AccessibilityPage() {
  return (
    <PageShell
      title="Accessibility"
      description="Our approach to accessibility. Last updated 3 August 2026."
      breadcrumbs={[{ label: "Accessibility", href: "/accessibility" }]}
    >
      <p>
        {siteConfig.siteName} is built to be usable by as many students and teachers as possible,
        including those using assistive technology, keyboard-only navigation, or screen readers.
        This page describes the genuine practices used in building this site — not a formal
        conformance certification.
      </p>

      <h2 className="mt-8 text-xl font-heading font-bold text-primary">What is implemented</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <strong>Skip-to-content link.</strong> A &quot;Skip to content&quot; link is available as
          the first focusable element on every page, letting keyboard users bypass repeated
          navigation.
        </li>
        <li>
          <strong>Semantic HTML.</strong> Pages use semantic landmarks and heading structures
          (headings, lists, navigation, main, footer) rather than generic elements, so screen readers
          can announce structure and let users jump between sections.
        </li>
        <li>
          <strong>Keyboard navigation.</strong> Interactive elements — links, buttons, form controls
          — are built as native, focusable elements that work with keyboard-only navigation, not
          click-only handlers on non-interactive tags.
        </li>
        <li>
          <strong>Visible focus states.</strong> Buttons and links carry a visible focus ring so
          keyboard users can always see where they are on the page.
        </li>
        <li>
          <strong>Colour and contrast.</strong> The site&apos;s palette (dark green, gold, and a warm
          off-white background) is chosen with readable body-text contrast in mind, and text colour
          is not used as the sole way of conveying information.
        </li>
        <li>
          <strong>Descriptive links and images.</strong> Link text is written to make sense out of
          context, and decorative icons are marked so screen readers skip them.
        </li>
        <li>
          <strong>Responsive layout.</strong> Pages reflow for small screens and support browser
          text-zoom without loss of content or function.
        </li>
      </ul>

      <h2 className="mt-8 text-xl font-heading font-bold text-primary">Our approach</h2>
      <p>
        We aim to follow the Web Content Accessibility Guidelines (WCAG) as a working reference
        point for structure, contrast, and keyboard operability. This site has not undergone a
        formal third-party WCAG conformance audit, and we are not claiming a specific conformance
        level. Accessibility is treated as an ongoing effort, not a one-time checkbox, and is
        revisited as new pages and features (such as quizzes) are added.
      </p>

      <h2 className="mt-8 text-xl font-heading font-bold text-primary">Known limitations</h2>
      <p>
        Some interactive features (such as quizzes) are newer parts of the site and receive
        accessibility attention as they are built out further. If you encounter a feature that does
        not work well with your assistive technology, please tell us — see below.
      </p>

      <h2 className="mt-8 text-xl font-heading font-bold text-primary">Reporting an accessibility issue</h2>
      <p>
        If you experience difficulty using any part of this site, please email{" "}
        <a className="text-primary underline" href={`mailto:${siteConfig.contact.email}`}>
          {siteConfig.contact.email}
        </a>{" "}
        with the page URL and a description of the issue (and, if possible, the browser and
        assistive technology you were using). We will do our best to address it.
      </p>
    </PageShell>
  );
}
