const NotificationItem = ({ notification, onMarkAsRead }) => (
  <div 
    className={`p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${notification.read ? 'bg-white' : 'bg-green-50'}`}
    onClick={() => onMarkAsRead(notification.id)}
  >
    <div className="flex items-start">
      <div className={`w-2 h-2 mt-2 rounded-full mr-2 ${notification.read ? 'bg-transparent' : 'bg-main-green'}`}></div>
      <div className="flex-1">
        <h4 className="text-sm font-medium text-gray-800">{notification.title}</h4>
        <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
        <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
      </div>
    </div>
  </div>
);
export default NotificationItem;