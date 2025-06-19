'use client';
import MultiStepForm from '../../../../sharedComponents/components/multiStepForm';
import React, { useState } from 'react';
import HousingFileUpload from './HousingFileUpload';

const HousingType = {
  SHORT_TERM: 'SHORT_TERM',
  LONG_TERM: 'LONG_TERM',
  GUEST_ONLY: 'GUEST_ONLY',
};

const HousingRequestForm = () => {
  const [submission, setSubmission] = useState(null);

  const validateDates = (values) => {
    const { startDate, endDate } = values;
    if (!startDate || !endDate) return 'Both dates are required.';

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(startDate);
    const end = new Date(endDate);

    const minAdvanceDays = 3;
    const minStartDate = new Date(today);
    minStartDate.setDate(minStartDate.getDate() + minAdvanceDays);

    if (start < minStartDate) return `Start date must be at least ${minAdvanceDays} days from today.`;
    if (end <= start) return 'End date must be after start date.';
    return null;
  };

  const step1 = {
    title: 'Basic Information',
    description: 'Fill in the main information related to your housing request.',
    fields: [
      {
        type: 'select',
        name: 'housingType',
        label: 'Housing Type',
        required: true,
        options: Object.entries(HousingType).map(([key, val]) => ({
          value: val,
          label: val.replace('_', ' ').toLowerCase(),
        })),
      },
      {
        type: 'date',
        name: 'startDate',
        label: 'Start Date',
        required: true,
        min: (() => {
          const today = new Date();
          today.setDate(today.getDate() + 3);
          return today.toISOString().split('T')[0];
        })(),
      },
      {
        type: 'date',
        name: 'endDate',
        label: 'End Date',
        required: true,
        validate: (val, all) => validateDates(all),
      },
      {
        type: 'number',
        name: 'numGuests',
        label: 'Number of Guests',
        required: true,
        min: 0,
      },
    ],
  };

  const step2 = {
    title: 'Supporting Documents',
    description: 'Upload the required documents for your request.',
    fields: [
      {
        type: 'custom',
        name: 'justificatif',
        label: 'Justification Letter',
        required: true,
        render: ({ value, onChange }) => (
          <HousingFileUpload
            label="Upload Justification Letter"
            acceptedTypes=".pdf,.doc,.docx"
            onFileChange={onChange}
          />
        ),
        validate: (val) => (!val ? 'This document is required.' : null),
      },
      {
        type: 'custom',
        name: 'guestList',
        label: 'Guest List (optional)',
        required: false,
        render: ({ value, onChange }) => (
          <HousingFileUpload
            label="Upload Guest List (CSV or PDF)"
            acceptedTypes=".csv,.pdf"
            onFileChange={onChange}
          />
        ),
      },
    ],
  };

  const steps = [step1, step2];

  const handleSubmit = (data) => {
    const payload = {
      ...data,
      status: 'PENDING',
      submissionDate: new Date().toISOString(),
      id: Math.random().toString(36).slice(2, 10),
    };
    setSubmission(payload);
  };

  if (submission) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-semibold text-main-green mb-4">Request Successfully Submitted</h2>
        <p className="text-gray-600 mb-6">
          Your housing request has been recorded with reference ID: <strong>{submission.id}</strong>.
        </p>
        <button
          onClick={() => setSubmission(null)}
          className="px-6 py-2 bg-main-green text-white rounded-lg hover:bg-darker-green transition"
        >
          Submit Another Request
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
