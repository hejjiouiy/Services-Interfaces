'use client';
import React, { useState, useEffect } from 'react';
import SectionTitle from '../../../../sharedComponents/components/SectionTitle';
import StatusBadge from '../../../../sharedComponents/components/StatusBadge';
import LoadingSpinner from '../../../../sharedComponents/components/LoadingSpinner';

export default function CateringRequestList() {
  const [requests, setRequests] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState('ALL');
  const STATUS_LABELS = {
    PENDING: 'Pending',
    APPROVED: 'Approved',
    REJECTED: 'Rejected',
    CANCELLED: 'Cancelled',
  };

  useEffect(() => {
    // Mocks (simulate network loading)
    const timer = setTimeout(() => {
      setRequests([
        {
          id: 'CAT002',
          title: 'Mentorship workshop',
          serviceType: 'SELF',
          category: 'SELF2',
          eventDate: '2025-07-12',
          time: '15:00',
          peopleCount: 40,
          period: 'Afternoon',
          status: 'APPROVED',
          location: 'FMS Open Space',
          justification: '',
        },
        {
          id: 'CAT001',
          title: 'Pedagogical committee meeting',
          serviceType: 'PAUSE_CAFE',
          category: 'UP',
          eventDate: '2025-07-05',
          time: '09:30',
          peopleCount: 25,
          period: 'Morning',
          status: 'PENDING',
          location: 'Room B02',
          justification: 'Meeting with program coordinators',
        },
      ]);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const toggleDetails = (id) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  if (loading) return <LoadingSpinner />;

  // Filter + sort (desc) by date
  const visible = [...requests]
    .filter((r) => statusFilter === 'ALL' || r.status === statusFilter)
    .sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SectionTitle title="My catering requests" />
        <div className="flex items-center gap-2">
          <label htmlFor="statusFilter" className="text-sm text-gray-600">Status</label>
          <select
            id="statusFilter"
            className="border rounded px-2 py-1 text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All</option>
            <option value="PENDING">{STATUS_LABELS.PENDING}</option>
            <option value="APPROVED">{STATUS_LABELS.APPROVED}</option>
            <option value="REJECTED">{STATUS_LABELS.REJECTED}</option>
            <option value="CANCELLED">{STATUS_LABELS.CANCELLED}</option>
          </select>
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="text-center py-16">
          <h3 className="text-lg font-semibold text-darker-beige mb-2">No requests</h3>
          <p className="text-sm text-gray-500">
            No results for the selected filter.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {visible.map((req) => (
            <div
              key={req.id}
              className="bg-white rounded-lg shadow border border-gray-200 hover:shadow-md transition cursor-pointer"
              onClick={() => toggleDetails(req.id)}
            >
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-darker-beige">{req.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {new Date(req.eventDate).toLocaleDateString('en-GB')} — {req.serviceType.replace(/_/g, ' ')}
                    </p>
                    <p className="text-sm text-gray-600">
                      People: {req.peopleCount} | {req.period}
                    </p>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={req.status} />
                    <p className="text-xs text-gray-500 mt-1">ID: {req.id}</p>
                  </div>
                </div>

                {selectedId === req.id && (
                  <div className="mt-4 border-t pt-4 text-sm text-gray-700 space-y-2">
                    <p><strong>Category:</strong> {req.category ?? '-'}</p>
                    <p><strong>Time:</strong> {req.time ?? '-'}</p>
                    <p><strong>Location:</strong> {req.location}</p>
                    {req.justification ? (
                      <p><strong>Justification:</strong> {req.justification}</p>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
