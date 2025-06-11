import React from 'react';
import SearchBar from './SearchBar';
import StatusFilter from './StatusFilter';
import NewMissionButton from './NewMissionButton';

const TableFilterBar = ({ searchQuery, statusFilter, onSearchChange, onStatusFilterChange }) => (
  <div className="flex flex-col md:flex-row justify-between mb-6 space-y-2 md:space-y-0">
    <SearchBar searchQuery={searchQuery} onSearchChange={onSearchChange} />
    
    <div className="flex space-x-2">
      <StatusFilter statusFilter={statusFilter} onStatusFilterChange={onStatusFilterChange} />
      <NewMissionButton />
    </div>
  </div>
);
export default TableFilterBar;