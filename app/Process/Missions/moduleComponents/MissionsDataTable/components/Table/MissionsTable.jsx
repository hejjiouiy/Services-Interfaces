import React from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

const MissionsTable = ({ 
  missions, 
  sortConfig, 
  onSort, 
  onView, 
  onEdit, 
  onDelete, 
  onDownload, 
  onUpdateStatus, 
  onUploadReport 
}) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <TableHeader sortConfig={sortConfig} onSort={onSort} />
      <TableBody
        missions={missions}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
        onDownload={onDownload}
        onUpdateStatus={onUpdateStatus}
        onUploadReport={onUploadReport}
      />
    </table>
  </div>
);

export default MissionsTable;