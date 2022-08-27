import { Box, Image, keyframes, Text, useBoolean } from "@chakra-ui/react";
import React from "react";
import { Keyframes } from "@emotion/react";
import { motion } from "framer-motion";
import SlideIndicator from "./SlideIndicator";
import { useTimer } from "../../hooks/useTimer";
import { Carousell } from "../../utils/carousell";

interface Instruction {
  description: string;
  imageURL: string;
}
export interface Instructions {
  data: Instruction[];
}

const animationKeyframes: Keyframes = keyframes`
  0% { transform: scale(1); opacity: 0%; }
  25% { transform: scale(1.2); opacity: 20%; }
  50% { transform: scale(1.2); opacity: 50%; }
  75% { transform: scale(1); opacity: 70%; }
  100% { transform: scale(1); opacity: 100%; }
`;

const animation = `${animationKeyframes} 1s ease-in-out`;
const DURATION = 3000;
const Container: React.FC<Instructions> = ({ data }) => {
  const [trigger, setTrigger] = useBoolean(false);
  const [activeIdx, setActiveIdx] = React.useState<number>(0);

  React.useEffect(() => {
    const [timer] = useTimer(
      () => Carousell.cycle(data.length, activeIdx, setActiveIdx),
      DURATION
    );
    return () => {
      clearInterval(timer);
    };
  }, [activeIdx]);

  return (
    <>
      <Box
        width={"full"}
        height={"full"}
        display={"flex"}
        borderWidth={"1px"}
        justifyContent={"center"}
        position={"relative"}
        overflow={"clip"}
        paddingTop={100}
      >
        {data.map((item: Instruction, key: number) => (
          <Box
            animation={activeIdx === key ? animation : ""}
            position={"absolute"}
            zIndex={activeIdx === key ? 100 : 0}
            key={key}
            width={"full"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Box
              borderRadius={10}
              boxSize="md"
              height={"200px"}
              overflow={"hidden"}
            >
              <Image src={item.imageURL} alt={item.description} />
            </Box>
            <Text marginTop={8} color={"blackAlpha.500"}>
              {item.description}
            </Text>
          </Box>
        ))}
      </Box>
      <SlideIndicator
        currentActive={activeIdx}
        slideLength={data.length}
        handleClick={setActiveIdx}
      />
    </>
  );
};

export default Container;
