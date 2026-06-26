const TESTIMONIALS = [
  {
    quote:
      "Umar is the best to work with! His professionalism and creativity shine in every aspect of his work. His communication was clear, proactive, and collaborative — he kept me in the loop at every stage and seamlessly translated my vision into a stunning, functional website. What truly impressed me was his attention to detail. He prioritises customer service, welcomed feedback gracefully, offered smart solutions, and went above and beyond to ensure I was thrilled with the final product.",
    name: "Isreal Anga",
    role: "CEO",
    company: "ParanTechWater",
  },
  {
    quote:
      "I could not be more satisfied with the job and the work that Umar has done. He's an incredible designer — does a really fantastic job putting detailed effort into every element of the website. I would highly, highly recommend you work with him.",
    name: "Ronen Passar",
    role: "Co-Founder",
    company: "Outbound Operators",
  },
];

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" style={{ opacity: 0.15 }}>
      <path d="M10 8C6.134 8 3 11.134 3 15c0 3.866 3.134 7 7 7h1v4l5-4h.5C19.866 22 22 19.866 22 17V8H10zm19 0h-9v9c0 1.866-1.134 3-3 3H16v4l5-4h.5C24.866 22 27 19.866 27 17V8h2z" />
    </svg>
  );
}

export default function Testimonials() {
  return (
    <section style={{ borderBottom: "1px solid var(--line)", background: "var(--bg)" }}>
      <div className="wrap" style={{ paddingBlock: "5rem" }}>
        {/* Header */}
        <div style={{ maxWidth: "38rem", marginBottom: "3rem" }}>
          <p className="eyebrow" style={{ color: "var(--accent)", marginBottom: "1rem" }}>
            Client Stories
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(1.7rem, 3.2vw, 2.5rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
            }}
          >
            Trusted by business owners who needed{" "}
            <em style={{ fontStyle: "normal", color: "var(--accent)" }}>real results</em>
          </h2>
        </div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              style={{
                background: "var(--bg-raised)",
                border: "1px solid var(--line)",
                borderRadius: "var(--radius-lg)",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Decorative quote mark */}
              <div
                style={{
                  position: "absolute",
                  top: "1.25rem",
                  right: "1.25rem",
                  color: "var(--accent)",
                }}
              >
                <QuoteIcon />
              </div>

              {/* Stars */}
              <div style={{ display: "flex", gap: "0.25rem", color: "var(--accent)" }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>

              {/* Quote */}
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.75,
                  color: "var(--ink-2)",
                  flex: 1,
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Divider */}
              <div style={{ borderTop: "1px solid var(--line)", paddingTop: "1.25rem" }}>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: 14,
                    color: "var(--ink)",
                    marginBottom: "0.2rem",
                  }}
                >
                  {t.name}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--ink-3)",
                  }}
                >
                  {t.role} · {t.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
