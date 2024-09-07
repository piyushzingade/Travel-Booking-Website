import { useState } from "react";

interface FilterBarProps {
  priceRange: number;
  setPriceRange: (value: number) => void;
  minRating: number;
  setMinRating: (value: number) => void;
  durationFilter: string;
  setDurationFilter: (value: string) => void;
}

export default function FilterBar({
  priceRange,
  setPriceRange,
  minRating,
  setMinRating,
  durationFilter,
  setDurationFilter,
}: FilterBarProps) {
  const [showFilters, setShowFilters] = useState(false); 
  return (
    <div className="mb-4">
      {/* Filter Toggle Button */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-4 transition-all"
      >
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>

      {/* Filters Section */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Price Range Filter */}
          <div>
            <label htmlFor="price" className="block mb-2 font-medium">
              Price (up to ${priceRange})
            </label>
            <input
              id="price"
              type="range"
              min="100"
              max="10000"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-gray-700 mt-2 text-sm">
              Max Price: ${priceRange}
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <label htmlFor="rating" className="block mb-2 font-medium">
              Minimum Rating
            </label>
            <select
              id="rating"
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
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
            <label htmlFor="duration" className="block mb-2 font-medium">
              Duration
            </label>
            <select
              id="duration"
              value={durationFilter}
              onChange={(e) => setDurationFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Any Duration</option>
              <option value="3 days">3 Days</option>
              <option value="5 days">5 Days</option>
              <option value="7 days">7 Days</option>
              <option value="10 days">10 Days</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
