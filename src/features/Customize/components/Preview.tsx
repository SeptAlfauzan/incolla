import { Box, Button, Text, useBoolean } from "@chakra-ui/react";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setSelected } from "../../../redux/reducers/selected/selectedSlice";
import Card from "./Card";

interface Props {}

const Preview: React.FC<Props> = () => {
  const [flag, setFlag] = useBoolean();
  const _csv = useAppSelector((state) => state.csv.value);
  const _activeIndex = useAppSelector((state) => state.selectedIndex);
  const _image = useAppSelector((state) => state.image.value);
  const dispatch = useAppDispatch();

  const handleClick = (i: number) => {
    dispatch(setSelected(i));
  };

  const toggleView = () => {
    alert();
  };

  return (
    <Box
      width={{ base: "100%", md: "200px" }}
      height={{ base: "25%", md: "full" }}
      backgroundColor={"#ffffff"}
      transition={"all"}
      transitionDuration={"200ms"}
      display={"flex"}
      flexDirection={"column"}
      gap={"10px"}
      paddingTop={flag ? "20px" : 0}
      paddingX={"20px"}
      bottom={0}
      zIndex={"200"}
      transform={"auto"}
      translateY={{ base: flag ? 0 : "25vh", md: 0 }}
      position={{ base: "absolute", md: "relative" }}
      order={{ base: "3", md: "1" }}
    >
      <Text
        textAlign={"start"}
        fontSize={18}
        display={{ base: "none", md: "block" }}
      >
        Preview
      </Text>
      <Button
        zIndex={"100"}
        display={{ base: "block", md: "none" }}
        onClick={setFlag.toggle}
        position={{ base: "fixed", md: "relative" }}
        bottom={{ base: "100px", md: 0 }}
        fontSize={18}
        color={"blackAlpha.700"}
        paddingX={"8px"}
        top={"-10"}
        left={5}
        borderWidth={"1px 1px 0 1px"}
        borderColor={"blackAlpha.700"}
        borderRadius={"10px 10px 0 0"}
        backgroundColor={"white"}
      >
        Preview
      </Button>
      <Box
        gap={"12px"}
        bottom={0}
        height={"full"}
        width={"full"}
        display={"flex"}
        flexDirection={{ base: "row", md: "column" }}
        overflowY={{ base: "hidden", md: "scroll" }}
        overflowX={{ base: "scroll", md: "hidden" }}
        paddingX={"8px"}
      >
        {_csv.map((data: string, i: number) => (
          <Box key={data + i} display={"flex"} width={"full"}>
            <Text>{i + 1}</Text>
            <Card
              isActive={_activeIndex.value == i}
              label={data}
              onClick={() => handleClick(i)}
            >
              <img className="preview-download" src={_image} loading="lazy" />
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Preview;
