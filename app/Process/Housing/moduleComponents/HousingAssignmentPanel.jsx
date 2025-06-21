'use client';
import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../../sharedComponents/components/SectionTitle';
import LoadingSpinner from '../../../../sharedComponents/components/LoadingSpinner';

export default function HousingAssignmentPanel() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // simulate API delay
    }, 800);
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <SectionTitle title="Housing Assignment Panel" />
      <p className="text-gray-600">Feature coming soon: assign guests to housing facilities.</p>
    </div>
  );
}
