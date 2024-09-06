import React, { useEffect, useState } from "react";
import { getPackages } from "../services/api";

interface TravelPackage {
  _id: string;
  destination: string;
  price: number;
  rating: number;
  duration: string;
  description: string;
  imageUrl: string;
}

const PackageList: React.FC = () => {
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [filteredPackages, setFilteredPackages] = useState<TravelPackage[]>([]);
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState(1000);
  const [minRating, setMinRating] = useState(1);
  const [durationFilter, setDurationFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPackages();
      setPackages(data);
      setFilteredPackages(data);
    };
    fetchData();
  }, []);

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

  useEffect(() => {
    handleSearch();
  }, [search, priceRange, minRating, durationFilter]);

  return (
    <div className="p-4">
      {/* Search & Filters */}
      <div className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Destination Search */}
        <div>
          <label htmlFor="search" className="block mb-2">
            Search by Destination
          </label>
          <input
            id="search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Enter destination"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Price Range Filter */}
        <div>
          <label htmlFor="price" className="block mb-2">
            Price (up to ${priceRange})
          </label>
          <input
            id="price"
            type="range"
            min="100"
            max="10000"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Rating Filter */}
        <div>
          <label htmlFor="rating" className="block mb-2">
            Minimum Rating
          </label>
          <select
            id="rating"
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            className="w-full p-2 border rounded"
          >
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>

        {/* Duration Filter */}
        <div>
          <label htmlFor="duration" className="block mb-2">
            Duration
          </label>
          <select
            id="duration"
            value={durationFilter}
            onChange={(e) => setDurationFilter(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Any Duration</option>
            <option value="3 days">3 Days</option>
            <option value="5 days">5 Days</option>
            <option value="7 days">7 Days</option>
            <option value="10 days">10 Days</option>
          </select>
        </div>
      </div>

      {/* Travel Packages Listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPackages.map((pkg) => (
          <div key={pkg._id} className="border p-4 rounded-lg shadow-lg">
            <img
              src={pkg.imageUrl}
              alt={pkg.destination}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold">{pkg.destination}</h3>
              <p>{pkg.description}</p>
              <p className="text-sm text-gray-600">Duration: {pkg.duration}</p>
              <p className="font-bold">Price: ${pkg.price}</p>
              <p>Rating: {pkg.rating} Stars</p>
              <button className="mt-4 bg-blue-500 text-white p-2 rounded">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageList;
