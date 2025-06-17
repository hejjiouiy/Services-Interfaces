import React from 'react';

const SectionHeader = ({ title, subtitle }) => {
    return (
        <div className="mb-10 border-b-[2px] border-gray-200 pb-4">
            <h2 className="text-3xl font-bold text-main-green">{title}</h2>
            <p className="text-darker-beige mt-2">{subtitle}</p>
        </div>
    );
};
export default SectionHeader;