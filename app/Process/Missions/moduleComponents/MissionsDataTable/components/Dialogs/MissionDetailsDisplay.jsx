import React from 'react';
import { formatDate, formatAmount } from '../../utils/formatters';
import  getTypeIcons from '../../config/typeIcons';
import  getStatusColors  from '../../config/statusColors';

const MissionDetailsDisplay = ({ mission }) => {
  const typeIcons = getTypeIcons();
  const statusColors = getStatusColors();

  return (
    <div className="mb-6">
      <div className="flex items-center mb-4">
        <div className="h-16 w-16 bg-main-green/10 rounded-full flex items-center justify-center text-main-green mr-4">
          {typeIcons[mission.type]}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{mission.type}</h3>
          <p className="text-gray-600">{mission.destination} - {mission.ville}, {mission.pays}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-sm text-gray-500 mb-1">Budget prévu</p>
          <p className="font-medium">{formatAmount(mission.budgetPrevu)}</p>
        </div>
        
        {mission.ordres_mission && mission.ordres_mission.length > 0 && (
          <>
            <div>
              <p className="text-sm text-gray-500 mb-1">Période</p>
              <p className="font-medium">
                {formatDate(mission.ordres_mission[0].dateDebut)} - {formatDate(mission.ordres_mission[0].dateFin)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Statut</p>
              <p>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[mission.ordres_mission[0].etat]}`}>
                  {mission.ordres_mission[0].etat}
                </span>
              </p>
            </div>
          </>
        )}
        
        <div>
          <p className="text-sm text-gray-500 mb-1">Date de création</p>
          <p className="font-medium">{formatDate(mission.createdAt)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Dernière mise à jour</p>
          <p className="font-medium">{formatDate(mission.updatedAt)}</p>
        </div>
      </div>
      
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-1">Détails</p>
        <p className="bg-gray-50 p-4 rounded-lg">{mission.details}</p>
      </div>
    </div>
  );
};
export default MissionDetailsDisplay;