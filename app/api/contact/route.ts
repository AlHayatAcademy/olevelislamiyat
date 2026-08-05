import { NextResponse } from "next/server";

// Best-effort, in-memory rate limit keyed by client IP. This only protects a single Worker
// isolate — Cloudflare can route requests to many isolates/PoPs, so a determined abuser
// spread across edge locations won't be fully caught by this alone. It's still a real
// deterrent against basic repeat-submission bots/spam, and needs no new Cloudflare bindings.
// A stronger guarantee would need Cloudflare's own Rate Limiting rules (dashboard-configured)
// or a KV/Durable Object-backed counter — out of scope here.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  requestLog.set(ip, timestamps);

  // Bound memory: drop IPs with no recent activity once the map grows large.
  if (requestLog.size > 5000) {
    for (const [key, times] of requestLog) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) requestLog.delete(key);
    }
  }

  return timestamps.length > RATE_LIMIT_MAX_REQUESTS;
}

function getClientIp(request: Request): string {
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_CATEGORIES = [
  "online-class",
  "resource",
  "teacher-support",
  "technical-support",
] as const;

const MAX_NAME_LENGTH = 120;
const MIN_MESSAGE_LENGTH = 10;
const MAX_MESSAGE_LENGTH = 4000;

interface ContactPayload {
  name: string;
  email: string;
  category: string;
  message: string;
}

function validate(body: unknown): { ok: true; data: ContactPayload } | { ok: false; error: string } {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "Request body must be a JSON object." };
  }
  const { name, email, category, message } = body as Record<string, unknown>;

  if (typeof name !== "string" || name.trim().length === 0) {
    return { ok: false, error: "Name is required." };
  }
  if (name.trim().length > MAX_NAME_LENGTH) {
    return { ok: false, error: `Name must be ${MAX_NAME_LENGTH} characters or fewer.` };
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return { ok: false, error: "A valid email address is required." };
  }
  if (typeof category !== "string" || !VALID_CATEGORIES.includes(category as (typeof VALID_CATEGORIES)[number])) {
    return { ok: false, error: "A valid enquiry category is required." };
  }
  if (typeof message !== "string" || message.trim().length < MIN_MESSAGE_LENGTH) {
    return { ok: false, error: `Message must be at least ${MIN_MESSAGE_LENGTH} characters.` };
  }
  if (message.trim().length > MAX_MESSAGE_LENGTH) {
    return { ok: false, error: `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer.` };
  }

  return {
    ok: true,
    data: { name: name.trim(), email: email.trim(), category, message: message.trim() },
  };
}

// Swap point for production: replace this log with a call to an email/notification
// service (e.g. a Cloudflare Worker hitting Resend/SendGrid/Mailchannels) — the
// validated payload shape below is already what that call would need.
async function deliverEnquiry(payload: ContactPayload): Promise<void> {
  console.log("[contact-enquiry]", payload);
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const result = validate(body);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }

  await deliverEnquiry(result.data);

  return NextResponse.json({ ok: true });
}
