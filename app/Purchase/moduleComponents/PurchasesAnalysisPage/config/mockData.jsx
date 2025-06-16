export const samplePurchases = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    typeDemande: "DEMANDE_ACHAT",
    priorite: "URGENT",
    dateDemande: "2024-05-01T14:30:00Z",
    dateBesoin: "2024-06-10",
    etatValidation: "SOUMISE",
    user_id: "770e8400-e29b-41d4-a716-446655440002",
    budget_line: "IT Department - Equipment",
    details: "Équipement informatique pour le nouveau département",
    totalEstimated: 8500,
    updatedAt: "2024-05-02T10:15:00Z",
    materials: [
      {
        id: "660e8400-e29b-41d4-a716-446655440001",
        designation: "Laptop Dell XPS 15",
        description: "Ordinateur portable haute performance",
        prix_unitaire_estime: 1500,
        quantite: 4
      },
      {
        id: "660e8400-e29b-41d4-a716-446655440002",
        designation: "Écran 27 pouces",
        description: "Écran de bureau haute résolution",
        prix_unitaire_estime: 350,
        quantite: 4
      }
    ]
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    typeDemande: "DEMANDE_ACHAT",
    priorite: "NORMAL",
    dateDemande: "2024-04-25T09:45:00Z",
    dateBesoin: "2024-05-15",
    etatValidation: "VALIDEE",
    user_id: "770e8400-e29b-41d4-a716-446655440002",
    budget_line: "Office Supplies",
    details: "Fournitures de bureau pour le trimestre",
    totalEstimated: 1200,
    updatedAt: "2024-04-26T16:20:00Z",
    materials: [
      {
        id: "660e8400-e29b-41d4-a716-446655440004",
        designation: "Papier A4",
        description: "Cartons de papier pour imprimante",
        prix_unitaire_estime: 25,
        quantite: 20
      },
      {
        id: "660e8400-e29b-41d4-a716-446655440005",
        designation: "Stylos",
        description: "Boîtes de stylos",
        prix_unitaire_estime: 15,
        quantite: 30
      }
    ]
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440006",
    typeDemande: "DEMANDE_SERVICE",
    priorite: "BASSE",
    dateDemande: "2024-05-05T11:30:00Z",
    dateBesoin: "2024-06-20",
    etatValidation: "SOUMISE",
    user_id: "770e8400-e29b-41d4-a716-446655440007",
    budget_line: "IT Department - Services",
    details: "Maintenance du système de sécurité",
    totalEstimated: 3000,
    updatedAt: "2024-05-05T14:45:00Z",
    materials: [
      {
        id: "660e8400-e29b-41d4-a716-446655440006",
        designation: "Service de maintenance",
        description: "Contrat de maintenance annuel",
        prix_unitaire_estime: 3000,
        quantite: 1
      }
    ]
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440008",
    typeDemande: "DEMANDE_ACHAT",
    priorite: "URGENT",
    dateDemande: "2024-03-15T08:20:00Z",
    dateBesoin: "2024-04-01",
    etatValidation: "REJETEE",
    user_id: "770e8400-e29b-41d4-a716-446655440010",
    budget_line: "Laboratory Resources",
    details: "Équipement de laboratoire",
    totalEstimated: 12500,
    updatedAt: "2024-03-16T09:10:00Z",
    materials: [
      {
        id: "660e8400-e29b-41d4-a716-446655440009",
        designation: "Microscope électronique",
        description: "Microscope pour analyse de haute précision",
        prix_unitaire_estime: 10000,
        quantite: 1
      },
      {
        id: "660e8400-e29b-41d4-a716-446655440010",
        designation: "Verrerie de laboratoire",
        description: "Lot de verrerie pour expériences",
        prix_unitaire_estime: 2500,
        quantite: 1
      }
    ]
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440011",
    typeDemande: "DEMANDE_ACHAT",
    priorite: "NORMAL",
    dateDemande: "2024-05-08T13:45:00Z",
    dateBesoin: "2024-05-25",
    etatValidation: "VALIDEE",
    user_id: "770e8400-e29b-41d4-a716-446655440013",
    budget_line: "Staff Development",
    details: "Livres et matériel de formation",
    totalEstimated: 750,
    updatedAt: "2024-05-09T10:30:00Z",
    materials: [
      {
        id: "660e8400-e29b-41d4-a716-446655440012",
        designation: "Manuels techniques",
        description: "Collection de livres pour formation",
        prix_unitaire_estime: 50,
        quantite: 15
      }
    ]
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440017",
    typeDemande: "DEMANDE_ACHAT",
    priorite: "NORMAL",
    dateDemande: "2024-04-10T11:20:00Z",
    dateBesoin: "2024-05-20",
    etatValidation: "VALIDEE",
    user_id: "770e8400-e29b-41d4-a716-446655440018",
    budget_line: "Marketing Department - Print Materials",
    details: "Brochures and flyers for Q2 campaign",
    totalEstimated: 4200,
    updatedAt: "2024-04-12T09:30:00Z",
    materials: [
      {
        id: "660e8400-e29b-41d4-a716-446655440013",
        designation: "Brochures",
        description: "Full color marketing brochures",
        prix_unitaire_estime: 2.5,
        quantite: 1000
      },
      {
        id: "660e8400-e29b-41d4-a716-446655440014",
        designation: "Flyers",
        description: "Promotional flyers",
        prix_unitaire_estime: 0.8,
        quantite: 2000
      }
    ]
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440018",
    typeDemande: "DEMANDE_SERVICE",
    priorite: "URGENT",
    dateDemande: "2024-05-03T15:45:00Z",
    dateBesoin: "2024-05-10",
    etatValidation: "VALIDEE",
    user_id: "770e8400-e29b-41d4-a716-446655440019",
    budget_line: "IT Department - Services",
    details: "Emergency server maintenance",
    totalEstimated: 7500,
    updatedAt: "2024-05-04T08:10:00Z",
    materials: []
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440019",
    typeDemande: "DEMANDE_ACHAT",
    priorite: "NORMAL",
    dateDemande: "2024-03-20T10:15:00Z",
    dateBesoin: "2024-04-05",
    etatValidation: "REJETEE",
    user_id: "770e8400-e29b-41d4-a716-446655440020",
    budget_line: "Facilities - Furniture",
    details: "Replacement office chairs",
    totalEstimated: 6000,
    updatedAt: "2024-03-22T14:20:00Z",
    materials: [
      {
        id: "660e8400-e29b-41d4-a716-446655440015",
        designation: "Ergonomic Chair",
        description: "High-end ergonomic office chair",
        prix_unitaire_estime: 400,
        quantite: 15
      }
    ]
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440020",
    typeDemande: "DEMANDE_ACHAT",
    priorite: "BASSE",
    dateDemande: "2024-02-15T09:00:00Z",
    dateBesoin: "2024-03-01",
    etatValidation: "VALIDEE",
    user_id: "770e8400-e29b-41d4-a716-446655440021",
    budget_line: "HR Department - Training",
    details: "Team building materials",
    totalEstimated: 1800,
    updatedAt: "2024-02-16T16:45:00Z",
    materials: [
      {
        id: "660e8400-e29b-41d4-a716-446655440016",
        designation: "Training Materials",
        description: "Team building exercise kits",
        prix_unitaire_estime: 60,
        quantite: 30
      }
    ]
  },
   {
    id: "550e8400-e29b-41d4-a716-446655440022",
    typeDemande: "DEMANDE_ACHAT",
    priorite: "NORMAL",
    dateDemande: "2024-05-10T14:00:00Z",
    dateBesoin: "2024-06-01",
    etatValidation: "BROUILLON",
    user_id: "770e8400-e29b-41d4-a716-446655440023",
    budget_line: "Office Supplies",
    details: "Nouveaux cartouches d'encre",
    totalEstimated: 500,
    updatedAt: "2024-05-10T14:00:00Z",
    materials: [
         { id: "660e8400-e29b-41d4-a716-446655440017", designation: "Cartouche Cyan", description: "Cartouche d'encre Cyan", prix_unitaire_estime: 100, quantite: 2 },
         { id: "660e8400-e29b-41d4-a716-446655440018", designation: "Cartouche Magenta", description: "Cartouche d'encre Magenta", prix_unitaire_estime: 100, quantite: 2 },
         { id: "660e8400-e29b-41d4-a716-446655440019", designation: "Cartouche Jaune", description: "Cartouche d'encre Jaune", prix_unitaire_estime: 100, quantite: 1 }
    ]
  },
   {
    id: "550e8400-e29b-41d4-a716-446655440024",
    typeDemande: "DEMANDE_SERVICE",
    priorite: "BASSE",
    dateDemande: "2024-04-01T09:30:00Z",
    dateBesoin: "2024-05-15",
    etatValidation: "VALIDEE",
    user_id: "770e8400-e29b-41d4-a716-446655440025",
    budget_line: "Marketing Department - Services",
    details: "Service de traduction pour documentation",
    totalEstimated: 1500,
    updatedAt: "2024-04-05T11:00:00Z",
    materials: []
  },
   {
    id: "550e8400-e29b-41d4-a716-446655440026",
    typeDemande: "DEMANDE_ACHAT",
    priorite: "URGENT",
    dateDemande: "2024-05-13T08:00:00Z", // Today
    dateBesoin: "2024-05-15",
    etatValidation: "SOUMISE",
    user_id: "770e8400-e29b-41d4-a716-446655440002",
    budget_line: "IT Department - Equipment",
    details: "Remplacement rapide d'un serveur",
    totalEstimated: 15000,
    updatedAt: "2024-05-13T08:30:00Z",
     materials: [
        { id: "660e8400-e29b-41d4-a716-446655440020", designation: "Serveur NAS", description: "Serveur de stockage en réseau", prix_unitaire_estime: 15000, quantite: 1 },
     ]
  },

];