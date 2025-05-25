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

const Header = ({ isMobile = false, sidebarOpen = false, setSidebarOpen = () => {} }) => {
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
        <header className={`
            bg-main-beige w-full
            ${isMobile 
                ? 'fixed top-0 left-0 right-0 z-30 px-4 py-3 shadow-md' 
                : 'mt-8 lg:mt-14 px-4 lg:px-6'
            }
        `}>
            <div className={`
                ${isMobile 
                    ? 'flex items-center justify-between' 
                    : 'grid grid-cols-1 lg:grid-cols-2 gap-4'
                }
            `}>
                {/* Mobile Menu Button */}
                {isMobile && (
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 bg-main-green text-main-beige rounded-md shadow-lg hover:bg-main-green/90 transition-colors duration-200"
                        aria-label="Toggle menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                        </svg>
                    </button>
                )}
                
                {/* User Info Section */}
                <div className={`
                    flex items-center
                    ${isMobile ? 'flex-1 mx-4' : ''}
                `}>
                    {/* User Avatar */}
                    <div className={`
                        rounded-full text-main-beige flex items-center justify-center font-bold shadow-md mr-3
                        ${isMobile ? 'h-8 w-8' : 'h-10 w-10 lg:h-12 lg:w-12'}
                    `}>
                        <img 
                            src="/images/pp.png" 
                            alt="User Avatar" 
                            className="rounded-full w-full h-full object-cover" 
                        />
                    </div>
                    
                    {/* User Name and Title - Hidden on small mobile */}
                    <div className={`${isMobile ? ' sm:block' : ''}`}>
                        <h1 className={`text-gray-600 ${isMobile ? 'text-sm' : 'text-sm lg:text-md'}`}>
                            <span className={`font-bold text-black ${isMobile ? 'text-base' : 'text-lg lg:text-2xl'}`}>
                                Mohamed Salam
                            </span>
                            {!isMobile && <br />}
                            <span className={isMobile ? 'block text-xs' : ''}>
                                Controlleur de Gestion
                            </span>
                        </h1>
                    </div>
                </div>
                
                {/* Right Side Actions */}
                <div className={`
                    flex items-center space-x-2 lg:space-x-4
                    ${isMobile ? '' : 'justify-end w-full'}
                `}>
                    {/* Search Bar - Hidden on mobile, visible on desktop */}
                    {!isMobile && (
                        <div className="flex items-center mr-4 flex-1 max-w-md">
                            <input 
                                type="text" 
                                placeholder="Search..." 
                                className="border border-gray-200 rounded-full text-center bg-white p-2 w-full text-sm lg:text-base" 
                            />
                        </div>
                    )}
                    
                    {/* Notifications Icon */}
                    <div className="relative" ref={notificationRef}>
                        <div 
                            className="cursor-pointer flex items-center p-1"
                            onClick={() => setShowNotifications(!showNotifications)}
                        >
                            <svg className={`${isMobile ? 'h-8 w-8' : 'h-10 w-10 lg:h-12'}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#b0b0b0">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier"> 
                                    <path d="M19.3399 14.49L18.3399 12.83C18.1299 12.46 17.9399 11.76 17.9399 11.35V8.82C17.9399 6.47 16.5599 4.44 14.5699 3.49C14.0499 2.57 13.0899 2 11.9899 2C10.8999 2 9.91994 2.59 9.39994 3.52C7.44994 4.49 6.09994 6.5 6.09994 8.82V11.35C6.09994 11.76 5.90994 12.46 5.69994 12.82L4.68994 14.49C4.28994 15.16 4.19994 15.9 4.44994 16.58C4.68994 17.25 5.25994 17.77 5.99994 18.02C7.93994 18.68 9.97994 19 12.0199 19C14.0599 19 16.0999 18.68 18.0399 18.03C18.7399 17.8 19.2799 17.27 19.5399 16.58C19.7999 15.89 19.7299 15.13 19.3399 14.49Z" fill="#b0b0b0"></path> 
                                    <path d="M14.8297 20.01C14.4097 21.17 13.2997 22 11.9997 22C11.2097 22 10.4297 21.68 9.87969 21.11C9.55969 20.81 9.31969 20.41 9.17969 20C9.30969 20.02 9.43969 20.03 9.57969 20.05C9.80969 20.08 10.0497 20.11 10.2897 20.13C10.8597 20.18 11.4397 20.21 12.0197 20.21C12.5897 20.21 13.1597 20.18 13.7197 20.13C13.9297 20.11 14.1397 20.1 14.3397 20.07C14.4997 20.05 14.6597 20.03 14.8297 20.01Z" fill="#b0b0b0"></path>
                                </g>
                            </svg>
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 text-main-beige rounded-full bg-red-600 px-1.5 py-0.5 text-xs h-fit min-w-[20px] text-center">
                                    {unreadCount}
                                </span>
                            )}
                        </div>
                        
                        {/* Notifications Dropdown */}
                        {showNotifications && (
                            <div className={`
                                absolute right-0 mt-2 bg-white rounded-lg shadow-lg z-50 overflow-hidden
                                ${isMobile ? 'w-72 max-w-[90vw]' : 'w-80'}
                            `}>
                                <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                                    <h3 className="font-semibold text-gray-700 text-sm lg:text-base">Notifications</h3>
                                    {unreadCount > 0 && (
                                        <button 
                                            onClick={markAllAsRead}
                                            className="text-xs lg:text-sm text-main-green hover:text-green-700 transition-colors"
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
                        )}
                    </div>
                    
                    {/* User Menu */}
                    <div className="relative" ref={userMenuRef}>
                        <div 
                            className="cursor-pointer flex items-center p-1 lg:p-2"
                            onClick={() => setShowUserMenu(!showUserMenu)}
                        >
                            <svg className={`text-gray-700 ${isMobile ? 'w-5 h-5' : 'w-6 h-6'}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        
                        {/* User dropdown menu */}
                        {showUserMenu && (
                            <div className={`
                                absolute right-0 mt-2 bg-white rounded-lg shadow-lg z-50 overflow-hidden
                                ${isMobile ? 'w-56 max-w-[90vw]' : 'w-60'}
                            `}>
                                <div className="p-4 border-b border-gray-200">
                                    <div className="flex items-center">
                                        <div className={`rounded-full text-main-beige flex items-center justify-center font-bold mr-3 ${isMobile ? 'h-10 w-10' : 'h-12 w-12'}`}>
                                            <img src="/images/pp.png" alt="User Avatar" className="rounded-full w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800 text-sm lg:text-base">Mohamed Salam</h3>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="py-1">
                                    <button 
                                        onClick={goToProfile}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                    >
                                        <svg className="w-4 h-4 lg:w-5 lg:h-5 mr-3 text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="currentColor"/>
                                            <path d="M12.0002 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z" fill="currentColor"/>
                                        </svg>
                                        My Profile
                                    </button>
                                    
                                    <button 
                                        onClick={goToSettings}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                    >
                                        <svg className="w-4 h-4 lg:w-5 lg:h-5 mr-3 text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 8C13.1 8 14 8.9 14 10C14 11.1 13.1 12 12 12C10.9 12 10 11.1 10 10C10 8.9 10.9 8 12 8ZM12 14C13.1 14 14 14.9 14 16C14 17.1 13.1 18 12 18C10.9 18 10 17.1 10 16C10 14.9 10.9 14 12 14ZM12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" fill="currentColor"/>
                                        </svg>
                                        Settings
                                    </button>
                                    
                                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                                        <svg className="w-4 h-4 lg:w-5 lg:h-5 mr-3 text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z" fill="currentColor"/>
                                            <path d="M11 17H13V11H11V17ZM11 9H13V7H11V9Z" fill="currentColor"/>
                                        </svg>
                                        Help & Support
                                    </button>
                                    
                                    <div className="border-t border-gray-200 my-1"></div>
                                    
                                    <button 
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                                    >
                                        <svg className="w-4 h-4 lg:w-5 lg:h-5 mr-3 text-red-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            
            {/* Welcome Banner - Responsive */}
            {!isMobile && (
                <div className="mt-6 lg:mt-10 flex justify-center bg-[url(/images/shcc.png)] bg-cover bg-center rounded-2xl lg:rounded-4xl shadow-lg">
                    <h1 className="text-left w-full text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-main-beige font-bold p-8 sm:p-12 lg:p-16 xl:p-20 align-middle">
                        Welcome to <br/> the SHCC Portal
                    </h1>
                </div>
            )}
        </header>
    );
};

export default Header;