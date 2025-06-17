import React from 'react';

const NoDataMessage = () => {
  return (
    <div className="text-center py-8 bg-white rounded-lg shadow mt-4">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune donnée disponible pour cette période</h3>
      <p className="mt-1 text-sm text-gray-500">Essayez d'ajuster la plage de temps sélectionnée.</p>
    </div>
  );
};

export default NoDataMessage;