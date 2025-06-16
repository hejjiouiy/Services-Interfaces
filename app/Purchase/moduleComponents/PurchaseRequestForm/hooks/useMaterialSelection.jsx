import { useState } from 'react';

export const useMaterialSelection = () => {
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [currentMaterial, setCurrentMaterial] = useState({
    id: '',
    quantite: 1
  });

  const handleMaterialChange = (e) => {
    const { name, value } = e.target;
    setCurrentMaterial(prev => ({
      ...prev,
      [name]: name === 'quantite' ? parseInt(value, 10) : value
    }));
  };

  const addMaterial = (availableMaterials) => {
    if (!currentMaterial.id) return false;

    const materialDetails = availableMaterials.find(m => m.id === currentMaterial.id);
    if (!materialDetails) return false;

    const existingIndex = selectedMaterials.findIndex(m => m.id === currentMaterial.id);
    
    if (existingIndex >= 0) {
      const updatedMaterials = [...selectedMaterials];
      updatedMaterials[existingIndex].quantite += currentMaterial.quantite;
      setSelectedMaterials(updatedMaterials);
    } else {
      setSelectedMaterials(prev => [
        ...prev,
        {
          ...materialDetails,
          quantite: currentMaterial.quantite
        }
      ]);
    }

    setCurrentMaterial({ id: '', quantite: 1 });
    return true;
  };

  const removeMaterial = (id) => {
    setSelectedMaterials(prev => prev.filter(material => material.id !== id));
  };

  const clearMaterials = () => {
    setSelectedMaterials([]);
    setCurrentMaterial({ id: '', quantite: 1 });
  };

  return {
    selectedMaterials,
    currentMaterial,
    handleMaterialChange,
    addMaterial,
    removeMaterial,
    clearMaterials
  };
};