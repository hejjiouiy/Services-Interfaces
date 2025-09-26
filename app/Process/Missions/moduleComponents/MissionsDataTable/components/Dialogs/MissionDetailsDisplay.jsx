import React from 'react';
import { formatDate, formatAmount } from '../../utils/formatters';
import  getTypeIcons from '../../config/typeIcons';
import  getStatusColors  from '../../config/statusColors';

const MissionDetailsDisplay = ({ mission }) => {
  const typeIcons = getTypeIcons();
  const statusColors = getStatusColors();

  // Extract user info safely
  const userFullName = mission.user?.full_name || `${mission.user?.prenom || ''} ${mission.user?.nom || ''}`.trim() || 'N/A';
  const userEmail = mission.user?.email || 'N/A';
  const userFunction = mission.user?.fonction || 'N/A';
  const userUnite = mission.user?.unite || 'N/A';

  return (
    <div className="mb-6">
      {/* Mission Type and Destination Header */}
      <div className="flex items-center mb-4">
        <div className="h-16 w-16 bg-main-green/10 rounded-full flex items-center justify-center text-main-green mr-4">
          {typeIcons[mission.type]}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{mission.type}</h3>
          <p className="text-gray-600">{mission.destination} - {mission.ville}, {mission.pays}</p>
        </div>
      </div>

      {/* User Information Section */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
        <h4 className="text-sm font-semibold text-blue-800 mb-2">Informations du demandeur</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-blue-600 mb-1">Nom complet</p>
            <p className="text-sm font-medium text-gray-800">{userFullName}</p>
          </div>
          <div>
            <p className="text-xs text-blue-600 mb-1">Email</p>
            <p className="text-sm font-medium text-gray-800">{userEmail}</p>
          </div>
          <div>
            <p className="text-xs text-blue-600 mb-1">Fonction</p>
            <p className="text-sm font-medium text-gray-800">{userFunction}</p>
          </div>
          <div>
            <p className="text-xs text-blue-600 mb-1">Unité</p>
            <p className="text-sm font-medium text-gray-800">{userUnite}</p>
          </div>
        </div>
      </div>
      
      {/* Mission Details Grid */}
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
      
      {/* Mission Details */}
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-1">Détails de la mission</p>
        <p className="bg-gray-50 p-4 rounded-lg">{mission.details}</p>
      </div>

      {/* User Roles (optional, for admin view) */}
      {mission.user?.realm_roles && mission.user.realm_roles.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">Rôles</p>
          <div className="flex flex-wrap gap-2">
            {mission.user.realm_roles.map((role, index) => (
              <span 
                key={index} 
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MissionDetailsDisplay;