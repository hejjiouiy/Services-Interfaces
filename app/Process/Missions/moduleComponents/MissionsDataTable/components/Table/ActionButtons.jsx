import React from 'react';
import ViewIcon from '../Icons/ViewIcon';
import EditIcon from '../Icons/EditIcon';
import DeleteIcon from '../Icons/DeleteIcon';
import DownloadIcon from '../Icons/DownloadIcon';

const ActionButtons = ({ mission, onView, onEdit, onDelete, onDownload }) => (
  <div className="flex justify-end space-x-2">
    <button 
      onClick={() => onView(mission)}
      className="text-main-green hover:text-main-green/80"
    >
      <span className="sr-only">Voir</span>
      <ViewIcon />
    </button>
    <button 
      onClick={() => onEdit(mission)}
      className="text-blue-600 hover:text-blue-800"
    >
      <span className="sr-only">Modifier</span>
      <EditIcon />
    </button>
    <button 
      onClick={() => onDelete(mission)}
      className="text-red-600 hover:text-red-800"
    >
      <span className="sr-only">Supprimer</span>
      <DeleteIcon />
    </button>
    <button 
      onClick={() => onDownload(mission)}
      className="text-purple-600 hover:text-purple-800"
    >
      <span className="sr-only">Télécharger</span>
      <DownloadIcon />
    </button>
  </div>
);
export default ActionButtons;