import React, { useRef } from 'react';
import WarningIcon from '../Icons/WarningIcon'; // Assuming you have a WarningIcon component

const ConfirmationDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = "Confirmer", 
  confirmColor = "bg-red-600 hover:bg-red-700",
  icon 
}) => {
  const dialogRef = useRef(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/65 flex items-center justify-center p-4 z-50">
      <div ref={dialogRef} className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-red-100 rounded-full p-2">
              {icon || <WarningIcon />}
            </div>
          </div>
          
          <h3 className="text-lg font-medium text-center text-gray-900 mb-2">{title}</h3>
          <p className="text-center text-gray-500 mb-6">{message}</p>
          
          <div className="flex justify-center space-x-3">
            <button 
              onClick={onConfirm}
              className={`px-4 py-2 text-white rounded-md transition-colors ${confirmColor}`}
            >
              {confirmText}
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
export default ConfirmationDialog;