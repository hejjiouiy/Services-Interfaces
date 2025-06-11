const ContentWrapper = ({ children }) => {
  return (
    <div className="mt-6 lg:mt-8 bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      {children}
    </div>
  );
};
export default ContentWrapper;