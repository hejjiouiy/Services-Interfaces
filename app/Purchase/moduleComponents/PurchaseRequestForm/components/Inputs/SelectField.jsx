import React from 'react';
import FormField from './FormField';

const SelectField = ({ 
  name,
  label,
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  required = false,
  error,
  className = ""
}) => {
  return (
    <FormField label={label} required={required} error={error} className={className}>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-green bg-white"
      >
        <option value="">{placeholder}</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FormField>
  );
};

export default SelectField;