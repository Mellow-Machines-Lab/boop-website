import type { Metadata, Viewport } from "next";
import { Caveat, Fredoka } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Attribution } from "@/components/Attribution";
import { ScrollDepth } from "@/components/ScrollDepth";
import { TikTokPixel } from "@/components/TikTokPixel";
import { copy } from "@/lib/copy";
import { serializeJsonLd } from "@/lib/jsonld";
import "@/styles/globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.adoptaboop.com";

// A rounded display face for headings, and a handwritten one for the few
// scribbled labels. Body text stays Geist; Boop's voice is Geist Mono.
const display = Fredoka({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-display",
  display: "swap",
});
const hand = Caveat({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-hand",
  display: "swap",
});

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: copy.brand.maker,
      url: siteUrl,
      logo: `${siteUrl}/icon.svg`,
      email: copy.footer.contactEmail,
    },
    {
      "@type": "WebSite",
      name: copy.brand.wordmark,
      alternateName: copy.meta.title,
      url: siteUrl,
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: copy.meta.title, template: `%s · ${copy.brand.wordmark}` },
  description: copy.meta.description,
  applicationName: copy.brand.wordmark,
  keywords: ["desk pet", "AI coding agents", "Claude Code", "Codex", "ESP32", "open source"],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "/",
    title: copy.meta.title,
    description: copy.meta.description,
    siteName: copy.brand.wordmark,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: copy.meta.ogAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: copy.meta.title,
    description: copy.meta.description,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#fff1e4",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${display.variable} ${hand.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(siteJsonLd) }}
        />
        <Attribution />
        {children}
        <ScrollDepth />
        <Analytics />
        <TikTokPixel />
      </body>
    </html>
  );
}
