import { Box, Text } from "@chakra-ui/react";
import React, { ReactNode } from "react";
interface Props {
  children: ReactNode;
  onClick: () => void;
}
const Card: React.FC<Props> = ({ children, onClick }) => {
  return (
    <Box width={"full"}>
      <Box
        cursor={"pointer"}
        onClick={onClick}
        width={{ base: "200px", md: "full" }}
        flex={"none"}
        height={{ base: "full", md: "100px" }}
        borderWidth={"1px"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        borderRadius={10}
        backgroundColor={"gray.100"}
      >
        {children}
      </Box>
      <Text fontSize={"12px"} color={"blackAlpha.600"}>
        {children}
      </Text>
    </Box>
  );
};

export default Card;
