const DesktopSubserviceTab = ({ subservice, isSelected, onClick }) => {
  return (
    <div 
      className="cursor-pointer relative pb-3 transition-all duration-300 hover:scale-105"
      onClick={onClick}
    >
      <h4 className={`text-darker-beige whitespace-nowrap ${
        isSelected ? "font-medium text-main-green" : "font-normal hover:text-main-green"
      }`}>
        {subservice.name}
      </h4>
      
      {/* Animated green underline */}
      <span
        className={`absolute -bottom-[26px] left-0 w-full h-[2px] bg-secondary-green origin-center transition-transform duration-500 ease-in-out ${
          isSelected ? "scale-x-100" : "scale-x-0"
        }`}
      ></span>
    </div>
  );
};

export default DesktopSubserviceTab;
