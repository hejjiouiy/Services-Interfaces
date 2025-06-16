import React from 'react';
import { statusConfig } from '../../config/statusConfig';

const StatusFilter = ({ value, onChange, includeAll = true }) => {
  const options = includeAll 
    ? [{ value: 'All', label: 'All Statuses' }, ...Object.entries(statusConfig).map(([key, config]) => ({ value: key, label: config.label }))]
    : Object.entries(statusConfig).map(([key, config]) => ({ value: key, label: config.label }));

  return (
    <div>
      <label htmlFor="status-filter" className="block text-sm font-medium text-darker-beige mb-1">
        Status
      </label>
      <select
        id="status-filter"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-green"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StatusFilter;