export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "why-electrical-contractors-lose-bids",
    title: "Why Electrical Contractors Lose Bids They're Qualified to Win",
    excerpt:
      "Technical capability rarely loses you a contract. Perception does. Here's what procurement teams actually screen for before they read your quote.",
    category: "Credibility",
    date: "2026-05-12",
    readTime: "6 min read",
    content: [
      "Most electrical contractors assume they lose bids on price or technical fit. In practice, a large share of losses happen before the technical evaluation even starts — at the credibility screen.",
      "Procurement officers and main contractors are pattern-matching against risk. A missing company profile, an outdated or absent website, and a portfolio that lives only in WhatsApp photos all read as risk signals, regardless of how good the underlying work is.",
      "The fix isn't more marketing. It's structured proof: a company profile that mirrors what tender documentation expects, a portfolio organized by project type and scale, and a website that's reachable and current when someone checks you out mid-evaluation.",
    ],
  },
  {
    slug: "company-profile-vs-website",
    title: "Company Profile vs. Website: Do You Need Both?",
    excerpt:
      "A capability statement and a website serve different moments in the buying process. Here's how electrical firms should think about each.",
    category: "Positioning",
    date: "2026-04-28",
    readTime: "5 min read",
    content: [
      "A company profile is a document — built for a specific moment, usually a tender submission or a direct request from a procurement officer. It's static, formal, and structured to match what's being asked for.",
      "A website is persistent. It's what shows up when someone searches your company name after a referral, or searches for the service you offer before they know your name at all.",
      "Firms that rely on only one tend to leak opportunities at the other stage. The profile gets you through the formal gate; the website gets you found in the first place and reinforces credibility after the fact.",
    ],
  },
  {
    slug: "local-seo-for-electrical-companies",
    title: "A Practical Guide to Local SEO for Electrical Companies",
    excerpt:
      "You don't need to rank for everything. You need to show up for the handful of searches that actually produce commercial enquiries.",
    category: "SEO",
    date: "2026-04-09",
    readTime: "7 min read",
    content: [
      "Local SEO for an electrical or solar installation company comes down to a narrow set of high-intent searches: service plus location, and sometimes service plus project type — think 'industrial electrical contractor Lagos' rather than broad terms like 'electrician'.",
      "The foundation is a set of dedicated service pages, each built around one service and the language your actual clients use, not internal jargon. Generic one-page sites tend to compete for nothing in particular and rank for nothing in particular.",
      "From there, consistent business information across your website and listings, paired with real project pages, does most of the remaining work over time.",
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
