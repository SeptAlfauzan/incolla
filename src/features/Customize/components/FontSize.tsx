import {
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setSize } from "../../../redux/reducers/font/fontSlice";

const FontSize: React.FC = () => {
  const font = useAppSelector((state) => state.font);
  const dispatch = useAppDispatch();

  const handleChange = (value: string) => dispatch(setSize(Number(value)));
  return (
    <NumberInput
      onChange={handleChange}
      size="md"
      maxW={24}
      defaultValue={font.value.size}
      min={1}
    >
      <NumberInputField fontSize={12} />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};

export default FontSize;
