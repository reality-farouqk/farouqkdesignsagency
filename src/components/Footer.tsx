import Link from "next/link";
import Image from "next/image";

const INDUSTRIES = [
  { href: "/industries/electrical", label: "Electrical" },
  { href: "/industries/plumbing", label: "Plumbing" },
  { href: "/industries/hvac", label: "HVAC" },
  { href: "/industries/renovation", label: "Renovation" },
  { href: "/industries/interior-design", label: "Interior Design" },
];

const SERVICES = [
  { href: "/services#website", label: "Website Design" },
  { href: "/services#seo", label: "Local SEO" },
  { href: "/services#ai-seo", label: "AI SEO" },
  { href: "/services#ai-leads", label: "AI Lead Generation" },
  { href: "/services#leads", label: "Lead Capture" },
  { href: "/services#profile", label: "Company Profile" },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--bg-sunken)", borderTop: "1px solid var(--line)" }}>
      <div className="wrap" style={{ paddingBlock: "3.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "2.5rem" }}>
          {/* Brand */}
          <div style={{ gridColumn: "1 / -1", maxWidth: "26rem" }} className="footer-brand">
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.75rem" }}>
              <Image
                src="/logo.png"
                alt="Farouqk Designs"
                width={32}
                height={32}
                style={{ objectFit: "contain", height: 32, width: "auto" }}
              />
              {/* <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, letterSpacing: "-0.01em", color: "var(--ink)" }}>
                FAROUQK DESIGNS
              </span> */}
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: "var(--ink-3)", maxWidth: "22rem" }}>
              Websites that book jobs for home service businesses. Electricians,
              plumbers, HVAC, renovation contractors — we make your phone ring.
            </p>
          </div>

          {/* Industries */}
          <div>
            <p className="eyebrow" style={{ marginBottom: "1rem" }}>Industries</p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {INDUSTRIES.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-ink-2 hover:text-accent transition-colors no-underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="eyebrow" style={{ marginBottom: "1rem" }}>Services</p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {SERVICES.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-ink-2 hover:text-accent transition-colors no-underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="eyebrow" style={{ marginBottom: "1rem" }}>Contact</p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <li>
                <a href="mailto:hello@farouqkdesigns.com" style={{ fontSize: 14, color: "var(--ink-2)", textDecoration: "none" }}>
                  hello@farouqkdesigns.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/+2348107558507" style={{ fontSize: 14, color: "var(--ink-2)", textDecoration: "none" }}>
                  WhatsApp
                </a>
              </li>
              <li>
                <Link href="/contact" style={{ fontSize: 14, color: "var(--accent)", textDecoration: "none", fontWeight: 500 }}>
                  Book a free audit →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ marginTop: "3rem", paddingTop: "1.5rem", borderTop: "1px solid var(--line)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "0.5rem" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)" }}>
            © 2026 Farouqk Designs. All rights reserved.
          </p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)" }}>
            Built for home service businesses.
          </p>
        </div>
      </div>

      <style>{`@media (min-width: 768px) { .footer-brand { grid-column: 1 / 3; } }`}</style>
    </footer>
  );
}
