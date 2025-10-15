"use client";
import Services from '../../sharedComponents/layout/services/Services';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { label: "Access", href: "/Services/access" },
  { label: "Housing", href: "/Services/housing" },
  { label: "Catering", href: "/Services/catering" },
  { label: "Missions & Travel", href: "/Services/missions" },
];

const ServicesPage = () => {
  const pathname = usePathname();

  return (
    <main>
      <Services />
    </main>
  );
};

export default ServicesPage;
