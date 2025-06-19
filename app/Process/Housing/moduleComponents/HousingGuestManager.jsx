'use client';
import React from 'react';

const HousingGuestManager = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-main-green mb-4">Guest Management</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a4 4 0 118 0v4m-4 12v-8m0 0V7a4 4 0 118 0v8m-8 4h8"></path>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-darker-beige mb-2">No guest management interface yet</h3>
          <p className="text-gray-500 mb-4">This section will allow detailed tracking and assignment of invited guests.</p>
        </div>
      </div>
    </div>
  );
};

export default HousingGuestManager;
