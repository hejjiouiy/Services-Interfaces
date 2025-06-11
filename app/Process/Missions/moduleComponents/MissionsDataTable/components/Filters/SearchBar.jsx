import SearchIcon from "../Icons/SearchIcon";

const SearchBar = ({ searchQuery, onSearchChange }) => (
  <div className="relative w-full md:w-64">
    <input
      type="text"
      placeholder="Rechercher une mission..."
      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-green"
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
    />
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <SearchIcon />
    </div>
  </div>
);
export default SearchBar;
