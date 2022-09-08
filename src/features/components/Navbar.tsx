import { Box, Button, color, Image, Link, useBoolean } from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { IoCloseSharp, IoMenuSharp } from "react-icons/io5";

const Navbar: React.FC = () => {
  const [flag, setFlag] = useBoolean(true);
  return (
    <Box
      width={{ base: "200px", md: "full" }}
      padding={{ base: "70px 20px", md: "10px 200px" }}
      flexDirection={{ base: "column", md: "row" }}
      alignItems={{ md: "center", base: "end" }}
      shadow={{ base: "xl", md: "sm" }}
      display={"flex"}
      gap={"10px"}
      top={0}
      right={0}
      background={"white"}
      zIndex={200}
      position={{ base: "fixed", md: "relative" }}
      height={{ base: "100vh", md: "fit-content" }}
      transform={"auto"}
      transition={"all"}
      transitionDuration={"400ms"}
      translateX={{ md: 0, base: flag ? "100%" : "0" }}
    >
      <Button
        display={{ base: "block", md: "none" }}
        position={"absolute"}
        top={"4"}
        right={flag ? "220px" : 4}
        background={"white"}
        borderWidth={"1px"}
        onClick={setFlag.toggle}
      >
        {flag ? <IoMenuSharp size={19} /> : <IoCloseSharp size={19} />}
      </Button>
      <Link as={RouterLink} _hover={{ color: "twitter.500" }} to={"/"}>
        <Image
          src="/src/assets/logo/incolla_logo (1).png"
          width={10}
          height={10}
        />
      </Link>
      <Link _hover={{ color: "twitter.500" }} href={"/#how"}>
        How to use
      </Link>
      <Link
        _hover={{
          color: { base: "twitter.500", md: "white" },
          background: { md: "twitter.500" },
        }}
        marginLeft={{ md: "auto" }}
        borderRadius={10}
        borderWidth={{ md: "1px" }}
        borderColor={{ md: "twitter.500" }}
        paddingX={{ md: 5 }}
        href={"/#upload"}
      >
        Generate sertificates
      </Link>
    </Box>
  );
};

export default Navbar;
