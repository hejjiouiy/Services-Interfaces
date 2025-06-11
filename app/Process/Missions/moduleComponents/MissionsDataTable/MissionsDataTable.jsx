import React from 'react';
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
import { getSampleMissions } from './config/sampleData'; 


const MissionsDataTable = () => {
  const sampleMissions = getSampleMissions();
  const tableState = useTableState(sampleMissions);
  const dialogState = useDialogState();
  const tableLogic = useTableLogic(tableState);
  const missionActions = useMissionActions(
    tableState.missions, 
    tableState.setMissions, 
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
    selectedMission,
    openViewDialog,
    openEditDialog,
    openDeleteDialog,
    openDownloadDialog,
    closeAllDialogs
  } = dialogState;

  const {
    currentMissions,
    totalPages,
    requestSort,
    sortedMissions
  } = tableLogic;

  const {
    saveEdit,
    confirmDelete,
    downloadReport
  } = missionActions;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-main-green mb-6">Mes Missions</h2>
      
      <TableFilterBar
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        onSearchChange={setSearchQuery}
        onStatusFilterChange={setStatusFilter}
      />
      
      <MissionsTable
        missions={currentMissions}
        sortConfig={sortConfig}
        onSort={requestSort}
        onView={openViewDialog}
        onEdit={openEditDialog}
        onDelete={openDeleteDialog}
        onDownload={openDownloadDialog}
      />
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        totalItems={sortedMissions.length}
        onPageChange={setCurrentPage}
      />

      {/* Dialogs */}
      <ViewDialog
        mission={selectedMission}
        isOpen={viewDialogOpen}
        onClose={closeAllDialogs}
        onEdit={openEditDialog}
        onDownload={openDownloadDialog}
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
    </div>
  );
};

export default MissionsDataTable;