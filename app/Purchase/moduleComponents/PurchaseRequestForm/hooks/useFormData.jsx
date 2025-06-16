import { useState } from 'react';

export const useFormData = (initialData = {}) => {
  const [formData, setFormData] = useState({
    typeDemande: 'DEMANDE_ACHAT',
    priorite: 'NORMAL',
    dateBesoin: '',
    ligne_budgetaire_id: '',
    ...initialData
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const updateFormField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      typeDemande: 'DEMANDE_ACHAT',
      priorite: 'NORMAL',
      dateBesoin: '',
      ligne_budgetaire_id: ''
    });
  };

  return {
    formData,
    handleInputChange,
    updateFormField,
    resetForm
  };
};