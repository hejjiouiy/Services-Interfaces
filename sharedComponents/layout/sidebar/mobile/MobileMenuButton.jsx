const MobileMenuButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-main-green text-main-beige rounded-md shadow-lg hover:bg-main-green/90 transition-colors duration-200"
    aria-label="Toggle menu"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
      <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
    </svg>
  </button>
);

export default MobileMenuButton;