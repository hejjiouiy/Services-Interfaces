'use client';

import React, { useState } from 'react';
import { useUser } from '@/sharedComponents/hooks/useUser';
import Button from '@/sharedComponents/components/button';

const Transport = () => {
  const user = useUser();

  // Form state
  const [destination, setDestination] = useState('');
  const [depart, setDepart] = useState('');
  const [retour, setRetour] = useState('');
  const [nbPersonnes, setNbPersonnes] = useState('');
  const [type, setType] = useState('Voiture');

  if (user.role !== 'demandeur') {
    return (
      <div className="text-gray-500 italic">
        Cette section est réservée aux demandeurs de transport.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-main-green">Demande de transport</h2>

      <form className="space-y-4">
        {/* Type de transport */}
        <div>
          <label className="block mb-1 font-medium">Type de transport</label>
          <select
            className="border rounded px-4 py-2 w-full"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option>Voiture</option>
            <option>Bus</option>
            <option>Navette</option>
          </select>
        </div>

        {/* Destination */}
        <div>
          <label className="block mb-1 font-medium">Destination</label>
          <input
            type="text"
            className="border rounded px-4 py-2 w-full"
            placeholder="Ex : Aéroport Marrakech, Centre-ville, etc."
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>

        {/* Dates */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1 font-medium">Date de départ</label>
            <input
              type="datetime-local"
              className="border rounded px-4 py-2 w-full"
              value={depart}
              onChange={(e) => setDepart(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-medium">Date de retour</label>
            <input
              type="datetime-local"
              className="border rounded px-4 py-2 w-full"
              value={retour}
              onChange={(e) => setRetour(e.target.value)}
            />
          </div>
        </div>

        {/* Nombre de personnes */}
        <div>
          <label className="block mb-1 font-medium">Nombre de personnes</label>
          <input
            type="number"
            min="1"
            className="border rounded px-4 py-2 w-full"
            value={nbPersonnes}
            onChange={(e) => setNbPersonnes(e.target.value)}
          />
        </div>

        {/* Soumettre */}
        <Button label="Soumettre la demande" />
      </form>
    </div>
  );
};

export default Transport;
