// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import packagesReducer from "./slices/packagesSlice";
import bookingReducer from "./slices/bookingSlice";
import packageReducer from "./slices/travelPackageSlice";


export const store = configureStore({
  reducer: {
    packages: packagesReducer,
    booking: bookingReducer,
    package: packageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
