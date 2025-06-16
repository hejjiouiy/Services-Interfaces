import React from 'react';
import { statusConfig } from '../config/statusConfig';

const StatusBadge = ({ status, size = 'normal' }) => {
  const config = statusConfig[status] || statusConfig.OUVERTE;
  const sizeClasses = {
    small: 'px-2 py-1 text-xs',
    normal: 'px-3 py-1 text-xs',
    large: 'px-4 py-2 text-sm'
  };

  return (
    <span className={`rounded-full font-medium ${config.bg} ${config.text} ${sizeClasses[size]}`}>
      {config.label}
    </span>
  );
};

export default StatusBadge;