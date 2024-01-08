"use client";
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
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

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <Box
      id="Footer"
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      maxW={"7xl"}
      mx="auto"
      borderRadius={10}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Text>© {currentYear} developersdrills. All rights reserved</Text>
        <Stack
          direction={"row"}
          flexWrap={"wrap"}
          justifyContent={"center"}
          spacing={6}
        >
          <SocialButton
            label={"developersdrills-Website"}
            href={"https://www.linkedin.com/company/developerdrills/"}
          >
            <TbWorldHeart />
          </SocialButton>
          <SocialButton
            label={"developersdrills-Linkedin"}
            href={"https://www.linkedin.com/company/developerdrills/"}
          >
            <FaLinkedinIn />
          </SocialButton>
          <SocialButton
            label={"developersdrills-Facebook"}
            href={
              "https://www.facebook.com/people/Developersdrills/61554326645813/"
            }
          >
            <FaFacebookF />
          </SocialButton>
          <SocialButton
            label={"developersdrills-Twitter"}
            href={"https://twitter.com/developerdrills"}
          >
            <FaTwitter />
          </SocialButton>
          <SocialButton
            label={"developersdrills-YouTube"}
            href={"https://www.youtube.com/@developersdrills"}
          >
            <FaYoutube />
          </SocialButton>
          <SocialButton
            label={"developersdrills-Instagram"}
            href={"https://www.instagram.com/developersdrills/"}
          >
            <FaInstagram />
          </SocialButton>
          <SocialButton
            label={"developersdrills-Threads"}
            href={"https://www.threads.net/@developersdrills"}
          >
            <FaThreads />
          </SocialButton>
          <SocialButton
            label={"developersdrills-Medium"}
            href={"https://medium.com/@developersdrills"}
          >
            <FaMedium />
          </SocialButton>
          <SocialButton
            label={"developersdrills-Instagram"}
            href={"https://github.com/developersdrills"}
          >
            <FaTwitter />
          </SocialButton>
          <SocialButton
            label={"developersdrills-Telegram"}
            href={"https://t.me/developersdrills"}
          >
            <FaTelegram />
          </SocialButton>
          <SocialButton
            label={"developersdrills-Whatsapp"}
            href={"https://whatsapp.com/channel/0029VaECGW35Ui2asKs7wc2p"}
          >
            <FaWhatsapp />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}
