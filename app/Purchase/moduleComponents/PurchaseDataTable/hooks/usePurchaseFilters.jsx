import { useState, useMemo } from 'react';

export const usePurchaseFilters = (initialData = []) => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('dateDemande');
  const [sortDirection, setSortDirection] = useState('desc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedData = useMemo(() => {
    return initialData
      .filter(request => {
        // Status filter
        if (statusFilter !== 'All' && request.etatValidation !== statusFilter) {
          return false;
        }

        // Search filter
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          return (
            request.id.toLowerCase().includes(query) ||
            request.typeDemande.toLowerCase().includes(query) ||
            request.budget_line.toLowerCase().includes(query) ||
            request.details.toLowerCase().includes(query)
          );
        }

        return true;
      })
      .sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];

        if (sortField === 'dateDemande' || sortField === 'dateBesoin') {
          const dateA = new Date(aValue);
          const dateB = new Date(bValue);
          if (dateA < dateB) return sortDirection === 'asc' ? -1 : 1;
          if (dateA > dateB) return sortDirection === 'asc' ? 1 : -1;
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
          if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
          if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        } else if (typeof aValue === 'string' && typeof bValue === 'string') {
          const comparison = aValue.localeCompare(bValue);
          return sortDirection === 'asc' ? comparison : -comparison;
        }

        return 0;
      });
  }, [initialData, statusFilter, searchQuery, sortField, sortDirection]);

  return {
    statusFilter,
    searchQuery,
    sortField,
    sortDirection,
    filteredAndSortedData,
    setStatusFilter,
    setSearchQuery,
    handleSort
  };
};
