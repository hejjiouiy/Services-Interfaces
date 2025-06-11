import React from 'react';
import DesktopServiceTab from './DesktopServiceTab';
const DesktopServicesNavigation = ({ services, selectedService, onServiceChange, getNotificationCount }) => {
  return (
    <div className="hidden lg:block">
      <ul className="flex flex-wrap justify-center xl:justify-between gap-3 my-4">
        {services.map((service) => (
          <DesktopServiceTab
            key={service}
            service={service}
            isSelected={selectedService === service}
            onClick={() => onServiceChange(service)}
            notificationCount={getNotificationCount(service)}
          />
        ))}
      </ul>
    </div>
  );
};
export default DesktopServicesNavigation;