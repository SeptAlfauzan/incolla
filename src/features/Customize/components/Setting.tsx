import { Box, Button, Link, Text } from "@chakra-ui/react";
import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import { download } from "../libs/download";
import FontSelector from "./FontSelector";
import FontSize from "./FontSize";
import TextColor from "./TextColor";

interface Props {}

const Setting: React.FC<Props> = () => {
  const font = useAppSelector((state) => state.font);
  const canvas = useAppSelector((state) => state.canvas);
  const selectedIndex = useAppSelector((state) => state.selectedIndex);

  // React.useEffect(() => {
  //   alert(selectedIndex.value);
  // }, [canvas.value]);
  const handleDownload = (event: React.MouseEvent<HTMLAnchorElement>) =>
    download(event, canvas.value);

  return (
    <Box
      height={{ base: "75%", md: "full" }}
      backgroundColor={"whiteAlpha.800"}
      width={{ base: "200px", md: "300px" }}
      display={"flex"}
      gap={"15px"}
      order={{ base: 2, md: 3 }}
      flexDirection={"column"}
      marginLeft={"auto"}
      paddingX={"18px"}
      paddingY={"28px"}
    >
      <Text>Settings</Text>
      <Box>
        <Text fontSize={14} marginBottom={5}>
          Text
        </Text>
        <Box display={"flex"} gap={2}>
          <FontSelector />
          <FontSize />
        </Box>
      </Box>
      <Box>
        <Text marginBottom={4} color={"gray.500"}>
          Download Preview
        </Text>
        <img src={canvas.value} />
      </Box>
      <TextColor />
      <Link
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
        textAlign={"center"}
        onClick={handleDownload}
      >
        {/* <Button
        > */}
        Download
        {/* </Button> */}
      </Link>
    </Box>
  );
};

export default Setting;
