'use client';
import MultiStepForm from '../../../../sharedComponents/components/multiStepForm';
import React, { useState } from 'react';

const HousingType = {
  SHORT_TERM: 'SHORT_TERM',
  LONG_TERM: 'LONG_TERM',
  GUEST_ONLY: 'GUEST_ONLY',
};

const HousingRequestForm = () => {
  const [submission, setSubmission] = useState(null);

  const validateDates = (values) => {
    const { startDate, endDate } = values;
    if (!startDate || !endDate) return "Both start and end dates are required.";
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end <= start) return "End date must be after start date.";
    return null;
  };

  const step1 = {
    title: "Basic Information",
    description: "Fill in the main details related to your request",
    fields: [
      {
        type: "select",
        name: "housingType",
        label: "Housing Type",
        required: true,
        options: Object.entries(HousingType).map(([key, val]) => ({
          value: val,
          label: val.replace('_', ' ').toLowerCase()
        })),
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
        label: "End Date",
        required: true,
        validate: (val, all) => validateDates(all),
      },
      {
        type: "number",
        name: "numGuests",
        label: "Number of Guests",
        required: true,
        min: 0
      }
    ]
  };

  const step2 = {
    title: "Supporting Documents",
    description: "Upload the required documents for your request",
    fields: [
      {
        type: "file",
        name: "justification",
        label: "Justification Letter (PDF, DOC, DOCX)",
        accept: ".pdf,.doc,.docx",
        required: true
      },
      {
        type: "file",
        name: "guestList",
        label: "Guest List (CSV or PDF)",
        accept: ".csv,.pdf",
        required: false
      }
    ]
  };

  const steps = [step1, step2];

  const handleSubmit = (data) => {
    const payload = {
      ...data,
      status: 'PENDING',
      submissionDate: new Date().toISOString(),
      id: Math.random().toString(36).slice(2, 10) // temporary ID
    };
    setSubmission(payload);
  };

  if (submission) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-semibold text-main-green mb-4">Request submitted successfully</h2>
        <p className="text-gray-600 mb-6">
          Your housing request has been registered under reference <strong>{submission.id}</strong>.
        </p>
        <button
          onClick={() => setSubmission(null)}
          className="px-6 py-2 bg-main-green text-white rounded-lg hover:bg-darker-green transition"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <MultiStepForm
      steps={steps}
      onSubmit={handleSubmit}
      title="Housing Request Form"
      initialValues={{
        housingType: HousingType.SHORT_TERM,
        numGuests: 0,
      }}
    />
  );
};

export default HousingRequestForm;
