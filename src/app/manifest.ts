import type { MetadataRoute } from "next";

// Served at /manifest.webmanifest and auto-linked by Next. Gives the site a
// proper installable identity + theme colour (and resolves the 404 the browser
// makes for it). Add 192x192 / 512x512 PNGs to /public + list them here later
// for full PWA install prompts.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Saif Ali — Full Stack Developer",
    short_name: "Saif Ali",
    description:
      "Portfolio of Saif Ali (@codedsaif), a Full Stack Web Developer building fast, modern web apps with React, Next.js, Node.js and MongoDB.",
    start_url: "/",
    display: "standalone",
    background_color: "#08090f",
    theme_color: "#08090f",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
