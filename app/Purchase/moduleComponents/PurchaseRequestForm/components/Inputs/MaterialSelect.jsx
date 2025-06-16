import React from 'react';
import FormField from './FormField';

const MaterialSelect = ({ 
  value,
  onChange,
  materials,
  error,
  className = ""
}) => {
  return (
    <FormField 
      label="Select Material" 
      required={true} 
      error={error} 
      className={className}
    >
      <select
        name="id"
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-green bg-white"
      >
        <option value="">Select a Material</option>
        {materials.map(material => (
          <option key={material.id} value={material.id}>
            {material.designation} - {material.prix_unitaire_estime.toFixed(2)}
          </option>
        ))}
      </select>
    </FormField>
  );
};

export default MaterialSelect;