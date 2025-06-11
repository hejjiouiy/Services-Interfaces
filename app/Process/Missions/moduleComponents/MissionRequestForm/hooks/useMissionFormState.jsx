import { useState } from 'react';
const useMissionFormState = () => {
  const [formState, setFormState] = useState({
    includeTravel: false,
    includeAccommodation: false,
    includeFinancing: false
  });

  const handleFormChange = (formData) => {
    setFormState({
      includeTravel: formData.includeTravel || false,
      includeAccommodation: formData.includeAccommodation || false,
      includeFinancing: formData.includeFinancing || false
    });
  };

  return { formState, handleFormChange };
};
export default useMissionFormState;
