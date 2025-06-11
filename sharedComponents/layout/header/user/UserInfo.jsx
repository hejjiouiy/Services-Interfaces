import UserAvatar from './UserAvatar';
const UserInfo = ({ isMobile, name = "Mohamed Salam", title = "Controlleur de Gestion" }) => (
  <div className={`flex items-center ${isMobile ? 'flex-1 mx-4' : ''}`}>
    <UserAvatar isMobile={isMobile} />
    
    <div className={`${isMobile ? ' sm:block' : ''}`}>
      <h1 className={`text-gray-600 ${isMobile ? 'text-sm' : 'text-sm lg:text-md'}`}>
        <span className={`font-bold text-black ${isMobile ? 'text-base' : 'text-lg lg:text-2xl'}`}>
          {name}
        </span>
        {!isMobile && <br />}
        <span className={isMobile ? 'block text-xs' : ''}>
          {title}
        </span>
      </h1>
    </div>
  </div>
);
export default UserInfo;