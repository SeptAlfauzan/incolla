import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  value: string;
}
const initialState: State = {
  value: "",
};

export const previewImageSlice = createSlice({
  name: "preview image",
  initialState,
  reducers: {
    setPreviewImage: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setPreviewImage } = previewImageSlice.actions;
export default previewImageSlice.reducer;
