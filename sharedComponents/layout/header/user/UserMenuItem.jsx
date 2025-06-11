const UserMenuItem = ({ icon, text, onClick, isLogout = false }) => (
  <button 
    onClick={onClick}
    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center ${
      isLogout ? 'text-red-600 hover:bg-red-50' : 'text-gray-700'
    }`}
  >
    <div className={`w-4 h-4 lg:w-5 lg:h-5 mr-3 ${isLogout ? 'text-red-500' : 'text-gray-500'}`}>
      {icon}
    </div>
    {text}
  </button>
);
export default UserMenuItem;