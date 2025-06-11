import { useState, useEffect, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const useSidebarLogic = (mainLinks) => {
  const pathname = usePathname();
  const router = useRouter();
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Effect to check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Effect to manage expanded menu based on current pathname - only auto-expand when on matching sub-links
  useEffect(() => {
    const dashboardLink = mainLinks[0];
    const isCurrentPathDashboardSubLink = dashboardLink.subLinks && 
      dashboardLink.subLinks.some(sub => sub.path === pathname);

    // Only auto-expand if user is currently on a sub-link page
    if (isCurrentPathDashboardSubLink) {
      setExpandedMenu(dashboardLink.name);
    }
    // Don't auto-collapse when navigating to other pages - let user control it manually
  }, [pathname, mainLinks]);

  const toggleMenu = useCallback((menuName) => {
    setExpandedMenu(prevMenu => (prevMenu === menuName ? null : menuName));
  }, []);

  // Helper function to check if a menu item should show as active
  const isMenuActive = useCallback((link) => {
    if (link.subLinks) {
      return link.subLinks.some(sub => pathname === sub.path);
    }
    return pathname === link.path;
  }, [pathname]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [isMobile]);

  const handleLogout = useCallback(() => {
    router.push('/login');
    closeSidebar();
  }, [router, closeSidebar]);

  return {
    pathname,
    expandedMenu,
    isSidebarOpen,
    isMobile,
    toggleMenu,
    toggleSidebar,
    closeSidebar,
    handleLogout,
    isMenuActive
  };
};
export default useSidebarLogic;