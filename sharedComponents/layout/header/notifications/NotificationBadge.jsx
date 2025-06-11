const NotificationBadge = ({ count }) => {
  if (count <= 0) return null;
  
  return (
    <span className="absolute -top-1 -right-1 text-main-beige rounded-full bg-red-600 px-1.5 py-0.5 text-xs h-fit min-w-[20px] text-center">
      {count}
    </span>
  );
};

export default NotificationBadge;