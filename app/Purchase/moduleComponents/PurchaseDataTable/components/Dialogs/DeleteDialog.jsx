import React from 'react';

const DeleteDialog = ({ 
  isOpen, 
  request, 
  onClose, 
  onConfirm 
}) => {
  if (!isOpen || !request) return null;

  return (
    <div className="fixed inset-0 bg-black/65 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-red-100 rounded-full p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
          
          <h3 className="text-lg font-medium text-center text-gray-900 mb-2">Confirmer la suppression</h3>
          <p className="text-center text-gray-500 mb-6">
            Êtes-vous sûr de vouloir supprimer cette demande ? Cette action ne peut pas être annulée.
          </p>
          
          <div className="flex justify-center space-x-3">
            <button 
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Supprimer
            </button>
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteDialog;