import React , {useState} from 'react'

const useServicesLogic = (servicesWithSubs) => {
  const [selectedService, setSelectedService] = useState("Missions and Travel");
  const [selectedSubservice, setSelectedSubservice] = useState("Booking Form");
  const [isServiceMenuOpen, setIsServiceMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  
  // Helper function to get notification count for a service
  const getNotificationCount = (service) => {
    const counts = {
      "Access": 5,
      "Housing": 2,
      "Catering": 0,
      "Missions and Travel": 3,
      "Events": 1
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

  // Handle subservice change
  const handleSubserviceChange = (subservice) => {
    setSelectedSubservice(subservice);
    setIsSubMenuOpen(false);
  };

  // Get the current subservice object
  const getCurrentSubserviceObject = () => {
    return servicesWithSubs[selectedService].find(sub => sub.name === selectedSubservice);
  };
  
  return {
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
  };
};

export default useServicesLogic;