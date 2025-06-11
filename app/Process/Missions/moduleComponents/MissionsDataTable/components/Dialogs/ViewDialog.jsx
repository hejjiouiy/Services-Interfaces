import React, { useRef } from 'react';
import DialogHeader from './DialogHeader';
import MissionDetailsDisplay from './MissionDetailsDisplay';


const ViewDialog = ({ mission, isOpen, onClose, onEdit, onDownload }) => {
  const dialogRef = useRef(null);

  if (!isOpen || !mission) return null;

  return (
    <div className="fixed inset-0 bg-black/65 flex items-center justify-center p-4 z-50">
      <div ref={dialogRef} className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
        <div className="p-6">
          <DialogHeader title="Détails de la mission" onClose={onClose} />
          <MissionDetailsDisplay mission={mission} />
          
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button 
              onClick={() => {
                onClose();
                onEdit(mission);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Modifier
            </button>
            <button 
              onClick={() => {
                onClose();
                onDownload(mission);
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              Télécharger le rapport
            </button>
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ViewDialog;