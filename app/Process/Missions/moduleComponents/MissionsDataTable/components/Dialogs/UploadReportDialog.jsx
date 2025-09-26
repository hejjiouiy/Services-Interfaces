import React, { useState, useEffect, useRef } from 'react';
import DialogHeader from './DialogHeader';
import FormField from '../Forms/FormField';
import next from 'next';

const UploadReportDialog = ({ mission, isOpen, onClose, onSave }) => {
  const dialogRef = useRef(null);
  const [reportFormData, setReportFormData] = useState({
    objective: '',
    proceedings: '',
    resultAchieved: '',
    keyContact: '',
    interlocutors: '',
    difficulties: '',
    recommendations: '',
    nextStep: ''
  });
  console.log('UploadReportDialog rendered with mission:', mission);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen && mission) {
      // Réinitialiser le formulaire à chaque ouverture
      setReportFormData({
        objective: '',
        proceedings: '',
        resultAchieved: '',
        keyContact: '',
        interlocutors: '',
        difficulties: '',
        recommendations: '',
        nextStep: ''
      });
      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen, mission]);

  if (!isOpen || !mission) return null;

  const handleFormChange = (field, value) => {
    setReportFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Effacer l'erreur du champ si elle existe
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Champs obligatoires
    if (!reportFormData.objective.trim()) {
      newErrors.objective = 'Les objectifs de la mission sont obligatoires';
    }
    
    if (!reportFormData.proceedings.trim()) {
      newErrors.proceedings = 'Les activités réalisées sont obligatoires';
    }
    
    if (!reportFormData.resultAchieved.trim()) {
      newErrors.resultAchieved = 'Les résultats obtenus sont obligatoires';
    }

    if (!reportFormData.keyContact.trim()) {
      newErrors.keyContact = 'Les contacts clés sont obligatoires';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Préparer les données du rapport
      const reportData = {
        ordre_mission_id: mission.id,
        objective: reportFormData.objective.trim(),
        proceedings: reportFormData.proceedings.trim(),
        resultAchieved: reportFormData.resultAchieved.trim(),
        keyContact: reportFormData.keyContact.trim(),
        interlocutors: reportFormData.interlocutors.trim(),
        difficulties: reportFormData.difficulties.trim(),
        recommendations: reportFormData.recommendations.trim(),
        nextStep: reportFormData.nextStep.trim()
      };

      await onSave(reportData);
      onClose();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du rapport:', error);
      // L'erreur sera gérée par le composant parent
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/65 flex items-center justify-center p-4 z-50">
      <div ref={dialogRef} className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-2/3 overflow-y-auto">
        <div className="p-6">
          <DialogHeader 
            title="Créer un rapport de mission" 
            onClose={onClose} 
          />
          
          {/* Informations de la mission */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Mission concernée</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Type:</span> {mission.type || 'N/A'}
              </div>
              <div>
                <span className="font-medium">Destination:</span> {mission.destination || 'N/A'}
              </div>
              <div>
                <span className="font-medium">Période:</span> {mission.dateDebut} au {mission.dateFin}
              </div>
              <div>
                <span className="font-medium">Budget:</span> {mission.budgetPrevu?.toLocaleString()} DH
              </div>
            </div>
          </div>

          {/* Message d'instruction */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  <strong>Instructions:</strong> Veuillez remplir ce rapport de mission avec le maximum de détails. 
                  Les champs marqués d'un astérisque (*) sont obligatoires.
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4 mb-6">
            {/* Objectifs de la mission */}
            <FormField
              label="1. Objectifs de la mission *"
              type="textarea"
              value={reportFormData.objective}
              onChange={(e) => handleFormChange('objective', e.target.value)}
              placeholder="Décrivez les objectifs principaux de cette mission..."
              rows={3}
              error={errors.objective}
              disabled={isSubmitting}
            />

            {/* Activités réalisées */}
            <FormField
              label="2. Activités réalisées *"
              type="textarea"
              value={reportFormData.proceedings}
              onChange={(e) => handleFormChange('proceedings', e.target.value)}
              placeholder="Détaillez les activités qui ont été menées pendant la mission..."
              rows={4}
              error={errors.proceedings}
              disabled={isSubmitting}
            />

            {/* Résultats obtenus */}
            <FormField
              label="3. Résultats obtenus *"
              type="textarea"
              value={reportFormData.resultAchieved}
              onChange={(e) => handleFormChange('resultAchieved', e.target.value)}
              placeholder="Présentez les résultats concrets obtenus lors de cette mission..."
              rows={4}
              error={errors.resultAchieved}
              disabled={isSubmitting}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Key Contacts */}
              <FormField
                label="4. Contacts clés *"
                type="textarea"
                value={reportFormData.keyContact}
                onChange={(e) => handleFormChange('keyContact', e.target.value)}
                placeholder="Listez les contacts importants rencontrés (nom, fonction, organisation)..."
                rows={3}
                error={errors.keyContact}
                disabled={isSubmitting}
              />

              {/* Interlocuteurs */}
              <FormField
                label="5. Interlocuteurs"
                type="textarea"
                value={reportFormData.interlocutors}
                onChange={(e) => handleFormChange('interlocutors', e.target.value)}
                placeholder="Mentionnez les autres interlocuteurs rencontrés pendant la mission..."
                rows={3}
                disabled={isSubmitting}
              />
            </div>

            {/* Difficultés rencontrées */}
            <FormField
              label="6. Difficultés rencontrées"
              type="textarea"
              value={reportFormData.difficulties}
              onChange={(e) => handleFormChange('difficulties', e.target.value)}
              placeholder="Décrivez les obstacles ou difficultés rencontrés et comment ils ont été surmontés..."
              rows={3}
              disabled={isSubmitting}
            />

            {/* Recommandations */}
            <FormField
              label="7. Recommandations"
              type="textarea"
              value={reportFormData.recommendations}
              onChange={(e) => handleFormChange('recommendations', e.target.value)}
              placeholder="Formulez vos recommandations pour l'avenir ou des améliorations possibles..."
              rows={3}
              disabled={isSubmitting}
            />
          </div>
          {/* Difficultés rencontrées */}
            <FormField
              label="7. etapes suivantes"
              type="textarea"
              value={reportFormData.nextStep}
              onChange={(e) => handleFormChange('nextStep', e.target.value)}
              placeholder="Donner les prochaines étapes à suivre pour la mission..."
              rows={3}
              disabled={isSubmitting}
            />


          {/* Informations sur la validation */}
          <div className="mb-6 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Note:</strong> Une fois votre rapport soumis, il sera transmis pour validation 
                  par les responsables compétents. Vous recevrez une notification du statut de validation.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button 
              onClick={handleSave}
              disabled={isSubmitting}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                isSubmitting
                  ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                  : 'bg-main-green text-white hover:bg-green-700'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Envoi en cours...
                </div>
              ) : (
                'Soumettre le rapport'
              )}
            </button>
            <button 
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadReportDialog;