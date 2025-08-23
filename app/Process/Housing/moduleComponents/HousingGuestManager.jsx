'use client';
import React, { useEffect, useMemo, useState } from 'react';
import SectionTitle from '../../../../sharedComponents/components/SectionTitle';
import LoadingSpinner from '../../../../sharedComponents/components/LoadingSpinner';
import HousingFileUpload from './HousingFileUpload';

const ROLES = ['Guest', 'Speaker', 'VIP', 'Staff'];

const newRow = () => ({
  id: Math.random().toString(36).slice(2, 9),
  name: '',
  role: 'Guest',
  start: '',
  end: '',
  _errors: {},
});

const validateRow = (r) => {
  const errs = {};
  if (!r.name?.trim()) errs.name = 'Name is required.';
  if (!r.role) errs.role = 'Role is required.';
  if (!r.start) errs.start = 'Start date is required.';
  if (!r.end) errs.end = 'End date is required.';
  if (r.start && r.end && new Date(r.start) > new Date(r.end)) {
    errs.end = 'End date must be on/after start date.';
  }
  return errs;
};

export default function HousingGuestManager() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([newRow()]);
  const [fileName, setFileName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState(null); // {type:'success'|'error', text:string}

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const invalidCount = useMemo(
    () => rows.reduce((acc, r) => acc + (Object.keys(validateRow(r)).length ? 1 : 0), 0),
    [rows]
  );

  const updateField = (id, key, value) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [key]: value, _errors: { ...r._errors, [key]: undefined } } : r))
    );
  };

  const addRow = () => setRows((prev) => [...prev, newRow()]);
  const removeRow = (id) => setRows((prev) => (prev.length > 1 ? prev.filter((r) => r.id !== id) : prev));

  // Parse CSV: name,role,start,end
  const handleFile = async (file) => {
    setSubmitMsg(null);
    setFileName(file ? file.name : '');
    if (!file) return;
    const text = await file.text();
    const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    if (!lines.length) return;

    const maybeHeader = lines[0].toLowerCase();
    const hasHeader =
      maybeHeader.includes('name') && maybeHeader.includes('role') && maybeHeader.includes('start');

    const dataLines = hasHeader ? lines.slice(1) : lines;
    const imported = dataLines.map((l) => {
      const [name = '', role = 'Guest', start = '', end = ''] = l.split(',').map((s) => s?.trim());
      // normalize role
      const normRole = ROLES.includes(role) ? role : 'Guest';
      return { ...newRow(), name, role: normRole, start, end };
    });

    // Merge: append to existing rows
    setRows((prev) => [...prev, ...imported]);
  };

  const validateAll = () => {
    let ok = true;
    setRows((prev) =>
      prev.map((r) => {
        const errs = validateRow(r);
        if (Object.keys(errs).length) ok = false;
        return { ...r, _errors: errs };
      })
    );
    return ok;
  };

  const handleSubmit = async () => {
    setSubmitMsg(null);
    if (!validateAll()) {
      setSubmitMsg({ type: 'error', text: 'Please fix validation errors before submitting.' });
      return;
    }
    setSubmitting(true);
    try {
      // MOCK POST /reservations-invites
      await new Promise((res) => setTimeout(res, 900));
      setSubmitMsg({ type: 'success', text: 'Guest reservations saved successfully (mock).' });
      // Optionally clear after success:
      // setRows([newRow()]);
    } catch (e) {
      setSubmitMsg({ type: 'error', text: 'Failed to save reservations (mock).' });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <SectionTitle title="Guest Reservations (Responsible)" />
      <p className="text-gray-600 mb-4">
        Add or import guest reservations for housing. You can edit rows inline or upload a CSV file.
      </p>

      {/* Import */}
      <div className="mb-4">
        <HousingFileUpload
          label="Import CSV (columns: name,role,start,end)"
          acceptedTypes=".csv"
          onFileChange={handleFile}
        />
        {fileName ? <p className="text-xs text-gray-500 mt-1">Loaded: {fileName}</p> : null}
      </div>

      {/* Manual rows */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr className="text-left text-gray-600 text-sm">
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Role</th>
              <th className="px-3 py-2">Start</th>
              <th className="px-3 py-2">End</th>
              <th className="px-3 py-2 w-12"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t text-sm">
                <td className="px-3 py-2 align-top">
                  <input
                    type="text"
                    className={`w-full border rounded px-2 py-1 ${r._errors?.name ? 'border-red-400' : 'border-gray-300'}`}
                    value={r.name}
                    onChange={(e) => updateField(r.id, 'name', e.target.value)}
                    placeholder="Full name"
                  />
                  {r._errors?.name && <p className="text-xs text-red-500 mt-1">{r._errors.name}</p>}
                </td>
                <td className="px-3 py-2 align-top">
                  <select
                    className={`w-full border rounded px-2 py-1 ${r._errors?.role ? 'border-red-400' : 'border-gray-300'}`}
                    value={r.role}
                    onChange={(e) => updateField(r.id, 'role', e.target.value)}
                  >
                    {ROLES.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  {r._errors?.role && <p className="text-xs text-red-500 mt-1">{r._errors.role}</p>}
                </td>
                <td className="px-3 py-2 align-top">
                  <input
                    type="date"
                    className={`w-full border rounded px-2 py-1 ${r._errors?.start ? 'border-red-400' : 'border-gray-300'}`}
                    value={r.start}
                    onChange={(e) => updateField(r.id, 'start', e.target.value)}
                  />
                  {r._errors?.start && <p className="text-xs text-red-500 mt-1">{r._errors.start}</p>}
                </td>
                <td className="px-3 py-2 align-top">
                  <input
                    type="date"
                    className={`w-full border rounded px-2 py-1 ${r._errors?.end ? 'border-red-400' : 'border-gray-300'}`}
                    value={r.end}
                    onChange={(e) => updateField(r.id, 'end', e.target.value)}
                  />
                  {r._errors?.end && <p className="text-xs text-red-500 mt-1">{r._errors.end}</p>}
                </td>
                <td className="px-3 py-2 align-top">
                  <button
                    onClick={() => removeRow(r.id)}
                    className="text-sm text-red-600 hover:underline"
                    title="Remove row"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-3 flex items-center gap-3">
          <button
            onClick={addRow}
            className="px-3 py-1 rounded bg-main-green text-white hover:bg-darker-green text-sm"
          >
            + Add row
          </button>
          {invalidCount > 0 && (
            <span className="text-xs text-red-500">
              {invalidCount} row{invalidCount > 1 ? 's' : ''} with validation errors.
            </span>
          )}
        </div>
      </div>

      {/* Submit */}
      <div className="mt-6">
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="px-4 py-2 rounded bg-main-green text-white hover:bg-darker-green disabled:opacity-60"
        >
          {submitting ? 'Saving…' : 'Save reservations (mock)'}
        </button>
        {submitMsg && (
          <p className={`mt-2 text-sm ${submitMsg.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {submitMsg.text}
          </p>
        )}
      </div>
    </div>
  );
}
