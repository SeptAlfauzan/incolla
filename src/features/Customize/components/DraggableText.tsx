import { Text } from "@chakra-ui/react";
import React from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setTextPosition } from "../../../redux/reducers/text/textSlice";

interface Props {
  bounds: string;
  label: string;
}

const DraggableText: React.FC<Props> = ({ bounds, label }) => {
  const dispatch = useAppDispatch();
  const text = useAppSelector((state) => state.text);
  const font = useAppSelector((state) => state.font);
  const handleStopDrag = (e: DraggableEvent, data: DraggableData) => {
    dispatch(setTextPosition({ x: data.x, y: data.y }));
  };
  return (
    <Draggable
      handle=".handle"
      onStop={handleStopDrag}
      defaultPosition={{ x: text.value.position.x, y: text.value.position.y }}
      scale={1}
      bounds={bounds}
    >
      <Text
        padding={0}
        cursor={"move"}
        className="handle"
        fontFamily={"Poppins"}
        borderWidth={2}
        borderStyle={"dashed"}
        borderColor={"gray.400"}
        fontSize={font.value.size}
        position={"absolute"}
        textOverflow={"clip"}
        height={"fit-content"}
        width={"fit-content"}
        wordBreak={"keep-all"}
        color={"red.400"}
      >
        {label}
      </Text>
    </Draggable>
  );
};
export default DraggableText;
