export const TypeMission = {
  NATIONALE: 'Nationale',
  INTERNATIONALE: 'Internationale',
};

export const EtatMission = {
  OUVERTE: 'OUVERTE',
  EN_COURS: 'EN_COURS',
  TERMINEE: 'TERMINEE',
  ANNULEE: 'ANNULEE'
};

export const TypeFinancementEnum = {
  INTERNE: 'INTERNE',
  EXTERNE: 'EXTERNE',
  PERSONNEL: 'PERSONNEL'
};

export async function getExistingMissionOptions() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/mission/mission/last-missions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('auth_access_token')}`
      }
    });

    if (!res.ok) {
      throw new Error('Failed to fetch existing missions');
    }

    const missions = await res.json();

    return missions.map(mission => ({
      value: mission.id,
      label: `${mission.titre} (${mission.type}) - ${mission.destination} `
    }));
  } catch (error) {
    console.error('Error fetching existing missions:', error);
    return [{
      value: '',
      label: 'No existing missions found'
    }];
  }
}
