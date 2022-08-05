import { Box, LinkBox, Text } from "@chakra-ui/react";
import React, { MouseEventHandler } from "react";
import CanvasElement from "./components/Canvas";
import Preview from "./components/Preview";
import Setting from "./components/Setting";
import { Helmet } from "react-helmet";
import { useAppSelector } from "../../redux/hooks";
import NoData from "./components/NoData";

interface Props {}

const Customize: React.FC<Props> = () => {
  window.onbeforeunload = () =>
    "Data will be lost if you leave the page, are you sure?";

  const _image = useAppSelector((state) => state.image.value);

  if (_image === "") return <NoData />;
  return (
    <Box
      display={"flex"}
      width={"full"}
      borderWidth={"2px"}
      height={"100vh"}
      backgroundColor={"gray.100"}
      justifyContent={"center"}
      alignItems={"center"}
      flexWrap={"wrap"}
    >
      <Helmet>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Helmet>
      <Preview />
      <CanvasElement imageUrl={_image} />

      <Setting />
    </Box>
  );
};

export default Customize;
