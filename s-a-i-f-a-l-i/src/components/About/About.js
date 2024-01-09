"use client";
import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Icon,
  IconProps,
  useColorModeValue,
} from "@chakra-ui/react";

export default function About() {
  return (
    <Container
      id="About"
      maxW={"7xl"}
      borderRadius="lg"
      bg={useColorModeValue("#02054B", "#010225")}
    >
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
          color="#DCE2FF"
        >
          About{" "}
          <Text as={"span"} color={"orange.400"}>
            Me
          </Text>
        </Heading>
        <Text color={"gray.500"} maxW={"3xl"}>
          Welcome to my digital space! I'm Saif Ali, a passionate and
          results-driven Full Stack Developer. With six months of immersive
          experience in web development, I'm on a mission to bring creativity
          and functionality to the digital realm.
        </Text>
        <Text color={"gray.500"} maxW={"3xl"} textAlign={"left"}>
          My journey in the world of coding has equipped me with a diverse skill
          set encompassing HTML, CSS, Bootstrap, JavaScript, Java, Php,
          WordPress, React, Redux, JSON, GitHub, Node.js, MongoDB, Express.js,
          Context API, Axios, and Data Structures and Algorithms. This
          proficiency allows me to seamlessly navigate the complexities of both
          front-end and back-end development, weaving together engaging and
          interactive web experiences.
        </Text>
        <Text color={"gray.500"} maxW={"3xl"} textAlign={"left"}>
          Beyond the lines of code, I am a firm believer in continuous learning.
          Staying at the forefront of industry trends, I am committed to
          delivering cutting-edge solutions that resonate with the ever-evolving
          digital landscape.
        </Text>
        <Text color={"gray.500"} maxW={"3xl"} textAlign={"left"}>
          In addition to my technical prowess, I embrace a dynamic approach to
          life. An enthusiastic runner and bike rider, I believe in fostering a
          well-rounded perspective that fuels creativity and innovation.
        </Text>
        <Text color={"gray.500"} maxW={"3xl"} textAlign={"left"}>
          Education-wise, I hold a Full Stack Web Development certification from
          Masai School and a B.Com degree from Krishna Mahavidyalaya
          (M.J.P.R.U.). Complementing these credentials is the successful
          completion of an IT - O'Level course from S.A. Institute (N.I.E.I.T.).
        </Text>
      </Stack>
    </Container>
  );
}
