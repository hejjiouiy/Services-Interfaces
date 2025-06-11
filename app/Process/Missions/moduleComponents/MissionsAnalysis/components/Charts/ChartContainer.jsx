const ChartContainer = ({ title, children, colSpan = "" }) => (
  <div className={`bg-white p-6 rounded-lg shadow-md ${colSpan}`}>
    <h2 className="text-lg font-semibold text-main-green mb-4">{title}</h2>
    <div className="h-80">
      {children}
    </div>
  </div>
);
export default ChartContainer;