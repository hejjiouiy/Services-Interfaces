const SearchBar = () => (
  <div className="flex items-center mr-4 flex-1 max-w-md">
    <input 
      type="text" 
      placeholder="Search..." 
      className="border border-gray-200 rounded-full text-center bg-white p-2 w-full text-sm lg:text-base" 
    />
  </div>
);

export default SearchBar;