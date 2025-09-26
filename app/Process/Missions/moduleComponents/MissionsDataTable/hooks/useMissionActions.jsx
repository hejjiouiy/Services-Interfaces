import { useState } from 'react';
import { TokenManager } from '../../../../../../utils/authHelpers';
import { authenticatedFetch, checkTokenExpiration, createReport } from '../config/missionApi';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL || 'http://localhost:8000';

const useMissionActions = (missions, setMissions, closeAllDialogs) => {
  // États pour les dialogs de notification
  const [notificationDialog, setNotificationDialog] = useState({
    isOpen: false,
    type: 'info',
    title: '',
    message: '',
    autoClose: false
  });

  const [downloadConfirmDialog, setDownloadConfirmDialog] = useState({
    isOpen: false,
    mission: null
  });

  // Fonction pour afficher une notification
  const showNotification = (type, title, message, autoClose = false) => {
    setNotificationDialog({
      isOpen: true,
      type,
      title,
      message,
      autoClose
    });
  };

  // Fonction pour fermer la notification
  const closeNotification = () => {
    setNotificationDialog(prev => ({ ...prev, isOpen: false }));
  };

  const saveEdit = (editedMission) => {
    const updatedMissions = missions.map(mission => 
      mission.id === editedMission.id ? editedMission : mission
    );
    setMissions(updatedMissions);
    closeAllDialogs();
    
    showNotification(
      'success',
      'Mission modifiée',
      'Les modifications ont été enregistrées avec succès.',
      true
    );
  };
  
  const confirmDelete = (missionToDelete) => {
    console.log('Mission supprimée:', missionToDelete);

    const updatedMissions = missions.filter(mission => mission.id !== missionToDelete.id);
    
    setMissions(updatedMissions);
    try {
      const response = fetch(`${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/mission/mission/delete/${missionToDelete.mission_id}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${TokenManager.getAccessToken()}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete mission');
      }
      console.log('✅ Mission deleted successfully');
      
      
    }catch (error) {
      console.error('❌ Erreur lors de la suppression de la mission:', error);
    }
    
    showNotification(
      'success',
      'Mission supprimée',
      'La mission a été supprimée avec succès.',
      true
    );
    // closeAllDialogs();
  };

  // Fonction pour sauvegarder un rapport
  const saveReport = async ( reportData) => {
    try {
      showNotification(
        'loading',
        'Création du rapport',
        'Envoi du rapport en cours...',
        false
      );

      const result = await createReport( reportData);

      if (result.success) {
        // Mettre à jour la mission dans la liste locale
        const updatedMissions = missions.map(mission => {
          if (mission.id === reportData.ordre_mission_id) {
            return {
              ...mission,
              rapport: [result.data]
            };
          }
          return mission;
        });
        
        setMissions(updatedMissions);
        closeAllDialogs();

        showNotification(
          'success',
          'Rapport créé',
          'Votre rapport a été créé avec succès et est en attente de validation.',
          true
        );
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('❌ Erreur lors de la création du rapport:', error);
      
      let errorMessage = 'Erreur lors de la création du rapport.';
      
      if (error.message.includes('Token') || error.message.includes('401')) {
        errorMessage = 'Session expirée. Veuillez vous reconnecter.';
      } else if (error.message.includes('403')) {
        errorMessage = 'Vous n\'avez pas l\'autorisation de créer un rapport pour cette mission.';
      } else if (error.message.includes('400')) {
        errorMessage = 'Données du rapport invalides. Vérifiez les champs obligatoires.';
      } else {
        errorMessage = error.message;
      }

      showNotification(
        'error',
        'Erreur de création',
        errorMessage,
        false
      );
      
      // Re-throw l'erreur pour que le dialog puisse la gérer
      throw error;
    }
  };

  // Fonction pour initier le téléchargement avec confirmation
  const initiateDownload = (mission) => {
    setDownloadConfirmDialog({
      isOpen: true,
      mission
    });
  };

  // Fonction pour confirmer et exécuter le téléchargement
  const executeDownload = async () => {
    const mission = downloadConfirmDialog.mission;
    
    // Fermer le dialog de confirmation
    setDownloadConfirmDialog({ isOpen: false, mission: null });
    
    // Afficher le dialog de chargement
    showNotification(
      'loading',
      'Ouverture en cours',
      `Préparation du rapport pour la mission "${mission.mission?.type || mission.type}"...`,
      false
    );

    try {
      console.log('📥 Ouverture du rapport pour la mission:', mission.id);

      // Vérifier qu'il y a un rapport
      if (!mission.rapport || mission.rapport.length === 0) {
        throw new Error('Aucun rapport disponible pour cette mission');
      }

      // Appel à l'API avec authentification
      const response = await authenticatedFetch(`${API_BASE_URL}/mission/rapport/download/${mission.rapport[0].id}`, {
        method: 'GET'
      });

      // Créer un blob à partir de la réponse
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      // Ouvrir dans un nouvel onglet
      const newWindow = window.open(blobUrl, '_blank');

      if (!newWindow) {
        throw new Error('Impossible d\'ouvrir une nouvelle fenêtre. Veuillez autoriser les popups.');
      }

      // Libérer l'URL blob après un délai
      setTimeout(() => {
        window.URL.revokeObjectURL(blobUrl);
      }, 1000 * 60);

      console.log('✅ Rapport ouvert avec succès');
      closeAllDialogs();

      // Notification de succès
      showNotification(
        'success',
        'Rapport ouvert',
        'Le rapport a été ouvert dans un nouvel onglet.',
        true
      );

    } catch (error) {
      console.error('❌ Erreur lors de l\'ouverture du rapport:', error);

      let errorTitle = 'Erreur d\'ouverture';
      let errorMessage = 'Impossible d\'ouvrir le rapport.';

      if (error.message.includes('Token') || error.message.includes('401')) {
        errorTitle = 'Session expirée';
        errorMessage = 'Votre session a expiré. Veuillez vous reconnecter.';
      } else if (error.message.includes('404')) {
        errorTitle = 'Rapport introuvable';
        errorMessage = 'Le rapport demandé n\'a pas été trouvé sur le serveur.';
      } else if (error.message.includes('500')) {
        errorTitle = 'Erreur serveur';
        errorMessage = 'Une erreur s\'est produite sur le serveur. Veuillez réessayer plus tard.';
      } else if (error.message.includes('popup')) {
        errorTitle = 'Popups bloqués';
        errorMessage = 'Veuillez autoriser les popups pour ce site et réessayer.';
      } else if (error.message.includes('Aucun rapport')) {
        errorTitle = 'Aucun rapport';
        errorMessage = 'Cette mission n\'a pas encore de rapport disponible.';
      } else {
        errorMessage = error.message;
      }

      showNotification('error', errorTitle, errorMessage, false);
    }
  };

  // Fonction principale de téléchargement (point d'entrée)
  const downloadReport = (mission) => {
    initiateDownload(mission);
  };

  // Toujours retourner toutes les propriétés
  return {
    saveEdit,
    confirmDelete,
    downloadReport,
    saveReport,
    // États et fonctions pour les dialogs
    notificationDialog,
    closeNotification,
    downloadConfirmDialog,
    setDownloadConfirmDialog,
    executeDownload
  };
};

export default useMissionActions;