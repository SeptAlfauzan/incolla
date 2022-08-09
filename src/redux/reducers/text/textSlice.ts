import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Position {
  x: number;
  y: number;
}
interface State {
  value: {
    position: Position;
    color: string;
  };
}

const initialState: State = {
  value: {
    position: {
      x: 100,
      y: 100,
    },
    color: "black",
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
  },
});

export const { setTextPosition, setTextColor } = textSlice.actions;
export default textSlice.reducer;
