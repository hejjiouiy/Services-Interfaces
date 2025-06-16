import { useCallback } from 'react';

export const useMissionActions = ({ onView, onEdit, onDelete } = {}) => {
  const handleView = useCallback((mission) => {
    if (onView) {
      onView(mission);
    } else {
      // Default action - could navigate to detail page
      console.log('View mission:', mission.id);
    }
  }, [onView]);

  const handleEdit = useCallback((mission) => {
    if (onEdit) {
      onEdit(mission);
    } else {
      // Default action - could navigate to edit page
      console.log('Edit mission:', mission.id);
    }
  }, [onEdit]);

  const handleDelete = useCallback((mission) => {
    if (onDelete) {
      onDelete(mission);
    } else {
      // Default action - show confirmation dialog
      if (window.confirm(`Êtes-vous sûr de vouloir supprimer la mission ${mission.destination}?`)) {
        console.log('Delete mission:', mission.id);
      }
    }
  }, [onDelete]);

  return {
    handleView,
    handleEdit,
    handleDelete
  };
};