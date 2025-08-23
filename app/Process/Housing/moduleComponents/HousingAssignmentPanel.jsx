'use client';
import React, { useEffect, useState, useRef } from 'react';
import SectionTitle from '../../../../sharedComponents/components/SectionTitle';
import LoadingSpinner from '../../../../sharedComponents/components/LoadingSpinner';

// ----- Mock data
const MOCK_BUDGET_LINES = [
  { value: 'BL-2025-OPS',   label: 'BL-2025-OPS (Operations)' },
  { value: 'BL-2025-CAPEX', label: 'BL-2025-CAPEX (CapEx)' },
  { value: 'BL-2025-MISC',  label: 'BL-2025-MISC (Miscellaneous)' },
];

const MOCK_REQUESTS = [
  { id: 'HOU-001', title: 'Visiting researcher',     date: '2025-09-10', requester: 'John D.' },
  { id: 'HOU-002', title: 'Conference attendees',    date: '2025-09-15', requester: 'Dept. CS' },
  { id: 'HOU-003', title: 'Short-term staff housing', date: '2025-10-01', requester: 'HR Office' },
];

// ----- Lightweight custom select (avoid Chrome transform bug with native <select>)
function SimpleSelect({ options, value, onChange, placeholder = 'Choose…', disabled }) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (!btnRef.current?.contains(e.target) && !menuRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const current = options.find((o) => o.value === value);

  return (
    <div className="relative">
      <button
        type="button"
        ref={btnRef}
        className="w-full border rounded px-3 py-2 text-left disabled:opacity-60"
        onClick={() => !disabled && setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={disabled}
      >
        {current ? current.label : <span className="text-gray-400">{placeholder}</span>}
        <span className="float-right">▾</span>
      </button>

      {open && (
        <ul
          ref={menuRef}
          role="listbox"
          className="absolute z-50 mt-1 w-full bg-white border rounded shadow max-h-56 overflow-auto"
        >
          {options.map((o) => (
            <li key={o.value}>
              <button
                type="button"
                role="option"
                aria-selected={value === o.value}
                className={`block w-full text-left px-3 py-2 hover:bg-gray-50 ${value === o.value ? 'bg-gray-100' : ''}`}
                onClick={() => { onChange(o.value); setOpen(false); }}
              >
                {o.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function HousingAssignmentPanel() {
  const [loading, setLoading] = useState(true);

  // form state
  const [requestId, setRequestId]   = useState('');
  const [budgetLine, setBudgetLine] = useState('');
  const [note, setNote]             = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [assigned, setAssigned]     = useState(false);
  const [error, setError]           = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    // simulate initial fetch (e.g., existing assignment)
    const t = setTimeout(() => {
      // Prefill from ?requestId= if present
      if (typeof window !== 'undefined') {
        const rid = new URLSearchParams(window.location.search).get('requestId');
        if (rid) setRequestId(rid);
      }
      setLoading(false);
    }, 600);
    return () => clearTimeout(t);
  }, []);

  const handleAssign = (e) => {
    e.preventDefault();
    setSuccessMsg(''); setError('');

    if (!requestId)  return setError('Please select a request.');
    if (!budgetLine) return setError('Budget line is required.');

    setSubmitting(true);
    // mock API call
    setTimeout(() => {
      setSubmitting(false);
      setAssigned(true);
      setSuccessMsg(`Budget line ${budgetLine} assigned to request ${requestId}.`);
    }, 700);
  };

  if (loading) return <LoadingSpinner />;

  const requestOptions = MOCK_REQUESTS.map(r => ({
    value: r.id,
    label: `[${r.id}] ${r.title} — ${new Date(r.date).toLocaleDateString('en-GB')}`,
  }));
  const currentReq = MOCK_REQUESTS.find(r => r.id === requestId);

  return (
    <div className="p-6 max-w-2xl">
      <SectionTitle title="Assignment & Budget" />
      <p className="text-gray-600 mb-4">
        Select a housing request and assign a budget line (responsible only).
      </p>

      {/* Feedback banners */}
      {successMsg && (
        <div className="mb-4 rounded border border-green-200 bg-green-50 px-3 py-2 text-green-800">
          {successMsg}
        </div>
      )}
      {error && (
        <div className="mb-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleAssign} className="space-y-5">
        {/* Request selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Request *</label>
          <SimpleSelect
            options={requestOptions}
            value={requestId}
            onChange={setRequestId}
            placeholder="Choose a request…"
            disabled={submitting}
          />
          {currentReq && (
            <div className="mt-2 text-xs text-gray-600">
              <span className="font-medium">Selected:</span>{' '}
              <span>{currentReq.title}</span>{' '}
              <span className="mx-1">•</span>
              <span>{new Date(currentReq.date).toLocaleDateString('en-GB')}</span>{' '}
              <span className="mx-1">•</span>
              <span>Requester: {currentReq.requester}</span>
            </div>
          )}
        </div>

        {/* Budget line selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Budget line *</label>
          <SimpleSelect
            options={MOCK_BUDGET_LINES}
            value={budgetLine}
            onChange={setBudgetLine}
            disabled={submitting}
          />
        </div>

        {/* Optional note */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Note (optional)</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            rows={3}
            placeholder="Short justification or internal note…"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            disabled={submitting}
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="bg-main-green text-white px-4 py-2 rounded hover:bg-darker-green disabled:opacity-60"
          >
            {assigned ? 'Update assignment' : 'Assign budget line'}
          </button>
          {submitting && <span className="text-sm text-gray-500">Saving…</span>}
        </div>

        {assigned && (
          <p className="text-xs text-gray-500">
            You can update the assignment at any time. API wiring will replace this mock call later.
          </p>
        )}
      </form>
    </div>
  );
}
