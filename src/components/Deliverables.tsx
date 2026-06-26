const DELIVERABLES = [
  "Full company website",
  "Service pages tailored to your industry",
  "Professional project showcase",
  "Mobile-friendly design",
  "WhatsApp enquiry system",
  "Local SEO",
  "AI SEO setup",
  "AI-powered lead generation system",
  "Company profile PDF version (Free add-on)",
];

export default function Deliverables() {
  return (
    <section className="border-b border-line bg-bg">
      <div className="container-grid py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow text-accent mb-5">What You Get</p>
            <h2 className="font-display font-semibold text-[clamp(1.7rem,3.2vw,2.5rem)] leading-[1.15] tracking-tight text-ink">
              Everything you need to look like a serious engineering firm
            </h2>
          </div>

          <div className="lg:col-span-7">
            <div className="border border-line rounded-lg overflow-hidden bg-bg-raised">
              {DELIVERABLES.map((item, i) => (
                <div
                  key={item}
                  className={`flex items-center gap-4 p-5 ${
                    i !== DELIVERABLES.length - 1
                      ? "border-b border-line"
                      : ""
                  }`}
                >
                  <span className="status-dot rounded-full bg-ready" />
                  <span className="text-[15px] text-ink">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
