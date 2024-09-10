import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPackages, applyFilters } from "../redux/slices/packagesSlice";
import { RootState, AppDispatch } from "../redux/store";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import DisplayPackageList from "./DisplayPackageList";

export default function PackageList () {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredPackages, loading, error } = useSelector(
    (state: RootState) => state.packages
  );

  const [search, setSearch] = useState("");
  const [tempPriceRange, setTempPriceRange] = useState(10000);
  const [tempMinRating, setTempMinRating] = useState(1);
  const [tempDurationFilter, setTempDurationFilter] = useState("");

  // Fetch packages on component mount
  useEffect(() => {
    dispatch(fetchPackages());
  }, [dispatch]);

  // Apply filters
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

  if (loading) {
    return <div>Loading packages...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      {/* Center Search & Filters */}
      <div className="mb-4 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
        {/* Search Bar */}
        <SearchBar
          search={search}
          setSearch={setSearch}
          handleSearch={() => {}}
        />
        {/* Filter Bar */}
        <FilterBar
          priceRange={tempPriceRange}
          setPriceRange={setTempPriceRange}
          minRating={tempMinRating}
          setMinRating={setTempMinRating}
          durationFilter={tempDurationFilter}
          setDurationFilter={setTempDurationFilter}
          applyFilters={handleApplyFilters}
        />
      </div>

      <DisplayPackageList packages={filteredPackages} />
    </div>
  );
};

