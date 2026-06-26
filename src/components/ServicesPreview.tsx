import Link from "next/link";
import type { Service } from "@/lib/sanity";

const FALLBACK_SERVICES = [
  {
    slug: "website",
    title: "Professional Website",
    shortDescription: "A fast, mobile-first site that converts visitors into booked jobs — built to rank and built to impress.",
    stat: "14d avg delivery",
  },
  {
    slug: "service-area-pages",
    title: "Service Area Pages",
    shortDescription: "Dedicated pages for every city and neighbourhood you serve, so you show up when local homeowners search.",
    stat: "Rank in every area",
  },
  {
    slug: "google-business",
    title: "Google Business Setup",
    shortDescription: "A fully optimised Google Business Profile that puts you in the map pack and drives direct calls.",
    stat: "More map pack calls",
  },
  {
    slug: "lead-capture",
    title: "Lead Capture Forms",
    shortDescription: "Smart forms, call tracking, and booking integrations that turn website traffic into qualified enquiries.",
    stat: "3× more enquiries",
  },
  {
    slug: "local-seo",
    title: "Local SEO",
    shortDescription: "On-page and off-page optimisation so you rank above competitors when customers search your services nearby.",
    stat: "#1 on Google",
  },
  {
    slug: "ai-seo",
    title: "AI SEO",
    shortDescription: "Content and structure optimised so AI tools like ChatGPT, Perplexity and Google AI Overviews recommend your business.",
    stat: "Future-proof traffic",
  },
  {
    slug: "ai-leads",
    title: "AI-Powered Lead Generation",
    shortDescription: "Intelligent lead capture and follow-up workflows that help more visitors become booked enquiries with less manual effort.",
    stat: "Smarter conversion",
  },
];

export default function ServicesPreview({ services }: { services: Service[] }) {
  const display = services.length > 0 ? services : FALLBACK_SERVICES;

  return (
    <section style={{ borderBottom: "1px solid var(--line)", background: "var(--bg-sunken)" }}>
      <div className="wrap" style={{ paddingBlock: "5rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1.5rem", marginBottom: "3rem" }}>
          <div>
            <p className="eyebrow" style={{ color: "var(--accent)", marginBottom: "0.75rem" }}>What We Build</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.7rem, 3.2vw, 2.5rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--ink)", maxWidth: "30rem" }}>
              Everything a Home Service Business needs to win Online
            </h2>
          </div>
          <Link
            href="/services"
            style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", textDecoration: "none" }}
          >
            Full service breakdown →
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1px", background: "var(--line)" }}>
          {display.map((s: Service | typeof FALLBACK_SERVICES[0]) => {
            const stat = ("stat" in s) ? s.stat : null;
            return (
              <div
                key={s.slug}
                className="group"
                style={{ background: "var(--bg-raised)", padding: "1.75rem", position: "relative", overflow: "hidden" }}
              >
                {/* Accent top line */}
                <div 
                  className="absolute top-0 left-0 right-0 h-[2px] bg-transparent transition-colors duration-200 group-hover:bg-accent"
                />
                {stat && (
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.75rem" }}>
                    {stat}
                  </p>
                )}
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 16, color: "var(--ink)", marginBottom: "0.6rem" }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: "var(--ink-3)" }}>
                  {s.shortDescription ?? ""}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
