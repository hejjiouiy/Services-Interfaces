import Link from "next/link";

const SubLink = ({ subLink, isActive, onClose }) => (
  <Link
    href={subLink.path}
    onClick={onClose}
    className={`
      block w-full mb-1 p-2 pl-8
      hover:bg-main-green hover:rounded-sm hover:text-main-beige hover:font-bold
      transition-all duration-300 ease-in-out
      ${isActive ?
        "bg-main-green/90 text-main-beige font-bold rounded-sm shadow-lg border-l-4 border-white" :
        "text-main-green font-normal rounded-sm"
      }
    `}
  >
    <span className="transition-opacity duration-300">
      {subLink.name}
    </span>
  </Link>
);
export default SubLink;