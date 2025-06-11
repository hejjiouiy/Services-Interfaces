import NotificationBadge from '../UI/NotificationBadge'
const DesktopServiceTab = ({ service, isSelected, onClick, notificationCount }) => {
  return (
    <div className="flex flex-row items-center">
      <li 
        className={`text-lg xl:text-xl rounded-2xl border border-gray-200 shadow-sm px-4 py-2 cursor-pointer transition-all duration-300 ease-in-out whitespace-nowrap ${
          isSelected 
            ? "bg-main-green text-white border-main-green shadow-md transform scale-105" 
            : "bg-white text-darker-beige hover:shadow-xl hover:border-main-green hover:bg-main-green hover:text-white hover:scale-105"
        }`}
        onClick={onClick}
      >
        {service}
      </li>
      <NotificationBadge count={notificationCount} />
    </div>
  );
};

export default DesktopServiceTab;