const getSampleData = () => ({
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
});
export default getSampleData;