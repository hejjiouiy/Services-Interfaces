'use client';
import React, { useState } from 'react';
import RefusalModal from '../../../../sharedComponents/components/RefusalModal';
import StatusBadge from '../../../../sharedComponents/components/StatusBadge';

const initialRequests = [
  {
    id: 'REQ001',
    requester: 'John Doe',
    startDate: '2025-06-20',
    endDate: '2025-06-25',
    type: 'Short Term',
    reason: 'Medical seminar',
    status: 'PENDING',
  },
  {
    id: 'REQ002',
    requester: 'Jane Smith',
    startDate: '2025-07-01',
    endDate: '2025-07-05',
    type: 'Guest Only',
    reason: 'External lecturer',
    status: 'PENDING',
  },
];

export default function RequestValidationTable() {
  const [requests, setRequests] = useState(initialRequests);
  const [selectedRefusalId, setSelectedRefusalId] = useState(null);

  const handleAccept = (id) => {
    setRequests((prev) =>
      prev.map((req) => req.id === id ? { ...req, status: 'ACCEPTED' } : req)
    );
  };

  const handleRefuse = (id, reason) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: 'REFUSED', refusalReason: reason } : req
      )
    );
    setSelectedRefusalId(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Requester</th>
            <th className="px-4 py-2 text-left">Stay period</th>
            <th className="px-4 py-2 text-left">Request type</th>
            <th className="px-4 py-2 text-left">Reason</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id} className="border-t">
              <td className="px-4 py-2">{req.requester}</td>
              <td className="px-4 py-2">{req.startDate} → {req.endDate}</td>
              <td className="px-4 py-2">{req.type}</td>
              <td className="px-4 py-2">{req.reason}</td>
              <td className="px-4 py-2 font-medium">
                <StatusBadge status={req.status} />
                {req.status === 'REFUSED' && req.refusalReason && (
                  <div className="text-xs text-red-500 mt-1 italic">"{req.refusalReason}"</div>
                )}
              </td>
              <td className="px-4 py-2 space-x-2">
                {req.status === 'PENDING' && (
                  <>
                    <button
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                      onClick={() => handleAccept(req.id)}
                    >
                      Accept
                    </button>
                    <button
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                      onClick={() => setSelectedRefusalId(req.id)}
                    >
                      Refuse
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedRefusalId && (
        <RefusalModal
          onCancel={() => setSelectedRefusalId(null)}
          onValidate={(reason) => handleRefuse(selectedRefusalId, reason)}
        />
      )}
    </div>
  );
}
