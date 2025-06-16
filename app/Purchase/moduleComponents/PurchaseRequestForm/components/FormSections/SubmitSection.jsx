import React from 'react';

const SubmitSection = ({ totalCost, isValid, onSubmit }) => {
  return (
    <div className="flex justify-end">
      <button
        type="submit"
        onClick={onSubmit}
        className="px-6 py-2 bg-main-green text-white rounded-lg hover:bg-darker-green focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!isValid}
      >
        Submit Purchase Request
      </button>
    </div>
  );
};

export default SubmitSection;