import { Box, Text } from "@chakra-ui/react";
import React from "react";

const NotFound: React.FC = () => {
  return (
    <Box
      borderWidth="2px"
      borderColor={"gray.100"}
      width="auto"
      height="container.sm"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Text fontWeight={300} fontSize="larger">
        404 | Page Not Found
      </Text>
    </Box>
  );
};

export default NotFound;
