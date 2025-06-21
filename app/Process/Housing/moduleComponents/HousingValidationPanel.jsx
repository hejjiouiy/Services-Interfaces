'use client';
import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../../sharedComponents/components/SectionTitle';
import RequestValidationTable from '../../../../sharedComponents/components/RequestValidationTable';
import LoadingSpinner from '../../../../sharedComponents/components/LoadingSpinner';

export default function HousingValidationPanel() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setRequests([
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
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAccept = (id) => {
    setRequests((prev) =>
      prev.map((req) => req.id === id ? { ...req, status: 'APPROVED', refusalReason: undefined } : req)
    );
  };

  const handleRefuse = (id, reason) => {
    setRequests((prev) =>
      prev.map((req) => req.id === id ? { ...req, status: 'REJECTED', refusalReason: reason } : req)
    );
  };

  const columns = [
    { key: 'requester', header: 'Requester' },
    {
      key: 'startDate',
      header: 'Stay Period',
      render: (_, row) => `${row.startDate} → ${row.endDate}`
    },
    { key: 'type', header: 'Type' },
    { key: 'reason', header: 'Reason' },
  ];

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <SectionTitle title="Housing Requests Validation" />
      <RequestValidationTable
        data={requests}
        onAccept={handleAccept}
        onRefuse={handleRefuse}
        columns={columns}
      />
    </div>
  );
}
