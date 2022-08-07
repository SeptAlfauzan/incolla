import { Box, Text } from "@chakra-ui/react";
import React from "react";

const DraggableText: React.FC = () => {
  const [isDragging, setIsDragging] = React.useState<boolean>(false);

  const [diffX, setDiffX] = React.useState(0);
  const [diffY, setDiffY] = React.useState(0);
  const [left, setLeft] = React.useState(0);
  const [top, setTop] = React.useState(0);

  const startDragging = (
    event:
      | React.MouseEvent<HTMLParagraphElement>
      | React.TouchEvent<HTMLParagraphElement>
  ) => {
    const e = event as React.MouseEvent<HTMLParagraphElement>;
    setIsDragging(true);
    setDiffX(e.screenX - e.currentTarget.getBoundingClientRect().left);
    setDiffY(e.screenY - e.currentTarget.getBoundingClientRect().top);
  };

  const handleDrag = (
    event:
      | React.MouseEvent<HTMLParagraphElement>
      | React.TouchEvent<HTMLParagraphElement>
  ) => {
    if (!isDragging) return;
    const e = event as React.MouseEvent<HTMLParagraphElement>;
    const left = e.screenX - diffX;
    const top = e.screenY - diffY;
    console.log(e.screenX);
    setLeft(left);
    setTop(top);
  };

  return (
    <Box width={"full"} height={"100vh"} backgroundColor={"black"}>
      <Text
        onMouseDown={startDragging}
        onTouchStart={startDragging}
        onMouseUp={() => setIsDragging(false)}
        onTouchEnd={() => setIsDragging(false)}
        onMouseMove={(e) => handleDrag(e)}
        onTouchMove={(e) => handleDrag(e)}
        borderWidth={2}
        color={"white"}
        fontSize={"2xl"}
        position={"absolute"}
        top={top}
        left={left}
      >
        lorem ipsum
      </Text>
    </Box>
  );
};
export default DraggableText;
