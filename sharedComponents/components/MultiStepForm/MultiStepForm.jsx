'use client';
import React, { useState } from 'react';
import ProgressIndicator from './ProgressIndicator';
import NavigationButtons from './NavigationButtons';
import StepContent from './StepContent';
import FormField from './FormField';


const useMultiStepForm = (initialValues, steps, onFormDataChange) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newFormData = {
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    };
    
    setFormData(newFormData);

    if (onFormDataChange) {
      onFormDataChange(newFormData);
    }

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateStep = (stepIndex) => {
    const currentFields = steps[stepIndex].fields || [];
    const newErrors = {};
    let isValid = true;

    currentFields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
        isValid = false;
      }

      if (field.type === 'email' && formData[field.name]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData[field.name])) {
          newErrors[field.name] = 'Please enter a valid email address';
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return {
    currentStep,
    formData,
    errors,
    handleInputChange,
    validateStep,
    nextStep,
    prevStep
  };
};

// 6. Main MultiStepForm Component (Simplified)
const MultiStepForm = ({ 
  initialValues = {}, 
  onSubmit, 
  steps = [],
  title = "Submit Form",
  onFormDataChange = null
}) => {
  const {
    currentStep,
    formData,
    errors,
    handleInputChange,
    validateStep,
    nextStep,
    prevStep
  } = useMultiStepForm(initialValues, steps, onFormDataChange);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      onSubmit(formData);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-full min-w-fit mx-auto">
      <h2 className="text-xl font-semibold text-main-green mb-6">{title}</h2>
      
      <ProgressIndicator steps={steps} currentStep={currentStep} />

      <form onSubmit={currentStep === steps.length - 1 ? handleSubmit : e => e.preventDefault()}>
        {steps[currentStep] && (
          <StepContent
            step={steps[currentStep]}
            formData={formData}
            onChange={handleInputChange}
            errors={errors}
          />
        )}

        <NavigationButtons
          currentStep={currentStep}
          totalSteps={steps.length}
          onPrevious={prevStep}
          onNext={nextStep}
          onSubmit={handleSubmit}
        />
      </form>
    </div>
  );
};

export default MultiStepForm;