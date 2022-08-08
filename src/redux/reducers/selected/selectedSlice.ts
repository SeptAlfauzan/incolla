import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  value: number;
}

const initialState: State = {
  value: 0,
};

const selectedSlice = createSlice({
  name: "selected",
  initialState,
  reducers: {
    setSelected: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { setSelected } = selectedSlice.actions;
export default selectedSlice.reducer;
