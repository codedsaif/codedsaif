"use client";
import {
  Container,
  Box,
  SimpleGrid,
  Heading,
  Text,
  Image,
  Stat,
  Stack,
  StatLabel,
  StatNumber,
  Grid,
  GridItem,
  useColorModeValue,
} from "@chakra-ui/react";
import GitHubCalendar from "react-github-calendar";

export default function BasicStatistics() {
  const themeColor = useColorModeValue("2077", "2077");
  return (
    <Container
      id="#Statistics"
      maxW={"7xl"}
      borderRadius="lg"
      bg={useColorModeValue("#02054B", "#010225")}
      color={"gray.500"}
      py={{ base: 20, md: 28 }}
    >
      <Stack textAlign={"center"} align={"center"} pb={{ base: 10 }}>
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
          color="#DCE2FF"
        >
          GitHub Commit{" "}
          <Text as={"span"} color={"orange.400"}>
            History
          </Text>
        </Heading>
      </Stack>
      <Grid templateColumns="repeat(2, 1fr)" columnGap={8} rowGap={16}>
        <GridItem colSpan={2}>
          <Image
            objectFit="cover"
            h={"100%"}
            w={"100%"}
            src="http://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=S-a-i-f-A-l-i&theme=2077"
            alt="S-a-i-f-A-l-i's Activity Graph"
          />
        </GridItem>
        <GridItem colSpan={{ base: 2, md: 1 }}>
          <Image
            objectFit="cover"
            h={"100%"}
            w={"100%"}
            borderRadius={"lg"}
            src="https://github-readme-streak-stats.herokuapp.com/?user=S-a-i-f-A-l-i&"
            alt="S-a-i-f-A-l-i's Activity Graph"
          />
        </GridItem>
        <GridItem colSpan={{ base: 2, md: 1 }}>
          <Image
            h={"100%"}
            w={"100%"}
            borderRadius={"lg"}
            src={`https://github-readme-stats.vercel.app/api?username=S-a-i-f-A-l-i&show_icons=true&locale=en`}
            alt="S-a-i-f-A-l-i's Github Stats"
          />
        </GridItem>
        <GridItem colSpan={2}>
          <GitHubCalendar
            username="S-a-i-f-A-l-i"
            blockSize={18}
            blockMargin={8}
            style={{
              margin: "auto",
              alignItems: "center",
              width: "100%",
            }}
          />
        </GridItem>
      </Grid>
    </Container>
  );
}
