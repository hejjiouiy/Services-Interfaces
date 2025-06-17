import { useState, useMemo } from 'react';
import { validateForm } from '../utils/validators';

export const useFormValidation = (formData, materials) => {
  const [showErrors, setShowErrors] = useState(false);

  const validation = useMemo(() => {
    return validateForm(formData, materials);
  }, [formData, materials]);

  const enableErrorDisplay = () => setShowErrors(true);
  const disableErrorDisplay = () => setShowErrors(false);

  return {
    isValid: validation.isValid,
    errors: showErrors ? validation.errors : {},
    enableErrorDisplay,
    disableErrorDisplay
  };
};