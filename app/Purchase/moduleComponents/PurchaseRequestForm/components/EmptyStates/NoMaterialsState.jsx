import React from 'react';

const NoMaterialsState = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg text-center text-gray-500">
      <svg 
        className="mx-auto h-12 w-12 text-gray-400 mb-3" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-3V8a1 1 0 00-1-1H6a1 1 0 00-1 1v5h3" 
        />
      </svg>
      <h3 className="text-sm font-medium text-gray-900 mb-1">No materials added yet</h3>
      <p className="text-sm text-gray-500">Please add at least one material to proceed.</p>
    </div>
  );
};

export default NoMaterialsState;