import { Link, Button, Flex, useColorModeValue } from "@chakra-ui/react";

export default function ProjectsButtons({ liveLink = "", gitHubLink = "" }) {
  return (
    <Flex w={"100%"} justifyContent="space-between" alignItems="center">
      {liveLink && (
        <Link href={liveLink} isExternal>
          <Button
            px={8}
            fontSize={"sm"}
            rounded={"full"}
            bg={useColorModeValue("#02054B", "#010225")}
            color={"white"}
            boxShadow={
              "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
            }
            _hover={{
              bg: "blue.500",
            }}
            _focus={{
              bg: "blue.500",
            }}
          >
            Live
          </Button>
        </Link>
      )}

      {gitHubLink && (
        <Link href={gitHubLink} isExternal>
          <Button
            px={8}
            fontSize={"sm"}
            rounded={"full"}
            bg={useColorModeValue("#02054B", "#010225")}
            color={"white"}
            boxShadow={
              "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
            }
            _hover={{
              bg: "blue.500",
            }}
            _focus={{
              bg: "blue.500",
            }}
          >
            Code
          </Button>
        </Link>
      )}
    </Flex>
  );
}
