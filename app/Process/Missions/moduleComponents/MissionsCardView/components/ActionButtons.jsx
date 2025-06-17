import React from 'react';
import Link from 'next/link';

const ActionButton = ({ href, onClick, icon, title, color = 'text-gray-600' }) => {
  const Component = href ? Link : 'button';
  const props = href ? { href } : { onClick };

  return (
    <Component 
      {...props}
      className={`p-2 rounded-lg hover:bg-gray-200 ${color} transition-colors duration-200`}
      title={title}
    >
      {icon}
    </Component>
  );
};

const ActionButtons = ({ 
  item, 
  onView, 
  onEdit, 
  onDelete,
  viewUrl,
  editUrl,
  actions = ['view', 'edit', 'delete']
}) => {
  const actionConfigs = {
    view: {
      href: viewUrl || `/missions/${item.id}`,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      title: "Voir les détails",
      color: "text-main-green"
    },
    edit: {
      href: editUrl || `/missions/${item.id}/edit`,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      title: "Modifier",
      color: "text-blue-600"
    },
    delete: {
      onClick: () => onDelete?.(item),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      ),
      title: "Supprimer",
      color: "text-red-600"
    }
  };

  return (
    <div className="flex space-x-2">
      {actions.map(action => {
        const config = actionConfigs[action];
        if (!config) return null;

        return (
          <ActionButton
            key={action}
            {...config}
          />
        );
      })}
    </div>
  );
};

export default ActionButtons;