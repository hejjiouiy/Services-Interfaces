'use client';
import React from 'react';

const HousingFileUpload = ({ label, name, accept, onChange, required }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={name}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="file"
        name={name}
        id={name}
        accept={accept}
        required={required}
        onChange={onChange}
        className="block w-full text-sm text-gray-600 border border-gray-300 rounded-lg shadow-sm focus:ring-main-green focus:border-main-green file:bg-gray-100 file:border file:rounded-md file:px-3 file:py-1"
      />
    </div>
  );
};

export default HousingFileUpload;
