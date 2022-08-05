import { Box, Button, Text, Tooltip } from "@chakra-ui/react";
import { FcFile, FcImageFile } from "react-icons/fc";
import React from "react";
import DragDropInput from "../components/DragDropInput";
import { useCSV } from "../Upload/hooks/useCsv";
import { FileWithPath } from "react-dropzone";
import { useImage } from "./hooks/useImage";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setImageURL } from "../../redux/reducers/image/imageSlice";
import { useNavigate } from "react-router-dom";
import { setCSVdata } from "../../redux/reducers/csv/csvSlice";
import Preview from "./components/Preview";

interface Datas {
  imageData: string;
  csvData: string[];
}
const Upload: React.FC = () => {
  window.onbeforeunload = () =>
    "Data will be lost if you leave the page, are you sure?";

  // redux
  const _image = useAppSelector((state) => state.image.value);
  const _csv = useAppSelector((state) => state.csv.value);
  const dispatch = useAppDispatch();

  const [imageaccept, setImageaccept] = React.useState<boolean>(false);
  const [csvaccept, setCsvaccept] = React.useState<boolean>(false);
  // custom hooks
  const [csvData, { setParseCSVFile }] = useCSV();
  const [imageData, { setParseImageFile }] = useImage();
  const navigate = useNavigate();

  const onAcceptCSVFile = (file: FileWithPath) => {
    // setFile(file.path);
    // isAccepted(true);
    setParseCSVFile(file);
  };
  const onAcceptImageFile = (file: FileWithPath) => setParseImageFile(file);

  const saveLocalData = (data: Datas) => {
    if (data.imageData !== "") dispatch(setImageURL(data.imageData));
    if (data.csvData.length !== 0) dispatch(setCSVdata(data.csvData));
  };

  React.useEffect(() => {
    console.log(csvData);
    saveLocalData({
      imageData,
      csvData,
    });
  }, [imageData, csvData]);

  return (
    <Box
      display={"flex"}
      paddingX={{ base: "14px", md: "200px" }}
      flexDirection={"column"}
      justifyContent={"center"}
    >
      <Box
        marginTop={{ base: "10px", md: "10vh" }}
        display={"flex"}
        width={"full"}
        marginBottom={70}
        alignItems={"start"}
        flexWrap={"wrap"}
        justifyContent={"center"}
      >
        <Text
          width={"full"}
          fontWeight={"bold"}
          textAlign={"left"}
          fontSize="6xl"
        >
          Incolla
        </Text>
        <Box
          flexGrow={1}
          width={{ base: "full", md: "50%" }}
          display={"flex"}
          justifyContent={{ base: "center", lg: "start" }}
          flexWrap={"wrap"}
          gap="10px"
        >
          <Box width={"full"} marginBottom={8}>
            <Text textAlign={"left"} color={"blackAlpha.700"}>
              Easy way to generate bunch sertificates, only need the names list
              and the certificate's image
            </Text>
          </Box>
          <DragDropInput
            onAccept={onAcceptImageFile}
            result={imageData}
            acceptedFilesProps={{ "image/png": [".png", ".jpg", ".jpeg"] }}
            isAccepted={setImageaccept}
          >
            <FcImageFile size={60} />
            <Text color={"blue.400"} textAlign={"center"} fontSize={14}>
              Drag your certificate's image template
            </Text>
          </DragDropInput>
          <DragDropInput
            onAccept={onAcceptCSVFile}
            result={csvData}
            acceptedFilesProps={{ "text/csv": [".csv"] }}
            isAccepted={setCsvaccept}
          >
            <FcFile size={60} />
            <Text color={"blue.400"} textAlign={"center"} fontSize={14}>
              Drag your .csv file
            </Text>
          </DragDropInput>
          <Button
            width={{ base: "full", lg: "130px" }}
            disabled={imageData !== "" && csvData.length !== 0 ? false : true}
            color={
              imageData !== "" && csvData.length !== 0
                ? "whiteAlpha.800"
                : "black"
            }
            _hover={{
              color: "white",
              bgGradient: "linear(to-bl, #7928CA, #FF0080 50%)",
              transition: "all 100ms linear",
            }}
            bgGradient={
              imageData !== "" && csvData.length !== 0
                ? "linear(to-l, #7928CA, #FF0080)"
                : "ButtonFace"
            }
            position={{ base: "absolute", md: "relative" }}
            bottom={0}
            alignSelf={{ base: "center", md: "flex-start" }}
            onClick={() => navigate("/customize")}
            marginTop={"10px"}
            display={"block"}
          >
            Next Step
          </Button>
        </Box>
        <Box
          backgroundColor={"twitter.50"}
          borderRadius={15}
          alignSelf={"flex-start"}
          justifySelf={"flex-end"}
          marginLeft={{ base: 0, lg: "50px" }}
          marginTop={{ base: "20px", lg: 0 }}
          width={{ base: "100%", lg: "300px" }}
        >
          <Preview imageURL={imageData} nameList={csvData} />
        </Box>
      </Box>
    </Box>
  );
};

export default Upload;
