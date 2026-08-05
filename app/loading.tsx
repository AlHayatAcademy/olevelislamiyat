export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="mx-auto flex max-w-2xl items-center justify-center px-4 py-24"
    >
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-primary" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
