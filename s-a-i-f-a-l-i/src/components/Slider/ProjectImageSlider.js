"use client";
import React, { useState } from "react";
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
} from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Slider from "react-slick";
import jobify1 from "@/assets/projects/jobify1.jpg";

const settings = {
  // dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function ProjectImageSlider({ sliderData }) {
  const [slider, setSlider] = useState(null);

  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "10%", md: "18px" });

  return (
    <Box
      position={"relative"}
      height={"240px"}
      width={"full"}
      overflow={"hidden"}
    >
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      <IconButton
        aria-label="left-arrow"
        variant="ghost"
        position="absolute"
        left={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
        backgroundColor={"rgba(2, 5, 75, 0.4)"}
      >
        <BiLeftArrowAlt size="24px" />
      </IconButton>
      <IconButton
        aria-label="right-arrow"
        variant="ghost"
        position="absolute"
        right={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickNext()}
        backgroundColor={"rgba(2, 5, 75, 0.4)"}
      >
        <BiRightArrowAlt size="24px" />
      </IconButton>
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {sliderData.map((slide, index) => (
          <Box
            key={index}
            height={"240px"}
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={`url(${slide.image?.src})`}
          >
            <Container size="container.lg" height="240px" position="relative">
              <Stack
                spacing={1}
                w={"full"}
                position="absolute"
                top="90%"
                transform="translate(0, -90%)"
                color={"orange.400"}
                align={"center"}
              >
                <Heading fontSize={{ base: "md" }}>{slide.title}</Heading>
              </Stack>
            </Container>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
