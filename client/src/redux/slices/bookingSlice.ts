// src/slices/bookingSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BookingFormState {
  name: string;
  phone: string;
  email: string;
  startDate: string;
  endDate: string;
}

const initialState: BookingFormState = {
  name: "",
  phone: "",
  email: "",
  startDate: "",
  endDate: "",
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setFormField: (
      state,
      action: PayloadAction<{ field: keyof BookingFormState; value: string }>
    ) => {
      state[action.payload.field] = action.payload.value;
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload;
    },
    resetForm: () => initialState,
  },
});

export const { setFormField, setEndDate, resetForm } = bookingSlice.actions;
export default bookingSlice.reducer;
