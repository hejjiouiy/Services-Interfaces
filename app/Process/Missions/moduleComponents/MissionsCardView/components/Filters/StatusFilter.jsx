import React from 'react';
import { statusConfig } from '../../config/statusConfig';

const StatusFilter = ({ value, onChange, includeAll = true }) => {
  const options = includeAll 
    ? [{ value: 'ALL', label: 'Tous les statuts' }, ...Object.entries(statusConfig).map(([key, config]) => ({ value: key, label: config.label }))]
    : Object.entries(statusConfig).map(([key, config]) => ({ value: key, label: config.label }));

  return (
    <select
      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-green"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default StatusFilter;