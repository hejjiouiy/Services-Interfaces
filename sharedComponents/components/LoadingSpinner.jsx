'use client';
import React from 'react';

const LoadingSpinner = ({ className = '', size = 12 }) => {
  const sizeClass = `h-${size} w-${size}`;
  return (
    <div className={`flex justify-center items-center h-64 ${className}`}>
      <div className={`animate-spin rounded-full border-b-2 border-main-green ${sizeClass}`}></div>
    </div>
  );
};

export default LoadingSpinner;
