import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ServicesDetail from "@/components/ServicesDetail";
import Deliverables from "@/components/Deliverables";
import Process from "@/components/Process";
import FinalCta from "@/components/FinalCta";

export const metadata: Metadata = {
  title: "Web Design & SEO for Service Brands | Farouqk Designs",
  description:
    "Custom web design, local SEO, and lead generation for service businesses that want more calls, bookings, and qualified enquiries.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="What we help electrical companies with"
        description="We don't just build websites — we build tools that help you win contracts."
      />
      <ServicesDetail />
      <Deliverables />
      <Process />
      <FinalCta />
    </>
  );
}
