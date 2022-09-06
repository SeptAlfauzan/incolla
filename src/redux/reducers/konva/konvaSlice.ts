import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CanvasKonva from "../../../features/Customize/libs/konva";

interface State {
  value: CanvasKonva | null;
}
const initialState: State = {
  value: null,
};

export const konvaSlice = createSlice({
  name: "konva",
  initialState,
  reducers: {
    setKonvaObj: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setKonvaObj } = konvaSlice.actions;
export default konvaSlice.reducer;
