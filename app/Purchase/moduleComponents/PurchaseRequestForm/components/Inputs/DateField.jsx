import React from 'react';
import FormField from './FormField';

const DateField = ({ 
  name,
  label,
  value,
  onChange,
  min,
  required = false,
  error,
  className = ""
}) => {
  return (
    <FormField label={label} required={required} error={error} className={className}>
      <input
        type="date"
        name={name}
        value={value}
        onChange={onChange}
        min={min || new Date().toISOString().split('T')[0]}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-green"
      />
    </FormField>
  );
};

export default DateField;