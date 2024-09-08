import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import PackageListDisplay from "./PackageListDisplay";

export default function PackageList() {
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState(10000); // Set max price range
  const [minRating, setMinRating] = useState(1);
  const [durationFilter, setDurationFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch data from API
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get("http://localhost:3002/allPackages");
        setPackages(response.data);
       
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch packages");
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // Filter Logic
  const handleSearch = () => {
    const results = packages.filter((pkg: any) => {
      return (
        pkg.destination.toLowerCase().includes(search.toLowerCase()) &&
        pkg.price <= priceRange &&
        pkg.rating >= minRating &&
        (durationFilter === "" || pkg.duration === durationFilter)
      );
    });
    setFilteredPackages(results);
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
