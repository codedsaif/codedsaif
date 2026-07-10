import type { StaticImageData } from "next/image";
import type { IconType } from "react-icons";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaMedium,
  FaTwitter,
  FaYoutube,
  FaThreads,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa6";
import { TbWorldHeart } from "react-icons/tb";

// ---- Tech skill icons -------------------------------------------------------
import html from "@/assets/tech-skills/html.png";
import css from "@/assets/tech-skills/css.png";
import bootstrap from "@/assets/tech-skills/bootstrap.png";
import tailwindCSS from "@/assets/tech-skills/tailwind.png";
import javascript from "@/assets/tech-skills/javascript.png";
import php from "@/assets/tech-skills/php.png";
import java from "@/assets/tech-skills/java.png";
import react from "@/assets/tech-skills/react.png";
import redux from "@/assets/tech-skills/redux.jpg";
import next from "@/assets/tech-skills/next.png";
import node from "@/assets/tech-skills/node.png";
import express from "@/assets/tech-skills/express.png";
import mongodb from "@/assets/tech-skills/mongodb.png";
import github from "@/assets/tech-skills/github.png";
import postman from "@/assets/tech-skills/postman.webp";
import wordpress from "@/assets/tech-skills/wordpress.png";
import algorithms from "@/assets/tech-skills/algorithms.png";
import dataStructures from "@/assets/tech-skills/dataStructures.png";

// ---- Project screenshots ----------------------------------------------------
import jobify1 from "@/assets/projects/jobify1.jpg";
import jobify2 from "@/assets/projects/jobify2.jpg";
import jobify3 from "@/assets/projects/jobify3.jpg";
import jobify4 from "@/assets/projects/jobify4.jpg";
import jobify5 from "@/assets/projects/jobify5.jpg";
import jobify6 from "@/assets/projects/jobify6.jpg";
import ikea1 from "@/assets/projects/ikea1.jpg";
import ikea2 from "@/assets/projects/ikea2.jpg";
import ikea3 from "@/assets/projects/ikea3.jpg";
import ikea4 from "@/assets/projects/ikea4.jpg";
import ikea5 from "@/assets/projects/ikea5.jpg";
import ikea6 from "@/assets/projects/ikea6.jpg";
import ikea7 from "@/assets/projects/ikea7.jpg";
import ikea8 from "@/assets/projects/ikea8.jpg";
import ikea9 from "@/assets/projects/ikea9.jpg";
import ikea10 from "@/assets/projects/ikea10.jpg";
import bestbuy1 from "@/assets/projects/bestbuy1.jpg";
import bestbuy2 from "@/assets/projects/bestbuy2.jpg";
import bestbuy3 from "@/assets/projects/bestbuy3.jpg";
import bestbuy4 from "@/assets/projects/bestbuy4.jpg";
import bestbuy5 from "@/assets/projects/bestbuy5.jpg";
import bestbuy6 from "@/assets/projects/bestbuy6.jpg";
import bestbuy7 from "@/assets/projects/bestbuy7.jpg";
import pharmeasy1 from "@/assets/projects/pharmeasy1.jpg";
import pharmeasy2 from "@/assets/projects/pharmeasy2.jpg";
import pharmeasy3 from "@/assets/projects/pharmeasy3.jpg";
import pharmeasy4 from "@/assets/projects/pharmeasy4.jpg";
import pharmeasy5 from "@/assets/projects/pharmeasy5.jpg";
import pharmeasy6 from "@/assets/projects/pharmeasy6.jpg";
import pharmeasy7 from "@/assets/projects/pharmeasy7.jpg";
import pharmeasy8 from "@/assets/projects/pharmeasy8.jpg";
import calendly1 from "@/assets/projects/calendly1.jpg";
import calendly2 from "@/assets/projects/calendly2.jpg";
import calendly3 from "@/assets/projects/calendly3.jpg";
import calendly4 from "@/assets/projects/calendly4.jpg";
import hebe1 from "@/assets/projects/hebe1.jpg";
import hebe2 from "@/assets/projects/hebe2.jpg";

// ---- Types ------------------------------------------------------------------
export type NavLink =
  | { label: string; href: string }
  | { label: string; children: { label: string; href: string }[] };

export type SkillCategory =
  | "Frontend"
  | "Backend & Databases"
  | "Languages"
  | "Tools & Platforms"
  | "CS Foundations";

// Display order for the grouped skills section.
export const skillCategories: SkillCategory[] = [
  "Frontend",
  "Backend & Databases",
  "Languages",
  "Tools & Platforms",
  "CS Foundations",
];

export type TechSkill = {
  name: string;
  image: StaticImageData;
  title: string;
  description: string;
  category: SkillCategory;
};

export type SoftSkill = { title: string; text: string };

export type Slide = { image: StaticImageData; title: string };

export type Project = {
  stack: string;
  name: string;
  description: string;
  techStack: string[];
  slider: Slide[];
  liveLink: string;
  gitHubLink: string;
};

// `kind` drives the widget's span + framing inside the dense bento grid:
//   "hero"    → full-width contribution calendar (scrolls horizontally on mobile)
//   "wide"    → half-width transparent glass tile (activity graph)
//   "boxed"   → half-width; the widget ships its OWN opaque theme box (profile summary)
//   "compact" → third-width transparent glass tile (stats · streak · languages)
export type GitHubStat = {
  src: string;
  alt: string;
  kind: "hero" | "wide" | "boxed" | "compact";
  /** Intrinsic SVG size (verified from each service) — reserves space so the
      section doesn't jump as widgets load (CLS). */
  width: number;
  height: number;
};

export type Social = { label: string; href: string; icon: IconType };

// ---- Identity ---------------------------------------------------------------
export const AVATAR_URL =
  "https://avatars.githubusercontent.com/u/108917329?v=4";

export const RESUME = {
  view: "https://drive.google.com/file/d/1TY4QHsdz4FrapEZ96M5TSRhOuuXk6Sw8/view",
  download:
    "https://drive.google.com/uc?export=download&id=1TY4QHsdz4FrapEZ96M5TSRhOuuXk6Sw8",
};

// ---- Navbar -----------------------------------------------------------------
// Order mirrors the page scroll flow: About → Projects → GitHub → Skills →
// Experience → Contact.
export const navLinks: NavLink[] = [
  { label: "About", href: "#About" },
  { label: "Projects", href: "#Projects" },
  { label: "Statistics", href: "#Statistics" },
  { label: "Skills", href: "#Tech Skills" },
  { label: "Experience", href: "#Experience" },
  { label: "Contact", href: "#Contact" },
];

// ---- Profile (hero) ---------------------------------------------------------
export const profile = {
  firstName: "Saif Ali,",
  role: "Full Stack Developer!",
  description:
    "Full Stack Developer with 3+ years of hands-on experience building fast, scalable web apps — from responsive React and Next.js frontends to robust Node.js, Express and MongoDB backends.",
  phone: "tel:+916397727906",
};

// ---- About ------------------------------------------------------------------
export const aboutParagraphs: string[] = [
  "Welcome to my digital space! I'm a passionate, results-driven developer on a mission to bring creativity and functionality to the digital realm.",
  "My journey in the world of coding has equipped me with a diverse skill set across every layer of the stack — from crafting engaging, interactive interfaces to designing the APIs and databases behind them. That range allows me to seamlessly navigate the complexities of both front-end and back-end development.",
  "Beyond the lines of code, I am a firm believer in continuous learning. Staying at the forefront of industry trends, I am committed to delivering cutting-edge solutions that resonate with the ever-evolving digital landscape.",
  "In addition to my technical prowess, I embrace a dynamic approach to life. An enthusiastic runner and bike rider, I believe in fostering a well-rounded perspective that fuels creativity and innovation.",
];

// ---- Technical proficiency --------------------------------------------------
export const techSkills: TechSkill[] = [
  {
    name: "HTML",
    image: html,
    title: "HTML",
    description: "Standard markup language for creating web pages.",
    category: "Frontend",
  },
  {
    name: "CSS",
    image: css,
    title: "CSS",
    description: "Stylesheet language for styling web pages.",
    category: "Frontend",
  },
  {
    name: "Bootstrap",
    image: bootstrap,
    title: "Bootstrap Framework",
    description: "Front-end framework for building responsive websites.",
    category: "Frontend",
  },
  {
    name: "Tailwind CSS",
    image: tailwindCSS,
    title: "Tailwind CSS",
    description:
      "Utilizing a utility-first approach for efficient and consistent styling in web development.",
    category: "Frontend",
  },
  {
    name: "React",
    image: react,
    title: "React",
    description: "JavaScript library for building user interfaces.",
    category: "Frontend",
  },
  {
    name: "Redux",
    image: redux,
    title: "Redux",
    description: "State management library for JavaScript applications.",
    category: "Frontend",
  },
  {
    name: "Next",
    image: next,
    title: "Next.js",
    description:
      "React framework for building production-ready web applications.",
    category: "Frontend",
  },
  {
    name: "Node",
    image: node,
    title: "Node.js",
    description: "JavaScript runtime for server-side development.",
    category: "Backend & Databases",
  },
  {
    name: "Express",
    image: express,
    title: "Express.js",
    description: "Web application framework for Node.js.",
    category: "Backend & Databases",
  },
  {
    name: "Mongodb",
    image: mongodb,
    title: "MongoDB",
    description: "NoSQL database for scalable and flexible data storage.",
    category: "Backend & Databases",
  },
  {
    name: "Javascript",
    image: javascript,
    title: "JavaScript",
    description: "High-level, interpreted programming language for the web.",
    category: "Languages",
  },
  {
    name: "Php",
    image: php,
    title: "PHP",
    description: "Server-side scripting language for web development.",
    category: "Languages",
  },
  {
    name: "Java",
    image: java,
    title: "Java",
    description: "Versatile, object-oriented programming language.",
    category: "Languages",
  },
  {
    name: "Github",
    image: github,
    title: "GitHub",
    description: "Web-based platform for version control using Git.",
    category: "Tools & Platforms",
  },
  {
    name: "Postman",
    image: postman,
    title: "Postman",
    description: "API development and testing tool.",
    category: "Tools & Platforms",
  },
  {
    name: "Wordpress",
    image: wordpress,
    title: "WordPress",
    description: "Open-source content management system.",
    category: "Tools & Platforms",
  },
  {
    name: "Data Structures",
    image: dataStructures,
    title: "Data Structures",
    description: "Organized formats for storing and managing data.",
    category: "CS Foundations",
  },
  {
    name: "Algorithms",
    image: algorithms,
    title: "Algorithms",
    description: "Step-by-step procedures for problem-solving.",
    category: "CS Foundations",
  },
];

// ---- Soft skills ------------------------------------------------------------
export const softSkills: SoftSkill[] = [
  {
    title: "Adaptability",
    text: "Adaptable and resilient, I thrive in dynamic environments. Quick to embrace change, I leverage my flexibility to navigate challenges and contribute effectively to evolving projects. Adept at learning new technologies and methodologies, I ensure seamless transitions in the ever-changing landscape of the tech industry.",
  },
  {
    title: "Communication",
    text: "With strong communication skills, I convey complex ideas with clarity and precision. Whether collaborating with team members, presenting to stakeholders, or documenting project details, I prioritize effective communication. I excel at fostering open dialogue, ensuring a shared understanding among diverse team members.",
  },
  {
    title: "Teamwork",
    text: "A collaborative team player, I actively contribute to a positive and productive team environment. Valuing collective success, I engage with team members, share insights, and celebrate achievements. I am committed to fostering a sense of unity, recognizing that diverse perspectives enhance the strength and creativity of the team.",
  },
];

// ---- GitHub statistics ------------------------------------------------------
// Six live widget images. Five are re-themed to Indigo Noir: TRANSPARENT
// background (bg_color=00000000) so the navy card shows through, with violet
// (a78bfa) accents + light text. The sixth — the profile-summary card — has no
// transparent+violet option, so it ships the "tokyonight" theme (bg #1a1b27,
// the closest of all 60+ themes to this card's brand-deep #15122e) so its own
// opaque box melts into the dark card instead of clashing like the old pink
// "radical". Order feeds the dense bento grid in GitHubActivity top-to-bottom:
//   Row 1  → contribution calendar (hero, full width)
//   Row 2  → activity graph + profile summary (two wide half-width tiles)
//   Row 3  → stats · streak · languages (three compact third-width tiles)
// NOTE: stats + top-langs use the maintained denvercoder1 instance (same API,
// same params) — the public github-readme-stats.vercel.app deployment is
// PAUSED (503) and was serving broken images.
export const githubStats: GitHubStat[] = [
  {
    src: "https://ghchart.rshah.org/a78bfa/codedsaif",
    alt: "codedsaif's GitHub contribution graph over the last year",
    kind: "hero",
    width: 663,
    height: 104,
  },
  {
    src: "https://github-readme-activity-graph.vercel.app/graph?username=codedsaif&bg_color=00000000&color=e0e7ff&line=a78bfa&point=e0e7ff&area=true&area_color=a78bfa&hide_border=true&custom_title=%20&height=300",
    alt: "codedsaif's GitHub activity graph over the last year",
    kind: "wide",
    width: 1200,
    height: 300,
  },
  {
    src: "https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=codedsaif&theme=tokyonight",
    alt: "codedsaif's GitHub profile summary — join date, contributions and activity",
    kind: "boxed",
    width: 700,
    height: 200,
  },
  {
    src: "https://denvercoder1-github-readme-stats.vercel.app/api?username=codedsaif&show_icons=true&hide_border=true&bg_color=00000000&title_color=a78bfa&text_color=cbd5e1&icon_color=a78bfa",
    alt: "codedsaif's GitHub stats — stars, commits, PRs and issues",
    kind: "compact",
    width: 467,
    height: 195,
  },
  {
    src: "https://streak-stats.demolab.com?user=codedsaif&hide_border=true&background=00000000&stroke=a78bfa&ring=a78bfa&fire=a78bfa&currStreakLabel=a78bfa&sideLabels=cbd5e1&currStreakNum=e0e7ff&sideNums=e0e7ff&dates=8b93a7&dayLabels=a78bfa",
    alt: "codedsaif's GitHub contribution streak",
    kind: "compact",
    width: 495,
    height: 195,
  },
  {
    src: "https://denvercoder1-github-readme-stats.vercel.app/api/top-langs/?username=codedsaif&layout=compact&hide_border=true&langs_count=8&bg_color=00000000&title_color=a78bfa&text_color=cbd5e1",
    alt: "codedsaif's most-used languages",
    kind: "compact",
    width: 300,
    height: 165,
  },
];

// ---- Projects ---------------------------------------------------------------
const landing = (image: StaticImageData): Slide => ({
  image,
  title: "Landing Page",
});

export const projects: Project[] = [
  {
    stack: "Full Stack",
    name: "Jobify",
    description:
      "Full-stack job-application tracker — add and manage applications, update profile details, and monitor your search from a stats dashboard.",
    techStack: [
      "React",
      "Styled Components",
      "Redux",
      "ContextAPI",
      "Express",
      "MongoDB",
      "BcryptJS",
      "JWT",
      "Mongoose",
    ],
    slider: [jobify1, jobify2, jobify3, jobify4, jobify5, jobify6].map(landing),
    liveLink: "https://full-stack-project-cend.onrender.com",
    gitHubLink: "https://github.com/codedsaif/jobify",
  },
  {
    stack: "Frontend",
    name: "IKEA",
    description:
      "Frontend IKEA storefront clone — product browsing, cart and responsive layouts built with React, Redux and Bootstrap.",
    techStack: [
      "React",
      "Module CSS",
      "React Bootstrap",
      "React Icons",
      "Redux",
      "ContextAPI",
      "Axios",
    ],
    slider: [
      ikea1,
      ikea2,
      ikea3,
      ikea4,
      ikea5,
      ikea6,
      ikea7,
      ikea8,
      ikea9,
      ikea10,
    ].map(landing),
    liveLink:
      "https://ikea-clone-4lny-f1tdnurt2-arpitsaraswat1997.vercel.app/",
    gitHubLink: "https://github.com/codedsaif/ikea_clone",
  },
  {
    stack: "Frontend",
    name: "BestBuy",
    description:
      "Multi-page BestBuy storefront clone in vanilla JavaScript — product listings, filtering, cart and checkout.",
    techStack: ["HTML", "CSS", "Bootstrap", "Javascript", "Advance JS"],
    slider: [
      bestbuy1,
      bestbuy2,
      bestbuy3,
      bestbuy4,
      bestbuy5,
      bestbuy6,
      bestbuy7,
    ].map(landing),
    liveLink: "https://snazzy-smakager-fb2e8f.netlify.app",
    gitHubLink: "https://github.com/codedsaif/BestBuy-clone",
  },
  {
    stack: "Frontend",
    name: "PharmEasy",
    description:
      "Clone of PharmEasy, India's largest e-pharmacy — product filtering, add-to-cart and checkout, built in vanilla JavaScript.",
    techStack: ["HTML", "CSS", "Bootstrap", "Javascript"],
    slider: [
      pharmeasy1,
      pharmeasy2,
      pharmeasy3,
      pharmeasy4,
      pharmeasy5,
      pharmeasy6,
      pharmeasy7,
      pharmeasy8,
    ].map(landing),
    liveLink: "https://pharmeasyclone2022.netlify.app",
    gitHubLink: "https://github.com/codedsaif/PharmEasy-Clone",
  },
  {
    stack: "Frontend",
    name: "Calendly",
    description:
      "Calendly clone — scheduling UI with login, events and subscription pages, built in vanilla JavaScript.",
    techStack: ["HTML", "CSS", "Bootstrap", "Javascript"],
    slider: [
      { image: calendly1, title: "Landing Page" },
      { image: calendly2, title: "Login Page" },
      { image: calendly3, title: "Events Page" },
      { image: calendly4, title: "Subscription Page" },
    ],
    liveLink: "https://sunny-stroopwafel-bdb2f1.netlify.app",
    // No public repo link — pointing "Code" at the profile page was misleading.
    gitHubLink: "",
  },
  {
    stack: "Frontend",
    name: "Hebeboutique",
    description:
      "Clone of Hebeboutique, an NZ grooming and jewellery store — login/signup, product and cart pages with Redux state.",
    techStack: ["React", "Module CSS", "Redux", "ContextAPI", "Chakra UI"],
    slider: [
      { image: hebe1, title: "Home Page" },
      { image: hebe2, title: "Login Page" },
    ],
    liveLink: "https://astonishing-biscotti-a93985.netlify.app",
    // No public repo link — pointing "Code" at the profile page was misleading.
    gitHubLink: "",
  },
];

// ---- Contact ----------------------------------------------------------------
export const contact = {
  intro:
    "Have a project, a role, or a quick question? Drop me a message below — or reach me directly by email or phone.",
  phone: { label: "+91-6397727906", href: "tel:+916397727906" },
  email: {
    label: "saifali27906@gmail.com",
    href: "mailto:saifali27906@gmail.com",
  },
  location: "Uttar Pradesh, India",
  socials: {
    github: "https://github.com/codedsaif/",
    leetcode: "https://leetcode.com/codedsaif/",
    linkedin: "https://www.linkedin.com/in/codedsaif/",
  },
  placeholders: {
    name: "e.g. Jane Smith",
    email: "you@company.com",
    subject: "Project enquiry",
    message: "Tell me a bit about your project, role, or question…",
  },
};

// ---- Footer -----------------------------------------------------------------
export const socials: Social[] = [
  {
    label: "developersdrills-Website",
    href: "https://developersdrills.com",
    icon: TbWorldHeart,
  },
  {
    label: "developersdrills-Linkedin",
    href: "https://www.linkedin.com/company/developerdrills/",
    icon: FaLinkedinIn,
  },
  {
    label: "developersdrills-Facebook",
    href: "https://www.facebook.com/people/Developersdrills/61554326645813/",
    icon: FaFacebookF,
  },
  {
    label: "developersdrills-Twitter",
    href: "https://twitter.com/developerdrills",
    icon: FaTwitter,
  },
  {
    label: "developersdrills-YouTube",
    href: "https://www.youtube.com/@developersdrills",
    icon: FaYoutube,
  },
  {
    label: "developersdrills-Instagram",
    href: "https://www.instagram.com/developersdrills/",
    icon: FaInstagram,
  },
  {
    label: "developersdrills-Threads",
    href: "https://www.threads.net/@developersdrills",
    icon: FaThreads,
  },
  {
    label: "developersdrills-Medium",
    href: "https://medium.com/@developersdrills",
    icon: FaMedium,
  },
  {
    label: "developersdrills-Telegram",
    href: "https://t.me/developersdrills",
    icon: FaTelegram,
  },
  {
    label: "developersdrills-Whatsapp",
    href: "https://whatsapp.com/channel/0029VaECGW35Ui2asKs7wc2p",
    icon: FaWhatsapp,
  },
];

// ---- Experience & Education (timeline) --------------------------------------
// LinkedIn-style: each entry is an ORG that holds one or more ROLES (most recent
// first). A single-role org renders flat; multi-role orgs nest the roles under a
// sub-rail (e.g. Intern -> Engineer -> Team Lead).
// NOTE: the two `work` orgs are DUMMY placeholders — replace org/period/location
// and each role's title/period/summary/highlights/tech. Education is from your profile.
export type TimelineRole = {
  title: string;
  period: string;
  summary: string;
  highlights: string[];
  tech?: string[];
};

export type TimelineEntry = {
  kind: "work" | "education";
  org: string; // company or institution
  period: string; // overall tenure at the org (or degree period)
  location: string;
  roles: TimelineRole[]; // 1+ roles; >1 renders the nested LinkedIn-style sub-rail
  // Optional logo: `import acme from "@/assets/logos/acme.png"` then `logo: acme`.
  // When omitted, the node shows a monogram of the org name instead.
  logo?: StaticImageData;
};

export const experience: TimelineEntry[] = [
  {
    kind: "work",
    org: "TechNova Solutions",
    period: "Mar 2022 — Present · 3 yrs",
    location: "Remote",
    roles: [
      {
        title: "Team Lead",
        period: "Jan 2024 — Present",
        summary:
          "Lead a squad of 5 building a B2B SaaS analytics platform used by 40k+ users.",
        highlights: [
          "Own the front-end architecture and the team's delivery roadmap.",
          "Drove a Next.js + TypeScript migration that cut delivery time by ~35%.",
          "Mentor 3 engineers through reviews, pairing, and growth plans.",
        ],
        tech: ["Next.js", "TypeScript", "React", "Node.js", "PostgreSQL"],
      },
      {
        title: "Software Engineer",
        period: "Sep 2022 — Dec 2023",
        summary:
          "Shipped customer-facing features across the stack on the analytics product.",
        highlights: [
          "Improved Core Web Vitals (LCP 4.1s → 1.6s) via code-splitting and image optimization.",
          "Built a reusable component library adopted across 4 teams.",
        ],
        tech: ["React", "TypeScript", "Redux", "Node.js"],
      },
      {
        title: "Software Engineer Intern",
        period: "Mar 2022 — Aug 2022",
        summary:
          "Joined the platform team and ramped quickly into production feature work.",
        highlights: [
          "Delivered a settings dashboard end-to-end during the internship.",
        ],
        tech: ["React", "JavaScript", "REST"],
      },
    ],
  },
  {
    kind: "work",
    org: "Brightwave Labs",
    period: "Jun 2021 — Feb 2022 · 9 mos",
    location: "Bengaluru, India",
    roles: [
      {
        title: "Software Engineer",
        period: "Jun 2021 — Feb 2022",
        summary:
          "Built and shipped MERN-stack features in an Agile team of 6.",
        highlights: [
          "Delivered a real-time order-tracking module serving 12k daily users.",
          "Cut API response times ~45% with Redis caching and query tuning.",
        ],
        tech: ["React", "Express", "MongoDB", "Redis", "Docker"],
      },
    ],
  },
  {
    kind: "education",
    org: "Masai School",
    period: "2020 — 2021",
    location: "Remote",
    roles: [
      {
        title: "Full Stack Web Development",
        period: "2020 — 2021",
        summary:
          "Intensive full-time program (1000+ hours) in modern web development.",
        highlights: [
          "Deep focus on Data Structures, Algorithms, and the MERN stack.",
        ],
      },
    ],
  },
  {
    kind: "education",
    org: "Krishna Mahavidyalaya (M.J.P.R.U.)",
    period: "2017 — 2020",
    location: "India",
    roles: [
      {
        title: "B.Com",
        period: "2017 — 2020",
        summary: "Bachelor of Commerce.",
        highlights: [],
      },
    ],
  },
  {
    kind: "education",
    org: "S.A. Institute (N.I.E.I.T.)",
    period: "2016 — 2017",
    location: "India",
    roles: [
      {
        title: "IT — O'Level",
        period: "2016 — 2017",
        summary: "Foundation diploma in information technology.",
        highlights: [],
      },
    ],
  },
];
