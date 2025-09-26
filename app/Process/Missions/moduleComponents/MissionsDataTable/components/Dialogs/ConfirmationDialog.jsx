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
  confirmDisabled = false,
  isLoading = false,
  hideCancel = false,
  icon,
  size = "default" // "small", "default", "large", "xl"
}) => {
  const dialogRef = useRef(null);

  if (!isOpen) return null;

  // Determine dialog size classes
  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "max-w-md";
      case "large":
        return "max-w-2xl";
      case "xl":
        return "max-w-4xl";
      case "default":
      default:
        return "max-w-xl";
    }
  };

  // Auto-detect content complexity for adaptive sizing
  const getAdaptiveSize = () => {
    if (typeof message === 'string') {
      if (message.length > 500) return "max-w-2xl";
      if (message.length > 200) return "max-w-xl";
      return "max-w-md";
    }
    
    // For React elements, assume they need more space
    return "max-w-2xl";
  };

  const dialogSizeClass = size === "adaptive" ? getAdaptiveSize() : getSizeClasses();

  return (
    <div className="fixed inset-0 bg-black/65 flex items-center justify-center p-4 z-50">
      <div 
        ref={dialogRef} 
        className={`bg-white rounded-lg shadow-xl w-full ${dialogSizeClass} max-h-[90vh] overflow-y-auto overflow-x-hidden`}
      >
        <div className="p-6 min-w-0">
          {/* Icon Section */}
          <div className="flex items-center justify-center mb-4">
            {icon || (
              <div className="bg-red-100 rounded-full p-2">
                <WarningIcon />
              </div>
            )}
          </div>
          
          {/* Title */}
          <h3 className="text-lg font-medium text-center text-gray-900 mb-2 break-words">
            {title}
          </h3>
          
          {/* Message - can be string or React element */}
          <div className="text-center text-gray-500 mb-6 break-words">
            {typeof message === 'string' ? (
              <p className="whitespace-pre-wrap">{message}</p>
            ) : (
              <div className="text-left break-words">{message}</div>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-center space-x-3">
            <button 
              onClick={onConfirm}
              disabled={confirmDisabled || isLoading}
              className={`px-6 py-2 text-white rounded-md transition-colors flex items-center space-x-2 ${confirmColor} ${
                confirmDisabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading && (
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              <span>{confirmText}</span>
            </button>
            
            {!hideCancel && (
              <button 
                onClick={onClose}
                disabled={isLoading}
                className={`px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Annuler
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;