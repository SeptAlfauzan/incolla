import { Box, Text } from "@chakra-ui/react";
import React, { ReactNode } from "react";
interface Props {
  children: ReactNode;
  label: string;
  onClick: () => void;
  isActive?: boolean;
}
const Card: React.FC<Props> = ({ children, label, onClick, isActive }) => {
  return (
    <Box
      width={"full"}
      display={"flex"}
      flexDirection={"column"}
      marginLeft={"10px"}
    >
      <Box
        order={{ base: 2, md: 1 }}
        cursor={"pointer"}
        onClick={onClick}
        width={{ base: "200px", md: "full" }}
        flex={"none"}
        height={{ base: "full", md: "100px" }}
        borderWidth={isActive ? "2px" : "1px"}
        borderColor={isActive ? "twitter.400" : "transparent"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        borderRadius={10}
        backgroundColor={"gray.100"}
      >
        {children}
      </Box>
      <Text
        order={{ base: 1, md: 2 }}
        color={"blackAlpha.600"}
        marginBottom={"10px"}
      >
        {label}
      </Text>
    </Box>
  );
};

export default Card;
