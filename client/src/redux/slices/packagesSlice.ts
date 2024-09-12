// src/redux/slices/packagesSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the shape of the package state
interface PackageState {
  packages: any[]; // List of all packages
  filteredPackages: any[]; // List of packages after applying filters
  loading: boolean; // Loading state for fetching packages
  error: string | null; // Error message if fetching packages fails
  priceRange: number; // Maximum price filter
  minRating: number; // Minimum rating filter
  durationFilter: string; // Duration filter
}

// Initial state for the package slice
const initialState: PackageState = {
  packages: [],
  filteredPackages: [],
  loading: false,
  error: null,
  priceRange: 10000,
  minRating: 1,
  durationFilter: "",
};

// Async thunk to fetch packages from the API
export const fetchPackages = createAsyncThunk(
  "packages/fetchPackages",
  async () => {
    const response = await axios.get("https:localhost:3002/allPackages);
    return response.data; // Return the data from the response
  }
);

const packagesSlice = createSlice({
  name: "packages",
  initialState,
  reducers: {
    // Action to filter packages based on criteria
    applyFilters(state, action) {
      const { priceRange, minRating, durationFilter, search } = action.payload;

      state.filteredPackages = state.packages.filter((pkg: any) => {
        return (
          pkg.destination.toLowerCase().includes(search.toLowerCase()) && // Filter by search term
          pkg.price <= priceRange && // Filter by price range
          pkg.rating >= minRating && // Filter by minimum rating
          (durationFilter === "" || pkg.duration === durationFilter) // Filter by duration if specified
        );
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPackages.pending, (state) => {
        state.loading = true; // Set loading to true when fetching starts
      })
      .addCase(fetchPackages.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false when fetching is complete
        state.packages = action.payload; // Store the fetched packages
        state.filteredPackages = action.payload; // Set initial filtered packages
      })
      .addCase(fetchPackages.rejected, (state) => {
        state.loading = false; // Set loading to false when fetching fails
        state.error = "Failed to fetch packages"; // Set error message
      });
  },
});

// Export the action to apply filters
export const { applyFilters } = packagesSlice.actions;

// Export the reducer to be used in the store
export default packagesSlice.reducer;
