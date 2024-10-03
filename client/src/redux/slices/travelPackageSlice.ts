import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TravelPackage {
  _id: string;
  destination: string; 
  price: number; 
  rating: number; 
  duration: string;
  description1: string; 
  imageUrl: string; 
}

interface PackageState {
  packages: TravelPackage[]; // Array to store the list of travel packages
}

const initialState: PackageState = {
  packages: [], // Start with an empty array of packages
};

const travelPackageSlice = createSlice({
  name: "packages", 
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
