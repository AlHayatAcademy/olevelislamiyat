"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/Button";
import { siteConfig } from "@/data/site-config";

const categories = [
  { value: "online-class", label: "Online class enquiry" },
  { value: "resource", label: "Resource enquiry" },
  { value: "teacher-support", label: "Teacher support enquiry" },
  { value: "technical-support", label: "Technical support enquiry" },
];

export function ContactForm() {
  const [category, setCategory] = useState(categories[0].value);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const categoryLabel = categories.find((c) => c.value === category)?.label ?? "Enquiry";
    const subject = `[${categoryLabel}] Website enquiry from ${name || "a visitor"}`;
    const body = `${message}\n\n---\nCategory: ${categoryLabel}\nName: ${name || "(not provided)"}`;
    const mailto = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-border bg-surface p-6">
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          placeholder="e.g. Ayesha Khan"
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

      <Button type="submit" variant="primary" icon={Send}>
        Prepare email
      </Button>
    </form>
  );
}
