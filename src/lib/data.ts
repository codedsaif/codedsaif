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

export type Account = { label: string; link: string };

export type TechSkill = {
  name: string;
  image: StaticImageData;
  title: string;
  description: string;
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

export type GitHubStat = { src: string; alt: string; full?: boolean };

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
export const navLinks: NavLink[] = [
  { label: "About", href: "#About" },
  {
    label: "Skills",
    children: [
      { label: "Tech Skills", href: "#Tech Skills" },
      { label: "Soft Skills", href: "#Soft Skills" },
    ],
  },
  { label: "Statistics", href: "#Statistics" },
  { label: "Projects", href: "#Projects" },
  { label: "Contact", href: "#Contact" },
];

export const accounts: Account[] = [
  { label: "Phone", link: "tel:+916397727906" },
  { label: "Email", link: "mailto:saifali27906@gmail.com" },
  { label: "LinkedIn", link: "https://www.linkedin.com/in/codedsaif/" },
  { label: "GitHub", link: "https://github.com/codedsaif/" },
  { label: "LeetCode", link: "https://leetcode.com/codedsaif/" },
];

// ---- Profile (hero) ---------------------------------------------------------
export const profile = {
  firstName: "Saif Ali,",
  role: "Full Stack Developer!",
  description:
    "A seasoned Full Stack Developer with hands-on experience and a strong technical foundation in Data Structures, Algorithms, HTML, CSS, JavaScript, Php, WordPress, React, Next.js, Node.js, Express.js, MongoDB, and more. Dedicated to continuous learning and staying abreast of industry advancements.",
  phone: "tel:+916397727906",
};

// ---- About ------------------------------------------------------------------
export const aboutParagraphs: string[] = [
  "Welcome to my digital space! I'm Saif Ali, a passionate and results-driven Full Stack Developer. With six months of immersive experience in web development, I'm on a mission to bring creativity and functionality to the digital realm.",
  "My journey in the world of coding has equipped me with a diverse skill set encompassing HTML, CSS, Bootstrap, JavaScript, Java, Php, WordPress, React, Redux, JSON, GitHub, Node.js, MongoDB, Express.js, Context API, Axios, and Data Structures and Algorithms. This proficiency allows me to seamlessly navigate the complexities of both front-end and back-end development, weaving together engaging and interactive web experiences.",
  "Beyond the lines of code, I am a firm believer in continuous learning. Staying at the forefront of industry trends, I am committed to delivering cutting-edge solutions that resonate with the ever-evolving digital landscape.",
  "In addition to my technical prowess, I embrace a dynamic approach to life. An enthusiastic runner and bike rider, I believe in fostering a well-rounded perspective that fuels creativity and innovation.",
  "Education-wise, I hold a Full Stack Web Development certification from Masai School and a B.Com degree from Krishna Mahavidyalaya (M.J.P.R.U.). Complementing these credentials is the successful completion of an IT - O'Level course from S.A. Institute (N.I.E.I.T.).",
];

// ---- Technical proficiency --------------------------------------------------
export const techSkills: TechSkill[] = [
  {
    name: "HTML",
    image: html,
    title: "HTML",
    description: "Standard markup language for creating web pages.",
  },
  {
    name: "CSS",
    image: css,
    title: "CSS",
    description: "Stylesheet language for styling web pages.",
  },
  {
    name: "Bootstrap",
    image: bootstrap,
    title: "Bootstrap Framework",
    description: "Front-end framework for building responsive websites.",
  },
  {
    name: "Tailwind CSS",
    image: tailwindCSS,
    title: "Tailwind CSS",
    description:
      "Utilizing a utility-first approach for efficient and consistent styling in web development.",
  },
  {
    name: "Javascript",
    image: javascript,
    title: "JavaScript",
    description: "High-level, interpreted programming language for the web.",
  },
  {
    name: "Php",
    image: php,
    title: "PHP",
    description: "Server-side scripting language for web development.",
  },
  {
    name: "Java",
    image: java,
    title: "Java",
    description: "Versatile, object-oriented programming language.",
  },
  {
    name: "React",
    image: react,
    title: "React",
    description: "JavaScript library for building user interfaces.",
  },
  {
    name: "Redux",
    image: redux,
    title: "Redux",
    description: "State management library for JavaScript applications.",
  },
  {
    name: "Next",
    image: next,
    title: "Next.js",
    description:
      "React framework for building production-ready web applications.",
  },
  {
    name: "Node",
    image: node,
    title: "Node.js",
    description: "JavaScript runtime for server-side development.",
  },
  {
    name: "Express",
    image: express,
    title: "Express.js",
    description: "Web application framework for Node.js.",
  },
  {
    name: "Mongodb",
    image: mongodb,
    title: "MongoDB",
    description: "NoSQL database for scalable and flexible data storage.",
  },
  {
    name: "Wordpress",
    image: wordpress,
    title: "WordPress",
    description: "Open-source content management system.",
  },
  {
    name: "Github",
    image: github,
    title: "GitHub",
    description: "Web-based platform for version control using Git.",
  },
  {
    name: "Postman",
    image: postman,
    title: "Postman",
    description: "API development and testing tool.",
  },
  {
    name: "Algorithms",
    image: algorithms,
    title: "Algorithms",
    description: "Step-by-step procedures for problem-solving.",
  },
  {
    name: "Data Structures",
    image: dataStructures,
    title: "Data Structures",
    description: "Organized formats for storing and managing data.",
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

// ---- GitHub statistics (static images = zero JS dependency) -----------------
export const githubStats: GitHubStat[] = [
  {
    src: "https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=codedsaif&theme=radical",
    alt: "codedsaif's Activity Graph",
    full: true,
  },
  {
    src: "https://github-readme-activity-graph.vercel.app/graph?username=codedsaif&custom_title=Saif%20Ali's%20GitHub%20Activity%20Graph&bg_color=0D1117&color=7F3FBF&line=7F3FBF&border=7F3FBF&point=7F3FBF&area_color=FFFFFF&title_color=FFFFFF&area=true",
    alt: "Saif's GitHub streak",
  },
  {
    src: "https://github-readme-streak-stats.herokuapp.com/?user=codedsaif&theme=radical&border=7F3FBF&background=0D1117",
    alt: "Saif's GitHub streak",
  },
  {
    src: "https://denvercoder1-github-readme-stats.vercel.app/api?username=codedsaif&show_icons=true&count_private=true&theme=react&border_color=7F3FBF&bg_color=0D1117&title_color=F85D7F&icon_color=F8D866",
    alt: "Saif Ali's Github Stats",
  },
  {
    src: "https://denvercoder1-github-readme-stats.vercel.app/api/top-langs/?username=codedsaif&langs_count=8&layout=compact&theme=react&border_color=7F3FBF&bg_color=0D1117&title_color=F85D7F&icon_color=F8D866",
    alt: "Saif Ali's Top Languages",
  },
  {
    src: "https://ghchart.rshah.org/7F3FBF/codedsaif",
    alt: "codedsaif's GitHub contribution calendar",
    full: true,
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
      "Jobify is a web application designed to help job seekers track their job applications and stay organized throughout the job search process. With Jobify, users can easily add and manage job applications, update their personal information,...",
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
      "Ikea is the one of the famous website for buying furniture and home appliance. They have lowered them prices ! Find affordable home furnishings solutions, all in one store.",
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
      "Best Buy Co., Inc. is a provider of consumer technology products and services. The Company offers a range of merchandise and services to its customers, including computing and mobile phones, consumer electronics,...",
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
      "Created Clone of India's Largest e-PharmEasy Company. Features Like. Filer Product , Add to Cart, Checkout Etc",
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
      "Calendly is a web application for scheduling appointments, meetings, and events.",
    techStack: ["HTML", "CSS", "Bootstrap", "Javascript"],
    slider: [
      { image: calendly1, title: "Landing Page" },
      { image: calendly2, title: "Login Page" },
      { image: calendly3, title: "Events Page" },
      { image: calendly4, title: "Subscription Page" },
    ],
    liveLink: "https://sunny-stroopwafel-bdb2f1.netlify.app",
    gitHubLink: "https://github.com/codedsaif",
  },
  {
    stack: "Frontend",
    name: "Hebeboutique",
    description:
      "Hebeboutique is a Nz based website which provides grooming items,jewellery.etc.In this web site I have done login signup ,product and cart page ,and redux.",
    techStack: ["React", "Module CSS", "Redux", "ContextAPI", "Chakra UI"],
    slider: [
      { image: hebe1, title: "Home Page" },
      { image: hebe2, title: "Login Page" },
    ],
    liveLink: "https://astonishing-biscotti-a93985.netlify.app",
    gitHubLink: "https://github.com/codedsaif",
  },
];

// ---- Contact ----------------------------------------------------------------
export const contact = {
  intro: "Fill up the form below to contact",
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
    name: "Saif Ali",
    email: "saifali27906@gmail.com",
    subject: "Project enquiry",
    message: "message",
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
    label: "developersdrills-Instagram",
    href: "https://github.com/developersdrills",
    icon: FaTwitter,
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
