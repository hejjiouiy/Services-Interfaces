import React from 'react';
import SearchBar from './SearchBar';
import StatusFilter from './StatusFilter';

const TableFilterBar = ({ searchQuery, statusFilter, onSearchChange, onStatusFilterChange }) => {
  // Debug pour voir les valeurs
  console.log('🔍 TableFilterBar props:', { searchQuery, statusFilter });

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1">
        <SearchBar 
          searchQuery={searchQuery} 
          onSearchChange={onSearchChange} 
        />
      </div>
      <div className="flex-shrink-0">
        <StatusFilter 
          statusFilter={statusFilter} 
          onStatusFilterChange={onStatusFilterChange} 
        />
      </div>
    </div>
  );
};

export default TableFilterBar;