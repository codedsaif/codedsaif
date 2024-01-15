"use client";
import Image from "next/image";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  Flex,
  Tag,
  TagLabel,
  TagLeftIcon,
  useColorModeValue,
} from "@chakra-ui/react";
import Slider from "../Slider/ProjectImageSlider";
import { FaHashtag } from "react-icons/fa";
import ProjectsButtons from "../ProjectsButtons/ProjectsButtons";

export default function Project({
  stack = "",
  name = "",
  description = "",
  techStack = [],
  slider = [],
  liveLink = "",
  gitHubLink = "",
}) {
  return (
    <Flex py={6} justifyContent={"center"}>
      <Box
        maxW={"445px"}
        w={"full"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
        _hover={{ boxShadow: "none" }}
      >
        <Stack>
          <Box
            h={"240px"}
            bg={"gray.100"}
            mt={-6}
            mx={-6}
            mb={6}
            pos={"relative"}
          >
            <Slider sliderData={slider} />
          </Box>
          <Stack>
            <Text
              color={useColorModeValue("#02054B", "#fff")}
              textTransform={"uppercase"}
              fontWeight={800}
              fontSize={"sm"}
              letterSpacing={1.1}
            >
              {stack}
            </Text>
            <Heading
              color={useColorModeValue("gray.700", "#fff")}
              fontSize={"2xl"}
              fontFamily={"body"}
            >
              {name}
            </Heading>
            <Text color={"gray.500"}>{description}</Text>
            <Box>
              {techStack.map((tag, index) => (
                <Tag
                  size="md"
                  key={tag}
                  variant="subtle"
                  colorScheme="cyan"
                  mr={2}
                  mb={2}
                  verticleAlign={"middle"}
                >
                  <TagLeftIcon>
                    <FaHashtag size="md" />
                  </TagLeftIcon>
                  <TagLabel>{tag}</TagLabel>
                </Tag>
              ))}
            </Box>
          </Stack>
        </Stack>
        <Stack mt={6} direction={"col"} align={"center"}>
          <ProjectsButtons liveLink={liveLink} gitHubLink={gitHubLink} />
        </Stack>
      </Box>
    </Flex>
  );
}
