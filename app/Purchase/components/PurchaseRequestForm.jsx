'use client'
import React, { useState, useEffect } from 'react';

const PurchaseRequestForm = () => {
  // State for form data
  const [formData, setFormData] = useState({
    typeDemande: 'DEMANDE_ACHAT',
    priorite: 'NORMAL',
    dateBesoin: '',
    ligne_budgetaire_id: ''
  });

  // State for materials in the request
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  
  // State for the current material being added
  const [currentMaterial, setCurrentMaterial] = useState({
    id: '',
    quantite: 1
  });

  // Calculate total cost
  const totalCost = selectedMaterials.reduce((total, item) => {
    return total + (item.prix_unitaire_estime * item.quantite);
  }, 0);

  // Mock data for available materials
  const availableMaterials = [
    { 
      id: '1', 
      designation: 'Laptop Dell XPS 13', 
      description: 'High-performance laptop for development work', 
      prix_unitaire_estime: 1200.00,
      categorie: 'IT Equipment'
    },
    { 
      id: '2', 
      designation: 'Office Chair', 
      description: 'Ergonomic office chair with lumbar support', 
      prix_unitaire_estime: 250.00,
      categorie: 'Furniture'
    },
    { 
      id: '3', 
      designation: 'Whiteboard Markers', 
      description: 'Pack of 12 assorted colors', 
      prix_unitaire_estime: 15.99,
      categorie: 'Office Supplies'
    },
    { 
      id: '4', 
      designation: 'Projector', 
      description: '4K projector for conference rooms', 
      prix_unitaire_estime: 899.99,
      categorie: 'IT Equipment'
    },
    { 
      id: '5', 
      designation: 'Microscope', 
      description: 'Laboratory-grade microscope', 
      prix_unitaire_estime: 1500.00,
      categorie: 'Laboratory Equipment'
    }
  ];

  // Mock data for budget lines
  const budgetLines = [
    { id: '1', label: 'IT Department - Equipment' },
    { id: '2', label: 'Office Supplies' },
    { id: '3', label: 'Laboratory Resources' },
    { id: '4', label: 'Staff Development' }
  ];

  // Handle input changes for the main form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle changes for the current material being added
  const handleMaterialChange = (e) => {
    const { name, value } = e.target;
    setCurrentMaterial({
      ...currentMaterial,
      [name]: name === 'quantite' ? parseInt(value, 10) : value
    });
  };

  // Add the current material to the selected materials list
  const handleAddMaterial = () => {
    if (!currentMaterial.id) {
      alert('Please select a material');
      return;
    }

    // Find the full material details from available materials
    const materialDetails = availableMaterials.find(m => m.id === currentMaterial.id);
    
    if (!materialDetails) return;

    // Check if this material is already in the list
    const existingIndex = selectedMaterials.findIndex(m => m.id === currentMaterial.id);
    
    if (existingIndex >= 0) {
      // Update quantity if already exists
      const updatedMaterials = [...selectedMaterials];
      updatedMaterials[existingIndex].quantite += currentMaterial.quantite;
      setSelectedMaterials(updatedMaterials);
    } else {
      // Add new material with full details and quantity
      setSelectedMaterials([
        ...selectedMaterials, 
        {
          ...materialDetails,
          quantite: currentMaterial.quantite
        }
      ]);
    }

    // Reset current material selection
    setCurrentMaterial({
      id: '',
      quantite: 1
    });
  };

  // Remove a material from the selected list
  const handleRemoveMaterial = (id) => {
    setSelectedMaterials(selectedMaterials.filter(material => material.id !== id));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (selectedMaterials.length === 0) {
      alert('Please add at least one material to your purchase request');
      return;
    }

    if (!formData.dateBesoin) {
      alert('Please select a date needed');
      return;
    }

    if (!formData.ligne_budgetaire_id) {
      alert('Please select a budget line');
      return;
    }

    // Prepare data for submission
    const purchaseRequest = {
      ...formData,
      dateDemande: new Date().toISOString(),
      etatValidation: 'SOUMISE',
      materials: selectedMaterials
    };

    console.log('Purchase Request Submitted:', purchaseRequest);
    alert('Purchase request submitted successfully!');
    
    // In a real app, you would send this data to your API
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-main-green mb-6">New Purchase Request</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Request details section */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-darker-beige mb-4">Request Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-darker-beige text-sm font-medium mb-2">
                Request Type <span className="text-red-500">*</span>
              </label>
              <select
                name="typeDemande"
                value={formData.typeDemande}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-green bg-white"
              >
                <option value="DEMANDE_ACHAT">Purchase Request</option>
                <option value="DEMANDE_SERVICE">Service Request</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-darker-beige text-sm font-medium mb-2">
                Priority <span className="text-red-500">*</span>
              </label>
              <select
                name="priorite"
                value={formData.priorite}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-green bg-white"
              >
                <option value="URGENT">Urgent</option>
                <option value="NORMAL">Normal</option>
                <option value="BASSE">Low</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-darker-beige text-sm font-medium mb-2">
                Date Needed <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dateBesoin"
                value={formData.dateBesoin}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-green"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-darker-beige text-sm font-medium mb-2">
                Budget Line <span className="text-red-500">*</span>
              </label>
              <select
                name="ligne_budgetaire_id"
                value={formData.ligne_budgetaire_id}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-green bg-white"
              >
                <option value="">Select Budget Line</option>
                {budgetLines.map(line => (
                  <option key={line.id} value={line.id}>
                    {line.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Materials section */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-darker-beige mb-4">Add Materials</h3>
          
          <div className="bg-lighter-beige p-4 rounded-lg mb-6">
            <div className="flex flex-wrap items-end gap-4">
              <div className="flex-grow min-w-[200px]">
                <label className="block text-darker-beige text-sm font-medium mb-2">
                  Select Material <span className="text-red-500">*</span>
                </label>
                <select
                  name="id"
                  value={currentMaterial.id}
                  onChange={handleMaterialChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-green bg-white"
                >
                  <option value="">Select a Material</option>
                  {availableMaterials.map(material => (
                    <option key={material.id} value={material.id}>
                      {material.designation} - {material.prix_unitaire_estime.toFixed(2)}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="w-32">
                <label className="block text-darker-beige text-sm font-medium mb-2">
                  Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="quantite"
                  value={currentMaterial.quantite}
                  onChange={handleMaterialChange}
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-green"
                />
              </div>
              
              <button
                type="button"
                onClick={handleAddMaterial}
                className="px-4 py-2 bg-secondary-green text-white rounded-lg hover:bg-darker-green focus:outline-none"
              >
                Add Material
              </button>
            </div>
          </div>
          
          {/* Materials list */}
          <div>
            <h4 className="font-medium text-main-green mb-2">Selected Materials</h4>
            
            {selectedMaterials.length === 0 ? (
              <div className="bg-gray-100 p-6 rounded-lg text-center text-gray-500">
                No materials added yet. Please add at least one material.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                  <thead className="bg-gray-100 text-gray-600 text-sm">
                    <tr>
                      <th className="py-3 px-4 text-left">Name</th>
                      <th className="py-3 px-4 text-left">Category</th>
                      <th className="py-3 px-4 text-left">Unit Price</th>
                      <th className="py-3 px-4 text-left">Quantity</th>
                      <th className="py-3 px-4 text-left">Total</th>
                      <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    {selectedMaterials.map((material) => (
                      <tr key={material.id} className="border-t">
                        <td className="py-3 px-4">{material.designation}</td>
                        <td className="py-3 px-4">{material.categorie}</td>
                        <td className="py-3 px-4">{material.prix_unitaire_estime.toFixed(2)}</td>
                        <td className="py-3 px-4">{material.quantite}</td>
                        <td className="py-3 px-4 font-medium">{(material.prix_unitaire_estime * material.quantite).toFixed(2)}</td>
                        <td className="py-3 px-4">
                          <button
                            type="button"
                            onClick={() => handleRemoveMaterial(material.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr className="border-t bg-gray-50">
                      <td colSpan="4" className="py-3 px-4 text-right font-semibold">Total Estimated Cost:</td>
                      <td className="py-3 px-4 font-bold text-main-green">{totalCost.toFixed(2)}</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        
        {/* Submit section */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-main-green text-white rounded-lg hover:bg-darker-green focus:outline-none"
            disabled={selectedMaterials.length === 0}
          >
            Submit Purchase Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default PurchaseRequestForm;