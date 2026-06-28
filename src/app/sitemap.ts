import type { MetadataRoute } from "next";
import {
  FALLBACK_INDUSTRY_SLUGS,
  SITE_URL,
} from "@/lib/seo";
import {
  getBlogPosts,
  getCaseStudies,
  getIndustries,
} from "@/lib/sanity";

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
  { url: `${SITE_URL}/services`, changeFrequency: "monthly", priority: 0.9 },
  { url: `${SITE_URL}/industries`, changeFrequency: "monthly", priority: 0.9 },
  { url: `${SITE_URL}/case-studies`, changeFrequency: "weekly", priority: 0.85 },
  { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.85 },
  { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.8 },
];

function toLastModified(value?: string): Date | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogPosts, caseStudies, industries] = await Promise.all([
    getBlogPosts().catch(() => []),
    getCaseStudies().catch(() => []),
    getIndustries().catch(() => []),
  ]);

  const industrySlugs =
    industries.length > 0
      ? industries.map((item) => item.slug).filter(Boolean)
      : [...FALLBACK_INDUSTRY_SLUGS];

  const industryRoutes: MetadataRoute.Sitemap = industrySlugs.map((slug) => ({
    url: `${SITE_URL}/industries/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies
    .filter((item) => item.slug)
    .map((item) => ({
      url: `${SITE_URL}/case-studies/${item.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts
    .filter((item) => item.slug)
    .map((item) => ({
      url: `${SITE_URL}/blog/${item.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      lastModified: toLastModified(item.date),
    }));

  return [
    ...STATIC_ROUTES,
    ...industryRoutes,
    ...caseStudyRoutes,
    ...blogRoutes,
  ];
}
