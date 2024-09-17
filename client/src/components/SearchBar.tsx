interface SearchBarProps {
  search: string; // Current search query
  setSearch: (value: string) => void; // Function to update the search query
  handleSearch: () => void; // Function to handle search action
}

export default function SearchBar({
  search,
  setSearch,
  handleSearch,
}: SearchBarProps) {
  return (
    <div className="m-4">
      <div className="flex items-center rounded-3xl">
        {/* Input Field for Search Query */}
        <input
          id="search"
          type="text"
          value={search} // Controlled input field
          onChange={(e) => setSearch(e.target.value)} // Update search query on change
          placeholder="Enter destination"
          className="flex-grow p-2 border rounded-l"
        />

        {/* Search Button */}
        <button
          onClick={handleSearch} // Trigger search action on click
          className="bg-blue-500 text-white p-2 rounded-r"
        >
          Search
        </button>
      </div>
    </div>
  );
}
