export default function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="border-b border-line bg-bg-sunken">
      <div className="container-grid py-16 md:py-20">
        <p className="eyebrow text-accent mb-5">{eyebrow}</p>
        <h1 className="font-display font-semibold text-[clamp(2rem,4.2vw,3.1rem)] leading-[1.1] tracking-tight text-ink max-w-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-6 text-[17px] leading-relaxed text-ink-2 max-w-2xl">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
