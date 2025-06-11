export const getSampleMissions = () => [
  {
    id: "01e066a3-e35f-403a-bd8d-23d0f0b948a3",
    type: "FORMATION",
    destination: "Paris",
    details: "Formation sur les nouvelles méthodes de développement",
    pays: "France",
    ville: "Paris",
    budgetPrevu: 3500,
    createdAt: "2024-05-01T14:30:00Z",
    updatedAt: "2024-05-02T10:15:00Z",
    ordres_mission: [
      {
        id: "660e8400-e29b-41d4-a716-446655440001",
        dateDebut: "2024-06-15",
        dateFin: "2024-06-20",
        etat: "OUVERTE",
        createdAt: "2024-05-01T14:30:00Z",
        updatedAt: "2024-05-02T10:15:00Z",
        user_id: "770e8400-e29b-41d4-a716-446655440002",
        mission_id: "550e8400-e29b-41d4-a716-446655440000"
      }
    ]
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    type: "CONFERENCE",
    destination: "New York",
    details: "Conférence sur l'intelligence artificielle",
    pays: "États-Unis",
    ville: "New York",
    budgetPrevu: 7200,
    createdAt: "2024-04-25T09:45:00Z",
    updatedAt: "2024-04-26T16:20:00Z",
    ordres_mission: [
      {
        id: "660e8400-e29b-41d4-a716-446655440004",
        dateDebut: "2024-05-20",
        dateFin: "2024-05-25",
        etat: "TERMINEE",
        createdAt: "2024-04-25T09:45:00Z",
        updatedAt: "2024-05-26T10:15:00Z",
        user_id: "770e8400-e29b-41d4-a716-446655440002",
        mission_id: "550e8400-e29b-41d4-a716-446655440003"
      }
    ]
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    type: "REUNION",
    destination: "Berlin",
    details: "Réunion avec les partenaires européens",
    pays: "Allemagne",
    ville: "Berlin",
    budgetPrevu: 2000,
    createdAt: "2024-05-05T11:30:00Z",
    updatedAt: "2024-05-05T14:45:00Z",
    ordres_mission: [
      {
        id: "660e8400-e29b-41d4-a716-446655440006",
        dateDebut: "2024-05-15",
        dateFin: "2024-05-17",
        etat: "EN_COURS",
        createdAt: "2024-05-05T11:30:00Z",
        updatedAt: "2024-05-15T08:30:00Z",
        user_id: "770e8400-e29b-41d4-a716-446655440007",
        mission_id: "550e8400-e29b-41d4-a716-446655440005"
      }
    ]
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440008",
    type: "AUTRE",
    destination: "Tokyo",
    details: "Visite d'étude des méthodes de gestion japonaises",
    pays: "Japon",
    ville: "Tokyo",
    budgetPrevu: 6500,
    createdAt: "2024-03-15T08:20:00Z",
    updatedAt: "2024-03-16T09:10:00Z",
    ordres_mission: [
      {
        id: "660e8400-e29b-41d4-a716-446655440009",
        dateDebut: "2024-07-01",
        dateFin: "2024-07-10",
        etat: "OUVERTE",
        createdAt: "2024-03-15T08:20:00Z",
        updatedAt: "2024-03-16T09:10:00Z",
        user_id: "770e8400-e29b-41d4-a716-446655440010",
        mission_id: "550e8400-e29b-41d4-a716-446655440008"
      }
    ]
  },
  {
    id: "528af3aa4-99f2-470f-8817-74401b3d9123",
    type: "FORMATION",
    destination: "Casablanca",
    details: "Formation sur les normes ISO 9001",
    pays: "Maroc",
    ville: "Casablanca",
    budgetPrevu: 1800,
    createdAt: "2024-05-08T13:45:00Z",
    updatedAt: "2024-05-09T10:30:00Z",
    ordres_mission: [
      {
        id: "660e8400-e29b-41d4-a716-446655440012",
        dateDebut: "2024-05-25",
        dateFin: "2024-05-28",
        etat: "OUVERTE",
        createdAt: "2024-05-08T13:45:00Z",
        updatedAt: "2024-05-09T10:30:00Z",
        user_id: "770e8400-e29b-41d4-a716-446655440013",
        mission_id: "550e8400-e29b-41d4-a716-446655440011"
      }
    ]
  }
];
