import Link from "next/link";

const STATS = [
  { value: "3×", label: "More inbound leads" },
  { value: "14d", label: "Avg. delivery time" },
  { value: "100%", label: "Mobile-first builds" },
];

const CHECKLIST = [
  { label: "Professional website", done: true },
  { label: "Service area pages", done: false },
  { label: "Google Business setup", done: false },
  { label: "Lead capture forms", done: false },
];

export default function Hero() {
  return (
    <section style={{ borderBottom: "1px solid var(--line)" }}>
      <div className="wrap" style={{ paddingBlock: "5rem" }}>
        <div style={{ display: "flex", gap: "3.5rem", alignItems: "center" }} className="flex flex-col md:flex-row">

          {/* Left: Copy */}
          <div className="reveal">
            <p
              className="eyebrow reveal"
              style={{ color: "var(--accent)", marginBottom: "1.25rem" }}
            >
              For Home Service Businesses
            </p>

            <h1
              className="reveal reveal-d1"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
                textTransform: "capitalize",
                lineHeight: 1.04,
                letterSpacing: "-0.025em",
                color: "var(--ink)",
              }}
            >
              Make your<br />
              <em style={{ fontStyle: "italic", color: "var(--brand-teal)", fontFamily: "var(--font-display2)" }}>phone ring 24/7.</em><br />
              Own your market.
            </h1>

            <p
              className="reveal reveal-d2"
              style={{ marginTop: "1.5rem", fontSize: 17, lineHeight: 1.7, color: "var(--ink-2)", maxWidth: "34rem" }}
            >
              We build high-converting websites for electricians, plumbers,
              HVAC companies, and renovation contractors. Not just pretty pages —
              systems designed to book jobs while you sleep.
            </p>

            <div className="reveal reveal-d3" style={{ marginTop: "2.25rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              <Link
                href="/contact"
                className="hero-cta"
                style={{
                  display: "inline-flex md:block", alignItems: "center", gap: 8,
                  background: "var(--accent)", color: "#fff",
                  padding: "0.85rem 1.75rem",
                  fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase",
                  borderRadius: "var(--radius-sm)", textDecoration: "none", fontWeight: 500, textAlign: "center",
                  width: "100%",
                }}
              >
                Get a free Growth audit →
              </Link>
              {/* <Link
                href="/case-studies"
                style={{
                  display: "inline-flex md:block", alignItems: "center", gap: 8,
                  border: "1px solid var(--line-strong)", color: "var(--ink-2)",
                  padding: "0.85rem 1.75rem",
                  fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase",
                  borderRadius: "var(--radius-sm)", textDecoration: "none", textAlign: "md:center",
                  width: "100%",
                }}
              >
                See our work
              </Link> */}
            </div>

            {/* Stats strip */}
            <div style={{ marginTop: "2.5rem", display: "flex", gap: "2rem", flexWrap: "wrap" }}>
              {STATS.map((s) => (
                <div key={s.label}>
                  <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.6rem", color: "var(--ink)", lineHeight: 1 }}>
                    {s.value}
                  </p>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-3)", marginTop: 4 }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Live readiness card */}
          <div className="reveal reveal-d2 mx-auto lg:mr-0" style={{ maxWidth: 420, width: "100%" }}>
            <div
              style={{
                border: "1px solid var(--line)",
                borderRadius: "var(--radius-lg)",
                background: "var(--bg-raised)",
                overflow: "hidden",
              }}
            >
              {/* Card header */}
              <div style={{ padding: "1.1rem 1.4rem", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <p style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14, color: "var(--ink)" }}>
                    Swift Electrical Services
                  </p>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)", marginTop: 2 }}>
                    Digital Presence Score
                  </p>
                </div>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span
                    className="pulse"
                    style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green)", display: "inline-block" }}
                  />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--green)" }}>LIVE</span>
                </span>
              </div>

              {/* Checklist */}
              <div style={{ padding: "1.25rem 1.4rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                {CHECKLIST.map((item) => (
                  <div key={item.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ width: 18, height: 18, borderRadius: "50%", background: item.done ? "var(--green)" : "var(--line-strong)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {item.done && (
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </span>
                      <span style={{ fontSize: 14, color: "var(--ink)" }}>{item.label}</span>
                    </div>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: item.done ? "var(--green)" : "var(--yellow)" }}>
                      {item.done ? "Done" : "Missing"}
                    </span>
                  </div>
                ))}
              </div>

              {/* Score bar */}
              <div style={{ margin: "0 1.4rem 1.4rem", background: "var(--bg-sunken)", borderRadius: "var(--radius-sm)", overflow: "hidden", height: 6 }}>
                <div style={{ width: "25%", height: "100%", background: "var(--accent)", borderRadius: "var(--radius-sm)" }} />
              </div>

              {/* Card footer */}
              <div style={{ padding: "1rem 1.4rem", background: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.5)" }}>
                  Opportunity gap
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 500, color: "var(--accent)" }}>
                3 item to fix
                </span>
              </div>
            </div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)", marginTop: "0.75rem", textAlign: "center" }}>
              This is how a homeowner sees your business online.
              <br /> As a result, they can&apos;t reach or call you. We fix that.
            </p>
          </div>

        </div>
      </div>

      {/* Tailwind helper for 2-col layout */}
      <style>{`.hero-cta { transition: transform 180ms ease, background-color 180ms ease, box-shadow 180ms ease; } .hero-cta:hover { transform: translateY(-2px); background-color: var(--accent-strong); box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12); } .lg\\:grid-cols-hero { grid-template-columns: 1fr 1fr; } @media (max-width: 1023px) { .lg\\:grid-cols-hero { grid-template-columns: 1fr; } }`}</style>
    </section>
  );
}
