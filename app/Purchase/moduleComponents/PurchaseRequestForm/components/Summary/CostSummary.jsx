import React from 'react';
import { formatCurrency } from '../../utils/formatters';

const CostSummary = ({ totalCost, itemCount }) => {
  return (
    <div className="bg-green-50 p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">Items: {itemCount}</p>
          <p className="text-lg font-semibold text-main-green">
            Total: {formatCurrency(totalCost)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CostSummary;