import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ServicesDetail from "@/components/ServicesDetail";
import Deliverables from "@/components/Deliverables";
import Process from "@/components/Process";
import FinalCta from "@/components/FinalCta";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Web Design, Local SEO & Lead Generation Services",
  description:
    "Custom websites, service pages, local SEO, AI SEO, Google Business setup, and lead capture for home service businesses that want more calls and booked jobs.",
  path: "/services",
});

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
