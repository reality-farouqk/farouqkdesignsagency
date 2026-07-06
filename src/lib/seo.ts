import type { Metadata } from "next";

export const SITE_URL = "https://www.farouqkdesigns.com";
export const SITE_NAME = "Farouqk Designs";

export const DEFAULT_KEYWORDS = [
  "web design for home service businesses",
  "electrician website design",
  "plumber website design",
  "HVAC website design",
  "local SEO for trades",
  "lead generation for contractors",
  "renovation contractor website",
  "interior design website",
  "AI SEO for local business",
  "Google Business Profile optimisation",
] as const;

export const DEFAULT_DESCRIPTION =
  "Web design, local SEO, and lead generation for electricians, plumbers, HVAC, and home service businesses. Get a website that books jobs.";

export const DEFAULT_TITLE =
  "Web Design & Local SEO for Home Service Businesses | Farouqk Designs";

export const FALLBACK_INDUSTRY_SLUGS = [
  "electrical",
  "plumbing",
  "hvac",
  "renovation",
  "interior-design",
] as const;

export function limitMeta(value: string, max: number): string {
  const clean = value.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trimEnd()}…`;
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized === "/" ? "" : normalized}`.replace(/\/$/, "") || SITE_URL;
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
};

export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  type = "website",
  publishedTime,
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const safeTitle = limitMeta(title, 60);
  const safeDescription = limitMeta(description, 160);

  return {
    title: safeTitle,
    description: safeDescription,
    keywords: keywords ?? [...DEFAULT_KEYWORDS],
    alternates: { canonical: url },
    openGraph: {
      title: safeTitle,
      description: safeDescription,
      url,
      siteName: SITE_NAME,
      type,
      locale: "en_US",
      ...(publishedTime ? { publishedTime } : {}),
      images: [
        {
          url: "/logo.png",
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} logo`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: safeTitle,
      description: safeDescription,
      images: [{ url: "/logo.png", alt: `${SITE_NAME} logo` }],
    },
  };
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  email: "hello@farouqkdesigns.com",
  sameAs: [
    "https://www.linkedin.com/in/farouqkdesigns",
    "https://www.instagram.com/farouqkdesigns",
  ],
};

export const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/logo.png`,
  email: "hello@farouqkdesigns.com",
  telephone: "+2348107558507",
  description: "Farouqk Designs builds high-converting websites and local SEO systems for home service businesses — electricians, plumbers, HVAC companies, and renovation contractors.",
  areaServed: {
    "@type": "Country",
    name: "Nigeria",
  },
  sameAs: [
    "https://wa.me/+2348107558507"
  ],
  makesOffer: [
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Website Design for Home Service Businesses" } },
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Local SEO" } },
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI SEO / Answer Engine Optimization" } },
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI-Powered Lead Generation" } },
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Google Business Profile Optimization" } }
  ]
};

export function buildIndustryServiceSchema({
  serviceType,
  description,
}: {
  serviceType: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType,
    provider: {
      "@type": "ProfessionalService",
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
    },
    areaServed: {
      "@type": "Country",
      name: "Nigeria",
    },
    description,
  };
}

export function buildFaqSchema(
  items: ReadonlyArray<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildArticleSchema({
  title,
  description,
  path,
  datePublished,
}: {
  title: string;
  description: string;
  path: string;
  datePublished?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: absoluteUrl(path),
    datePublished: datePublished ?? new Date().toISOString(),
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
  };
}
