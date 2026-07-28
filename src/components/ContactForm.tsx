"use client";

import { useRef, useState, FormEvent } from "react";
import { trackEvent } from "@/lib/gtag";

type Status = "idle" | "submitting" | "success" | "error";

const FORM_NAME = "contact";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // Guards against firing multiple validation_error events for a single
  // submit click when several fields are invalid at once.
  const invalidFiredRef = useRef(false);

  // Fires once per submit click, before native HTML5 validation runs.
  // If validation fails, the browser blocks the submit event, so this is
  // the only reliable place to log "the user tried to submit."
  function handleSubmitAttemptClick() {
    invalidFiredRef.current = false;
    trackEvent("form_submit_attempt", { form_name: FORM_NAME });
  }

  // Native validation failure (empty required field, bad email format, etc).
  // The `invalid` event doesn't bubble, so it's caught here via the
  // capture-phase handler on the <form>. Multiple fields can fire at once;
  // the ref ensures we only log one event per attempt.
  function handleInvalidCapture() {
    if (invalidFiredRef.current) return;
    invalidFiredRef.current = true;
    trackEvent("form_submit_invalid", { form_name: FORM_NAME });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement)
        .value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
      _gotcha: (form.elements.namedItem("_gotcha") as HTMLInputElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(body?.error || "Request failed");
      }
      setStatus("success");
      trackEvent("form_submit_success", { form_name: FORM_NAME });
      // Standard GA4 recommended event for lead-gen forms — makes this
      // usable directly as a conversion in GA4 without extra config.
      trackEvent("generate_lead", { form_name: FORM_NAME });
      form.reset();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong sending your message.";
      setStatus("error");
      setErrorMessage(message);
      trackEvent("form_submit_error", {
        form_name: FORM_NAME,
        error_message: message,
      });
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
    <form
      onSubmit={handleSubmit}
      onInvalidCapture={handleInvalidCapture}
      className="border border-line rounded-lg bg-bg-raised p-7 md:p-8"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Full Name" name="name" required />
        <Field label="Company Name" name="company" required />
        <Field label="Email Address" name="email" type="email" required />
        <Field label="Phone / WhatsApp" name="phone" type="tel" />
      </div>

      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="_gotcha">Leave blank</label>
        <input
          id="_gotcha"
          name="_gotcha"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
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
          {errorMessage ||
            "Something went wrong sending your message. Please try WhatsApp instead, or try again."}
        </p>
      )}

      <button
        type="submit"
        onClick={handleSubmitAttemptClick}
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
