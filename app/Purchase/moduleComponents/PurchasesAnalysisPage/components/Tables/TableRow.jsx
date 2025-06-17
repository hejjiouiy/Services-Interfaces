import React from 'react';
import StatusBadge from '../Common/StatusBadge';
import { formatDate, formatAmount } from '../../utils/formatters';

const TableRow = ({ purchase, index, type = "standard" }) => {
  const renderCells = () => {
    switch (type) {
      case "recent":
        return (
          <>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-main-green">
              {purchase.id.substring(0, 8)}...
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 truncate max-w-[200px]" title={purchase.budget_line}>
              {purchase.budget_line}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {purchase.typeDemande}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {formatDate(purchase.dateDemande)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {formatAmount(purchase.totalEstimated)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <StatusBadge status={purchase.etatValidation} />
            </td>
          </>
        );
      case "expensive":
        return (
          <>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-main-green">
              {purchase.id.substring(0, 8)}...
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 truncate max-w-[250px]" title={purchase.details}>
              {purchase.details}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-[200px]" title={purchase.budget_line}>
              {purchase.budget_line}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
              {formatAmount(purchase.totalEstimated)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <StatusBadge status={purchase.etatValidation} />
            </td>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <tr className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
      {renderCells()}
    </tr>
  );
};

export default TableRow;