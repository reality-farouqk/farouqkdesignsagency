import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import FinalCta from "@/components/FinalCta";
import { getCaseStudies } from "@/lib/sanity";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Case Studies for Home Service Businesses",
  description:
    "See how custom websites and local SEO improved visibility, trust, and inbound enquiries for service businesses.",
  path: "/case-studies",
});

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

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
                <div className="flex items-center gap-3 mb-6">
                  <p className="font-mono text-[11.5px] uppercase tracking-wide text-accent font-semibold">
                    {cs.projectType ?? cs.clientName ?? "Case Study"}
                  </p>
                  {cs.projectDate && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-line animate-pulse" />
                      <p className="font-mono text-[11.5px] text-ink-3">
                        Last updated: {formatDate(cs.projectDate)}
                      </p>
                    </>
                  )}
                </div>
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
