import React from 'react';

const FormField = ({ 
  label, 
  required = false, 
  error, 
  children,
  className = ""
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-darker-beige text-sm font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default FormField;