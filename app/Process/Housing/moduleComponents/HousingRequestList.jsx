'use client';
import React, { useState, useEffect } from 'react';
import StatusBadge from '../../../../sharedComponents/components/StatusBadge';
import SectionTitle from '../../../../sharedComponents/components/SectionTitle';
import LoadingSpinner from '../../../../sharedComponents/components/LoadingSpinner';

export default function HousingRequestList() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      const mockData = [
        {
          id: 'HB001',
          housingType: 'SHORT_TERM',
          startDate: '2025-07-10',
          endDate: '2025-07-15',
          numGuests: 3,
          status: 'PENDING',
          submissionDate: '2025-06-10',
          justificationFile: 'link-to-justif.pdf',
          guestListFile: 'link-to-guests.pdf',
          refusalReason: null
        },
        {
          id: 'HB002',
          housingType: 'GUEST_ONLY',
          startDate: '2025-08-01',
          endDate: '2025-08-03',
          numGuests: 1,
          status: 'REJECTED',
          submissionDate: '2025-06-05',
          justificationFile: 'link-to-justif.pdf',
          guestListFile: null,
          refusalReason: 'Not justified for external guests.'
        }
      ];
      setRequests(mockData);
      setLoading(false);
    }, 800);
  }, []);

  const toggleExpand = (id) => {
    setSelectedRequestId(prev => prev === id ? null : id);
  };

  if (loading) return <LoadingSpinner />;

  if (requests.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-darker-beige">No housing requests</h3>
        <p className="text-sm text-gray-500">You haven't submitted any requests yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SectionTitle title="My Housing Requests" />

      <div className="grid gap-6">
        {requests.map(req => (
          <div
            key={req.id}
            className="bg-white rounded-lg shadow border border-gray-200 hover:shadow-md transition cursor-pointer"
            onClick={() => toggleExpand(req.id)}
          >
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-darker-beige">Request #{req.id}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {new Date(req.startDate).toLocaleDateString('en-GB')} → {new Date(req.endDate).toLocaleDateString('en-GB')}
                  </p>
                  <p className="text-sm text-gray-600">
                    Guests: {req.numGuests} | Type: {req.housingType.replace('_', ' ')}
                  </p>
                </div>
                <div className="text-right">
                  <StatusBadge status={req.status} />
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(req.submissionDate).toLocaleDateString('en-GB')}
                  </p>
                </div>
              </div>

              {selectedRequestId === req.id && (
                <div className="mt-4 border-t pt-4 text-sm text-gray-700 space-y-2">
                  <div className="flex gap-4 flex-wrap">
                    {req.justificationFile && (
                      <a href={req.justificationFile} target="_blank" className="text-blue-600 hover:underline">
                        📎 Justification
                      </a>
                    )}
                    {req.guestListFile && (
                      <a href={req.guestListFile} target="_blank" className="text-blue-600 hover:underline">
                        👥 Guest List
                      </a>
                    )}
                  </div>

                  {req.status === 'REJECTED' && req.refusalReason && (
                    <p className="text-red-600 italic">Reason: {req.refusalReason}</p>
                  )}

                  {req.status === 'PENDING' && (
                    <div className="flex gap-3 pt-3">
                      <button className="px-3 py-1 bg-orange-100 text-orange-800 rounded hover:bg-orange-200 text-sm">✏️ Edit</button>
                      <button className="px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200 text-sm">❌ Cancel</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
