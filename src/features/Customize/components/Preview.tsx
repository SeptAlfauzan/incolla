import { Box, Button, Text, useBoolean } from "@chakra-ui/react";
import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import Card from "./Card";

interface Props {}

const Preview: React.FC<Props> = () => {
  const [flag, setFlag] = useBoolean();
  const _csv = useAppSelector((state) => state.csv.value);

  const toggleView = () => {
    alert();
  };
  return (
    <Box
      width={{ base: "full", md: "200px" }}
      height={{ base: flag ? "25%" : "0", md: "full" }}
      backgroundColor={"#ffffff"}
      transition={"all"}
      transitionDuration={"200ms"}
      display={"flex"}
      flexDirection={"column"}
      gap={"10px"}
      paddingTop={flag ? "20px" : 0}
      position={"relative"}
      order={{ base: "3", md: "1" }}
    >
      <Button
        onClick={setFlag.toggle}
        position={{ base: "absolute", md: "relative" }}
        top={{ base: "-35px", md: 0 }}
        fontSize={18}
        color={"blackAlpha.700"}
        paddingX={"8px"}
        backgroundColor={"white"}
        _hover={{ backgroundColor: "twitter.600", color: "#ffffff" }}
      >
        Preview
      </Button>
      <Box
        gap={"10px"}
        bottom={0}
        height={"full"}
        width={"full"}
        display={"flex"}
        flexDirection={{ base: "row", md: "column" }}
        overflowY={{ base: "hidden", md: "scroll" }}
        overflowX={{ base: "scroll", md: "hidden" }}
      >
        {_csv.map((data: string, i: number) => (
          <Card key={data + i}>{data}</Card>
        ))}
      </Box>
    </Box>
  );
};

export default Preview;
