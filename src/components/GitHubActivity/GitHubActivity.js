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
      id="Statistics"
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
            src="https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=codedsaif&theme=radical"
            alt="codedsaif's Activity Graph"
          />
        </GridItem>
        <GridItem colSpan={{ base: 2, md: 1 }}>
          <Image
            objectFit="cover"
            h={"100%"}
            w={"100%"}
            borderRadius="lg"
            src="https://github-readme-activity-graph.vercel.app/graph?username=codedsaif&custom_title=Saif%20Ali's%20GitHub%20Activity%20Graph&bg_color=0D1117&color=7F3FBF&line=7F3FBF&border=7F3FBF&point=7F3FBF&area_color=FFFFFF&title_color=FFFFFF&area=true"
            alt="Saif's GitHub streak"
          />
        </GridItem>
        <GridItem colSpan={{ base: 2, md: 1 }}>
          <Image
            objectFit="cover"
            h={"100%"}
            w={"100%"}
            src="https://github-readme-streak-stats.herokuapp.com/?user=codedsaif&theme=radical&border=7F3FBF&background=0D1117"
            alt="Saif's GitHub streak"
          />
        </GridItem>

        <GridItem colSpan={{ base: 2, md: 1 }}>
          <Image
            h={"100%"}
            w={"100%"}
            src={`https://denvercoder1-github-readme-stats.vercel.app/api?username=codedsaif&show_icons=true&count_private=true&theme=react&border_color=7F3FBF&bg_color=0D1117&title_color=F85D7F&icon_color=F8D866`}
            alt="Saif Ali's Github Stats"
          />
        </GridItem>
        <GridItem colSpan={{ base: 2, md: 1 }}>
          <Image
            objectFit="cover"
            h={"100%"}
            w={"100%"}
            src="https://denvercoder1-github-readme-stats.vercel.app/api/top-langs/?username=codedsaif&langs_count=8&layout=compact&theme=react&border_color=7F3FBF&bg_color=0D1117&title_color=F85D7F&icon_color=F8D866"
            alt="Saif Ali's Top Languages"
          />
        </GridItem>
        <GridItem colSpan={2}>
          <GitHubCalendar
            username="codedsaif"
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
