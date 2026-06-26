import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactPayload = {
  name: string;
  company: string;
  email: string;
  phone?: string;
  message: string;
};

async function sendEmail(payload: ContactPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    throw new Error("Email service is not configured");
  }

  const html = `
    <h2>New website enquiry</h2>
    <p><strong>Name:</strong> ${payload.name}</p>
    <p><strong>Company:</strong> ${payload.company}</p>
    <p><strong>Email:</strong> ${payload.email}</p>
    <p><strong>Phone:</strong> ${payload.phone || "Not provided"}</p>
    <p><strong>Message:</strong></p>
    <p>${payload.message.replace(/\n/g, "<br />")}</p>
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
        subject: `New enquiry from ${payload.name}`,
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
          : errorText || "Email service request failed";

      throw new Error(message);
    }
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, email, message, phone } = body as ContactPayload;

    if (!name || !company || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
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
