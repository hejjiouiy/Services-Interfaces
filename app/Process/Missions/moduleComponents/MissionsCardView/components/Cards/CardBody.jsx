import React from 'react';
import { formatDate, formatAmount } from '../../utils/formatters';

const CardBody = ({ 
  title, 
  subtitle, 
  description, 
  dateRange, 
  amount,
  customFields = []
}) => {
  return (
    <div className="px-6 py-4 flex-grow">
      <div className="text-lg font-semibold text-gray-900 mb-1">{title}</div>
      {subtitle && <div className="text-sm text-gray-600 mb-3">{subtitle}</div>}
      
      {description && (
        <p className="text-gray-700 mb-4 line-clamp-2 text-sm">{description}</p>
      )}
      
      <div className="mt-4 space-y-2">
        {dateRange && (
          <div className="flex items-center text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-gray-700">
              {formatDate(dateRange.start)} - {formatDate(dateRange.end)}
            </span>
          </div>
        )}
        
        {amount && (
          <div className="flex items-center text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium text-gray-900">{formatAmount(amount)}</span>
          </div>
        )}

        {customFields.map((field, index) => (
          <div key={index} className="flex items-center text-sm">
            {field.icon && <div className="h-5 w-5 text-gray-500 mr-2">{field.icon}</div>}
            <span className={field.className || "text-gray-700"}>{field.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardBody;