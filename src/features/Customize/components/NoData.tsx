import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const NoData: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      borderWidth="2px"
      borderColor={"gray.100"}
      width="auto"
      height="container.sm"
      display="flex"
      flexDirection={"column"}
      gap={"20px"}
      justifyContent="center"
      alignItems="center"
    >
      <Text fontWeight={300} fontSize="larger">
        There is no image and csv data uploaded! Please upload first in order to
        proceed into next step
      </Text>
      <Button onClick={() => navigate("/")}>Back to Home</Button>
    </Box>
  );
};

export default NoData;
