'use client';
import React, { useState } from 'react';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Link from 'next/link';

// Enregistrement des composants Chart.js nécessaires
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Pour les données d'exemple (dans une application réelle, ces données viendraient d'une API)
const sampleData = {
  missionsByType: {
    labels: ['Formation', 'Conférence', 'Réunion', 'Autre'],
    datasets: [
      {
        label: 'Nombre de missions',
        data: [15, 8, 12, 5],
        backgroundColor: [
          'rgba(0, 84, 63, 0.7)',  // main-green
          'rgba(0, 216, 113, 0.7)', // secondary-green
          'rgba(90, 126, 118, 0.7)', // tertiary-green
          'rgba(245, 242, 237, 0.7)' // main-beige
        ],
        borderColor: [
          'rgba(0, 84, 63, 1)',
          'rgba(0, 216, 113, 1)',
          'rgba(90, 126, 118, 1)',
          'rgba(245, 242, 237, 1)'
        ],
        borderWidth: 1
      }
    ]
  },
  
  budgetByDestination: {
    labels: ['France', 'États-Unis', 'Allemagne', 'Japon', 'Maroc', 'Espagne', 'Royaume-Uni'],
    datasets: [
      {
        label: 'Budget (MAD)',
        data: [35000, 72000, 20000, 65000, 18000, 25000, 42000],
        backgroundColor: 'rgba(0, 84, 63, 0.5)',
        borderColor: 'rgba(0, 84, 63, 1)',
        borderWidth: 1
      }
    ]
  },
  
  missionsByMonth: {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
    datasets: [
      {
        label: 'Missions en 2024',
        data: [5, 7, 10, 8, 12, 9, 6, 4, 7, 8, 9, 11],
        borderColor: 'rgba(0, 84, 63, 1)',
        backgroundColor: 'rgba(0, 84, 63, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Missions en 2023',
        data: [4, 6, 8, 7, 9, 7, 5, 3, 6, 7, 8, 9],
        borderColor: 'rgba(0, 216, 113, 1)',
        backgroundColor: 'rgba(0, 216, 113, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  },
  
  missionsByStatus: {
    labels: ['Ouvertes', 'En cours', 'Terminées', 'Annulées'],
    datasets: [
      {
        label: 'Nombre de missions',
        data: [10, 8, 22, 3],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',  // blue
          'rgba(245, 158, 11, 0.7)',  // amber
          'rgba(16, 185, 129, 0.7)',  // green
          'rgba(239, 68, 68, 0.7)'    // red
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(239, 68, 68, 1)'
        ],
        borderWidth: 1
      }
    ]
  },
  
  topDestinations: [
    { destination: 'Paris, France', count: 8 },
    { destination: 'New York, États-Unis', count: 5 },
    { destination: 'Berlin, Allemagne', count: 4 },
    { destination: 'Tokyo, Japon', count: 3 },
    { destination: 'Casablanca, Maroc', count: 3 }
  ],
  
  recentMissions: [
    { id: '001', destination: 'Paris', type: 'FORMATION', dateDebut: '2024-05-15', dateFin: '2024-05-20', status: 'OUVERTE' },
    { id: '002', destination: 'New York', type: 'CONFERENCE', dateDebut: '2024-05-20', dateFin: '2024-05-25', status: 'TERMINEE' },
    { id: '003', destination: 'Berlin', type: 'REUNION', dateDebut: '2024-05-15', dateFin: '2024-05-17', status: 'EN_COURS' }
  ],
  
  statistics: {
    totalMissions: 40,
    missionsEnCours: 8,
    budgetTotal: 277000,
    moyenneDuree: 4.5
  }
};

// Options de graphique communes
const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        font: {
          family: 'Geist Sans, sans-serif'
        }
      }
    }
  }
};

// Formatage des montants
const formatAmount = (amount) => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'MAD' }).format(amount);
};

// Formatage des dates
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

// Couleurs pour les états de mission
const statusColors = {
  OUVERTE: "bg-blue-100 text-blue-800",
  EN_COURS: "bg-yellow-100 text-yellow-800",
  TERMINEE: "bg-green-100 text-green-800",
  ANNULEE: "bg-red-100 text-red-800"
};

const MissionsAnalysisPage = () => {
  const [timeRange, setTimeRange] = useState('year');
  const { statistics } = sampleData;
  
  // Gestionnaire pour le changement de plage de temps
  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    // Dans une application réelle, vous chargeriez ici des données différentes
    // en fonction de la plage de temps sélectionnée
  };

  return (
    <div className="bg-main-beige p-6 rounded-lg min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-main-green">Tableau de bord des missions</h1>
          <p className="text-darker-beige mt-2">Analyse et visualisation des données de missions</p>
        </div>
        
        {/* Filtres */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8 flex justify-between items-center">
          <div className="flex space-x-2">
            <button
              onClick={() => handleTimeRangeChange('month')}
              className={`px-4 py-2 rounded-lg ${
                timeRange === 'month'
                  ? 'bg-main-green text-white'
                  : 'bg-gray-100 text-darker-beige hover:bg-gray-200'
              }`}
            >
              Mois
            </button>
            <button
              onClick={() => handleTimeRangeChange('quarter')}
              className={`px-4 py-2 rounded-lg ${
                timeRange === 'quarter'
                  ? 'bg-main-green text-white'
                  : 'bg-gray-100 text-darker-beige hover:bg-gray-200'
              }`}
            >
              Trimestre
            </button>
            <button
              onClick={() => handleTimeRangeChange('year')}
              className={`px-4 py-2 rounded-lg ${
                timeRange === 'year'
                  ? 'bg-main-green text-white'
                  : 'bg-gray-100 text-darker-beige hover:bg-gray-200'
              }`}
            >
              Année
            </button>
          </div>
          
          <div className="flex space-x-2">
            <button className="text-main-green hover:text-darker-beige">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </button>
            <button className="text-main-green hover:text-darker-beige">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Cartes de statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="rounded-full p-3 bg-blue-100 text-blue-600 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total des missions</p>
                <p className="text-xl font-bold text-gray-700">{statistics.totalMissions}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="rounded-full p-3 bg-yellow-100 text-yellow-600 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Missions en cours</p>
                <p className="text-xl font-bold text-gray-700">{statistics.missionsEnCours}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="rounded-full p-3 bg-green-100 text-green-600 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Budget total</p>
                <p className="text-xl font-bold text-gray-700">{formatAmount(statistics.budgetTotal)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="rounded-full p-3 bg-purple-100 text-purple-600 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Durée moyenne (jours)</p>
                <p className="text-xl font-bold text-gray-700">{statistics.moyenneDuree}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Graphiques */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-main-green mb-4">Missions par type</h2>
            <div className="h-80">
              <Pie 
                data={sampleData.missionsByType} 
                options={{
                  ...commonOptions,
                  plugins: {
                    ...commonOptions.plugins,
                    title: {
                      display: false
                    }
                  }
                }}
              />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-main-green mb-4">Missions par statut</h2>
            <div className="h-80">
              <Doughnut 
                data={sampleData.missionsByStatus}
                options={{
                  ...commonOptions,
                  plugins: {
                    ...commonOptions.plugins,
                    title: {
                      display: false
                    }
                  }
                }}
              />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
            <h2 className="text-lg font-semibold text-main-green mb-4">Tendance mensuelle des missions</h2>
            <div className="h-80">
              <Line 
                data={sampleData.missionsByMonth}
                options={{
                  ...commonOptions,
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        precision: 0
                      }
                    }
                  },
                  plugins: {
                    ...commonOptions.plugins,
                    title: {
                      display: false
                    }
                  }
                }}
              />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
            <h2 className="text-lg font-semibold text-main-green mb-4">Budget par destination</h2>
            <div className="h-80">
              <Bar 
                data={sampleData.budgetByDestination}
                options={{
                  ...commonOptions,
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        callback: function(value) {
                          return value.toLocaleString('fr-FR') + ' MAD';
                        }
                      }
                    }
                  },
                  plugins: {
                    ...commonOptions.plugins,
                    title: {
                      display: false
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Détails supplémentaires */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-main-green mb-4">Top destinations</h2>
            <ul className="space-y-4">
              {sampleData.topDestinations.map((item, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span className="text-darker-beige">{item.destination}</span>
                  <span className="bg-main-green/10 text-main-green px-2 py-1 rounded-full text-sm">{item.count}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
            <h2 className="text-lg font-semibold text-main-green mb-4">Missions récentes</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                    <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Période</th>
                    <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleData.recentMissions.map((mission, index) => {
                    const statusColor = statusColors[mission.status] || "bg-gray-100 text-gray-800";
                    
                    return (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="py-4 text-sm text-gray-900">{mission.destination}</td>
                        <td className="py-4 text-sm text-gray-900">{mission.type}</td>
                        <td className="py-4 text-sm text-gray-900">
                          {formatDate(mission.dateDebut)} - {formatDate(mission.dateFin)}
                        </td>
                        <td className="py-4">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor}`}>
                            {mission.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-right">
              <Link href="/missions" className="text-main-green hover:text-main-green/80 text-sm font-medium">
                Voir toutes les missions →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionsAnalysisPage;