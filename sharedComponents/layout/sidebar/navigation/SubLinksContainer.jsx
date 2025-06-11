import SubLink from "./SubLink";

const SubLinksContainer = ({ subLinks, isVisible, expandedMenu, pathname, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="mt-1 transition-all duration-300 ml-4">
      {subLinks.map((subLink) => (
        <SubLink
          key={subLink.name}
          subLink={subLink}
          isActive={pathname === subLink.path}
          onClose={onClose}
        />
      ))}
    </div>
  );
};
export default SubLinksContainer;