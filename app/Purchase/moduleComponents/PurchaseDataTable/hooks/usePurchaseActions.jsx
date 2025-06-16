import { useCallback } from 'react';

export const usePurchaseActions = (requests, setRequests, closeAllDialogs) => {
  const handleEditFormChange = useCallback((editFormData, setEditFormData) => {
    return (field, value) => {
      setEditFormData({
        ...editFormData,
        [field]: value
      });
    };
  }, []);

  const handleMaterialChange = useCallback((editFormData, setEditFormData) => {
    return (materialIndex, field, value) => {
      const updatedMaterials = [...editFormData.materials];
      updatedMaterials[materialIndex] = {
        ...updatedMaterials[materialIndex],
        [field]: field === 'prix_unitaire_estime' || field === 'quantite' ? Number(value) : value
      };
      
      setEditFormData({
        ...editFormData,
        materials: updatedMaterials
      });
    };
  }, []);

  const saveEdit = useCallback((editFormData) => {
    const newTotal = editFormData.materials.reduce(
      (sum, material) => sum + (material.prix_unitaire_estime * material.quantite), 0
    );
    
    const updatedRequest = {
      ...editFormData,
      totalEstimated: newTotal,
      updatedAt: new Date().toISOString()
    };
    
    const updatedRequests = requests.map(req => 
      req.id === updatedRequest.id ? updatedRequest : req
    );
    
    setRequests(updatedRequests);
    closeAllDialogs();
  }, [requests, setRequests, closeAllDialogs]);

  const confirmDelete = useCallback((selectedRequest) => {
    const updatedRequests = requests.filter(req => req.id !== selectedRequest.id);
    setRequests(updatedRequests);
    closeAllDialogs();
  }, [requests, setRequests, closeAllDialogs]);

  return {
    handleEditFormChange,
    handleMaterialChange,
    saveEdit,
    confirmDelete
  };
};