import { Inter } from "next/font/google";
import { ChakraProvider, chakra } from "@chakra-ui/react";
import Head from "next/head";
import "./globals.css";
// import { Layout } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Saif Ali - Full Stack Developer",
  description:
    "Saif Ali (@codedsaif) - Full Stack Web Developer About Me: I'm Saif Ali, an accomplished Full Stack Web Developer passionate about crafting engaging and interactive websites. With expertise in front-end technologies like HTML, CSS, JavaScript, React, and Next.js, along with a robust backend stack utilizing Node.js, Express.js, and MongoDB, I bring creativity to the digital realm. Technical Expertise: Front-End: HTML, CSS, JavaScript, React, Next.js Back-End: Node.js, Express.js, MongoDB Additional Skills: Strapi, PHP, WordPress, Redux, GitHub, and more. Education: Full Stack Web Development, B.Com, IT - O'Level Connect with me on LinkedIn & Twitter: @codedsaif. Explore my website:codedsaif.developersdrills.com. #codedsaif #developersdrills",
  keywords:
    "Saif Ali, codedsaif,Saif Ali Full Stack Web Developer, codedsaif HTML, codedsaif CSS, codedsaif JavaScript, codedsaif React, codedsaif Next.js, codedsaif Strapi, codedsaif PHP, codedsaif WordPress, codedsaif Web Development Portfolio, codedsaif Interactive Websites, codedsaif Code Enthusiast, codedsaif Technology Learner, codedsaif Portfolio, codedsaif Projects, codedsaif Coding Journey, codedsaif Tech Skills ,codedsaif Coding Expertise, codedsaif Coding Passion, codedsaif Tech Showcase, Web Development Enthusiast CodedSaif, developersdrills",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider>
          <Head>
            <title>CodedSaif - Experienced Full Stack Web Developer</title>
            <meta
              name="description"
              content="Explore the portfolio of CodedSaif, an experienced Full Stack Web Developer passionate about crafting cool and interactive websites using HTML, CSS, JavaScript, React, Next.js, Node.js, Express.js and MongoDB. Proficient in content management with Strapi and skilled in PHP and WordPress for themes and plugins. Always eager to learn and adapt to the latest technologies. Let's collaborate and build something awesome together!"
            />
            <meta
              name="keywords"
              content="codedsaif, Full Stack Web Developer, HTML, CSS, JavaScript, React, Next.js, Strapi, PHP, WordPress, Web Development Portfolio, Interactive Websites, Code Enthusiast, Technology Learner, codedsaif Portfolio, codedsaif Projects, codedsaif Coding Journey, codedsaif Tech Skills ,codedsaif Coding Expertise, codedsaif Coding Passion, codedsaif Tech Showcase, Web Development Enthusiast CodedSaif"
            />
          </Head>
          {/* <Layout>{children}</Layout> */}
          {children}
        </ChakraProvider>
      </body>
    </html>
  );
}
