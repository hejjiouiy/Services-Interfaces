import React from 'react';
import TypeIcon from '../TypeIcon';
import StatusBadge from '../StatusBadge';
import { missionTypesConfig } from '../../config/missionTypes';

const CardHeader = ({ type, status, title }) => {
  const typeConfig = missionTypesConfig[type] || missionTypesConfig.AUTRE;

  return (
    <div className="flex items-center justify-between px-6 pt-6 pb-2">
      <div className="flex items-center">
        <TypeIcon type={type} status={status} />
        <h3 className="ml-3 text-lg font-semibold text-gray-900">
          {title || typeConfig.label}
        </h3>
      </div>
      <StatusBadge status={status} />
    </div>
  );
};

export default CardHeader;