import React from 'react';
import StatusBadge from '../Badges/StatusBadge';
import PriorityBadge from '../Badges/PriorityBadge';
import ActionButtons from '../ActionButtons';
import { formatDate, formatAmount, truncateId } from '../../utils/formatters';

const TableRow = ({ 
  request, 
  onView, 
  onEdit, 
  onDelete,
  showEdit = true,
  showDelete = true
}) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-main-green">
        {truncateId(request.id)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {request.typeDemande}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {request.budget_line}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {formatDate(request.dateDemande)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {formatDate(request.dateBesoin)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {formatAmount(request.totalEstimated)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <PriorityBadge priority={request.priorite} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <StatusBadge status={request.etatValidation} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <ActionButtons
          request={request}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          showEdit={showEdit}
          showDelete={showDelete}
        />
      </td>
    </tr>
  );
};

export default TableRow;