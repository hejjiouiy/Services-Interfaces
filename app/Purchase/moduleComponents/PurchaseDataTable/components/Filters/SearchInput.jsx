import React from 'react';

const SearchInput = ({ 
  value, 
  onChange, 
  placeholder = "Search...",
  className = "w-64"
}) => {
  return (
    <div>
      <label htmlFor="search" className="block text-sm font-medium text-darker-beige mb-1">
        Search
      </label>
      <input
        id="search"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-green ${className}`}
      />
    </div>
  );
};

export default SearchInput;