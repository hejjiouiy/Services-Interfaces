import { useState } from 'react';

const useTableState = (missions) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Debug des changements
  console.log('🔍 useTableState - États actuels:', {
    searchQuery,
    statusFilter,
    sortConfig,
    currentPage,
    missionsLength: missions?.length || 0
  });

  // Wrapper pour setSearchQuery avec debug
  const setSearchQueryWithDebug = (value) => {
    console.log('🔍 setSearchQuery appelé avec:', value);
    setSearchQuery(value);
  };

  // Wrapper pour setStatusFilter avec debug
  const setStatusFilterWithDebug = (value) => {
    console.log('🔍 setStatusFilter appelé avec:', value);
    setStatusFilter(value);
  };

  return {
    missions,
    searchQuery,
    statusFilter,
    sortConfig,
    currentPage,
    itemsPerPage,
    setSearchQuery: setSearchQueryWithDebug,
    setStatusFilter: setStatusFilterWithDebug,
    setSortConfig,
    setCurrentPage
  };
};

export default useTableState;