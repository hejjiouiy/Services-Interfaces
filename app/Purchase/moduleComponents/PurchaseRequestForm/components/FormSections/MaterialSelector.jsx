import React from 'react';
import MaterialSelect from '../Inputs/MaterialSelect';
import NumberField from '../Inputs/NumberField';

const MaterialSelector = ({ 
  currentMaterial, 
  onChange, 
  onAdd, 
  availableMaterials 
}) => {
  return (
    <div className="bg-lighter-beige p-4 rounded-lg mb-6">
      <div className="flex flex-wrap items-end gap-4">
        <MaterialSelect
          value={currentMaterial.id}
          onChange={onChange}
          materials={availableMaterials}
          className="flex-grow min-w-[200px]"
        />
        
        <NumberField
          name="quantite"
          label="Quantity"
          value={currentMaterial.quantite}
          onChange={onChange}
          min={1}
          required={true}
          className="w-32"
        />
        
        <button
          type="button"
          onClick={onAdd}
          className="px-4 py-2 bg-secondary-green text-white rounded-lg hover:bg-darker-green focus:outline-none transition-colors"
        >
          Add Material
        </button>
      </div>
    </div>
  );
};

export default MaterialSelector;