import { Breadcrumbs, type BreadcrumbItem } from "@/components/Breadcrumbs";

interface PageShellProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  /** Wrap the heading + content in an <article> landmark, for pages that are a single
   * standalone piece of content (a model answer, a past-paper question, a reference entry) —
   * as opposed to index/listing pages, which stay as a plain <div>. Defaults to false so every
   * existing call site keeps its current markup unless it opts in. */
  article?: boolean;
  children?: React.ReactNode;
}

export function PageShell({ title, description, breadcrumbs, article = false, children }: PageShellProps) {
  const content = (
    <>
      <h1 className="text-3xl font-bold">{title}</h1>
      {description && <p className="mt-3 text-text-muted">{description}</p>}
      <div className="mt-8 space-y-4">{children}</div>
    </>
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="mb-4">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      )}
      {article ? <article>{content}</article> : content}
    </div>
  );
}
