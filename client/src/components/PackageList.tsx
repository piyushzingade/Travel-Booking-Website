import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPackages, applyFilters } from "../redux/slices/packagesSlice";
import { RootState, AppDispatch } from "../redux/store";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import DisplayPackageList from "./DisplayPackageList";

export default function PackageList() {
  // Redux dispatch and state selection
  const dispatch = useDispatch<AppDispatch>();
  const { filteredPackages, loading, error } = useSelector(
    (state: RootState) => state.packages
  );

  // Local state for search and filter values
  const [search, setSearch] = useState("");
  const [tempPriceRange, setTempPriceRange] = useState(10000);
  const [tempMinRating, setTempMinRating] = useState(1);
  const [tempDurationFilter, setTempDurationFilter] = useState("");

  // Fetch packages on component mount
  useEffect(() => {
    dispatch(fetchPackages());
  }, [dispatch]);

  // Apply filters by dispatching the action
  const handleApplyFilters = () => {
    dispatch(
      applyFilters({
        priceRange: tempPriceRange,
        minRating: tempMinRating,
        durationFilter: tempDurationFilter,
        search,
      })
    );
  };

  // Handle search action (only searches without applying filters)
  const handleSearch = () => {
    dispatch(
      applyFilters({
        priceRange: tempPriceRange,
        minRating: tempMinRating,
        durationFilter: tempDurationFilter,
        search,
      })
    );
  };

  // Display loading state
  if (loading) {
    return <div>Loading packages...</div>;
  }

  // Display error message
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      {/* Container for Search Bar and Filter Bar */}
      <div className="mb-4 flex flex-wrap md:flex-nowrap items-center justify-center space-y-0 md:space-x-4">
        {/* Search Bar Component */}
        <SearchBar
          search={search}
          setSearch={setSearch}
          handleSearch={handleSearch} // Trigger search without filters
        />
        {/* Filter Bar Component */}
        <FilterBar
          priceRange={tempPriceRange}
          setPriceRange={setTempPriceRange}
          minRating={tempMinRating}
          setMinRating={setTempMinRating}
          durationFilter={tempDurationFilter}
          setDurationFilter={setTempDurationFilter}
          applyFilters={handleApplyFilters} // Apply filters and search
        />
      </div>

      {/* Display List of Packages */}
      <DisplayPackageList packages={filteredPackages} />
    </div>
  );
}
