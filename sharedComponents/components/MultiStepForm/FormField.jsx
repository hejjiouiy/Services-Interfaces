import React from 'react';

const FormField = ({ field, value, onChange, error }) => {
  const { type, name, label, placeholder, options, required, accept, multiple, disabled, readonly, min, max } = field;

  const baseInputClasses = `w-full px-4 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-main-green ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`;

  const renderLabel = () => (
    <label className="block text-darker-beige text-sm font-medium mb-2" htmlFor={name}>
      {label} {required && <span className="text-red-500">*</span>}
    </label>
  );

  const renderError = () => error && <p className="text-red-500 text-xs mt-1">{error}</p>;

  // ✅ Cas custom (ex: DatePicker, FileUpload)
  if (type === 'custom' && typeof render === 'function') {
    return (
      <div className="mb-4">
        {renderLabel()}
        <div className="relative">
          {render({
            value,
            onChange: (val) => onChange({ target: { name, value: val } }),
            inputClassName: baseInputClasses
          })}
        </div>
        {renderError()}
      </div>
    );
  }

  // ✅ Cas de base : text, email, number, date, time...
  // Special handler for file inputs
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log('File selected in FormField:', file);
    console.log('File name:', file?.name);
    console.log('File size:', file?.size);
    console.log('File type:', file?.type);
    
    // Create a synthetic event that mimics the structure expected by the parent onChange
    const syntheticEvent = {
      target: {
        name: name,
        value: file || null,  // Pass the File object as the value
        type: 'file'
      }
    };
    
    onChange(syntheticEvent);
  };

  switch (type) {
    case 'text':
    case 'email':
    case 'password':
    case 'number':
    case 'date':
    case 'time':
      return (
        <div className="mb-4">
          {renderLabel()}
          <input
            type={type}
            id={name}
            name={name}
            value={field.value || value || ''}
            onChange={onChange}
            placeholder={placeholder || ''}
            disabled={disabled}
            readOnly={readonly}
            min={min}
            max={max}
            className={baseInputClasses}
          />
          {renderError()}
        </div>
      );

    case 'textarea':
      return (
        <div className="mb-4">
          {renderLabel()}
          <textarea
            id={name}
            name={name}
            value={field.value || value || ''}
            onChange={onChange}
            placeholder={placeholder || ''}
            rows={field.rows || 4}
            disabled={disabled}
            readOnly={readonly}
            className={baseInputClasses}
          />
          {renderError()}
        </div>
      );

    case 'select':
      return (
        <div className="mb-4">
          {renderLabel()}
          <select
            id={name}
            name={name}
            value={field.value || value || ''}
            onChange={onChange}
            disabled={disabled}
            className={`${baseInputClasses} bg-white`}
          >
            <option value="">{placeholder || 'Select an option'}</option>
            {options && options.map((option, index) => (
              <option key={index} value={option.value || option}>
                {option.label || option}
              </option>
            ))}
          </select>
          {renderError()}
        </div>
      );

    case 'checkbox':
      return (
        <div className="mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id={name}
              name={name}
              checked={value || false}
              onChange={onChange}
              disabled={disabled}
              className="mr-2 h-4 w-4 text-main-green focus:ring-main-green border-gray-300 rounded"
            />
            <label className="text-darker-beige text-sm" htmlFor={name}>
              {label} {required && <span className="text-red-500">*</span>}
            </label>
          </div>
          {renderError()}
        </div>
      );

    case 'radio':
      return (
        <div className="mb-4">
          {renderLabel()}
          <div className="space-y-2">
            {options && options.map((option, index) => (
              <div className="flex items-center" key={index}>
                <input
                  type="radio"
                  id={`${name}-${index}`}
                  name={name}
                  value={option.value || option}
                  checked={value === (option.value || option)}
                  onChange={onChange}
                  disabled={disabled}
                  className="mr-2 h-4 w-4 text-main-green focus:ring-main-green border-gray-300"
                />
                <label className="text-darker-beige text-sm" htmlFor={`${name}-${index}`}>
                  {option.label || option}
                </label>
              </div>
            ))}
          </div>
          {renderError()}
        </div>
      );

    
    case 'file':
      return (
        <div className="mb-4">
          {renderLabel()}
          <input
            type="file"
            id={name}
            name={name}
            onChange={handleFileChange}  // Use special file handler
            accept={accept || '*'}
            multiple={multiple || false}
            disabled={disabled}
            className={`${baseInputClasses} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-main-green file:text-white hover:file:bg-green-600`}
          />
          {/* Show file name if file is selected */}
          {value && value instanceof File && (
            <p className="text-sm text-gray-600 mt-1">
              Selected: {value.name} ({Math.round(value.size / 1024)} KB)
            </p>
          )}
          {renderError()}
        </div>
      );
      
    default:
      return null;
  }
};

export default FormField;
