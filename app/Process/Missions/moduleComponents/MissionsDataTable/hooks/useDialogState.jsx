import { useState } from 'react';

const useDialogState = () => {
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [downloadDialogOpen, setDownloadDialogOpen] = useState(false);
  const [uploadReportDialogOpen, setUploadReportDialogOpen] = useState(false);
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

  const openUploadReportDialog = (mission) => {
    setSelectedMission(mission);
    setUploadReportDialogOpen(true);
  };

  const closeViewDialog = () => {
    setViewDialogOpen(false);
    setSelectedMission(null);
  };

  const closeEditDialog = () => {
    setEditDialogOpen(false);
    setSelectedMission(null);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedMission(null);
  };

  const closeDownloadDialog = () => {
    setDownloadDialogOpen(false);
    setSelectedMission(null);
  };

  const closeUploadReportDialog = () => {
    setUploadReportDialogOpen(false);
    setSelectedMission(null);
  };

  const closeAllDialogs = () => {
    setViewDialogOpen(false);
    setEditDialogOpen(false);
    setDeleteDialogOpen(false);
    setDownloadDialogOpen(false);
    setUploadReportDialogOpen(false);
    setSelectedMission(null);
  };

  return {
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
    closeViewDialog,
    closeEditDialog,
    closeDeleteDialog,
    closeDownloadDialog,
    closeUploadReportDialog,
    closeAllDialogs
  };
};

export default useDialogState;