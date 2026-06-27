import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono, Inter, Fraunces } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

const siteUrl = "https://www.farouqkdesigns.com";
const siteName = "Farouqk Designs";
const defaultTitle = "Growth plan for local businesses | Farouqk Designs";
const defaultDescription =
  "We make it easy for local businesses to attract more customers and grow their revenue. We build to drive leads and growth.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: [
    "web design",
    "local SEO",
    "home service marketing",
    "plumber website",
    "HVAC website",
    "electrician website",
    "renovation contractor website",
  ],
  alternates: {
    canonical: siteUrl,
  },
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: siteUrl,
    siteName,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: `${siteName} logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: "/logo.png",
        alt: `${siteName} logo`,
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/logo.png", type: "image/png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  sameAs: [
    "https://www.linkedin.com/in/farouqkdesigns",
    "https://www.instagram.com/farouqkdesigns",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteUrl,
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/?s={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${plexMono.variable} ${inter.variable} ${fraunces.variable} h-full antialiased data-scroll-behavior="smooth"`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics/>
      </body>
    </html>
  );
}
