import { useState } from 'react';


const useDialogState = () => {
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [downloadDialogOpen, setDownloadDialogOpen] = useState(false);
  const [selectedMission, setSelectedMission] = useState(null);

  const openViewDialog = (mission) => {
    setSelectedMission(mission);
    setViewDialogOpen(true);
  };
  
  const openEditDialog = (mission) => {
    setSelectedMission(mission);
    setEditDialogOpen(true);
  };
  
  const openDeleteDialog = (mission) => {
    setSelectedMission(mission);
    setDeleteDialogOpen(true);
  };
  
  const openDownloadDialog = (mission) => {
    setSelectedMission(mission);
    setDownloadDialogOpen(true);
  };
  
  const closeAllDialogs = () => {
    setViewDialogOpen(false);
    setEditDialogOpen(false);
    setDeleteDialogOpen(false);
    setDownloadDialogOpen(false);
    setSelectedMission(null);
  };

  return {
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
  };
};
export default useDialogState;