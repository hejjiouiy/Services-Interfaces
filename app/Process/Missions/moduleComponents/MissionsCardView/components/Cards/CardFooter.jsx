import React from 'react';
import ActionButtons from '../ActionButtons';
import { formatDate } from '../../utils/formatters';

const CardFooter = ({ 
  createdAt, 
  item, 
  actions,
  onView,
  onEdit,
  onDelete,
  viewUrl,
  editUrl,
  footerText
}) => {
  return (
    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">
          {footerText || (createdAt && `Créée le ${formatDate(createdAt)}`)}
        </span>
        <ActionButtons
          item={item}
          actions={actions}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          viewUrl={viewUrl}
          editUrl={editUrl}
        />
      </div>
    </div>
  );
};

export default CardFooter;