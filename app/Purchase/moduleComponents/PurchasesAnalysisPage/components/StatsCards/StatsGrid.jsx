import React from 'react';

const StatsGrid = ({ children, columns = 4 }) => {
  const gridClass = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <div className={`grid ${gridClass[columns]} gap-6 mb-8`}>
      {children}
    </div>
  );
};

export default StatsGrid;