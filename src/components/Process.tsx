const STEPS = [
  {
    n: "01",
    title: "Discovery",
    description: "We understand your services, projects, and goals.",
  },
  {
    n: "02",
    title: "Structure & Strategy",
    description: "We map your services into a clear website system.",
  },
  {
    n: "03",
    title: "Design",
    description: "We create a professional, trust-focused interface.",
  },
  {
    n: "04",
    title: "Development",
    description: "We build your website for speed and mobile users.",
  },
  {
    n: "05",
    title: "Launch",
    description: "Your new digital presence goes live.",
  },
];

export default function Process() {
  return (
    <section className="border-b border-line bg-bg-sunken">
      <div className="container-grid py-20 md:py-28">
        <div className="mb-14 max-w-xl">
          <p className="eyebrow text-accent mb-4">Process</p>
          <h2 className="font-display font-semibold text-[clamp(1.7rem,3.2vw,2.5rem)] leading-[1.15] tracking-tight text-ink">
            Simple process, no technical stress
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 border border-line divide-y md:divide-y-0 md:divide-x divide-line rounded-lg overflow-hidden">
          {STEPS.map((step) => (
            <div key={step.n} className="bg-bg-raised p-6">
              <span className="font-mono text-[13px] text-accent">
                {step.n}
              </span>
              <h3 className="font-display font-semibold text-[15.5px] text-ink mt-4 mb-2">
                {step.title}
              </h3>
              <p className="text-[13.5px] leading-relaxed text-ink-3">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
