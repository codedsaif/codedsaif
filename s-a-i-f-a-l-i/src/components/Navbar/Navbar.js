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
import { FaMoon, FaSun } from "react-icons/fa";
import styles from "./Navbar.module.css";

const Links = [
  "Profile",
  "About",
  "Tech Skills",
  "Soft Skills",
  "Projects",
  "Contact",
];
// const Links = [
//   "Profile",
//   "About",
//   {
//     label: "Skills",
//     sublinks: [
//       "Tech Skills",
//       "Soft Skills",

//     ],
//   },
//   "Projects",
//   "Contact",
// ];

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={`#${children}`}
  >
    {children}
  </Link>
);

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
            <Link href="#Profile">
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
              {/* {Links.map((link, index) => (
                <NavLink key={index}>
                  {typeof link === "string" ? (
                    link
                  ) : (
                    <>
                      {link.label}
                      {link.sublinks.map((sublink, subIndex) => (
                        <NavLink key={subIndex}>{sublink}</NavLink>
                      ))}
                    </>
                  )}
                </NavLink>
              ))} */}
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
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem>Logout</MenuItem>
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
