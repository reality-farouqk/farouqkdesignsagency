const FOR = [
  "You're a tradesperson or home service contractor",
  "You want your phone to ring with quality enquiries",
  "You want to stop losing jobs to competitors who just look better online",
  "You're ready to invest in a system, not just a website",
  "You want to grow beyond word of mouth alone",
];

const NOT_FOR = [
  "You only want the cheapest option available",
  "You think a website is just a digital business card",
  "You're not ready to respond to new leads quickly",
];

export default function Qualification() {
  return (
    <section style={{ borderBottom: "1px solid var(--line)", background: "var(--bg-sunken)" }}>
      <div className="wrap" style={{ paddingBlock: "5rem" }}>
        <div style={{ marginBottom: "3rem" }}>
          <p className="eyebrow" style={{ color: "var(--accent)", marginBottom: "0.75rem" }}>Fit Check</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.7rem, 3.2vw, 2.5rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--ink)" }}>
            Who this is built for
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1px", background: "var(--line)" }}>
          <div style={{ background: "var(--bg-raised)", padding: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1.5rem" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green)", display: "inline-block" }} />
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--green)" }}>
                This is for you if
              </p>
            </div>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
              {FOR.map((item) => (
                <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span style={{ color: "var(--green)", fontSize: 14, lineHeight: 1.5, marginTop: 1, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 14.5, color: "var(--ink)", lineHeight: 1.55 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ background: "var(--bg)", padding: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1.5rem" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--red)", display: "inline-block" }} />
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--red)" }}>
                Not for you if
              </p>
            </div>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
              {NOT_FOR.map((item) => (
                <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span style={{ color: "var(--red)", fontSize: 14, lineHeight: 1.5, marginTop: 1, flexShrink: 0 }}>✗</span>
                  <span style={{ fontSize: 14.5, color: "var(--ink-3)", lineHeight: 1.55 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
