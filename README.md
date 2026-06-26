# Farouqk Designs — Electrical Engineering Agency Site

Next.js 16 (App Router) + TypeScript + Tailwind v4. Built for an agency
positioning targeting electrical installation and engineering firms as
clients.

## Design system

Visual direction is translated from drylineapp.com's data-card, status-driven
language into an "engineering-grade credibility" register: near-black /
off-white base, IBM Plex Sans (display) + Inter (body) + IBM Plex Mono
(labels/data), sharp corners, hairline borders, green/amber/red status dots
used throughout (hero "Bid Readiness" card, problem list, case studies, FAQ).

All design tokens live in `src/app/globals.css` under `:root` — edit colors,
fonts, and spacing primitives there. Tailwind v4 auto-generates utility
classes (`bg-ink`, `text-accent`, etc.) from the `--color-*` custom
properties via the `@theme inline` block.

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

> **Note:** `next/font/google` (IBM Plex Sans/Mono, Inter) requires outbound
> access to fonts.googleapis.com at build time. This works on Vercel and any
> normal dev machine.

## Project structure

```
src/
  app/
    page.tsx                  -> Homepage
    services/page.tsx         -> Full services breakdown
    case-studies/page.tsx     -> Case study index
    case-studies/[slug]/      -> Individual case study (static params)
    blog/page.tsx             -> Blog index
    blog/[slug]/              -> Individual post (static params)
    contact/page.tsx          -> Contact page w/ form
    api/contact/route.ts      -> Form submission handler (placeholder)
  components/                 -> All section components, reusable across pages
  lib/
    case-studies.ts           -> Case study content (swap for CMS later)
    blog-posts.ts              -> Blog post content (swap for CMS later)
    faq-data.ts                -> FAQ content
```

## Connecting Sanity CMS (next step)

Right now blog posts and case studies live as typed arrays in `src/lib/`.
This was deliberate -- it keeps the site fully functional and fast to
iterate on without blocking on CMS setup. To hand publishing to
non-technical staff:

1. `npm install sanity @sanity/client next-sanity`
2. Run `npx sanity init` to scaffold a Studio (can live in this repo at
   `/studio` or as a separate project)
3. Define schemas for `post` and `caseStudy` matching the shape of
   `BlogPost` and `CaseStudy` types in `src/lib/`
4. Replace the static arrays in `blog-posts.ts` / `case-studies.ts` with
   `sanityClient.fetch(...)` calls -- the page components themselves don't
   need to change since they just consume the typed data
5. Deploy Sanity Studio (free tier) so staff can log in and publish without
   touching code

## Wiring the contact form to email

`src/app/api/contact/route.ts` currently logs submissions to the server
console. To actually receive enquiries:

1. Sign up for Resend (resend.com) or a similar transactional email service
2. `npm install resend`
3. In `route.ts`, replace the `console.log` with a `resend.emails.send(...)`
   call to your team inbox

## Deployment

Built for Vercel -- connect the GitHub repo and it deploys with zero config.
Add any environment variables (Resend API key, Sanity project ID, etc.) in
the Vercel dashboard once those are wired up.
