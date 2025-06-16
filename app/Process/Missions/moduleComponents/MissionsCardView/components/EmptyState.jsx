import React from 'react';

const EmptyState = ({ 
  title = "Aucune donnée trouvée",
  description = "Essayez de modifier vos critères de recherche.",
  icon,
  action
}) => {
  const defaultIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  );

  return (
    <div className="text-center py-8">
      {icon || defaultIcon}
      <h3 className="mt-4 text-lg font-medium text-gray-700">{title}</h3>
      <p className="mt-2 text-gray-500">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};

export default EmptyState;