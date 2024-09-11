// src/slices/bookingSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of the booking form state
interface BookingFormState {
  name: string; // Name of the person booking
  phone: string; // Phone number of the person booking
  email: string; // Email address of the person booking
  startDate: string; // Start date of the booking
  endDate: string; // End date of the booking
}

// Initial state for the booking form
const initialState: BookingFormState = {
  name: "",
  phone: "",
  email: "",
  startDate: "",
  endDate: "",
};

// Create a slice for the booking form
const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    // Update a specific form field with a new value
    setFormField: (
      state,
      action: PayloadAction<{ field: keyof BookingFormState; value: string }>
    ) => {
      state[action.payload.field] = action.payload.value;
    },
    // Set the end date for the booking
    setEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload;
    },
    // Reset the booking form to its initial state
    resetForm: () => initialState,
  },
});

// Export the actions for use in components
export const { setFormField, setEndDate, resetForm } = bookingSlice.actions;

// Export the reducer to be used in the store
export default bookingSlice.reducer;
