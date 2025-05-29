import React from 'react'

const FieldWrapper = ({ label, htmlFor, required = false, error, children }) => {
  return (
    <div className="mb-4">
      {/* Label */}
      {label && (
        <label
          htmlFor={htmlFor}
          className="block text-darker-beige text-sm font-medium mb-1"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Field element (input, textarea...) */}
      {children}

      {/* Error message */}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}

export default FieldWrapper
