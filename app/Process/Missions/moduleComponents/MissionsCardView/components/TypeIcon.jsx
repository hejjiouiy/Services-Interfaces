import React from 'react';
import { missionTypesConfig } from '../config/missionTypes';
import { statusConfig } from '../config/statusConfig';

const TypeIcon = ({ type, status, size = 'normal' }) => {
  const typeConfig = missionTypesConfig[type] || missionTypesConfig.AUTRE;
  const statusStyle = statusConfig[status] || statusConfig.OUVERTE;
  
  const sizeClasses = {
    small: 'p-1.5',
    normal: 'p-2',
    large: 'p-3'
  };

  return (
    <div className={`rounded-full ${statusStyle.icon} ${statusStyle.text} ${sizeClasses[size]}`}>
      {typeConfig.icon}
    </div>
  );
};

export default TypeIcon;