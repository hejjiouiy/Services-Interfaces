import React from 'react';
import { priorityConfig } from '../../config/priorityConfig';

const PriorityBadge = ({ priority, size = 'normal' }) => {
  const config = priorityConfig[priority] || priorityConfig.NORMAL;
  const sizeClasses = {
    small: 'px-2 py-1 text-xs',
    normal: 'px-2 text-xs leading-5',
    large: 'px-3 py-1 text-sm'
  };

  return (
    <span className={`inline-flex font-semibold rounded-full ${config.bg} ${config.text} ${sizeClasses[size]}`}>
      {config.label}
    </span>
  );
};

export default PriorityBadge;
