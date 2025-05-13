'use client'
import MultiStepForm from '@/sharedComponents/componenets/multiStepForm';
import React, { useState, useEffect } from 'react';
// Enum values (since they're referenced in the models)
const EtatValidation = {
  SOUMISE: 'SOUMISE',
  VALIDEE: 'VALIDEE',
  REJETEE: 'REJETEE'
};

const TypeDemande = {
  DEMANDE_ACHAT: 'DEMANDE_ACHAT',
  DEMANDE_SERVICE: 'DEMANDE_SERVICE'
};

const Priorite = {
  URGENT: 'URGENT',
  NORMAL: 'NORMAL',
  BASSE: 'BASSE'
};

const PurchaseRequestForm = () => {
  // State to manage materials being added to the request
  const [materials, setMaterials] = useState([]);
  
  // State to calculate total estimated cost
  const [totalEstimatedCost, setTotalEstimatedCost] = useState(0);
  
  // Mock data for budget lines and material types
  const budgetLines = [
    { id: '123e4567-e89b-12d3-a456-426614174000', label: 'Budget Line 1 - Operations' },
    { id: '123e4567-e89b-12d3-a456-426614174001', label: 'Budget Line 2 - Research' },
    { id: '123e4567-e89b-12d3-a456-426614174002', label: 'Budget Line 3 - IT Equipment' },
    { id: '123e4567-e89b-12d3-a456-426614174003', label: 'Budget Line 4 - Office Supplies' }
  ];
  
  const materialTypes = [
    { id: '123e4567-e89b-12d3-a456-426614174010', label: 'IT Equipment' },
    { id: '123e4567-e89b-12d3-a456-426614174011', label: 'Office Supplies' },
    { id: '123e4567-e89b-12d3-a456-426614174012', label: 'Laboratory Materials' },
    { id: '123e4567-e89b-12d3-a456-426614174013', label: 'Furniture' }
  ];
  
  // Initial values for the form
  const initialValues = {
    dateDemande: new Date().toISOString().split('T')[0],
    etatValidation: EtatValidation.SOUMISE,
    typeDemande: TypeDemande.DEMANDE_ACHAT,
    priorite: Priorite.NORMAL,
    dateBesoin: '',
    ligne_budgetaire_id: '',
    materials: []
  };

  // Handle form data changes
  const handleFormDataChange = (formData) => {
    // Calculate total estimated cost when materials change
    if (formData.materials && Array.isArray(formData.materials)) {
      const total = formData.materials.reduce((sum, material) => {
        return sum + (material.prix_unitaire_estime * material.quantite);
      }, 0);
      setTotalEstimatedCost(total);
    }
  };
  
  // Handle form submission
  const handleSubmit = (formData) => {
    // Combine form data with materials
    const purchaseRequest = {
      ...formData,
      materials: materials
    };
    
    // Log the data (in a real application, you would send this to your API)
    console.log('Purchase Request Submitted:', purchaseRequest);
    
    // Show success message or redirect
    alert('Purchase request submitted successfully!');
  };
  
  // Handle adding a new material to the list
  const handleAddMaterial = (newMaterial) => {
    setMaterials([...materials, newMaterial]);
    return true; // Return true to indicate success
  };
  
  // Handle removing a material from the list
  const handleRemoveMaterial = (index) => {
    const updatedMaterials = [...materials];
    updatedMaterials.splice(index, 1);
    setMaterials(updatedMaterials);
  };
  
      // Define the steps for the multi-step form
  const formSteps = [
    {
      title: "Request Details",
      description: "Fill in the basic information about your purchase request",
      fields: [
        {
          type: "select",
          name: "typeDemande",
          label: "Request Type",
          required: true,
          options: [
            { value: TypeDemande.DEMANDE_ACHAT, label: "Purchase Request" },
            { value: TypeDemande.DEMANDE_SERVICE, label: "Service Request" }
          ]
        },
        {
          type: "select",
          name: "priorite",
          label: "Priority",
          required: true,
          options: [
            { value: Priorite.URGENT, label: "Urgent" },
            { value: Priorite.NORMAL, label: "Normal" },
            { value: Priorite.BASSE, label: "Low" }
          ]
        },
        {
          type: "date",
          name: "dateBesoin",
          label: "Date Needed",
          required: true,
          placeholder: "When do you need this by?"
        },
        {
          type: "select",
          name: "ligne_budgetaire_id",
          label: "Budget Line",
          required: true,
          options: budgetLines.map(line => ({
            value: line.id,
            label: line.label
          }))
        }
      ]
    },
    {
      title: "Materials",
      description: "Add the materials you need to purchase",
      fields: [],
      component: MaterialsStep,
      componentProps: {
        materials,
        materialTypes,
        onAddMaterial: handleAddMaterial,
        onRemoveMaterial: handleRemoveMaterial,
        totalEstimatedCost
      }
    },
    {
      title: "Review",
      description: "Review your purchase request before submission",
      fields: [],
      component: ReviewStep,
      componentProps: {
        materials,
        totalEstimatedCost,
        budgetLines
      }
    }
  ];
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-main-green mb-6">Create Purchase Request</h1>
      
      <MultiStepForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        steps={formSteps}
        title="New Purchase Request"
        onFormDataChange={handleFormDataChange}
      />
    </div>
  );
};

// Component for the Materials step
const MaterialsStep = (props) => {
  const { materials, materialTypes, onAddMaterial, onRemoveMaterial, totalEstimatedCost } = props;
  const [newMaterial, setNewMaterial] = useState({
    categorie: '',
    designation: '',
    description: '',
    prix_unitaire_estime: '',
    quantite: ''
  });
  
  const [errors, setErrors] = useState({});
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMaterial({
      ...newMaterial,
      [name]: value
    });
    
    // Clear error when typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const validateMaterial = () => {
    const newErrors = {};
    let isValid = true;
    
    if (!newMaterial.categorie) {
      newErrors.categorie = 'Material type is required';
      isValid = false;
    }
    
    if (!newMaterial.designation) {
      newErrors.designation = 'Name is required';
      isValid = false;
    }
    
    if (!newMaterial.description) {
      newErrors.description = 'Description is required';
      isValid = false;
    }
    
    if (!newMaterial.prix_unitaire_estime) {
      newErrors.prix_unitaire_estime = 'Estimated unit price is required';
      isValid = false;
    } else if (isNaN(newMaterial.prix_unitaire_estime) || parseFloat(newMaterial.prix_unitaire_estime) <= 0) {
      newErrors.prix_unitaire_estime = 'Price must be a positive number';
      isValid = false;
    }
    
    if (!newMaterial.quantite) {
      newErrors.quantite = 'Quantity is required';
      isValid = false;
    } else if (isNaN(newMaterial.quantite) || parseFloat(newMaterial.quantite) <= 0) {
      newErrors.quantite = 'Quantity must be a positive number';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleAddMaterial = () => {
    if (validateMaterial()) {
      // Create a new material object with calculated total
      const materialToAdd = {
        ...newMaterial,
        prix_unitaire_estime: parseFloat(newMaterial.prix_unitaire_estime),
        quantite: parseFloat(newMaterial.quantite),
        total: parseFloat(newMaterial.prix_unitaire_estime) * parseFloat(newMaterial.quantite)
      };
      
      // Add to parent component's state
      const success = onAddMaterial(materialToAdd);
      
      if (success) {
        // Reset form
        setNewMaterial({
          categorie: '',
          designation: '',
          description: '',
          prix_unitaire_estime: '',
          quantite: ''
        });
      }
    }
  };
  
  // Find material type label based on ID
  const getMaterialTypeName = (id) => {
    const type = materialTypes.find(type => type.id === id);
    return type ? type.label : 'Unknown';
  };
  
  return (
    <div>
      <div className="mb-8 bg-lighter-beige p-4 rounded-lg">
        <h3 className="text-lg font-medium text-main-green mb-4">Add New Material</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-darker-beige text-sm font-medium mb-2">
              Material Type <span className="text-red-500">*</span>
            </label>
            <select
              name="categorie"
              value={newMaterial.categorie}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border ${errors.categorie ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-main-green bg-white`}
            >
              <option value="">Select Material Type</option>
              {materialTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>
            {errors.categorie && <p className="text-red-500 text-xs mt-1">{errors.categorie}</p>}
          </div>
          
          <div className="mb-4">
            <label className="block text-darker-beige text-sm font-medium mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="designation"
              value={newMaterial.designation}
              onChange={handleInputChange}
              placeholder="Enter material name"
              className={`w-full px-4 py-2 border ${errors.designation ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-main-green`}
            />
            {errors.designation && <p className="text-red-500 text-xs mt-1">{errors.designation}</p>}
          </div>
          
          <div className="mb-4 md:col-span-2">
            <label className="block text-darker-beige text-sm font-medium mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={newMaterial.description}
              onChange={handleInputChange}
              placeholder="Enter material description"
              rows="3"
              className={`w-full px-4 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-main-green`}
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>
          
          <div className="mb-4">
            <label className="block text-darker-beige text-sm font-medium mb-2">
              Estimated Unit Price <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="prix_unitaire_estime"
              value={newMaterial.prix_unitaire_estime}
              onChange={handleInputChange}
              placeholder="0.00"
              min="0"
              step="0.01"
              className={`w-full px-4 py-2 border ${errors.prix_unitaire_estime ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-main-green`}
            />
            {errors.prix_unitaire_estime && <p className="text-red-500 text-xs mt-1">{errors.prix_unitaire_estime}</p>}
          </div>
          
          <div className="mb-4">
            <label className="block text-darker-beige text-sm font-medium mb-2">
              Quantity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="quantite"
              value={newMaterial.quantite}
              onChange={handleInputChange}
              placeholder="1"
              min="1"
              step="1"
              className={`w-full px-4 py-2 border ${errors.quantite ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-main-green`}
            />
            {errors.quantite && <p className="text-red-500 text-xs mt-1">{errors.quantite}</p>}
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={handleAddMaterial}
            className="px-4 py-2 bg-secondary-green text-white rounded-lg hover:bg-darker-green focus:outline-none"
          >
            Add Material
          </button>
        </div>
      </div>
      
      {/* Materials List */}
      <div>
        <h3 className="text-lg font-medium text-main-green mb-4">Materials in Request</h3>
        
        {materials.length === 0 ? (
          <div className="bg-gray-100 p-6 rounded-lg text-center text-gray-500">
            No materials added yet. Add at least one material to continue.
          </div>
        ) : (
          <div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead className="bg-gray-100 text-gray-600 text-sm">
                  <tr>
                    <th className="py-3 px-4 text-left">Type</th>
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left">Unit Price</th>
                    <th className="py-3 px-4 text-left">Quantity</th>
                    <th className="py-3 px-4 text-left">Total</th>
                    <th className="py-3 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  {materials.map((material, index) => (
                    <tr key={index} className="border-t">
                      <td className="py-3 px-4">{getMaterialTypeName(material.categorie)}</td>
                      <td className="py-3 px-4">{material.designation}</td>
                      <td className="py-3 px-4">{material.prix_unitaire_estime.toFixed(2)}</td>
                      <td className="py-3 px-4">{material.quantite}</td>
                      <td className="py-3 px-4 font-medium">{(material.prix_unitaire_estime * material.quantite).toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <button
                          type="button"
                          onClick={() => onRemoveMaterial(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t bg-gray-50">
                    <td colSpan="4" className="py-3 px-4 text-right font-semibold">Total Estimated Cost:</td>
                    <td className="py-3 px-4 font-bold text-main-green">{totalEstimatedCost.toFixed(2)}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Component for the Review step
const ReviewStep = (props) => {
  const { materials, totalEstimatedCost, budgetLines } = props;
  
  // Find budget line label based on ID
  const getBudgetLineName = (id) => {
    const line = budgetLines.find(line => line.id === id);
    return line ? line.label : 'Unknown';
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-main-green mb-4">Request Summary</h3>
        
        <div className="bg-lighter-beige p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-2">
              <p className="text-sm text-gray-500">Total Materials:</p>
              <p className="font-medium">{materials.length}</p>
            </div>
            <div className="mb-2">
              <p className="text-sm text-gray-500">Total Estimated Cost:</p>
              <p className="font-bold text-main-green">{totalEstimatedCost.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-main-green mb-4">Materials List</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-600 text-sm">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Description</th>
                <th className="py-3 px-4 text-left">Unit Price</th>
                <th className="py-3 px-4 text-left">Quantity</th>
                <th className="py-3 px-4 text-left">Total</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {materials.map((material, index) => (
                <tr key={index} className="border-t">
                  <td className="py-3 px-4">{material.designation}</td>
                  <td className="py-3 px-4 text-sm">{material.description}</td>
                  <td className="py-3 px-4">{material.prix_unitaire_estime.toFixed(2)}</td>
                  <td className="py-3 px-4">{material.quantite}</td>
                  <td className="py-3 px-4 font-medium">{(material.prix_unitaire_estime * material.quantite).toFixed(2)}</td>
                </tr>
              ))}
              <tr className="border-t bg-gray-50">
                <td colSpan="4" className="py-3 px-4 text-right font-semibold">Total:</td>
                <td className="py-3 px-4 font-bold text-main-green">{totalEstimatedCost.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-700">
          <strong>Note:</strong> Once submitted, your purchase request will be sent for approval. You will be notified when the status changes.
        </p>
      </div>
    </div>
  );
};

export default PurchaseRequestForm;