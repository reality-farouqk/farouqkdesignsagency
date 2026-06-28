import type { Metadata } from "next";
import Link from "next/link";
import { getIndustries } from "@/lib/sanity";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Websites for Electricians, Plumbers, HVAC & Trades",
  description:
    "Industry-specific websites and local SEO for electricians, plumbers, HVAC, renovation contractors, and interior designers.",
  path: "/industries",
});

const FALLBACK_INDUSTRIES = [
  { slug: "electrical", title: "Electrical", eyebrow: "For Electricians", heroSubheadline: "Websites that make homeowners call you first." },
  { slug: "plumbing", title: "Plumbing", eyebrow: "For Plumbers", heroSubheadline: "Get found fast when pipes burst and phones ring." },
  { slug: "hvac", title: "HVAC", eyebrow: "For HVAC Companies", heroSubheadline: "Win installs and service contracts all year round." },
  { slug: "renovation", title: "Renovation", eyebrow: "For Renovation Contractors", heroSubheadline: "Show your best projects and win the quote." },
  { slug: "interior-design", title: "Interior Design", eyebrow: "For Interior Designers", heroSubheadline: "A portfolio that gets you booked months ahead." },
];

export default async function IndustriesPage() {
  const industries = await getIndustries().catch(() => []);
  const display = industries.length > 0 ? industries : FALLBACK_INDUSTRIES;

  return (
    <>
      <section style={{ borderBottom: "1px solid var(--line)" }}>
        <div className="wrap" style={{ paddingBlock: "4rem" }}>
          <p className="eyebrow" style={{ color: "var(--accent)", marginBottom: "1rem" }}>Industries</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "capitalize", fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1, letterSpacing: "-0.025em", color: "var(--ink)", maxWidth: "36rem" }}>
            Built for your trade. Not a generic template.
          </h1>
          <p style={{ marginTop: "1rem", fontSize: 17, lineHeight: 1.7, color: "var(--ink-3)", maxWidth: "32rem" }}>
            Each industry page is a dedicated site experience tailored to how
            homeowners search, think, and decide in that sector.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--bg-sunken)" }}>
        <div className="wrap" style={{ paddingBlock: "4rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1px", background: "var(--line)" }}>
            {display.map((ind) => (
              <Link
                key={ind.slug}
                href={`/industries/${ind.slug}`}
                style={{ display: "block", background: "var(--bg-raised)", padding: "2rem", textDecoration: "none" }}
              >
                <p className="eyebrow" style={{ color: "var(--accent)", marginBottom: "0.75rem" }}>
                  {ind.eyebrow ?? ind.title}
                </p>
                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 20, color: "var(--ink)", marginBottom: "0.5rem" }}>
                  {ind.title}
                </h2>
                {ind.heroSubheadline && (
                  <p style={{ fontSize: 14, color: "var(--ink-3)", lineHeight: 1.55 }}>{ind.heroSubheadline}</p>
                )}
                <p style={{ marginTop: "1.25rem", fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)" }}>
                  View industry page →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
