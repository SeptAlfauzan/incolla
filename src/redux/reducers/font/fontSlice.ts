import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface Font {
  family: string;
  url: string;
  size: number;
}
interface State {
  value: Font;
}

const initialState: State = {
  value: {
    family: "Poppins",
    url: "/src/assets/fonts/poppins.ttf",
    size: 14,
  },
};

const fontSlice = createSlice({
  name: "font",
  initialState,
  reducers: {
    setFont: (state, action: PayloadAction<Font>) => {
      state.value = action.payload;
    },
    setSize: (state, action: PayloadAction<number>) => {
      state.value.size = action.payload;
    },
  },
});

export const { setFont, setSize } = fontSlice.actions;
export default fontSlice.reducer;
