const useMissionActions = (missions, setMissions, closeAllDialogs) => {
  const saveEdit = (editedMission) => {
    const updatedMissions = missions.map(mission => 
      mission.id === editedMission.id ? editedMission : mission
    );
    setMissions(updatedMissions);
    closeAllDialogs();
  };
  
  const confirmDelete = (missionToDelete) => {
    const updatedMissions = missions.filter(mission => mission.id !== missionToDelete.id);
    setMissions(updatedMissions);
    closeAllDialogs();
  };
  
  const downloadReport = async (mission) => {
    try {
      alert(`Téléchargement du rapport pour la mission ${mission.id} initié.`);
      
      const response = await fetch(`http://127.0.0.1:8051/rapport/download/${mission.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');

      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 1000 * 60);

      closeAllDialogs();
      
    } catch (error) {
      console.error('Erreur lors de l\'ouverture du rapport:', error);
      alert('Erreur lors de l\'ouverture du rapport. Veuillez réessayer.');
    }
  };

  return {
    saveEdit,
    confirmDelete,
    downloadReport
  };
};
export default useMissionActions;