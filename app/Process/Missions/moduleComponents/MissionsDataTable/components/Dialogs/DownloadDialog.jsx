import React from 'react';
import ConfirmationDialog from './ConfirmationDialog';
import DownloadIcon from '../Icons/DownloadIcon'; // Assuming you have a DownloadIcon component 


const DownloadDialog = ({ mission, isOpen, onClose, onConfirm }) => (
  <ConfirmationDialog
    isOpen={isOpen}
    onClose={onClose}
    onConfirm={onConfirm}
    title="Télécharger le rapport"
    message={mission ? `Vous êtes sur le point de télécharger le rapport de mission pour "${mission.type}" à ${mission.destination}.` : ''}
    confirmText="Télécharger"
    confirmColor="bg-purple-600 hover:bg-purple-700"
    icon={
      <div className="bg-purple-100 rounded-full p-2">
        <DownloadIcon />
      </div>
    }
  />
);
export default DownloadDialog;