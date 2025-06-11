import React from 'react';

const useTableLogic = (tableState) => {
  const {
    missions,
    searchQuery,
    statusFilter,
    sortConfig,
    currentPage,
    itemsPerPage,
    setSortConfig
  } = tableState;

  // Filtering logic
  const filteredMissions = missions.filter(mission => {
    const matchesSearch = 
      mission.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mission.ville.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mission.pays.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mission.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mission.details.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = 
      statusFilter === 'ALL' || 
      (mission.ordres_mission && 
       mission.ordres_mission.length > 0 && 
       mission.ordres_mission[0].etat === statusFilter);
      
    return matchesSearch && matchesStatus;
  });

  // Sorting logic
  const sortedMissions = [...filteredMissions].sort((a, b) => {
    if (sortConfig.key === 'budgetPrevu') {
      return sortConfig.direction === 'asc' 
        ? a.budgetPrevu - b.budgetPrevu 
        : b.budgetPrevu - a.budgetPrevu;
    }
    
    if (sortConfig.key === 'dateDebut' || sortConfig.key === 'dateFin') {
      const dateA = a.ordres_mission && a.ordres_mission.length > 0 
        ? new Date(a.ordres_mission[0][sortConfig.key]) 
        : new Date(0);
      const dateB = b.ordres_mission && b.ordres_mission.length > 0 
        ? new Date(b.ordres_mission[0][sortConfig.key]) 
        : new Date(0);
      return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
    }
    
    if (sortConfig.key === 'createdAt' || sortConfig.key === 'updatedAt') {
      const dateA = new Date(a[sortConfig.key]);
      const dateB = new Date(b[sortConfig.key]);
      return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
    }
    
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMissions = sortedMissions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedMissions.length / itemsPerPage);

  // Sort handler
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return {
    filteredMissions,
    sortedMissions,
    currentMissions,
    totalPages,
    requestSort
  };
};
export default useTableLogic;