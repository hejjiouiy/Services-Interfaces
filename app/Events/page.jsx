'use client'
import React, { useState, useEffect } from 'react';
import EventRequestForm from './moduleComponents/EventRequestForm';
import EventRequestList from './moduleComponents/EventRequestList';
import EventValidationPanel from './moduleComponents/EventValidationPanel';
import EventStatusManager from './moduleComponents/EventStatusManager';
import ApprovedEventsList from './moduleComponents/ApprovedEventsList';

const EventPage = () => {
  const [selectedSection, setSelectedSection] = useState("Submit Request");
  const [isSectionMenuOpen, setIsSectionMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const sections = [
    {
      name: "Submit Request",
      component: <EventRequestForm />,
      description: "Submit a new event request.",
      notification: 0
    },
    {
      name: "My Requests",
      component: <EventRequestList />,
      description: "View and track your submitted event requests.",
      notification: 0
    },
    {
      name: "Validation",
      component: <EventValidationPanel />,
      description: "Review and validate submitted event requests.",
      notification: 2
    },
    {
      name: "Status Management",
      component: <EventStatusManager />,
      description: "Update the status of approved events.",
      notification: 1
    },
    {
      name: "Approved Events",
      component: <ApprovedEventsList />,
      description: "List of validated and published events.",
      notification: 0
    }
  ];

  const currentSection = sections.find(section => section.name === selectedSection);

  return (
    <div className="bg-lighter-beige p-3 sm:p-4 lg:p-6 rounded-lg mt-8">
      <div className="w-full max-w-7xl mx-auto">

        {/* Onglets desktop */}
        <div className="hidden md:block mb-6 pb-6 border-b-[2px] border-gray-200 relative">
          <div className="flex flex-wrap justify-center lg:justify-between gap-4 lg:gap-8 text-lg lg:text-xl">
            {sections.map((section, index) => (
              <div
                key={index}
                className="cursor-pointer relative pb-3 flex flex-col items-center transition-all duration-300 hover:scale-105"
                onClick={() => setSelectedSection(section.name)}
              >
                <div className="flex items-center relative">
                  <h4 className={`mb-2 text-darker-beige whitespace-nowrap ${selectedSection === section.name ? "font-bold text-main-green" : "font-normal hover:text-main-green"}`}>
                    {section.name}
                  </h4>
                  {section.notification > 0 && (
                    <span className="absolute -top-2 -right-6 text-main-beige bg-red-500 rounded-full shadow-xl px-1.5 py-0.5 text-xs z-10">
                      {section.notification}
                    </span>
                  )}
                </div>
                <span
                  className={`absolute -bottom-[26px] left-0 w-full h-[2px] bg-secondary-green origin-center transition-transform duration-500 ease-in-out ${selectedSection === section.name ? "scale-x-100" : "scale-x-0"
                    }`}
                ></span>
              </div>
            ))}
          </div>
        </div>

        {/* Onglets mobile */}
        <div className="md:hidden relative mb-6">
          <button
            onClick={() => setIsSectionMenuOpen(!isSectionMenuOpen)}
            className="w-full flex justify-between items-center px-4 py-3 rounded-xl border border-gray-200 shadow-sm bg-white text-darker-beige hover:shadow-xl hover:border-main-green transition-all duration-300"
          >
            <div className="flex items-center">
              <span className="text-lg font-medium">{selectedSection}</span>
              {currentSection.notification > 0 && (
                <span className="text-main-beige bg-red-500 rounded-full shadow-xl px-2 py-1 text-xs ml-2">
                  {currentSection.notification}
                </span>
              )}
            </div>
            <svg
              className={`w-5 h-5 transition-transform duration-300 ${isSectionMenuOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isSectionMenuOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-30 max-h-60 overflow-y-auto">
              {sections.map((section, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedSection(section.name);
                    setIsSectionMenuOpen(false);
                  }}
                  className={`w-full flex justify-between items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 cursor-pointer relative ${selectedSection === section.name ? 'bg-main-green/10 text-main-green font-medium' : 'text-darker-beige'
                    }`}
                >
                  <span>{section.name}</span>
                  {section.notification > 0 && (
                    <span className="text-main-beige bg-red-500 rounded-full px-2 py-1 text-xs">
                      {section.notification}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Titre + description */}
        <div className="mb-6 px-2">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-main-green mb-2 leading-tight">
            {currentSection.name}
          </h2>
          <p className="text-darker-beige text-sm sm:text-base lg:text-lg leading-relaxed">
            {currentSection.description}
          </p>
        </div>

        {/* Contenu dynamique */}
        <div className="mt-6 lg:mt-8 bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
          {currentSection.component}
        </div>
      </div>
    </div>
  );
};

export default EventPage;
