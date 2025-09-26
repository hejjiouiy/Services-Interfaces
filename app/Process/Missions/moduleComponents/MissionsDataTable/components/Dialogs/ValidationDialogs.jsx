import React, { useState, useEffect } from 'react';
import ConfirmationDialog from './ConfirmationDialog';

// Dialog for RH validation with document review
const RHValidationDialog = ({ 
  mission, 
  isOpen, 
  onClose, 
  onConfirm, 
  isLoading 
}) => {
  const [documentReviewed, setDocumentReviewed] = useState(false);
  
  const handleConfirm = () => {
    if (documentReviewed) {
      onConfirm();
    }
  };

  return (
    <ConfirmationDialog
      size="large"
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="Validation Hiérarchique (RH)"
      message={
        <div className="space-y-4 max-w-full">
          <p className="text-gray-700 break-words">
            En tant que RH, vous devez valider l'accord du responsable pour la mission 
            "{mission?.type}" à {mission?.destination}.
          </p>
          
          {/* Document Display */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-full">
            <h4 className="font-medium text-blue-800 mb-2 break-words">Accord du Responsable</h4>
            {mission?.["accord de Responsable"] ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-blue-700 break-words">Document disponible</span>
                </div>
                <button
                  type="button"
                  onClick={async () => {
                    try{
                        const response = await fetch(`${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/mission/order${mission["accord de Responsable"]}`,
                            {
                          method: 'GET',
                          headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('auth_access_token')}`
                          }
                    });
                    if (!response.ok) throw new Error('Erreur lors du téléchargement du document');
                        const blob = await response.blob();
                        const blobUrl = window.URL.createObjectURL(blob);
                        window.open(blobUrl, '_blank');
                        // Optionally, revoke the object URL after some time
                        setTimeout(() => window.URL.revokeObjectURL(blobUrl), 10000);
                  }catch (err) {
      alert('Impossible de consulter le document.');
    }
                    }
                    
                }
                  className="w-full bg-blue-100 hover:bg-blue-200 text-blue-800 py-2 px-3 rounded text-sm transition-colors break-words"
                >
                  📄 Consulter l'accord du responsable
                </button>
              </div>
            ) : (
              <p className="text-red-600 text-sm break-words">Aucun document disponible</p>
            )}
          </div>

          {/* Validation Checkbox */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 max-w-full">
            <label className="grid grid-cols-[auto,1fr] items-start gap-3 cursor-pointer">
              <div className='flex gap-3 items-center'>
                <input
                  type="checkbox"
                  checked={documentReviewed}
                  onChange={(e) => setDocumentReviewed(e.target.checked)}
                  className="mt-1 flex-shrink-0"
                />
                <span className="text-gray-800 font-medium block break-words">
                  J'ai consulté et validé l'accord du responsable
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-gray-600 text-sm mt-1 whitespace-normal break-words [overflow-wrap:anywhere] [word-break:break-word]">
                  En cochant cette case, je confirme que l'accord du responsable est conforme
                  et que la mission peut passer à l'étape de validation budgétaire.
                </p>
              </div>
            </label>
          </div>
        </div>
      }
      confirmText={isLoading ? "Validation en cours..." : "Valider (RH)"}
      confirmColor="bg-cyan-600 hover:bg-cyan-700"
      isLoading={isLoading}
      confirmDisabled={!documentReviewed}
      icon={
        <div className="bg-cyan-100 rounded-full p-2">
          <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      }
    />
  );
};


// Enhanced Dialog for CG budget validation with budget line selection/creation
const CGBudgetValidationDialog = ({ 
  mission, 
  isOpen, 
  onClose, 
  onConfirm, 
  isLoading
}) => {
  const [mode, setMode] = useState('select'); // 'select' or 'create'
  const [existingLines, setExistingLines] = useState([]);
  const [selectedLineId, setSelectedLineId] = useState('');
  const [loadingLines, setLoadingLines] = useState(false);
  
  // New budget line form data
  const [newLine, setNewLine] = useState({
    codeLigne: '',
    nomLigne: '',
    exerciceBudgetaire: new Date().getFullYear().toString()
  });

  // Mission order estimated amount (separate from budget line)
  const [montantEstime, setMontantEstime] = useState('');
  
  const [errors, setErrors] = useState({});

  // Fetch existing budget lines when dialog opens
  useEffect(() => {
    if (isOpen) {
      fetchExistingBudgetLines();
      // Reset form when dialog opens
      setMode('select');
      setSelectedLineId('');
      setMontantEstime('');
      setNewLine({
        codeLigne: '',
        nomLigne: '',
        exerciceBudgetaire: new Date().getFullYear().toString()
      });
      setErrors({});
    }
  }, [isOpen]);

  const fetchExistingBudgetLines = async () => {
    setLoadingLines(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/mission/ligne-budgetaire`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_access_token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setExistingLines(data.results || data || []);
      } else {
        console.warn('Failed to fetch budget lines, proceeding with create mode only');
        setExistingLines([]);
      }
    } catch (error) {
      console.error('Error fetching budget lines:', error);
      setExistingLines([]);
    } finally {
      setLoadingLines(false);
    }
  };

  const validateNewLineForm = () => {
    const newErrors = {};
    
    if (!newLine.codeLigne.trim()) {
      newErrors.codeLigne = 'Le code de ligne budgétaire est obligatoire';
    }
    
    if (!newLine.nomLigne.trim()) {
      newErrors.nomLigne = 'Le nom de la ligne budgétaire est obligatoire';
    }
    
    if (!newLine.exerciceBudgetaire.trim()) {
      newErrors.exerciceBudgetaire = 'L\'exercice budgétaire est obligatoire';
    } else if (!/^\d{4}$/.test(newLine.exerciceBudgetaire)) {
      newErrors.exerciceBudgetaire = 'L\'exercice budgétaire doit être une année (ex: 2024)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateMontantEstime = () => {
    const newErrors = {};
    
    if (!montantEstime.trim()) {
      newErrors.montantEstime = 'Le montant estimé est obligatoire';
    } else if (!/^\d+(\.\d+)?$/.test(montantEstime)) {
      newErrors.montantEstime = 'Veuillez entrer un montant valide';
    } else if (parseFloat(montantEstime) <= 0) {
      newErrors.montantEstime = 'Le montant doit être positif';
    }
    
    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = () => {
    // Validate montant estimé (required for both modes)
    if (!validateMontantEstime()) {
      return;
    }

    // Validate based on current mode
    if (mode === 'select' && !selectedLineId) {
      setErrors({ selectedLine: 'Veuillez sélectionner une ligne budgétaire' });
      return;
    }
    
    if (mode === 'create' && !validateNewLineForm()) {
      return;
    }

    // Prepare validation data according to ValidationData schema
    const validationData = {
      montantEstime: parseFloat(montantEstime)
    };
    
    if (mode === 'select') {
      // Using existing budget line
      validationData.ligneBudgetaireId = selectedLineId;
    } else {
      // Creating new budget line
      validationData.ligneBudgetaire = {
        codeLigne: newLine.codeLigne.trim(),
        nom: newLine.nomLigne.trim(),
        exerciceBudgetaire: parseInt(newLine.exerciceBudgetaire)
      };
    }

    console.log('Submitting budget validation with data:', validationData);
    
    // Call the parent's onConfirm with the validation data
    onConfirm(validationData);
  };

  const clearError = (field) => {
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const updateNewLineField = (field, value) => {
    setNewLine(prev => ({ ...prev, [field]: value }));
    clearError(field);
  };

  const canConfirm = () => {
    // Montant estimé is always required
    if (!montantEstime.trim()) {
      return false;
    }
    
    if (mode === 'select') {
      return selectedLineId !== '';
    } else {
      return newLine.codeLigne.trim() && newLine.nomLigne.trim() && 
             newLine.exerciceBudgetaire.trim();
    }
  };

  return (
    <ConfirmationDialog
      size="large"
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="Validation Budgétaire (CG)"
      message={
        <div className="space-y-4 max-w-full">
          <div className="max-w-full grid grid-cols-[auto,1fr] items-start gap-2">
            <strong className="text-gray-900"></strong>
            <div className="min-w-0">
              <p className="text-gray-700 text-sm leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere] [word-break:break-word]">
                En tant que <span className="font-medium">Contrôleur de Gestion</span>, vous devez valider le budget pour la mission 
                <span className="italic"> « {mission?.mission?.titre} »</span> à <span className="font-medium">{mission?.mission?.destination}</span>.
              </p>
            </div>
          </div>

          {/* Mission Details */}
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 max-w-full">
            <h4 className="font-medium text-teal-800 mb-2 break-words">Détails de la Mission</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-start gap-2">
                <span className="text-teal-700 flex-shrink-0">Financement actuel:</span>
                <span className="font-medium break-words text-right">{mission?.mission?.budgetPrevu + " MAD" || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-start gap-2">
                <span className="text-teal-700 flex-shrink-0">Période:</span>
                <span className="font-medium break-words text-right">
                  {mission?.Debut ? new Date(mission.Debut).toLocaleDateString() : 'N/A'} - 
                  {mission?.Fin ? new Date(mission.Fin).toLocaleDateString() : 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Mode Selection */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-3">Ligne Budgétaire</h4>
            <div className="flex space-x-4 mb-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="select"
                  checked={mode === 'select'}
                  onChange={(e) => setMode(e.target.value)}
                  className="mr-2"
                  disabled={loadingLines || existingLines.length === 0}
                />
                <span className="text-sm">Sélectionner une ligne existante</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="create"
                  checked={mode === 'create'}
                  onChange={(e) => setMode(e.target.value)}
                  className="mr-2"
                />
                <span className="text-sm">Créer une nouvelle ligne</span>
              </label>
            </div>

            {/* Existing Lines Selection */}
            {mode === 'select' && (
              <div className="space-y-2">
                {loadingLines ? (
                  <div className="flex items-center justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-600"></div>
                    <span className="ml-2 text-sm text-gray-600">Chargement des lignes budgétaires...</span>
                  </div>
                ) : existingLines.length > 0 ? (
                  <>
                    <label className="block text-sm font-medium text-gray-700">
                      Sélectionner une ligne budgétaire *
                    </label>
                    <select
                      value={selectedLineId}
                      onChange={(e) => {
                        setSelectedLineId(e.target.value);
                        clearError('selectedLine');
                      }}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                        errors.selectedLine ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    >
                      <option value="">-- Sélectionner une ligne --</option>
                      {existingLines.map((line) => (
                        <option key={line.id} value={line.id}>
                          {line.codeLigne} - {line.nom} ({line.exerciceBudgetaire}) - {mission.mission?.budgetPrevu}MAD
                        </option>
                      ))}
                    </select>
                    {errors.selectedLine && (
                      <p className="text-red-600 text-sm">{errors.selectedLine}</p>
                    )}
                  </>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-500 text-sm">Aucune ligne budgétaire disponible.</p>
                    <button
                      type="button"
                      onClick={() => setMode('create')}
                      className="mt-2 text-teal-600 hover:text-teal-700 text-sm font-medium"
                    >
                      Créer une nouvelle ligne
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* New Line Creation Form */}
            {mode === 'create' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Code de Ligne Budgétaire *
                  </label>
                  <input
                    type="text"
                    value={newLine.codeLigne}
                    onChange={(e) => updateNewLineField('codeLigne', e.target.value)}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                      errors.codeLigne ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Ex: BUDGET-2024-001"
                  />
                  {errors.codeLigne && (
                    <p className="text-red-600 text-sm">{errors.codeLigne}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Nom de la Ligne Budgétaire *
                  </label>
                  <input
                    type="text"
                    value={newLine.nomLigne}
                    onChange={(e) => updateNewLineField('nomLigne', e.target.value)}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                      errors.nomLigne ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Ex: Missions et Déplacements"
                  />
                  {errors.nomLigne && (
                    <p className="text-red-600 text-sm">{errors.nomLigne}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Exercice Budgétaire *
                    </label>
                    <input
                      type="number"
                      min="2020"
                      max="2030"
                      value={newLine.exerciceBudgetaire}
                      onChange={(e) => updateNewLineField('exerciceBudgetaire', e.target.value)}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                        errors.exerciceBudgetaire ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="Ex: 2024"
                    />
                    {errors.exerciceBudgetaire && (
                      <p className="text-red-600 text-sm">{errors.exerciceBudgetaire}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Montant Estimé - Always Required */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-yellow-800 mb-3">Montant Estimé de la Mission</h4>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Montant Estimé (MAD) *
              </label>
              <input
                type="number"
                step="1"  
                min="0"
                value={montantEstime}
                onChange={(e) => {
                  setMontantEstime(e.target.value);
                  clearError('montantEstime');
                }}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                  errors.montantEstime ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Ex: 1500.00"
              />
              {errors.montantEstime && (
                <p className="text-red-600 text-sm">{errors.montantEstime}</p>
              )}
              <p className="text-yellow-700 text-sm">
                Ce montant sera associé à l'ordre de mission et utilisé pour le suivi budgétaire.
              </p>
            </div>
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{errors.submit}</p>
            </div>
          )}

          {/* Validation Note */}
          <div className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors max-w-full">
            <div className="text-yellow-500 text-lg flex-shrink-0">💡</div>
            <div className="min-w-0">
              <p className="text-gray-900 font-medium">Note</p>
              <p className="text-gray-600 text-sm mt-1 leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere] [word-break:break-word]">
                {mode === 'select' 
                  ? "La ligne budgétaire sélectionnée sera associée à cette mission avec le montant estimé spécifié."
                  : "Cette nouvelle ligne budgétaire sera créée et associée à la mission avec le montant estimé. Assurez-vous que les informations correspondent aux prévisions budgétaires du département."
                }
              </p>
            </div>
          </div>
        </div>
      }
      confirmText={isLoading ? "Validation en cours..." : "Valider Budget (CG)"}
      confirmColor="bg-teal-600 hover:bg-teal-700"
      isLoading={isLoading}
      confirmDisabled={!canConfirm()}
      icon={
        <div className="bg-teal-100 rounded-full p-2">
          <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        </div>
      }
    />
  );
};


// Dialog for CG final approval
const CGApprovalDialog = ({ 
  mission, 
  isOpen, 
  onClose, 
  onConfirm, 
  isLoading 
}) => {
  const [finalApproval, setFinalApproval] = useState(false);
  
  const handleConfirm = () => {
    if (finalApproval) {
      onConfirm();
    }
  };

  return (
    <ConfirmationDialog
      size="large"
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="Approbation Finale (CG)"
      message={
        <div className="space-y-4 max-w-full">
          <p className="text-gray-700 break-words">
            Approbation finale de la mission "{mission?.mission.title}" à {mission?.mission.destination}.
          </p>
          
          {/* Mission Summary */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-full">
            <h4 className="font-medium text-green-800 mb-3 break-words">Résumé de Validation</h4>
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <span className="text-green-600 flex-shrink-0">✅</span>
                <span className="text-sm break-words">Validation hiérarchique effectuée</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-600 flex-shrink-0">✅</span>
                <span className="text-sm break-words">Budget validé et ligne budgétaire assignée</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-orange-500 flex-shrink-0">⏳</span>
                <span className="text-sm break-words">En attente d'approbation finale</span>
              </div>
            </div>
          </div>

          {/* Final Approval Checkbox */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 max-w-full">
            <label className="grid grid-cols-[auto,1fr] items-start gap-3 cursor-pointer">
              <div className='flex gap-3 items-center'>
                <input
                  type="checkbox"
                  checked={finalApproval}
                  onChange={(e) => setFinalApproval(e.target.checked)}
                  className="mt-1 flex-shrink-0"
                />
                <span className="text-gray-800 font-medium block break-words">
                  J'approuve définitivement cette mission
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-gray-600 text-sm mt-1 whitespace-normal break-words [overflow-wrap:anywhere] [word-break:break-word]">
                  La mission sera approuvée et l'utilisateur pourra procéder à l'exécution 
                  puis au dépôt du rapport de mission.
                </p>
              </div>
            </label>
          </div>
        </div>
      }
      confirmText={isLoading ? "Approbation en cours..." : "Approuver Définitivement"}
      confirmColor="bg-green-600 hover:bg-green-700"
      isLoading={isLoading}
      confirmDisabled={!finalApproval}
      icon={
        <div className="bg-green-100 rounded-full p-2">
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      }
    />
  );
};

// Dialog for RH report validation
const RHReportValidationDialog = ({ 
  mission, 
  isOpen, 
  onClose, 
  onConfirm, 
  isLoading 
}) => {
  const [reportReviewed, setReportReviewed] = useState(false);
  const [validationComments, setValidationComments] = useState('');
  
  const handleConfirm = () => {
    if (reportReviewed) {
      onConfirm({ comments: validationComments });
    }
  };

  return (
    <ConfirmationDialog
      size="large"
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="Validation du Rapport (RH)"
      message={
        <div className="space-y-4 max-w-full">
          <div className="max-w-full grid grid-cols-[auto,1fr] items-start gap-2">
            <strong className="text-gray-900"></strong>
            <div className="min-w-0">
          <p className="text-gray-700 text-sm leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere] [word-break:break-word]">
            Validation finale du rapport de mission pour "{mission?.mission.titre}" à {mission?.mission.destination}.
          </p>
          </div>
            </div>
          
          {/* Report Display */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-full">
            <h4 className="font-medium text-blue-800 mb-2 break-words">Rapport de Mission</h4>
            {mission?.rapport && mission.rapport.length > 0 ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-blue-700 break-words">Rapport disponible</span>
                </div>
                <button
                  type="button"
                  onClick={async () => {
                    console.log("Mission rapport", mission["rapport"].id);
                    try{
                        const response = await fetch(`${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/mission/rapport/download/${mission.rapport[0].id}`,
                            {
                          method: 'GET',
                          headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('auth_access_token')}`
                          }
                    });
                    if (!response.ok) throw new Error('Erreur lors du téléchargement du document');
                        const blob = await response.blob();
                        const blobUrl = window.URL.createObjectURL(blob);
                        window.open(blobUrl, '_blank');
                        // Optionally, revoke the object URL after some time
                        setTimeout(() => window.URL.revokeObjectURL(blobUrl), 10000);
                  }catch (err) {
      alert('Impossible de consulter le document.');
    }
                    }
                    
                }
                  className="w-full bg-blue-100 hover:bg-blue-200 text-blue-800 py-2 px-3 rounded text-sm transition-colors break-words"
                >
                  📄 Consulter le rapport de mission
                </button>
              </div>
            ) : (
              <p className="text-red-600 text-sm break-words">Aucun rapport disponible</p>
            )}
          </div>

          {/* Comments */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 break-words">
              Commentaires de validation (optionnel)
            </label>
            <textarea
              value={validationComments}
              onChange={(e) => setValidationComments(e.target.value)}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 break-words"
              placeholder="Ajoutez vos commentaires sur le rapport..."
            />
          </div>

          {/* Validation Checkbox */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 max-w-full">
            <label className="grid grid-cols-[auto,1fr] items-start gap-3 cursor-pointer">
              <div className='flex gap-3 items-center'>
                <input
                  type="checkbox"
                  checked={reportReviewed}
                  onChange={(e) => setReportReviewed(e.target.checked)}
                  className="mt-1 flex-shrink-0"
                />
                <span className="text-gray-800 font-medium block break-words">
                  J'ai consulté et validé le rapport de mission
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-gray-600 text-sm mt-1 whitespace-normal break-words [overflow-wrap:anywhere] [word-break:break-word]">
                  En cochant cette case, je confirme que le rapport de mission est conforme 
                  et que la mission peut être clôturée définitivement.
                </p>
              </div>
            </label>
          </div>
        </div>
      }
      confirmText={isLoading ? "Validation en cours..." : "Valider et Clôturer"}
      confirmColor="bg-gray-600 hover:bg-gray-700"
      isLoading={isLoading}
      confirmDisabled={!reportReviewed}
      icon={
        <div className="bg-gray-100 rounded-full p-2">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
      }
    />
  );
};

export {
  RHValidationDialog,
  CGBudgetValidationDialog,
  CGApprovalDialog,
  RHReportValidationDialog
};