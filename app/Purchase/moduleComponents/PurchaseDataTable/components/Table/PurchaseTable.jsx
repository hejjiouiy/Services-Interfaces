import React from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

const PurchaseTable = ({ 
  requests, 
  sortField, 
  sortDirection, 
  onSort, 
  onView, 
  onEdit, 
  onDelete,
  showEdit = true,
  showDelete = true
}) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="min-w-full">
        <TableHeader 
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={onSort}
        />
        <TableBody 
          requests={requests}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          showEdit={showEdit}
          showDelete={showDelete}
        />
      </table>
    </div>
  );
};

export default PurchaseTable;