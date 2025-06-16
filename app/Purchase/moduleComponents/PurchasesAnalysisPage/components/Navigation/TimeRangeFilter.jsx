import React from 'react';
import { timeRangeConfig } from '../../config/tabsConfig';

const TimeRangeFilter = ({ timeRange, onChange }) => {
  return (
    <div className="flex space-x-2">
      {timeRangeConfig.map(range => (
        <button
          key={range.id}
          onClick={() => onChange(range.id)}
          className={`px-4 py-2 rounded-lg text-sm ${
            timeRange === range.id 
              ? 'bg-main-green text-white' 
              : 'bg-gray-100 text-darker-beige hover:bg-gray-200'
          }`}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
};

export default TimeRangeFilter;