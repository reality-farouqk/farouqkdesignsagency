export type CaseStudy = {
  slug: string;
  tag: string;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  result: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "industrial-electrical-contractor",
    tag: "Industrial Contractor",
    title: "Industrial Electrical Contractor Website",
    summary:
      "A full company website, service pages, and project portfolio built to support tender applications.",
    problem: "No website — losing commercial bids.",
    solution:
      "Full company website + service pages + project portfolio, structured around what procurement teams look for during evaluation.",
    result: "Improved credibility during tender applications.",
  },
  {
    slug: "solar-installation-company",
    tag: "Solar Installation",
    title: "Solar Installation Company",
    summary:
      "An SEO-focused service website that turned a referral-only business into one with inbound demand.",
    problem: "Relied only on referrals.",
    solution:
      "SEO-focused service website with dedicated pages for residential and commercial solar installation services.",
    result: "Started receiving inbound project enquiries.",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
