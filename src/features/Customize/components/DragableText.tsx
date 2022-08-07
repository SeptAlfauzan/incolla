import { Box, Text } from "@chakra-ui/react";
import React from "react";
import Draggable, {
  DraggableData,
  DraggableEvent,
  DraggableEventHandler,
} from "react-draggable";
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
    console.log(data);
    // setPosition({ x: data.x, y: data.y });
    dispatch(setTextPosition({ x: data.x, y: data.y }));
  };
  return (
    <Draggable
      handle=".handle"
      onStop={handleStopDrag}
      defaultPosition={{ x: text.value.x, y: text.value.y }}
      scale={1}
      bounds={bounds}
    >
      <Text
        className="handle"
        fontFamily={"Poppins"}
        borderWidth={2}
        fontSize={font.value.size}
        position={"absolute"}
        height={"fit-content"}
        width={"fit-content"}
        color={"red.400"}
      >
        {label}
      </Text>
    </Draggable>
  );
};
export default DraggableText;
