# Farouqk Designs — Agency

A modern, professional website for electrical engineering and installation firms. Built with Next.js 16, TypeScript, and Tailwind CSS v4.

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **CMS:** Sanity (integrated)
- **Fonts:** IBM Plex Sans (display) + Inter (body) + IBM Plex Mono (data)
- **Email:** Resend (contact form)
- **Deployment:** Vercel

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Design System](#design-system)
- [Configuration & Setup](#configuration--setup)
  - [Sanity CMS Integration](#sanity-cms-integration)
  - [Contact Form & Email](#contact-form--email)
- [Deployment](#deployment)
- [Development](#development)

## 🎯 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note:** Google Fonts (IBM Plex Sans/Mono, Inter) require outbound access to fonts.googleapis.com at build time. This is supported on Vercel and standard development machines.

## 📁 Project Structure

### Frontend (`src/`)

```
src/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Design tokens & Tailwind config
│   ├── services/page.tsx           # Services overview
│   ├── case-studies/
│   │   ├── page.tsx                # Case studies index
│   │   └── [slug]/page.tsx         # Individual case study
│   ├── blog/
│   │   ├── page.tsx                # Blog index
│   │   └── [slug]/page.tsx         # Individual post
│   ├── contact/page.tsx            # Contact page
│   ├── industries/
│   │   ├── page.tsx                # Industries index
│   │   └── [slug]/page.tsx         # Individual industry
│   └── api/
│       └── contact/route.ts        # Contact form handler
├── components/                     # Reusable page sections
│   ├── Hero.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ContactForm.tsx
│   ├── CaseStudiesPreview.tsx
│   ├── ServicesDetail.tsx
│   └── ...
└── lib/
    ├── sanity.ts                   # Sanity client configuration
    ├── blog-posts.ts               # Blog post data/queries
    ├── case-studies.ts             # Case study data/queries
    ├── faq-data.ts                 # FAQ content
    └── ...
```

### CMS (`studio/`)

```
studio/
├── schemaTypes/
│   ├── blogPost.ts                 # Blog post schema
│   ├── caseStudy.ts                # Case study schema
│   ├── service.ts                  # Service schema
│   ├── industry.ts                 # Industry schema
│   ├── siteSettings.ts             # Global settings
│   └── index.ts
├── sanity.config.ts                # Sanity Studio configuration
├── sanity.cli.ts                   # Sanity CLI config
└── seed.ts                         # Content seeding script
```

## 🎨 Design System

The design follows an "engineering-grade credibility" aesthetic with:

- **Color Palette:** Near-black and off-white base with accent colors (green, amber, red)
- **Typography:** 
  - Display: IBM Plex Sans
  - Body: Inter
  - Data/Labels: IBM Plex Mono
- **Visual Elements:** Sharp corners, hairline borders, status indicator dots

### Editing Design Tokens

All design tokens are defined in [src/app/globals.css](src/app/globals.css) under the `:root` CSS variables. Tailwind v4 auto-generates utility classes from these custom properties:

```css
:root {
  --color-ink: #1a1a1a;
  --color-accent: #22c55e;
  /* ... more tokens ... */
}
```

Update any color, font, or spacing values directly here — all utilities update automatically.

## ⚙️ Configuration & Setup

### Sanity CMS Integration

Blog posts and case studies currently source from static data in `src/lib/`. To connect the live Sanity CMS:

#### 1. Install dependencies
```bash
npm install sanity @sanity/client next-sanity
```

#### 2. Configure Sanity client
Update [src/lib/sanity.ts](src/lib/sanity.ts) with your Sanity project ID and dataset:

```typescript
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
```

#### 3. Update environment variables
Create a `.env.local` file:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

#### 4. Replace static data with queries
Replace arrays in `blog-posts.ts` and `case-studies.ts` with GROQ queries:

```typescript
export async function getPosts() {
  return sanityClient.fetch(`*[_type == "blogPost"] | order(_createdAt desc)`)
}
```

#### 5. Deploy Sanity Studio
Use the included `/studio` folder or deploy as a separate app. Staff can log in and publish content without touching code.

### Contact Form & Email

The contact form handler is located at [src/app/api/contact/route.ts](src/app/api/contact/route.ts).

#### To enable email delivery:

1. **Sign up for [Resend](https://resend.com)** (free tier available)
2. **Install the Resend package:**
   ```bash
   npm install resend
   ```
3. **Update environment variables:**
   ```env
   RESEND_API_KEY=your_api_key
   CONTACT_EMAIL=your_team@example.com
   ```
4. **Update the route handler** to send emails via Resend instead of logging to console

## 🚀 Deployment

### Vercel (Recommended)

1. Push your repository to GitHub
2. Connect the repository in your [Vercel dashboard](https://vercel.com)
3. Add environment variables in project settings:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `RESEND_API_KEY`
   - `CONTACT_EMAIL`
4. Deploy — Vercel auto-builds on every push

### Other Platforms

This is a standard Next.js app and works on any platform supporting Node.js 18+:
- **Netlify:** Connect repo and configure build command: `npm run build`
- **Self-hosted:** Run `npm run build && npm start`

## 💻 Development

### Available Scripts

```bash
npm run dev         # Start dev server (http://localhost:3000)
npm run build       # Build for production
npm start           # Start production server
npm run lint        # Run ESLint
```

### Project Commands

- **Sanity Studio:** `cd studio && npm run dev`
- **Seed CMS data:** `cd studio && npm run seed`

## 📝 Content Management

- **Blog posts:** Managed via Sanity CMS or [src/lib/blog-posts.ts](src/lib/blog-posts.ts)
- **Case studies:** Managed via Sanity CMS or [src/lib/case-studies.ts](src/lib/case-studies.ts)
- **FAQ:** [src/lib/faq-data.ts](src/lib/faq-data.ts)
- **Services:** Managed via Sanity CMS
- **Industries:** Managed via Sanity CMS

## 🤝 Contributing

When making changes:
- Keep components in `src/components/` reusable
- Add new page routes in `src/app/` following the App Router convention
- Update schemas in `studio/schemaTypes/` when adding CMS content types
- Maintain type safety with TypeScript throughout

## 📄 License

Proprietary — Farouqk Designs Agency
