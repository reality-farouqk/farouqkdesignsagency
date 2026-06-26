const POINTS = [
  {
    label: "We know home services",
    body: "We only work with trades and home service businesses. We know your customers, your seasonality, and what makes them pick up the phone.",
  },
  {
    label: "Results, not vanity metrics",
    body: "We don't care about how your site looks in design awards. We care about enquiries, calls, and booked jobs. That's what we optimise for.",
  },
  {
    label: "Done in 2 weeks, not 3 months",
    body: "You can't afford to wait. Our process is built for speed — from kickoff call to live website in under 14 days for most projects.",
  },
  {
    label: "You own everything",
    body: "Your domain, your hosting, your code. No lock-in, no ongoing dependency on us unless you want it.",
  },
];

export default function WhyUs() {
  return (
    <section style={{ borderBottom: "1px solid var(--line)", background: "var(--bg-sunken)", color: "var(--ink)" }}>
      <div className="wrap" style={{ paddingBlock: "5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3.5rem", alignItems: "start" }} className="lg:grid-cols-why">
          <div>
            <p className="eyebrow" style={{ color: "var(--accent)", marginBottom: "1.25rem" }}>Why Farouqk Designs</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.7rem, 3.2vw, 2.5rem)", lineHeight: 1.15, letterSpacing: "-0.02em", textTransform: "capitalize" }}>
              Most agencies build websites.<br />We build{" "}
              <em style={{ fontStyle: "normal", color: "var(--accent)" }}>lead machines</em>{" "}
              for trades.
            </h2>
            <p style={{ marginTop: "1.25rem", fontSize: 16, lineHeight: 1.7, color: "var(--ink-2)", maxWidth: "28rem" }}>
              Your clients don&apos;t browse the web to appreciate good design.
              They need a reason to trust you enough to let you into their home.
              We build that reason.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
            {POINTS.map((p, i) => (
              <div
                key={p.label}
                style={{
                  padding: "1.5rem 0",
                  borderTop: "1px solid var(--line)",
                  borderBottom: i === POINTS.length - 1 ? "1px solid var(--line)" : "none",
                  display: "flex", gap: "1.25rem", alignItems: "flex-start",
                }}
              >
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)", flexShrink: 0, paddingTop: 2 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 15, marginBottom: "0.4rem" }}>
                    {p.label}
                  </p>
                  <p style={{ fontSize: 14, lineHeight: 1.65, color: "var(--ink-3)" }}>
                    {p.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`.lg\\:grid-cols-why { grid-template-columns: 1fr 1fr; } @media (max-width: 1023px) { .lg\\:grid-cols-why { grid-template-columns: 1fr; } }`}</style>
    </section>
  );
}
