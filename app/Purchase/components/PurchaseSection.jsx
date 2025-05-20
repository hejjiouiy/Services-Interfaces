'use client'
import React, { useState } from 'react';
import PurchaseRequestForm from './PurchaseRequestForm';
import PurchaseDataTable from './PurchaseDataTable';
import PowerBIAnalysisPage from '@/app/Services/gestionDeplacements/components/PowerBIAnalysisPage';
import PurchasesAnalysisPage from './PurchasesAnalysisPage';

const PurchaseSection = () => {
    const [selectedSection, setSelectedSection] = useState("My Orders");
    
    // Define the 4 main sections with user-friendly names
    const sections = [
        { 
            name: "My Orders", 
            component: <PurchaseDataTable />,
            description: "View and manage all your purchase orders",
            notification: 3
        },
        { 
            name: "New Order", 
            component: <PurchaseRequestForm />,
            description: "Request new materials, equipment, or supplies",
            notification: 0
        },
        { 
            name: "Reports", 
            component: <PurchasesAnalysisPage />,
            description: "View spending reports and purchasing analytics",
            notification: 0
        },
        { 
            name: "Dashboard", 
            component: <PowerBIAnalysisPage/>,
            description: "Interactive visualizations of purchase data and trends",
            notification: 1
        }
    ];
    
    // Get the current section object
    const getCurrentSection = () => {
        return sections.find(section => section.name === selectedSection);
    };
    
    const currentSection = getCurrentSection();
    
    return (
        <div className="bg-lighter-beige mt-8 p-4 rounded-lg">
            <div className="w-[95%] mx-auto">
                {/* Section tabs with gray border */}
                <div className="mb-6 pb-6 border-b-[2px] border-gray-200 relative">
                    <div className="flex text-xl justify-between">
                        {sections.map((section, index) => (
                            <div 
                                key={index} 
                                className="cursor-pointer relative pb-3 flex flex-col items-center"
                                onClick={() => setSelectedSection(section.name)}
                            >
                                <div className="flex items-center relative">
                                    <h4 className={`mb-2 text-darker-beige ${selectedSection === section.name ? "font-bold " : "font-normal"}`}>
                                        {section.name}
                                    </h4>
                                    
                                    {section.notification > 0 && (
                                        <span className="absolute -top-2 -right-6 text-main-beige bg-red-500 rounded-full shadow-xl px-1.5 py-0.5 text-xs">
                                            {section.notification}
                                        </span>
                                    )}
                                </div>

                                {/* Animated green underline */}
                                <span
                                    className={`absolute -bottom-[26px] left-0 w-full h-[2px] bg-secondary-green origin-center transition-transform duration-500 ease-in-out ${
                                        selectedSection === section.name ? "scale-x-100" : "scale-x-0"
                                    }`}
                                ></span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Description section */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-main-green mb-2">{currentSection.name}</h2>
                    <p className="text-darker-beige">{currentSection.description}</p>
                </div>

                {/* Dynamic content section */}
                <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
                    {currentSection.component}
                </div>
            </div>
        </div>
    );
};

export default PurchaseSection;