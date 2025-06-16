import React from 'react';
import TableRow from './TableRow';

const TableBody = ({ purchases, type = "standard", emptyMessage = "Aucune demande trouvée pour cette période." }) => {
  if (purchases.length === 0) {
    const colSpan = type === "expensive" ? 5 : 6;
    return (
      <tbody className="bg-white divide-y divide-gray-200">
        <tr>
          <td colSpan={colSpan} className="px-6 py-4 text-center text-gray-500 text-sm">
            {emptyMessage}
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {purchases.map((purchase, index) => (
        <TableRow
          key={purchase.id}
          purchase={purchase}
          index={index}
          type={type}
        />
      ))}
    </tbody>
  );
};

export default TableBody;