
interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
  handleSearch: () => void; // Pass the search handler as a prop
}

export default function SearchBar({
  search,
  setSearch,
  handleSearch,
}: SearchBarProps) {
  return (
    <div className="mb-4 ">
      
      <div className="flex items-center">
        {/* Input Field */}
        <input
          id="search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter destination"
          className="flex-grow p-2 border rounded-l"
        />

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 rounded-r"
        >
          Search
        </button>
      </div>
    </div>
  );
}
