import type { Metadata } from "next";
import "./globals.css";
import { ThemeScript } from "@/components/ui";

export const metadata: Metadata = {
  metadataBase: new URL("https://codedsaif.developersdrills.com"),
  title: "Saif Ali - Full Stack Developer",
  description:
    "Saif Ali (@codedsaif) - Full Stack Web Developer About Me: I'm Saif Ali, an accomplished Full Stack Web Developer passionate about crafting engaging and interactive websites. With expertise in front-end technologies like HTML, CSS, JavaScript, React, and Next.js, along with a robust backend stack utilizing Node.js, Express.js, and MongoDB, I bring creativity to the digital realm. Technical Expertise: Front-End: HTML, CSS, JavaScript, React, Next.js Back-End: Node.js, Express.js, MongoDB Additional Skills: Strapi, PHP, WordPress, Redux, GitHub, and more. Education: Full Stack Web Development, B.Com, IT - O'Level Connect with me on LinkedIn & Twitter: @codedsaif. Explore my website:codedsaif.developersdrills.com. #codedsaif #developersdrills",
  keywords:
    "Saif Ali, codedsaif,Saif Ali Full Stack Web Developer, codedsaif HTML, codedsaif CSS, codedsaif JavaScript, codedsaif React, codedsaif Next.js, codedsaif Strapi, codedsaif PHP, codedsaif WordPress, codedsaif Web Development Portfolio, codedsaif Interactive Websites, codedsaif Code Enthusiast, codedsaif Technology Learner, codedsaif Portfolio, codedsaif Projects, codedsaif Coding Journey, codedsaif Tech Skills ,codedsaif Coding Expertise, codedsaif Coding Passion, codedsaif Tech Showcase, Web Development Enthusiast CodedSaif, developersdrills",
  authors: [{ name: "Saif Ali", url: "https://codedsaif.developersdrills.com" }],
  openGraph: {
    title: "Saif Ali - Full Stack Developer",
    description:
      "Explore the portfolio of Saif Ali (@codedsaif), an experienced Full Stack Web Developer building fast, interactive websites with React, Next.js, Node.js, Express.js and MongoDB.",
    url: "https://codedsaif.developersdrills.com",
    siteName: "Saif Ali",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Dark by default; ThemeScript trims it to light only if the user opted in.
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <ThemeScript />
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
