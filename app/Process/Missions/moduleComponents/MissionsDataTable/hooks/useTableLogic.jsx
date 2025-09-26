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

  // Fonction helper pour accéder aux données imbriquées de manière sécurisée
  const getMissionData = (mission, field) => {
    if (!mission) return '';
    
    switch (field) {
      case 'destination':
      case 'ville':
      case 'pays':
      case 'type':
      case 'details':
      case 'titre':
        return mission.mission?.[field] || '';
      case 'budgetPrevu':
        return mission.mission?.budgetPrevu || 0;
      case 'dateDebut':
        return mission.Debut || '';
      case 'dateFin':
        return mission.Fin || '';
      case 'etat':
        return mission["etat demande"] || mission.etat || 'Ouverte';
      case 'createdAt':
      case 'updatedAt':
        return mission.mission?.[field] || mission[field] || '';
      default:
        return mission[field] || '';
    }
  };

  // Logique de filtrage mise à jour pour la nouvelle structure
  const filteredMissions = missions.filter(mission => {
    // Debug pour voir la structure d'une mission
    if (missions.length > 0 && mission === missions[0]) {
      console.log('🔍 Structure de mission pour debug:', mission);
    }

    // Filtrage par recherche textuelle
    const searchFields = [
      getMissionData(mission, 'destination'),
      getMissionData(mission, 'ville'),
      getMissionData(mission, 'pays'),
      getMissionData(mission, 'type'),
      getMissionData(mission, 'details'),
      getMissionData(mission, 'titre')
    ].filter(Boolean); // Enlever les valeurs vides
    
    const matchesSearch = searchQuery === '' || 
      searchFields.some(field => 
        String(field).toLowerCase().includes(searchQuery.toLowerCase())
      );
      
    // Filtrage par statut
    const missionStatus = getMissionData(mission, 'etat');
    const matchesStatus = statusFilter === 'ALL' || missionStatus === statusFilter;

    // Debug pour le premier élément
    if (missions.length > 0 && mission === missions[0]) {
      console.log('🔍 Debug filtrage premier élément:', {
        searchFields,
        searchQuery,
        matchesSearch,
        missionStatus,
        statusFilter,
        matchesStatus
      });
    }
      
    return matchesSearch && matchesStatus;
  });

  // Logique de tri mise à jour
  const sortedMissions = [...filteredMissions].sort((a, b) => {
    let aValue, bValue;

    // Gestion des différents types de tri
    switch (sortConfig.key) {
      case 'mission.budgetPrevu':
      case 'budgetPrevu':
        aValue = getMissionData(a, 'budgetPrevu');
        bValue = getMissionData(b, 'budgetPrevu');
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
        
      case 'Debut':
      case 'dateDebut':
        aValue = new Date(getMissionData(a, 'dateDebut'));
        bValue = new Date(getMissionData(b, 'dateDebut'));
        break;
        
      case 'Fin':
      case 'dateFin':
        aValue = new Date(getMissionData(a, 'dateFin'));
        bValue = new Date(getMissionData(b, 'dateFin'));
        break;
        
      case 'mission.destination':
      case 'destination':
        aValue = getMissionData(a, 'destination').toLowerCase();
        bValue = getMissionData(b, 'destination').toLowerCase();
        break;
        
      case 'mission.type':
      case 'type':
        aValue = getMissionData(a, 'type').toLowerCase();
        bValue = getMissionData(b, 'type').toLowerCase();
        break;
        
      case 'etat demande':
      case 'etat':
        aValue = getMissionData(a, 'etat').toLowerCase();
        bValue = getMissionData(b, 'etat').toLowerCase();
        break;
        
      case 'mission.createdAt':
      case 'createdAt':
        aValue = new Date(getMissionData(a, 'createdAt'));
        bValue = new Date(getMissionData(b, 'createdAt'));
        break;
        
      case 'mission.updatedAt':
      case 'updatedAt':
        aValue = new Date(getMissionData(a, 'updatedAt'));
        bValue = new Date(getMissionData(b, 'updatedAt'));
        break;
        
      default:
        // Essayer d'accéder directement à la propriété
        aValue = mission => {
          if (sortConfig?.key && sortConfig.key.includes('.')) {
            const [parent, child] = sortConfig.key.split('.');
            return mission[parent]?.[child] || '';
          }
          return mission[sortConfig?.key] || '';
        };
        bValue = mission => {
          if ( sortConfig?.key && sortConfig.key.includes('.')) {
            const [parent, child] = sortConfig.key.split('.');
            return b[parent]?.[child] || '';
          }
          return b[sortConfig.key] || '';
        };
        
        if (typeof aValue === 'function') aValue = aValue(a);
        if (typeof bValue === 'function') bValue = bValue(b);
    }

    // Comparaison pour les dates
    if (aValue instanceof Date && bValue instanceof Date) {
      return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
    }

    // Comparaison pour les chaînes de caractères
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    }

    // Comparaison numérique par défaut
    return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
  });

  // Logique de pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMissions = sortedMissions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedMissions.length / itemsPerPage);

  // Gestionnaire de tri
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Debug info (peut être supprimé en production)
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 Table Logic Debug:', {
        totalMissions: missions.length,
        filteredMissions: filteredMissions.length,
        sortedMissions: sortedMissions.length,
        currentMissions: currentMissions.length,
        searchQuery,
        statusFilter,
        sortConfig,
        currentPage,
        totalPages
      });
    }
  }, [missions.length, filteredMissions.length, sortedMissions.length, currentMissions.length, searchQuery, statusFilter, sortConfig, currentPage, totalPages]);

  return {
    filteredMissions,
    sortedMissions,
    currentMissions,
    totalPages,
    requestSort
  };
};

export default useTableLogic;