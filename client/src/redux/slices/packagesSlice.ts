import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
  packages: Package[]; // List of all travel packages
  filteredPackages: Package[]; // List of packages after applying filters
  loading: boolean; // Indicates if packages are being fetched
  error: string | null; // Error message if fetching fails
  priceRange: number; // Maximum price filter for packages
  minRating: number; // Minimum rating filter for packages
  durationFilter: string; // Duration filter for packages
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

// Async thunk to fetch packages from the API
export const fetchPackages = createAsyncThunk(
  "packages/fetchPackages",
  async () => {
    // Make a GET request to the API endpoint
    const response = await axios.get("http://localhost:3002/allPackages");
    return response.data; // Return the data from the response
  }
);

const packagesSlice = createSlice({
  name: "packages", // Name of the slice
  initialState, // Initial state of the slice
  reducers: {
    // Reducer to apply filters to the list of packages
    applyFilters(state, action) {
      const { priceRange, minRating, durationFilter, search } = action.payload;

      // Filter the packages based on the provided criteria
      state.filteredPackages = state.packages.filter((pkg) => {
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
        state.loading = false; // Set loading to false when fetching completes
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
