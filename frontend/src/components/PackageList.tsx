import { useState } from "react";
import { travelPackages } from "../mockData"; // Mock data import
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import PackageListDisplay from "./PackageListDisplay";

export default function PackageList() {
  const [packages] = useState(travelPackages); // Use the mock data
  const [filteredPackages, setFilteredPackages] = useState(travelPackages);
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState(10000); // Set max price range
  const [minRating, setMinRating] = useState(1);
  const [durationFilter, setDurationFilter] = useState("");

  // Filter Logic
  const handleSearch = () => {
    const results = packages.filter((pkg) => {
      return (
        pkg.destination.toLowerCase().includes(search.toLowerCase()) &&
        pkg.price <= priceRange &&
        pkg.rating >= minRating &&
        (durationFilter === "" || pkg.duration === durationFilter)
      );
    });
    setFilteredPackages(results);
  };

  return (
    <div className="p-4">
      {/* Center Search & Filters */}
      <div className="mb-4 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
        {/* Search Bar */}
        <SearchBar
          search={search}
          setSearch={setSearch}
          handleSearch={handleSearch}
        />
        {/* Filter Bar */}
        <FilterBar
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          minRating={minRating}
          setMinRating={setMinRating}
          durationFilter={durationFilter}
          setDurationFilter={setDurationFilter}
        />
      </div>

      <PackageListDisplay packages={filteredPackages} />
    </div>
  );
}
