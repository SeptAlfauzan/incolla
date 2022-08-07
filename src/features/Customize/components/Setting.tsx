import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import FontSelector from "./FontSelector";
import FontSize from "./FontSize";

interface Props {}

const Setting: React.FC<Props> = () => {
  const font = useAppSelector((state) => state.font);
  return (
    <Box
      height={{ base: "75%", md: "full" }}
      backgroundColor={"whiteAlpha.800"}
      width={{ base: "200px", md: "300px" }}
      display={"flex"}
      order={{ base: 2, md: 3 }}
      flexDirection={"column"}
      marginLeft={"auto"}
      paddingX={"18px"}
      paddingY={"28px"}
    >
      <Text marginBottom={10}>Settings</Text>
      <>
        <Text fontSize={14} marginBottom={5}>
          Text
        </Text>
        <Box display={"flex"} gap={2}>
          <FontSelector />
          <FontSize />
        </Box>
      </>
      <Button
        borderWidth={"4px"}
        borderColor={"blackAlpha.700"}
        fontWeight={700}
        width={"full"}
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
