'use client'
import React, { useState } from 'react';
import Card from '../componenets/card';
import App from 'next/app';
import Approved from '../componenets/approved';
import Form from '../componenets/form';

const Services = () => {
    const [selectedService, setSelectedService] = useState("Access");
    const [selectedSubservice, setSelectedSubservice] = useState("Access Demand");
    
    // Define services and their subservices
    const servicesWithSubs = {
        "Access": ["Access Demand", "Pending Demands", "Visitor Passes", "Conference Room Booking"],
        "Housing": ["Staff Accommodation", "Temporary Housing", "Housing Allowance", "Maintenance Requests"],
        "Catering": ["Event Catering", "Daily Meal Services", "Special Dietary Requests", "Cafeteria Services"],
        "Missions and Travel": ["Travel Booking", "Visa Assistance", "Expense Reimbursement", "Mission Approvals"],
        "Missions and": ["Travel Booking", "Visa Assistance", "Expense Reimbursement", "Mission Approvals"],
        "Missions  Travel": ["Travel Booking", "Visa Assistance", "Expense Reimbursement", "Mission Approvals"],
        " and Travel": ["Travel Booking", "Visa Assistance", "Expense Reimbursement", "Mission Approvals"],
    };
    
    // Get the list of all main services
    const services = Object.keys(servicesWithSubs);
    
    // When changing the main service, set the first subservice as selected
    const handleServiceChange = (service) => {
        setSelectedService(service);
        setSelectedSubservice(servicesWithSubs[service][0]);
    };
    
    return (
        <div className="bg-lighter-beige p-4 rounded-lg">
            <div className="w-[95%] ">
                {/* Main services navigation */}
                <ul className="flex flex-row justify-between my-4">
                    {services.map((service) => (
                        <div className="flex flex-row items-center" key={service}>
                        <li 
                            key={service} 
                            className={`text-xl rounded-2xl border border-gray-200 shadow-sm px-4 py-1 cursor-pointer transition-all duration-300 ease-in-out ${
                                selectedService === service 
                                    ? "bg-main-green text-white border-main-green shadow-md" 
                                    : "bg-white text-darker-beige hover:shadow-xl hover:border-main-green hover:bg-main-green hover:text-white"
                            }`}
                            onClick={() => handleServiceChange(service)}
                        >
                            {service}
                        </li>
                        <span className="text-main-beige bg-red-500 rounded-xs shadow-xl px-1.5 py-0.5 text-xs h-fit ml-[-8px]">
                            5
                        </span>
                        </div>
                    ))}
                </ul>
                
                {/* Subservices section with gray border */}
<div className="mt-16 mb-8 pb-6 border-b-[2px] border-gray-200 relative">
    <div className="flex text-xl justify-between">
        {servicesWithSubs[selectedService].map((subservice, index) => (
            <div 
                key={index} 
                className="cursor-pointer relative pb-3"
                onClick={() => setSelectedSubservice(subservice)}
            >
                <h4 className={`text-darker-beige ${selectedSubservice === subservice ? "font-medium" : "font-normal"}`}>
                    {subservice}
                </h4>

                {/* Animated green underline */}
                <span
                    className={`absolute -bottom-[26px] left-0 w-full h-[2px] bg-secondary-green origin-center transition-transform duration-500 ease-in-out ${
                        selectedSubservice === subservice ? "scale-x-100" : "scale-x-0"
                    }`}
                ></span>
            </div>
        ))}
    </div>
</div>

            <Card/>
            <Approved/>

            </div>
        </div>
    );
};

export default Services;