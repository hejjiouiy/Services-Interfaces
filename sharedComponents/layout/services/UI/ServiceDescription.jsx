const ServiceDescription = ({ title, description }) => {
  return (
    <div className="mb-6 px-2">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-main-green mb-2 leading-tight">
        {title}
      </h2>
      <p className="text-darker-beige text-sm sm:text-base lg:text-lg leading-relaxed">
        {description}
      </p>
    </div>
  );
};
export default ServiceDescription;