"use client";
import {
  Container,
  Grid,
  GridItem,
  useColorModeValue,
  Text,
  Stack,
  Heading,
} from "@chakra-ui/react";
import Skill from "../Skill/Skill.js";
import html from "@/assets/html.png";
import css from "@/assets/css.png";
import bootstrap from "@/assets/bootstrap.png";
import javascript from "@/assets/javascript.png";
import php from "@/assets/php.png";
import java from "@/assets/java.png";
import react from "@/assets/react.png";
import redux from "@/assets/redux.jpg";
import next from "@/assets/next.png";
import node from "@/assets/node.png";
import express from "@/assets/express.png";
import mongodb from "@/assets/mongodb.png";
import github from "@/assets/github.png";
import postman from "@/assets/postman.webp";
import wordpress from "@/assets/wordpress.png";
import algorithms from "@/assets/algorithms.png";
import dataStructures from "@/assets/dataStructures.png";
// import  from "@/assets/";

export default function Skills() {
  const techSkills = [
    {
      name: "HTML",
      image: html,
      toolTipText: (
        <Stack spacing={1}>
          <Text as="b" align={"center"}>
            HTML
          </Text>
          <Text fontSize="sm" align={"center"}>
            Standard markup language for creating web pages.
          </Text>
        </Stack>
      ),
    },
    {
      name: "CSS",
      image: css,
      toolTipText: (
        <Stack spacing={1}>
          <Text as="b" align={"center"}>
            CSS
          </Text>
          <Text fontSize="sm" align={"center"}>
            Stylesheet language for styling web pages.
          </Text>
        </Stack>
      ),
    },
    {
      name: "Bootstrap",
      image: bootstrap,
      toolTipText: (
        <Stack spacing={1}>
          <Text as="b" align={"center"}>
            Bootstrap Framework
          </Text>
          <Text fontSize="sm" align={"center"}>
            Front-end framework for building responsive websites.
          </Text>
        </Stack>
      ),
    },
    {
      name: "Javascript",
      image: javascript,
      toolTipText: (
        <Stack spacing={1}>
          <Text as="b" align={"center"}>
            JavaScript
          </Text>
          <Text fontSize="sm" align={"center"}>
            High-level, interpreted programming language for the web.
          </Text>
        </Stack>
      ),
    },
    {
      name: "Php",
      image: php,
      toolTipText: (
        <Stack spacing={1}>
          <Text as="b" align={"center"}>
            PHP
          </Text>
          <Text fontSize="sm" align={"center"}>
            Server-side scripting language for web development.
          </Text>
        </Stack>
      ),
    },
    {
      name: "Java",
      image: java,
      toolTipText: (
        <Stack spacing={1}>
          <Text as="b" align={"center"}>
            Java
          </Text>
          <Text fontSize="sm" align={"center"}>
            Versatile, object-oriented programming language.
          </Text>
        </Stack>
      ),
    },
    {
      name: "React",
      image: react,
      toolTipText: (
        <Stack spacing={1}>
          <Text as="b" align={"center"}>
            React
          </Text>
          <Text fontSize="sm" align={"center"}>
            JavaScript library for building user interfaces.
          </Text>
        </Stack>
      ),
    },
    {
      name: "Redux",
      image: redux,
      toolTipText: (
        <Stack spacing={1}>
          <Text as="b" align={"center"}>
            Redux
          </Text>
          <Text fontSize="sm" align={"center"}>
            State management library for JavaScript applications.
          </Text>
        </Stack>
      ),
    },
    {
      name: "Next",
      image: next,
      toolTipText: (
        <Stack spacing={1}>
          <Text as="b" align={"center"}>
            Next.js
          </Text>
          <Text fontSize="sm" align={"center"}>
            React framework for building production-ready web applications.
          </Text>
        </Stack>
      ),
    },
    {
      name: "Node",
      image: node,
      toolTipText: (
        <Stack spacing={1}>
          <Text as="b" align={"center"}>
            Node.js
          </Text>
          <Text fontSize="sm" align={"center"}>
            JavaScript runtime for server-side development.
          </Text>
        </Stack>
      ),
    },
    {
      name: "Express",
      image: express,
      toolTipText: (
        <Stack spacing={1}>
          <Text as="b" align={"center"}>
            Express.js
          </Text>
          <Text fontSize="sm" align={"center"}>
            Web application framework for Node.js.
          </Text>
        </Stack>
      ),
    },
    {
      name: "Mongodb",
      image: mongodb,
      toolTipText: (
        <Stack spacing={1}>
          <Text as="b" align={"center"}>
            MongoDB
          </Text>
          <Text fontSize="sm" align={"center"}>
            NoSQL database for scalable and flexible data storage.
          </Text>
        </Stack>
      ),
    },
    {
      name: "Wordpress",
      image: wordpress,
      toolTipText: (
        <Stack spacing={1}>
          <Text as="b" align={"center"}>
            WordPress
          </Text>
          <Text fontSize="sm" align={"center"}>
            Open-source content management system.
          </Text>
        </Stack>
      ),
    },
    {
      name: "Github",
      image: github,
      toolTipText: (
        <Stack spacing={1}>
          <Text as="b" align={"center"}>
            GitHub
          </Text>
          <Text fontSize="sm" align={"center"}>
            Web-based platform for version control using Git.
          </Text>
        </Stack>
      ),
    },
    {
      name: "Postman",
      image: postman,
      toolTipText: (
        <Stack spacing={1}>
          <Text as="b" align={"center"}>
            Postman
          </Text>
          <Text fontSize="sm" align={"center"}>
            API development and testing tool.
          </Text>
        </Stack>
      ),
    },
    {
      name: "Algorithms",
      image: algorithms,
      toolTipText: (
        <Stack spacing={1}>
          <Text as="b" align={"center"}>
            Algorithms
          </Text>
          <Text fontSize="sm" align={"center"}>
            Step-by-step procedures for problem-solving.
          </Text>
        </Stack>
      ),
    },
    {
      name: "Data Structures",
      image: dataStructures,
      toolTipText: (
        <Stack spacing={1}>
          <Text as="b" align={"center"}>
            Data Structures
          </Text>
          <Text fontSize="sm" align={"center"}>
            Organized formats for storing and managing data.
          </Text>
        </Stack>
      ),
    },
  ];
  return (
    <Container
      id="Tech Skills"
      display="flex"
      flexDirection={"column"}
      gap={"40px"}
      alignItems="center"
      justifyContent="space-evenly"
      maxW={"7xl"}
      overflow="hidden"
      borderRadius="lg"
      py={{ base: 20, md: 28 }}
      color="white"
    >
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
          color={useColorModeValue("#000", "#DCE2FF")}
        >
          Technical{" "}
          <Text as={"span"} color={"orange.400"}>
            Proficiency
          </Text>
        </Heading>
      </Stack>
      <Grid
        w={"100%"}
        templateColumns={{
          base: "repeat(2, 1fr)",
          sm: "repeat(3, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap={3}
      >
        {techSkills.map((item, index) => {
          return (
            <GridItem
              key={item.name || index}
              w="100%"
              h="100%"
              display={"flex"}
              justifyContent="center"
              alignItems="center"
            >
              <Skill picSrc={item.image?.src} tipText={item?.toolTipText} />
            </GridItem>
          );
        })}
      </Grid>
    </Container>
  );
}
