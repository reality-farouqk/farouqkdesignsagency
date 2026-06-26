import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import FinalCta from "@/components/FinalCta";
import { getCaseStudyBySlug, getCaseStudies, type CaseStudyPreview } from "@/lib/sanity";

export async function generateStaticParams() {
  const caseStudies = await getCaseStudies();
  return caseStudies
    .filter((cs): cs is CaseStudyPreview => typeof cs.slug === "string")
    .map((cs) => ({ slug: cs.slug }));
}

const limitMeta = (value: string, max: number) => {
  const clean = value.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trimEnd()}…`;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug);
  if (!cs) return {};
  return {
    title: limitMeta(`${cs.title} | Farouqk Designs`, 55),
    description: limitMeta(cs.summary ?? "A case study showing how custom websites and SEO can improve trust and conversion.", 155),
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug);
  if (!cs) notFound();

  return (
    <>
      <section className="border-b border-line bg-bg-sunken">
        <div className="container-grid py-16 md:py-20">
          <Link
            href="/case-studies"
            className="font-mono text-[12px] uppercase tracking-wide text-ink-3 hover:text-accent transition-colors"
          >
            ← All Case Studies
          </Link>
          <p className="eyebrow text-accent mt-8 mb-5">
            {cs.projectType ?? cs.clientName ?? "Case Study"}
          </p>
          <h1 className="font-display font-semibold text-[clamp(1.9rem,4vw,2.9rem)] leading-[1.12] tracking-tight text-ink max-w-3xl">
            {cs.title}
          </h1>
        </div>
      </section>

      <section className="border-b border-line bg-bg">
        <div className="container-grid py-16 md:py-20">
          <div className="border border-line rounded-lg overflow-hidden divide-y divide-line bg-bg-raised max-w-3xl">
            <div className="p-7">
              <div className="flex items-center gap-3 mb-3">
                <span className="status-dot rounded-full bg-risk" />
                <p className="font-mono text-[12px] uppercase tracking-wide text-risk">
                  Challenge
                </p>
              </div>
              <div className="space-y-4 text-[15.5px] leading-relaxed text-ink">
                {cs.challenge?.map((block, idx) => (
                  <p key={idx}>{block?.children?.[0]?.text ?? ""}</p>
                ))}
              </div>
            </div>
            <div className="p-7">
              <div className="flex items-center gap-3 mb-3">
                <span className="status-dot rounded-full bg-pending" />
                <p className="font-mono text-[12px] uppercase tracking-wide text-pending">
                  Solution
                </p>
              </div>
              <div className="space-y-4 text-[15.5px] leading-relaxed text-ink">
                {cs.solution?.map((block, idx) => (
                  <p key={idx}>{block?.children?.[0]?.text ?? ""}</p>
                ))}
              </div>
            </div>
            <div className="p-7">
              <div className="flex items-center gap-3 mb-3">
                <span className="status-dot rounded-full bg-ready" />
                <p className="font-mono text-[12px] uppercase tracking-wide text-ready">
                  Result
                </p>
              </div>
              <p className="text-[15.5px] leading-relaxed text-ink">
                {cs.result}
              </p>
            </div>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
