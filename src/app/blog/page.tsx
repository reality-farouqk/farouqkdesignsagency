import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import FinalCta from "@/components/FinalCta";
import { getBlogPosts } from "@/lib/sanity";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Web Design & Local SEO Insights",
  description:
    "Practical articles on web design, local SEO, credibility, and growth for electricians, plumbers, HVAC, and home service businesses.",
  path: "/blog",
});

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogIndexPage() {
  const blogPosts = await getBlogPosts();

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Notes on credibility, positioning, and winning bigger work"
        description="Practical thinking for Home service businesses and local firms ready to grow beyond referrals."
      />

      <section className="border-b border-line bg-bg">
        <div className="container-grid py-16 md:py-20">
          <div className="border border-line rounded-lg overflow-hidden divide-y divide-line bg-bg-raised">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col md:flex-row md:items-center gap-3 md:gap-8 p-7 hover:bg-bg-sunken transition-colors"
              >
                <div className="md:w-40 shrink-0">
                  <p className="font-mono text-[11.5px] uppercase tracking-wide text-accent">
                    {post.category}
                  </p>
                  <p className="font-mono text-[11.5px] text-ink-3 mt-1">
                    Last updated: {formatDate(post.date ?? new Date().toISOString())}
                  </p>
                </div>
                <div className="flex-1">
                  <h2 className="font-display font-semibold text-[18px] text-ink leading-snug group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-[14.5px] text-ink-2 leading-relaxed mt-2 max-w-2xl">
                    {post.excerpt}
                  </p>
                </div>
                <div className="md:w-24 shrink-0 text-right">
                  <span className="font-mono text-[11.5px] text-ink-3">
                    {post.readTime}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
