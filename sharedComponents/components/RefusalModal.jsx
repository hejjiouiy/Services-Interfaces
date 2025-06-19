'use client';
import React, { useState } from 'react';

export default function RefusalModal({
  onCancel,
  onValidate,
  title = "Refusal Reason",
  placeholder = "Please enter the reason for refusal...",
  confirmLabel = "Confirm Refusal",
  cancelLabel = "Cancel"
}) {
  const [reason, setReason] = useState('');
  const [error, setError] = useState(null);

  const handleConfirm = () => {
    if (!reason.trim()) {
      setError("Reason is required.");
      return;
    }
    setError(null);
    onValidate(reason.trim());
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="refusal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md animate-fade-in">
        <h2 id="refusal-title" className="text-xl font-semibold text-main-green mb-4">
          {title}
        </h2>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={4}
          className="w-full p-3 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-main-green"
          placeholder={placeholder}
        />
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-sm"
          >
            {cancelLabel}
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 text-sm"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
