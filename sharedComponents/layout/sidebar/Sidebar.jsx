import MobileMenuButton from "./mobile/MobileMenuButton";
import SidebarBackdrop from "./mobile/SidebarBackdrop";
import SidebarContainer from "./UI/SidebarContainer";
import Logo from "./UI/Logo";
import NavigationLinksContainer from "./navigation/NavigationLinksContainer";
import useSidebarLogic from "./hooks/useSidebarLogic";
import { getNavigationConfig } from "./config/navigationConfig";
import { handleLogout } from "../../../utils/authHelpers";
const Sidebar = () => {
  const mainLinks = getNavigationConfig();
  
  const {
    pathname,
    expandedMenu,
    isSidebarOpen,
    isMobile,
    toggleMenu,
    toggleSidebar,
    closeSidebar,
    handleLogout,
    isMenuActive
  } = useSidebarLogic(mainLinks);

  return (
    <>
      <MobileMenuButton onClick={toggleSidebar} />
      
      <SidebarBackdrop 
        isVisible={isMobile && isSidebarOpen} 
        onClose={closeSidebar} 
      />

      <SidebarContainer 
        isMobile={isMobile} 
        isSidebarOpen={isSidebarOpen}
      >
        <Logo isMobile={isMobile} onClose={closeSidebar} />
        
        <NavigationLinksContainer
          links={mainLinks}
          expandedMenu={expandedMenu}
          pathname={pathname}
          onToggleMenu={toggleMenu}
          onClose={closeSidebar}
          onLogout={handleLogout}
          isMenuActive={isMenuActive}
        />
      </SidebarContainer>
    </>
  );
};

export default Sidebar;