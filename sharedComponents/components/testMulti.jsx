'use client'
import React from 'react';
import MultiStepForm from './multiStepForm';

// Example component showing how to use the form
const AccessDemandPage = () => {
  const handleSubmit = (formData) => {
    console.log('Form submitted:', formData);
    // Handle form submission logic here
    alert('Form submitted successfully!');
  };

  // Define the form steps and fields
  const formSteps = [
    {
      title: "Personal Information",
      description: "Please provide your basic information",
      fields: [
        {
          type: "text",
          name: "fullName",
          label: "Full Name",
          placeholder: "Enter your full name",
          required: true
        },
        {
          type: "email",
          name: "email",
          label: "Email Address",
          placeholder: "Enter your email address",
          required: true
        },
        {
          type: "select",
          name: "department",
          label: "Department",
          placeholder: "Select your department",
          required: true,
          options: [
            "Administration",
            "IT Services",
            "Human Resources",
            "Finance",
            "Research & Development"
          ]
        }
      ]
    },
    {
      title: "Access Details",
      description: "Specify the type of access you need",
      fields: [
        {
          type: "select",
          name: "accessType",
          label: "Access Type",
          placeholder: "Select access type",
          required: true,
          options: [
            "Building Access",
            "System Access",
            "Restricted Area Access",
            "Temporary Access"
          ]
        },
        {
          type: "textarea",
          name: "accessReason",
          label: "Reason for Access",
          placeholder: "Please explain why you need this access",
          required: true
        },
        {
          type: "date",
          name: "startDate",
          label: "Start Date",
          required: true
        },
        {
          type: "date",
          name: "endDate",
          label: "End Date (if temporary)"
        }
      ]
    },
    {
      title: "Confirmation",
      description: "Review your information and confirm",
      fields: [
        {
          type: "checkbox",
          name: "termsAccepted",
          label: "I agree to the terms and conditions of access",
          required: true
        },
        {
          type: "checkbox",
          name: "securityPolicy",
          label: "I have read and understand the security policy",
          required: true
        }
      ]
    }
  ];

  // Initial values for the form
  const initialValues = {
    fullName: "",
    email: "",
    department: "",
    accessType: "",
    accessReason: "",
    startDate: "",
    endDate: "",
    termsAccepted: false,
    securityPolicy: false
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-main-green mb-6">Access Demand Form</h1>
      <MultiStepForm 
        initialValues={initialValues}
        onSubmit={handleSubmit}
        steps={formSteps}
        title="Request Access"
      />
    </div>
  );
};

export default AccessDemandPage;