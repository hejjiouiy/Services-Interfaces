'use client';

import React, { useState } from 'react';
import { useUser } from '@/sharedComponents/hooks/useAuth';
import Button from '@/sharedComponents/components/button';

const VisitorPasses = () => {
  const user = useUser();

  const [invites, setInvites] = useState('');
  const [date, setDate] = useState('');
  const [duree, setDuree] = useState('');
  const [motif, setMotif] = useState('');

  if (user.role !== 'demandeur') {
    return (
      <div className="text-gray-500 italic">
        Seuls les demandeurs peuvent soumettre une demande de badge visiteur.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-main-green">Demande de badge visiteur</h2>

      <form className="space-y-4">
        {/* Noms des visiteurs */}
        <div>
          <label className="block mb-1 font-medium">Nom(s) des visiteurs</label>
          <textarea
            value={invites}
            onChange={(e) => setInvites(e.target.value)}
            className="border rounded px-4 py-2 w-full"
            placeholder="Ex : Youssef El Idrissi, Salma El Amrani..."
          />
        </div>

        {/* Date */}
        <div>
          <label className="block mb-1 font-medium">Date de visite</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border rounded px-4 py-2 w-full"
          />
        </div>

        {/* Durée */}
        <div>
          <label className="block mb-1 font-medium">Durée prévue</label>
          <input
            type="text"
            value={duree}
            onChange={(e) => setDuree(e.target.value)}
            className="border rounded px-4 py-2 w-full"
            placeholder="Ex : 2 heures, journée entière, etc."
          />
        </div>

        {/* Motif */}
        <div>
          <label className="block mb-1 font-medium">Motif de la visite</label>
          <input
            type="text"
            value={motif}
            onChange={(e) => setMotif(e.target.value)}
            className="border rounded px-4 py-2 w-full"
            placeholder="Ex : Livraison, réunion, entretien..."
          />
        </div>

        {/* Bouton */}
        <Button label="Envoyer la demande de badge" />
      </form>
    </div>
  );
};

export default VisitorPasses;
