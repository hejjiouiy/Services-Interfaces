'use client';
import React from 'react';

const GuestUploader = ({ onUpload, accept = '.csv,.pdf', label = 'Upload Guest List' }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-darker-beige mb-1">
        {label}
      </label>
      <input
        type="file"
        accept={accept}
        onChange={(e) => onUpload(e.target.files?.[0] || null)}
        className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg shadow-sm file:bg-main-beige file:text-main-green file:font-medium file:px-4 file:py-1 file:rounded-md file:border-0 file:cursor-pointer hover:file:bg-main-green/10 transition"
      />
    </div>
  );
};

export default GuestUploader;
