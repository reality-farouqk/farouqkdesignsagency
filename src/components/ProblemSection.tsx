// Icon components
function IconSearch() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}
function IconBrowser() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="18" rx="2" />
      <path d="M2 9h20" />
      <circle cx="6" cy="6" r="1" fill="currentColor" stroke="none" />
      <circle cx="9.5" cy="6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function IconFunnel() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
    </svg>
  );
}
function IconTrophy() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 21h8M12 17v4" />
      <path d="M7 4H4a2 2 0 0 0-2 2v1a5 5 0 0 0 5 5" />
      <path d="M17 4h3a2 2 0 0 1 2 2v1a5 5 0 0 1-5 5" />
      <path d="M12 17a7 7 0 0 0 7-7V4H5v6a7 7 0 0 0 7 7z" />
    </svg>
  );
}

const PROBLEMS = [
  {
    Icon: IconSearch,
    title: "Homeowners can't find you",
    body: "If you're not on page one of Google when someone searches 'electrician near me,' that job goes to a competitor. Every time.",
  },
  {
    Icon: IconBrowser,
    title: "Your website looks like it's from 2012",
    body: "Homeowners judge trust in under 3 seconds. An outdated site tells them you're either too busy to care or not established enough.",
  },
  {
    Icon: IconFunnel,
    title: "No system for capturing leads",
    body: "Missed calls and vague WhatsApp messages aren't a pipeline. You need a website that qualifies and books jobs automatically.",
  },
  {
    Icon: IconTrophy,
    title: "Bigger contractors win on perception",
    body: "Your work might be better. But if the other guy looks more professional online, he gets the call — and the contract.",
  },
];

export default function ProblemSection() {
  return (
    <section style={{ borderBottom: "1px solid var(--line)", background: "var(--bg)" }}>
      <div className="wrap" style={{ paddingBlock: "5rem" }}>
        <div style={{ maxWidth: "38rem", marginBottom: "3.5rem" }}>
          <p className="eyebrow" style={{ color: "var(--red)", marginBottom: "1rem" }}>The Real Problem</p>
          <h2 style={{ fontFamily: "var(--font-display)", textTransform: "capitalize", fontWeight: 700, fontSize: "clamp(1.7rem, 3.2vw, 2.5rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--ink)" }}>
            Good tradespeople lose jobs every day — not because of their work, but because of how they look online.
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1px", background: "var(--line)" }}>
          {PROBLEMS.map((p) => (
            <div
              key={p.title}
              className="problem-card group"
              style={{ background: "var(--bg-raised)", padding: "1.75rem", transition: "background 0.2s, transform 0.2s", cursor: "default" }}
            >
              <span
                className="problem-icon"
                style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  width: 44, height: 44, borderRadius: "var(--radius)",
                  background: "var(--accent-dim)", color: "var(--accent)",
                  marginBottom: "1.1rem",
                  transition: "background 0.2s, color 0.2s",
                }}
              >
                <p.Icon />
              </span>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 16, color: "var(--ink)", marginBottom: "0.6rem" }}>
                {p.title}
              </h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.65, color: "var(--ink-3)" }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .problem-card:hover {
          background: var(--bg-sunken) !important;
          transform: translateY(-2px);
        }
        .problem-card:hover .problem-icon {
          background: var(--accent) !important;
          color: #fff !important;
        }
      `}</style>
    </section>
  );
}
