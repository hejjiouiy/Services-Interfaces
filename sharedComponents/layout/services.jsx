'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

// 📦 Import dynamique des composants existants
const AccessDemand = dynamic(() => import('@/app/Services/access/AccessDemand'));
const PendingDemands = dynamic(() => import('@/app/Services/access/PendingDemands'));
const VisitorPasses = dynamic(() => import('@/app/Services/access/VisitorPasses'));

const Logement = dynamic(() => import('@/app/Services/housing/Logement'));
const Transport = dynamic(() => import('@/app/Services/housing/Transport'));

const EventCatering = dynamic(() => import('@/app/Services/catering/EventCatering'));
const DailyMeals = dynamic(() => import('@/app/Services/catering/DailyMeals'));
const SpecialDiet = dynamic(() => import('@/app/Services/catering/SpecialDiet'));

// ✅ Nouveaux composants de Missions (ajout de ton collègue)
const MissionRequestForm = dynamic(() => import('@/app/Services/gestionDeplacements/compoenents/MissionRequestForm'));
const MissionsDataTable = dynamic(() => import('@/app/Services/gestionDeplacements/compoenents/MissionsDataTable'));
const MissionsCardView = dynamic(() => import('@/app/Services/gestionDeplacements/compoenents/MissionsCardView'));
const MissionsAnalysisPage = dynamic(() => import('@/app/Services/gestionDeplacements/compoenents/MissionsAnalysisPage'));
const PowerBIAnalysisPage = dynamic(() => import('@/app/Services/gestionDeplacements/compoenents/PowerBIAnalysisPage'));

const Services = () => {
  const [selectedService, setSelectedService] = useState("Access");
  const [selectedSubservice, setSelectedSubservice] = useState("Access Demand");

  const servicesWithSubs = {
    Access: [
      {
        name: "Access Demand",
        component: <AccessDemand />,
        description: "Soumettre une demande d’accès pour soi-même ou pour des invités"
      },
      {
        name: "Pending Demands",
        component: <PendingDemands />,
        description: "Consulter les demandes en attente"
      },
      {
        name: "Visitor Passes",
        component: <VisitorPasses />,
        description: "Demander un badge visiteur"
      },
      {
        name: "Conference Room Booking",
        component: <div className="text-gray-500 italic">Non encore disponible</div>,
        description: "Réserver une salle de conférence"
      }
    ],
    Housing: [
      {
        name: "Logement",
        component: <Logement />,
        description: "Faire une demande de logement selon votre rôle"
      },
      {
        name: "Transport",
        component: <Transport />,
        description: "Demande de transport liée au logement"
      }
    ],
    Catering: [
      {
        name: "Event Catering",
        component: <EventCatering />,
        description: "Commander un service de restauration pour un événement"
      },
      {
        name: "Daily Meal Services",
        component: <DailyMeals />,
        description: "Voir et gérer les repas quotidiens"
      },
      {
        name: "Special Dietary Requests",
        component: <SpecialDiet />,
        description: "Demande alimentaire spécifique"
      }
    ],
    "Missions and Travel": [
      {
        name: "Booking Form",
        component: <MissionRequestForm />,
        description: "Réserver un déplacement (vols, logement...)"
      },
      {
        name: "Requests",
        component: <MissionsDataTable />,
        description: "Consulter les demandes en cours"
      },
      {
        name: "Reports",
        component: <MissionsCardView />,
        description: "Soumettre des frais de mission"
      },
      {
        name: "BI Dashboard",
        component: <PowerBIAnalysisPage />,
        description: "Consulter les dashboards PowerBI"
      },
      {
        name: "Analysis",
        component: <MissionsAnalysisPage />,
        description: "Analyse avancée des missions"
      }
    ]
  };

  const getNotificationCount = (service) => {
    const counts = {
      Access: 5,
      Housing: 2,
      Catering: 0,
      "Missions and Travel": 3
    };
    return counts[service] || 0;
  };

  const services = Object.keys(servicesWithSubs);

  const handleServiceChange = (service) => {
    setSelectedService(service);
    setSelectedSubservice(servicesWithSubs[service]?.[0]?.name || "");
  };

  const getCurrentSubserviceObject = () => {
    return servicesWithSubs[selectedService]?.find(
      (sub) => sub.name === selectedSubservice
    );
  };

  const currentSubservice = getCurrentSubserviceObject();

  return (
    <div className="bg-lighter-beige p-4 rounded-lg">
      <div className="w-[95%] mx-auto">
        {/* Navigation principale */}
        <ul className="flex flex-row justify-between my-4">
          {services.map((service) => {
            const notificationCount = getNotificationCount(service);

            return (
              <div className="flex flex-row items-center" key={service}>
                <li
                  className={`text-xl rounded-2xl border border-gray-200 shadow-sm px-4 py-1 cursor-pointer transition-all duration-300 ease-in-out ${
                    selectedService === service
                      ? "bg-main-green text-white border-main-green shadow-md"
                      : "bg-white text-darker-beige hover:shadow-xl hover:border-main-green hover:bg-main-green hover:text-white"
                  }`}
                  onClick={() => handleServiceChange(service)}
                >
                  {service}
                </li>
                {notificationCount > 0 && (
                  <span className="text-main-beige bg-red-500 rounded-xs shadow-xl px-1.5 py-0.5 text-xs h-fit ml-[-8px]">
                    {notificationCount}
                  </span>
                )}
              </div>
            );
          })}
        </ul>

        {/* Description + composant actif */}
        {currentSubservice && (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-main-green mb-2">
                {currentSubservice.name}
              </h2>
              <p className="text-darker-beige">{currentSubservice.description}</p>
            </div>

            <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
              {currentSubservice.component}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Services;
