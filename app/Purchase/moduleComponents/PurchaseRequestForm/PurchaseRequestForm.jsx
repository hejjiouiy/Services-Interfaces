import React from 'react';
import RequestDetailsSection from './components/FormSections/RequestDetailsSection';
import MaterialsSection from './components/FormSections/MaterialsSection';
import SubmitSection from './components/FormSections/SubmitSection';
import { useFormData } from './hooks/useFormData';
import { useMaterialSelection } from './hooks/useMaterialSelection';
import { useFormValidation } from './hooks/useFormValidation';
import { useFormSubmission } from './hooks/useFormSubmission';
import { calculateTotalCost } from './utils/calculations';
import { availableMaterials } from './config/mockData';

const PurchaseRequestForm = ({ 
  onSubmitSuccess,
  onSubmitError,
  initialData = {},
  title = "New Purchase Request"
}) => {
  // Form data management
  const { formData, handleInputChange } = useFormData(initialData);

  // Material selection management
  const {
    selectedMaterials,
    currentMaterial,
    handleMaterialChange,
    addMaterial,
    removeMaterial
  } = useMaterialSelection();

  // Calculate total cost
  const totalCost = calculateTotalCost(selectedMaterials);

  // Form validation
  const { isValid, errors, enableErrorDisplay } = useFormValidation(formData, selectedMaterials);

  // Form submission
  const { submitForm } = useFormSubmission();

  // Handlers
  const handleAddMaterial = () => {
    const success = addMaterial(availableMaterials);
    if (!success && !currentMaterial.id) {
      alert('Please select a material');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    enableErrorDisplay();

    if (!isValid) {
      return;
    }

    const success = submitForm(
      formData, 
      selectedMaterials,
      (data) => {
        alert('Purchase request submitted successfully!');
        if (onSubmitSuccess) onSubmitSuccess(data);
      },
      (error) => {
        alert('Error submitting request. Please try again.');
        if (onSubmitError) onSubmitError(error);
      }
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-main-green mb-6">{title}</h2>
      
      <form onSubmit={handleSubmit}>
        <RequestDetailsSection
          formData={formData}
          onChange={handleInputChange}
          errors={errors}
        />

        <MaterialsSection
          selectedMaterials={selectedMaterials}
          currentMaterial={currentMaterial}
          availableMaterials={availableMaterials}
          totalCost={totalCost}
          onCurrentMaterialChange={handleMaterialChange}
          onAddMaterial={handleAddMaterial}
          onRemoveMaterial={removeMaterial}
          errors={errors}
        />

        <SubmitSection
          totalCost={totalCost}
          isValid={isValid}
          onSubmit={handleSubmit}
        />
      </form>
    </div>
  );
};

export default PurchaseRequestForm;