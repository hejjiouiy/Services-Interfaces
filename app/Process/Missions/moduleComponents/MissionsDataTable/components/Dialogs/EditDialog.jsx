import React, { useState, useEffect, useRef } from 'react';
import DialogHeader from './DialogHeader';
import FormField from '../Forms/FormField';
import { getCurrentUser } from '../../../../../../../utils/authHelpers';

const EditDialog = ({ mission, isOpen, onClose, onSave }) => {
  const dialogRef = useRef(null);
  const [editFormData, setEditFormData] = useState(null);

  // Récupérer l'utilisateur connecté pour les permissions
  const currentUser = getCurrentUser();
  const userRoles = currentUser?.roles || [];
  const isBPA = userRoles.includes('BPA');
  const isCG = userRoles.includes('CG');
  const isOwner = mission?.User === (currentUser?.id || currentUser?.sub);

  useEffect(() => {
    if (isOpen && mission) {
      // Adapter la structure de données pour l'édition
      const adaptedMission = mission
      
      setEditFormData(JSON.parse(JSON.stringify(adaptedMission)));
    }
  }, [isOpen, mission]);

  if (!isOpen || !mission || !editFormData) return null;

  const handleEditFormChange = (field, value) => {
    setEditFormData({
      ...editFormData,
      [field]: value
    });
  };

  const handleSave = () => {
    // Reconvertir vers la structure attendue par l'API
    const updatedMission = {
      ...mission,
      // Mettre à jour les dates de l'ordre de mission
      Debut: editFormData.dateDebut,
      Fin: editFormData.dateFin,
      "etat demande": editFormData.etatDemande,
      
      // Mettre à jour les données de la mission
      mission: {
        ...mission.mission,
        type: editFormData.type,
        destination: editFormData.destination,
        ville: editFormData.ville,
        pays: editFormData.pays,
        budgetPrevu: editFormData.budgetPrevu,
        details: editFormData.details,
        titre: editFormData.titre
      }
      
    };
    
    onSave(updatedMission);
    onClose();
  };

  // Vérifier si l'utilisateur peut modifier
  const canEdit = () => {
    const currentStatus = editFormData.etatDemande;
    // Modification possible seulement pour les états "Ouverte" ou "Refusee"
    if (!["Ouverte", "Refusee"].includes(currentStatus)) {
      return false;
    }
    // BPA ou propriétaire de la mission
    return isBPA || isOwner;
  };

  // Options de type de mission
  const typeOptions = [
    { value: "Nationale", label: "Nationale" },
    { value: "Internationale", label: "Internationale" },
    { value: "Formation", label: "Formation" },
    { value: "Conference", label: "Conférence" },
    { value: "Reunion", label: "Réunion" },
    { value: "Autre", label: "Autre" }
  ];

  // Options de statut selon les permissions et l'état actuel
  const getStatusOptions = () => {
    const currentStatus = editFormData.etatDemande;
    
    // Si l'utilisateur ne peut pas modifier les statuts via ce dialog
    if (!canEdit()) {
      return [{ value: currentStatus, label: currentStatus }];
    }

    // Pour BPA : transitions possibles
    if (isBPA) {
      switch (currentStatus) {
        case "Ouverte":
          return [
            { value: "Ouverte", label: "Ouverte" },
            { value: "En attente", label: "En attente" },
            { value: "Refusee", label: "Refusée" }
          ];
        case "Refusee":
          return [
            { value: "Refusee", label: "Refusée" },
            { value: "Ouverte", label: "Ouverte" }
          ];
        default:
          return [{ value: currentStatus, label: currentStatus }];
      }
    }

    // Pour les autres utilisateurs, statut en lecture seule
    return [{ value: currentStatus, label: currentStatus }];
  };

  const statusOptions = getStatusOptions();
  const isReadOnly = !canEdit();
  console.log('mission', mission);

  return (
    <div className="fixed inset-0 bg-black/65 flex items-center justify-center p-4 z-50">
      <div ref={dialogRef} className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
        <div className="p-6">
          <DialogHeader 
            title={isReadOnly ? "Détails de la mission" : "Modifier la mission"} 
            onClose={onClose} 
          />
          
          {/* Message d'information si lecture seule */}
          {isReadOnly && (
            <div className="mb-4 bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Cette mission ne peut pas être modifiée car elle n'est pas dans un état éditable ou vous n'avez pas les permissions nécessaires.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Informations de base de la mission */}
            <FormField
              label="Type de mission"
              type="select"
              value={editFormData.type}
              onChange={(e) => handleEditFormChange('type', e.target.value)}
              options={typeOptions}
              disabled={isReadOnly}
            />
            
            <FormField
              label="Destination"
              value={editFormData.destination}
              onChange={(e) => handleEditFormChange('destination', e.target.value)}
              disabled={isReadOnly}
            />
            
            <FormField
              label="Ville"
              value={editFormData.ville}
              onChange={(e) => handleEditFormChange('ville', e.target.value)}
              disabled={isReadOnly}
            />
            
            <FormField
              label="Pays"
              value={editFormData.pays}
              onChange={(e) => handleEditFormChange('pays', e.target.value)}
              disabled={isReadOnly}
            />
            
            <FormField
              label="Budget prévu (DH)"
              type="number"
              value={editFormData.budgetPrevu}
              onChange={(e) => handleEditFormChange('budgetPrevu', parseFloat(e.target.value) || 0)}
              disabled={isReadOnly}
              min="0"
              step="0.01"
            />

            <FormField
              label="Titre (optionnel)"
              value={editFormData.titre}
              onChange={(e) => handleEditFormChange('titre', e.target.value)}
              disabled={isReadOnly}
            />
            
            {/* Informations de l'ordre de mission */}
            <FormField
              label="Date de début"
              type="date"
              value={editFormData.dateDebut ? editFormData.dateDebut.split('T')[0] : ''}
              onChange={(e) => handleEditFormChange('dateDebut', e.target.value)}
              disabled={isReadOnly}
            />
            
            <FormField
              label="Date de fin"
              type="date"
              value={editFormData.dateFin ? editFormData.dateFin.split('T')[0] : ''}
              onChange={(e) => handleEditFormChange('dateFin', e.target.value)}
              disabled={isReadOnly}
            />
            
            <FormField
              label="Statut de la demande"
              type="text"
              value={editFormData.etat}
              onChange={(e) => handleEditFormChange('etatDemande', e.target.value)}
              options={statusOptions}
              disabled={isReadOnly || statusOptions.length <= 1}
            />

            {/* Informations sur l'utilisateur */}
            <FormField
              label="ID Utilisateur"
              value={editFormData.user_id}
              disabled={true}
            />
            
            <FormField
              label="Détails / Description"
              type="textarea"
              value={editFormData.details}
              onChange={(e) => handleEditFormChange('details', e.target.value)}
              className="md:col-span-2"
              disabled={isReadOnly}
              rows={3}
            />
          </div>

          {/* Informations sur le financement si disponible */}
          {editFormData.financement && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Informations de financement</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium">Type:</span> {editFormData.financement.type}
                </div>
                <div>
                  <span className="font-medium">Devise:</span> {editFormData.financement.devise}
                </div>
                <div>
                  <span className="font-medium">Validé:</span> {editFormData.financement.valide ? 'Oui' : 'Non'}
                </div>
                {editFormData.financement.details && (
                  <div className="md:col-span-3">
                    <span className="font-medium">Détails:</span> {editFormData.financement.details}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Informations sur les rapports si disponibles */}
          {editFormData.rapport && editFormData.rapport.length > 0 && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Rapports disponibles</h4>
              <div className="text-sm text-gray-700">
                {editFormData.rapport.length} rapport(s) disponible(s)
                {editFormData.rapport[0].isValid !== null && (
                  <span className={`ml-2 px-2 py-1 rounded text-xs ${
                    editFormData.rapport[0].isValid 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {editFormData.rapport[0].isValid ? 'Validé' : 'En attente de validation'}
                  </span>
                )}
              </div>
            </div>
          )}
          
          <div className="flex justify-end space-x-3 pt-4 border-t">
            {!isReadOnly && (
              <button 
                onClick={handleSave}
                className="px-4 py-2 bg-main-green text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Enregistrer les modifications
              </button>
            )}
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              {isReadOnly ? 'Fermer' : 'Annuler'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDialog;