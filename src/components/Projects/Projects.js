"use client";
import {
  Box,
  SimpleGrid,
  Text,
  Heading,
  Stack,
  Container,
  useColorModeValue,
} from "@chakra-ui/react";

import Project from "../Project/Project";
// jobify
import jobify1 from "@/assets/projects/jobify1.jpg";
import jobify2 from "@/assets/projects/jobify2.jpg";
import jobify3 from "@/assets/projects/jobify3.jpg";
import jobify4 from "@/assets/projects/jobify4.jpg";
import jobify5 from "@/assets/projects/jobify5.jpg";
import jobify6 from "@/assets/projects/jobify6.jpg";
// ikea
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
// bestbuy
import bestbuy1 from "@/assets/projects/bestbuy1.jpg";
import bestbuy2 from "@/assets/projects/bestbuy2.jpg";
import bestbuy3 from "@/assets/projects/bestbuy3.jpg";
import bestbuy4 from "@/assets/projects/bestbuy4.jpg";
import bestbuy5 from "@/assets/projects/bestbuy5.jpg";
import bestbuy6 from "@/assets/projects/bestbuy6.jpg";
import bestbuy7 from "@/assets/projects/bestbuy7.jpg";
//pharmeasy
import pharmeasy1 from "@/assets/projects/pharmeasy1.jpg";
import pharmeasy2 from "@/assets/projects/pharmeasy2.jpg";
import pharmeasy3 from "@/assets/projects/pharmeasy3.jpg";
import pharmeasy4 from "@/assets/projects/pharmeasy4.jpg";
import pharmeasy5 from "@/assets/projects/pharmeasy5.jpg";
import pharmeasy6 from "@/assets/projects/pharmeasy6.jpg";
import pharmeasy7 from "@/assets/projects/pharmeasy7.jpg";
import pharmeasy8 from "@/assets/projects/pharmeasy8.jpg";
//calendly
import calendly1 from "@/assets/projects/calendly1.jpg";
import calendly2 from "@/assets/projects/calendly2.jpg";
import calendly3 from "@/assets/projects/calendly3.jpg";
import calendly4 from "@/assets/projects/calendly4.jpg";
//hebe
import hebe1 from "@/assets/projects/hebe1.jpg";
import hebe2 from "@/assets/projects/hebe2.jpg";
// import  from "@/assets/projects/";

export default function Projects() {
  const projects = [
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
      slider: [
        {
          image: jobify1,
          title: "Landing Page",
        },
        {
          image: jobify2,
          title: "Landing Page",
        },
        {
          image: jobify3,
          title: "Landing Page",
        },
        {
          image: jobify4,
          title: "Landing Page",
        },
        {
          image: jobify5,
          title: "Landing Page",
        },
        {
          image: jobify6,
          title: "Landing Page",
        },
      ],
      liveLink: "https://full-stack-project-cend.onrender.com",
      gitHubLink: "https://github.com/S-a-i-f-A-l-i/jobify",
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
        {
          image: ikea1,
          title: "Landing Page",
        },
        {
          image: ikea2,
          title: "Landing Page",
        },
        {
          image: ikea3,
          title: "Landing Page",
        },
        {
          image: ikea4,
          title: "Landing Page",
        },
        {
          image: ikea5,
          title: "Landing Page",
        },
        {
          image: ikea6,
          title: "Landing Page",
        },
        {
          image: ikea7,
          title: "Landing Page",
        },
        {
          image: ikea8,
          title: "Landing Page",
        },
        {
          image: ikea9,
          title: "Landing Page",
        },
        {
          image: ikea10,
          title: "Landing Page",
        },
      ],
      liveLink:
        "https://ikea-clone-4lny-f1tdnurt2-arpitsaraswat1997.vercel.app/",
      gitHubLink: "https://github.com/S-a-i-f-A-l-i",
    },
    {
      stack: "Frontend",
      name: "BestBuy",
      description:
        "Best Buy Co., Inc. is a provider of consumer technology products and services. The Company offers a range of merchandise and services to its customers, including computing and mobile phones, consumer electronics,...",
      techStack: ["HTML", "CSS", "Bootstrap", "Javascript", "Advance JS"],
      slider: [
        {
          image: bestbuy1,
          title: "Landing Page",
        },
        {
          image: bestbuy2,
          title: "Landing Page",
        },
        {
          image: bestbuy3,
          title: "Landing Page",
        },
        {
          image: bestbuy4,
          title: "Landing Page",
        },
        {
          image: bestbuy5,
          title: "Landing Page",
        },
        {
          image: bestbuy6,
          title: "Landing Page",
        },
        {
          image: bestbuy7,
          title: "Landing Page",
        },
      ],
      liveLink: "https://snazzy-smakager-fb2e8f.netlify.app",
      gitHubLink: "https://github.com/S-a-i-f-A-l-i",
    },
    {
      stack: "Frontend",
      name: "PharmEasy",
      description:
        "Created Clone of India's Largest e-PharmEasy Company. Features Like. Filer Product , Add to Cart, Checkout Etc",
      techStack: ["HTML", "CSS", "Bootstrap", "Javascript"],
      slider: [
        {
          image: pharmeasy1,
          title: "Landing Page",
        },
        {
          image: pharmeasy2,
          title: "Landing Page",
        },
        {
          image: pharmeasy3,
          title: "Landing Page",
        },
        {
          image: pharmeasy4,
          title: "Landing Page",
        },
        {
          image: pharmeasy5,
          title: "Landing Page",
        },
        {
          image: pharmeasy6,
          title: "Landing Page",
        },
        {
          image: pharmeasy7,
          title: "Landing Page",
        },
        {
          image: pharmeasy8,
          title: "Landing Page",
        },
      ],
      liveLink: "https://pharmeasyclone2022.netlify.app",
      gitHubLink: "https://github.com/S-a-i-f-A-l-i",
    },

    {
      stack: "Frontend",
      name: "Calendly",
      description:
        "Calendly is a web application for scheduling appointments, meetings, and events.",
      techStack: ["HTML", "CSS", "Bootstrap", "Javascript"],
      slider: [
        {
          image: calendly1,
          title: "Landing Page",
        },
        {
          image: calendly2,
          title: "Login Page",
        },
        {
          image: calendly3,
          title: "Events Page",
        },
        {
          image: calendly4,
          title: "Subscription Page",
        },
      ],
      liveLink: "https://sunny-stroopwafel-bdb2f1.netlify.app",
      gitHubLink: "https://github.com/S-a-i-f-A-l-i",
    },
    {
      stack: "Frontend",
      name: "Hebeboutique",
      description:
        "Hebeboutique is a Nz based website which provides grooming items,jewellery.etc.In this web site I have done login signup ,product and cart page ,and redux.",
      techStack: ["React", "Module CSS", "Redux", "ContextAPI", "Chakra UI"],
      slider: [
        {
          image: hebe1,
          title: "Home Page",
        },
        {
          image: hebe2,
          title: "Login Page",
        },
      ],
      liveLink: "https://astonishing-biscotti-a93985.netlify.app",
      gitHubLink: "https://github.com/S-a-i-f-A-l-i",
    },
  ];
  return (
    <Container
      id="Projects"
      maxW={"7xl"}
      borderRadius="lg"
      color={"gray.500"}
      py={{ base: 20, md: 28 }}
    >
      <Stack textAlign={"center"} align={"center"} pb={{ base: 10 }}>
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
          color={useColorModeValue("#000", "#DCE2FF")}
        >
          Project{" "}
          <Text as={"span"} color={"orange.400"}>
            Gallery
          </Text>
        </Heading>
      </Stack>
      <Box color={useColorModeValue("#0B0E3F", "#DCE2FF")}>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={10}
          alignItems="stretch"
        >
          {projects.map((project, index) => {
            return <Project key={project?.name} {...project} />;
          })}
        </SimpleGrid>
      </Box>
    </Container>
  );
}
