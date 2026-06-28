import type { Metadata } from "next";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import ProblemSection from "@/components/ProblemSection";
import ServicesPreview from "@/components/ServicesPreview";
import WhyUs from "@/components/WhyUs";
import CaseStudiesPreview from "@/components/CaseStudiesPreview";
import Testimonials from "@/components/Testimonials";
import Qualification from "@/components/Qualification";
import FaqSection from "@/components/FaqSection";
import FinalCta from "@/components/FinalCta";
import { homeFaq } from "@/lib/faq-data";
import { getCaseStudies, getServices } from "@/lib/sanity";
import { buildFaqSchema, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Web Design & Local SEO for Home Service Businesses",
  description:
    "We build high-converting websites for electricians, plumbers, HVAC companies, and renovation contractors — designed to rank locally and book jobs while you sleep.",
  path: "/",
});

const faqSchema = buildFaqSchema(homeFaq);

export default async function Home() {
  const services = await getServices().catch(() => []);
  const caseStudies = await getCaseStudies().catch(() => []);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
      <TrustBar />
      <ProblemSection />
      <ServicesPreview services={services} />
      <WhyUs />
      <CaseStudiesPreview caseStudies={caseStudies} />
      <Testimonials />
      <Qualification />
      <FaqSection />
      <FinalCta />
    </>
  );
}
