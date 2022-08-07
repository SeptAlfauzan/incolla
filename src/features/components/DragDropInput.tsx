import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

interface AcceptedFiles {
  [key: string]: string[];
}

interface Props {
  children: React.ReactNode;
  acceptedFilesProps: AcceptedFiles;
  isAccepted: React.Dispatch<React.SetStateAction<boolean>>;
  onAccept: (file: FileWithPath) => void;
  result: any;
}

const DragDropInput: React.FC<Props> = ({
  children,
  acceptedFilesProps,
  isAccepted,
  onAccept,
  result,
}) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    fileRejections,
    acceptedFiles,
  } = useDropzone({ accept: acceptedFilesProps });

  const [error, setError] = React.useState<string>("");
  const [file, setFile] = React.useState<string | undefined>("");

  React.useEffect(() => {
    fileRejections.map(({ file, errors }) => {
      isAccepted(false);
      setError(
        `${file.name} - ${file.size} bytes. ${errors.map(
          (error) => error.message
        )}`
      );
    });
  }, [fileRejections]);

  // React.useEffect(() => {
  //   //when result is changing
  //   console.log(result);
  // }, [result]);

  React.useEffect(() => {
    //when file is uploaded
    acceptedFiles.map((file: FileWithPath) => {
      setError("");
      onAccept(file);
    });
  }, [acceptedFiles]);

  return (
    <Box
      background={isDragActive ? "twitter.300" : ""}
      borderWidth={"2px"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      height={"200px "}
      borderColor={error ? "red.500" : "gray.500"}
      borderRadius={10}
      paddingX={"12px"}
      flexDirection={"column"}
      paddingY={"10px"}
      position={"relative"}
      borderStyle={"dashed"}
      _hover={{ cursor: "pointer" }}
      width={{ base: "full", md: "45%" }}
      {...getRootProps()}
    >
      <input accept="jpg, jpeg, png" {...getInputProps()} />
      {children}
      {error && (
        <Text
          color={"red.400"}
          position={"absolute"}
          bottom={"10px"}
          fontSize={12}
          left={"8px"}
        >
          {error}
        </Text>
      )}
    </Box>
  );
};
export default DragDropInput;
