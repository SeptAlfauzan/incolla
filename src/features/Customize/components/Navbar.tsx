import {
  Box,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <Box
      display={"flex"}
      width={"full"}
      borderBottom={"1px"}
      borderColor={"blackAlpha.200"}
      fontSize={"sm"}
      padding={"10px 20px"}
      zIndex={400}
      backgroundColor={"white"}
    >
      <Menu>
        <MenuButton>
          <Box
            display={"flex"}
            alignItems={"end"}
            gap={1}
            textColor={"blackAlpha.600"}
          >
            <Image
              src="/src/assets/logo/incolla_logo (1).png"
              width={8}
              height={8}
            />{" "}
            <Text fontWeight={500} fontSize={20}>
              Incolla
            </Text>
            <Box marginBottom={2}>
              <IoIosArrowDown />
            </Box>
          </Box>
        </MenuButton>
        <MenuList zIndex={200}>
          <MenuItem as={Link} to={"/"}>
            Create new
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default Navbar;
