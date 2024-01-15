"use client";
import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  Link,
  IconButton,
  Button,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdFacebook,
  MdOutlineEmail,
} from "react-icons/md";
import { BsGithub, BsPerson, BsLinkedin } from "react-icons/bs";
import { useState, useRef } from "react";
import { SiLeetcode } from "react-icons/si";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const toast = useToast();
  const [formDetails, setFormDetails] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const formRef = useRef();
  const handleChange = (e) => {
    // console.log(e.target.name, e.target.value);
    setFormDetails({
      ...formDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    setLoading(() => true);
    console.log(formRef.current);
    e.preventDefault();
    emailjs
      .sendForm(
        `${process.env.NEXT_PUBLIC_CONTACT_SERVICE_KEY}`,
        `${process.env.NEXT_PUBLIC_CONTACT_TEMPLATE_KEY}`,
        formRef.current,
        `${process.env.NEXT_PUBLIC_CONTACT_PUBLIC_KEY}`
      )
      .then(
        (result) => {
          toast({
            title: "Message Sent",
            description: `Thanks for contacting! ${formDetails.name}`,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setFormDetails({ name: "", email: "", message: "" });
          setLoading(() => false);
          // alert(
          //   `Thanks for Contacting me ${formDetails.name}. I will reply you as soon as possible. ${result.text}`
          // );
        },
        (error) => {
          // console.log(error.text);
          toast({
            title: "Error",
            description: `Something went wrong ${formDetails.name}. Please try again later.`,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          setFormDetails({ name: "", email: "", message: "" });
          setLoading(() => false);
        }
      );
  };
  return (
    <Container
      id="Contact"
      display="flex"
      flexDirection={{ base: "column", md: "row" }}
      gap={"40px"}
      alignItems="center"
      justifyContent="space-evenly"
      maxW={"7xl"}
      bg={useColorModeValue("#02054B", "#010225")}
      overflow="hidden"
      borderRadius="lg"
      py={{ base: 20, md: 28 }}
      color="white"
    >
      <Box
        w={{ base: "100%", md: "auto" }}
        display={"flex"}
        flexDirection={{ base: "row", md: "column" }}
        alignItems="start"
        justifyContent="space-between"
        textAlign="left"
        flexWrap={"wrap"}
      >
        <Box>
          <Heading
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
            color="#DCE2FF"
          >
            Get in{" "}
            <Text as={"span"} color={"orange.400"}>
              Touch
            </Text>
          </Heading>
          <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
            Fill up the form below to contact
          </Text>
          <HStack
            mt={{ lg: 10, md: 10 }}
            spacing={5}
            py={2}
            alignItems="flex-start"
          >
            <Link href="https://github.com/S-a-i-f-A-l-i">
              <IconButton
                aria-label="github"
                variant="ghost"
                size="lg"
                isRound={true}
                _hover={{ bg: "#DCE2FF" }}
                icon={<BsGithub size="28px" />}
              />
            </Link>
            <Link href="https://leetcode.com/S-a-i-f-A-l-i/">
              <IconButton
                aria-label="Leetcode"
                variant="ghost"
                size="lg"
                isRound={true}
                _hover={{ bg: "#DCE2FF" }}
                icon={<SiLeetcode size="28px" />}
              />
            </Link>
            <Link href="https://www.linkedin.com/in/saif-a-l-i-48a374231/">
              <IconButton
                aria-label="Linkedin"
                variant="ghost"
                size="lg"
                isRound={true}
                _hover={{ bg: "#DCE2FF" }}
                icon={<BsLinkedin size="28px" />}
              />
            </Link>
          </HStack>
        </Box>

        <Box
          py={{ base: 5, sm: 5, md: 8, lg: 10 }}
          flexDirection={{ sm: "row" }}
        >
          <VStack pl={0} spacing={2} alignItems="flex-start">
            <Link href="tel:+916397727906">
              <Button
                size="md"
                height="48px"
                // width="280px"
                variant="ghost"
                color="#DCE2FF"
                _hover={{ border: "2px solid #DCE2FF" }}
                leftIcon={<MdPhone color="#DCE2FF" size="20px" />}
              >
                +91-6397727906
              </Button>
            </Link>
            <Link href="mailto:saifali27906@gmail.com">
              <Button
                size="md"
                height="48px"
                // width="280px"
                variant="ghost"
                color="#DCE2FF"
                _hover={{ border: "2px solid #DCE2FF" }}
                leftIcon={<MdEmail color="#DCE2FF" size="20px" />}
              >
                saifali27906@gmail.com
              </Button>
            </Link>
            <Button
              size="md"
              height="48px"
              //   width="280px"
              variant="ghost"
              color="#DCE2FF"
              _hover={{ border: "2px solid #DCE2FF" }}
              leftIcon={<MdLocationOn color="#DCE2FF" size="20px" />}
            >
              Uttar Pradesh, India
            </Button>
          </VStack>
        </Box>
      </Box>
      <Box
        w={"100%"}
        maxW={"460px"}
        bg={useColorModeValue("gray.100", "gray.900")}
        borderRadius="lg"
      >
        <Box p={8} color={useColorModeValue("#0B0E3F", "#DCE2FF")}>
          <form ref={formRef} onSubmit={handleSubmit}>
            <VStack w="100%" spacing={5}>
              <FormControl id="name">
                <FormLabel>Your Name</FormLabel>
                <InputGroup borderColor="#E0E1E7">
                  <InputLeftElement pointerEvents="none">
                    <BsPerson color="gray.800" />
                  </InputLeftElement>
                  <Input
                    name="name"
                    type="text"
                    size="md"
                    placeholder={"Saif Ali"}
                    value={formDetails.name}
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <InputGroup borderColor="#E0E1E7">
                  <InputLeftElement pointerEvents="none">
                    <MdOutlineEmail color="gray.800" />
                  </InputLeftElement>
                  <Input
                    name="email"
                    type="email"
                    size="md"
                    placeholder={"saifali27906@gmail.com"}
                    value={formDetails.email}
                    onChange={handleChange}
                    required={true}
                  />
                </InputGroup>
              </FormControl>
              <FormControl id="message">
                <FormLabel>Message</FormLabel>
                <Textarea
                  name="message"
                  value={formDetails.message}
                  onChange={handleChange}
                  borderColor="gray.300"
                  _hover={{
                    borderRadius: "gray.300",
                  }}
                  placeholder="message"
                  h={"160px"}
                />
              </FormControl>
              <FormControl id="name" float="right">
                <Button
                  variant="solid"
                  bg={loading ? "#02054B" : "#0B0E3F"}
                  color="white"
                  type="submit"
                  _hover={{}}
                  disabled={loading ? true : false}
                >
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </FormControl>
            </VStack>
          </form>
        </Box>
      </Box>
    </Container>
  );
}
