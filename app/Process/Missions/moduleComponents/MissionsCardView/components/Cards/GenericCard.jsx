import React from 'react';
import CardHeader from './CardHeader';
import CardBody from './CardBody';
import CardFooter from './CardFooter';

const GenericCard = ({ 
  item,
  type,
  status,
  title,
  subtitle,
  description,
  dateRange,
  amount,
  customFields,
  actions = ['view', 'edit', 'delete'],
  onView,
  onEdit,
  onDelete,
  viewUrl,
  editUrl,
  footerText,
  className = ""
}) => {
  return (
    <div className={`bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col ${className}`}>
      <CardHeader 
        type={type}
        status={status}
        title={title}
      />
      
      <CardBody 
        title={subtitle}
        subtitle={description}
        description={item.details}
        dateRange={dateRange}
        amount={amount}
        customFields={customFields}
      />
      
      <CardFooter 
        createdAt={item.createdAt}
        item={item}
        actions={actions}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
        viewUrl={viewUrl}
        editUrl={editUrl}
        footerText={footerText}
      />
    </div>
  );
};

export default GenericCard;