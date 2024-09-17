// src/redux/slices/travelPackageSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the structure of a travel package
interface TravelPackage {
  _id: string; // Unique identifier for the package
  destination: string; // Destination of the travel package
  price: number; // Price of the travel package
  rating: number; // Rating of the travel package
  duration: string; // Duration of the travel package
  description1: string; // Description of the travel package
  imageUrl: string; // Image URL for the travel package
}

// Define the shape of the package state
interface PackageState {
  packages: TravelPackage[]; // Array to store the list of travel packages
}

// Initial state for the travel package slice
const initialState: PackageState = {
  packages: [], // Start with an empty array of packages
};

// Create a slice for travel packages
const travelPackageSlice = createSlice({
  name: "packages", // Name of the slice
  initialState, // Initial state defined above
  reducers: {
    // Reducer to set the list of packages
    setPackages: (state, action: PayloadAction<TravelPackage[]>) => {
      state.packages = action.payload; // Update the packages state with the payload
    },
  },
});

// Export the action creator for setting packages
export const { setPackages } = travelPackageSlice.actions;

// Export the reducer to be used in the Redux store
export default travelPackageSlice.reducer;
