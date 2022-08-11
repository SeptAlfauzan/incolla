import { Box, Text, useBoolean } from "@chakra-ui/react";
import React from "react";
import { useAppSelector } from "../../../redux/hooks";

const DownloadPreview: React.FC = () => {
  const canvas = useAppSelector((state) => state.canvas);
  const selectedIndex = useAppSelector((state) => state.selectedIndex);

  return (
    <Box>
      <Text marginBottom={4} color={"gray.500"}>
        Download Preview
      </Text>
      <Box width={"full"} height={"120px"} background={"gray.100"} padding={2}>
        {!canvas.value[selectedIndex.value] ? (
          "loading.."
        ) : (
          <img
            className="preview-download"
            src={canvas.value[selectedIndex.value]}
            loading="lazy"
          />
        )}
      </Box>
    </Box>
  );
};

export default DownloadPreview;
