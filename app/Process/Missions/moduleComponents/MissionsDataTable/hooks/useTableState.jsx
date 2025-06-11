import { useState } from 'react';


const useTableState = (initialMissions) => {
  const [missions, setMissions] = useState(initialMissions);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  return {
    missions,
    setMissions,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    sortConfig,
    setSortConfig,
    currentPage,
    setCurrentPage,
    itemsPerPage
  };
};
export default useTableState;