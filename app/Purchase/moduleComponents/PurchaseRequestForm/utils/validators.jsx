import { validationRules } from '../config/validationRules';

export const validateField = (fieldName, value, additionalData = {}) => {
  const rule = validationRules[fieldName];
  if (!rule) return null;

  if (rule.required && (!value || value === '')) {
    return rule.message;
  }

  if (rule.validate && value) {
    return rule.validate(value, additionalData);
  }

  return null;
};

export const validateForm = (formData, materials) => {
  const errors = {};
  
  Object.keys(validationRules).forEach(fieldName => {
    if (fieldName === 'materials') {
      const error = validateField(fieldName, materials);
      if (error) errors[fieldName] = error;
    } else {
      const error = validateField(fieldName, formData[fieldName]);
      if (error) errors[fieldName] = error;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};