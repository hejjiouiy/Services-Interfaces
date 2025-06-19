'use client';
import React from 'react';

const RequestDetailsModal = ({ isOpen, onClose, data = {} }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>
        <h2 className="text-xl font-semibold text-main-green mb-4">Request Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
          {Object.entries(data).map(([key, value]) => (
            <div key={key}>
              <strong className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</strong>{' '}
              <span>{String(value)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RequestDetailsModal;
