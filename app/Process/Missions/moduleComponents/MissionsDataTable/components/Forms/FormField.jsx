const FormField = ({ label, type = "text", value, onChange, options, className = "" }) => (
  <div className={className}>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    {type === "select" ? (
      <select 
        value={value} 
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-green"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : type === "textarea" ? (
      <textarea 
        value={value} 
        onChange={onChange}
        rows="4"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-green"
      />
    ) : (
      <input 
        type={type} 
        value={value} 
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-green"
      />
    )}
  </div>
);
export default FormField;