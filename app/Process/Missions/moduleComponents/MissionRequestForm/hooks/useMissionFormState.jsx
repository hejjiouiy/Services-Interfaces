import { useState } from 'react';

const useMissionFormState = () => {
  const [formState, setFormState] = useState({
    includeTravel: false,
    includeAccommodation: false,
    includeFinancing: false
  });
  
  // Add formData state to track all form values
  const [formData, setFormData] = useState({});

  const handleFormChange = (newFormData) => {
    // Update both formState and formData
    setFormState({
      includeTravel: newFormData.includeTravel || false,
      includeAccommodation: newFormData.includeAccommodation || false,
      includeFinancing: newFormData.includeFinancing || false
    });
    
    setFormData(newFormData);
  };

  return { formState, formData, handleFormChange };
};

export default useMissionFormState;