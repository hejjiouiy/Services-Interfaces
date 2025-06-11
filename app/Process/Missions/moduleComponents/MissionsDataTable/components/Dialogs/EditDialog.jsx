import React, { useState, useEffect, useRef } from 'react';
import DialogHeader from './DialogHeader';
import FormField from '../Forms/FormField'; 


const EditDialog = ({ mission, isOpen, onClose, onSave }) => {
  const dialogRef = useRef(null);
  const [editFormData, setEditFormData] = useState(null);

  useEffect(() => {
    if (isOpen && mission) {
      setEditFormData(JSON.parse(JSON.stringify(mission)));
    }
  }, [isOpen, mission]);

  if (!isOpen || !mission || !editFormData) return null;

  const handleEditFormChange = (field, value) => {
    setEditFormData({
      ...editFormData,
      [field]: value
    });
  };

  const handleOrderChange = (field, value) => {
    if (editFormData.ordres_mission && editFormData.ordres_mission.length > 0) {
      const updatedOrders = [...editFormData.ordres_mission];
      updatedOrders[0] = {
        ...updatedOrders[0],
        [field]: value
      };
      
      setEditFormData({
        ...editFormData,
        ordres_mission: updatedOrders
      });
    }
  };

  const handleSave = () => {
    onSave(editFormData);
    onClose();
  };

  const typeOptions = [
    { value: "FORMATION", label: "FORMATION" },
    { value: "CONFERENCE", label: "CONFERENCE" },
    { value: "REUNION", label: "REUNION" },
    { value: "AUTRE", label: "AUTRE" }
  ];

  const statusOptions = [
    { value: "OUVERTE", label: "OUVERTE" },
    { value: "EN_COURS", label: "EN_COURS" },
    { value: "TERMINEE", label: "TERMINEE" },
    { value: "ANNULEE", label: "ANNULEE" }
  ];

  return (
    <div className="fixed inset-0 bg-black/65 flex items-center justify-center p-4 z-50">
      <div ref={dialogRef} className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
        <div className="p-6">
          <DialogHeader title="Modifier la mission" onClose={onClose} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <FormField
              label="Type"
              type="select"
              value={editFormData.type}
              onChange={(e) => handleEditFormChange('type', e.target.value)}
              options={typeOptions}
            />
            
            <FormField
              label="Destination"
              value={editFormData.destination}
              onChange={(e) => handleEditFormChange('destination', e.target.value)}
            />
            
            <FormField
              label="Ville"
              value={editFormData.ville}
              onChange={(e) => handleEditFormChange('ville', e.target.value)}
            />
            
            <FormField
              label="Pays"
              value={editFormData.pays}
              onChange={(e) => handleEditFormChange('pays', e.target.value)}
            />
            
            <FormField
              label="Budget prévu"
              type="number"
              value={editFormData.budgetPrevu}
              onChange={(e) => handleEditFormChange('budgetPrevu', parseFloat(e.target.value))}
            />
            
            {editFormData.ordres_mission && editFormData.ordres_mission.length > 0 && (
              <>
                <FormField
                  label="Date de début"
                  type="date"
                  value={editFormData.ordres_mission[0].dateDebut.split('T')[0]}
                  onChange={(e) => handleOrderChange('dateDebut', e.target.value)}
                />
                
                <FormField
                  label="Date de fin"
                  type="date"
                  value={editFormData.ordres_mission[0].dateFin.split('T')[0]}
                  onChange={(e) => handleOrderChange('dateFin', e.target.value)}
                />
                
                <FormField
                  label="Statut"
                  type="select"
                  value={editFormData.ordres_mission[0].etat}
                  onChange={(e) => handleOrderChange('etat', e.target.value)}
                  options={statusOptions}
                />
              </>
            )}
            
            <FormField
              label="Détails"
              type="textarea"
              value={editFormData.details}
              onChange={(e) => handleEditFormChange('details', e.target.value)}
              className="md:col-span-2"
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button 
              onClick={handleSave}
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