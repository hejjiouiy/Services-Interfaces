'use client';

import React from 'react';
import { useUser } from '@/sharedComponents/hooks/useUser';
import Button from '@/sharedComponents/components/button';
import Card from '@/sharedComponents/components/card';

const Logement = () => {
  const user = useUser();

  // 🏙️ Données simulées
  const villes = ['Marrakech', 'Benguerir', 'Casablanca'];
  const typesChambre = ['Room', 'Studio', 'CFM'];
  const demandesMock = [
    {
      id: 1,
      demandeur: 'Yassine FMS',
      date: '2025-05-10',
      type: 'Studio',
      statut: 'En attente',
    },
    {
      id: 2,
      demandeur: 'Sara PSLM',
      date: '2025-05-12',
      type: 'CFM',
      statut: 'En attente',
    },
  ];

  if (user.role === 'demandeur') {
    // 👤 Vue DEMANDEUR
    return (
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-main-green">Demande de logement</h2>

        <form className="space-y-6">
          {/* Ville */}
          <div>
            <label className="block mb-1 font-medium">Ville</label>
            <select className="border rounded px-4 py-2 w-full">
              {villes.map((ville) => (
                <option key={ville}>{ville}</option>
              ))}
            </select>
          </div>

          {/* Dates */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-medium">Date d’arrivée</label>
              <input type="date" className="border rounded px-4 py-2 w-full" />
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium">Date de départ</label>
              <input type="date" className="border rounded px-4 py-2 w-full" />
            </div>
          </div>

          {/* Type de chambre */}
          <div>
            <label className="block mb-1 font-medium">Type de chambre</label>
            <div className="flex gap-4">
              {typesChambre.map((type) => (
                <button
                  type="button"
                  key={type}
                  className="border px-4 py-2 rounded hover:bg-main-green hover:text-white"
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Ajouter invités (optionnel) */}
          <div>
            <label className="block mb-1 font-medium">Invités (optionnel)</label>
            <textarea
              placeholder="Nom, prénom, rôle, etc."
              className="border rounded px-4 py-2 w-full"
            />
          </div>

          {/* Envoyer */}
          <Button label="Envoyer la demande" />
        </form>
      </div>
    );
  }

  if (user.role === 'responsable') {
    // 👨‍💼 Vue RESPONSABLE
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-main-green">Demandes de logement reçues</h2>

        {demandesMock.map((demande) => (
          <Card key={demande.id} status="pending" type="housing">
            <div className="space-y-2">
              <p>
                <strong>Demandeur :</strong> {demande.demandeur}
              </p>
              <p>
                <strong>Date :</strong> {demande.date}
              </p>
              <p>
                <strong>Type :</strong> {demande.type}
              </p>
              <div className="flex gap-4 mt-2">
                <Button label="Valider" />
                <Button label="Refuser" variant="secondary" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="text-gray-500 italic">
      Aucun rôle reconnu. Veuillez vous connecter en tant que demandeur ou responsable.
    </div>
  );
};

export default Logement;
