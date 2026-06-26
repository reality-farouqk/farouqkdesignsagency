"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const INDUSTRY_LINKS = [
  { href: "/industries", label: "Overview" },
  { href: "/industries/electrical", label: "Electrical" },
  { href: "/industries/plumbing", label: "Plumbing" },
  { href: "/industries/hvac", label: "HVAC" },
  { href: "/industries/renovation", label: "Renovation" },
  { href: "/industries/interior-design", label: "Interior Design" },
];

const SERVICE_LINKS = [
  { href: "/services", label: "Overview" },
];

const NAV = [
  { href: "/industries", label: "Industries", links: INDUSTRY_LINKS },
  { href: "/services", label: "Services", links: SERVICE_LINKS },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/blog", label: "Blog" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<"industries" | "services" | null>(null);

  const toggleMenu = (menu: "industries" | "services") => {
    setOpenMenu((current) => (current === menu ? null : menu));
  };
  return (
    <header
      style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "color-mix(in srgb, var(--bg) 88%, transparent)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="wrap flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <Image
            src="/logo.png"
            alt="Farouqk Designs"
            width={150}
            height={40}
            style={{ objectFit: "contain", height: 46, width: "auto" }}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center" style={{ gap: "2rem" }}>
          {NAV.map((l) => {
            const menuKey = l.label.toLowerCase() as "industries" | "services";
            const isOpen = openMenu === menuKey;

            return (
              <div key={l.href} style={{ position: "relative" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                  <Link
                    href={l.href}
                    className="font-mono text-[12px] tracking-widest uppercase text-ink-3 hover:text-ink transition-colors no-underline"
                    onClick={() => setOpenMenu(null)}
                  >
                    {l.label}
                  </Link>
                  {l.links && (
                    <button
                      type="button"
                      onClick={() => toggleMenu(menuKey)}
                      aria-expanded={isOpen}
                      aria-label={`Toggle ${l.label} submenu`}
                      style={{ background: "transparent", border: "none", color: "var(--ink-3)", cursor: "pointer", padding: 0, fontSize: 12 }}
                    >
                      ▾
                    </button>
                  )}
                </div>

                {l.links && isOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 0.6rem)",
                      left: 0,
                      minWidth: "10rem",
                      background: "var(--bg-raised)",
                      border: "1px solid var(--line)",
                      borderRadius: "var(--radius-sm)",
                      padding: "0.55rem 0",
                      boxShadow: "0 12px 30px rgba(0, 0, 0, 0.08)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.15rem",
                      zIndex: 60,
                    }}
                  >
                    {l.links.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpenMenu(null)}
                        style={{ padding: "0.5rem 0.8rem", textDecoration: "none", color: "var(--ink-2)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" }}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/contact"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "var(--accent)", color: "#fff",
              padding: "0.55rem 1.1rem",
              fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase",
              borderRadius: "var(--radius-sm)", textDecoration: "none",
            }}
          >
            Book a Call
          </Link>
        </div>

        {/* Hamburger — mobile only, rendered conditionally */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            style={{ width: 36, height: 36, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5, background: "none", border: "none", cursor: "pointer" }}
            aria-label="Toggle menu" aria-expanded={open}
          >
            <span style={{ display: "block", width: 22, height: 1.5, background: "var(--ink)", transition: "transform 0.2s", transform: open ? "translateY(3px) rotate(45deg)" : "none" }} />
            <span style={{ display: "block", width: 22, height: 1.5, background: "var(--ink)", transition: "transform 0.2s", transform: open ? "translateY(-3px) rotate(-45deg)" : "none" }} />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden" style={{ borderTop: "1px solid var(--line)", background: "var(--bg)" }}>
          <nav className="wrap" style={{ display: "flex", flexDirection: "column", paddingBlock: "1rem" }}>
            {NAV.map((l) => {
              const menuKey = l.label.toLowerCase() as "industries" | "services";
              const isOpen = openMenu === menuKey;

              return (
                <div key={l.href} style={{ borderBottom: "1px solid var(--line)" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 0" }}>
                    <Link
                      href={l.href}
                      onClick={() => {
                        setOpen(false);
                        setOpenMenu(null);
                      }}
                      style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-3)", textDecoration: "none" }}
                    >
                      {l.label}
                    </Link>
                    {l.links && (
                      <button
                        type="button"
                        onClick={() => toggleMenu(menuKey)}
                        aria-expanded={isOpen}
                        style={{ background: "transparent", border: "none", color: "var(--ink-3)", cursor: "pointer", padding: 0, fontSize: 12 }}
                      >
                        ▾
                      </button>
                    )}
                  </div>

                  {l.links && isOpen && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem", padding: "0 0 0.8rem 0.75rem" }}>
                      {l.links.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => {
                            setOpen(false);
                            setOpenMenu(null);
                          }}
                          style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-2)", textDecoration: "none" }}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <Link
              href="/contact" onClick={() => setOpen(false)}
              style={{ marginTop: "1rem", display: "inline-flex", justifyContent: "center", background: "var(--accent)", color: "#fff", padding: "0.75rem", fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "var(--radius-sm)", textDecoration: "none" }}
            >
              Book a Call
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
