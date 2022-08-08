import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  value: string;
}
const initialState: State = {
  value: "",
};

export const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    setCanvas: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setCanvas } = canvasSlice.actions;
export default canvasSlice.reducer;
