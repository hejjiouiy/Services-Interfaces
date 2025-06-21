'use client';
import React, { useState, useMemo } from 'react';
import StatusBadge from './StatusBadge';
import RefusalModal from './RefusalModal';
import { ChevronUp, ChevronDown, Search, Plus, Eye, Edit2, Trash2, Download } from 'lucide-react';

const STATUSES = ['PENDING', 'UNDER_REVIEW', 'APPROVED', 'REJECTED'];

const RequestValidationTable = ({ data = [], columns = [], onAccept, onRefuse }) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedRefusalId, setSelectedRefusalId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filtered = useMemo(() => {
    let filteredData = [...data];

    if (search) {
      filteredData = filteredData.filter(row =>
        Object.values(row).some(val =>
          typeof val === 'string' && val.toLowerCase().includes(search.toLowerCase())
        )
      );
    }

    if (statusFilter !== 'ALL') {
      filteredData = filteredData.filter(row => row.status === statusFilter);
    }

    if (sortConfig.key) {
      filteredData.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        if (aVal === bVal) return 0;
        return sortConfig.direction === 'asc'
          ? aVal > bVal ? 1 : -1
          : aVal < bVal ? 1 : -1;
      });
    }

    return filteredData;
  }, [data, search, statusFilter, sortConfig]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? (
      <ChevronUp className="inline w-3 h-3 ml-1 text-gray-400" />
    ) : (
      <ChevronDown className="inline w-3 h-3 ml-1 text-gray-400" />
    );
  };

  const handleRefuseConfirm = (reason) => {
    if (selectedRefusalId) {
      onRefuse?.(selectedRefusalId, reason);
      setSelectedRefusalId(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      {/* Header avec titre et actions */}
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Mes Missions</h2>
            <p className="text-sm text-gray-500 mt-1">Request help with visa applications and processing</p>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors">
            <Plus className="w-4 h-4" />
            Nouvelle Mission
          </button>
        </div>
      </div>

      {/* Filtres */}
      <div className="px-6 py-4 border-b border-gray-50">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Rechercher une mission..."
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent min-w-[140px]"
          >
            <option value="ALL">Tous les statuts</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              {columns.map(col => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    {col.header}
                    {renderSortIcon(col.key)}
                  </div>
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {paginated.map((row, index) => (
              <tr key={row.id} className="hover:bg-gray-25 transition-colors">
                {columns.map(col => (
                  <td key={col.key} className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {typeof col.render === 'function'
                        ? col.render(row[col.key], row)
                        : row[col.key]}
                    </div>
                  </td>
                ))}
                <td className="px-6 py-4">
                  <StatusBadge status={row.status} />
                  {row.status === 'REJECTED' && row.refusalReason && (
                    <div className="text-xs text-red-500 italic mt-1">
                      {row.refusalReason}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-1">
                    {(row.status === 'PENDING' || row.status === 'UNDER_REVIEW') ? (
                      <>
                        <button
                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                          onClick={() => onAccept?.(row.id)}
                          title="Accepter"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                          title="Modifier"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          onClick={() => setSelectedRefusalId(row.id)}
                          title="Refuser"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1.5 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                          title="Télécharger"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <div className="flex items-center justify-center gap-1">
                        <button
                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                          title="Voir"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                          title="Modifier"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1.5 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                          title="Télécharger"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr>
                <td colSpan={columns.length + 2} className="px-6 py-12 text-center">
                  <div className="text-gray-500">
                    <div className="text-sm font-medium">Aucune donnée trouvée</div>
                    <div className="text-xs mt-1">Essayez de modifier vos critères de recherche</div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer avec pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              Affichage de {Math.min((currentPage - 1) * itemsPerPage + 1, filtered.length)} à{' '}
              {Math.min(currentPage * itemsPerPage, filtered.length)} sur {filtered.length} missions
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Précédent
              </button>
              <div className="flex gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 text-sm rounded-md transition-colors ${
                        currentPage === pageNum
                          ? 'bg-emerald-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Suivant
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Refusal modal */}
      {selectedRefusalId && (
        <RefusalModal
          onCancel={() => setSelectedRefusalId(null)}
          onValidate={handleRefuseConfirm}
        />
      )}
    </div>
  );
};

export default RequestValidationTable;