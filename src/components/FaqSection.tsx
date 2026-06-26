import Faq from "./Faq";
import { homeFaq } from "@/lib/faq-data";

export default function FaqSection() {
  return (
    <section className="border-b border-line bg-bg">
      <div className="container-grid py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-accent mb-4">FAQ</p>
            <h2 className="font-display font-semibold capitalize text-[clamp(1.7rem,3vw,2.25rem)] leading-[1.15] tracking-tight text-ink">
              Got questions? Here&rsquo;s what we hear most.
            </h2>
          </div>
          <div className="lg:col-span-8">
            <Faq items={[...homeFaq]} />
          </div>
        </div>
      </div>
    </section>
  );
}
