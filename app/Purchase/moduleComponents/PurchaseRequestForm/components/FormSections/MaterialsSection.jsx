import React from 'react';
import MaterialSelector from './MaterialSelector';
import MaterialsTable from '../Tables/MaterialsTable';
import NoMaterialsState from '../EmptyStates/NoMaterialsState';

const MaterialsSection = ({ 
  selectedMaterials, 
  currentMaterial, 
  availableMaterials,
  totalCost,
  onCurrentMaterialChange,
  onAddMaterial,
  onRemoveMaterial,
  errors
}) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium text-darker-beige mb-4">Add Materials</h3>
      
      <MaterialSelector
        currentMaterial={currentMaterial}
        onChange={onCurrentMaterialChange}
        onAdd={onAddMaterial}
        availableMaterials={availableMaterials}
      />
      
      <div>
        <h4 className="font-medium text-main-green mb-2">Selected Materials</h4>
        
        {errors.materials && (
          <p className="text-red-500 text-sm mb-2">{errors.materials}</p>
        )}
        
        {selectedMaterials.length === 0 ? (
          <NoMaterialsState />
        ) : (
          <MaterialsTable
            materials={selectedMaterials}
            totalCost={totalCost}
            onRemoveMaterial={onRemoveMaterial}
          />
        )}
      </div>
    </div>
  );
};

export default MaterialsSection;