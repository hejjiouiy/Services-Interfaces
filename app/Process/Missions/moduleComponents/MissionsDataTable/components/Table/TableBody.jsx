import React from 'react';
import TableRow from './TableRow';

const TableBody = ({ missions, onView, onEdit, onDelete, onDownload }) => (
  <tbody className="divide-y divide-gray-200">
    {missions.map((mission) => (
      <TableRow
        key={mission.id}
        mission={mission}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
        onDownload={onDownload}
      />
    ))}
    
    {missions.length === 0 && (
      <tr>
        <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
          Aucune mission ne correspond à vos critères.
        </td>
      </tr>
    )}
  </tbody>
);
export default TableBody;