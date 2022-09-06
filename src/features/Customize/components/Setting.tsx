import { Box, Button, Link, Text, useBoolean } from "@chakra-ui/react";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  download,
  downloadAll,
  downloadFromKonva,
  downloadKonvaAll,
} from "../utils/download";
import DownloadPreview from "./DownloadPreview";
import FontSelector from "./FontSelector";
import FontSize from "./FontSize";
import TextColor from "./TextColor";
import {
  AiOutlineAlignLeft,
  AiOutlineAlignCenter,
  AiOutlineAlignRight,
} from "react-icons/ai";
import ButtonIcon from "./ButtonIcon";
import { setAlign } from "../../../redux/reducers/text/textSlice";

interface Props {}

const Setting: React.FC<Props> = () => {
  const [minimize, setMinimize] = useBoolean(true);
  const font = useAppSelector((state) => state.font);
  const canvas = useAppSelector((state) => state.canvas);
  const csv = useAppSelector((state) => state.csv);
  const konva = useAppSelector((state) => state.konva);
  const [loading, setLoading] = React.useState<boolean>(false);

  const selectedIndex = useAppSelector((state) => state.selectedIndex);
  const dispatch = useAppDispatch();

  const handleDownload = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // konva.value?.textLayer?.setText("asdasdasd");
    setLoading(true);
    downloadFromKonva(event, konva.value);
    setLoading(false);
  };

  const handleDownloadAll = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setLoading(true);
    downloadKonvaAll(event, csv.value, konva.value);
    setLoading(false);
  };
  return (
    <Box
      position={{ base: "absolute", md: "relative" }}
      top={0}
      right={0}
      zIndex={"100"}
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
        <Box display={"flex"} flexWrap={"wrap"} gap={2}>
          <Box width={"100px"} display={"flex"} gap={2}>
            <ButtonIcon handleClick={() => dispatch(setAlign("left"))}>
              <AiOutlineAlignLeft />
            </ButtonIcon>
            <ButtonIcon handleClick={() => dispatch(setAlign("center"))}>
              <AiOutlineAlignCenter />
            </ButtonIcon>
            <ButtonIcon handleClick={() => dispatch(setAlign("right"))}>
              <AiOutlineAlignRight />
            </ButtonIcon>
          </Box>
          <Box display={"flex"} gap={2}>
            <FontSelector />
            <FontSize />
          </Box>
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
          {loading ? "Please wait" : "Download"}
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
          {loading ? "Please wait" : "Download All"}
        </Link>
      </Box>
    </Box>
  );
};

export default Setting;
