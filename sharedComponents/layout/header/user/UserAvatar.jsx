const UserAvatar = ({ isMobile, src = "/images/pp.png", alt = "User Avatar" }) => (
  <div className={`
    rounded-full text-main-beige flex items-center justify-center font-bold shadow-md mr-3
    ${isMobile ? 'h-8 w-8' : 'h-10 w-10 lg:h-12 lg:w-12'}
  `}>
    <img 
      src={src} 
      alt={alt} 
      className="rounded-full w-full h-full object-cover" 
    />
  </div>
);
export default UserAvatar;