'use client'
import React, { useState } from 'react';
import Card from '../components/card';
import Approved from '../components/approved';
import Form from '../components/form';
import MissionRequestForm from '../../app/Services/gestionDeplacements/compoenents/MissionRequestForm';
import MissionsDataTable from '../../app/Services/gestionDeplacements/compoenents/MissionsDataTable';
import MissionsCardView from '../../app/Services/gestionDeplacements/compoenents/MissionsCardView';
import MissionsAnalysisPage from '../../app/Services/gestionDeplacements/compoenents/MissionsAnalysisPage';
import PowerBIAnalysisPage from '../../app/Services/gestionDeplacements/compoenents/PowerBIAnalysisPage';

const Services = () => {
    const [selectedService, setSelectedService] = useState("Missions and Travel");
    const [selectedSubservice, setSelectedSubservice] = useState("Booking Form");
    
    // Define services and their subservices with component mappings and icons
    const servicesWithSubs = {
        "Missions and Travel": {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 16 16">
  <path d="M5 2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2h3.5A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5H14a.5.5 0 0 1-1 0H3a.5.5 0 0 1-1 0h-.5A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2zm1 0h4a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1M1.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H3V3zM15 12.5v-9a.5.5 0 0 0-.5-.5H13v10h1.5a.5.5 0 0 0 .5-.5m-3 .5V3H4v10z"/>
</svg>
            ),
            subservices: [
                { 
                    name: "Booking Form", 
                    component: <MissionRequestForm/>,
                    description: "Book flights, accommodations, and transportation"
                },
                { 
                    name: "Requests", 
                    component: <MissionsDataTable/>,
                    description: "Request help with visa applications and processing"
                },
                { 
                    name: "Reports", 
                    component: <MissionsCardView />,
                    description: "Submit travel expenses for reimbursement"
                },
                { 
                    name: "BI Dashboard", 
                    component: <PowerBIAnalysisPage />,
                    description: "Submit travel expenses for reimbursement"
                },
                { 
                    name: "Analysis", 
                    component: <MissionsAnalysisPage/>,
                    description: "Request and track mission approvals"
                }
            ]
        },
        "Access": {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0110 0v4"></path>
                    <circle cx="12" cy="16" r="1"></circle>
                </svg>
            ),
            subservices: [
                { 
                    name: "Access Demand", 
                    component: <Form formType="access" />,
                    description: "Submit a new access request for yourself or guests"
                },
                { 
                    name: "Pending Demands", 
                    component: <Card status="pending" type="access" />,
                    description: "View and track your pending access requests"
                },
                { 
                    name: "Visitor Passes", 
                    component: <Form formType="visitor" />,
                    description: "Request temporary passes for visitors and guests"
                },
                { 
                    name: "Conference Room Booking", 
                    component: <Form formType="conference" />,
                    description: "Book meeting spaces and conference rooms"
                }
            ]
        },
        "Housing": {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
            ),
            subservices: [
                { 
                    name: "Staff Accommodation", 
                    component: <Form formType="staff-housing" />,
                    description: "Apply for long-term staff accommodation"
                },
                { 
                    name: "Temporary Housing", 
                    component: <Form formType="temp-housing" />,
                    description: "Request short-term temporary housing"
                },
                { 
                    name: "Housing Allowance", 
                    component: <Approved type="allowance" />,
                    description: "Submit housing allowance requests and documentation"
                },
                { 
                    name: "Maintenance Requests", 
                    component: <Form formType="maintenance" />,
                    description: "Report issues and request maintenance for your accommodation"
                }
            ]
        },
        "Catering": {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8h1a4 4 0 010 8h-1"></path>
                    <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"></path>
                    <line x1="6" y1="1" x2="6" y2="4"></line>
                    <line x1="10" y1="1" x2="10" y2="4"></line>
                    <line x1="14" y1="1" x2="14" y2="4"></line>
                </svg>
            ),
            subservices: [
                { 
                    name: "Event Catering", 
                    component: <Form formType="event-catering" />,
                    description: "Order catering services for events and meetings"
                },
                { 
                    name: "Daily Meal Services", 
                    component: <Card status="active" type="meal" />,
                    description: "View and modify your daily meal plan"
                },
                { 
                    name: "Special Dietary Requests", 
                    component: <Form formType="dietary" />,
                    description: "Submit special dietary requirements and restrictions"
                },
                { 
                    name: "Cafeteria Services", 
                    component: <Card status="info" type="cafeteria" />,
                    description: "View cafeteria hours, menus, and information"
                }
            ]
        },
    };
    
    // Helper function to get notification count for a service
    const getNotificationCount = (service) => {
        // This would ideally come from an API or state management
        const counts = {
            "Access": 5,
            "Housing": 2,
            "Catering": 0,
            "Missions and Travel": 3
        };
        return counts[service] || 0;
    };
    
    // Get the list of all main services
    const services = Object.keys(servicesWithSubs);
    
    // When changing the main service, set the first subservice as selected
    const handleServiceChange = (service) => {
        setSelectedService(service);
        setSelectedSubservice(servicesWithSubs[service].subservices[0].name);
    };

    // Get the current subservice object
    const getCurrentSubserviceObject = () => {
        return servicesWithSubs[selectedService].subservices.find(sub => sub.name === selectedSubservice);
    };
    
    // Get component for selected subservice
    const currentSubservice = getCurrentSubserviceObject();
    
    return (
        <div className="bg-lighter-beige p-4 rounded-lg">
            <div className="w-[95%] mx-auto">
                {/* Main services navigation */}
                <ul className="flex flex-row justify-between my-4">
                    {services.map((service) => {
                        const notificationCount = getNotificationCount(service);
                        const serviceIcon = servicesWithSubs[service].icon;
                        
                        return (
                            <div className="flex flex-row items-center" key={service}>
                                <li 
                                    className={`text-xl rounded-2xl border border-gray-200 shadow-sm px-4 py-1 cursor-pointer transition-all duration-300 ease-in-out flex items-center ${
                                        selectedService === service 
                                            ? "bg-main-green text-white border-main-green shadow-md" 
                                            : "bg-white text-darker-beige hover:shadow-xl hover:border-main-green hover:bg-main-green hover:text-white"
                                    }`}
                                    onClick={() => handleServiceChange(service)}
                                >
                                    {serviceIcon}
                                    {service}
                                </li>
                                {notificationCount > 0 && (
                                    <span className="text-main-beige bg-red-500 rounded-xs shadow-xl px-1.5 py-0.5 text-xs h-fit ml-[-8px]">
                                        {notificationCount}
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </ul>
                
                {/* Subservices section with gray border */}
                <div className="mt-16 mb-8 pb-6 border-b-[2px] border-gray-200 relative">
                    <div className="flex text-xl justify-between">
                        {servicesWithSubs[selectedService].subservices.map((subservice, index) => (
                            <div 
                                key={index} 
                                className="cursor-pointer relative pb-3"
                                onClick={() => setSelectedSubservice(subservice.name)}
                            >
                                <h4 className={`text-darker-beige ${selectedSubservice === subservice.name ? "font-medium" : "font-normal"}`}>
                                    {subservice.name}
                                </h4>

                                {/* Animated green underline */}
                                <span
                                    className={`absolute -bottom-[26px] left-0 w-full h-[2px] bg-secondary-green origin-center transition-transform duration-500 ease-in-out ${
                                        selectedSubservice === subservice.name ? "scale-x-100" : "scale-x-0"
                                    }`}
                                ></span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Description section */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-main-green mb-2">{currentSubservice.name}</h2>
                    <p className="text-darker-beige">{currentSubservice.description}</p>
                </div>

                {/* Dynamic content section */}
                <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
                    {currentSubservice.component}
                </div>
            </div>
        </div>
    );
};

export default Services;