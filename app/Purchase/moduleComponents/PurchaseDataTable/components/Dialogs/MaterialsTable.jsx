import React from 'react';
import { formatAmount } from '../../utils/formatters';

const MaterialsTable = ({ 
  materials, 
  editable = false, 
  onMaterialChange 
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Désignation
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Prix unitaire
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Quantité
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {materials.map((material, index) => (
            <tr key={material.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {editable ? (
                  <input 
                    type="text" 
                    value={material.designation} 
                    onChange={(e) => onMaterialChange(index, 'designation', e.target.value)}
                    className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-main-green"
                  />
                ) : (
                  <span className="text-sm font-medium text-gray-900">{material.designation}</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editable ? (
                  <input 
                    type="text" 
                    value={material.description} 
                    onChange={(e) => onMaterialChange(index, 'description', e.target.value)}
                    className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-main-green"
                  />
                ) : (
                  <span className="text-sm text-gray-500">{material.description}</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editable ? (
                  <input 
                    type="number" 
                    value={material.prix_unitaire_estime} 
                    onChange={(e) => onMaterialChange(index, 'prix_unitaire_estime', e.target.value)}
                    className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-main-green"
                  />
                ) : (
                  <span className="text-sm text-gray-500">{formatAmount(material.prix_unitaire_estime)}</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editable ? (
                  <input 
                    type="number" 
                    value={material.quantite} 
                    onChange={(e) => onMaterialChange(index, 'quantite', e.target.value)}
                    className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-main-green"
                  />
                ) : (
                  <span className="text-sm text-gray-500">{material.quantite}</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatAmount(material.prix_unitaire_estime * material.quantite)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaterialsTable;