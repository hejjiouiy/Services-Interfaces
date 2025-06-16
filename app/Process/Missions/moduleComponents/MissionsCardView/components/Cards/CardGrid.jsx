import React from 'react';

const CardGrid = ({ 
  children, 
  columns = { sm: 1, md: 2, lg: 3 },
  gap = 6,
  className = ""
}) => {
  const getGridClasses = () => {
    const colClasses = `grid-cols-${columns.sm} md:grid-cols-${columns.md} lg:grid-cols-${columns.lg}`;
    const gapClass = `gap-${gap}`;
    return `grid ${colClasses} ${gapClass}`;
  };

  return (
    <div className={`${getGridClasses()} ${className}`}>
      {children}
    </div>
  );
};

export default CardGrid;