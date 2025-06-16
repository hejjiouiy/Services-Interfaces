import React from 'react';
import FilterBar from './components/Filters/FilterBar';
import CardGrid from './components/Cards/CardGrid';
import MissionCard from './components/Cards/MissionCard';
import EmptyState from './components/EmptyState';
import { useMissionFilters } from './hooks/useMissionFilters';
import { useMissionActions } from './hooks/useMissionActions';
import { useMissionData } from './hooks/useMissionData';
import { sortOptionsConfig } from './config/sortOptions';

const MissionsCardView = ({ 
  initialData = [], 
  apiEndpoint = null,
  title = "Mes Missions",
  onView,
  onEdit,
  onDelete,
  newMissionUrl = "/missions/new",
  actions = ['view', 'edit', 'delete'],
  emptyStateConfig = {},
  gridConfig = { sm: 1, md: 2, lg: 3 }
}) => {
  // Data management
  const { missions, loading, error } = useMissionData(initialData, apiEndpoint);
  
  // Filtering and sorting
  const {
    searchQuery,
    statusFilter,
    sortConfig,
    filteredAndSortedData,
    setSearchQuery,
    setStatusFilter,
    handleSortChange
  } = useMissionFilters(missions);

  // Actions
  const { handleView, handleEdit, handleDelete } = useMissionActions({
    onView,
    onEdit,
    onDelete
  });

  const sortValue = `${sortConfig.key}-${sortConfig.direction}`;

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center text-red-600">
          <p>Erreur lors du chargement des données: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-main-green mb-6">{title}</h2>
      
      <FilterBar
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        sortValue={sortValue}
        onSearchChange={setSearchQuery}
        onStatusChange={setStatusFilter}
        onSortChange={handleSortChange}
        sortOptions={sortOptionsConfig}
        newItemConfig={{
          href: newMissionUrl,
          label: "Nouvelle Mission"
        }}
        searchPlaceholder="Rechercher une mission..."
      />
      
      {filteredAndSortedData.length === 0 ? (
        <EmptyState
          title={emptyStateConfig.title || "Aucune mission trouvée"}
          description={emptyStateConfig.description || "Essayez de modifier vos critères de recherche ou créez une nouvelle mission."}
          icon={emptyStateConfig.icon}
          action={emptyStateConfig.action}
        />
      ) : (
        <CardGrid columns={gridConfig}>
          {filteredAndSortedData.map((mission) => (
            <MissionCard
              key={mission.id}
              mission={mission}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
              actions={actions}
            />
          ))}
        </CardGrid>
      )}
    </div>
  );
};

export default MissionsCardView;