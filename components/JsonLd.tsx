/**
 * Renders a single JSON-LD <script> block. Centralizes the
 * `dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}` pattern repeated across
 * every page that emits structured data, so there's one place that handles the
 * serialization correctly.
 */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
