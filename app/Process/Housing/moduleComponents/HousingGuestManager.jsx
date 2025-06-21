'use client';
import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../../sharedComponents/components/SectionTitle';
import LoadingSpinner from '../../../../sharedComponents/components/LoadingSpinner';

export default function HousingGuestManager() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <SectionTitle title="Guest Management" />
      <p className="text-gray-600">This module will allow you to manage guest identities and assignments.</p>
    </div>
  );
}
