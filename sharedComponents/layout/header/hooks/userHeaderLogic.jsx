import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import sampleNotifications from '../data/sampleNotifications'

const useHeaderLogic = () => {
  const router = useRouter();
const [notifications, setNotifications] = useState(sampleNotifications || []);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const notificationRef = useRef(null);
  const userMenuRef = useRef(null);
  
  const unreadCount = notifications.filter(notif => !notif.read).length;
  
  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };
  
  const handleLogout = () => {
    router.push('/login');
  };
  
  const goToSettings = () => {
    router.push('/settings');
  };
  
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

  return {
    notifications,
    showNotifications,
    showUserMenu,
    notificationRef,
    userMenuRef,
    unreadCount,
    setShowNotifications,
    setShowUserMenu,
    markAsRead,
    markAllAsRead,
    handleLogout,
    goToSettings,
    goToProfile
  };
};

export default useHeaderLogic;