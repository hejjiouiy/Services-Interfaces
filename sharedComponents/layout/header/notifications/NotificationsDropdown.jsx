import NotificationItem from './NotificationItem';
const NotificationsDropdown = ({ 
  isMobile, 
  notifications, 
  unreadCount, 
  onMarkAsRead, 
  onMarkAllAsRead 
}) => (
  <div className={`
    absolute right-0 mt-2 bg-white rounded-lg shadow-lg z-50 overflow-hidden
    ${isMobile ? 'w-72 max-w-[90vw]' : 'w-80'}
  `}>
    <div className="p-3 border-b border-gray-200 flex justify-between items-center">
      <h3 className="font-semibold text-gray-700 text-sm lg:text-base">Notifications</h3>
      {unreadCount > 0 && (
        <button 
          onClick={onMarkAllAsRead}
          className="text-xs lg:text-sm text-main-green hover:text-green-700 transition-colors"
        >
          Mark all as read
        </button>
      )}
    </div>
    
    <div className="max-h-96 overflow-y-auto">
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onMarkAsRead={onMarkAsRead}
          />
        ))
      ) : (
        <div className="p-4 text-center text-gray-500 text-sm">
          No notifications
        </div>
      )}
    </div>
    
    <div className="p-2 border-t border-gray-200 bg-gray-50">
      <button 
        className="w-full text-center py-2 text-sm text-main-green hover:text-green-700 transition-colors"
        onClick={() => console.log("View all notifications")}
      >
        View all notifications
      </button>
    </div>
  </div>
);
export default NotificationsDropdown;