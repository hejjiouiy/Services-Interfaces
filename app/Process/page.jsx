"use client";
import Services from '../../sharedComponents/layout/services/Services';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '../../sharedComponents/hooks/useAuth';

const tabs = [
  { label: "Access", href: "/Services/access" },
  { label: "Housing", href: "/Services/housing" },
  { label: "Catering", href: "/Services/catering" },
  { label: "Missions & Travel", href: "/Services/missions" },
];

const ServicesPage = () => {
  const user = useUser();
  const pathname = usePathname();

  return (
    <main>
      <Services />

      {/* Messages par rôle */}
      <div className="p-6">
        {user.role === "responsable" && (
          <div className="bg-green-100 border-l-4 border-green-600 p-4 rounded">
            <p className="font-medium">Vous êtes connecté en tant que <strong>Responsable</strong>.</p>
            <p>Vous pouvez valider ou refuser les demandes.</p>
          </div>
        )}

        {user.role === "demandeur" && (
          <div className="bg-blue-100 border-l-4 border-blue-600 p-4 rounded">
            <p className="font-medium">Vous êtes connecté en tant que <strong>Demandeur</strong>.</p>
            <p>Vous pouvez soumettre et suivre vos demandes.</p>
          </div>
        )}

        {user.role === "communication" && (
          <div className="bg-yellow-100 border-l-4 border-yellow-600 p-4 rounded">
            <p className="font-medium">Vous êtes connecté en tant que <strong>Communication</strong>.</p>
            <p>Vous pouvez suivre la progression des événements.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default ServicesPage;
