'use client'
import React, { useState } from 'react';

const samplePurchases = [  {    id: "550e8400-e29b-41d4-a716-446655440000",    typeDemande: "DEMANDE_ACHAT",    priorite: "URGENT",    dateDemande: "2024-05-01T14:30:00Z",    dateBesoin: "2024-06-10",    etatValidation: "SOUMISE",    user_id: "770e8400-e29b-41d4-a716-446655440002",    budget_line: "IT Department - Equipment",    details: "Équipement informatique pour le nouveau département",    totalEstimated: 8500,    updatedAt: "2024-05-02T10:15:00Z",    materials: [      {        id: "660e8400-e29b-41d4-a716-446655440001",        designation: "Laptop Dell XPS 15",        description: "Ordinateur portable haute performance",        prix_unitaire_estime: 1500,        quantite: 4      },      {        id: "660e8400-e29b-41d4-a716-446655440002",        designation: "Écran 27 pouces",        description: "Écran de bureau haute résolution",        prix_unitaire_estime: 350,        quantite: 4      }    ]  },  {    id: "550e8400-e29b-41d4-a716-446655440003",    typeDemande: "DEMANDE_ACHAT",    priorite: "NORMAL",    dateDemande: "2024-04-25T09:45:00Z",    dateBesoin: "2024-05-15",    etatValidation: "VALIDEE",    user_id: "770e8400-e29b-41d4-a716-446655440002",    budget_line: "Office Supplies",    details: "Fournitures de bureau pour le trimestre",    totalEstimated: 1200,    updatedAt: "2024-04-26T16:20:00Z",    materials: [      {        id: "660e8400-e29b-41d4-a716-446655440004",        designation: "Papier A4",        description: "Cartons de papier pour imprimante",        prix_unitaire_estime: 25,        quantite: 20      },      {        id: "660e8400-e29b-41d4-a716-446655440005",        designation: "Stylos",        description: "Boîtes de stylos",        prix_unitaire_estime: 15,        quantite: 30      }    ]  },  {    id: "550e8400-e29b-41d4-a716-446655440006",    typeDemande: "DEMANDE_SERVICE",    priorite: "BASSE",    dateDemande: "2024-05-05T11:30:00Z",    dateBesoin: "2024-06-20",    etatValidation: "SOUMISE",    user_id: "770e8400-e29b-41d4-a716-446655440007",    budget_line: "IT Department - Services",    details: "Maintenance du système de sécurité",    totalEstimated: 3000,    updatedAt: "2024-05-05T14:45:00Z",    materials: [      {        id: "660e8400-e29b-41d4-a716-446655440006",        designation: "Service de maintenance",        description: "Contrat de maintenance annuel",        prix_unitaire_estime: 3000,        quantite: 1      }    ]  },  {    id: "550e8400-e29b-41d4-a716-446655440008",    typeDemande: "DEMANDE_ACHAT",    priorite: "URGENT",    dateDemande: "2024-03-15T08:20:00Z",    dateBesoin: "2024-04-01",    etatValidation: "REJETEE",    user_id: "770e8400-e29b-41d4-a716-446655440010",    budget_line: "Laboratory Resources",    details: "Équipement de laboratoire",    totalEstimated: 12500,    updatedAt: "2024-03-16T09:10:00Z",    materials: [      {        id: "660e8400-e29b-41d4-a716-446655440009",        designation: "Microscope électronique",        description: "Microscope pour analyse de haute précision",        prix_unitaire_estime: 10000,        quantite: 1      },      {        id: "660e8400-e29b-41d4-a716-446655440010",        designation: "Verrerie de laboratoire",        description: "Lot de verrerie pour expériences",        prix_unitaire_estime: 2500,        quantite: 1      }    ]  },  {    id: "550e8400-e29b-41d4-a716-446655440011",    typeDemande: "DEMANDE_ACHAT",    priorite: "NORMAL",    dateDemande: "2024-05-08T13:45:00Z",    dateBesoin: "2024-05-25",    etatValidation: "VALIDEE",    user_id: "770e8400-e29b-41d4-a716-446655440013",    budget_line: "Staff Development",    details: "Livres et matériel de formation",    totalEstimated: 750,    updatedAt: "2024-05-09T10:30:00Z",    materials: [      {        id: "660e8400-e29b-41d4-a716-446655440012",        designation: "Manuels techniques",        description: "Collection de livres pour formation",        prix_unitaire_estime: 50,        quantite: 15      }    ]  }];


const PurchaseDataTable = () => {
  // Use the new sample data
  const [requests, setRequests] = useState(samplePurchases);

  // State for filters
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  // Adjusted default sort field to match new data
  const [sortField, setSortField] = useState('dateDemande');
  const [sortDirection, setSortDirection] = useState('desc');

  // État pour les dialogs
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [editFormData, setEditFormData] = useState(null);

  // Handle sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Fonction pour ouvrir la boîte de dialogue de visualisation
  const openViewDialog = (request) => {
    setSelectedRequest(request);
    setViewDialogOpen(true);
  };

  // Fonction pour ouvrir la boîte de dialogue de modification
  const openEditDialog = (request) => {
    setSelectedRequest(request);
    // Copie profonde pour éviter les références directes
    setEditFormData(JSON.parse(JSON.stringify(request)));
    setEditDialogOpen(true);
  };

  // Fonction pour ouvrir la boîte de dialogue de suppression
  const openDeleteDialog = (request) => {
    setSelectedRequest(request);
    setDeleteDialogOpen(true);
  };

  // Fermer toutes les boîtes de dialogue
  const closeAllDialogs = () => {
    setViewDialogOpen(false);
    setEditDialogOpen(false);
    setDeleteDialogOpen(false);
    setSelectedRequest(null);
    setEditFormData(null);
  };

  // Gérer les changements de champs dans le formulaire d'édition
  const handleEditFormChange = (field, value) => {
    setEditFormData({
      ...editFormData,
      [field]: value
    });
  };

  // Gérer les changements dans les matériaux
  const handleMaterialChange = (materialIndex, field, value) => {
    const updatedMaterials = [...editFormData.materials];
    updatedMaterials[materialIndex] = {
      ...updatedMaterials[materialIndex],
      [field]: field === 'prix_unitaire_estime' || field === 'quantite' ? Number(value) : value
    };
    
    setEditFormData({
      ...editFormData,
      materials: updatedMaterials
    });
  };

  // Sauvegarder les modifications
  const saveEdit = () => {
    // Calculer le nouveau total estimé
    const newTotal = editFormData.materials.reduce(
      (sum, material) => sum + (material.prix_unitaire_estime * material.quantite), 0
    );
    
    const updatedRequest = {
      ...editFormData,
      totalEstimated: newTotal,
      updatedAt: new Date().toISOString()
    };
    
    // Mettre à jour la liste des demandes
    const updatedRequests = requests.map(req => 
      req.id === updatedRequest.id ? updatedRequest : req
    );
    
    setRequests(updatedRequests);
    closeAllDialogs();
  };

  // Supprimer une demande
  const confirmDelete = () => {
    const updatedRequests = requests.filter(req => req.id !== selectedRequest.id);
    setRequests(updatedRequests);
    closeAllDialogs();
  };

  // Apply filters and sorting
  const filteredRequests = requests
    .filter(request => {
      // Apply status filter using etatValidation
      if (statusFilter !== 'All' && request.etatValidation !== statusFilter) {
        return false;
      }

      // Apply search filter using id, typeDemande, and budget_line
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          request.id.toLowerCase().includes(query) ||
          request.typeDemande.toLowerCase().includes(query) ||
          request.budget_line.toLowerCase().includes(query) ||
          request.details.toLowerCase().includes(query) // Also include details in search
        );
      }

      return true;
    })
    .sort((a, b) => {
      // Handle sorting based on the new fields
      const aValue = a[sortField];
      const bValue = b[sortField];

      // Convert date strings to Date objects for accurate sorting
      if (sortField === 'dateDemande' || sortField === 'dateBesoin') {
          const dateA = new Date(aValue);
          const dateB = new Date(bValue);
          if (dateA < dateB) {
              return sortDirection === 'asc' ? -1 : 1;
          }
          if (dateA > dateB) {
              return sortDirection === 'asc' ? 1 : -1;
          }
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
          // Sort numbers directly
          if (aValue < bValue) {
              return sortDirection === 'asc' ? -1 : 1;
          }
          if (aValue > bValue) {
              return sortDirection === 'asc' ? 1 : -1;
          }
      } else if (typeof aValue === 'string' && typeof bValue === 'string') {
           // Case-insensitive string sorting
            const comparison = aValue.localeCompare(bValue);
            return sortDirection === 'asc' ? comparison : -comparison;
      }

      return 0;
    });

  // Function to get status badge class (adapted for new statuses)
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'VALIDEE':
        return 'bg-green-100 text-green-800';
      case 'SOUMISE':
        return 'bg-yellow-100 text-yellow-800';
       case 'BROUILLON': // Assuming a 'Draft' equivalent might exist or be added
         return 'bg-gray-100 text-gray-800';
      case 'REJETEE':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to get priority badge class (adapted for new priorities)
  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 'URGENT':
        return 'bg-red-100 text-red-800';
      case 'HAUTE': // Assuming HAUTE might be used
      case 'HIGH':
        return 'bg-orange-100 text-orange-800';
      case 'NORMAL': // Assuming NORMAL replaces Medium
        return 'bg-blue-100 text-blue-800';
      case 'BASSE': // Assuming BASSE replaces Low
      case 'LOW':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to format date strings (optional, but good for display)
  const formatDate = (dateString) => {
      if (!dateString) return '';
      try {
          // Attempt to parse ISO 8601 strings
          const date = new Date(dateString);
          // Check if the date is valid
          if (isNaN(date.getTime())) {
              // If invalid, try parsing as a simple date string
              const simpleDate = new Date(dateString + 'T00:00:00Z'); // Assume UTC for simple dates
               if (isNaN(simpleDate.getTime())) {
                 return dateString; // Return original if parsing fails
               }
               return simpleDate.toLocaleDateString(); // Format the date
          }
           return date.toLocaleDateString(); // Format the date
      } catch (error) {
          console.error("Failed to parse date:", dateString, error);
          return dateString; // Return original if parsing throws error
      }
  };


  return (
    <div className="overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <div>
            <label htmlFor="status-filter" className="block text-sm font-medium text-darker-beige mb-1">Status</label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-green"
            >
              <option value="All">All Statuses</option>
               {/* Updated status options */}
              <option value="BROUILLON">Brouillon</option>
              <option value="SOUMISE">Soumise</option>
              <option value="VALIDEE">Validée</option>
               {/* Assuming 'In Progress' maps to something or is removed */}
              <option value="REJETEE">Rejetée</option>
            </select>
          </div>

          <div>
            <label htmlFor="search" className="block text-sm font-medium text-darker-beige mb-1">Search</label>
            <input
              id="search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ID, type, budget line, details..." // Updated placeholder
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-green w-64"
            />
          </div>
        </div>

        <button className="px-4 py-2 bg-main-green text-white rounded-md hover:bg-green-700 transition-colors">
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            New Request
          </span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
               {/* Updated table headers and sort fields */}
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('id')}
              >
                <div className="flex items-center">
                  ID
                  {sortField === 'id' && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
               <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('typeDemande')}
              >
                <div className="flex items-center">
                  Type
                  {sortField === 'typeDemande' && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('budget_line')}
              >
                <div className="flex items-center">
                  Budget Line
                  {sortField === 'budget_line' && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('dateDemande')}
              >
                <div className="flex items-center">
                  Date Demande
                  {sortField === 'dateDemande' && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('dateBesoin')}
              >
                <div className="flex items-center">
                  Date Besoin
                  {sortField === 'dateBesoin' && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('totalEstimated')}
              >
                <div className="flex items-center">
                  Total Estimated
                  {sortField === 'totalEstimated' && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('priorite')}
              >
                <div className="flex items-center">
                  Priorité
                  {sortField === 'priorite' && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('etatValidation')}
              >
                <div className="flex items-center">
                  État Validation
                  {sortField === 'etatValidation' && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRequests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-main-green">
                  {request.id.substring(0, 8)}... {/* Shorten long IDs */}
                </td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {request.typeDemande}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {request.budget_line}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(request.dateDemande)} {/* Format date */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(request.dateBesoin)} {/* Format date */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${request.totalEstimated.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityBadgeClass(request.priorite)}`}>
                    {request.priorite}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(request.etatValidation)}`}>
                    {request.etatValidation}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button 
                      className="text-main-green hover:text-green-700"
                      onClick={() => openViewDialog(request)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    {request.etatValidation !== 'VALIDEE' && request.etatValidation !== 'REJETEE' && (
                      <button 
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => openEditDialog(request)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    )}
                    {request.etatValidation !== 'VALIDEE' && request.etatValidation !== 'REJETEE' && (
                      <button 
                        className="text-red-600 hover:text-red-900"
                        onClick={() => openDeleteDialog(request)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredRequests.length === 0 && (
        <div className="text-center py-8 bg-white rounded-lg shadow mt-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No requests found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
        </div>
      )}

      {/* Basic Pagination - note that this only shows total counts, not functional pagination */}
      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">{filteredRequests.length}</span> of <span className="font-medium">{requests.length}</span> requests
        </div>

        <div className="flex space-x-2">
          {/* These buttons are non-functional placeholders for pagination */}
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50 cursor-not-allowed opacity-50" disabled>
            Previous
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50 cursor-not-allowed opacity-50" disabled>
            Next
          </button>
        </div>
      </div>

      {/* Boîte de dialogue d'affichage détaillée */}
      {viewDialogOpen && selectedRequest && (
        <div className="fixed inset-0 bg-black/65 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center border-b pb-3 mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Détails de la demande</h2>
                <button onClick={closeAllDialogs} className="text-gray-500 hover:text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">ID</p>
                  <p className="font-medium">{selectedRequest.budget_line}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Date de demande</p>
                  <p className="font-medium">{formatDate(selectedRequest.dateDemande)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Date de besoin</p>
                  <p className="font-medium">{formatDate(selectedRequest.dateBesoin)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">État de validation</p>
                  <p>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(selectedRequest.etatValidation)}`}>
                      {selectedRequest.etatValidation}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Priorité</p>
                  <p>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityBadgeClass(selectedRequest.priorite)}`}>
                      {selectedRequest.priorite}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total estimé</p>
                  <p className="font-medium">${selectedRequest.totalEstimated.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">ID Utilisateur</p>
                  <p className="font-medium">{selectedRequest.user_id}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500 mb-1">Détails</p>
                  <p className="font-medium">{selectedRequest.details}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500 mb-1">Dernière mise à jour</p>
                  <p className="font-medium">{formatDate(selectedRequest.updatedAt)}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-3">Matériaux</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Désignation</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix unitaire</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantité</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedRequest.materials.map((material) => (
                        <tr key={material.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{material.designation}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{material.description}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${material.prix_unitaire_estime.toFixed(2)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{material.quantite}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${(material.prix_unitaire_estime * material.quantite).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4 border-t">
                {selectedRequest.etatValidation !== 'VALIDEE' && selectedRequest.etatValidation !== 'REJETEE' && (
                  <button 
                    onClick={() => {
                      closeAllDialogs();
                      openEditDialog(selectedRequest);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Modifier
                  </button>
                )}
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
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center border-b pb-3 mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Modifier la demande</h2>
                <button onClick={closeAllDialogs} className="text-gray-500 hover:text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ID</label>
                  <input 
                    type="text" 
                    value={editFormData.id} 
                    disabled 
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type de demande</label>
                  <select 
                    value={editFormData.typeDemande} 
                    onChange={(e) => handleEditFormChange('typeDemande', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-green"
                  >
                    <option value="DEMANDE_ACHAT">DEMANDE_ACHAT</option>
                    <option value="DEMANDE_SERVICE">DEMANDE_SERVICE</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ligne budgétaire</label>
                  <input 
                    type="text" 
                    value={editFormData.budget_line} 
                    onChange={(e) => handleEditFormChange('budget_line', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-green"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date de besoin</label>
                  <input 
                    type="date" 
                    value={editFormData.dateBesoin.split('T')[0]} 
                    onChange={(e) => handleEditFormChange('dateBesoin', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-green"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priorité</label>
                  <select 
                    value={editFormData.priorite} 
                    onChange={(e) => handleEditFormChange('priorite', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-green"
                  >
                    <option value="URGENT">URGENT</option>
                    <option value="HAUTE">HAUTE</option>
                    <option value="NORMAL">NORMAL</option>
                    <option value="BASSE">BASSE</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Détails</label>
                  <textarea 
                    value={editFormData.details} 
                    onChange={(e) => handleEditFormChange('details', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-green h-24"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-3">Matériaux</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Désignation</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix unitaire</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantité</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {editFormData.materials.map((material, index) => (
                        <tr key={material.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input 
                              type="text" 
                              value={material.designation} 
                              onChange={(e) => handleMaterialChange(index, 'designation', e.target.value)}
                              className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-main-green"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input 
                              type="text" 
                              value={material.description} 
                              onChange={(e) => handleMaterialChange(index, 'description', e.target.value)}
                              className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-main-green"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input 
                              type="number" 
                              value={material.prix_unitaire_estime} 
                              onChange={(e) => handleMaterialChange(index, 'prix_unitaire_estime', e.target.value)}
                              className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-main-green"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input 
                              type="number" 
                              value={material.quantite} 
                              onChange={(e) => handleMaterialChange(index, 'quantite', e.target.value)}
                              className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-main-green"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ${(material.prix_unitaire_estime * material.quantite).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
      {deleteDialogOpen && selectedRequest && (
        <div className="fixed inset-0 bg-black/65 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
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
                Êtes-vous sûr de vouloir supprimer cette demande ? Cette action ne peut pas être annulée.
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
    </div>
  );
};

export default PurchaseDataTable;
                