import React from 'react';
import SearchBar from './SearchBar';
import StatusFilter from './StatusFilter';
import SortFilter from './SortFilter';
import NewItemButton from './NewItemButton';

const FilterBar = ({
  searchQuery,
  statusFilter,
  sortValue,
  onSearchChange,
  onStatusChange,
  onSortChange,
  sortOptions,
  newItemConfig,
  searchPlaceholder = "Rechercher...",
  className = ""
}) => {
  return (
    <div className={`flex flex-col md:flex-row justify-between mb-6 space-y-2 md:space-y-0 ${className}`}>
      <SearchBar 
        value={searchQuery}
        onChange={onSearchChange}
        placeholder={searchPlaceholder}
      />
      
      <div className="flex space-x-2">
        <StatusFilter 
          value={statusFilter}
          onChange={onStatusChange}
        />
        
        <SortFilter 
          value={sortValue}
          onChange={onSortChange}
          options={sortOptions}
        />
        
        {newItemConfig && (
          <NewItemButton {...newItemConfig} />
        )}
      </div>
    </div>
  );
};

export default FilterBar;