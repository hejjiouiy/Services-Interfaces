import UserAvatar from "./UserAvatar";
import UserMenuItem from "./UserMenuItem";
const UserDropdownMenu = ({ isMobile, onProfile, onSettings, onLogout }) => (
  <div className={`
    absolute right-0 mt-2 bg-white rounded-lg shadow-lg z-50 overflow-hidden
    ${isMobile ? 'w-56 max-w-[90vw]' : 'w-60'}
  `}>
    <div className="p-4 border-b border-gray-200">
      <div className="flex items-center">
        <UserAvatar isMobile={isMobile} />
        <div>
          <h3 className="font-semibold text-gray-800 text-sm lg:text-base">Mohamed Salam</h3>
        </div>
      </div>
    </div>
    
    <div className="py-1">
      <UserMenuItem
        icon={
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="currentColor"/>
            <path d="M12.0002 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z" fill="currentColor"/>
          </svg>
        }
        text="My Profile"
        onClick={onProfile}
      />
      
      <UserMenuItem
        icon={
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8C13.1 8 14 8.9 14 10C14 11.1 13.1 12 12 12C10.9 12 10 11.1 10 10C10 8.9 10.9 8 12 8ZM12 14C13.1 14 14 14.9 14 16C14 17.1 13.1 18 12 18C10.9 18 10 17.1 10 16C10 14.9 10.9 14 12 14ZM12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" fill="currentColor"/>
          </svg>
        }
        text="Settings"
        onClick={onSettings}
      />
      
      <UserMenuItem
        icon={
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z" fill="currentColor"/>
            <path d="M11 17H13V11H11V17ZM11 9H13V7H11V9Z" fill="currentColor"/>
          </svg>
        }
        text="Help & Support"
        onClick={() => console.log("Help & Support")}
      />
      
      <div className="border-t border-gray-200 my-1"></div>
      
      <UserMenuItem
        icon={
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" fill="currentColor"/>
            <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" fill="currentColor"/>
          </svg>
        }
        text="Logout"
        onClick={onLogout}
        isLogout
      />
    </div>
  </div>
);
export default UserDropdownMenu;