'use client';
import React, { useState } from 'react';

export default function RefusalModal({ onCancel, onValidate }) {
  const [reason, setReason] = useState('');

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Refusal Reason</h2>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={4}
          className="w-full p-2 border rounded mb-4"
          placeholder="Please enter the reason for refusal..."
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (reason.trim()) onValidate(reason.trim());
            }}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Confirm Refusal
          </button>
        </div>
      </div>
    </div>
  );
}
