"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <AlertTriangle aria-hidden="true" className="mx-auto text-error" size={40} />
      <h1 className="mt-4 text-3xl font-bold font-heading text-text">Something went wrong</h1>
      <p className="mt-3 text-text-muted">
        An unexpected error occurred while loading this page. You can try again, or head back to
        the homepage.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button href="/" variant="outline">
          Back to homepage
        </Button>
      </div>
    </div>
  );
}
