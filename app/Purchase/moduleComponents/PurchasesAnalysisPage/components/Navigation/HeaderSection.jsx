import React from 'react';

const HeaderSection = ({ title, subtitle }) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-main-green">{title}</h1>
      <p className="text-darker-beige mt-2">{subtitle}</p>
    </div>
  );
};

export default HeaderSection;