import DesktopSubserviceTab from "./DesktopSubserviceTab";
const DesktopSubservicesNavigation = ({ subservices, selectedSubservice, onSubserviceChange }) => {
  return (
    <div className="hidden md:block mt-8 lg:mt-16 mb-8 pb-6 border-b-[2px] border-gray-200 relative">
      <div className="flex flex-wrap justify-center lg:justify-between gap-4 lg:gap-8 text-lg lg:text-xl">
        {subservices.map((subservice, index) => (
          <DesktopSubserviceTab
            key={index}
            subservice={subservice}
            isSelected={selectedSubservice === subservice.name}
            onClick={() => onSubserviceChange(subservice.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default DesktopSubservicesNavigation;