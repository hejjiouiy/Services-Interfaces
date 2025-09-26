import React from 'react';
import ActionButtons from './ActionButtons';
import MissionStatusBadge from './MissionStatusBadge';
import { formatDate, formatAmount } from '../../utils/formatters';
import getTypeIcons from '../../config/typeIcons';

const TableRow = ({ mission, onView, onEdit, onDelete, onDownload, onUpdateStatus, onUploadReport, onValidateReport }) => {
  const typeIcons = getTypeIcons();
  
  // Accéder aux données de mission depuis la structure imbriquée
  const missionData = mission.mission;
  const status = mission["etat demande"] || 'Ouverte';
  const dateDebut = mission.Debut;
  const dateFin = mission.Fin;
  const hasReport = mission.rapport && mission.rapport.length > 0;
  const reportValidated = hasReport && mission.rapport[0]?.isValid === true;
  
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 bg-main-green/10 rounded-full flex items-center justify-center text-main-green">
            {typeIcons[missionData?.type] || '📋'}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{missionData?.type || 'N/A'}</div>
            <div className="text-xs text-gray-500">{missionData?.details || ''}</div>
          </div>
        </div>
      </td>
      
      <td className="px-6 py-4">
        <div className="text-sm font-medium text-gray-900">{missionData?.destination || 'N/A'}</div>
        <div className="text-sm text-gray-500">
          {missionData?.ville && missionData?.pays 
            ? `${missionData.ville}, ${missionData.pays}` 
            : missionData?.pays || 'Lieu non spécifié'
          }
        </div>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        {dateDebut && dateFin ? (
          <div className="text-sm text-gray-900">
            <div>{formatDate(dateDebut)}</div>
            <div className="text-xs text-gray-500">au {formatDate(dateFin)}</div>
          </div>
        ) : (
          <span className="text-sm text-gray-500">Non planifiée</span>
        )}
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {missionData?.budgetPrevu ? formatAmount(missionData.budgetPrevu) : 'N/A'}
        </div>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        <MissionStatusBadge status={status} />
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-2">
          {/* Indicateur de rapport */}
          {hasReport ? (
            <div className="flex items-center">
              {reportValidated ? (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Validé
                </span>
              ) : (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  En attente
                </span>
              )}
            </div>
          ) : (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
              </svg>
              Aucun
            </span>
          )}
        </div>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <ActionButtons
          mission={mission}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          onDownload={onDownload}
          onUpdateStatus={onUpdateStatus}
          onUploadReport={onUploadReport}
        />
      </td>
    </tr>
  );
};

export default TableRow;