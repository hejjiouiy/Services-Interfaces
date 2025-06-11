import React from 'react';
import FormField from './FormField';

const StepContent = ({ step, formData, onChange, errors }) => {
  return (
    <div>
      <h3 className="text-lg font-medium text-darker-beige mb-4">{step.title}</h3>
      
      {step.description && (
        <p className="text-soft-gray mb-6">{step.description}</p>
      )}
      
      <div className="space-y-4">
        {step.fields && step.fields.map(field => (
          <FormField
            key={field.name}
            field={field}
            value={formData[field.name]}
            onChange={onChange}
            error={errors[field.name]}
          />
        ))}
      </div>
    </div>
  );
};

export default StepContent;
