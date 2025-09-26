'use client';
import React, { useState } from 'react';
import Link from 'next/link';

// Pour les données d'exemple (dans une application réelle, ces données viendraient d'une API)
const sampleMissions = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
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
    id: "550e8400-e29b-41d4-a716-446655440011",
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

// Fonction utilitaire pour formater les dates
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

// Fonction utilitaire pour formater les montants
const formatAmount = (amount) => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'MAD' }).format(amount);
};

// Couleurs pour les états de mission
const statusColors = {
  OUVERTE: { bg: "bg-blue-100", text: "text-blue-800", icon: "bg-blue-200" },
  EN_COURS: { bg: "bg-yellow-100", text: "text-yellow-800", icon: "bg-yellow-200" },
  TERMINEE: { bg: "bg-green-100", text: "text-green-800", icon: "bg-green-200" },
  ANNULEE: { bg: "bg-red-100", text: "text-red-800", icon: "bg-red-200" }
};

// Icônes pour les types de mission
const typeIcons = {
  FORMATION: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  CONFERENCE: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  REUNION: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  AUTRE: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
    </svg>
  )
};

const MissionsCardView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });

  // Filtrage des missions
  const filteredMissions = sampleMissions.filter(mission => {
    const matchesSearch = 
      mission.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mission.ville.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mission.pays.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mission.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mission.details.toLowerCase().includes(searchQuery.toLowerCase());

      
    const matchesStatus = 
      statusFilter === 'ALL' || 
      (mission.ordres_mission && 
       mission.ordres_mission.length > 0 && 
       mission.ordres_mission[0].etat === statusFilter);
      
    return matchesSearch && matchesStatus;
  });

  // Tri des missions
  const sortedMissions = [...filteredMissions].sort((a, b) => {
    if (sortConfig.key === 'budgetPrevu') {
      return sortConfig.direction === 'asc' 
        ? a.budgetPrevu - b.budgetPrevu 
        : b.budgetPrevu - a.budgetPrevu;
    }
    
    if (sortConfig.key === 'dateDebut' || sortConfig.key === 'dateFin') {
      const dateA = a.ordres_mission && a.ordres_mission.length > 0 
        ? new Date(a.ordres_mission[0][sortConfig.key]) 
        : new Date(0);
      const dateB = b.ordres_mission && b.ordres_mission.length > 0 
        ? new Date(b.ordres_mission[0][sortConfig.key]) 
        : new Date(0);
      return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
    }
    
    if (sortConfig.key === 'createdAt' || sortConfig.key === 'updatedAt') {
      const dateA = new Date(a[sortConfig.key]);
      const dateB = new Date(b[sortConfig.key]);
      return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
    }
    
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Gestionnaire de tri
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-main-green mb-6">Mes Missions</h2>
      
      {/* Filtres et recherche */}
      <div className="flex flex-col md:flex-row justify-between mb-6 space-y-2 md:space-y-0">
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Rechercher une mission..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-green"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-green"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">Tous les statuts</option>
            <option value="OUVERTE">Ouvertes</option>
            <option value="EN_COURS">En cours</option>
            <option value="TERMINEE">Terminées</option>
            <option value="ANNULEE">Annulées</option>
          </select>
          
          <div className="flex space-x-2">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-green"
              value={`${sortConfig.key}-${sortConfig.direction}`}
              onChange={(e) => {
                const [key, direction] = e.target.value.split('-');
                setSortConfig({ key, direction });
              }}
            >
              <option value="createdAt-desc">Plus récentes</option>
              <option value="createdAt-asc">Plus anciennes</option>
              <option value="dateDebut-asc">Date de début (croissant)</option>
              <option value="dateDebut-desc">Date de début (décroissant)</option>
              <option value="budgetPrevu-desc">Budget (décroissant)</option>
              <option value="budgetPrevu-asc">Budget (croissant)</option>
              <option value="destination-asc">Destination (A-Z)</option>
              <option value="destination-desc">Destination (Z-A)</option>
            </select>
            
            <Link 
              href="/missions/new" 
              className="bg-main-green text-white px-4 py-2 rounded-lg hover:bg-darker-green focus:outline-none focus:ring-2 focus:ring-main-green focus:ring-offset-2"
            >
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Nouvelle Mission
              </span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Section d'informations */}
      {sortedMissions.length === 0 && (
        <div className="text-center py-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-700">Aucune mission trouvée</h3>
          <p className="mt-2 text-gray-500">Essayez de modifier vos critères de recherche ou créez une nouvelle mission.</p>
        </div>
      )}
      
      {/* Cartes de mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedMissions.map((mission) => {
          const order = mission.ordres_mission && mission.ordres_mission.length > 0 
            ? mission.ordres_mission[0] 
            : null;
            
          const status = order ? order.etat : 'OUVERTE';
          const statusStyle = statusColors[status] || { bg: "bg-gray-100", text: "text-gray-800", icon: "bg-gray-200" };
          
          return (
            <div 
              key={mission.id} 
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col"
            >
              {/* En-tête de carte avec type et statut */}
              <div className="flex items-center justify-between px-6 pt-6 pb-2">
                <div className="flex items-center">
                  
                  <div className={`rounded-full p-2 ${statusStyle.icon} ${statusStyle.text}`}>
                    {typeIcons[mission.type]}
                  </div>

                  <h3 className="ml-3 text-lg font-semibold text-gray-900">{mission.type}</h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}>
                  {status}
                </span>
              </div>
              
              {/* Corps de la carte */}
              <div className="px-6 py-4 flex-grow">
                <div className="text-lg font-semibold text-gray-900 mb-1">{mission.user?.prenom} {mission.user?.nom} test</div>
                <div className="text-lg font-semibold text-gray-900 mb-1">{mission.destination}</div>
                <div className="text-sm text-gray-600 mb-3">{mission.ville}, {mission.pays}</div>
                
                <p className="text-gray-700 mb-4 line-clamp-2 text-sm">{mission.details}</p>
                
                <div className="mt-4 space-y-2">
                  {order && (
                    <div className="flex items-center text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-700">
                        {formatDate(order.dateDebut)} - {formatDate(order.dateFin)}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium text-gray-900">{formatAmount(mission.budgetPrevu)}</span>
                  </div>
                </div>
              </div>
              
              {/* Pied de carte avec actions */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    Créée le {formatDate(mission.createdAt)}
                  </span>
                  <div className="flex space-x-2">
                    <Link 
                      href={`/missions/${mission.id}`} 
                      className="p-2 rounded-lg hover:bg-gray-200 text-main-green"
                      title="Voir les détails"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </Link>
                    <Link 
                      href={`/missions/${mission.id}/edit`}
                      className="p-2 rounded-lg hover:bg-gray-200 text-blue-600"
                      title="Modifier"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </Link>
                    <button 
                      className="p-2 rounded-lg hover:bg-gray-200 text-red-600"
                      onClick={() => alert(`Supprimer la mission ${mission.id}`)}
                      title="Supprimer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MissionsCardView;