import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./reducers/image/imageSlice";
import csvReducer from "./reducers/csv/csvSlice";

export const store = configureStore({
  reducer: {
    image: imageReducer,
    csv: csvReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
