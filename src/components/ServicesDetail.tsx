const SERVICES = [
  {
    id: "website",
    n: "01",
    title: "Company Website Design",
    description:
      "A professional engineering website that builds trust with corporate clients and government agencies.",
  },
  {
    id: "service-pages",
    n: "02",
    title: "Service Pages (SEO Optimized)",
    description:
      "Dedicated pages for electrical installation, solar systems, generator installation, industrial wiring, and maintenance services — so clients find you when they search.",
  },
  {
    id: "profile",
    n: "03",
    title: "Company Profile & Capability Statement",
    description:
      "A structured digital profile you can send during bidding and tender processes.",
  },
  {
    id: "portfolio",
    n: "04",
    title: "Project Portfolio System",
    description:
      "Showcase your past work in a professional format that builds credibility instantly.",
  },
  {
    id: "seo",
    n: "05",
    title: "Local SEO Setup",
    description:
      "Appear when companies search “electrical contractors near me,” “solar installation company in [city],” or “industrial electricians.”",
  },
  {
    id: "ai-seo",
    n: "06",
    title: "AI SEO",
    description:
      "Optimise your content and site structure so AI tools and search assistants surface your business when buyers ask for recommendations.",
  },
  {
    id: "ai-leads",
    n: "07",
    title: "AI-Powered Lead Generation",
    description:
      "Use automation, intelligent follow-up, and conversion-focused journeys to turn more visitors into qualified enquiries without constant manual effort.",
  },
  {
    id: "leads",
    n: "08",
    title: "WhatsApp & Lead Integration",
    description: "Turn website visitors into direct enquiries.",
  },
];

export default function ServicesDetail() {
  return (
    <section className="border-b border-line bg-bg">
      <div className="container-grid py-20 md:py-24">
        <div className="border border-line rounded-lg overflow-hidden divide-y divide-line bg-bg-raised">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              id={service.id}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 p-7 md:p-9"
            >
              <div className="md:col-span-1">
                <span className="font-mono text-[13px] text-accent">
                  {service.n}
                </span>
              </div>
              <div className="md:col-span-4">
                <h3 className="font-display font-semibold text-[19px] text-ink leading-snug">
                  {service.title}
                </h3>
              </div>
              <div className="md:col-span-7">
                <p className="text-[15px] leading-relaxed text-ink-2">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
