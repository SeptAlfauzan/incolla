import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  value: HTMLCanvasElement | null;
}
const initialState: State = {
  value: null,
};

export const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    setCanvas: (state, action: PayloadAction<HTMLCanvasElement>) => {
      console.log(state);
      console.log(action.payload);
      // state.value = action.payload;
    },
  },
});

export const { setCanvas } = canvasSlice.actions;
export default canvasSlice.reducer;
