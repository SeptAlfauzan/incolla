import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Position, Text } from "../../../interfaces/text";

interface State {
  value: Text;
}

const initialState: State = {
  value: {
    position: {
      x: 100,
      y: 100,
    },
    color: "black",
    align: "center",
    width: 0,
  },
};

const textSlice = createSlice({
  name: "position",
  initialState,
  reducers: {
    setTextPosition: (state, action: PayloadAction<Position>) => {
      state.value.position = action.payload;
    },
    setTextColor: (state, action: PayloadAction<string>) => {
      state.value.color = action.payload;
    },
    setAlign: (state, action: PayloadAction<"center" | "left" | "right">) => {
      state.value.align = action.payload;
    },
    setWidth: (state, action: PayloadAction<number>) => {
      state.value.width = action.payload;
    },
  },
});

export const { setTextPosition, setTextColor, setAlign, setWidth } =
  textSlice.actions;
export default textSlice.reducer;
