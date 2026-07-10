import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeScript } from "@/components/ui";
import { contact } from "@/lib/data";
import portrait from "@/assets/Saif_Ali_Professional_Picture.png";

// Type system — all self-hosted via next/font (zero runtime requests, zero CLS):
//   Inter         → body / UI (the calm, hyper-legible neutral)
//   Space Grotesk → display: hero name, section headings, wordmark (the character)
//   JetBrains Mono→ uppercase micro-labels + code accents (the "developer" texture)
// Inter & Space Grotesk are variable (weight omitted → one file covers every
// weight used); JetBrains Mono is pinned to 500 since it only renders labels.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

const SITE_URL = "https://codedsaif.developersdrills.com";
const TITLE = "Saif Ali — Full Stack Developer | codedsaif";
const DESCRIPTION =
  "Saif Ali (@codedsaif) — Full Stack Developer with 3+ years of experience building fast, scalable web apps with React, Next.js, Node.js and MongoDB.";

// Lean, honest metadata: a ~150-char description Google can actually show
// (the old 1,400-char dump got truncated), a canonical URL, and real
// OG/Twitter cards. The `keywords` tag is gone — Google has ignored it
// since 2009; it was only shipping dead bytes.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  authors: [{ name: "Saif Ali", url: SITE_URL }],
  creator: "Saif Ali",
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Saif Ali — codedsaif",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: portrait.src,
        width: portrait.width,
        height: portrait.height,
        alt: "Portrait of Saif Ali",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
    images: [portrait.src],
  },
};

// Person schema — tells search engines who "codedsaif" is and links the
// profiles together (the strongest personal-SEO signal a portfolio can send).
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Saif Ali",
  alternateName: "codedsaif",
  jobTitle: "Full Stack Developer",
  url: SITE_URL,
  image: `${SITE_URL}${portrait.src}`,
  sameAs: [
    contact.socials.github,
    contact.socials.linkedin,
    contact.socials.leetcode,
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Dark by default; ThemeScript trims it to light only if the user opted in.
    // The `.variable` classes only DEFINE the font CSS vars — ThemeScript only
    // toggles `dark`, so they're safe to sit alongside it. `dark` stays first.
    <html
      lang="en"
      className={`dark ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {/* Dev-only: unregister any stale service worker (e.g. a prior
            vite-plugin-pwa SW left on this port) and clear its caches, so it
            stops injecting /@vite/* and /dev-sw.js 404s. Gated to development so
            it can never interfere with a real production PWA. */}
        {process.env.NODE_ENV === "development" && (
          <script
            dangerouslySetInnerHTML={{
              __html:
                "if('serviceWorker' in navigator){navigator.serviceWorker.getRegistrations().then(function(rs){rs.forEach(function(r){r.unregister()})}).catch(function(){});if(self.caches){caches.keys().then(function(ks){ks.forEach(function(k){caches.delete(k)})}).catch(function(){})}}",
            }}
          />
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}
