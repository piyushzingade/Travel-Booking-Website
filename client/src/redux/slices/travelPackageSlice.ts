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
  packages: TravelPackage[];
}

const initialState: PackageState = {
  packages: [],
};

const travelPackageSlice = createSlice({
  name: "packages",
  initialState,
  reducers: {
    setPackages: (state, action: PayloadAction<TravelPackage[]>) => {
      state.packages = action.payload;
    },
  },
});

export const { setPackages } = travelPackageSlice.actions;
export default travelPackageSlice.reducer;
