'use client';
import React, { useState } from 'react';
import RefusalModal from './RefusalModal';

const ActionButtons = ({
  onApprove,
  onReject,
  requireReason = true,
  showLabels = true,
  className = ''
}) => {
  const [isRefusalOpen, setIsRefusalOpen] = useState(false);

  const handleReject = () => {
    if (requireReason) {
      setIsRefusalOpen(true);
    } else {
      onReject(); // direct
    }
  };

  return (
    <div className={`flex gap-4 ${className}`}>
      <button
        onClick={onApprove}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        {showLabels ? '✔ Accept' : '✔'}
      </button>
      <button
        onClick={handleReject}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        {showLabels ? '✖ Reject' : '✖'}
      </button>

      {requireReason && (
        <RefusalModal
          isOpen={isRefusalOpen}
          onClose={() => setIsRefusalOpen(false)}
          onConfirm={(reason) => {
            setIsRefusalOpen(false);
            onReject(reason);
          }}
        />
      )}
    </div>
  );
};

export default ActionButtons;
