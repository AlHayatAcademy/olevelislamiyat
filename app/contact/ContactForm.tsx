"use client";

import { useState, type FormEvent } from "react";
import { Send, Mail, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/Button";
import { siteConfig } from "@/data/site-config";

const categories = [
  { value: "online-class", label: "Online class enquiry" },
  { value: "resource", label: "Resource enquiry" },
  { value: "teacher-support", label: "Teacher support enquiry" },
  { value: "technical-support", label: "Technical support enquiry" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_MESSAGE_LENGTH = 10;
const MAX_MESSAGE_LENGTH = 4000;

type SubmitState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [category, setCategory] = useState(categories[0].value);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function clientValidationError(): string | null {
    if (!name.trim()) return "Please enter your name.";
    if (!EMAIL_RE.test(email.trim())) return "Please enter a valid email address.";
    if (message.trim().length < MIN_MESSAGE_LENGTH) {
      return `Message must be at least ${MIN_MESSAGE_LENGTH} characters.`;
    }
    if (message.trim().length > MAX_MESSAGE_LENGTH) {
      return `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer.`;
    }
    return null;
  }

  function buildMailto() {
    const categoryLabel = categories.find((c) => c.value === category)?.label ?? "Enquiry";
    const subject = `[${categoryLabel}] Website enquiry from ${name || "a visitor"}`;
    const body = `${message}\n\n---\nCategory: ${categoryLabel}\nName: ${name || "(not provided)"}\nEmail: ${
      email || "(not provided)"
    }`;
    return `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validationError = clientValidationError();
    if (validationError) {
      setState("error");
      setErrorMessage(validationError);
      return;
    }

    setState("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), category, message: message.trim() }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "The enquiry could not be submitted. Please try again.");
      }

      setState("success");
    } catch {
      // API route submission failed or is unavailable (e.g. static export deployment
      // without the endpoint live yet) — fall back to the mailto link below.
      setState("error");
      setErrorMessage(
        "We couldn't submit this online right now. Please use the “Email us directly” link below instead.",
      );
    }
  }

  if (state === "success") {
    return (
      <div className="flex items-start gap-3 rounded-xl border border-success/40 bg-surface p-6 text-text">
        <CheckCircle2 size={22} className="mt-0.5 shrink-0 text-success" aria-hidden="true" />
        <div>
          <p className="font-semibold">Thank you — your enquiry has been sent.</p>
          <p className="mt-1 text-sm text-text-muted">
            We aim to respond within a few working days. You can also reach us directly at{" "}
            <a href={`mailto:${siteConfig.contact.email}`} className="text-primary underline">
              {siteConfig.contact.email}
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-border bg-surface p-6" noValidate>
      <div>
        <label htmlFor="category" className="block text-sm font-semibold text-text">
          Enquiry type
        </label>
        <select
          id="category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {categories.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-text">
          Your name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          placeholder="e.g. Ayesha Khan"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-text">
          Your email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          placeholder="e.g. ayesha@example.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-text">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          placeholder="Tell us what you need help with..."
        />
      </div>

      {state === "error" && errorMessage && (
        <p className="flex items-start gap-2 text-sm text-error">
          <AlertTriangle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
          {errorMessage}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" variant="primary" icon={Send} disabled={state === "submitting"}>
          {state === "submitting" ? "Sending..." : "Send enquiry"}
        </Button>
        <a
          href={buildMailto()}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary underline underline-offset-2 hover:text-primary-dark"
        >
          <Mail size={16} aria-hidden="true" />
          Email us directly instead
        </a>
      </div>
    </form>
  );
}
