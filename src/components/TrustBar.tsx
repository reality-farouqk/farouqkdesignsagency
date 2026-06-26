const TRADES = [
  "Electrical", "Plumbing", "HVAC", "Renovation", "Interior Design",
  "Roofing", "Landscaping", "Construction",
];

export default function TrustBar() {
  return (
    <div style={{ borderBottom: "1px solid var(--line)", background: "var(--bg-sunken)", overflowX: "auto" }}>
      <div className="wrap" style={{ paddingBlock: "0.85rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", flexWrap: "nowrap", minWidth: "max-content" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 14, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-3)", flexShrink: 0 }}>
            We serve →
          </p>
          {TRADES.map((t, i) => (
            <span key={t} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-2)", whiteSpace: "nowrap" }}>{t}</span>
              {i < TRADES.length - 1 && <span style={{ color: "var(--line-strong)", fontSize: 10 }}>·</span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
