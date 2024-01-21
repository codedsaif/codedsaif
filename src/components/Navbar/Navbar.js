"use client";
import { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  TagRightIcon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorMode,
  useColorModeValue,
  Stack,
  Center,
  CloseButton,
  HamburgerIcon,
} from "@chakra-ui/react";
import { IoMenu, IoCloseSharp } from "react-icons/io5";
import { FaMoon, FaSun, FaExternalLinkAlt } from "react-icons/fa";
import styles from "./Navbar.module.css";
import { TiArrowSortedDown } from "react-icons/ti";

const Links = [
  "About",
  [{ Skills: ["Tech Skills", "Soft Skills"] }],
  "Statistics",
  "Projects",
  "Contact",
];

const accounts = [
  {
    label: "Phone",
    link: "tel:+916397727906",
  },
  {
    label: "Email",
    link: "mailto:saifali27906@gmail.com",
  },
  {
    label: "LinkedIn",
    link: "https://www.linkedin.com/in/codedsaif/",
  },
  {
    label: "GitHub",
    link: "https://github.com/codedsaif/",
  },
  {
    label: "LeetCode",
    link: "https://leetcode.com/codedsaif/",
  },
];

const NavLink = ({ children }) => {
  let key = Object.keys(children[0])[0];
  if (Array.isArray(children) && children.length > 0) {
    return (
      <Menu>
        <MenuButton
          px={2}
          py={1}
          rounded={"md"}
          _hover={{
            textDecoration: "none",
            bg: "gray.400",
          }}
          textAlign={"left"}
        >
          {key}
          <TagRightIcon verticalAlign={"middle"}>
            <TiArrowSortedDown size="lg" />
          </TagRightIcon>
        </MenuButton>
        <MenuList alignItems={"center"}>
          {children[0].Skills.map((skill, index) => (
            <MenuItem key={skill} as="a" href={`#${skill}`}>
              {skill}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    );
  }
  return (
    <Link
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: "gray.400",
      }}
      href={`#${children}`}
    >
      {children}
    </Link>
  );
};

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box
        id="Navbar"
        position="fixed"
        maxW={"7xl"}
        top={0}
        left={0}
        right={0}
        zIndex={1000}
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        mt={2}
        mx="auto"
        borderRadius={10}
        boxShadow={useColorModeValue(
          "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          "rgba(255, 255, 255, 0.1) 0px 5px 15px"
        )}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseButton size="lg" /> : <IoMenu size="lg" />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Link
              href="#Profile"
              _hover={{
                textDecoration: "none",
              }}
            >
              <Box className={styles.logo}>Saif Ali</Box>
            </Link>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <FaMoon /> : <FaSun />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={
                      "https://avatars.githubusercontent.com/u/108917329?v=4"
                    }
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={
                        "https://avatars.githubusercontent.com/u/108917329?v=4"
                      }
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Saif Ali</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  {accounts.map((account, index) => {
                    return (
                      <Link
                        key={account.label}
                        _hover={{
                          textDecoration: "none",
                        }}
                        href={`${account.link}`}
                        isExternal={true}
                      >
                        <MenuItem>
                          {account.label} &nbsp; <FaExternalLinkAlt />
                        </MenuItem>
                      </Link>
                    );
                  })}
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
