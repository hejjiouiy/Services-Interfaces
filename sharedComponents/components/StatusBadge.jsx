'use client';
import React from 'react';

const statusStyles = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  UNDER_REVIEW: 'bg-blue-100 text-blue-800',
  APPROVED: 'bg-green-100 text-green-800',
  VALIDATED: 'bg-green-100 text-green-800',
  ACCEPTED: 'bg-green-100 text-green-800',
  READY: 'bg-indigo-100 text-indigo-800',
  COMPLETED: 'bg-gray-100 text-gray-800',
  REJECTED: 'bg-red-100 text-red-800',
  REFUSED: 'bg-red-200 text-red-900',
  CANCELLED: 'bg-red-100 text-red-800',
  ARCHIVED: 'bg-gray-200 text-gray-700',
  ENVOYÉE: 'bg-yellow-50 text-yellow-900',
  MODIFIÉE: 'bg-blue-50 text-blue-800',
  DEFAULT: 'bg-gray-100 text-gray-800',
};

const statusLabels = {
  PENDING: 'Pending',
  UNDER_REVIEW: 'Under Review',
  APPROVED: 'Approved',
  VALIDATED: 'Validated',
  ACCEPTED: 'Accepted',
  READY: 'Ready',
  COMPLETED: 'Completed',
  REJECTED: 'Rejected',
  REFUSED: 'Refused',
  CANCELLED: 'Cancelled',
  ARCHIVED: 'Archived',
  ENVOYÉE: 'Envoyée',
  MODIFIÉE: 'Modifiée',
  DEFAULT: 'Unknown',
};

const StatusBadge = ({ status }) => {
  const normalized = status?.toUpperCase() || 'DEFAULT';
  const badgeClass = statusStyles[normalized] || statusStyles.DEFAULT;
  const label = statusLabels[normalized] || statusLabels.DEFAULT;

  return (
    <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${badgeClass}`}>
      {label}
    </span>
  );
};

export default StatusBadge;
