import React, { useState, useEffect } from 'react';
import useTableState from './hooks/useTableState';
import useTableLogic from './hooks/useTableLogic';
import useDialogState from './hooks/useDialogState';
import useMissionActions from './hooks/useMissionActions';
import MissionsTable from './components/Table/MissionsTable';
import TableFilterBar from './components/Filters/TableFilterBar';
import Pagination from './components/Navigation/Pagination';
import ViewDialog from './components/Dialogs/ViewDialog';
import EditDialog from './components/Dialogs/EditDialog';
import DeleteDialog from './components/Dialogs/DeleteDialog';
import DownloadDialog from './components/Dialogs/DownloadDialog';
import NotificationDialog, { DownloadConfirmDialog } from './components/Dialogs/NotificationDialog';
import UploadReportDialog from './components/Dialogs/UploadReportDialog';
import { getSampleMissions, getMyOrdresMission } from './config/missionApi';
import { Upload } from 'lucide-react';

const MissionsDataTable = () => {
  // États principaux
  const [missions, setMissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hooks avec les données réelles
  const tableState = useTableState(missions);
  const dialogState = useDialogState();
  const tableLogic = useTableLogic(tableState);
  
  const missionActions = useMissionActions(
    missions, // Utiliser les vraies données
    setMissions, // Utiliser le setter des vraies données
    dialogState.closeAllDialogs
  );

  const {
    searchQuery,
    statusFilter,
    setSearchQuery,
    setStatusFilter,
    sortConfig,
    currentPage,
    setCurrentPage,
    itemsPerPage
  } = tableState;

  const {
    viewDialogOpen,
    editDialogOpen,
    deleteDialogOpen,
    downloadDialogOpen,
    uploadReportDialogOpen,
    selectedMission,
    openViewDialog,
    openEditDialog,
    openDeleteDialog,
    openDownloadDialog,
    openUploadReportDialog,
    closeAllDialogs
  } = dialogState;

  const {
    currentMissions,
    totalPages,
    requestSort,
    sortedMissions
  } = tableLogic;

  // Force l'utilisation de missions si currentMissions est vide ou undefined
  const displayMissions = (currentMissions && currentMissions.length > 0) ? currentMissions : missions;

  // Debug pour voir ce qui se passe avec le filtrage
  console.log('🔍 Debug filtrage:', {
    totalMissions: missions.length,
    currentMissions: currentMissions?.length || 0,
    displayMissions: displayMissions.length,
    searchQuery,
    statusFilter,
    sortConfig
  });

const {
  saveEdit,
  confirmDelete,
  downloadReport,
  notificationDialog,
  closeNotification,
  downloadConfirmDialog,
  setDownloadConfirmDialog,
  executeDownload
} = missionActions;

  // Fonction pour transformer les données de la nouvelle structure vers l'ancienne pour les dialogs
  const transformMissionForDialog = (mission) => {
  if (!mission) return null;

  return {
    // Garder l'ID de l'ordre de mission
    id: mission.id,
    
    // Données de la mission (depuis mission.mission)
    type: mission.mission?.type || 'N/A',
    destination: mission.mission?.destination || 'N/A',
    details: mission.mission?.details || '',
    pays: mission.mission?.pays || '',
    ville: mission.mission?.ville || '',
    budgetPrevu: mission.mission?.budgetPrevu || 0,
    titre: mission.mission?.titre || '',
    createdAt: mission.mission?.createdAt || '',
    updatedAt: mission.mission?.updatedAt || '',
    
    // Données de l'ordre de mission
    dateDebut: mission.Debut,
    dateFin: mission.Fin,
    etat: mission["etat demande"] || 'Ouverte',
    user_id: mission.User,
    mission_id: mission.mission?.id,
    
    // ADD THIS LINE: Include the user object
    user: mission.user,
    
    // Données additionnelles de la nouvelle structure
    financement: mission.financement,
    rapport: mission.rapport || [],
    accordResponsable: mission["accord de Responsable"],
    
    // Pour compatibilité avec l'ancienne structure
    ordres_mission: [{
      id: mission.id,
      dateDebut: mission.Debut,
      dateFin: mission.Fin,
      etat: mission["etat demande"] || 'Ouverte',
      user_id: mission.User,
      mission_id: mission.mission?.id,
      createdAt: mission.mission?.createdAt || '',
      updatedAt: mission.mission?.updatedAt || ''
    }]
  };
};

  // Fonction pour charger les missions
  const fetchMissions = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Appel à l'API pour récupérer les ordres de mission de l'utilisateur
      const result = await getMyOrdresMission();

      if (result.success) {
        setMissions(result.data);
        console.log('✅ Missions chargées avec succès:', result.data.length, 'éléments');
      } else {
        // En cas d'erreur, utiliser les données de test
        console.warn('⚠️ Erreur API, utilisation des données de test:', result.error);
        setMissions(getSampleMissions());
        setError(result.error);
      }
    } catch (error) {
      console.error('❌ Erreur lors du chargement des missions:', error);
      // Fallback vers les données de test
      setMissions(getSampleMissions());
      setError('Erreur de connexion - données de test affichées');
    } finally {
      setIsLoading(false);
    }
  };

  // Charger les missions au montage du composant
  useEffect(() => {
    fetchMissions();
  }, []);

  // Debug pour voir les changements de state
  useEffect(() => {
    console.log('🔍 Search/Filter changed:', { searchQuery, statusFilter });
  }, [searchQuery, statusFilter]);

  // Fonction pour rafraîchir les missions
  const refreshMissions = async () => {
    await fetchMissions();
  };

  // Handlers pour les dialogs avec transformation des données
  const handleViewDialog = (mission) => {
    const transformedMission = transformMissionForDialog(mission);
    console.log('🔍 Ouverture dialog View avec:', transformedMission);
    openViewDialog(transformedMission);
  };

  const handleEditDialog = (mission) => {
    const transformedMission = transformMissionForDialog(mission);
    console.log('✏️ Ouverture dialog Edit avec:', transformedMission);
    openEditDialog(transformedMission);
  };

  const handleDeleteDialog = (mission) => {
    const transformedMission = transformMissionForDialog(mission);
    console.log('🗑️ Ouverture dialog Delete avec:', transformedMission);
    openDeleteDialog(transformedMission);
  };

  const handleDownloadDialog = (mission) => {
    const transformedMission = transformMissionForDialog(mission);
    console.log('📥 Ouverture dialog Download avec:', transformedMission);
    openDownloadDialog(transformedMission);
  };
    // Handler pour le dialog d'upload de rapport
  const handleUploadReportDialog = (mission) => {
    const transformedMission = transformMissionForDialog(mission);
    console.log('📝 Ouverture dialog Upload Report avec:', transformedMission);
    openUploadReportDialog(transformedMission);
  };

  // Affichage du loader
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-main-green"></div>
          <span className="ml-2 text-gray-600">Chargement des missions...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header avec titre et bouton refresh */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-main-green">Mes Ordres de Mission</h2>
        <button
          onClick={refreshMissions}
          disabled={isLoading}
          className="bg-main-green text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          <svg 
            className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Actualiser
        </button>
      </div>

      {/* Message d'erreur */}
      {error && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">{error}</p>
            </div>
            <div className="ml-auto">
              <button
                onClick={refreshMissions}
                className="text-yellow-700 hover:text-yellow-800 text-sm underline"
              >
                Réessayer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Compteur de missions */}
      {missions.length > 0 && (
        <div className="mb-4 text-sm text-gray-600">
          {missions.length} ordre{missions.length > 1 ? 's' : ''} de mission trouvé{missions.length > 1 ? 's' : ''}
        </div>
      )}
      
      <TableFilterBar
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        onSearchChange={setSearchQuery}
        onStatusFilterChange={setStatusFilter}
      />
      
      {missions.length === 0 && !isLoading ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun ordre de mission</h3>
          <p className="mt-1 text-sm text-gray-500">
            Vous n'avez aucun ordre de mission pour le moment.
          </p>
          <button
            onClick={refreshMissions}
            className="mt-4 bg-main-green text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Actualiser
          </button>
        </div>
      ) : (
        <>
          <MissionsTable
            missions={displayMissions}
            sortConfig={sortConfig}
            onSort={requestSort}
            onView={handleViewDialog}
            onEdit={handleEditDialog}
            onDelete={handleDeleteDialog}
            onDownload={handleDownloadDialog}
            onUploadReport={handleUploadReportDialog}

          />
          
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={sortedMissions?.length || missions.length}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      {/* Dialogs avec données transformées */}
      <ViewDialog
        mission={selectedMission}
        isOpen={viewDialogOpen}
        onClose={closeAllDialogs}
        onEdit={() => handleEditDialog(selectedMission)}
        onDownload={() => handleDownloadDialog(selectedMission)}
      />

      <EditDialog
        mission={selectedMission}
        isOpen={editDialogOpen}
        onClose={closeAllDialogs}
        onSave={saveEdit}
      />

      <DeleteDialog
        mission={selectedMission}
        isOpen={deleteDialogOpen}
        onClose={closeAllDialogs}
        onConfirm={() => confirmDelete(selectedMission)}
      />

      <DownloadDialog
        mission={selectedMission}
        isOpen={downloadDialogOpen}
        onClose={closeAllDialogs}
        onConfirm={() => downloadReport(selectedMission)}
      />

      <NotificationDialog
        isOpen={notificationDialog.isOpen}
        onClose={closeNotification}
        title={notificationDialog.title}
        message={notificationDialog.message}
        type={notificationDialog.type}
        autoClose={notificationDialog.autoClose}
        duration={3000}
      />

      <DownloadConfirmDialog
        mission={downloadConfirmDialog.mission}
        isOpen={downloadConfirmDialog.isOpen}
        onClose={() => setDownloadConfirmDialog({ isOpen: false, mission: null })}
        onConfirm={executeDownload}
      />
      <UploadReportDialog
        mission={selectedMission}
        isOpen={dialogState.uploadReportDialogOpen}
        onClose={dialogState.closeUploadReportDialog}
        onSave={missionActions.saveReport}
      />

    </div>
  );
};

export default MissionsDataTable;