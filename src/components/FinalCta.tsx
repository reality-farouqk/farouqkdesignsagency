import Link from "next/link";

export default function FinalCta() {
  return (
    <section style={{ background: "var(--bg-sunken)", color: "var(--ink)" }}>
      <div className="wrap" style={{ paddingBlock: "5rem", textAlign: "center" }}>
        <p className="eyebrow" style={{ color: "var(--accent)", marginBottom: "1.25rem", textTransform: "capitalize" }}>Ready to grow?</p>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3.2rem)", lineHeight: 1.1, letterSpacing: "-0.025em", maxWidth: "36rem", margin: "0 auto" }}>
          Let&apos;s make your{" "}
          <em style={{ fontStyle: "italic", color: "var(--accent)", fontFamily: "var(--font-display2)" }}>phone ring.</em>
        </h2>
        <p style={{ marginTop: "1.25rem", fontSize: 17, color: "var(--ink-2)", maxWidth: "28rem", margin: "1.25rem auto 0" }}>
          Free audit. No pressure. We&apos;ll show you exactly what&apos;s holding your business back online and how to fix it.
        </p>
        <div style={{ marginTop: "2.5rem", display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}>
          <Link
            href="/contact"
            style={{
              display: "inline-flex md:block", alignItems: "center", gap: 8,
              background: "var(--accent)", color: "#fff",
              padding: "0.9rem 2rem",
              fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase",
              borderRadius: "var(--radius-sm)", textDecoration: "none", fontWeight: 500, textAlign: "center",
            }}
          >
            Get my free website audit
          </Link>
          <a
            href="https://wa.me/+2348107558507"
            style={{
              display: "inline-flex md:block", alignItems: "center", gap: 8,
              border: "1px solid var(--line-strong)", color: "var(--ink-2)",
              padding: "0.9rem 2rem",
              fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase",
              borderRadius: "var(--radius-sm)", textDecoration: "none", textAlign: "center", maxWidth: "100%",
            }}
          >
            WhatsApp us
          </a>
        </div>
        <p style={{ marginTop: "1.5rem", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)" }}>
          Typically respond within 2 hours · No obligation
        </p>
      </div>
    </section>
  );
}
