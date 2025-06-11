import React from 'react';
import { getServicesConfig } from './config/getServicesConfig'
import useServicesLogic from './hooks/useServicesLogic';
import DesktopServicesNavigation from './desktop/DesktopServicesNavigation';
import MobileServicesDropdown from './mobile/MobileServicesDropdown';
import DesktopSubservicesNavigation from './desktop/DesktopSubservicesNavigation';
import MobileSubservicesDropdown from './mobile/MobileSubservicesDropdown';
import ServiceDescription from './UI/ServiceDescription';
import ContentWrapper from './UI/ContentWrapper';
const Services = () => {
  
    const servicesWithSubs = getServicesConfig();
  
  const {
    selectedService,
    selectedSubservice,
    isServiceMenuOpen,
    isSubMenuOpen,
    services,
    setIsServiceMenuOpen,
    setIsSubMenuOpen,
    handleServiceChange,
    handleSubserviceChange,
    getCurrentSubserviceObject,
    getNotificationCount
  } = useServicesLogic(servicesWithSubs);
  
  const currentSubservice = getCurrentSubserviceObject();
  const currentSubservices = servicesWithSubs[selectedService];
  
  return (
    <div className="bg-lighter-beige p-3 sm:p-4 lg:p-6 rounded-lg">
      <div className="w-full max-w-7xl mx-auto">
        {/* Desktop Services Navigation */}
        <DesktopServicesNavigation
          services={services}
          selectedService={selectedService}
          onServiceChange={handleServiceChange}
          getNotificationCount={getNotificationCount}
        />

        {/* Mobile Services Dropdown */}
        <MobileServicesDropdown
          services={services}
          selectedService={selectedService}
          onServiceChange={handleServiceChange}
          getNotificationCount={getNotificationCount}
          isOpen={isServiceMenuOpen}
          onToggle={() => setIsServiceMenuOpen(!isServiceMenuOpen)}
        />
        
        {/* Desktop Subservices Navigation */}
        <DesktopSubservicesNavigation
          subservices={currentSubservices}
          selectedSubservice={selectedSubservice}
          onSubserviceChange={handleSubserviceChange}
        />

        {/* Mobile Subservices Dropdown */}
        <MobileSubservicesDropdown
          subservices={currentSubservices}
          selectedSubservice={selectedSubservice}
          onSubserviceChange={handleSubserviceChange}
          isOpen={isSubMenuOpen}
          onToggle={() => setIsSubMenuOpen(!isSubMenuOpen)}
        />

        {/* Service Description */}
        <ServiceDescription
          title={currentSubservice.name}
          description={currentSubservice.description}
        />

        {/* Dynamic Content */}
        <ContentWrapper>
          {currentSubservice.component}
        </ContentWrapper>
      </div>
    </div>
  );
};

export default Services;