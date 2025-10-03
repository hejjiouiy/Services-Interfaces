import React, { useState } from 'react';
import ViewIcon from '../Icons/ViewIcon';
import EditIcon from '../Icons/EditIcon';
import DeleteIcon from '../Icons/DeleteIcon';
import DownloadIcon from '../Icons/DownloadIcon';
import { getCurrentUser } from '../../../../../../../utils/authHelpers';
import {RHValidationDialog, CGApprovalDialog, RHReportValidationDialog , CGBudgetValidationDialog} from '../Dialogs/ValidationDialogs';
import StatusUpdateDialog from '../Dialogs/StatusUpdateDialog';

const ActionButtons = ({ mission, onView, onEdit, onDelete, onDownload, onUpdateStatus, onUploadReport }) => {
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [statusDialog, setStatusDialog] = useState({
    isOpen: false,
    newStatus: null,
    error: null,
    success: false,
    responseData: null
  });
  
  // Specialized validation dialogs
  const [validationDialog, setValidationDialog] = useState({
    type: null, // 'rh_validation', 'cg_budget', 'cg_approval', 'rh_report'
    isOpen: false
  });
  
  // Récupérer l'utilisateur connecté
  const currentUser = getCurrentUser();
  const userRoles = currentUser?.roles || [];
  const currentUserId = currentUser?.id || currentUser?.sub;
  
  // Vérifier les rôles
  const isBPA = userRoles.includes('BPA');
  const isCG = userRoles.includes('CG');
  const isRH = userRoles.includes('RH');
  const isOwner = mission.user?.id === currentUserId;

  // États possibles avec leurs configurations
  const statusOptions = [
    { value: "Ouverte", label: "Ouverte", color: "blue", icon: "🔵" },
    { value: "En attente", label: "En attente", color: "orange", icon: "⏳" },
    { value: "Validee Hierarchiquement", label: "Validée Hiérarchiquement", color: "cyan", icon: "👔" },
    { value: "Validee budgetairement", label: "Validée Budgétairement", color: "teal", icon: "💰" },
    { value: "Approuvee", label: "Approuvée", color: "green", icon: "✅" },
    { value: "Cloturee", label: "Clôturée", color: "gray", icon: "🔒" },
    { value: "Refusee", label: "Refusée", color: "red", icon: "❌" }
  ];

  const currentStatus = mission["etat demande"] || mission.etat || "Ouverte";
  
  // Vérifier l'état du rapport
  const hasReport = mission.rapport && mission.rapport.length > 0;

  // Vérifier si l'utilisateur peut modifier le statut selon les règles métier
  const canUpdateStatus = () => {
    // Si état "Approuvée" et pas de rapport, la gestion se fait via l'import de rapport
    if (currentStatus === "Approuvee" && !hasReport) {
      return false;
    }

    // Owner peut passer de Ouverte à En attente
    if (currentStatus === "Ouverte" && isOwner) {
      return true;
    }

    // RH peut valider de En attente à Validee Hierarchiquement
    if (currentStatus === "En attente" && isRH) {
      return true;
    }
    
    // CG peut valider de Validee Hierarchiquement à Validee budgetairement
    if (currentStatus === "Validee Hierarchiquement" && isCG) {
      return true;
    }

    // CG peut approuver de Validee budgetairement à Approuvee
    if (currentStatus === "Validee budgetairement" && isCG) {
      return true;
    }

    // RH peut clôturer si rapport existe
    if (currentStatus === "Approuvee" && hasReport && isRH) {
      return true;
    }

    // BPA peut refuser à tout moment (sauf Cloturee)
    if (isBPA && !["Cloturee"].includes(currentStatus)) {
      return true;
    }
    
    return false;
  };

  // Vérifier si l'utilisateur peut modifier/supprimer la mission
  const canEditOrDelete = () => {
    // Seulement pour les états "Ouverte" ou "Refusee"
    if (!["Ouverte", "Refusee"].includes(currentStatus)) {
      return false;
    }
    
    // BPA ou propriétaire de la mission
    return isBPA || isOwner;
  };

  // Vérifier si l'utilisateur peut importer un rapport
  const canUploadReport = () => {
    return currentStatus === "Approuvee" && isOwner && !hasReport;
  };

  // Updated unified function to handle all mission status updates
  const updateMissionStatus = async (missionId, additionalData = {}) => {
    console.log(`Updating mission ${missionId} status with data:`, additionalData);
    console.log(`Current status: ${currentStatus}`);
    
    try {
      const hasData = Object.keys(additionalData).length > 0;
      let url;
      let method;

      // Determine endpoint based on current mission state
      if (currentStatus === "Approuvee" && hasReport) {
        // Report validation endpoint (RH final validation)
        url = `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/mission/rapport/validate/${mission?.rapport[0].id}/`;
        method = hasData ? 'PUT' : 'GET';
      } else {
        // Regular mission status update endpoint
        url = `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/mission/order/etat-update/${missionId}/`;
        method = hasData ? 'POST' : 'GET';
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_access_token')}`,
          ...(hasData && { 'Content-Type': 'application/json' })
        },
        ...(hasData && { body: JSON.stringify(additionalData) })
      });

      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorData.message || errorMessage;
        } catch (e) {
          // Response not JSON → keep default error message
        }
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to update mission status:", error);
      throw error;
    }
    finally{
      
      setTimeout(() => {
      window.location.reload();
    }, 4000);
    }
  };

  const handleStatusChangeRequest = (newStatus) => {
    setShowStatusDropdown(false);
    
    // Determine which validation dialog to show based on current status and target status
    const validationType = getValidationType(currentStatus, newStatus);
    
    if (validationType) {
      setValidationDialog({
        type: validationType,
        isOpen: true
      });
    } else {
      // Simple status change without special validation
      setStatusDialog({
        isOpen: true,
        newStatus: newStatus,
        error: null,
        success: false,
        responseData: null
      });
    }
  };

  const getValidationType = (currentStatus, newStatus) => {
    // En attente → Validee Hierarchiquement (RH validation with document)
    if (currentStatus === "En attente" && newStatus === "Validee Hierarchiquement") {
      return 'rh_validation';
    }
    
    // Validee Hierarchiquement → Validee budgetairement (CG budget validation)
    if (currentStatus === "Validee Hierarchiquement" && newStatus === "Validee budgetairement") {
      return 'cg_budget';
    }
    
    // Validee budgetairement → Approuvee (CG final approval)
    if (currentStatus === "Validee budgetairement" && newStatus === "Approuvee") {
      return 'cg_approval';
    }
    
    // Approuvee → Cloturee (RH report validation)
    if (currentStatus === "Approuvee" && newStatus === "Cloturee" && hasReport) {
      return 'rh_report';
    }
    
    return null;
  };

  // Unified handler for all validations (now uses updateMissionStatus for all dialogs)
  const handleValidationConfirm = async (additionalData = {}) => {
    setIsUpdatingStatus(true);
    
    try {
      // Send request to backend with additional validation data using unified function
      const responseData = await updateMissionStatus(mission.id, additionalData);
      
      // Show success dialog with response details
      setStatusDialog({
        isOpen: true,
        newStatus: responseData["etat de mission"] || responseData.etat,
        error: null,
        success: true,
        responseData: responseData
      });
      
      // Call parent component's callback to update the UI
      if (onUpdateStatus) {
        onUpdateStatus(mission, responseData["etat de mission"] || responseData.etat);
      }
      
      console.log(`Mission status updated successfully:`, responseData);
      
    } catch (error) {
      // Show error dialog
      setStatusDialog({
        isOpen: true,
        newStatus: null,
        error: error.message,
        success: false,
        responseData: null
      });
      
      console.error('Failed to update mission status:', error);
      
    } finally {
      setIsUpdatingStatus(false);
      closeValidationDialog();
    }
  };

  const handleSimpleStatusChange = async () => {
    const { newStatus } = statusDialog;
    
    if (newStatus === currentStatus) {
      closeStatusDialog();
      return;
    }

    setIsUpdatingStatus(true);
    
    try {
      // Send request to backend using unified function
      const responseData = await updateMissionStatus(mission.id);
      
      // Show success dialog with response details
      setStatusDialog({
        isOpen: true,
        newStatus: newStatus,
        error: null,
        success: true,
        responseData: responseData
      });
      
      // Call parent component's callback to update the UI
      if (onUpdateStatus) {
        onUpdateStatus(mission, responseData["etat de mission"] || responseData.etat);
      }
      
      console.log(`Mission status updated successfully:`, responseData);
      
    } catch (error) {
      // Show error dialog
      setStatusDialog({
        isOpen: true,
        newStatus: newStatus,
        error: error.message,
        success: false,
        responseData: null
      });
      
      console.error('Failed to update mission status:', error);
      
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const closeStatusDialog = () => {
    setStatusDialog({
      isOpen: false,
      newStatus: null,
      error: null,
      success: false,
      responseData: null
    });
  };

  const closeValidationDialog = () => {
    setValidationDialog({
      type: null,
      isOpen: false
    });
  };

  const handleUploadReport = () => {
    if (onUploadReport) {
      onUploadReport(mission);
    }
  };

  const getCurrentStatusConfig = () => {
    return statusOptions.find(status => status.value === currentStatus) || statusOptions[0];
  };

  // Obtenir les options de statut disponibles selon l'état actuel et le rôle
  const getAvailableNextStates = () => {
    if (!canUpdateStatus()) {
      return [];
    }

    const states = [];

    // Owner peut soumettre la mission
    if (currentStatus === "Ouverte" && isOwner) {
      states.push("En attente");
    }

    // RH peut valider hiérarchiquement
    if (currentStatus === "En attente" && isRH) {
      states.push("Validee Hierarchiquement");
    }
    
    // CG peut valider budgétairement
    if (currentStatus === "Validee Hierarchiquement" && isCG) {
      states.push("Validee budgetairement");
    }

    // CG peut approuver
    if (currentStatus === "Validee budgetairement" && isCG) {
      states.push("Approuvee");
    }

    // RH peut clôturer si rapport existe
    if (currentStatus === "Approuvee" && hasReport && isRH) {
      states.push("Cloturee");
    }

    // BPA peut refuser à tout moment (sauf Cloturee)
    if (isBPA && !["Cloturee"].includes(currentStatus)) {
      states.push("Refusee");
    }

    // Réouverture possible pour les missions refusées
    if (currentStatus === "Refusee" && (isBPA || isOwner)) {
      states.push("Ouverte");
    }
    
    return states;
  };

  const availableStates = getAvailableNextStates();
  const currentConfig = getCurrentStatusConfig();

  // Fonction helper pour déterminer l'étape logique suivante
  function getNextLogicalStep() {
    switch (currentStatus) {
      case "Ouverte": return "En attente";
      case "En attente": return "Validee Hierarchiquement";
      case "Validee Hierarchiquement": return "Validee budgetairement";
      case "Validee budgetairement": return "Approuvee";
      case "Approuvee": return hasReport ? "Cloturee" : null;
      case "Refusee": return "Ouverte";
      default: return null;
    }
  }

  return (
    <>
      <div className="flex justify-end items-center space-x-2">
        {/* Bouton de vue - toujours visible */}
        <button 
          onClick={() => onView(mission)}
          className="text-main-green hover:text-main-green/80 p-1 rounded transition-colors"
          title="Voir les détails"
        >
          <span className="sr-only">Voir</span>
          <ViewIcon />
        </button>

        {/* Bouton d'édition - conditionnel */}
        {canEditOrDelete() && (
          <button 
            onClick={() => onEdit(mission)}
            className="text-blue-600 hover:text-blue-800 p-1 rounded transition-colors"
            title="Modifier"
          >
            <span className="sr-only">Modifier</span>
            <EditIcon />
          </button>
        )}

        {/* Bouton de téléchargement si rapport disponible */}
        {hasReport && mission.rapport[0].isValid && (
          <button 
            onClick={() => onDownload(mission)}
            className="text-purple-600 hover:text-purple-800 p-1 rounded transition-colors"
            title="Télécharger le rapport"
          >
            <span className="sr-only">Télécharger</span>
            <DownloadIcon />
          </button>
        )}

        {/* Bouton d'import de rapport - pour missions approuvées sans rapport */}
        {canUploadReport() && (
          <button 
            onClick={handleUploadReport}
            className="flex items-center px-2 py-1 bg-blue-100 text-blue-800 border border-blue-200 rounded text-xs font-medium hover:bg-blue-200 transition-colors"
            title="Importer un rapport de mission (propriétaire uniquement)"
          >
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Créer rapport</span>
          </button>
        )}

        {/* Dropdown de validation d'état - conditionnel selon rôle */}
        {canUpdateStatus() && availableStates.length > 0 && (
          <div className="relative">
            <button
              onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              disabled={isUpdatingStatus}
              className={`flex items-center px-2 py-1 rounded text-xs font-medium transition-colors border
                ${isUpdatingStatus ? 'opacity-50 cursor-not-allowed' : ''}
                ${currentConfig.color === 'green' ? 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200' :
                  currentConfig.color === 'blue' ? 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200' :
                  currentConfig.color === 'orange' ? 'bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200' :
                  currentConfig.color === 'red' ? 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200' :
                  currentConfig.color === 'gray' ? 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200' :
                  currentConfig.color === 'cyan' ? 'bg-cyan-100 text-cyan-800 border-cyan-200 hover:bg-cyan-200' :
                  currentConfig.color === 'teal' ? 'bg-teal-100 text-teal-800 border-teal-200 hover:bg-teal-200' :
                  'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200'
                }`}
              title={`Changer le statut (${isRH ? 'RH' : isCG ? 'CG' : isBPA ? 'BPA' : 'Utilisateur'})`}
            >
              <span className="mr-1">{currentConfig.icon}</span>
              <span className="max-w-20 truncate">{currentConfig.label}</span>
              {isUpdatingStatus ? (
                <svg className="animate-spin w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </button>

            {showStatusDropdown && !isUpdatingStatus && (
              <>
                {/* Overlay pour fermer le dropdown */}
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowStatusDropdown(false)}
                />
                
                {/* Menu dropdown */}
                <div className="absolute right-0 mt-1 w-52 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                  <div className="py-1">
                    <div className="px-3 py-2 text-xs font-medium text-gray-500 bg-gray-50 border-b">
                      <div>Actions disponibles</div>
                      <div className="text-xs text-gray-400 mt-1">
                        {isRH ? 'Rôle: RH' : isCG ? 'Rôle: CG' : isBPA ? 'Rôle: BPA' : 'Propriétaire'}
                      </div>
                    </div>
                    {availableStates.map((statusValue) => {
                      const config = statusOptions.find(s => s.value === statusValue);
                      if (!config) return null;
                      
                      const isNextStep = getNextLogicalStep() === statusValue;
                      const isRefusal = statusValue === "Refusee";
                      const needsValidation = getValidationType(currentStatus, statusValue);
                      
                      return (
                        <button
                          key={statusValue}
                          onClick={() => handleStatusChangeRequest(statusValue)}
                          className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center transition-colors
                            ${isRefusal ? 'border-t border-gray-100 text-red-700' : ''}
                            ${isNextStep ? 'bg-blue-50' : ''}`}
                        >
                          <span className="mr-2">{config.icon}</span>
                          <div className="flex-1">
                            <span>{config.label}</span>
                            {isNextStep && !needsValidation && (
                              <span className="ml-2 text-xs text-blue-600">(Suivant)</span>
                            )}
                            {needsValidation && (
                              <span className="ml-2 text-xs text-purple-600">(Validation)</span>
                            )}
                            {isRefusal && (
                              <span className="ml-2 text-xs text-red-600">(Refus)</span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Bouton de suppression - conditionnel */}
        {canEditOrDelete() && (
          <button 
            onClick={() => onDelete(mission)}
            className="text-red-600 hover:text-red-800 p-1 rounded transition-colors"
            title="Supprimer"
          >
            <span className="sr-only">Supprimer</span>
            <DeleteIcon />
          </button>
        )}
      </div>

      {/* Standard Status Update Dialog */}
      <StatusUpdateDialog
        mission={mission}
        newStatus={statusDialog.newStatus}
        isOpen={statusDialog.isOpen && !statusDialog.success && !statusDialog.error}
        onClose={closeStatusDialog}
        onConfirm={handleSimpleStatusChange}
        isLoading={isUpdatingStatus}
        error={statusDialog.error}
        success={statusDialog.success}
        responseData={statusDialog.responseData}
      />

      {/* Success/Error Dialog */}
      <StatusUpdateDialog
        mission={mission}
        newStatus={statusDialog.newStatus}
        isOpen={statusDialog.isOpen && (statusDialog.success || statusDialog.error)}
        onClose={closeStatusDialog}
        onConfirm={closeStatusDialog}
        isLoading={false}
        error={statusDialog.error}
        success={statusDialog.success}
        responseData={statusDialog.responseData}
      />

      {/* Specialized Validation Dialogs - All now use the unified handleValidationConfirm */}
      {validationDialog.type === 'rh_validation' && (
        <RHValidationDialog
          mission={mission}
          isOpen={validationDialog.isOpen}
          onClose={closeValidationDialog}
          onConfirm={handleValidationConfirm}
          isLoading={isUpdatingStatus}
        />
      )}

      {validationDialog.type === 'cg_budget' && (
        <CGBudgetValidationDialog
          mission={mission}
          isOpen={validationDialog.isOpen}
          onClose={closeValidationDialog}
          onConfirm={handleValidationConfirm}
          isLoading={isUpdatingStatus}
        />
      )}

      {validationDialog.type === 'cg_approval' && (
        <CGApprovalDialog
          mission={mission}
          isOpen={validationDialog.isOpen}
          onClose={closeValidationDialog}
          onConfirm={handleValidationConfirm}
          isLoading={isUpdatingStatus}
        />
      )}

      {validationDialog.type === 'rh_report' && (
        <RHReportValidationDialog
          mission={mission}
          isOpen={validationDialog.isOpen}
          onClose={closeValidationDialog}
          onConfirm={handleValidationConfirm}
          isLoading={isUpdatingStatus}
        />
      )}
    </>
  );
};

export default ActionButtons;