import { createClient } from "@sanity/client"

export type Service = {
  _id: string
  title: string
  slug: string
  shortDescription?: string
}

export type CaseStudyPreview = {
  _id: string
  title: string
  slug: string
  projectType?: string
  clientName?: string
  summary?: string
  result?: string
  website?: string
}

export type CaseStudy = CaseStudyPreview & {
  challenge?: Array<{ _type: string; children?: Array<{ text?: string }> }>
  solution?: Array<{ _type: string; children?: Array<{ text?: string }> }>
  result?: string
}

export type BlogPost = {
  _id: string
  title: string
  slug: string
  excerpt?: string
  category?: string
  date?: string
  readTime?: string
  content?: string[]
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2026-06-22",
  useCdn: false,
  perspective: "published",
})

const servicesQuery = `*[_type == "service"] | order(order asc){_id,title,"slug":slug.current,shortDescription}`
const caseStudiesQuery = `*[_type == "caseStudy"] | order(projectDate desc){_id,title,projectType,clientName,"summary":excerpt,"result": pt::text(result),"slug":slug.current,website}`
const caseStudyBySlugQuery = `*[_type == "caseStudy" && slug.current == $slug][0]{_id,title,projectType,clientName,"summary":excerpt,"result": pt::text(result),challenge,solution,"slug":slug.current,website}`
const blogPostsQuery = `*[_type == "blogPost"] | order(publishedAt desc){_id,title,excerpt,category,"date":publishedAt,readTime,"slug":slug.current,"content": content[].children[0].text}`
const blogPostBySlugQuery = `*[_type == "blogPost" && slug.current == $slug][0]{_id,title,excerpt,category,"date":publishedAt,readTime,"slug":slug.current,"content": content[].children[0].text}`

export async function getServices() {
  return (await client.fetch(servicesQuery)) as Service[]
}

export async function getCaseStudies() {
  return (await client.fetch(caseStudiesQuery)) as CaseStudyPreview[]
}

export async function getCaseStudyBySlug(slug: string) {
  return (await client.fetch(caseStudyBySlugQuery, { slug })) as CaseStudy | null
}

export async function getBlogPosts() {
  return (await client.fetch(blogPostsQuery)) as BlogPost[]
}

export async function getBlogPostBySlug(slug: string) {
  return (await client.fetch(blogPostBySlugQuery, { slug })) as BlogPost | null
}

export type IndustryPreview = {
  _id: string
  title: string
  slug: string
  eyebrow?: string
  heroHeadline?: string
  heroSubheadline?: string
}

export type Industry = IndustryPreview & {
  painPoints?: Array<{ heading: string; body: string }>
  services?: Service[]
  caseStudies?: CaseStudyPreview[]
  testimonial?: { quote?: string; name?: string; company?: string }
  ctaHeadline?: string
  seoTitle?: string
  seoDescription?: string
}

const industriesQuery = `*[_type == "industry"] | order(title asc){_id,title,"slug":slug.current,eyebrow,heroHeadline,heroSubheadline}`
const industryBySlugQuery = `*[_type == "industry" && slug.current == $slug][0]{
  _id,title,"slug":slug.current,eyebrow,heroHeadline,heroSubheadline,painPoints,
  "services":services[]->{_id,title,"slug":slug.current,shortDescription},
  "caseStudies":caseStudies[]->{_id,title,projectType,clientName,"summary":excerpt,"result":pt::text(result),"slug":slug.current,website},
  testimonial,ctaHeadline,seoTitle,seoDescription
}`

export async function getIndustries() {
  return (await client.fetch(industriesQuery)) as IndustryPreview[]
}

export async function getIndustryBySlug(slug: string) {
  return (await client.fetch(industryBySlugQuery, { slug })) as Industry | null
}
