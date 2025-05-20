'use client'
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Sample notification data
const sampleNotifications = [
  {
    id: 1,
    title: "New purchase request",
    message: "A new purchase request has been submitted for approval",
    time: "10 minutes ago",
    read: false
  },
  {
    id: 2,
    title: "Validation required",
    message: "Request #550e84 requires your validation",
    time: "1 hour ago",
    read: false
  },
  {
    id: 3,
    title: "Reminder: Meeting",
    message: "Department meeting scheduled in 30 minutes",
    time: "2 hours ago",
    read: false
  },
  {
    id: 4,
    title: "Request approved",
    message: "Your office supplies request has been approved",
    time: "Yesterday",
    read: true
  },
  {
    id: 5,
    title: "System update",
    message: "The system will be unavailable for maintenance this weekend",
    time: "2 days ago",
    read: true
  }
];

const Header = () => {
    const router = useRouter();
    const [notifications, setNotifications] = useState(sampleNotifications);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const notificationRef = useRef(null);
    const userMenuRef = useRef(null);

    // Number of unread notifications
    const unreadCount = notifications.filter(notif => !notif.read).length;

    // Function to mark a notification as read
    const markAsRead = (id) => {
        setNotifications(notifications.map(notif => 
            notif.id === id ? { ...notif, read: true } : notif
        ));
    };

    // Function to mark all notifications as read
    const markAllAsRead = () => {
        setNotifications(notifications.map(notif => ({ ...notif, read: true })));
    };

    // Handle logout
    const handleLogout = () => {
        // In a real application, you would clear auth tokens, cookies, etc.
        router.push('/login');
    };

    // Handle navigation to settings
    const goToSettings = () => {
        router.push('/settings');
    };

    // Handle navigation to profile
    const goToProfile = () => {
        router.push('/profile');
    };

    // Close menus when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setShowUserMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="mt-14 bg-main-beige w-[95%]">
            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                    {/* User Avatar */}
                    <div className="h-12 w-12 rounded-full  text-main-beige flex items-center justify-center font-bold text-lg shadow-md mr-4">
                        <img src="/images/pp.png" alt="User Avatar" className="rounded-full w-full h-full object-cover" />

                    </div>
                    <h1 className="text-md text-gray-600">
                        <span className="font-bold text-2xl text-black ">Mohamed Salam </span><br />
                        Controlleur de Gestion
                    </h1>
                </div>
                <div className="flex justify-end w-full">
                    <div className="flex items-center mr-4">
                        <input type="text" placeholder="Search..." className="border border-gray-200 rounded-full text-center bg-white p-2 w-full" />
                    </div>
                    
                    {/* Notifications Icon */}
                    <div className="relative mr-4" ref={notificationRef}>
                        <div 
                            className="cursor-pointer flex items-center"
                            onClick={() => setShowNotifications(!showNotifications)}
                        >
                            <svg className="h-12.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#b0b0b0">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier"> 
                                    <path d="M19.3399 14.49L18.3399 12.83C18.1299 12.46 17.9399 11.76 17.9399 11.35V8.82C17.9399 6.47 16.5599 4.44 14.5699 3.49C14.0499 2.57 13.0899 2 11.9899 2C10.8999 2 9.91994 2.59 9.39994 3.52C7.44994 4.49 6.09994 6.5 6.09994 8.82V11.35C6.09994 11.76 5.90994 12.46 5.69994 12.82L4.68994 14.49C4.28994 15.16 4.19994 15.9 4.44994 16.58C4.68994 17.25 5.25994 17.77 5.99994 18.02C7.93994 18.68 9.97994 19 12.0199 19C14.0599 19 16.0999 18.68 18.0399 18.03C18.7399 17.8 19.2799 17.27 19.5399 16.58C19.7999 15.89 19.7299 15.13 19.3399 14.49Z" fill="#b0b0b0"></path> 
                                    <path d="M14.8297 20.01C14.4097 21.17 13.2997 22 11.9997 22C11.2097 22 10.4297 21.68 9.87969 21.11C9.55969 20.81 9.31969 20.41 9.17969 20C9.30969 20.02 9.43969 20.03 9.57969 20.05C9.80969 20.08 10.0497 20.11 10.2897 20.13C10.8597 20.18 11.4397 20.21 12.0197 20.21C12.5897 20.21 13.1597 20.18 13.7197 20.13C13.9297 20.11 14.1397 20.1 14.3397 20.07C14.4997 20.05 14.6597 20.03 14.8297 20.01Z" fill="#b0b0b0"></path>
                                </g>
                            </svg>
                            {unreadCount > 0 && (
                                <span className="absolute top-0 right-0 text-main-beige ml-[-20px] rounded-full bg-red-600 px-1.5 py-0.5 text-xs h-fit">
                                    {unreadCount}
                                </span>
                            )}
                        </div>
                        
                        {/* Notifications Dropdown */}
                        {showNotifications && (
                            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 overflow-hidden">
                                <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                                    <h3 className="font-semibold text-gray-700">Notifications</h3>
                                    {unreadCount > 0 && (
                                        <button 
                                            onClick={markAllAsRead}
                                            className="text-sm text-main-green hover:text-green-700 transition-colors"
                                        >
                                            Mark all as read
                                        </button>
                                    )}
                                </div>
                                
                                <div className="max-h-96 overflow-y-auto">
                                    {notifications.length > 0 ? (
                                        notifications.map((notification) => (
                                            <div 
                                                key={notification.id} 
                                                className={`p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${notification.read ? 'bg-white' : 'bg-green-50'}`}
                                                onClick={() => markAsRead(notification.id)}
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
                                        ))
                                    ) : (
                                        <div className="p-4 text-center text-gray-500">
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
                        )}
                    </div>

                    {/* Hamburger Menu Icon with Dropdown */}
                    <div className="relative" ref={userMenuRef}>
                        <div 
                            className="cursor-pointer flex items-center p-2"
                            onClick={() => setShowUserMenu(!showUserMenu)}
                        >
                            <svg className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        
                        {/* User dropdown menu */}
                        {showUserMenu && (
                            <div className="absolute right-0 mt-2 w-60 bg-white rounded-lg shadow-lg z-50 overflow-hidden">
                                <div className="p-4 border-b border-gray-200">
                                    <div className="flex items-center">
                                        <div className="h-12 w-12 rounded-full text-main-beige flex items-center justify-center font-bold text-lg mr-3">
                                            <img src="/images/pp.png" alt="User Avatar" className="rounded-full w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800">Mohamed Salam</h3>
                                            
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="py-1">
                                    <button 
                                        onClick={goToProfile}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                    >
                                        <svg className="w-5 h-5 mr-3 text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="currentColor"/>
                                            <path d="M12.0002 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z" fill="currentColor"/>
                                        </svg>
                                        My Profile
                                    </button>
                                    
                                    <button 
                                        onClick={goToSettings}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                    >
                                        <svg className="w-5 h-5 mr-3 text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="currentColor"/>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M13.2 3.06L13.8 3.5C14.4 3.9 15.2 3.7 15.6 3.1L16.5 1.8C16.9 1.2 17.7 1 18.3 1.4L20.6 2.8C21.2 3.2 21.4 4 21 4.6L20.1 6C19.7 6.6 19.9 7.4 20.5 7.8L21.1 8.2C21.7 8.6 22 9.3 22 10V12C22 12.7 21.7 13.4 21.1 13.8L20.5 14.2C19.9 14.6 19.7 15.4 20.1 16L21 17.4C21.4 18 21.2 18.8 20.6 19.2L18.3 20.6C17.7 21 16.9 20.8 16.5 20.2L15.6 18.9C15.2 18.3 14.4 18.1 13.8 18.5L13.2 18.9C12.6 19.3 11.9 19.6 11.2 19.6H10.8C10.1 19.6 9.39999 19.3 8.79999 18.9L8.19999 18.5C7.59999 18.1 6.79999 18.3 6.39999 18.9L5.49999 20.2C5.09999 20.8 4.29999 21 3.69999 20.6L1.39999 19.2C0.799988 18.8 0.599988 18 0.999988 17.4L1.89999 16C2.29999 15.4 2.09999 14.6 1.49999 14.2L0.899988 13.8C0.299988 13.4 -0.000012 12.7 -0.000012 12V10C-0.000012 9.3 0.299988 8.6 0.899988 8.2L1.49999 7.8C2.09999 7.4 2.29999 6.6 1.89999 6L0.999988 4.6C0.599988 4 0.799988 3.2 1.39999 2.8L3.69999 1.4C4.29999 1 5.09999 1.2 5.49999 1.8L6.39999 3.1C6.79999 3.7 7.59999 3.9 8.19999 3.5L8.79999 3.1C9.39999 2.7 10.1 2.4 10.8 2.4H11.2C11.9 2.4 12.6 2.7 13.2 3.06Z" fill="currentColor"/>
                                        </svg>
                                        Settings
                                    </button>

                                    <button 
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                    >
                                        <svg className="w-5 h-5 mr-3 text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z" fill="currentColor"/>
                                            <path d="M11 17H13V11H11V
Mohamed Salam
youssed.hejjioui-ext@um6p17ZM11 9H13V7H11V9Z" fill="currentColor"/>
                                        </svg>
                                        Help & Support
                                    </button>

                                    <div className="border-t border-gray-200 my-1"></div>
                                    
                                    <button 
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                                    >
                                        <svg className="w-5 h-5 mr-3 text-red-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" fill="currentColor"/>
                                            <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" fill="currentColor"/>
                                        </svg>
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="mt-10 flex justify-center bg-[url(/images/shcc.png)] bg-cover bg-center rounded-4xl shadow-lg">
                <h1 className="text-left w-full text-5xl text-main-beige font-bold m-20 align-middle ">
                    Welcome to <br/> the SHCC Portal
                </h1>
            </div>
        </header>
    );
};

export default Header;