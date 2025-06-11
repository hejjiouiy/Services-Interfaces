const SidebarBackdrop = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-30 lg:hidden"
      onClick={onClose}
      aria-hidden="true"
    />
  );
};
export default SidebarBackdrop;