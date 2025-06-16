import React from 'react';
import Link from 'next/link';

const NewItemButton = ({ 
  href, 
  label, 
  icon,
  onClick 
}) => {
  const defaultIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  );

  const Component = href ? Link : 'button';
  const props = href ? { href } : { onClick };

  return (
    <Component 
      {...props}
      className="bg-main-green text-white px-4 py-2 rounded-lg hover:bg-darker-green focus:outline-none focus:ring-2 focus:ring-main-green focus:ring-offset-2 transition-colors duration-200"
    >
      <span className="flex items-center">
        {icon || defaultIcon}
        {label}
      </span>
    </Component>
  );
};

export default NewItemButton;