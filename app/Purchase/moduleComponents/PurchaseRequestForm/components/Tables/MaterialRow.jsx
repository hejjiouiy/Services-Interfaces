import React from 'react';
import { calculateItemTotal } from '../../utils/calculations';
import { formatCurrency } from '../../utils/formatters';

const MaterialRow = ({ material, onRemove }) => {
  const itemTotal = calculateItemTotal(material.prix_unitaire_estime, material.quantite);

  return (
    <tr className="border-t">
      <td className="py-3 px-4">{material.designation}</td>
      <td className="py-3 px-4">{material.categorie}</td>
      <td className="py-3 px-4">{formatCurrency(material.prix_unitaire_estime)}</td>
      <td className="py-3 px-4">{material.quantite}</td>
      <td className="py-3 px-4 font-medium">{formatCurrency(itemTotal)}</td>
      <td className="py-3 px-4">
        <button
          type="button"
          onClick={() => onRemove(material.id)}
          className="text-red-500 hover:text-red-700 transition-colors"
        >
          Remove
        </button>
      </td>
    </tr>
  );
};

export default MaterialRow;