import React from 'react';

const NewRequestButton = ({ onClick, href, label = "New Request" }) => {
  const Component = href ? 'a' : 'button';
  const props = href ? { href } : { onClick };

  return (
    <Component 
      {...props}
      className="px-4 py-2 bg-main-green text-white rounded-md hover:bg-green-700 transition-colors"
    >
      <span className="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-1">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        {label}
      </span>
    </Component>
  );
};

export default NewRequestButton;
