'use client';
import MultiStepForm from '../../../../sharedComponents/components/MultiStepForm/MultiStepForm';
import React, { useState, useEffect } from 'react';
// Enums (simulés pour cet exemple)
const TypeMission = {
  FORMATION: 'FORMATION',
  CONFERENCE: 'CONFERENCE',
  REUNION: 'REUNION',
  AUTRE: 'AUTRE'
};

const EtatMission = {
  OUVERTE: 'OUVERTE',
  EN_COURS: 'EN_COURS',
  TERMINEE: 'TERMINEE',
  ANNULEE: 'ANNULEE'
};

const TypeFinancementEnum = {
  INTERNE: 'INTERNE',
  EXTERNE: 'EXTERNE',
  MIXTE: 'MIXTE'
};

const MissionRequestForm = () => {
  const [submissionResult, setSubmissionResult] = useState(null);
  const [formState, setFormState] = useState({
    includeTravel: false,
    includeAccommodation: false,
    includeFinancing: false
  });
  const [steps, setSteps] = useState([]);

  // Step 1: Mission de base (toujours inclus)
  const missionStep = {
    title: "Mission Details",
    description: "Provide basic information about your mission",
    fields: [
      {
        type: "select",
        name: "type",
        label: "Mission Type",
        options: Object.keys(TypeMission).map(key => ({
          value: TypeMission[key],
          label: key.replace('_', ' ')
        })),
        required: true
      },
      {
        type: "text",
        name: "destination",
        label: "Destination",
        placeholder: "Enter the destination",
        required: true
      },
      {
        type: "textarea",
        name: "details",
        label: "Mission Details",
        placeholder: "Describe the purpose and objectives of your mission",
        required: true
      },
      {
        type: "text",
        name: "pays",
        label: "Country",
        placeholder: "Enter the country",
        required: true
      },
      {
        type: "text",
        name: "ville",
        label: "City",
        placeholder: "Enter the city",
        required: true
      },
      {
        type: "number",
        name: "budgetPrevu",
        label: "Estimated Budget",
        placeholder: "Enter the estimated budget",
        required: true
      }
    ]
  };

  // Step 2: Ordre de Mission (toujours inclus)
  const ordreStep = {
    title: "Mission Order",
    description: "Provide details for the mission order",
    fields: [
      {
        type: "date",
        name: "dateDebut",
        label: "Start Date",
        required: true
      },
      {
        type: "date",
        name: "dateFin",
        label: "End Date",
        required: true
      },
      {
        type: "select",
        name: "etat",
        label: "Mission Status",
        options: Object.keys(EtatMission).map(key => ({
          value: EtatMission[key],
          label: key.replace('_', ' ')
        })),
        required: true
      },
      {
        type: "checkbox",
        name: "includeTravel",
        label: "Include Travel Arrangements"
      },
      {
        type: "checkbox",
        name: "includeAccommodation",
        label: "Include Accommodation"
      },
      {
        type: "checkbox",
        name: "includeFinancing",
        label: "Include Financing Details"
      }
    ]
  };

  // Step 3: Travel (conditionally included)
  const travelStep = {
    title: "Travel Details",
    description: "Provide information about your travel arrangements",
    fields: [
      {
        type: "text",
        name: "voyageDestination",
        label: "Travel Destination",
        placeholder: "Enter travel destination",
        required: true
      },
      {
        type: "select",
        name: "voyageMoyen",
        label: "Transportation Method",
        options: [
          { value: "PLANE", label: "Airplane" },
          { value: "TRAIN", label: "Train" },
          { value: "CAR", label: "Car" },
          { value: "BUS", label: "Bus" },
          { value: "OTHER", label: "Other" }
        ],
        required: true
      },
      {
        type: "date",
        name: "voyageDateVoyage",
        label: "Travel Date",
        required: true
      }
    ]
  };

  // Step 4: Accommodation (conditionally included)
  const accommodationStep = {
    title: "Accommodation Details",
    description: "Provide information about your accommodation",
    fields: [
      {
        type: "date",
        name: "hebergementDateDebut",
        label: "Check-in Date",
        required: true
      },
      {
        type: "date",
        name: "hebergementDateFin",
        label: "Check-out Date",
        required: true
      },
      {
        type: "text",
        name: "hebergementLocalisation",
        label: "Location",
        placeholder: "Enter accommodation location",
        required: true
      },
      {
        type: "select",
        name: "hebergementTypeHebergement",
        label: "Accommodation Type",
        options: [
          { value: "HOTEL", label: "Hotel" },
          { value: "APARTMENT", label: "Apartment" },
          { value: "GUEST_HOUSE", label: "Guest House" },
          { value: "OTHER", label: "Other" }
        ],
        required: true
      }
    ]
  };

  // Step 5: Financing (conditionally included)
  const financingStep = {
    title: "Financing Details",
    description: "Provide information about the financing of your mission",
    fields: [
      {
        type: "select",
        name: "financementType",
        label: "Financing Type",
        options: Object.keys(TypeFinancementEnum).map(key => ({
          value: TypeFinancementEnum[key],
          label: key.replace('_', ' ')
        })),
        required: true
      },
      {
        type: "textarea",
        name: "financementDetails",
        label: "Financing Details",
        placeholder: "Provide details about the financing",
        required: true
      },
      {
        type: "text",
        name: "financementDevise",
        label: "Currency",
        placeholder: "Enter the currency (e.g., MAD, USD, EUR)",
        required: true
      },
      {
        type: "checkbox",
        name: "financementValide",
        label: "Financing Validated"
      }
    ]
  };

  // Listen for form data changes to update conditional steps
  const handleFormChange = (formData) => {
    setFormState({
      includeTravel: formData.includeTravel || false,
      includeAccommodation: formData.includeAccommodation || false,
      includeFinancing: formData.includeFinancing || false
    });
  };

  // Update steps whenever formState changes
  useEffect(() => {
    const newSteps = [missionStep, ordreStep];
    
    if (formState.includeTravel) {
      newSteps.push(travelStep);
    }
    
    if (formState.includeAccommodation) {
      newSteps.push(accommodationStep);
    }
    
    if (formState.includeFinancing) {
      newSteps.push(financingStep);
    }
    
    setSteps(newSteps);
  }, [formState]);

  const handleSubmit = (formData) => {
    console.log('Form submitted with data:', formData);
    
    // Here you would typically send this data to your API
    // For this example, we'll just show the submitted data
    setSubmissionResult(formData);
    
    // You could also redirect or show a success message
    // Example: router.push('/missions/success');
  };

  if (submissionResult) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold text-main-green mb-6">Mission Request Submitted</h2>
        <p className="text-darker-beige mb-4">Your mission request has been submitted successfully!</p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-medium text-main-green mb-2">Mission Details</h3>
          <p><strong>Type:</strong> {submissionResult.type}</p>
          <p><strong>Destination:</strong> {submissionResult.destination}</p>
          <p><strong>Country:</strong> {submissionResult.pays}</p>
          <p><strong>City:</strong> {submissionResult.ville}</p>
          <p><strong>Budget:</strong> {submissionResult.budgetPrevu}</p>
          <p><strong>Date:</strong> {submissionResult.dateDebut} to {submissionResult.dateFin}</p>
          
          {submissionResult.includeTravel && (
            <>
              <h3 className="text-lg font-medium text-main-green mt-4 mb-2">Travel Details</h3>
              <p><strong>Destination:</strong> {submissionResult.voyageDestination}</p>
              <p><strong>Transportation:</strong> {submissionResult.voyageMoyen}</p>
              <p><strong>Date:</strong> {submissionResult.voyageDateVoyage}</p>
            </>
          )}
          
          {submissionResult.includeAccommodation && (
            <>
              <h3 className="text-lg font-medium text-main-green mt-4 mb-2">Accommodation Details</h3>
              <p><strong>Check-in:</strong> {submissionResult.hebergementDateDebut}</p>
              <p><strong>Check-out:</strong> {submissionResult.hebergementDateFin}</p>
              <p><strong>Location:</strong> {submissionResult.hebergementLocalisation}</p>
              <p><strong>Type:</strong> {submissionResult.hebergementTypeHebergement}</p>
            </>
          )}
          
          {submissionResult.includeFinancing && (
            <>
              <h3 className="text-lg font-medium text-main-green mt-4 mb-2">Financing Details</h3>
              <p><strong>Type:</strong> {submissionResult.financementType}</p>
              <p><strong>Details:</strong> {submissionResult.financementDetails}</p>
              <p><strong>Currency:</strong> {submissionResult.financementDevise}</p>
              <p><strong>Validated:</strong> {submissionResult.financementValide ? 'Yes' : 'No'}</p>
            </>
          )}
        </div>
        <button 
          onClick={() => setSubmissionResult(null)} 
          className="px-4 py-2 bg-main-green text-white rounded-lg hover:bg-darker-green focus:outline-none"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <MultiStepForm
      initialValues={{
        etat: EtatMission.OUVERTE,
        type: TypeMission.FORMATION
      }}
      onSubmit={handleSubmit}
      steps={steps}
      title="Mission Request Form"
      onFormDataChange={handleFormChange}
    />
  );
};

export default MissionRequestForm;