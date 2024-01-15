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
            bg={"#02054B"}
            color={"white"}
            boxShadow={
              "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
            }
            _hover={{
              bg: "#010225",
            }}
            _focus={{
              bg: "#010225",
            }}
          >
            Live
          </Button>
        </Link>
      )}

      {gitHubLink && (
        <Link href={gitHubLink} isExternal={true}>
          <Button
            px={8}
            fontSize={"sm"}
            rounded={"full"}
            bg={"#02054B"}
            color={"white"}
            boxShadow={
              "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
            }
            _hover={{
              bg: "#010225",
            }}
            _focus={{
              bg: "#010225",
            }}
          >
            Code
          </Button>
        </Link>
      )}
    </Flex>
  );
}
