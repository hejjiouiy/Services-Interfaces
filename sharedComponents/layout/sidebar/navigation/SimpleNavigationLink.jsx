import Link from "next/link";
import ActiveIndicator from "../UI/ActiveIndicator";

const SimpleNavigationLink = ({ link, isActive, onClose }) => (
  <Link
    href={link.path}
    onClick={onClose}
    className={`
      w-full p-3 flex items-center
      hover:bg-main-green hover:rounded-sm hover:text-main-beige hover:font-bold
      transition-all duration-300 ease-in-out
      ${isActive ?
        "bg-main-green text-main-beige font-bold rounded-sm shadow-lg border-r-4 border-white" :
        "text-main-green font-normal rounded-sm"
      }
    `}
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
    {isActive && <ActiveIndicator />}
  </Link>
);

export default SimpleNavigationLink;