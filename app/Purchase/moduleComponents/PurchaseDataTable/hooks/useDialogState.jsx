import { useState } from 'react';

export const useDialogState = () => {
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [editFormData, setEditFormData] = useState(null);

  const openViewDialog = (request) => {
    setSelectedRequest(request);
    setViewDialogOpen(true);
  };

  const openEditDialog = (request) => {
    setSelectedRequest(request);
    setEditFormData(JSON.parse(JSON.stringify(request)));
    setEditDialogOpen(true);
  };

  const openDeleteDialog = (request) => {
    setSelectedRequest(request);
    setDeleteDialogOpen(true);
  };

  const closeAllDialogs = () => {
    setViewDialogOpen(false);
    setEditDialogOpen(false);
    setDeleteDialogOpen(false);
    setSelectedRequest(null);
    setEditFormData(null);
  };

  return {
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
  };
};