'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

// Pour les données d'exemple (dans une application réelle, ces données viendraient d'une API)
const sampleMissions = [
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
  OUVERTE: "bg-blue-100 text-blue-800",
  EN_COURS: "bg-yellow-100 text-yellow-800",
  TERMINEE: "bg-green-100 text-green-800",
  ANNULEE: "bg-red-100 text-red-800"
};

// Icônes pour les types de mission
const typeIcons = {
  FORMATION: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  CONFERENCE: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  REUNION: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  AUTRE: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
    </svg>
  )
};

const MissionsDataTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [missions, setMissions] = useState(sampleMissions);
  
  // États pour les dialogues
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [downloadDialogOpen, setDownloadDialogOpen] = useState(false);
  const [selectedMission, setSelectedMission] = useState(null);
  const [editFormData, setEditFormData] = useState(null);
  
  // Références pour fermer les dialogues en cliquant à l'extérieur
  const viewDialogRef = useRef(null);
  const editDialogRef = useRef(null);
  const deleteDialogRef = useRef(null);
  const downloadDialogRef = useRef(null);

  // Gestionnaires pour les dialogues
  const openViewDialog = (mission) => {
    setSelectedMission(mission);
    setViewDialogOpen(true);
  };
  
  const openEditDialog = (mission) => {
    setSelectedMission(mission);
    // Copie profonde pour éviter les modifications directes
    setEditFormData(JSON.parse(JSON.stringify(mission)));
    setEditDialogOpen(true);
  };
  
  const openDeleteDialog = (mission) => {
    setSelectedMission(mission);
    setDeleteDialogOpen(true);
  };
  
  const openDownloadDialog = (mission) => {
    setSelectedMission(mission);
    setDownloadDialogOpen(true);
  };
  
  const closeAllDialogs = () => {
    setViewDialogOpen(false);
    setEditDialogOpen(false);
    setDeleteDialogOpen(false);
    setDownloadDialogOpen(false);
    setSelectedMission(null);
    setEditFormData(null);
  };
  
  // Gestionnaire de changements du formulaire d'édition
  const handleEditFormChange = (field, value) => {
    setEditFormData({
      ...editFormData,
      [field]: value
    });
  };
  
  // Gestionnaire pour les modifications de l'ordre de mission
  const handleOrderChange = (field, value) => {
    if (editFormData.ordres_mission && editFormData.ordres_mission.length > 0) {
      const updatedOrders = [...editFormData.ordres_mission];
      updatedOrders[0] = {
        ...updatedOrders[0],
        [field]: value
      };
      
      setEditFormData({
        ...editFormData,
        ordres_mission: updatedOrders
      });
    }
  };
  
  // Sauvegarder les modifications
  const saveEdit = () => {
    const updatedMissions = missions.map(mission => 
      mission.id === editFormData.id ? editFormData : mission
    );
    
    setMissions(updatedMissions);
    closeAllDialogs();
  };
  
  // Confirmer la suppression
  const confirmDelete = () => {
    const updatedMissions = missions.filter(mission => mission.id !== selectedMission.id);
    setMissions(updatedMissions);
    closeAllDialogs();
  };
  
  // Télécharger le rapport (simulation)
const downloadReport = async () => {
  try {
    // Afficher un message de début de téléchargement
    alert(`Téléchargement du rapport pour la mission ${selectedMission.id} initié.`);
    
    // Récupérer le rapport depuis l'API
    const response = await fetch(`http://127.0.0.1:8051/rapport/download/${selectedMission.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    // Récupérer le blob du fichier
    const blob = await response.blob();

    // Créer une URL pour le blob
    const url = window.URL.createObjectURL(blob);

    // Ouvrir le fichier dans un nouvel onglet
    window.open(url, '_blank');

    // Facultatif : nettoyer l'URL après un certain temps (pour éviter les fuites mémoire)
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
    }, 1000 * 60); // nettoie après 1 minute

    closeAllDialogs();
    
  } catch (error) {
    console.error('Erreur lors de l’ouverture du rapport:', error);
    alert('Erreur lors de l’ouverture du rapport. Veuillez réessayer.');
  }
};


  // Fermer le dialogue si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (viewDialogRef.current && !viewDialogRef.current.contains(event.target)) {
        setViewDialogOpen(false);
      }
      if (editDialogRef.current && !editDialogRef.current.contains(event.target)) {
        setEditDialogOpen(false);
      }
      if (deleteDialogRef.current && !deleteDialogRef.current.contains(event.target)) {
        setDeleteDialogOpen(false);
      }
      if (downloadDialogRef.current && !downloadDialogRef.current.contains(event.target)) {
        setDownloadDialogOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filtrage des missions
  const filteredMissions = missions.filter(mission => {
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

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMissions = sortedMissions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedMissions.length / itemsPerPage);

  // Gestionnaire de tri
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Obtenir l'icône de tri
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    
    return sortConfig.direction === 'asc' ? (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-main-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-main-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
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
      
      {/* Tableau */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('type')}
              >
                <div className="flex items-center">
                  Type
                  {getSortIcon('type')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('destination')}
              >
                <div className="flex items-center">
                  Destination
                  {getSortIcon('destination')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('dateDebut')}
              >
                <div className="flex items-center">
                  Période
                  {getSortIcon('dateDebut')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('budgetPrevu')}
              >
                <div className="flex items-center">
                  Budget
                  {getSortIcon('budgetPrevu')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              >
                <div className="flex items-center">
                  Statut
                  {getSortIcon('etat')}
                </div>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentMissions.map((mission) => {
              const order = mission.ordres_mission && mission.ordres_mission.length > 0 
                ? mission.ordres_mission[0] 
                : null;
                
              const status = order ? order.etat : 'OUVERTE';
              const statusColor = statusColors[status] || "bg-gray-100 text-gray-800";
              
              return (
                <tr key={mission.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-main-green/10 rounded-full flex items-center justify-center text-main-green">
                        {typeIcons[mission.type]}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{mission.type}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{mission.destination}</div>
                    <div className="text-sm text-gray-500">{mission.ville}, {mission.pays}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order ? (
                      <div className="text-sm text-gray-900">
                        {formatDate(order.dateDebut)} - {formatDate(order.dateFin)}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">Non planifiée</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatAmount(mission.budgetPrevu)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor}`}>
                      {status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={() => openViewDialog(mission)}
                        className="text-main-green hover:text-main-green/80"
                      >
                        <span className="sr-only">Voir</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => openEditDialog(mission)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <span className="sr-only">Modifier</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => openDeleteDialog(mission)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <span className="sr-only">Supprimer</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => openDownloadDialog(mission)}
                        className="text-purple-600 hover:text-purple-800"
                      >
                        <span className="sr-only">Télécharger</span>
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 3V16M12 16L16 11.625M12 16L8 11.625" stroke="#5b2eff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M15 21H9C6.17157 21 4.75736 21 3.87868 20.1213C3 19.2426 3 17.8284 3 15M21 15C21 17.8284 21 19.2426 20.1213 20.1213C19.8215 20.4211 19.4594 20.6186 19 20.7487" stroke="#5b2eff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            
            {currentMissions.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  Aucune mission ne correspond à vos critères.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {sortedMissions.length > 0 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-500">
            Affichage de {indexOfFirstItem + 1} à {Math.min(indexOfLastItem, sortedMissions.length)} sur {sortedMissions.length} missions
          </div>
          <div className="flex space-x-1">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md ${
                currentPage === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-main-green hover:bg-main-green/10'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === page
                    ? 'bg-main-green text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md ${
                currentPage === totalPages
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-main-green hover:bg-main-green/10'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Boîte de dialogue d'affichage détaillée */}
      {viewDialogOpen && selectedMission && (
        <div className="fixed inset-0 bg-black/65 flex items-center justify-center p-4 z-50">
          <div ref={viewDialogRef} className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center border-b pb-3 mb-6">
                <h2 className="text-xl font-semibold text-main-green">Détails de la mission</h2>
                <button onClick={closeAllDialogs} className="text-gray-500 hover:text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="h-16 w-16 bg-main-green/10 rounded-full flex items-center justify-center text-main-green mr-4">
                    {typeIcons[selectedMission.type]}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{selectedMission.type}</h3>
                    <p className="text-gray-600">{selectedMission.destination} - {selectedMission.ville}, {selectedMission.pays}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Budget prévu</p>
                    <p className="font-medium">{formatAmount(selectedMission.budgetPrevu)}</p>
                  </div>
                  
                  {selectedMission.ordres_mission && selectedMission.ordres_mission.length > 0 && (
                    <>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Période</p>
                        <p className="font-medium">
                          {formatDate(selectedMission.ordres_mission[0].dateDebut)} - {formatDate(selectedMission.ordres_mission[0].dateFin)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Statut</p>
                        <p>
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[selectedMission.ordres_mission[0].etat]}`}>
                            {selectedMission.ordres_mission[0].etat}
                          </span>
                        </p>
                      </div>
                    </>
                  )}
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Date de création</p>
                    <p className="font-medium">{formatDate(selectedMission.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Dernière mise à jour</p>
                    <p className="font-medium">{formatDate(selectedMission.updatedAt)}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-1">Détails</p>
                  <p className="bg-gray-50 p-4 rounded-lg">{selectedMission.details}</p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={() => {
                    closeAllDialogs();
                    openEditDialog(selectedMission);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Modifier
                </button>
                <button 
                  onClick={() => {
                    closeAllDialogs();
                    openDownloadDialog(selectedMission);
                  }}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  Télécharger le rapport
                </button>
                <button 
                  onClick={closeAllDialogs}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Boîte de dialogue de modification */}
      {editDialogOpen && editFormData && (
        <div className="fixed inset-0 bg-black/65 flex items-center justify-center p-4 z-50">
          <div ref={editDialogRef} className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center border-b pb-3 mb-6">
                <h2 className="text-xl font-semibold text-main-green">Modifier la mission</h2>
                <button onClick={closeAllDialogs} className="text-gray-500 hover:text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select 
                    value={editFormData.type} 
                    onChange={(e) => handleEditFormChange('type', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-green"
                  >
                    <option value="FORMATION">FORMATION</option>
                    <option value="CONFERENCE">CONFERENCE</option>
                    <option value="REUNION">REUNION</option>
                    <option value="AUTRE">AUTRE</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                  <input 
                    type="text" 
                    value={editFormData.destination} 
                    onChange={(e) => handleEditFormChange('destination', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-green"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                  <input 
                    type="text" 
                    value={editFormData.ville} 
                    onChange={(e) => handleEditFormChange('ville', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-green"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pays</label>
                  <input 
                    type="text" 
                    value={editFormData.pays} 
                    onChange={(e) => handleEditFormChange('pays', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-green"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Budget prévu</label>
                  <input 
                    type="number" 
                    value={editFormData.budgetPrevu} 
                    onChange={(e) => handleEditFormChange('budgetPrevu', parseFloat(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-green"
                  />
                </div>
                
                {editFormData.ordres_mission && editFormData.ordres_mission.length > 0 && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
                      <input 
                        type="date" 
                        value={editFormData.ordres_mission[0].dateDebut.split('T')[0]} 
                        onChange={(e) => handleOrderChange('dateDebut', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-green"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date de fin</label>
                      <input 
                        type="date" 
                        value={editFormData.ordres_mission[0].dateFin.split('T')[0]} 
                        onChange={(e) => handleOrderChange('dateFin', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-green"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                      <select 
                        value={editFormData.ordres_mission[0].etat} 
                        onChange={(e) => handleOrderChange('etat', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-green"
                      >
                        <option value="OUVERTE">OUVERTE</option>
                        <option value="EN_COURS">EN_COURS</option>
                        <option value="TERMINEE">TERMINEE</option>
                        <option value="ANNULEE">ANNULEE</option>
                      </select>
                    </div>
                  </>
                )}
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Détails</label>
                  <textarea 
                    value={editFormData.details} 
                    onChange={(e) => handleEditFormChange('details', e.target.value)}
                    rows="4"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-green"
                  ></textarea>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={saveEdit}
                  className="px-4 py-2 bg-main-green text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Enregistrer
                </button>
                <button 
                  onClick={closeAllDialogs}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Boîte de dialogue de suppression */}
      {deleteDialogOpen && selectedMission && (
        <div className="fixed inset-0 bg-black/65 flex items-center justify-center p-4 z-50">
          <div ref={deleteDialogRef} className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-red-100 rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              </div>
              
              <h3 className="text-lg font-medium text-center text-gray-900 mb-2">Confirmer la suppression</h3>
              <p className="text-center text-gray-500 mb-6">
                Êtes-vous sûr de vouloir supprimer la mission "{selectedMission.type}" à {selectedMission.destination} ? Cette action ne peut pas être annulée.
              </p>
              
              <div className="flex justify-center space-x-3">
                <button 
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Supprimer
                </button>
                <button 
                  onClick={closeAllDialogs}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Boîte de dialogue de téléchargement */}
      {downloadDialogOpen && selectedMission && (
        <div className="fixed inset-0 bg-black/65 flex items-center justify-center p-4 z-50">
          <div ref={downloadDialogRef} className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-purple-100 rounded-full p-2">
                  <svg className="h-8 w-8 text-purple-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3V16M12 16L16 11.625M12 16L8 11.625" stroke="#5b2eff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M15 21H9C6.17157 21 4.75736 21 3.87868 20.1213C3 19.2426 3 17.8284 3 15M21 15C21 17.8284 21 19.2426 20.1213 20.1213C19.8215 20.4211 19.4594 20.6186 19 20.7487" stroke="#5b2eff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
              </div>
              
              <h3 className="text-lg font-medium text-center text-gray-900 mb-2">Télécharger le rapport</h3>
              <p className="text-center text-gray-500 mb-6">
                Vous êtes sur le point de télécharger le rapport de mission pour "{selectedMission.type}" à {selectedMission.destination}.
              </p>
              
              <div className="flex justify-center space-x-3">
                <button 
                  onClick={downloadReport}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  Télécharger
                </button>
                <button 
                  onClick={closeAllDialogs}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MissionsDataTable;