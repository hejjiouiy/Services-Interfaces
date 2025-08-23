'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import StatusBadge from '../../../sharedComponents/components/StatusBadge';
import SectionTitle from '../../../sharedComponents/components/SectionTitle';
import LoadingSpinner from '../../../sharedComponents/components/LoadingSpinner';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// ---- Safe date helpers
const parseISODate = (s) => (typeof s === 'string' ? new Date(`${s}T00:00:00`) : s);
const startOfDay = (d) => { const x = new Date(d); x.setHours(0,0,0,0); return x; };
const endOfDay   = (d) => { const x = new Date(d); x.setHours(23,59,59,999); return x; };

// ---- Lightweight custom select (same idea as HousingAssignmentPanel)
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
        className="w-40 border rounded px-2 py-1 text-left text-sm disabled:opacity-60"
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
                className={`block w-full text-left px-2 py-1 text-sm hover:bg-gray-50 ${value === o.value ? 'bg-gray-100' : ''}`}
                onMouseDown={(e) => { e.preventDefault(); onChange(o.value); setOpen(false); }}
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

export default function ApprovedEventsList() {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filters
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [fromDate, setFromDate] = useState(null); // Date | null
  const [toDate, setToDate] = useState(null);     // Date | null

  useEffect(() => {
    const timer = setTimeout(() => {
      setEvents([
        {
          id: 'APPROVED002',
          eventName: 'Medical Careers Forum',
          eventType: 'CONFERENCE',
          eventDate: '2025-08-12',
          venue: 'Grand Hall FMS',
          status: 'APPROVED',
          organizer: 'FMS Orientation',
          validatedBy: 'FMS Communication Team',
          description: 'A full day of presentations on medical career paths.',
          estimatedBudget: 18000,
        },
        {
          id: 'APPROVED001',
          eventName: 'Digital Health Hackathon',
          eventType: 'WORKSHOP',
          eventDate: '2025-07-05',
          venue: 'LabTech FMS',
          status: 'APPROVED',
          organizer: 'TechMed Club',
          validatedBy: 'FMS Communication Team',
          description: 'A 48-hour hackathon focused on digital health innovations.',
          estimatedBudget: 12000,
        },
        {
          id: 'APPROVED003',
          eventName: 'Student Cultural Night',
          eventType: 'CULTURAL',
          eventDate: '2025-06-25',
          venue: 'Amphi A',
          status: 'APPROVED',
          organizer: 'FMS Student Union',
          validatedBy: 'Head of Student Life',
          description: 'Music, theatre and exhibitions prepared by students.',
          estimatedBudget: 4000,
        },
      ]);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const typeOptions = useMemo(() => {
    const uniq = Array.from(new Set(events.map(e => e.eventType)));
    return [{ value: 'ALL', label: 'ALL' }, ...uniq.map(t => ({ value: t, label: t }))];
  }, [events]);

  const toggleExpanded = (id) => setSelectedEventId((prev) => (prev === id ? null : id));

  const visible = useMemo(() => {
    const inRange = (d) =>
      (!fromDate || d >= startOfDay(fromDate)) &&
      (!toDate   || d <= endOfDay(toDate));

    return events
      .filter((e) => e.status === 'APPROVED')
      .filter((e) => typeFilter === 'ALL' || e.eventType === typeFilter)
      .filter((e) => inRange(parseISODate(e.eventDate)))
      .sort((a, b) => parseISODate(b.eventDate) - parseISODate(a.eventDate));
  }, [events, typeFilter, fromDate, toDate]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <SectionTitle title="Approved Events" />

      {/* Filter bar */}
      <div className="flex flex-wrap gap-3 items-end">
        <div className="flex flex-col">
          <label className="text-xs text-gray-600 mb-1">Type</label>
          <SimpleSelect
            options={typeOptions}
            value={typeFilter}
            onChange={setTypeFilter}
            placeholder="All types"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs text-gray-600 mb-1">From date</label>
          <div className="relative z-50">
            <DatePicker
              selected={fromDate}
              onChange={setFromDate}
              placeholderText="Select date"
              className="border rounded px-2 py-1 text-sm"
              isClearable
              popperPlacement="bottom-start"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-xs text-gray-600 mb-1">To date</label>
          <div className="relative z-50">
            <DatePicker
              selected={toDate}
              onChange={setToDate}
              placeholderText="Select date"
              className="border rounded px-2 py-1 text-sm"
              isClearable
              popperPlacement="bottom-start"
              minDate={fromDate || undefined}
            />
          </div>
        </div>

        {(typeFilter !== 'ALL' || fromDate || toDate) && (
          <button
            className="ml-auto bg-gray-100 hover:bg-gray-200 text-gray-700 rounded px-3 py-1 text-sm"
            onClick={() => { setTypeFilter('ALL'); setFromDate(null); setToDate(null); }}
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Empty state */}
      {visible.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-darker-beige mb-2">No approved events</h3>
          <p className="text-gray-500 mb-4">No results match the selected filters.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {visible.map((event) => {
            const date = parseISODate(event.eventDate);
            return (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition cursor-pointer"
                onClick={() => toggleExpanded(event.id)}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-darker-beige mb-2">
                        {event.eventName}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span>📅 {date.toLocaleDateString('en-GB')}</span>
                        <span>🏷️ {event.eventType}</span>
                        <span>📍 {event.venue}</span>
                        <span>💰 {event.estimatedBudget.toLocaleString()} MAD</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <StatusBadge status={event.status} />
                      <span className="text-xs text-gray-500">#{event.id}</span>
                    </div>
                  </div>

                  {selectedEventId === event.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                        <div>
                          <h4 className="font-medium text-main-green mb-2">Organization</h4>
                          <ul className="space-y-1">
                            <li><strong>Organizer:</strong> {event.organizer}</li>
                            <li><strong>Validated by:</strong> {event.validatedBy}</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-main-green mb-2">Description</h4>
                          <p className="text-darker-beige">{event.description}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
