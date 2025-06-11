const NotificationBadge = ({ count }) => {
  if (count <= 0) return null;
  
  return (
    <span className="text-main-beige bg-red-500 rounded-full shadow-xl px-2 py-1 text-xs h-fit ml-[-8px] min-w-[20px] text-center z-10">
      {count}
    </span>
  );
};

export default NotificationBadge;