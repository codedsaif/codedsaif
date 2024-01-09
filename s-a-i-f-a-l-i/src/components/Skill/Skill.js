import { Avatar, Box, Flex, keyframes, Tooltip } from "@chakra-ui/react";
import html from "@/assets/html.png";
import css from "@/assets/css.png";

export default function Skill({
  tipText = "Skill",
  picSrc = "https://avatars.githubusercontent.com/u/108917329?v=4",
}) {
  const size = "96px";
  const color = "#02054B";

  const pulseRing = keyframes`
	0% {
    transform: scale(0.33);
  }
  40%,
  50% {
    opacity: 0.30;
  }
  100% {
    opacity: 0.10;
  }
	`;

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      h={"160px"}
      w={"160px"}
      overflow="hidden"
      borderRadius={"16px"}
    >
      {/* Ideally, only the box should be used. The <Flex /> is used to style the preview. */}
      <Box
        as="div"
        position="relative"
        w={size}
        h={size}
        _before={{
          content: "''",
          position: "relative",
          display: "block",
          width: "300%",
          height: "300%",
          boxSizing: "border-box",
          marginLeft: "-100%",
          marginTop: "-100%",
          borderRadius: "50%",
          bgColor: color,
          animation: `2.25s ${pulseRing} cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite`,
        }}
      >
        <Tooltip hasArrow label={tipText} closeDelay={300} maxW={"200px"}>
          <Avatar
            // src={`${"https://avatars.githubusercontent.com/u/108917329?v=4"}`}
            src={picSrc}
            size="full"
            position="absolute"
            top={0}
          />
        </Tooltip>
      </Box>
    </Flex>
  );
}
