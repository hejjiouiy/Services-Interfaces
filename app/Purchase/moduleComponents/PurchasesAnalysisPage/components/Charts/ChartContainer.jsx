import React from 'react';

const ChartContainer = ({ title, children, className = "" }) => {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
      <h2 className="text-lg font-semibold text-main-green mb-4">{title}</h2>
      <div className="h-80">
        {children}
      </div>
    </div>
  );
};

export default ChartContainer;
