import React, { useState, useEffect } from 'react';


// Modified MultiStepForm component with the onFormDataChange handler

const MultiStepForm = ({ 
  initialValues = {}, 
  onSubmit, 
  steps = [],
  title = "Submit Form",
  onFormDataChange = null // New prop for catching form data changes
}) => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [formData, setFormData] = React.useState(initialValues);
  const [errors, setErrors] = React.useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newFormData = {
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    };
    
    setFormData(newFormData);

    // Call the onFormDataChange handler if provided
    if (onFormDataChange) {
      onFormDataChange(newFormData);
    }

    // Clear error when user starts typing
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

      // Email validation
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      onSubmit(formData);
    }
  };

  const renderField = (field) => {
    const { type, name, label, placeholder, options, required } = field;

    switch (type) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
      case 'date':
        return (
          <div className="mb-4" key={name}>
            <label 
              className="block text-darker-beige text-sm font-medium mb-2" 
              htmlFor={name}
            >
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
              type={type}
              id={name}
              name={name}
              value={formData[name] || ''}
              onChange={handleInputChange}
              placeholder={placeholder || ''}
              className={`w-full px-4 py-2 border ${errors[name] ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-main-green`}
            />
            {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
          </div>
        );
      
      case 'textarea':
        return (
          <div className="mb-4" key={name}>
            <label 
              className="block text-darker-beige text-sm font-medium mb-2" 
              htmlFor={name}
            >
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <textarea
              id={name}
              name={name}
              value={formData[name] || ''}
              onChange={handleInputChange}
              placeholder={placeholder || ''}
              rows="4"
              className={`w-full px-4 py-2 border ${errors[name] ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-main-green`}
            />
            {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
          </div>
        );
      
      case 'select':
        return (
          <div className="mb-4" key={name}>
            <label 
              className="block text-darker-beige text-sm font-medium mb-2" 
              htmlFor={name}
            >
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <select
              id={name}
              name={name}
              value={formData[name] || ''}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border ${errors[name] ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-main-green bg-white`}
            >
              <option value="">{placeholder || 'Select an option'}</option>
              {options && options.map((option, index) => (
                <option key={index} value={option.value || option}>
                  {option.label || option}
                </option>
              ))}
            </select>
            {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
          </div>
        );
      
      case 'checkbox':
        return (
          <div className="mb-4" key={name}>
            <div className="flex items-center">
              <input
                type="checkbox"
                id={name}
                name={name}
                checked={formData[name] || false}
                onChange={handleInputChange}
                className="mr-2 h-4 w-4 text-main-green focus:ring-main-green border-gray-300 rounded"
              />
              <label 
                className="text-darker-beige text-sm" 
                htmlFor={name}
              >
                {label} {required && <span className="text-red-500">*</span>}
              </label>
            </div>
            {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
          </div>
        );
      
      case 'radio':
        return (
          <div className="mb-4" key={name}>
            <label className="block text-darker-beige text-sm font-medium mb-2">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="space-y-2">
              {options && options.map((option, index) => (
                <div className="flex items-center" key={index}>
                  <input
                    type="radio"
                    id={`${name}-${index}`}
                    name={name}
                    value={option.value || option}
                    checked={formData[name] === (option.value || option)}
                    onChange={handleInputChange}
                    className="mr-2 h-4 w-4 text-main-green focus:ring-main-green border-gray-300"
                  />
                  <label 
                    className="text-darker-beige text-sm" 
                    htmlFor={`${name}-${index}`}
                  >
                    {option.label || option}
                  </label>
                </div>
              ))}
            </div>
            {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-full min-w-fit mx-auto">
      <h2 className="text-xl font-semibold text-main-green mb-6">{title}</h2>
      
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className={`w-10 h-10 flex items-center justify-center rounded-full 
                  ${index < currentStep ? 'bg-secondary-green text-white' : 
                    index === currentStep ? 'bg-main-green text-white' : 
                    'bg-gray-200 text-gray-600'}`}
              >
                {index < currentStep ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              <span className={`text-xs mt-2 
                ${index < currentStep ? 'text-secondary-green' : 
                  index === currentStep ? 'text-main-green font-medium' : 
                  'text-gray-500'}`}>
                {step.title}
              </span>
              
              {/* Connecting line between steps */}
              {index < steps.length - 1 && (
                <div className="hidden sm:block absolute h-0.5 w-1/4 left-0 top-1/2 transform -translate-y-1/2" 
                  style={{ left: `${(index + 0.5) * (100 / (steps.length - 1))}%`, width: `${100 / (steps.length - 1)}%` }}>
                  <div 
                    className="absolute h-full bg-secondary-green" 
                    style={{ width: index < currentStep ? '100%' : '0%' }} 
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={currentStep === steps.length - 1 ? handleSubmit : e => e.preventDefault()}>
        {steps[currentStep] && (
          <div>
            <h3 className="text-lg font-medium text-darker-beige mb-4">{steps[currentStep].title}</h3>
            
            {steps[currentStep].description && (
              <p className="text-soft-gray mb-6">{steps[currentStep].description}</p>
            )}
            
            <div className="space-y-4">
              {steps[currentStep].fields && steps[currentStep].fields.map(field => renderField(field))}
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-between">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-4 py-2 border border-main-green text-main-green rounded-lg hover:bg-gray-50 focus:outline-none"
            >
              Back
            </button>
          )}
          
          {currentStep === 0 && <div></div>}
          
          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-2 bg-main-green text-white rounded-lg hover:bg-darker-green focus:outline-none"
            >
              Continue
            </button>
          ) : (
            <button
              type="submit"
              className="px-6 py-2 bg-main-green text-white rounded-lg hover:bg-darker-green focus:outline-none"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;