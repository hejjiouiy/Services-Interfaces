import React from 'react';
import ActionButtons from './ActionButtons';
import MissionStatusBadge from './MissionStatusBadge';
import { formatDate, formatAmount } from '../../utils/formatters';
import  getTypeIcons  from '../../config/typeIcons';


const TableRow = ({ mission, onView, onEdit, onDelete, onDownload }) => {
  const typeIcons = getTypeIcons();
  const order = mission.ordres_mission && mission.ordres_mission.length > 0 
    ? mission.ordres_mission[0] 
    : null;
    
  const status = order ? order.etat : 'OUVERTE';
  
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 bg-main-green/10 rounded-full flex items-center justify-center text-main-green">
            {typeIcons[mission.type]}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{mission.type}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm font-medium text-gray-900">{mission.destination}</div>
        <div className="text-sm text-gray-500">{mission.ville}, {mission.pays}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {order ? (
          <div className="text-sm text-gray-900">
            {formatDate(order.dateDebut)} - {formatDate(order.dateFin)}
          </div>
        ) : (
          <span className="text-sm text-gray-500">Non planifiée</span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{formatAmount(mission.budgetPrevu)}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <MissionStatusBadge status={status} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <ActionButtons
          mission={mission}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          onDownload={onDownload}
        />
      </td>
    </tr>
  );
};
export default TableRow;