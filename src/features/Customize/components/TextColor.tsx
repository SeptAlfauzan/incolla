import { Box, Input, Text, useBoolean } from "@chakra-ui/react";
import React, { ChangeEvent, ChangeEventHandler, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setTextColor } from "../../../redux/reducers/text/textSlice";

const TextColor: React.FC = () => {
  const text = useAppSelector((state) => state.text);
  const dispatch = useAppDispatch();

  const [isStop, setISStop] = useBoolean(false);
  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    // console.log(e.currentTarget.value);
    dispatch(setTextColor(e.currentTarget.value));
  };

  return (
    <Box display={"flex"} gap={"10px"}>
      <Text>Text Color</Text>
      <Input
        onMouseDown={setISStop.off}
        onTouchStart={setISStop.off}
        onMouseUp={setISStop.on}
        onTouchEnd={setISStop.on}
        onChange={handleChange}
        // onChange={handleChange}
        type={"color"}
        outline={"none"}
        border={"none"}
        padding={0}
        overflow={"clip"}
        width={10}
      />
    </Box>
  );
};

export default TextColor;
