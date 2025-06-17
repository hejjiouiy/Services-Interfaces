import { useState, useEffect } from 'react';

export const useMissionData = (initialData = [], apiEndpoint = null) => {
  const [missions, setMissions] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (apiEndpoint) {
      fetchMissions();
    }
  }, [apiEndpoint]);

  const fetchMissions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(apiEndpoint);
      if (!response.ok) throw new Error('Failed to fetch missions');
      const data = await response.json();
      setMissions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addMission = (mission) => {
    setMissions(prev => [...prev, mission]);
  };

  const updateMission = (updatedMission) => {
    setMissions(prev => prev.map(mission => 
      mission.id === updatedMission.id ? updatedMission : mission
    ));
  };

  const deleteMission = (missionId) => {
    setMissions(prev => prev.filter(mission => mission.id !== missionId));
  };

  return {
    missions,
    loading,
    error,
    setMissions,
    addMission,
    updateMission,
    deleteMission,
    refetch: fetchMissions
  };
};