import React from 'react';
import StatusFilter from './StatusFilter';
import SearchInput from './SearchInput';
import NewRequestButton from './NewRequestButton';

const FilterSection = ({
  statusFilter,
  searchQuery,
  onStatusChange,
  onSearchChange,
  onNewRequest,
  newRequestHref,
  searchPlaceholder = "Search ID, type, budget line, details..."
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex space-x-4">
        <StatusFilter 
          value={statusFilter}
          onChange={onStatusChange}
        />
        <SearchInput 
          value={searchQuery}
          onChange={onSearchChange}
          placeholder={searchPlaceholder}
        />
      </div>

      <NewRequestButton 
        onClick={onNewRequest}
        href={newRequestHref}
      />
    </div>
  );
};

export default FilterSection;