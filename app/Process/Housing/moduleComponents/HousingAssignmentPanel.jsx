'use client';
import React from 'react';

const HousingAssignmentPanel = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-main-green mb-4">Housing Assignment Panel</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h10M4 18h10" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-darker-beige mb-2">No housing assignment implemented</h3>
          <p className="text-gray-500 mb-4">This section will handle the allocation of housing based on validated requests.</p>
        </div>
      </div>
    </div>
  );
};

export default HousingAssignmentPanel;
