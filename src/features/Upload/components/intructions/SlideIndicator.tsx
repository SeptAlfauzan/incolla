import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
  slideLength: number;
  currentActive: number;
  handleClick: (arg: number) => void;
}
const SlideIndicator: React.FC<Props> = ({
  currentActive,
  handleClick,
  slideLength,
}) => {
  return (
    <Box width={"full"} display={"flex"} justifyContent={"center"} gap={"10px"}>
      {new Array(slideLength).fill(null).map((_, i: number) => (
        <Button
          background={i == currentActive ? "black" : "antiquewhite"}
          _hover={{
            background: i === currentActive ? "blackAlpha.800" : "twitter.50",
          }}
          borderRadius={"full"}
          size={"xs"}
          key={i}
          onClick={() => handleClick(i)}
        >
          <Text color={i === currentActive ? "white" : "black"}>{i + 1}</Text>
        </Button>
      ))}
    </Box>
  );
};
export default SlideIndicator;
