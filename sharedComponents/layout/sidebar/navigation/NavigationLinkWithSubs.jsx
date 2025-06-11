import ExpandArrow from "../UI/ExpandArrow";
import SubLinksContainer from "./SubLinksContainer";

const NavigationLinkWithSubs = ({ 
  link, 
  isExpanded, 
  isActive, 
  onToggle, 
  onClose, 
  pathname 
}) => (
  <div className="w-full">
    <div
      onClick={onToggle}
      className={`
        w-full p-3 flex items-center cursor-pointer
        hover:bg-main-green hover:rounded-sm hover:text-main-beige hover:font-bold
        transition-all duration-300 ease-in-out
        ${isActive ?
          "bg-main-green text-main-beige font-bold rounded-sm shadow-lg" :
          "text-main-green font-normal rounded-sm"
        }
      `}
      aria-expanded={isExpanded}
    >
      <div className="flex items-center flex-1">
        <div className={`
          flex-shrink-0 transition-colors duration-300
          ${isActive ? 'text-white' : 'text-main-green'}
        `}>
          {link.icon}
        </div>
        <span className="ml-3">
          {link.name}
        </span>
      </div>
      <ExpandArrow isExpanded={isExpanded} />
    </div>

    <SubLinksContainer
      subLinks={link.subLinks}
      isVisible={isExpanded}
      expandedMenu={isExpanded}
      pathname={pathname}
      onClose={onClose}
    />
  </div>
);
export default NavigationLinkWithSubs;