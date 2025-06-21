'use client';
import React, { useState, useEffect } from 'react';
import ProgressIndicator from './ProgressIndicator';
import NavigationButtons from './NavigationButtons';
import StepContent from './StepContent';

const useMultiStepForm = (initialValues, steps, onFormDataChange) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isStepValid, setIsStepValid] = useState(false);

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
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateStep = (stepIndex) => {
    const currentFields = steps[stepIndex]?.fields || [];
    const newErrors = {};
    let isValid = true;

    currentFields.forEach((field) => {
      const value = formData[field.name];

      if (field.required && (value === undefined || value === '' || value === false)) {
        newErrors[field.name] = `${field.label || field.name} is required`;
        isValid = false;
        return;
      }

      if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors[field.name] = 'Please enter a valid email address';
          isValid = false;
        }
      }

      if (typeof field.validate === 'function') {
        const validationResult = field.validate(value, formData);
        if (validationResult) {
          newErrors[field.name] = validationResult;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    setIsStepValid(isValid);
    return isValid;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return {
    currentStep,
    formData,
    errors,
    isStepValid,
    handleInputChange,
    validateStep,
    nextStep,
    prevStep
  };
};

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
    isStepValid,
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

      <form onSubmit={currentStep === steps.length - 1 ? handleSubmit : (e) => e.preventDefault()}>
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
          isStepValid={isStepValid}
        />
      </form>
    </div>
  );
};

export default MultiStepForm;
