import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import FinalCta from "@/components/FinalCta";
import { getCaseStudies } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Case Studies for Service Brands | Farouqk Designs",
  description:
    "See how we improve visibility, trust, and conversion for service businesses with custom websites and SEO.",
};

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies();

  return (
    <>
      <PageHeader
        eyebrow="Proof"
        title="Projects that improved business credibility"
        description="Real outcomes from electrical and engineering companies who needed to look as credible as the work they actually do."
      />

      <section className="border-b border-line bg-bg">
        <div className="container-grid py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line">
            {caseStudies.map((cs) => (
              <Link
                key={cs.slug}
                href={`/case-studies/${cs.slug}`}
                className="group bg-bg-raised p-8 hover:bg-bg-sunken transition-colors"
              >
                <p className="font-mono text-[11.5px] uppercase tracking-wide text-ink-3 mb-6">
                  {cs.projectType ?? cs.clientName ?? "Case Study"}
                </p>
                <h2 className="font-display font-semibold text-[20px] text-ink mb-4 leading-snug">
                  {cs.title}
                </h2>
                <p className="text-[14.5px] text-ink-2 leading-relaxed mb-7">
                  {cs.summary}
                </p>
                <span className="font-mono text-[12.5px] uppercase tracking-wide text-accent group-hover:gap-3 inline-flex items-center gap-2 transition-all">
                  Read case study →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
