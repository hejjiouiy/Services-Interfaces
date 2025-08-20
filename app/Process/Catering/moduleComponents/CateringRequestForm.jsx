'use client';
import React, { useState } from 'react';
import MultiStepForm from '../../../../sharedComponents/components/MultiStepForm/MultiStepForm';
import SectionTitle from '../../../../sharedComponents/components/SectionTitle';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const optionsByType = {
  PAUSE_CAFE: [
    { value: 'STD',  label: 'Standard' },
    { value: 'UP',   label: 'Enhanced' },
    { value: 'VIP',  label: 'VIP' },
  ],
  SELF: [
    { value: 'SELF1', label: 'Self 1' },
    { value: 'SELF2', label: 'Self 2' },
    { value: 'SELF3', label: 'Self 3' },
  ],
  FONTAINE: [
    { value: 'F48', label: 'Water dispenser (48h)' },
    { value: 'F72', label: 'Water dispenser (72h)' },
  ],
  EXTRAS: [
    { value: 'E48', label: 'Extras (48h)' },
    { value: 'E72', label: 'Extras (72h)' },
  ],
  VIP: [{ value: 'TABLE', label: 'Table service' }],
};

const getMinDateForType = (type) => {
  const delays = { PAUSE_CAFE: 2, SELF: 1, VIP: 3, FONTAINE: 2, EXTRAS: 3 };
  const days = delays[type] ?? 2;
  const min = new Date();
  min.setHours(0, 0, 0, 0);
  min.setDate(min.getDate() + days);
  return min;
};

const isValidDate = (v) => v instanceof Date && !Number.isNaN(v.getTime());

// Get the current service type from various props depending on MultiStepForm internals
const getCurrentTypeFrom = (p) =>
  p?.values?.serviceType ??
  p?.formValues?.serviceType ??
  p?.allValues?.serviceType ??
  (typeof p?.getValues === 'function' ? p.getValues('serviceType') : undefined) ??
  'PAUSE_CAFE';

const CateringRequestForm = () => {
  const [submittedData, setSubmittedData] = useState(null);

  const step1 = {
    title: 'General information',
    description: 'Basic details about your catering request.',
    fields: [
      {
        type: 'text',
        name: 'title',
        label: 'Request subject',
        required: true,
      },

      // Service type BEFORE category
      {
        type: 'select',
        name: 'serviceType',
        label: 'Service type',
        required: true,
        options: ['PAUSE_CAFE', 'SELF', 'VIP', 'FONTAINE', 'EXTRAS'].map((type) => ({
          label: type.replace(/_/g, ' '),
          value: type,
        })),
      },

      {
        type: 'custom',
        name: 'category',
        label: 'Category',
        required: true,
        render: (p) => {
          const { value, onChange, inputClassName } = p;
          const currentType = getCurrentTypeFrom(p);
          const opts = optionsByType[currentType] ?? [];
          const safeValue = opts.some(o => o.value === value) ? value : '';
          return (
            <select
              key={currentType} // re-mount when service type changes
              className={inputClassName}
              value={safeValue}
              onChange={(e) => onChange(e.target.value)} // raw value
            >
              <option value="" disabled>Choose…</option>
              {opts.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          );
        },
        validate: (v) => !v ? 'Category is required.' : null,
      },

      {
        type: 'custom',
        name: 'eventDate',
        label: 'Requested date',
        required: true,
        render: (p) => {
          const { value, onChange, inputClassName } = p;
          const currentType = getCurrentTypeFrom(p);
          const minDate = getMinDateForType(currentType);
          const selectedDate = isValidDate(value) ? value : null;
          return (
            <div className="relative z-50 mb-4">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => onChange(date)}   // raw Date
                minDate={minDate}
                placeholderText="Select a date"
                className={inputClassName}
              />
            </div>
          );
        },
        validate: (value, p) => {
          if (!isValidDate(value)) return 'Date is required.';
          const currentType = getCurrentTypeFrom(p);
          const minDate = getMinDateForType(currentType);
          if (value < minDate) return 'Please respect the minimum lead time.';
          return null;
        },
      },

      {
        type: 'radio',
        name: 'period',
        label: 'Period',
        required: true,
        options: ['Morning', 'Afternoon'].map((p) => ({ value: p, label: p })),
      },
    ],
  };

  const step2 = {
    title: 'Logistics details',
    description: 'Specific logistics information.',
    fields: [
      { type: 'number', name: 'peopleCount', label: 'People count', required: true, min: 1 },
      { type: 'text',   name: 'location',    label: 'Location / room', required: true },
      { type: 'time',   name: 'time',        label: 'Requested time', required: true },
      { type: 'textarea', name: 'justification', label: 'Justification (optional)', rows: 3 },
    ],
  };

  const handleSubmit = (formData) => {
    const enriched = {
      ...formData,
      id: Math.random().toString(36).slice(2, 9),
      status: 'PENDING',
      submittedAt: new Date().toISOString(),
    };
    setSubmittedData(enriched);
  };

  if (submittedData) {
    return (
      <div className="bg-white p-6 rounded-lg shadow max-w-3xl mx-auto text-center">
        <SectionTitle title="Catering request submitted ✅" />
        <p className="text-gray-600 my-4">Your request has been recorded with ID:</p>
        <p className="text-main-green text-xl font-bold mb-6">{submittedData.id}</p>
        <button
          onClick={() => setSubmittedData(null)}
          className="bg-main-green text-white px-6 py-2 rounded hover:bg-darker-green"
        >
          New request
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <SectionTitle title="Catering request form" />
      <MultiStepForm
        steps={[step1, step2]}
        onSubmit={handleSubmit}
        initialValues={{
          serviceType: 'PAUSE_CAFE',
          category: '',
          peopleCount: 1,
          period: 'Morning',
          eventDate: null,
        }}
      />
    </div>
  );
};

export default CateringRequestForm;
