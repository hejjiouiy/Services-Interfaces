import SimpleNavigationLink from "./SimpleNavigationLink";
import NavigationLinkWithSubs from "./NavigationLinkWithSubs";
import LogoutButton from "../UI/LogoutButton";
const NavigationLinksContainer = ({ 
  links, 
  expandedMenu, 
  pathname, 
  onToggleMenu, 
  onClose, 
  onLogout,
  isMenuActive 
}) => (
  <div className="flex flex-col w-full space-y-1">
    {links.map((link) => (
      <div key={link.name} className="w-full">
        {link.subLinks ? (
          <NavigationLinkWithSubs
            link={link}
            isExpanded={expandedMenu === link.name}
            isActive={isMenuActive(link)}
            onToggle={() => onToggleMenu(link.name)}
            onClose={onClose}
            pathname={pathname}
          />
        ) : (
          <SimpleNavigationLink
            link={link}
            isActive={pathname === link.path}
            onClose={onClose}
          />
        )}
      </div>
    ))}
    
    <LogoutButton onLogout={onLogout} />
  </div>
);
export default NavigationLinksContainer;