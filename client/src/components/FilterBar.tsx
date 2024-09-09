import { useState, useRef, useEffect } from "react";

interface FilterBarProps {
  priceRange: number;
  setPriceRange: (value: number) => void;
  minRating: number;
  setMinRating: (value: number) => void;
  durationFilter: string;
  setDurationFilter: (value: string) => void;
  applyFilters: () => void; // Function to trigger the filter application
}

export default function FilterBar({
  priceRange,
  setPriceRange,
  minRating,
  setMinRating,
  durationFilter,
  setDurationFilter,
  applyFilters,
}: FilterBarProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);
  const [localMinRating, setLocalMinRating] = useState(minRating);
  const [localDurationFilter, setLocalDurationFilter] =
    useState(durationFilter);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowFilters(false);
    }
  };

  useEffect(() => {
    if (showFilters) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showFilters]);

  const handleApplyFilters = () => {
    // Update the main state with the local values when Apply is clicked
    setPriceRange(localPriceRange);
    setMinRating(localMinRating);
    setDurationFilter(localDurationFilter);
    applyFilters(); // Call the function to apply the filters
    setShowFilters(false); // Close the filters dropdown
  };

  return (
    <div className="relative inline-block ">
      {/* Filter Toggle Button */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm transition-all"
      >
        Filters
      </button>

      {/* Filters Dropdown */}
      {showFilters && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-md shadow-lg z-20"
        >
          {/* Price Range Filter */}
          <div className="p-4">
            <label
              htmlFor="price"
              className="block mb-2 font-medium text-gray-700"
            >
              Price (up to ${localPriceRange})
            </label>
            <input
              id="price"
              type="range"
              min="100"
              max="10000"
              value={localPriceRange}
              onChange={(e) => setLocalPriceRange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-gray-700 mt-2 text-sm">
              Max Price:{" "}
              <span className="font-semibold">${localPriceRange}</span>
            </div>
          </div>

          {/* Rating Filter */}
          <div className="p-4 border-t border-gray-200">
            <label
              htmlFor="rating"
              className="block mb-2 font-medium text-gray-700"
            >
              Minimum Rating
            </label>
            <select
              id="rating"
              value={localMinRating}
              onChange={(e) => setLocalMinRating(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <option key={star} value={star}>
                  {star} Star{star > 1 && "s"}
                </option>
              ))}
            </select>
          </div>

          {/* Duration Filter */}
          <div className="p-4 border-t border-gray-200">
            <label
              htmlFor="duration"
              className="block mb-2 font-medium text-gray-700"
            >
              Duration
            </label>
            <select
              id="duration"
              value={localDurationFilter}
              onChange={(e) => setLocalDurationFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Any Duration</option>
              <option value="3 days">3 Days</option>
              <option value="5 days">5 Days</option>
              <option value="7 days">7 Days</option>
              <option value="10 days">10 Days</option>
            </select>
          </div>

          {/* Apply Button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleApplyFilters}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md shadow-sm transition-all"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
