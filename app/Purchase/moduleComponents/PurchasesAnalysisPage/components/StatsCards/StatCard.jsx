import React from 'react';

const StatCard = ({ icon, title, value, bgColor = "bg-blue-100", textColor = "text-blue-600" }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center">
        <div className={`rounded-full p-3 ${bgColor} ${textColor} mr-4`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-xl font-bold text-gray-700">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;