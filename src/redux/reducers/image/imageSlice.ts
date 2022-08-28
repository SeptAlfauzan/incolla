import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface State {
  value: string;
  size: {
    width: number;
    height: number;
  };
}
const initialState: State = {
  value: "",
  size: {
    width: 0,
    height: 0,
  },
};

export const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setImageURL: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    setImageSize: (
      state,
      action: PayloadAction<{ width: number; height: number }>
    ) => {
      state.size = action.payload;
    },
  },
});

export const { setImageURL, setImageSize } = imageSlice.actions;
export default imageSlice.reducer;
