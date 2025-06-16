import React from 'react';

const ActionButtons = ({ onExport, onRefresh }) => {
  return (
    <div className="flex space-x-2">
      <button 
        onClick={onExport}
        className="text-main-green hover:text-darker-beige" 
        title="Exporter les données"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V3" />
        </svg>
      </button>
      <button 
        onClick={onRefresh}
        className="text-main-green hover:text-darker-beige" 
        title="Rafraîchir"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.53M2.985 14.c0 7.42 6.58 13.5 14.5 13.5S29.985 21.42 29.985 14H16.023Z" />
        </svg>
      </button>
    </div>
  );
};

export default ActionButtons;