import React from 'react';

// ✅ Bouton générique par défaut
const Button = ({ label, onClick, type = 'button', disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="px-4 py-2 bg-main-green text-main-beige rounded hover:bg-white hover:text-main-green border transition duration-300 ease-in-out"
    >
      {label}
    </button>
  );
};

export const Accept = ({ label, onClick, type = 'button', disabled = false }) => {
  return (
    <button
      type={type}
      className="w-[95%] m-auto mb-0 py-1.5 px-3 bg-main-green rounded-xl text-main-beige hover:bg-white hover:text-main-green hover:border-main-green border-1 hover:duration-300 ease-in-out"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export const Refuse = ({ label, onClick, type = 'button', disabled = false }) => {
  return (
    <button
      type={type}
      className="w-[95%] m-auto py-1.5 px-4 bg-main-white rounded-xl border-gray-200 border-1 text-darker-beige hover:bg-red-500 hover:text-main-beige hover:duration-300 ease-in-out"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

// ✅ Export par défaut + nommés
export default Button;
