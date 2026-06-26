"use client";

import { useState, FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement)
        .value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-line rounded-lg bg-bg-raised p-8 flex items-start gap-4">
        <span className="status-dot rounded-full bg-ready mt-1.5" />
        <div>
          <p className="font-display font-semibold text-[16px] text-ink mb-1.5">
            Message received.
          </p>
          <p className="text-[14.5px] text-ink-3 leading-relaxed">
            We&rsquo;ll get back to you within one business day. If it&rsquo;s
            urgent, reach us directly on WhatsApp.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-line rounded-lg bg-bg-raised p-7 md:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Full Name" name="name" required />
        <Field label="Company Name" name="company" required />
        <Field label="Email Address" name="email" type="email" required />
        <Field label="Phone / WhatsApp" name="phone" type="tel" />
      </div>

      <div className="mt-5">
        <label
          htmlFor="message"
          className="font-mono text-[11.5px] uppercase tracking-wide text-ink-3 block mb-2"
        >
          What do you need help with?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full border border-line rounded px-3.5 py-3 text-[14.5px] text-ink bg-bg-sunken focus:bg-bg-raised transition-colors resize-none"
          placeholder="Tell us about your company and what you're looking to achieve."
        />
      </div>

      {status === "error" && (
        <p className="mt-4 text-[13.5px] text-red">
          Something went wrong sending your message. Please try WhatsApp
          instead, or try again.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-flex items-center justify-center gap-2 bg-ink text-bg px-7 py-3.5 text-[14px] font-mono uppercase tracking-wide hover:bg-accent hover:text-white transition-colors disabled:opacity-60 w-full sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="font-mono text-[11.5px] uppercase tracking-wide text-ink-3 block mb-2"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full border border-line rounded px-3.5 py-3 text-[14.5px] text-ink bg-bg-sunken focus:bg-bg-raised transition-colors"
      />
    </div>
  );
}
