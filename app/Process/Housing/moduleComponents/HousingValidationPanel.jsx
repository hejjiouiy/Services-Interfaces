'use client';
import React, { useState } from 'react';
import RequestValidationTable from '../../../../sharedComponents/components/RequestValidationTable';

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

export default function HousingValidationPanel() {
  const [requests, setRequests] = useState(initialRequests);

  const handleAccept = (id) => {
    setRequests((prev) =>
      prev.map((req) => req.id === id ? { ...req, status: 'ACCEPTED' } : req)
    );
  };

  const handleRefuse = (id, reason) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: 'REJECTED', refusalReason: reason } : req
      )
    );
  };

  const columns = [
    { key: 'requester', header: 'Requester' },
    {
      key: 'startDate',
      header: 'Stay Period',
      render: (val, row) => `${row.startDate} → ${row.endDate}`
    },
    { key: 'type', header: 'Type' },
    { key: 'reason', header: 'Reason' },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-main-green mb-4">Housing Requests Processing</h2>
      <RequestValidationTable
        data={requests}
        onAccept={handleAccept}
        onRefuse={handleRefuse}
        columns={columns}
      />
    </div>
  );
}
