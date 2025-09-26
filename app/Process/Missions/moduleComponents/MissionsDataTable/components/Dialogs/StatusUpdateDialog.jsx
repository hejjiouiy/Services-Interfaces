import React from 'react';
import ConfirmationDialog from './ConfirmationDialog';

const StatusUpdateDialog = ({ 
  mission, 
  newStatus, 
  isOpen, 
  onClose, 
  onConfirm, 
  isLoading,
  error,
  success,
  responseData 
}) => {
  const statusIcons = {
    "Ouverte": "🔵",
    "En attente": "⏳",
    "Validee Hierarchiquement": "👔",
    "Validee budgetairement": "💰",
    "Approuvee": "✅",
    "Cloturee": "🔒",
    "Refusee": "❌"
  };

  const statusLabels = {
    "Ouverte": "Ouverte",
    "En attente": "En attente",
    "Validee Hierarchiquement": "Validée Hiérarchiquement",
    "Validee budgetairement": "Validée Budgétairement",
    "Approuvee": "Approuvée",
    "Cloturee": "Clôturée",
    "Refusee": "Refusée"
  };

  const currentStatus = mission?.["etat demande"] || mission?.etat || "Ouverte";
  const currentIcon = statusIcons[currentStatus] || "🔵";
  const newIcon = statusIcons[newStatus] || "🔵";
  const newLabel = statusLabels[newStatus] || newStatus;
  console.log('StatusUpdateDialog rendered with mission:', mission, 'newStatus:', newStatus);
  // If there's an error, show error dialog
  if (error) {
    return (
      <ConfirmationDialog
        size="large"
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={onClose}
        title="Erreur de mise à jour"
        message={
          <div className="space-y-3 max-w-full">
            <p className="text-gray-700 break-words">
              Une erreur s'est produite lors de la mise à jour du statut de la mission.
            </p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 max-w-full">
              <p className="text-red-800 font-medium break-words">Détails de l'erreur :</p>
              <p className="text-red-700 text-sm mt-1 break-words [overflow-wrap:anywhere] [word-break:break-word]">{error}</p>
            </div>
          </div>
        }
        confirmText="Fermer"
        confirmColor="bg-red-600 hover:bg-red-700"
        hideCancel={true}
        icon={
          <div className="bg-red-100 rounded-full p-2">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        }
      />
    );
  }

  // If successful, show success dialog with response details
  if (success && responseData) {
    return (
      <ConfirmationDialog
        size="large"
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={onClose}
        title="Mise à jour réussie"
        message={
          <div className="space-y-4 max-w-full">
            <div className="flex items-center justify-center space-x-3">
              <span className="text-2xl">{currentIcon}</span>
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <span className="text-2xl">{newIcon}</span>
            </div>
            
            <p className="text-gray-700 break-words text-center">
              Le statut de la mission a été mis à jour avec succès vers <strong>{newLabel}</strong>.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-full">
              <h4 className="text-green-800 font-medium mb-2 break-words">Détails de la réponse :</h4>
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-[auto,1fr] gap-2">
                  <span className="text-green-700 font-medium">ID Mission :</span>
                  <span className="text-green-600 break-words">{responseData.id}</span>
                </div>
                <div className="grid grid-cols-[auto,1fr] gap-2">
                  <span className="text-green-700 font-medium">Nouvel État :</span>
                  <span className="text-green-600 break-words">{responseData["etat de mission"]}</span>
                </div>
                <div className="grid grid-cols-[auto,1fr] gap-2">
                  <span className="text-green-700 font-medium">Financement Type :</span>
                  <span className="text-green-600 break-words">{responseData.financement?.type}</span>
                </div>
                <div className="grid grid-cols-[auto,1fr] gap-2">
                  <span className="text-green-700 font-medium">Financement detailles :</span>
                  <span className="text-green-600 break-words">{responseData.financement?.details}</span>
                </div>
                <div className="grid grid-cols-[auto,1fr] gap-2">
                  <span className="text-green-700 font-medium">Date Début :</span>
                  <span className="text-green-600 break-words">{new Date(responseData.Debut).toLocaleDateString()}</span>
                </div>
                <div className="grid grid-cols-[auto,1fr] gap-2">
                  <span className="text-green-700 font-medium">Date Fin :</span>
                  <span className="text-green-600 break-words">{new Date(responseData.Fin).toLocaleDateString()}</span>
                </div>
                {responseData.rapport && (
                  <div className="grid grid-cols-[auto,1fr] gap-2">
                    <span className="text-green-700 font-medium">Rapport :</span>
                    <span className="text-green-600 break-words">Disponible</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        }
        confirmText="Fermer"
        confirmColor="bg-green-600 hover:bg-green-700"
        hideCancel={true}
        icon={
          <div className="bg-green-100 rounded-full p-2">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        }
      />
    );
  }

  // Default confirmation dialog
  return (
    <ConfirmationDialog
      size="default"
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Confirmer le changement de statut"
      message={
        mission ? (
          <div className="space-y-3 max-w-full">
            <p className="text-gray-700 break-words">
              Vous êtes sur le point de changer le statut de la mission "{mission.type}" 
              à {mission.destination}.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 max-w-full">
              <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-2">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-lg">{currentIcon}</span>
                  <span className="text-blue-800 font-medium text-center break-words">{statusLabels[currentStatus]}</span>
                </div>
                <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-lg">{newIcon}</span>
                  <span className="text-blue-800 font-medium text-center break-words">{newLabel}</span>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 break-words">
              Cette action sera enregistrée dans l'historique de validation.
            </p>
          </div>
        ) : ''
      }
      confirmText={isLoading ? "Mise à jour..." : "Confirmer"}
      confirmColor="bg-blue-600 hover:bg-blue-700"
      isLoading={isLoading}
      icon={
        <div className="bg-blue-100 rounded-full p-2">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
      }
    />
  );
};

export default StatusUpdateDialog;