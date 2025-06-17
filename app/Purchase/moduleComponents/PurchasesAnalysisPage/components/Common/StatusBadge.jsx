import React from 'react';
import { getStatusBadgeClass } from '../../config/colorSchemes';

const StatusBadge = ({ status }) => {
  const badgeClass = getStatusBadgeClass(status);
  
  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${badgeClass}`}>
      {status}
    </span>
  );
};

export default StatusBadge;