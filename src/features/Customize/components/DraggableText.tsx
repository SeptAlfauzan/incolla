import { Box, Text } from "@chakra-ui/react";
import React from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  setTextPosition,
  setWidth,
} from "../../../redux/reducers/text/textSlice";

interface Props {
  bounds: string;
  label: string;
  longestName: string;
  disabled: boolean;
}

const DraggableText: React.FC<Props> = ({
  bounds,
  label,
  longestName,
  disabled,
}) => {
  const width = useAppSelector((state) => state.text.value.width);
  const textRef = React.useRef<HTMLParagraphElement | null>(null);
  const draggableRef = React.useRef<Draggable | null>(null);

  const dispatch = useAppDispatch();
  const text = useAppSelector((state) => state.text);
  const font = useAppSelector((state) => state.font);
  const [hidden, setHidden] = React.useState<boolean>(true);

  const handleOnMouseDown = (e: MouseEvent) => {
    e as MouseEvent;
  };
  const handleStopDrag = (e: DraggableEvent, data: DraggableData) => {
    setHidden(true);
    dispatch(setTextPosition({ x: data.x, y: data.y }));
  };

  const measureTextWidth = () => {
    const text = longestName;
    const fontText = `${font.value.size}px ${font.value.family}`;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context ? (context.font = fontText) : null;
    return context?.measureText(text).width;
  };

  React.useEffect(() => {
    const _width = measureTextWidth() || 0;
    dispatch(setWidth(_width));
  }, [font.value]);

  return (
    <Draggable
      disabled={disabled}
      onDrag={() => setHidden(false)}
      ref={draggableRef}
      handle=".handle"
      onMouseDown={handleOnMouseDown}
      onStop={handleStopDrag}
      defaultPosition={{ x: text.value.position.x, y: text.value.position.y }}
      scale={1}
      bounds={bounds}
    >
      <Box
        position={"absolute"}
        zIndex={300}
        display={"flex"}
        width={width}
        justifyContent={"start"}
        cursor={disabled ? "not-allowed" : "move"}
        borderWidth={2}
        borderColor={"gray.400"}
        borderStyle={"dashed"}
        className="handle"
      >
        <Text
          opacity={hidden ? 0 : 1}
          ref={textRef}
          padding={0}
          fontFamily={"Poppins"}
          fontSize={font.value.size}
          textOverflow={"clip"}
          height={"fit-content"}
          wordBreak={"keep-all"}
          color={"black"}
        >
          {label}
        </Text>
      </Box>
    </Draggable>
  );
};
export default DraggableText;
