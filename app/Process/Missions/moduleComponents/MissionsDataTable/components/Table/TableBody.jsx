import React from 'react';
import TableRow from './TableRow';

const TableBody = ({ missions, onView, onEdit, onDelete, onDownload, onUpdateStatus, onUploadReport}) => {
  console.log('TableBody rendered with missions:', missions);
  return (
  <tbody className="divide-y divide-gray-200">
    {missions.map((mission) => (
      <TableRow
        key={mission.id}
        mission={mission}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
        onDownload={onDownload}
        onUpdateStatus={onUpdateStatus}
        onUploadReport={onUploadReport}
      />
    ))}
    
    {missions.length === 0 && (
      <tr>
        <td colSpan="7" className="px-6 py-12 text-center">
          <div className="flex flex-col items-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune mission trouvée</h3>
            <p className="mt-1 text-sm text-gray-500">
              Aucun ordre de mission ne correspond à vos critères de recherche.
            </p>
          </div>
        </td>
      </tr>
    )}
  </tbody>
);
}

export default TableBody;