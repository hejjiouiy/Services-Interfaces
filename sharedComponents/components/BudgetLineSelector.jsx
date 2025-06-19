'use client';
import React from 'react';

const BudgetLineSelector = ({ options = [], onSelect, selectedId = '', label = 'Select Budget Line' }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-darker-beige mb-1">{label}</label>
      <select
        value={selectedId}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-main-green"
      >
        <option value="">-- Choose a line --</option>
        {options.map(({ id, code, label }) => (
          <option key={id} value={id}>
            {code} – {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BudgetLineSelector;
