"use client";
import { ReactElement } from "react";
import {
  Box,
  SimpleGrid,
  Icon,
  Text,
  Heading,
  Stack,
  Flex,
  Container,
  useColorModeValue,
} from "@chakra-ui/react";
import { FcAssistant, FcPositiveDynamic, FcManager } from "react-icons/fc";

const Feature = ({ title, text, icon }) => {
  return (
    <Stack
      bg={useColorModeValue("#02054B", "#010225")}
      borderRadius={"md"}
      align={"center"}
      p={4}
      boxShadow={useColorModeValue(
        "0 4px 8px rgba(2, 5, 75, 0.5)",
        "0 4px 8px rgba(1, 2, 37, 0.5)"
      )}
      _hover={{ boxShadow: "none" }}
    >
      <Flex
        w={16}
        h={16}
        align={"center"}
        justify={"center"}
        color={"white"}
        rounded={"full"}
        bg={"gray.100"}
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={700}>{title}</Text>
      <Text>{text}</Text>
    </Stack>
  );
};

export default function SoftSkills() {
  return (
    <Container
      id="Soft Skills"
      maxW={"7xl"}
      borderRadius="lg"
      color={"gray.500"}
      pb={{ base: 20, md: 28 }}
    >
      <Stack textAlign={"center"} align={"center"} pb={{ base: 10 }}>
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
          color={useColorModeValue("#000", "#DCE2FF")}
        >
          Soft{" "}
          <Text as={"span"} color={"orange.400"}>
            Skills
          </Text>
        </Heading>
      </Stack>
      <Box color={useColorModeValue("gray.100", "#DCE2FF")}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          <Feature
            icon={<Icon as={FcPositiveDynamic} w={10} h={10} />}
            title={"Adaptability"}
            text={
              "Adaptable and resilient, I thrive in dynamic environments. Quick to embrace change, I leverage my flexibility to navigate challenges and contribute effectively to evolving projects. Adept at learning new technologies and methodologies, I ensure seamless transitions in the ever-changing landscape of the tech industry."
            }
          />
          <Feature
            icon={<Icon as={FcAssistant} w={10} h={10} />}
            title={"Communication"}
            text={
              "With strong communication skills, I convey complex ideas with clarity and precision. Whether collaborating with team members, presenting to stakeholders, or documenting project details, I prioritize effective communication. I excel at fostering open dialogue, ensuring a shared understanding among diverse team members."
            }
          />
          <Feature
            icon={<Icon as={FcManager} w={10} h={10} />}
            title={"Teamwork"}
            text={
              "A collaborative team player, I actively contribute to a positive and productive team environment. Valuing collective success, I engage with team members, share insights, and celebrate achievements. I am committed to fostering a sense of unity, recognizing that diverse perspectives enhance the strength and creativity of the team."
            }
          />
        </SimpleGrid>
      </Box>
    </Container>
  );
}
