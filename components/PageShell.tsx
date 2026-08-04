import { Breadcrumbs, type BreadcrumbItem } from "@/components/Breadcrumbs";

interface PageShellProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  children?: React.ReactNode;
}

export function PageShell({ title, description, breadcrumbs, children }: PageShellProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="mb-4">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      )}
      <h1 className="text-3xl font-bold">{title}</h1>
      {description && <p className="mt-3 text-text-muted">{description}</p>}
      <div className="mt-8 space-y-4">{children}</div>
    </div>
  );
}
