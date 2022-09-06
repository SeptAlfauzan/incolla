import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./reducers/image/imageSlice";
import csvReducer from "./reducers/csv/csvSlice";
import fontReducer from "./reducers/font/fontSlice";
import canvasReducer from "./reducers/canvas/canvasSlice";
import textReducer from "./reducers/text/textSlice";
import selectedReducer from "./reducers/selected/selectedSlice";
import konvaReducer from "./reducers/konva/konvaSlice";

export const store = configureStore({
  reducer: {
    image: imageReducer,
    csv: csvReducer,
    font: fontReducer,
    canvas: canvasReducer,
    text: textReducer,
    selectedIndex: selectedReducer,
    konva: konvaReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
