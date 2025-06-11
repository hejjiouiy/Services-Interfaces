import React from 'react';

const NavigationButtons = ({ currentStep, totalSteps, onPrevious, onNext, onSubmit }) => {
  return (
    <div className="mt-8 flex justify-between">
      {currentStep > 0 ? (
        <button
          type="button"
          onClick={onPrevious}
          className="px-4 py-2 border border-main-green text-main-green rounded-lg hover:bg-gray-50 focus:outline-none"
        >
          Back
        </button>
      ) : (
        <div></div>
      )}
      
      {currentStep < totalSteps - 1 ? (
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-2 bg-main-green text-white rounded-lg hover:bg-darker-green focus:outline-none"
        >
          Continue
        </button>
      ) : (
        <button
          type="submit"
          onClick={onSubmit}
          className="px-6 py-2 bg-main-green text-white rounded-lg hover:bg-darker-green focus:outline-none"
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;