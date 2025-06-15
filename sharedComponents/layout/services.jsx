'use client'
import React, { useState } from 'react';
import Card from '../components/card';
import Approved from '../components/approved';
import Form from '../components/form';
import MissionRequestForm from '../../app/Process/Missions/moduleComponents/MissionRequestForm';
import MissionsDataTable from '../../app/Process/Missions/moduleComponents/MissionsDataTable';
import MissionsCardView from '../../app/Process/Missions/moduleComponents/MissionsCardView';
import MissionsAnalysisPage from '../../app/Process/Missions/moduleComponents/MissionsAnalysisPage';
import PowerBIAnalysisPage from '../../app/Process/Missions/moduleComponents/PowerBIAnalysisPage';
import EventRequestForm from '../../app/Events/moduleComponents/EventRequestForm';
import EventRequestList from '../../app/Events/moduleComponents/EventRequestList';
import EventValidationPanel from '../../app/Events/moduleComponents/EventValidationPanel';
import EventStatusManager from '../../app/Events/moduleComponents/EventStatusManager';
import ApprovedEventsList from '../../app/Events/moduleComponents/ApprovedEventsList';
import HousingRequestForm from '../../app/Process/Housing/moduleComponents/HousingRequestForm';
import HousingRequestList from '../../app/Process/Housing/moduleComponents/HousingRequestList';
import HousingValidationPanel from '../../app/Process/Housing/moduleComponents/HousingValidationPanel';
import HousingAssignmentPanel from '../../app/Process/Housing/moduleComponents/HousingAssignmentPanel';
import HousingGuestManager from '../../app/Process/Housing/moduleComponents/HousingGuestManager';



const Services = () => {
    const [selectedService, setSelectedService] = useState("Missions and Travel");
    const [selectedSubservice, setSelectedSubservice] = useState("Booking Form");
    const [isServiceMenuOpen, setIsServiceMenuOpen] = useState(false);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

    // Define services and their subservices with component mappings
    const servicesWithSubs = {
        "Missions and Travel": [
            {
                name: "Booking Form",
                component: <MissionRequestForm />,
                description: "Book flights, accommodations, and transportation"
            },
            {
                name: "Requests",
                component: <MissionsDataTable />,
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
                component: <MissionsAnalysisPage />,
                description: "Request and track mission approvals"
            }
        ],
        "Housing": [
            {
                name: "Submit Request",
                component: <HousingRequestForm />,
                description: "Submit a new accommodation request for yourself or guests"
            },
            {
                name: "My Requests",
                component: <HousingRequestList />,
                description: "View and track your submitted requests"
            },
            {
                name: "Validation Panel",
                component: <HousingValidationPanel />,
                description: "Review and approve/reject pending requests"
            },
            {
                name: "Assignment & Budget",
                component: <HousingAssignmentPanel />,
                description: "Assign housing and attach a budget line"
            },
            {
                name: "Guest Reservations",
                component: <HousingGuestManager />,
                description: "Create and manage guest reservations"
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
        ]
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
        setIsServiceMenuOpen(false);
        setIsSubMenuOpen(false);
    };

    // Get the current subservice object
    const getCurrentSubserviceObject = () => {
        return servicesWithSubs[selectedService].find(sub => sub.name === selectedSubservice);
    };

    // Get component for selected subservice
    const currentSubservice = getCurrentSubserviceObject();

    return (
        <div className="bg-lighter-beige p-3 sm:p-4 lg:p-6 rounded-lg">
            <div className="w-full max-w-7xl mx-auto">
                {/* Desktop - Main services navigation */}
                <div className="hidden lg:block">
                    <ul className="flex flex-wrap justify-center xl:justify-between gap-3 my-4">
                        {services.map((service) => {
                            const notificationCount = getNotificationCount(service);

                            return (
                                <div className="flex flex-row items-center" key={service}>
                                    <li
                                        className={`text-lg xl:text-xl rounded-2xl border border-gray-200 shadow-sm px-4 py-2 cursor-pointer transition-all duration-300 ease-in-out whitespace-nowrap ${selectedService === service
                                                ? "bg-main-green text-white border-main-green shadow-md transform scale-105"
                                                : "bg-white text-darker-beige hover:shadow-xl hover:border-main-green hover:bg-main-green hover:text-white hover:scale-105"
                                            }`}
                                        onClick={() => handleServiceChange(service)}
                                    >
                                        {service}
                                    </li>
                                    {notificationCount > 0 && (
                                        <span className="text-main-beige bg-red-500 rounded-full shadow-xl px-2 py-1 text-xs h-fit ml-[-8px] min-w-[20px] text-center z-10">
                                            {notificationCount}
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </ul>
                </div>

                {/* Mobile/Tablet - Main services dropdown */}
                <div className="lg:hidden relative mb-6">
                    <button
                        onClick={() => setIsServiceMenuOpen(!isServiceMenuOpen)}
                        className={`w-full flex justify-between items-center px-4 py-3 rounded-xl border border-gray-200 shadow-sm text-left transition-all duration-300 ${selectedService
                                ? "bg-main-green text-white border-main-green shadow-md"
                                : "bg-white text-darker-beige hover:shadow-xl hover:border-main-green"
                            }`}
                    >
                        <div className="flex items-center">
                            <span className="text-lg font-medium">{selectedService}</span>
                            {getNotificationCount(selectedService) > 0 && (
                                <span className="text-main-beige bg-red-500 rounded-full shadow-xl px-2 py-1 text-xs ml-2">
                                    {getNotificationCount(selectedService)}
                                </span>
                            )}
                        </div>
                        <svg
                            className={`w-5 h-5 transition-transform duration-300 ${isServiceMenuOpen ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {/* Services dropdown menu */}
                    {isServiceMenuOpen && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-20 max-h-60 overflow-y-auto">
                            {services.map((service) => {
                                const notificationCount = getNotificationCount(service);
                                return (
                                    <button
                                        key={service}
                                        onClick={() => handleServiceChange(service)}
                                        className={`w-full flex justify-between items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 relative ${selectedService === service ? 'bg-main-green/10 text-main-green font-medium' : 'text-darker-beige'
                                            }`}
                                    >
                                        <span>{service}</span>
                                        {notificationCount > 0 && (
                                            <span className="text-main-beige bg-red-500 rounded-full px-2 py-1 text-xs relative ">
                                                {notificationCount}
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Desktop - Subservices section */}
                <div className="hidden md:block mt-8 lg:mt-16 mb-8 pb-6 border-b-[2px] border-gray-200 relative">
                    <div className="flex flex-wrap justify-center lg:justify-between gap-4 lg:gap-8 text-lg lg:text-xl">
                        {servicesWithSubs[selectedService].map((subservice, index) => (
                            <div
                                key={index}
                                className="cursor-pointer relative pb-3 transition-all duration-300 hover:scale-105"
                                onClick={() => setSelectedSubservice(subservice.name)}
                            >
                                <h4 className={`text-darker-beige whitespace-nowrap ${selectedSubservice === subservice.name ? "font-medium text-main-green" : "font-normal hover:text-main-green"
                                    }`}>
                                    {subservice.name}
                                </h4>

                                {/* Animated green underline */}
                                <span
                                    className={`absolute bottom-0 left-0 w-full h-[2px] bg-secondary-green origin-center transition-transform duration-500 ease-in-out ${selectedSubservice === subservice.name ? "scale-x-100" : "scale-x-0"
                                        }`}
                                ></span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile/Tablet - Subservices dropdown */}
                <div className="md:hidden relative mb-6">
                    <button
                        onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
                        className="w-full flex justify-between items-center px-4 py-3 rounded-xl border border-gray-200 shadow-sm bg-white text-darker-beige hover:shadow-xl hover:border-main-green transition-all duration-300"
                    >
                        <span className="text-lg font-medium">{selectedSubservice}</span>
                        <svg
                            className={`w-5 h-5 transition-transform duration-300 ${isSubMenuOpen ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {/* Subservices dropdown menu */}
                    {isSubMenuOpen && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-0 max-h-60 overflow-y-auto">
                            {servicesWithSubs[selectedService].map((subservice, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setSelectedSubservice(subservice.name);
                                        setIsSubMenuOpen(false);
                                    }}
                                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 ${selectedSubservice === subservice.name ? 'bg-main-green/10 text-main-green font-medium' : 'text-darker-beige'
                                        }`}
                                >
                                    {subservice.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Description section */}
                <div className="mb-6 px-2">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-main-green mb-2 leading-tight">
                        {currentSubservice.name}
                    </h2>
                    <p className="text-darker-beige text-sm sm:text-base lg:text-lg leading-relaxed">
                        {currentSubservice.description}
                    </p>
                </div>

                {/* Dynamic content section */}
                <div className="mt-6 lg:mt-8 bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                    {currentSubservice.component}
                </div>
            </div>
        </div>
    );
};

export default Services;