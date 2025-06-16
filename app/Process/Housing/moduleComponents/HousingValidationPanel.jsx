'use client';
import React from 'react';
import RequestValidationTable from './RequestValidationTable';

export default function HousingValidationPanel() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Housing Requests Processing</h1>
      <RequestValidationTable />
    </div>
  );
}
