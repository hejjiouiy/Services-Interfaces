'use client';
import React, { useState } from 'react';
import MultiStepForm from '../../../../sharedComponents/components/MultiStepForm/MultiStepForm';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import HousingFileUpload from './HousingFileUpload';

const HousingType = {
  SHORT_TERM: 'SHORT_TERM',
  LONG_TERM: 'LONG_TERM',
  GUEST_ONLY: 'GUEST_ONLY',
};

const getMinStartDate = () => {
  const today = new Date();
  today.setDate(today.getDate() + 42); // 6 semaines
  return today;
};

const validateStartDate = (value) => {
  if (!value) return 'Start date is required.';
  if (value < getMinStartDate()) return 'Start date must be at least 6 weeks from today.';
  return null;
};

const validateEndDate = (value, allValues) => {
  if (!value) return 'End date is required.';
  if (value < allValues.startDate) return 'End date cannot be before start date.';
  if (value < getMinStartDate()) return 'End date must be at least 6 weeks from today.';
  return null;
};

const HousingRequestForm = () => {
  const [submission, setSubmission] = useState(null);

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
        type: 'custom',
        name: 'startDate',
        label: 'Start Date',
        required: true,
        render: ({ value, onChange, inputClassName }) => (
          <div className="relative z-50 mb-4">
            <DatePicker
              selected={value}
              onChange={onChange}
              minDate={getMinStartDate()}
              placeholderText="Select start date"
              className={inputClassName}
              wrapperClassName="date-picker-wrapper"
              popperPlacement="bottom-start"
              popperModifiers={[
                { name: 'preventOverflow', options: { boundary: 'viewport' } },
              ]}
            />
          </div>
        ),
        validate: validateStartDate,
      },
      {
        type: 'custom',
        name: 'endDate',
        label: 'End Date',
        required: true,
        render: ({ value, onChange, inputClassName, values }) => (
          <div className="relative z-40 mb-4">
            <DatePicker
              selected={value}
              onChange={onChange}
              minDate={values?.startDate > getMinStartDate() ? values.startDate : getMinStartDate()}
              placeholderText="Select end date"
              className={inputClassName}
              wrapperClassName="date-picker-wrapper"
              popperPlacement="bottom-start"
              popperModifiers={[
                { name: 'preventOverflow', options: { boundary: 'viewport' } },
              ]}
            />
          </div>
        ),
        validate: validateEndDate,
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
