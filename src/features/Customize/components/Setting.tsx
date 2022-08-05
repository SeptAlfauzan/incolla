import { Box, Button } from "@chakra-ui/react";
import React from "react";

interface Props {}

const Setting: React.FC<Props> = () => {
  return (
    <Box
      height={{ base: "75%", md: "full" }}
      backgroundColor={"whiteAlpha.800"}
      width={{ base: "200px", md: "300px" }}
      display={"flex"}
      order={{ base: 2, md: 3 }}
      flexDirection={"column"}
      marginLeft={"auto"}
    >
      <Button
        borderWidth={"4px"}
        borderColor={"blackAlpha.700"}
        fontWeight={700}
        width={{ base: "full", md: "200px" }}
        marginX={"auto"}
        marginTop={"auto"}
        marginBottom={"18px"}
        borderRadius={10}
        backgroundColor={"white"}
        _hover={{
          backgroundColor: "blackAlpha.800",
          color: "white",
        }}
      >
        Download
      </Button>
    </Box>
  );
};

export default Setting;
