'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useHeaderLogic from './hooks/userHeaderLogic'
import UserInfo from './user/UserInfo';
import SearchBar from './UI/SearchBar';
import NotificationIcon from './notifications/NotificationIcon';
import MenuIcon from './UI/MenuIcon';
import WelcomeBanner from './UI/WelcomeBanner';
import MobileMenuButton from './mobile/MobileMenuButton'
import UserDropdownMenu from './user/UserDropdownMenu';
import NotificationsDropdown from './notifications/NotificationsDropdown';


const Header = ({ isMobile = false, sidebarOpen = false, setSidebarOpen = () => {} }) => {
  const {
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
  } = useHeaderLogic();

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
          <MobileMenuButton
            isOpen={sidebarOpen}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          />
        )}
        
        {/* User Info Section */}
        <UserInfo isMobile={isMobile} />
        
        {/* Right Side Actions */}
        <div className={`
          flex items-center space-x-2 lg:space-x-4
          ${isMobile ? '' : 'justify-end w-full'}
        `}>
          {/* Search Bar - Hidden on mobile, visible on desktop */}
          {!isMobile && <SearchBar />}
          
          {/* Notifications */}
          <div ref={notificationRef}>
            <NotificationIcon
              isMobile={isMobile}
              unreadCount={unreadCount}
              onClick={() => setShowNotifications(!showNotifications)}
            />
            
            {showNotifications && (
              <NotificationsDropdown
                isMobile={isMobile}
                notifications={notifications}
                unreadCount={unreadCount}
                onMarkAsRead={markAsRead}
                onMarkAllAsRead={markAllAsRead}
              />
            )}
          </div>
          
          {/* User Menu */}
          <div ref={userMenuRef}>
            <div 
              className="cursor-pointer flex items-center p-1 lg:p-2"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <MenuIcon isMobile={isMobile} />
            </div>
            
            {showUserMenu && (
              <UserDropdownMenu
                isMobile={isMobile}
                onProfile={goToProfile}
                onSettings={goToSettings}
                onLogout={handleLogout}
              />
            )}
          </div>
        </div>
      </div>
      
      {/* Welcome Banner - Desktop only */}
      {!isMobile && <WelcomeBanner />}
    </header>
  );
};

export default Header;