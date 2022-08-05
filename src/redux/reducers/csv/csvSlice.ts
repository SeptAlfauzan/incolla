import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  value: string[];
}
const initialState: State = {
  value: [],
};

export const csvSlice = createSlice({
  name: "csv",
  initialState,
  reducers: {
    setCSVdata: (state, action: PayloadAction<string[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setCSVdata } = csvSlice.actions;
export default csvSlice.reducer;
