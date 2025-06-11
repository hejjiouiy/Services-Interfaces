import React from 'react';
import ConfirmationDialog from './ConfirmationDialog';

const DeleteDialog = ({ mission, isOpen, onClose, onConfirm }) => (
  <ConfirmationDialog
    isOpen={isOpen}
    onClose={onClose}
    onConfirm={onConfirm}
    title="Confirmer la suppression"
    message={mission ? `Êtes-vous sûr de vouloir supprimer la mission "${mission.type}" à ${mission.destination} ? Cette action ne peut pas être annulée.` : ''}
    confirmText="Supprimer"
    confirmColor="bg-red-600 hover:bg-red-700"
  />
);
export default DeleteDialog;