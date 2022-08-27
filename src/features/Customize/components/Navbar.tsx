import { Box, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React from "react";
import {
  IoArrowDownSharp,
  IoCaretDownSharp,
  IoChevronDownCircleOutline,
} from "react-icons/io5";
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
      backgroundColor={"white"}
    >
      <Menu>
        <MenuButton>Incolla</MenuButton>
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
