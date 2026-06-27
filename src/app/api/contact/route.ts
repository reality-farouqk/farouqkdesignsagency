import { NextRequest, NextResponse } from "next/server";
import { checkContactRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

type ContactPayload = {
  name: string;
  company: string;
  email: string;
  phone?: string;
  message: string;
  _gotcha?: string;
};

const LIMITS = {
  name: 120,
  company: 120,
  email: 254,
  phone: 40,
  message: 5000,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function trimField(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function parsePayload(body: unknown): ContactPayload | null {
  if (!body || typeof body !== "object") return null;

  const data = body as Record<string, unknown>;

  return {
    name: trimField(data.name, LIMITS.name),
    company: trimField(data.company, LIMITS.company),
    email: trimField(data.email, LIMITS.email),
    phone: trimField(data.phone, LIMITS.phone) || undefined,
    message: trimField(data.message, LIMITS.message),
    _gotcha: trimField(data._gotcha, 100) || undefined,
  };
}

async function sendEmail(payload: ContactPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    throw new Error("Email service is not configured");
  }

  const safeName = escapeHtml(payload.name);
  const safeCompany = escapeHtml(payload.company);
  const safeEmail = escapeHtml(payload.email);
  const safePhone = escapeHtml(payload.phone || "Not provided");
  const safeMessage = escapeHtml(payload.message).replace(/\n/g, "<br />");

  const html = `
    <h2>New website enquiry</h2>
    <p><strong>Name:</strong> ${safeName}</p>
    <p><strong>Company:</strong> ${safeCompany}</p>
    <p><strong>Email:</strong> ${safeEmail}</p>
    <p><strong>Phone:</strong> ${safePhone}</p>
    <p><strong>Message:</strong></p>
    <p>${safeMessage}</p>
  `;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: payload.email,
        subject: `New enquiry from ${payload.name.replace(/[\r\n]/g, " ").slice(0, 120)}`,
        html,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorText = await response.text();
      const message =
        errorText.includes("gmail.com domain is not verified") ||
        errorText.includes("domain is not verified")
          ? "Resend rejected the sender address because the domain is not verified. Use an address from a verified domain or verify your domain in Resend."
          : "Email service request failed";

      throw new Error(message);
    }
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function POST(req: NextRequest) {
  try {
    const rateLimit = await checkContactRateLimit(req);

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error:
            "Too many messages sent recently. Please try again later or contact us on WhatsApp.",
        },
        {
          status: 429,
          headers: rateLimit.reset
            ? { "Retry-After": String(Math.ceil((rateLimit.reset - Date.now()) / 1000)) }
            : undefined,
        }
      );
    }

    const body = await req.json();
    const payload = parsePayload(body);

    if (!payload) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    if (payload._gotcha) {
      return NextResponse.json({ ok: true });
    }

    const { name, company, email, message, phone } = payload;

    if (!name || !company || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!EMAIL_PATTERN.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    await sendEmail({ name, company, email, phone, message });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to send contact email", error);

    return NextResponse.json(
      {
        error:
          "Unable to send your message right now. Please try WhatsApp or email us directly.",
      },
      { status: 500 }
    );
  }
}
