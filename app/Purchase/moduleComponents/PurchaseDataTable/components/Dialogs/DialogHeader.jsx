import React from 'react';

const DialogHeader = ({ title, onClose }) => {
  return (
    <div className="flex justify-between items-center border-b pb-3 mb-6">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default DialogHeader;