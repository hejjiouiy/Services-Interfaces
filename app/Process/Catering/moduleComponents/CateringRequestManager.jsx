'use client';
import React, { useState, useEffect } from 'react';
import SectionTitle from '../../../../sharedComponents/components/SectionTitle';
import StatusBadge from '../../../../sharedComponents/components/StatusBadge';
import MultiStepForm from '../../../../sharedComponents/components/MultiStepForm/MultiStepForm';
import LoadingSpinner from '../../../../sharedComponents/components/LoadingSpinner';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// --- Lead-time (hours) per service type
const MIN_HOURS = { PAUSE_CAFE: 48, SELF: 24, VIP: 72, FONTAINE: 48, EXTRAS: 48 };
const hoursUntil = (d) => (new Date(d).getTime() - Date.now()) / 36e5;
const canModifyOrCancel = (req) =>
  hoursUntil(req.eventDate) >= (MIN_HOURS[req.serviceType] || 48) && !req.alreadyModified;

const getMinDateForType = (type) => {
  const daysMap = { PAUSE_CAFE: 2, SELF: 1, VIP: 3, FONTAINE: 2, EXTRAS: 3 };
  const days = daysMap[type] ?? 2;
  const min = new Date();
  min.setHours(0, 0, 0, 0);
  min.setDate(min.getDate() + days);
  return min;
};

export default function CateringRequestManager() {
  const [requests, setRequests] = useState([]);
  const [editingRequest, setEditingRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mocks
    const timer = setTimeout(() => {
      setRequests([
        {
          id: 'CAT001',
          title: 'Pedagogical committee meeting',
          serviceType: 'PAUSE_CAFE',
          eventDate: '2025-10-05',
          period: 'Morning',
          peopleCount: 25,
          location: 'Room B02',
          time: '10:00',
          justification: 'Important meeting',
          status: 'PENDING',
          alreadyModified: false,
        },
        {
          id: 'CAT002',
          title: 'Mentorship workshop',
          serviceType: 'SELF',
          eventDate: '2025-10-12',
          period: 'Afternoon',
          peopleCount: 40,
          location: 'FMS Open Space',
          time: '13:00',
          justification: '',
          status: 'APPROVED',
          alreadyModified: false,
        },
      ]);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleCancel = (req) => {
    if (!canModifyOrCancel(req)) {
      alert('Cancellation window has passed or request was already modified.');
      return;
    }
    if (confirm('Confirm cancellation?')) {
      setRequests((prev) =>
        prev.map((r) => (r.id === req.id ? { ...r, status: 'CANCELLED' } : r))
      );
    }
  };

  const handleUpdate = (values) => {
    // Normalize eventDate back to YYYY-MM-DD for mocks
    const normalized = {
      ...values,
      eventDate: values.eventDate instanceof Date
        ? values.eventDate.toISOString().slice(0, 10)
        : values.eventDate,
      alreadyModified: true,
    };
    setRequests((prev) => prev.map((r) => (r.id === values.id ? { ...r, ...normalized } : r)));
    setEditingRequest(null);
  };

  // ----- Editor steps (reuse the same two steps as the create form, simplified)
  const step1 = {
    title: 'Edit request',
    description: 'Update general information.',
    fields: [
      { type: 'text', name: 'title', label: 'Subject', required: true },
      {
        type: 'select',
        name: 'serviceType',
        label: 'Service type',
        required: true,
        options: ['PAUSE_CAFE', 'SELF', 'VIP', 'FONTAINE', 'EXTRAS'].map((t) => ({
          value: t,
          label: t.replace(/_/g, ' '),
        })),
      },
      {
        type: 'custom',
        name: 'eventDate',
        label: 'Service date',
        required: true,
        render: ({ value, onChange, inputClassName, values }) => {
          const minDate = getMinDateForType(values?.serviceType || 'PAUSE_CAFE');
          const selected = value instanceof Date && !Number.isNaN(value) ? value : null;
          return (
            <div className="relative z-50 mb-4">
              <DatePicker
                selected={selected}
                onChange={(date) => onChange(date)} // pass raw Date
                minDate={minDate}
                className={inputClassName}
                placeholderText="Select a date"
              />
            </div>
          );
        },
        validate: (value, values) => {
          if (!(value instanceof Date) || Number.isNaN(value)) return 'Date is required.';
          const min = getMinDateForType(values?.serviceType || 'PAUSE_CAFE');
          if (value < min) return 'Please respect the minimum lead time.';
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
    title: 'Logistics',
    description: '',
    fields: [
      { type: 'number', name: 'peopleCount', label: 'People count', required: true, min: 1 },
      { type: 'text', name: 'location', label: 'Location', required: true },
      { type: 'time', name: 'time', label: 'Time', required: true },
      { type: 'textarea', name: 'justification', label: 'Justification (optional)', rows: 3 },
    ],
  };

  if (loading) return <LoadingSpinner />;

  // If in edit mode, show inline editor with prefilled values
  if (editingRequest) {
    return (
      <div className="p-6">
        <SectionTitle title={`Edit request #${editingRequest.id}`} />
        <MultiStepForm
          steps={[step1, step2]}
          onSubmit={handleUpdate}
          initialValues={{
            ...editingRequest,
            // ensure Date object for DatePicker
            eventDate: new Date(editingRequest.eventDate),
          }}
        />
        <div className="mt-6 text-center">
          <button
            onClick={() => setEditingRequest(null)}
            className="text-sm text-gray-500 hover:underline"
          >
            ⬅ Back to list
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SectionTitle title="Manage my catering requests" />
      {requests.map((req) => {
        const editable = canModifyOrCancel(req);
        const cancellable = canModifyOrCancel(req);

        return (
          <div
            key={req.id}
            className="bg-white rounded-lg shadow border border-gray-200 p-4 sm:p-6"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-darker-beige">{req.title}</h3>
                <p className="text-sm text-gray-600">
                  {new Date(req.eventDate).toLocaleDateString('en-GB')} — {req.serviceType.replace(/_/g, ' ')}
                </p>
                <p className="text-sm text-gray-600">🧍 {req.peopleCount} | {req.period} | 📍 {req.location}</p>
              </div>
              <div className="text-right space-y-2">
                <StatusBadge status={req.status} />
                <p className="text-xs text-gray-500">ID: {req.id}</p>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              {editable && (
                <button
                  onClick={() => {
                    if (!canModifyOrCancel(req)) {
                      alert('Edit window has passed or the request was already modified.');
                      return;
                    }
                    setEditingRequest(req);
                  }}
                  className="px-4 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 text-sm"
                >
                  ✏️ Edit
                </button>
              )}
              {cancellable && (
                <button
                  onClick={() => handleCancel(req)}
                  className="px-4 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200 text-sm"
                >
                  ❌ Cancel
                </button>
              )}
            </div>

            {!editable && (
              <p className="mt-2 text-xs text-gray-500">
                Editing disabled: deadline passed or already modified.
              </p>
            )}
            {!cancellable && (
              <p className="text-xs text-gray-500">
                Cancellation disabled: deadline passed or already modified.
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
