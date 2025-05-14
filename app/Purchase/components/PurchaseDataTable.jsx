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

  // Handle sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
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
                    <button className="text-main-green hover:text-green-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    {request.etatValidation !== 'VALIDEE' && request.etatValidation !== 'REJETEE' && ( // Assuming editable if not validated or rejected
                      <button className="text-blue-600 hover:text-blue-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    )}
                    {request.etatValidation !== 'VALIDEE' && request.etatValidation !== 'REJETEE' && (
                      <button className="text-red-600 hover:text-red-900">
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
    </div>
  );
};

export default PurchaseDataTable;