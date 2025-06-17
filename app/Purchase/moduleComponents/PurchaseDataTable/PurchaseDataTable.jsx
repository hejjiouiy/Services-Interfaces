import React from 'react';
import FilterSection from './components/Filters/FilterSection';
import PurchaseTable from './components/Table/PurchaseTable';
import EmptyState from './components/EmptyState';
import Pagination from './components/Pagination';
import ViewDialog from './components/Dialogs/ViewDialog';
import EditDialog from './components/Dialogs/EditDialog';
import DeleteDialog from './components/Dialogs/DeleteDialog';
import { usePurchaseFilters } from './hooks/usePurchaseFilters';
import { useDialogState } from './hooks/useDialogState';
import { usePurchaseActions } from './hooks/usePurchaseActions';
import { usePurchaseData } from './hooks/usePurchaseData';

const PurchaseDataTable = ({ 
  initialData = [], 
  apiEndpoint = null,
  title = "Purchase Requests",
  showEdit = true,
  showDelete = true,
  onNewRequest,
  newRequestHref
}) => {
  // Data management
  const { requests, setRequests, loading, error } = usePurchaseData(initialData, apiEndpoint);
  
  // Filtering and sorting
  const {
    statusFilter,
    searchQuery,
    sortField,
    sortDirection,
    filteredAndSortedData,
    setStatusFilter,
    setSearchQuery,
    handleSort
  } = usePurchaseFilters(requests);

  // Dialog state
  const {
    viewDialogOpen,
    editDialogOpen,
    deleteDialogOpen,
    selectedRequest,
    editFormData,
    openViewDialog,
    openEditDialog,
    openDeleteDialog,
    closeAllDialogs,
    setEditFormData
  } = useDialogState();

  // Actions
  const {
    handleEditFormChange,
    handleMaterialChange,
    saveEdit,
    confirmDelete
  } = usePurchaseActions(requests, setRequests, closeAllDialogs);

  if (loading) {
    return (
      <div className="overflow-hidden">
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
      <div className="overflow-hidden">
        <div className="text-center text-red-600">
          <p>Error loading data: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <FilterSection
        statusFilter={statusFilter}
        searchQuery={searchQuery}
        onStatusChange={setStatusFilter}
        onSearchChange={setSearchQuery}
        onNewRequest={onNewRequest}
        newRequestHref={newRequestHref}
      />

      <PurchaseTable
        requests={filteredAndSortedData}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
        onView={openViewDialog}
        onEdit={openEditDialog}
        onDelete={openDeleteDialog}
        showEdit={showEdit}
        showDelete={showDelete}
      />

      {filteredAndSortedData.length === 0 && (
        <EmptyState />
      )}

      <Pagination
        currentCount={filteredAndSortedData.length}
        totalCount={requests.length}
      />

      {/* Dialogs */}
      <ViewDialog
        isOpen={viewDialogOpen}
        request={selectedRequest}
        onClose={closeAllDialogs}
        onEdit={openEditDialog}
      />

      <EditDialog
        isOpen={editDialogOpen}
        editFormData={editFormData}
        onClose={closeAllDialogs}
        onSave={() => saveEdit(editFormData)}
        onFormChange={handleEditFormChange(editFormData, setEditFormData)}
        onMaterialChange={handleMaterialChange(editFormData, setEditFormData)}
      />

      <DeleteDialog
        isOpen={deleteDialogOpen}
        request={selectedRequest}
        onClose={closeAllDialogs}
        onConfirm={() => confirmDelete(selectedRequest)}
      />
    </div>
  );
};

export default PurchaseDataTable;