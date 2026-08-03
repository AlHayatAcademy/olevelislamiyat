interface PageShellProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function PageShell({ title, description, children }: PageShellProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold">{title}</h1>
      {description && <p className="mt-3 text-text-muted">{description}</p>}
      <div className="mt-8 space-y-4">{children}</div>
    </div>
  );
}
