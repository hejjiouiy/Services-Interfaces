'use client';
import React from 'react';

const statusStyles = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  APPROVED: 'bg-green-100 text-green-800',
  ACCEPTED: 'bg-green-100 text-green-800',
  REJECTED: 'bg-red-100 text-red-800',
  REFUSED: 'bg-red-100 text-red-800',
  UNDER_REVIEW: 'bg-blue-100 text-blue-800',
  READY: 'bg-indigo-100 text-indigo-800',
  COMPLETED: 'bg-gray-100 text-gray-800',
  CANCELLED: 'bg-red-100 text-red-800',
  IN_PREPARATION: 'bg-purple-100 text-purple-800',
  DEFAULT: 'bg-gray-100 text-gray-800',
};

const statusLabels = {
  PENDING: 'Pending',
  APPROVED: 'Approved',
  ACCEPTED: 'Accepted',
  REFUSED: 'Refused',
  REJECTED: 'Rejected',
  UNDER_REVIEW: 'Under review',
  READY: 'Ready',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
  IN_PREPARATION: 'In preparation',
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
