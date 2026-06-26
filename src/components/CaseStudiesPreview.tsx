import Link from "next/link";
import type { CaseStudyPreview } from "@/lib/sanity";

export default function CaseStudiesPreview({ caseStudies }: { caseStudies: CaseStudyPreview[] }) {
  return (
    <section style={{ borderBottom: "1px solid var(--line)", background: "var(--bg)" }}>
      <div className="wrap" style={{ paddingBlock: "5rem" }}>
        <div style={{ marginBottom: "3rem" }}>
          <p className="eyebrow" style={{ color: "var(--accent)", marginBottom: "0.75rem" }}>Proof</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.7rem, 3.2vw, 2.5rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--ink)", maxWidth: "34rem" }}>
            Real businesses. Real results.
          </h2>
        </div>

        {caseStudies.length === 0 ? (
          <div style={{ border: "1px solid var(--line)", borderRadius: "var(--radius-lg)", padding: "3rem", textAlign: "center" }}>
            <p style={{ color: "var(--ink-3)", fontFamily: "var(--font-mono)", fontSize: 13 }}>Case studies coming soon.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1px", background: "var(--line)" }}>
            {caseStudies.map((cs) => (
              <Link
                key={cs.slug}
                href={`/case-studies/${cs.slug}`}
                style={{ display: "block", background: "var(--bg-raised)", padding: "2rem", textDecoration: "none" }}
              >
                <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: "1.25rem" }}>
                  {cs.projectType ?? cs.clientName ?? "Case Study"}
                </p>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 19, color: "var(--ink)", marginBottom: "1.25rem", lineHeight: 1.25 }}>
                  {cs.title}
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.75rem" }}>
                  <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--red)", flexShrink: 0, marginTop: 5 }} />
                    <p style={{ fontSize: 14, color: "var(--ink-3)", lineHeight: 1.55 }}>
                      <span style={{ color: "var(--ink)", fontWeight: 500 }}>Problem: </span>{cs.summary}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--green)", flexShrink: 0, marginTop: 5 }} />
                    <p style={{ fontSize: 14, color: "var(--ink-3)", lineHeight: 1.55 }}>
                      <span style={{ color: "var(--ink)", fontWeight: 500 }}>Result: </span>{cs.result}
                    </p>
                  </div>
                </div>

                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)" }}>
                  Read case study →
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
