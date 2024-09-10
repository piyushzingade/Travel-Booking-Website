// src/redux/slices/packagesSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface PackageState {
  packages: any[];
  filteredPackages: any[];
  loading: boolean;
  error: string | null;
  priceRange: number;
  minRating: number;
  durationFilter: string;
}

const initialState: PackageState = {
  packages: [],
  filteredPackages: [],
  loading: false,
  error: null,
  priceRange: 10000,
  minRating: 1,
  durationFilter: "",
};

// Async action to fetch packages
export const fetchPackages = createAsyncThunk("packages/fetchPackages", async () => {
  const response = await axios.get("http://localhost:3002/allPackages");
  return response.data;
});

const packagesSlice = createSlice({
  name: "packages",
  initialState,
  reducers: {
    // Action to filter packages
    applyFilters(state, action) {
      const { priceRange, minRating, durationFilter, search } = action.payload;

      state.filteredPackages = state.packages.filter((pkg: any) => {
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
