import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface State {
  value: string;
}
const initialState: State = {
  value: "",
};

export const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setImageURL: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setImageURL } = imageSlice.actions;
export default imageSlice.reducer;
