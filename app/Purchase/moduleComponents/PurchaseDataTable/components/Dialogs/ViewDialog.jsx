import React from 'react';
import DialogHeader from './DialogHeader';
import MaterialsTable from './MaterialsTable';
import StatusBadge from '../Badges/StatusBadge';
import PriorityBadge from '../Badges/PriorityBadge';
import { formatDate, formatAmount } from '../../utils/formatters';

const ViewDialog = ({ 
  isOpen, 
  request, 
  onClose, 
  onEdit 
}) => {
  if (!isOpen || !request) return null;

  const canEdit = request.etatValidation !== 'VALIDEE' && request.etatValidation !== 'REJETEE';

  return (
    <div className="fixed inset-0 bg-black/65 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
        <div className="p-6">
          <DialogHeader title="Détails de la demande" onClose={onClose} />
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">ID</p>
              <p className="font-medium">{request.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Type de demande</p>
              <p className="font-medium">{request.typeDemande}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Ligne budgétaire</p>
              <p className="font-medium">{request.budget_line}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Date de demande</p>
              <p className="font-medium">{formatDate(request.dateDemande)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Date de besoin</p>
              <p className="font-medium">{formatDate(request.dateBesoin)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Total estimé</p>
              <p className="font-medium">{formatAmount(request.totalEstimated)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Priorité</p>
              <PriorityBadge priority={request.priorite} />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">État de validation</p>
              <StatusBadge status={request.etatValidation} />
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-500 mb-1">Détails</p>
              <p className="font-medium">{request.details}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-500 mb-1">Dernière mise à jour</p>
              <p className="font-medium">{formatDate(request.updatedAt)}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Matériaux</h3>
            <MaterialsTable materials={request.materials} />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t">
            {canEdit && (
              <button 
                onClick={() => {
                  onClose();
                  onEdit(request);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Modifier
              </button>
            )}
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDialog;