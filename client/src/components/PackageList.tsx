import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import PackageListDisplay from "./PackageListDisplay";

export default function PackageList() {
  const [packages, setPackages] = useState([]); // All packages from API
  const [filteredPackages, setFilteredPackages] = useState([]); // Filtered packages to display
  const [search, setSearch] = useState("");

  // Applied filters
  const [priceRange, setPriceRange] = useState(10000); // Set default max price range
  const [minRating, setMinRating] = useState(1);
  const [durationFilter, setDurationFilter] = useState("");

  // Temporary filter states (uncommitted values)
  const [tempPriceRange, setTempPriceRange] = useState(priceRange);
  const [tempMinRating, setTempMinRating] = useState(minRating);
  const [tempDurationFilter, setTempDurationFilter] = useState(durationFilter);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch data from API when component mounts
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get("http://localhost:3002/allPackages");
        setPackages(response.data);
        setFilteredPackages(response.data); // Initially show all packages
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch packages");
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // Apply filters when the "Apply" button is clicked
  const applyFilters = () => {
    setPriceRange(tempPriceRange);
    setMinRating(tempMinRating);
    setDurationFilter(tempDurationFilter);
  };

  // Filter the packages whenever the applied filters change
  useEffect(() => {
    const filtered = packages.filter((pkg: any) => {
      return (
        pkg.destination.toLowerCase().includes(search.toLowerCase()) &&
        pkg.price <= priceRange &&
        pkg.rating >= minRating &&
        (durationFilter === "" || pkg.duration === durationFilter)
      );
    });
    setFilteredPackages(filtered); // Update the filtered packages list
  }, [search, priceRange, minRating, durationFilter, packages]);

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
          setPriceRange={setTempPriceRange} // Use temp state for changes
          minRating={tempMinRating}
          setMinRating={setTempMinRating} // Use temp state for changes
          durationFilter={tempDurationFilter}
          setDurationFilter={setTempDurationFilter} // Use temp state for changes
          applyFilters={applyFilters} // Pass the applyFilters function
        />
      </div>

      <PackageListDisplay packages={filteredPackages} />
    </div>
  );
}

