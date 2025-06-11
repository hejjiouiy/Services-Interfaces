const SidebarContainer = ({ 
  isMobile, 
  isSidebarOpen, 
  children 
}) => (
  <aside className={`
    fixed top-0 left-0 bg-main-beige text-main-green overflow-y-auto z-10
    transition-all duration-300 ease-in-out
    ${isMobile
      ? `w-80 ${isSidebarOpen ? 'translate-x-0 z-200' : '-translate-x-full'} h-screen`
      : 'w-72 h-screen'
    }
  `}>
    <nav className="flex flex-col items-start justify-start p-4">
      {children}
    </nav>
  </aside>
);
export default SidebarContainer;