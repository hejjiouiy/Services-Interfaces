import NotificationBadge from "../UI/NotificationBadge";
import DropdownArrow from "../UI/DropdownArrow";
const MobileServicesDropdown = ({ 
  services, 
  selectedService, 
  onServiceChange, 
  getNotificationCount, 
  isOpen, 
  onToggle 
}) => {
  return (
    <div className="lg:hidden relative mb-6">
      <button
        onClick={onToggle}
        className={`w-full flex justify-between items-center px-4 py-3 rounded-xl border border-gray-200 shadow-sm text-left transition-all duration-300 ${
          selectedService 
            ? "bg-main-green text-white border-main-green shadow-md" 
            : "bg-white text-darker-beige hover:shadow-xl hover:border-main-green"
        }`}
      >
        <div className="flex items-center">
          <span className="text-lg font-medium">{selectedService}</span>
          <NotificationBadge count={getNotificationCount(selectedService)} />
        </div>
        <DropdownArrow isOpen={isOpen} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-20 max-h-60 overflow-y-auto">
          {services.map((service) => {
            const notificationCount = getNotificationCount(service);
            return (
              <button
                key={service}
                onClick={() => onServiceChange(service)}
                className={`w-full flex justify-between items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 relative ${
                  selectedService === service ? 'bg-main-green/10 text-main-green font-medium' : 'text-darker-beige'
                }`}
              >
                <span>{service}</span>
                {notificationCount > 0 && (
                  <span className="text-main-beige bg-red-500 rounded-full px-2 py-1 text-xs relative">
                    {notificationCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MobileServicesDropdown;
