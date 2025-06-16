import React from 'react';
import MaterialsTableHeader from './MaterialsTableHeader';
import MaterialRow from './MaterialRow';
import { formatCurrency } from '../../utils/formatters';

const MaterialsTable = ({ materials, totalCost, onRemoveMaterial }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <MaterialsTableHeader />
        <tbody className="text-gray-600">
          {materials.map((material) => (
            <MaterialRow
              key={material.id}
              material={material}
              onRemove={onRemoveMaterial}
            />
          ))}
          <tr className="border-t bg-gray-50">
            <td colSpan="4" className="py-3 px-4 text-right font-semibold">
              Total Estimated Cost:
            </td>
            <td className="py-3 px-4 font-bold text-main-green">
              {formatCurrency(totalCost)}
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MaterialsTable;