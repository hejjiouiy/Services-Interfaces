import React from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

const MissionsTable = ({ missions, sortConfig, onSort, onView, onEdit, onDelete, onDownload }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white rounded-lg overflow-hidden">
      <TableHeader sortConfig={sortConfig} onSort={onSort} />
      <TableBody
        missions={missions}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
        onDownload={onDownload}
      />
    </table>
  </div>
);
export default MissionsTable;