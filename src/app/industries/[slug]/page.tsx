import Link from "next/link";
import { notFound } from "next/navigation";
import { getIndustryBySlug, getIndustries } from "@/lib/sanity";
import type { Metadata } from "next";
import { buildIndustryServiceSchema, buildPageMetadata } from "@/lib/seo";

// Static fallback data so pages render even before CMS content is added
const FALLBACKS: Record<string, {
  eyebrow: string;
  heroHeadline: string;
  heroSubheadline: string;
  ctaHeadline: string;
  painPoints: Array<{ heading: string; body: string }>;
}> = {
  electrical: {
    eyebrow: "For Electricians",
    heroHeadline: "More electrical jobs. Less chasing leads.",
    heroSubheadline: "A professional website that makes homeowners pick up the phone and call you — not your competitor.",
    ctaHeadline: "Ready to get more electrical bookings?",
    painPoints: [
      { heading: "Homeowners can't find you on Google", body: "If you're not ranking locally, those jobs go to someone else. Every day." },
      { heading: "Your current site doesn't build trust", body: "Homeowners let electricians into their homes. They need to trust you before they call." },
      { heading: "No system to capture enquiries 24/7", body: "Missed calls at 10pm mean lost jobs. A good site books jobs while you sleep." },
      { heading: "Competitors look more established", body: "Better presentation wins the quote — even when your work is superior." },
    ],
  },
  plumbing: {
    eyebrow: "For Plumbers",
    heroHeadline: "When pipes burst, make sure they call you first.",
    heroSubheadline: "Emergency and scheduled plumbing jobs — a website built to convert urgent searches into booked callouts.",
    ctaHeadline: "Ready to get more plumbing callouts?",
    painPoints: [
      { heading: "Emergency searches go to paid ads", body: "We help you rank organically so you don't pay for every lead." },
      { heading: "No clear service area on your site", body: "Homeowners want to know you cover their area before they call." },
      { heading: "No social proof visible at a glance", body: "Reviews and before/afters are what convert a searcher into a caller." },
      { heading: "Slow mobile experience", body: "Most emergency searches happen on a phone. Speed wins the job." },
    ],
  },
  hvac: {
    eyebrow: "For HVAC Companies",
    heroHeadline: "Fill your calendar with installs and service contracts.",
    heroSubheadline: "HVAC customers research before they buy. Make sure your site does the selling — so you just do the installing.",
    ctaHeadline: "Ready to win more HVAC contracts?",
    painPoints: [
      { heading: "Seasonal demand is unpredictable", body: "A site optimised for all-year service keeps your diary full in the slow months." },
      { heading: "Customers don't understand the value", body: "We build pages that educate and justify your pricing before they even speak to you." },
      { heading: "No maintenance contract funnel", body: "Recurring revenue starts with a website that sells the plan, not just the call-out." },
      { heading: "Manufacturer and certification pages missing", body: "Trust signals like brand partnerships and certifications close hesitant buyers." },
    ],
  },
  renovation: {
    eyebrow: "For Renovation Contractors",
    heroHeadline: "Win the quote before the site visit.",
    heroSubheadline: "Homeowners planning a renovation compare three or four contractors online. Make sure your website makes the shortlist obvious.",
    ctaHeadline: "Ready to win more renovation projects?",
    painPoints: [
      { heading: "Your portfolio isn't doing the selling", body: "Beautiful work deserves beautiful presentation. Before/afters that convert." },
      { heading: "No clear project scope or pricing guide", body: "Helping homeowners understand cost reduces tyre-kickers and speeds up decisions." },
      { heading: "Slow to respond to quote requests", body: "A website with an instant quote form captures leads before they move on." },
      { heading: "No reviews or testimonials visible", body: "Social proof is the single biggest factor in renovation decisions." },
    ],
  },
  "interior-design": {
    eyebrow: "For Interior Designers",
    heroHeadline: "A portfolio that gets you booked months in advance.",
    heroSubheadline: "Clients who hire interior designers make an emotional decision. Your website needs to inspire confidence — and bookings.",
    ctaHeadline: "Ready to attract your ideal design clients?",
    painPoints: [
      { heading: "Your portfolio isn't searchable", body: "Beautiful images need context, keywords, and structure to rank on Google." },
      { heading: "No clear discovery process on the site", body: "Clients want to know what working with you is like before they commit." },
      { heading: "No lead qualification built in", body: "Filtering out budget-mismatched enquiries before they reach you saves hours." },
      { heading: "Social content doesn't convert", body: "Instagram followers don't pay invoices. Your site needs to close the loop." },
    ],
  },
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = await getIndustryBySlug(slug).catch(() => null);
  const fb = FALLBACKS[slug];
  const titleMap: Record<string, string> = {
    electrical: "Electrician Website Design & Local SEO",
    plumbing: "Plumber Website Design & Local SEO",
    hvac: "HVAC Website Design & Local SEO",
    renovation: "Renovation Contractor Website Design",
    "interior-design": "Interior Design Website & Portfolio",
  };

  if (!industry && !fb) return {};

  return buildPageMetadata({
    title:
      industry?.seoTitle?.replace(/\s*\|\s*Farouqk Designs\s*$/i, "") ??
      (fb ? titleMap[slug] ?? `${fb.eyebrow} Websites` : "Industry Websites"),
    description:
      industry?.seoDescription ??
      (fb
        ? `Custom websites and local SEO for ${slug.replace(/-/g, " ")}${slug === "interior-design" ? " businesses" : " services"}. Rank locally and convert more enquiries.`
        : "Custom websites and local SEO for growing service businesses."),
    path: `/industries/${slug}`,
  });
}

export async function generateStaticParams() {
  const industries = await getIndustries().catch(() => []);
  const fallbackSlugs = Object.keys(FALLBACKS).map((slug) => ({ slug }));
  const cmsSlugs = industries.map((i) => ({ slug: i.slug }));
  const all = [...fallbackSlugs, ...cmsSlugs.filter((c) => !fallbackSlugs.find((f) => f.slug === c.slug))];
  return all;
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const cms = await getIndustryBySlug(slug).catch(() => null);
  const fb = FALLBACKS[slug];

  if (!cms && !fb) notFound();

  const eyebrow       = cms?.eyebrow        ?? fb.eyebrow;
  const heroHeadline  = cms?.heroHeadline   ?? fb.heroHeadline;
  const heroSub       = cms?.heroSubheadline ?? fb.heroSubheadline;
  const ctaHeadline   = cms?.ctaHeadline    ?? fb.ctaHeadline;
  const painPoints    = cms?.painPoints     ?? fb.painPoints;
  const testimonial   = cms?.testimonial;

  const serviceTypeMap: Record<string, string> = {
    electrical: "Website Design for Electricians",
    plumbing: "Website Design for Plumbers",
    hvac: "Website Design for HVAC Companies",
    renovation: "Website Design for Renovation Contractors",
    "interior-design": "Website Design for Interior Designers",
  };
  const serviceType = serviceTypeMap[slug] ?? `Website Design for ${cms?.title ?? slug} Businesses`;

  const descMap: Record<string, string> = {
    electrical: "Website design, local SEO, and lead generation systems built specifically for electrical contractors in Nigeria.",
    plumbing: "Website design, local SEO, and lead generation systems built specifically for plumbing contractors in Nigeria.",
    hvac: "Website design, local SEO, and lead generation systems built specifically for HVAC contractors and service companies in Nigeria.",
    renovation: "Website design, local SEO, and lead generation systems built specifically for renovation contractors and home builders in Nigeria.",
    "interior-design": "Website design, local SEO, and portfolio systems built specifically for interior designers and decorators in Nigeria.",
  };
  const description = cms?.seoDescription ?? descMap[slug] ?? `Website design, local SEO, and lead generation systems built specifically for ${slug} businesses in Nigeria.`;

  const serviceSchema = buildIndustryServiceSchema({ serviceType, description });

  const industryNames: Record<string, string> = {
    electrical: "electricians",
    plumbing: "plumbers",
    hvac: "HVAC companies",
    renovation: "renovation contractors",
    "interior-design": "interior designers",
  };
  const targetName = industryNames[slug] ?? `${cms?.title ?? slug} businesses`;
  const directAnswer = `Farouqk Designs builds websites and local SEO systems for ${targetName} in Nigeria, designed to turn homeowner searches into booked jobs.`;
  const fullHeroSub = `${directAnswer} ${heroSub}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {/* Hero */}
      <section style={{ borderBottom: "1px solid var(--line)", background: "var(--bg)" }}>
        <div className="wrap" style={{ paddingBlock: "5rem" }}>
          <p className="eyebrow" style={{ color: "var(--accent)", marginBottom: "1.25rem" }}>{eyebrow}</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)", lineHeight: 1.06, letterSpacing: "-0.025em", color: "var(--ink)", maxWidth: "38rem" }}>
            {heroHeadline}
          </h1>
          <p style={{ marginTop: "1.25rem", fontSize: 18, lineHeight: 1.7, color: "var(--ink-2)", maxWidth: "32rem" }}>
            {fullHeroSub}
          </p>
          <div style={{ marginTop: "2rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            <Link
              href="/contact"
              style={{ display: "inline-flex", alignItems: "center", background: "var(--accent)", color: "#fff", padding: "0.85rem 1.75rem", fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "var(--radius-sm)", textDecoration: "none" }}
            >
              Get a free audit →
            </Link>
            <Link
              href="/case-studies"
              style={{ display: "inline-flex", alignItems: "center", border: "1px solid var(--line-strong)", color: "var(--ink-2)", padding: "0.85rem 1.75rem", fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "var(--radius-sm)", textDecoration: "none" }}
            >
              See our work
            </Link>
          </div>
        </div>
      </section>

      {/* Pain points */}
      {painPoints && painPoints.length > 0 && (
        <section style={{ borderBottom: "1px solid var(--line)", background: "var(--bg-sunken)" }}>
          <div className="wrap" style={{ paddingBlock: "4.5rem" }}>
            <p className="eyebrow" style={{ color: "var(--red)", marginBottom: "1rem" }}>The Problem</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", lineHeight: 1.2, letterSpacing: "-0.02em", color: "var(--ink)", maxWidth: "30rem", marginBottom: "2.5rem" }}>
              Why most {cms?.title ?? slug} websites don&apos;t generate leads
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1px", background: "var(--line)" }}>
              {painPoints.map((p: { heading: string; body: string }, i: number) => (
                <div key={i} style={{ background: "var(--bg-raised)", padding: "1.75rem" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent)", display: "block", marginBottom: "0.6rem" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 15.5, color: "var(--ink)", marginBottom: "0.5rem" }}>{p.heading}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.65, color: "var(--ink-3)" }}>{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonial */}
      {testimonial?.quote && (
        <section style={{ borderBottom: "1px solid var(--line)", background: "var(--ink)", color: "#fff" }}>
          <div className="wrap" style={{ paddingBlock: "4rem", maxWidth: "44rem" }}>
            <blockquote>
              <p style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)", lineHeight: 1.4, color: "#fff", marginBottom: "1.5rem" }}>
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <footer style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)" }}>
                {testimonial.name}{testimonial.company && ` — ${testimonial.company}`}
              </footer>
            </blockquote>
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ background: "var(--bg)" }}>
        <div className="wrap" style={{ paddingBlock: "5rem", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)", lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--ink)", maxWidth: "32rem", margin: "0 auto" }}>
            {ctaHeadline}
          </h2>
          <p style={{ marginTop: "1rem", fontSize: 16, color: "var(--ink-3)", maxWidth: "26rem", margin: "1rem auto 0" }}>
            Free audit. No pressure. We&apos;ll show you exactly what&apos;s holding your site back.
          </p>
          <div style={{ marginTop: "2rem", display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}>
            <Link
              href="/contact"
              style={{ display: "inline-flex", alignItems: "center", background: "var(--accent)", color: "#fff", padding: "0.85rem 1.75rem", fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "var(--radius-sm)", textDecoration: "none" }}
            >
              Get my free audit →
            </Link>
            <Link
              href="/industries"
              style={{ display: "inline-flex", alignItems: "center", border: "1px solid var(--line-strong)", color: "var(--ink-2)", padding: "0.85rem 1.75rem", fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "var(--radius-sm)", textDecoration: "none" }}
            >
              All industries
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
