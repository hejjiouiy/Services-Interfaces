'use client'
import React, { useState } from 'react';
import Card from '../components/card';
import Approved from '../components/approved';
import Form from '../components/form';
import MissionRequestForm from '../../app/Services/gestionDeplacements/components/MissionRequestForm';
import MissionsDataTable from '../../app/Services/gestionDeplacements/components/MissionsDataTable';
import MissionsCardView from '../../app/Services/gestionDeplacements/components/MissionsCardView';
import MissionsAnalysisPage from '../../app/Services/gestionDeplacements/components/MissionsAnalysisPage';
import PowerBIAnalysisPage from '../../app/Services/gestionDeplacements/components/PowerBIAnalysisPage';

const Services = () => {
    const [selectedService, setSelectedService] = useState("Missions and Travel");
    const [selectedSubservice, setSelectedSubservice] = useState("Booking Form");
    
    // Define services and their subservices with component mappings
    const servicesWithSubs = {
        "Missions and Travel": [
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
        ],
        "Access": [
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
        ],
        "Housing": [
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
        ],
        "Catering": [
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
        ],
        
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
        setSelectedSubservice(servicesWithSubs[service][0].name);
    };

    // Get the current subservice object
    const getCurrentSubserviceObject = () => {
        return servicesWithSubs[selectedService].find(sub => sub.name === selectedSubservice);
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
                        
                        return (
                            <div className="flex flex-row items-center" key={service}>
                                <li 
                                    className={`text-xl rounded-2xl border border-gray-200 shadow-sm px-4 py-1 cursor-pointer transition-all duration-300 ease-in-out ${
                                        selectedService === service 
                                            ? "bg-main-green text-white border-main-green shadow-md" 
                                            : "bg-white text-darker-beige hover:shadow-xl hover:border-main-green hover:bg-main-green hover:text-white"
                                    }`}
                                    onClick={() => handleServiceChange(service)}
                                >
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
                        {servicesWithSubs[selectedService].map((subservice, index) => (
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