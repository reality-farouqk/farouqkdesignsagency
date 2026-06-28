import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Book a Free Website & SEO Audit",
  description:
    "Contact Farouqk Designs for web design, local SEO, and lead generation. Tell us about your business and get a reply within one business day.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk about your company"
        description="Tell us a bit about your business and what you're trying to achieve. We'll get back to you within one business day."
      />

      <section className="bg-bg">
        <div className="container-grid py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            <div className="lg:col-span-5">
              <p className="eyebrow text-accent mb-4">Direct Contact</p>
              <div className="border border-line rounded-lg overflow-hidden divide-y divide-line bg-bg-raised">
                <a
                  href="mailto:umar@farouqkdesigns.com"
                  className="flex items-center justify-between p-5 hover:bg-bg-sunken transition-colors"
                >
                  <span className="text-[14.5px] text-ink">Email</span>
                  <span className="font-mono text-[13px] text-accent">
                    hello@farouqkdesigns.com
                  </span>
                </a>
                <a
                  href="https://wa.me/+2348107558507"
                  className="flex items-center justify-between p-5 hover:bg-bg-sunken transition-colors"
                >
                  <span className="text-[14.5px] text-ink">WhatsApp</span>
                  <span className="font-mono text-[13px] text-accent">
                    Message us →
                  </span>
                </a>
                <a
                  href="https://www.linkedin.com/in/farouqkdesigns"
                  className="flex items-center justify-between p-5 hover:bg-bg-sunken transition-colors"
                >
                  <span className="text-[14.5px] text-ink">LinkedIn</span>
                  <span className="font-mono text-[13px] text-accent">
                    Connect →
                  </span>
                </a>
              </div>

              <div className="mt-6 border border-line rounded-lg bg-bg-raised p-5">
                <p className="font-mono text-[12px] uppercase tracking-wide text-ink-3 mb-2">
                  Response Time
                </p>
                <p className="text-[14px] text-ink leading-relaxed">
                  We typically reply within one business day. Projects
                  usually take 1–3 weeks from kickoff to launch.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <p className="eyebrow text-accent mb-4">Send a Message</p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
