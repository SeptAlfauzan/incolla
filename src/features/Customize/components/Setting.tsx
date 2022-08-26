import { Box, Button, Link, Text, useBoolean } from "@chakra-ui/react";
import html2canvas from "html2canvas";
import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import { download, downloadAll } from "../utils/download";
import DownloadPreview from "./DownloadPreview";
import FontSelector from "./FontSelector";
import FontSize from "./FontSize";
import TextColor from "./TextColor";

interface Props {}

const Setting: React.FC<Props> = () => {
  const [minimize, setMinimize] = useBoolean(true);
  const font = useAppSelector((state) => state.font);
  const canvas = useAppSelector((state) => state.canvas);
  const selectedIndex = useAppSelector((state) => state.selectedIndex);

  const handleDownload = (event: React.MouseEvent<HTMLAnchorElement>) => {
    download(event, canvas.value[selectedIndex.value]);
  };

  const handleDownloadAll = (event: React.MouseEvent<HTMLAnchorElement>) =>
    downloadAll(event, canvas.value);
  return (
    <Box
      position={{ base: "absolute", md: "relative" }}
      top={0}
      right={0}
      zIndex={"10"}
      transform={"auto"}
      translateX={{ base: minimize ? "100%" : "0", md: 0 }}
      transition={"all"}
      transitionDuration={"200ms"}
      height={"full"}
      backgroundColor={"#ffffff"}
      width={{ base: "200px", md: "300px" }}
      display={"flex"}
      gap={"15px"}
      order={{ base: 2, md: 3 }}
      flexDirection={"column"}
      marginLeft={"auto"}
      paddingX={"18px"}
      paddingY={"28px"}
    >
      <Button
        borderWidth={"1px 1px 0 1px"}
        borderColor={"blackAlpha.700"}
        backgroundColor={"#ffffff"}
        borderRadius={"10px 10px 0 0"}
        transform={"auto"}
        rotate={"-90deg"}
        transitionDuration={"100ms"}
        transition={"all"}
        position={"fixed"}
        left={minimize ? "-154px" : "-65px"}
        top={"50vh"}
        _focus={{ boxShadow: "none", outline: "none" }}
        onClick={setMinimize.toggle}
        display={{ base: "block", md: "none" }}
      >
        Settings
      </Button>

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
      <DownloadPreview />
      <TextColor />
      <Box display={"flex"} flexDirection={"column"} marginTop={"auto"}>
        <Link
          borderWidth={"4px"}
          borderColor={"blackAlpha.700"}
          fontWeight={700}
          width={"full"}
          marginX={"auto"}
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
          Download
        </Link>
        <Link
          borderWidth={"4px"}
          borderColor={"blackAlpha.700"}
          fontWeight={700}
          width={"full"}
          marginX={"auto"}
          marginBottom={"18px"}
          borderRadius={10}
          backgroundColor={"white"}
          _hover={{
            backgroundColor: "blackAlpha.800",
            color: "white",
          }}
          textAlign={"center"}
          onClick={handleDownloadAll}
        >
          Download All
        </Link>
      </Box>
    </Box>
  );
};

export default Setting;
