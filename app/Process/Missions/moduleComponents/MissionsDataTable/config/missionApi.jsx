// services/missionAPI.js
import { TokenManager } from '../../../../../../utils/authHelpers';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL || 'http://localhost:8000';

/**
 * Fonction utilitaire pour faire des requêtes authentifiées
 */
export const authenticatedFetch = async (url, options = {}) => {
  const accessToken = TokenManager.getAccessToken();
  
  if (!accessToken) {
    throw new Error('Token d\'accès non disponible');
  }

  // Vérification d'expiration plus robuste
  const isExpired = checkTokenExpiration(accessToken);
  if (isExpired) {
    console.log('Token expiré, nettoyage et redirection');
    TokenManager.clearTokens();
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    throw new Error('Token expiré');
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
    ...options.headers
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });

    // Gérer les erreurs d'authentification
    if (response.status === 401) {
      console.log('Erreur 401 - Token invalide');
      TokenManager.clearTokens();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      throw new Error('Non autorisé - redirection vers la connexion');
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Erreur HTTP ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error('Erreur lors de la requête authentifiée:', error);
    throw error;
  }
};

/**
 * Vérification manuelle de l'expiration du token
 * Plus fiable que TokenManager.isTokenExpired()
 */
export const checkTokenExpiration = (token) => {
  try {
    // Décoder le JWT pour obtenir l'expiration
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    
    // Ajouter une marge de 60 secondes
    const isExpired = payload.exp <= (currentTime + 160);
    
    if (isExpired) {
      console.log(`Token expiré: exp=${payload.exp}, current=${currentTime}`);
    }
    
    return isExpired;
  } catch (error) {
    console.error('Erreur lors de la vérification du token:', error);
    // En cas d'erreur de parsing, considérer le token comme invalide
    return true;
  }
};

/**
 * Récupérer toutes les missions avec leurs ordres de mission
 */
export const getMissions = async () => {
  try {
    const response = await authenticatedFetch(`${API_BASE_URL}/missions`);
    const data = await response.json();
    
    return {
      success: true,
      data: data,
      error: null
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des missions:', error);
    return {
      success: false,
      data: [],
      error: error.message
    };
  }
};

/**
 * Récupérer une mission spécifique par ID
 */
export const getMissionById = async (missionId) => {
  try {
    const response = await authenticatedFetch(`${API_BASE_URL}/missions/${missionId}`);
    const data = await response.json();
    
    return {
      success: true,
      data: data,
      error: null
    };
  } catch (error) {
    console.error(`Erreur lors de la récupération de la mission ${missionId}:`, error);
    return {
      success: false,
      data: null,
      error: error.message
    };
  }
};

/**
 * Récupérer les ordres de mission pour une mission spécifique
 */
export const getOrdresMissionByMissionId = async (missionId) => {
  try {
    const response = await authenticatedFetch(`${API_BASE_URL}/missions/${missionId}/ordres`);
    const data = await response.json();
    
    return {
      success: true,
      data: data,
      error: null
    };
  } catch (error) {
    console.error(`Erreur lors de la récupération des ordres pour la mission ${missionId}:`, error);
    return {
      success: false,
      data: [],
      error: error.message
    };
  }
};

/**
 * Récupérer tous les ordres de mission de l'utilisateur connecté
 */
export const getMyOrdresMission = async () => {
  try {
    console.log('📡 Appel API: getMyOrdresMission');
    const response = await authenticatedFetch(`${API_BASE_URL}/mission/order/`);
    const data = await response.json();
    
    console.log('✅ Données reçues:', data);
    
    return {
      success: true,
      data: data,
      error: null
    };
  } catch (error) {
    console.error('❌ Erreur lors de la récupération de mes ordres de mission:', error);
    return {
      success: false,
      data: [],
      error: error.message
    };
  }
};
export const createReport = async ( reportData) => {
  try{
    const response = await authenticatedFetch(`${API_BASE_URL}/mission/rapport/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('auth_access_token')}`
      },
        body: JSON.stringify(reportData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erreur lors de la création du rapport');
    }
    
    const data = await response.json();
    
    return {
      success: true,
      data: data,
      error: null
    };
  }
  catch (error) {
    console.error('Erreur lors de la création du rapport:', error);
    return {
      success: false,
      data: null,
      error: error.message
    };
  }

}

/**
 * Créer une nouvelle mission
 */
export const createMission = async (missionData) => {
  try {
    const response = await authenticatedFetch(`${API_BASE_URL}/missions`, {
      method: 'POST',
      body: JSON.stringify(missionData)
    });
    
    const data = await response.json();
    
    return {
      success: true,
      data: data,
      error: null
    };
  } catch (error) {
    console.error('Erreur lors de la création de la mission:', error);
    return {
      success: false,
      data: null,
      error: error.message
    };
  }
};

/**
 * Mettre à jour une mission
 */
export const updateMission = async (missionId, missionData) => {
  try {
    const response = await authenticatedFetch(`${API_BASE_URL}/missions/${missionId}`, {
      method: 'PUT',
      body: JSON.stringify(missionData)
    });
    
    const data = await response.json();
    
    return {
      success: true,
      data: data,
      error: null
    };
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de la mission ${missionId}:`, error);
    return {
      success: false,
      data: null,
      error: error.message
    };
  }
};

/**
 * Supprimer une mission
 */
export const deleteMission = async (missionId) => {
  try {
    const response = await authenticatedFetch(`${API_BASE_URL}/missions/${missionId}`, {
      method: 'DELETE'
    });
    
    return {
      success: true,
      data: null,
      error: null
    };
  } catch (error) {
    console.error(`Erreur lors de la suppression de la mission ${missionId}:`, error);
    return {
      success: false,
      data: null,
      error: error.message
    };
  }
};

export const getSampleMissions = () => [
  {
    id: "01e066a3-e35f-403a-bd8d-23d0f0b948a3",
    type: "FORMATION",
    destination: "Paris",
    details: "Formation sur les nouvelles méthodes de développement",
    pays: "France",
    ville: "Paris",
    budgetPrevu: 3500,
    createdAt: "2024-05-01T14:30:00Z",
    updatedAt: "2024-05-02T10:15:00Z",
    ordres_mission: [
      {
        id: "660e8400-e29b-41d4-a716-446655440001",
        dateDebut: "2024-06-15",
        dateFin: "2024-06-20",
        etat: "OUVERTE",
        createdAt: "2024-05-01T14:30:00Z",
        updatedAt: "2024-05-02T10:15:00Z",
        user_id: "770e8400-e29b-41d4-a716-446655440002",
        mission_id: "550e8400-e29b-41d4-a716-446655440000"
      }
    ]
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    type: "CONFERENCE",
    destination: "New York",
    details: "Conférence sur l'intelligence artificielle",
    pays: "États-Unis",
    ville: "New York",
    budgetPrevu: 7200,
    createdAt: "2024-04-25T09:45:00Z",
    updatedAt: "2024-04-26T16:20:00Z",
    ordres_mission: [
      {
        id: "660e8400-e29b-41d4-a716-446655440004",
        dateDebut: "2024-05-20",
        dateFin: "2024-05-25",
        etat: "TERMINEE",
        createdAt: "2024-04-25T09:45:00Z",
        updatedAt: "2024-05-26T10:15:00Z",
        user_id: "770e8400-e29b-41d4-a716-446655440002",
        mission_id: "550e8400-e29b-41d4-a716-446655440003"
      }
    ]
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    type: "REUNION",
    destination: "Berlin",
    details: "Réunion avec les partenaires européens",
    pays: "Allemagne",
    ville: "Berlin",
    budgetPrevu: 2000,
    createdAt: "2024-05-05T11:30:00Z",
    updatedAt: "2024-05-05T14:45:00Z",
    ordres_mission: [
      {
        id: "660e8400-e29b-41d4-a716-446655440006",
        dateDebut: "2024-05-15",
        dateFin: "2024-05-17",
        etat: "EN_COURS",
        createdAt: "2024-05-05T11:30:00Z",
        updatedAt: "2024-05-15T08:30:00Z",
        user_id: "770e8400-e29b-41d4-a716-446655440007",
        mission_id: "550e8400-e29b-41d4-a716-446655440005"
      }
    ]
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440008",
    type: "AUTRE",
    destination: "Tokyo",
    details: "Visite d'étude des méthodes de gestion japonaises",
    pays: "Japon",
    ville: "Tokyo",
    budgetPrevu: 6500,
    createdAt: "2024-03-15T08:20:00Z",
    updatedAt: "2024-03-16T09:10:00Z",
    ordres_mission: [
      {
        id: "660e8400-e29b-41d4-a716-446655440009",
        dateDebut: "2024-07-01",
        dateFin: "2024-07-10",
        etat: "OUVERTE",
        createdAt: "2024-03-15T08:20:00Z",
        updatedAt: "2024-03-16T09:10:00Z",
        user_id: "770e8400-e29b-41d4-a716-446655440010",
        mission_id: "550e8400-e29b-41d4-a716-446655440008"
      }
    ]
  },
  {
    id: "528af3aa4-99f2-470f-8817-74401b3d9123",
    type: "FORMATION",
    destination: "Casablanca",
    details: "Formation sur les normes ISO 9001",
    pays: "Maroc",
    ville: "Casablanca",
    budgetPrevu: 1800,
    createdAt: "2024-05-08T13:45:00Z",
    updatedAt: "2024-05-09T10:30:00Z",
    ordres_mission: [
      {
        id: "660e8400-e29b-41d4-a716-446655440012",
        dateDebut: "2024-05-25",
        dateFin: "2024-05-28",
        etat: "OUVERTE",
        createdAt: "2024-05-08T13:45:00Z",
        updatedAt: "2024-05-09T10:30:00Z",
        user_id: "770e8400-e29b-41d4-a716-446655440013",
        mission_id: "550e8400-e29b-41d4-a716-446655440011"
      }
    ]
  }
];