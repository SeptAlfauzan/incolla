import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Position {
  x: number;
  y: number;
}
interface State {
  value: Position;
}

const initialState: State = {
  value: {
    x: 100,
    y: 100,
  },
};

const textSlice = createSlice({
  name: "position",
  initialState,
  reducers: {
    setTextPosition: (state, action: PayloadAction<Position>) => {
      state.value = action.payload;
    },
  },
});

export const { setTextPosition } = textSlice.actions;
export default textSlice.reducer;
