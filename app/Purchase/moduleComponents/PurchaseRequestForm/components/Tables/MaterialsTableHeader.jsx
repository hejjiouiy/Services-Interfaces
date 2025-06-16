import React from 'react';

const MaterialsTableHeader = () => {
  return (
    <thead className="bg-gray-100 text-gray-600 text-sm">
      <tr>
        <th className="py-3 px-4 text-left">Name</th>
        <th className="py-3 px-4 text-left">Category</th>
        <th className="py-3 px-4 text-left">Unit Price</th>
        <th className="py-3 px-4 text-left">Quantity</th>
        <th className="py-3 px-4 text-left">Total</th>
        <th className="py-3 px-4 text-left">Actions</th>
      </tr>
    </thead>
  );
};

export default MaterialsTableHeader;