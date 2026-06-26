import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import FinalCta from "@/components/FinalCta";
import { getBlogPostBySlug, getBlogPosts, type BlogPost } from "@/lib/sanity";

export async function generateStaticParams() {
  const blogPosts = await getBlogPosts();
  return blogPosts
    .filter((post): post is BlogPost => typeof post.slug === "string")
    .map((post) => ({ slug: post.slug }));
}

const limitMeta = (value: string, max: number) => {
  const clean = value.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trimEnd()}…`;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: limitMeta(`${post.title} | Farouqk Designs`, 55),
    description: limitMeta(post.excerpt ?? "Practical insights on web design, local SEO, and growth for service businesses.", 155),
  };
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <section className="border-b border-line bg-bg-sunken">
        <div className="container-grid py-16 md:py-20">
          <Link
            href="/blog"
            className="font-mono text-[12px] uppercase tracking-wide text-ink-3 hover:text-accent transition-colors"
          >
            ← All Articles
          </Link>

          <div className="flex items-center gap-4 mt-8 mb-5">
            <p className="eyebrow text-accent">{post.category}</p>
            <span className="w-1 h-1 rounded-full bg-line" />
            <p className="font-mono text-[11px] text-ink-3">
              {formatDate(post.date ?? new Date().toISOString())}
            </p>
            <span className="w-1 h-1 rounded-full bg-line" />
            <p className="font-mono text-[11px] text-ink-3">
              {post.readTime}
            </p>
          </div>

          <h1 className="font-display font-semibold text-[clamp(1.8rem,3.8vw,2.7rem)] leading-[1.15] tracking-tight text-ink max-w-3xl">
            {post.title}
          </h1>
        </div>
      </section>

      <section className="border-b border-line bg-bg">
        <div className="container-grid py-16 md:py-20">
          <article className="max-w-2xl space-y-6">
            {post.content?.map((paragraph, i) => (
              <p
                key={i}
                className="text-[16px] leading-relaxed text-ink/90"
              >
                {paragraph}
              </p>
            ))}
          </article>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
