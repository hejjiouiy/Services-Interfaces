import React from 'react';
import FormField from './FormField';

const NumberField = ({ 
  name,
  label,
  value,
  onChange,
  min = 1,
  required = false,
  error,
  className = ""
}) => {
  return (
    <FormField label={label} required={required} error={error} className={className}>
      <input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-green"
      />
    </FormField>
  );
};

export default NumberField;