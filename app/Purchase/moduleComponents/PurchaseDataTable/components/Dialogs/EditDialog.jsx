import React from 'react';
import DialogHeader from './DialogHeader';
import MaterialsTable from './MaterialsTable';
import { formatDate } from '../../utils/formatters';

const EditDialog = ({ 
  isOpen, 
  editFormData, 
  onClose, 
  onSave,
  onFormChange,
  onMaterialChange
}) => {
  if (!isOpen || !editFormData) return null;

  return (
    <div className="fixed inset-0 bg-black/65 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
        <div className="p-6">
          <DialogHeader title="Modifier la demande" onClose={onClose} />
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ID</label>
              <input 
                type="text" 
                value={editFormData.id} 
                disabled 
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type de demande</label>
              <select 
                value={editFormData.typeDemande} 
                onChange={(e) => onFormChange('typeDemande', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-green"
              >
                <option value="DEMANDE_ACHAT">DEMANDE_ACHAT</option>
                <option value="DEMANDE_SERVICE">DEMANDE_SERVICE</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ligne budgétaire</label>
              <input 
                type="text" 
                value={editFormData.budget_line} 
                onChange={(e) => onFormChange('budget_line', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-green"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date de besoin</label>
              <input 
                type="date" 
                value={editFormData.dateBesoin.split('T')[0]} 
                onChange={(e) => onFormChange('dateBesoin', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-green"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priorité</label>
              <select 
                value={editFormData.priorite} 
                onChange={(e) => onFormChange('priorite', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-green"
              >
                <option value="URGENT">URGENT</option>
                <option value="HAUTE">HAUTE</option>
                <option value="NORMAL">NORMAL</option>
                <option value="BASSE">BASSE</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Détails</label>
              <textarea 
                value={editFormData.details} 
                onChange={(e) => onFormChange('details', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-green h-24"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Matériaux</h3>
            <MaterialsTable 
              materials={editFormData.materials} 
              editable={true}
              onMaterialChange={onMaterialChange}
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button 
              onClick={onSave}
              className="px-4 py-2 bg-main-green text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Enregistrer
            </button>
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDialog;