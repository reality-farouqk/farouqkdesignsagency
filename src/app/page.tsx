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
import { getCaseStudies, getServices } from "@/lib/sanity";

export default async function Home() {
  const services = await getServices().catch(() => []);
  const caseStudies = await getCaseStudies().catch(() => []);

  return (
    <>
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
