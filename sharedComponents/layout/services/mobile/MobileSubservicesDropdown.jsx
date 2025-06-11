import DropdownArrow from "../UI/DropdownArrow";
const MobileSubservicesDropdown = ({ 
  subservices, 
  selectedSubservice, 
  onSubserviceChange, 
  isOpen, 
  onToggle 
}) => {
  return (
    <div className="md:hidden relative mb-6">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center px-4 py-3 rounded-xl border border-gray-200 shadow-sm bg-white text-darker-beige hover:shadow-xl hover:border-main-green transition-all duration-300"
      >
        <span className="text-lg font-medium">{selectedSubservice}</span>
        <DropdownArrow isOpen={isOpen} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-0 max-h-60 overflow-y-auto">
          {subservices.map((subservice, index) => (
            <button
              key={index}
              onClick={() => onSubserviceChange(subservice.name)}
              className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 ${
                selectedSubservice === subservice.name ? 'bg-main-green/10 text-main-green font-medium' : 'text-darker-beige'
              }`}
            >
              {subservice.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileSubservicesDropdown;
