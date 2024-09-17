// src/features/packages/packagesSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mockPackages } from "../../data"; // Adjust the path as necessary

// Define the shape of a single package
interface Package {
  _id: string;
  destination: string;
  price: number;
  rating: number;
  duration: string;
  description1: string;
  description2: string;
  imageUrl: string;
}

// Define the shape of the package state in Redux
interface PackageState {
  packages: Package[];
  filteredPackages: Package[];
  loading: boolean;
  error: string | null;
  priceRange: number;
  minRating: number;
  durationFilter: string;
}

// Initial state of the package slice
const initialState: PackageState = {
  packages: [],
  filteredPackages: [],
  loading: false,
  error: null,
  priceRange: 10000, // Default maximum price filter
  minRating: 1, // Default minimum rating filter
  durationFilter: "", // Default duration filter (no filter applied)
};

// Async thunk to fetch packages from the mock data
export const fetchPackages = createAsyncThunk(
  "packages/fetchPackages",
  async () => {
    // Simulate an API call delay
    return new Promise<Package[]>((resolve) => {
      setTimeout(() => {
        resolve(mockPackages); // Use mock data
      }, 500); // Simulated delay
    });
  }
);

const packagesSlice = createSlice({
  name: "packages",
  initialState,
  reducers: {
    applyFilters(state, action) {
      const { priceRange, minRating, durationFilter, search } = action.payload;

      // Filter the packages based on the provided criteria
      state.filteredPackages = state.packages.filter((pkg) => {
        return (
          pkg.destination.toLowerCase().includes(search.toLowerCase()) &&
          pkg.price <= priceRange &&
          pkg.rating >= minRating &&
          (durationFilter === "" || pkg.duration === durationFilter)
        );
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPackages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPackages.fulfilled, (state, action) => {
        state.loading = false;
        state.packages = action.payload;
        state.filteredPackages = action.payload;
      })
      .addCase(fetchPackages.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch packages";
      });
  },
});

export const { applyFilters } = packagesSlice.actions;

export default packagesSlice.reducer;
