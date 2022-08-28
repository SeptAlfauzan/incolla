import { Button } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface Props {
  handleClick?: () => void;
  children: ReactNode;
}
const ButtonIcon: React.FC<Props> = ({ handleClick, children }) => {
  return (
    <Button
      onClick={handleClick}
      fontSize={100}
      backgroundColor={"white"}
      borderWidth={"1px"}
      padding={"10px"}
    >
      {children}
    </Button>
  );
};
export default ButtonIcon;
