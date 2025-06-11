import React from 'react';
import CloseIcon from '../Icons/CloseIcon';

const DialogHeader = ({ title, onClose }) => (
  <div className="flex justify-between items-center border-b pb-3 mb-6">
    <h2 className="text-xl font-semibold text-main-green">{title}</h2>
    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
      <CloseIcon />
    </button>
  </div>
);
export default DialogHeader;