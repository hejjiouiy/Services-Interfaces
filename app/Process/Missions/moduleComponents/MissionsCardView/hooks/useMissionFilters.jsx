import { useState, useMemo } from 'react';

export const useMissionFilters = (initialData = []) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });

  const filteredAndSortedData = useMemo(() => {
    // Filter data
    const filtered = initialData.filter(item => {
      const matchesSearch = 
        item.destination?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ville?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.pays?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.details?.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesStatus = 
        statusFilter === 'ALL' || 
        (item.ordres_mission && 
         item.ordres_mission.length > 0 && 
         item.ordres_mission[0].etat === statusFilter);
        
      return matchesSearch && matchesStatus;
    });

    // Sort data
    const sorted = [...filtered].sort((a, b) => {
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

    return sorted;
  }, [initialData, searchQuery, statusFilter, sortConfig]);

  const handleSortChange = (sortValue) => {
    const [key, direction] = sortValue.split('-');
    setSortConfig({ key, direction });
  };

  return {
    searchQuery,
    statusFilter,
    sortConfig,
    filteredAndSortedData,
    setSearchQuery,
    setStatusFilter,
    setSortConfig,
    handleSortChange
  };
};