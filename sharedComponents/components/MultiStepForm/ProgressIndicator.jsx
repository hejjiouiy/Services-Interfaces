import React from 'react';

const ProgressIndicator = ({ steps, currentStep }) => {
  return (
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
  );
};

export default ProgressIndicator;
