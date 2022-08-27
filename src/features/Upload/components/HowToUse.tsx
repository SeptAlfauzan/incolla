import { Box, Text } from "@chakra-ui/react";
import React from "react";
import Container, { Instructions } from "./intructions/Container";

const HowToUse: React.FC = () => {
  return (
    <Box width={"full"} height={"80vh"} id={"how"}>
      <Text fontSize={"2xl"} textAlign={"center"} fontWeight={"bold"}>
        Upload image template and CSV data, and ready to go!
      </Text>
      <Container data={instruction.data} />
    </Box>
  );
};

const instruction: Instructions = {
  data: [
    {
      description: "lorem",
      imageURL:
        "https://images.unsplash.com/photo-1426170042593-200f250dfdaf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80",
    },
    {
      description: "lorem",
      imageURL:
        "https://images.unsplash.com/photo-1517594632980-535c0c33173d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80",
    },
  ],
};

export default HowToUse;
