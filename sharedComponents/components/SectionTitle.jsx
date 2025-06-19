'use client';
import React from 'react';

const SectionTitle = ({ title, icon = null, className = '' }) => {
  return (
    <div className={`flex items-center gap-2 mb-4 ${className}`}>
      {icon && <span className="text-xl text-main-green">{icon}</span>}
      <h2 className="text-xl sm:text-2xl font-bold text-main-green">{title}</h2>
    </div>
  );
};

export default SectionTitle;
