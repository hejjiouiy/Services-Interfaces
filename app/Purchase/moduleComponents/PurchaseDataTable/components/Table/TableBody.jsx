import React from 'react';
import TableRow from './TableRow';

const TableBody = ({ 
  requests, 
  onView, 
  onEdit, 
  onDelete,
  showEdit = true,
  showDelete = true
}) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {requests.map((request) => (
        <TableRow
          key={request.id}
          request={request}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          showEdit={showEdit}
          showDelete={showDelete}
        />
      ))}
    </tbody>
  );
};

export default TableBody;