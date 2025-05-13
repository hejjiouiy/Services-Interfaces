'use client';
import React, { useState, useMemo } from 'react';
import { Bar, Line, Doughnut, Radar } from 'react-chartjs-2'; // Removed Pie as Doughnut is used
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler // Added Filler for line chart area fill
} from 'chart.js';
import Link from 'next/link';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler // Register Filler
);

// --- Extended sample purchases data with more variety ---
const samplePurchases = [
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
// --- END SAMPLE PURCHASES DATA ---

// Common chart options
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
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          let label = context.dataset.label || '';
          if (label) {
              label += ': ';
          }
          // Check dataset type to format correctly
          if (context.dataset.type === 'bar' || (context.dataset.label && context.dataset.label.includes('Budget'))) {
               // For budget-related tooltips
               if (context.parsed.y !== null) {
                    label += new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'MAD' }).format(context.parsed.y);
               }
          }
          else if (context.parsed.y !== null) {
              // For count-based tooltips (line, bar for counts)
              label += context.parsed.y + ' demandes';
          }
           else if (context.parsed !== null) {
              // For Pie/Doughnut (arc elements)
              label += context.parsed + ' demandes';
          }

          return label;
        }
      }
    }
  },
   // Ensure consistent font styling for charts
   font: {
       family: 'Geist Sans, sans-serif'
   }
};

// Utility functions
const formatAmount = (amount) => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'MAD' }).format(amount);
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
           return dateString;
      }
      return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  } catch (error) {
      console.error("Failed to parse date:", dateString, error);
      return dateString;
  }
};

// Helper to convert hex color (like 00543F) to RGB string (0, 84, 63)
function hexToRgb(hex) {
    // Remove leading bg- and # if present
    hex = hex.replace('bg-', '').replace('#', '');
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
}


// Color schemes (based on your Tailwind-like classes)
const statusColors = {
  BROUILLON: { bg: "bg-gray-100", text: "text-gray-800", rgb: "156, 163, 175" }, // gray-400
  SOUMISE: { bg: "bg-yellow-100", text: "text-yellow-800", rgb: "250, 204, 21" }, // yellow-400
  VALIDEE: { bg: "bg-green-100", text: "text-green-800", rgb: "34, 197, 94" }, // green-500
  REJETEE: { bg: "bg-red-100", text: "text-red-800", rgb: "239, 68, 68" }, // red-500
};

const typeColors = {
  DEMANDE_ACHAT: { bg: "bg-blue-100", text: "text-blue-800", rgb: "96, 165, 250" }, // blue-400
  DEMANDE_SERVICE: { bg: "bg-purple-100", text: "text-purple-800", rgb: "168, 85, 247" }, // purple-400
};

const priorityColors = {
  URGENT: { bg: "bg-red-100", text: "text-red-800", rgb: "239, 68, 68" }, // red-500
  NORMAL: { bg: "bg-blue-100", text: "text-blue-800", rgb: "96, 165, 250" }, // blue-400
  BASSE: { bg: "bg-green-100", text: "text-green-800", rgb: "34, 197, 94" }, // green-500
};

const getStatusBadgeClass = (status) => {
  return statusColors[status]?.bg + ' ' + statusColors[status]?.text || "bg-gray-100 text-gray-800";
};


const PurchasesAnalysisPage = () => {
  // State for time range and active tab
  const [timeRange, setTimeRange] = useState('year'); // 'month', 'quarter', 'year', 'all'
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'budget', 'materials'

  // Filter data based on timeRange (Memoized)
  const filteredPurchases = useMemo(() => {
    if (timeRange === 'all') {
        return samplePurchases;
    }
    const now = new Date();
    let startDate;

    switch(timeRange) {
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        break;
      case 'quarter':
        startDate = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
        break;
      case 'year':
        startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        break;
      default:
         startDate = new Date(0); // Should not happen with state management, but fallback
    }

    return samplePurchases.filter(purchase => {
      const purchaseDate = new Date(purchase.dateDemande);
      return purchaseDate >= startDate;
    });
  }, [timeRange]); // Recalculate when timeRange changes

  // --- Data Aggregation and Chart Data Generation (using useMemo for efficiency) ---

  // Enhanced purchase statistics
  const purchaseStats = useMemo(() => {
    const totalPurchases = filteredPurchases.length;

    const countsByStatus = filteredPurchases.reduce((acc, p) => {
      acc[p.etatValidation] = (acc[p.etatValidation] || 0) + 1;
      return acc;
    }, {});

    const countsByType = filteredPurchases.reduce((acc, p) => {
      acc[p.typeDemande] = (acc[p.typeDemande] || 0) + 1;
      return acc;
    }, {});

    const countsByPriority = filteredPurchases.reduce((acc, p) => {
      acc[p.priorite] = (acc[p.priorite] || 0) + 1;
      return acc;
    }, {});

    const totalEstimatedBudget = filteredPurchases.reduce((sum, p) => sum + p.totalEstimated, 0);
    const averageEstimatedBudget = totalPurchases > 0 ? totalEstimatedBudget / totalPurchases : 0;

    const materialsCount = filteredPurchases.reduce((sum, p) => sum + (p.materials?.length || 0), 0);
    const averageMaterialsPerPurchase = totalPurchases > 0 ? materialsCount / totalPurchases : 0;

    // Aggregate total cost per material designation across all purchases
    const materialTotalCosts = filteredPurchases.reduce((acc, purchase) => {
        (purchase.materials || []).forEach(material => {
             const itemTotal = material.prix_unitaire_estime * material.quantite;
             acc[material.designation] = (acc[material.designation] || 0) + itemTotal;
        });
        return acc;
    }, {});

     // Sort materials by total cost and get top N
    const topMaterialsByCost = Object.entries(materialTotalCosts)
      .sort((a, b) => b[1] - a[1])
      .map(([designation, totalCost]) => ({ designation, totalCost }))
      .slice(0, 5);


    return {
      totalPurchases,
      countsByStatus,
      countsByType,
      countsByPriority,
      totalEstimatedBudget,
      averageEstimatedBudget,
      materialsCount,
      averageMaterialsPerPurchase,
      topMaterialsByCost // Include top materials in stats
    };
  }, [filteredPurchases]); // Recalculate when filteredPurchases changes


  // Chart Data: Demandes par type (Doughnut)
  const purchasesByTypeData = useMemo(() => {
    const { countsByType } = purchaseStats; // Use counts from purchaseStats
    const labels = Object.keys(countsByType);
    const data = Object.values(countsByType);
     const backgroundColors = labels.map(label =>
      `rgba(${typeColors[label]?.rgb || '128, 128, 128'}, 0.7)`
    );

    return {
      labels,
      datasets: [
        {
          label: 'Nombre de demandes',
          data,
          backgroundColor: backgroundColors,
          borderWidth: 1,
        },
      ],
    };
  }, [purchaseStats]); // Depends on purchaseStats


  // Chart Data: Demandes par état de validation (Doughnut)
  const purchasesByStatusData = useMemo(() => {
      const { countsByStatus } = purchaseStats; // Use counts from purchaseStats
      // Ensure all possible statuses are included in labels for consistent color mapping
      const allStatuses = ['BROUILLON', 'SOUMISE', 'VALIDEE', 'REJETEE'];
      const labels = allStatuses; // Include all, even if count is 0, for legend consistency
      const data = labels.map(status => countsByStatus[status] || 0);
      const backgroundColors = labels.map(label =>
        `rgba(${statusColors[label]?.rgb || '128, 128, 128'}, 0.7)`
      );

      return {
          labels,
          datasets: [
              {
                  label: 'Nombre de demandes',
                  data,
                  backgroundColor: backgroundColors,
                  borderWidth: 1,
              },
          ],
      };
  }, [purchaseStats]); // Depends on purchaseStats


  // Chart Data: Budget estimé par ligne budgétaire (Bar)
   const totalEstimatedByBudgetLineData = useMemo(() => {
        const budgetLineAmounts = filteredPurchases.reduce((acc, purchase) => {
            acc[purchase.budget_line] = (acc[purchase.budget_line] || 0) + purchase.totalEstimated;
            return acc;
        }, {});

        // Sort by amount and take top 10
        const sortedEntries = Object.entries(budgetLineAmounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10); // Display top 10 budget lines

        const labels = sortedEntries.map(([label]) => label);
        const data = sortedEntries.map(([, value]) => value);

        return {
            labels,
            datasets: [
                {
                    label: 'Budget Estimé (MAD)',
                    data,
                     backgroundColor: 'rgba(0, 84, 63, 0.7)', // main-green shade
                    borderColor: 'rgba(0, 84, 63, 1)', // main-green
                    borderWidth: 1,
                },
            ],
        };
   }, [filteredPurchases]);


    // Chart Data: Tendance mensuelle des demandes (Line)
    const purchasesByMonthData = useMemo(() => {
        const monthCounts = filteredPurchases.reduce((acc, purchase) => {
            const date = new Date(purchase.dateDemande);
            // Get Year and Month (0-indexed)
            const year = date.getFullYear();
            const month = date.getMonth();

             // Create a map key like "YYYY-MM" for correct chronological sorting
            const yearMonth = `${year}-${String(month + 1).padStart(2, '0')}`;
            acc[yearMonth] = (acc[yearMonth] || 0) + 1;
            return acc;
        }, {});

        // Get sorted Year-Month keys
        const sortedYearMonths = Object.keys(monthCounts).sort();

        // Create labels and data arrays based on sorted keys
        const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
        const labels = sortedYearMonths.map(ym => {
            const [year, month] = ym.split('-');
            return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
        });
        const data = sortedYearMonths.map(ym => monthCounts[ym]);

        return {
            labels,
            datasets: [
                {
                    label: 'Nombre de demandes par mois',
                    data,
                    borderColor: 'rgba(0, 84, 63, 1)',
                    backgroundColor: 'rgba(0, 84, 63, 0.1)',
                    tension: 0.4,
                    fill: true // Fill area under the line
                },
            ],
        };
    }, [filteredPurchases]);

   // New Chart Data: Budget estimé par mois (Line)
   const budgetByMonthData = useMemo(() => {
        const monthAmounts = filteredPurchases.reduce((acc, purchase) => {
            const date = new Date(purchase.dateDemande);
             const year = date.getFullYear();
            const month = date.getMonth();
             const yearMonth = `${year}-${String(month + 1).padStart(2, '0')}`;
            acc[yearMonth] = (acc[yearMonth] || 0) + purchase.totalEstimated;
            return acc;
        }, {});

        const sortedYearMonths = Object.keys(monthAmounts).sort();
        const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
        const labels = sortedYearMonths.map(ym => {
            const [year, month] = ym.split('-');
            return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
        });
        const data = sortedYearMonths.map(ym => monthAmounts[ym]);

         return {
            labels,
            datasets: [
                {
                    label: 'Budget Estimé par mois (MAD)',
                    data,
                    borderColor: 'rgba(0, 216, 113, 1)', // secondary-green
                    backgroundColor: 'rgba(0, 216, 113, 0.1)',
                    tension: 0.4,
                     fill: true
                },
            ],
        };
   }, [filteredPurchases]);


  // New Chart Data: Budget par priorité (Doughnut)
  const budgetByPriorityData = useMemo(() => {
    const priorityAmounts = filteredPurchases.reduce((acc, purchase) => {
      acc[purchase.priorite] = (acc[purchase.priorite] || 0) + purchase.totalEstimated;
      return acc;
    }, {});

    const allPriorities = ['URGENT', 'NORMAL', 'BASSE'];
    const labels = allPriorities;
    const data = allPriorities.map(p => priorityAmounts[p] || 0);
    const backgroundColors = allPriorities.map(p =>
      `rgba(${priorityColors[p]?.rgb || '128, 128, 128'}, 0.7)`
    );

    return {
      labels,
      datasets: [{
        label: 'Budget par priorité',
        data,
        backgroundColor: backgroundColors,
        borderWidth: 1,
      }],
    };
  }, [filteredPurchases]);


   // New Chart Data: Budget par type de demande (Doughnut)
  const budgetByTypeData = useMemo(() => {
    const typeAmounts = filteredPurchases.reduce((acc, purchase) => {
      acc[purchase.typeDemande] = (acc[purchase.typeDemande] || 0) + purchase.totalEstimated;
      return acc;
    }, {});

    const allTypes = ['DEMANDE_ACHAT', 'DEMANDE_SERVICE'];
    const labels = allTypes;
    const data = allTypes.map(type => typeAmounts[type] || 0);
    const backgroundColors = allTypes.map(type =>
      `rgba(${typeColors[type]?.rgb || '128, 128, 128'}, 0.7)`
    );

    return {
      labels,
      datasets: [{
        label: 'Budget par type de demande',
        data,
        backgroundColor: backgroundColors,
        borderWidth: 1,
      }],
    };
  }, [filteredPurchases]);


  // Chart Data: Radar chart for multi-dimensional analysis (Updated)
  const radarChartData = useMemo(() => {
    const { countsByStatus, countsByPriority, countsByType, totalEstimatedBudget, totalPurchases } = purchaseStats;

    // Normalize counts and budget for radar scale (0-100)
    const maxCount = Math.max(
        ...Object.values(countsByStatus),
        ...Object.values(countsByPriority),
        ...Object.values(countsByType),
        1 // Avoid division by zero if no requests
    );
    const maxBudget = Math.max(totalEstimatedBudget, 1);


    return {
      labels: ['Validées', 'Rejetées', 'Urgentes', 'Achats', 'Services', 'Budget Total'], // Simplified labels
      datasets: [{
        label: 'Distribution (Normalisé)',
        data: [
          (countsByStatus.VALIDEE || 0 / maxCount) * 100,
          (countsByStatus.REJETEE || 0 / maxCount) * 100,
          (countsByPriority.URGENT || 0 / maxCount) * 100,
          (countsByType.DEMANDE_ACHAT || 0 / maxCount) * 100,
          (countsByType.DEMANDE_SERVICE || 0 / maxCount) * 100,
          (totalEstimatedBudget / maxBudget) * 100 // Normalized budget
        ],
        backgroundColor: 'rgba(0, 84, 63, 0.2)',
        borderColor: 'rgba(0, 84, 63, 1)',
        pointBackgroundColor: 'rgba(0, 84, 63, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(0, 84, 63, 1)',
      }]
    };
  }, [purchaseStats]); // Depends on purchaseStats


  // List Data: Top 5 Most Expensive Purchases
   const topExpensivePurchases = useMemo(() => {
        return [...filteredPurchases] // Create a shallow copy before sorting
             .sort((a, b) => b.totalEstimated - a.totalEstimated)
             .slice(0, 5);
   }, [filteredPurchases]);


  // List Data: Recent purchases
  const recentPurchases = useMemo(() => {
    return [...filteredPurchases] // Create a shallow copy before sorting
      .sort((a, b) => new Date(b.dateDemande) - new Date(a.dateDemande))
      .slice(0, 5);
  }, [filteredPurchases]);


  return (
    <div className="bg-main-beige p-6 rounded-lg min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-main-green">Tableau de bord des Achats et Services</h1>
          <p className="text-darker-beige mt-2">Analyse et visualisation des demandes d'achats et de services</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8 flex justify-between items-center">
          <div className="flex space-x-2">
            <button
              onClick={() => setTimeRange('month')}
              className={`px-4 py-2 rounded-lg text-sm ${
                timeRange === 'month' ? 'bg-main-green text-white' : 'bg-gray-100 text-darker-beige hover:bg-gray-200'
              }`}
            >
              30 Jours
            </button>
            <button
              onClick={() => setTimeRange('quarter')}
              className={`px-4 py-2 rounded-lg text-sm ${
                timeRange === 'quarter' ? 'bg-main-green text-white' : 'bg-gray-100 text-darker-beige hover:bg-gray-200'
              }`}
            >
              90 Jours
            </button>
            <button
              onClick={() => setTimeRange('year')}
              className={`px-4 py-2 rounded-lg text-sm ${
                timeRange === 'year' ? 'bg-main-green text-white' : 'bg-gray-100 text-darker-beige hover:bg-gray-200'
              }`}
            >
              1 An
            </button>
             <button
              onClick={() => setTimeRange('all')}
              className={`px-4 py-2 rounded-lg text-sm ${
                timeRange === 'all' ? 'bg-main-green text-white' : 'bg-gray-100 text-darker-beige hover:bg-gray-200'
              }`}
            >
              Tout
            </button>
          </div>

           {/* Action Buttons */}
          <div className="flex space-x-2">
             {/* Example: Export to CSV (placeholder) */}
            <button className="text-main-green hover:text-darker-beige" title="Exporter les données">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V3" />
              </svg>
            </button>
             {/* Example: Refresh (placeholder) */}
             <button className="text-main-green hover:text-darker-beige" title="Rafraîchir">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.53M2.985 14.c0 7.42 6.58 13.5 14.5 13.5S29.985 21.42 29.985 14H16.023Z" />
                </svg>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-main-green text-main-green'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Vue d'ensemble
            </button>
            <button
              onClick={() => setActiveTab('budget')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'budget'
                  ? 'border-main-green text-main-green'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Analyse budgétaire
            </button>
            <button
              onClick={() => setActiveTab('materials')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'materials'
                  ? 'border-main-green text-main-green'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Matériels & Services
            </button>
          </nav>
        </div>

        {/* --- Overview Tab Content --- */}
        {activeTab === 'overview' && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="rounded-full p-3 bg-blue-100 text-blue-600 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2H5.25A.75.75 0 004.5.75V2m0 0v10.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V9.75m-14.25 0h7.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total demandes ({timeRange === 'all' ? 'total' : timeRange === 'month' ? '30j' : timeRange === 'quarter' ? '90j' : '1 an'})</p>
                    <p className="text-xl font-bold text-gray-700">{purchaseStats.totalPurchases}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="rounded-full p-3 bg-yellow-100 text-yellow-600 mr-4">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Demandes soumises</p>
                    <p className="text-xl font-bold text-gray-700">{purchaseStats.countsByStatus.SOUMISE || 0}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="rounded-full p-3 bg-green-100 text-green-600 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.104c1.094.342 1.094 1.856 0 2.198a60.07 60.07 0 0 1-15.797 2.104m13.137-2.104c.794.18 1.617.245 2.457.245a59.75 59.75 0 0 0 4.582-2.105M18.137 14.421a60.07 60.07 0 0 1 2.104 15.797m0 0l1.094-.342a60.07 60.07 0 0 0-2.198-1.094m0-2.198c.18-.794.245-1.617.245-2.457a59.75 59.75 0 0 0-2.105-4.582m-2.457-1.094a60.07 60.07 0 0 1-15.797-2.104m0 0l-1.094 3.42a60.07 60.07 0 0 0 2.198 1.094m0 2.198c-.18.794-.245 1.617-.245 2.457a59.75 59.75 0 0 0 2.105 4.582m12.75-18.137a60.07 60.07 0 0 1-2.104-15.797m0 0l-.342-1.094a60.07 60.07 0 0 0-2.198 1.094m-2.198 0c-.794-.18-1.617-.245-2.457-.245a59.75 59.75 0 0 0-4.582 2.105M8.137 14.421a60.07 60.07 0 0 1-2.104 15.797" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Budget estimé total ({timeRange === 'all' ? 'total' : timeRange === 'month' ? '30j' : timeRange === 'quarter' ? '90j' : '1 an'})</p>
                    <p className="text-xl font-bold text-gray-700">{formatAmount(purchaseStats.totalEstimatedBudget)}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="rounded-full p-3 bg-purple-100 text-purple-600 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5H8.25L9.75 9l-6 3.75 6 3.75-1.5-1.5H12l2.25 8.25L3.75 13.5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Budget estimé moyen</p>
                    <p className="text-xl font-bold text-gray-700">{formatAmount(purchaseStats.averageEstimatedBudget)}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Charts Grid - Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Demandes par type (Doughnut) */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-main-green mb-4">Demandes par type</h2>
                <div className="h-80">
                  <Doughnut
                    data={purchasesByTypeData}
                    options={{
                      ...commonOptions,
                      plugins: {
                        ...commonOptions.plugins,
                        title: { display: false },
                         tooltip: { // Specific tooltip for counts
                             callbacks: {
                                  label: function(context) {
                                     let label = context.label || '';
                                     if (label) label += ': ';
                                     if (context.parsed !== null) label += context.parsed + ' demandes';
                                     return label;
                                 },
                                 title: function(context) { return context[0].label; }
                             }
                         }
                      }
                    }}
                  />
                </div>
              </div>
              {/* Demandes par état de validation (Doughnut) */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-main-green mb-4">Demandes par état de validation</h2>
                <div className="h-80">
                  <Doughnut
                    data={purchasesByStatusData}
                    options={{
                      ...commonOptions,
                      plugins: {
                        ...commonOptions.plugins,
                        title: { display: false },
                         tooltip: { // Specific tooltip for counts
                             callbacks: {
                                  label: function(context) {
                                     let label = context.label || '';
                                     if (label) label += ': ';
                                     if (context.parsed !== null) label += context.parsed + ' demandes';
                                     return label;
                                 },
                                 title: function(context) { return context[0].label; }
                             }
                         }
                      }
                    }}
                  />
                </div>
              </div>
              {/* Tendance mensuelle des demandes (Line) */}
              <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
                <h2 className="text-lg font-semibold text-main-green mb-4">Tendance mensuelle des demandes</h2>
                <div className="h-80">
                  <Line
                    data={purchasesByMonthData}
                    options={{
                      ...commonOptions,
                       scales: {
                        y: {
                          beginAtZero: true,
                          ticks: {
                            precision: 0
                          }
                        },
                         x: { // Ensure x-axis labels are treated as categories
                             type: 'category'
                         }
                      },
                      plugins: {
                        ...commonOptions.plugins,
                        title: { display: false },
                         tooltip: { // Specific tooltip for counts
                              callbacks: {
                                   label: function(context) {
                                     let label = context.dataset.label || '';
                                     if (label) label = ' ' + label;
                                     if (context.parsed.y !== null) label = context.parsed.y + ' demandes' + label;
                                     return label;
                                   },
                                   title: function(context) { return context[0].label; }
                              }
                         }
                      }
                    }}
                  />
                </div>
              </div>
               {/* Budget estimé par ligne budgétaire (Bar) - Top 10 */}
              <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
                <h2 className="text-lg font-semibold text-main-green mb-4">Top 10 Lignes Budgétaires (Budget estimé)</h2>
                <div className="h-80">
                  <Bar
                    data={totalEstimatedByBudgetLineData}
                    options={{
                      ...commonOptions,
                      indexAxis: 'y', // Make it a horizontal bar chart for better label readability
                      scales: {
                        x: { // X-axis is now the value axis
                          beginAtZero: true,
                          ticks: {
                            callback: function(value) {
                               if (typeof value === 'number') {
                                 return value.toLocaleString('fr-FR') + ' MAD';
                               }
                               return value;
                            }
                          }
                        },
                         y: { // Y-axis is now the category axis
                             type: 'category'
                         }
                      },
                      plugins: {
                        ...commonOptions.plugins,
                        title: { display: false },
                        tooltip: { // Use the default tooltip callback that handles currency
                             callbacks: {
                                 label: commonOptions.plugins.tooltip.callbacks.label,
                                 title: function(context) {
                                     return context[0].label;
                                 }
                             }
                         }
                      }
                    }}
                  />
                </div>
              </div>
               {/* Radar Chart */}
               <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
                <h2 className="text-lg font-semibold text-main-green mb-4">Profil des Demandes (Normalisé)</h2>
                <div className="h-80">
                  <Radar
                    data={radarChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                       scales: {
                            r: {
                                grid: { color: 'rgba(0, 0, 0, 0.1)' },
                                angleLines: { color: 'rgba(0, 0, 0, 0.1)' },
                                pointLabels: { font: { size: 10 } },
                                suggestedMin: 0,
                                suggestedMax: 100, // Normalized scale
                                ticks: {
                                    backdropColor: 'rgba(255, 255, 255, 0.7)', // Make ticks readable
                                     callback: function(value) { return value + '%'; } // Show percentage
                                }
                            }
                        },
                      plugins: {
                        legend: { position: 'bottom' },
                        tooltip: {
                          callbacks: {
                            label: function(context) {
                              let label = context.dataset.label || '';
                               if (label) label += ': ';
                                if (context.parsed.r !== null) {
                                    // Find the original value before normalization for tooltip
                                    const index = context.dataIndex;
                                    const originalLabel = radarChartData.labels[index];
                                     let originalValue;
                                     switch(originalLabel) {
                                         case 'Validées': originalValue = purchaseStats.countsByStatus.VALIDEE || 0; break;
                                         case 'Rejetées': originalValue = purchaseStats.countsByStatus.REJETEE || 0; break;
                                         case 'Urgentes': originalValue = purchaseStats.countsByPriority.URGENT || 0; break;
                                         case 'Achats': originalValue = purchaseStats.countsByType.DEMANDE_ACHAT || 0; break;
                                         case 'Services': originalValue = purchaseStats.countsByType.DEMANDE_SERVICE || 0; break;
                                         case 'Budget Total': originalValue = purchaseStats.totalEstimatedBudget; break;
                                         default: originalValue = context.parsed.r; // Fallback to normalized if label not matched
                                     }
                                     if (originalLabel.includes('Budget')) {
                                          return `${originalLabel}: ${formatAmount(originalValue)} (${Math.round(context.parsed.r)}%)`;
                                     } else {
                                          return `${originalLabel}: ${originalValue} (${Math.round(context.parsed.r)}%)`;
                                     }
                                }
                                return label;
                            }
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>

            </div>

            {/* Recent Purchases List */}
            <div className="grid grid-cols-1 gap-6"> {/* Adjusted grid for a single list below charts */}
               <div className="bg-white p-6 rounded-lg shadow-md">
                 <h2 className="text-lg font-semibold text-main-green mb-4">Demandes récentes</h2>
                 <div className="overflow-x-auto">
                   <table className="min-w-full divide-y divide-gray-200">
                     <thead className="bg-gray-50">
                       <tr>
                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ligne Budgétaire</th>
                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Soumission</th>
                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget Est.</th>
                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                       </tr>
                     </thead>
                     <tbody className="bg-white divide-y divide-gray-200">
                       {recentPurchases.map((purchase, index) => {
                         const statusBadgeClass = getStatusBadgeClass(purchase.etatValidation);
                         return (
                           <tr key={purchase.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-main-green">{purchase.id.substring(0, 8)}...</td>
                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 truncate max-w-[200px]" title={purchase.budget_line}>
                                {purchase.budget_line}
                             </td>
                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{purchase.typeDemande}</td>
                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                               {formatDate(purchase.dateDemande)}
                             </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                 {formatAmount(purchase.totalEstimated)}
                              </td>
                             <td className="px-6 py-4 whitespace-nowrap">
                               <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusBadgeClass}`}>
                                 {purchase.etatValidation}
                               </span>
                             </td>
                           </tr>
                         );
                       })}
                        {recentPurchases.length === 0 && (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 text-center text-gray-500 text-sm">Aucune demande récente trouvée pour cette période.</td>
                            </tr>
                        )}
                     </tbody>
                   </table>
                 </div>
                 {filteredPurchases.length > recentPurchases.length && ( // Only show link if there are more items
                     <div className="mt-4 text-right">
                       <Link href="/purchases" className="text-main-green hover:text-main-green/80 text-sm font-medium">
                         Voir toutes les demandes →
                       </Link>
                     </div>
                 )}
               </div>
            </div>
          </>
        )}

        {/* --- Budget Tab Content --- */}
        {activeTab === 'budget' && (
             <>
             {/* Budget Stats Cards (maybe repeat or add more) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                 <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center">
                       <div className="rounded-full p-3 bg-green-100 text-green-600 mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                             <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.104c1.094.342 1.094 1.856 0 2.198a60.07 60.07 0 01-15.797 2.104m13.137-2.104c.794.18 1.617.245 2.457.245a59.75 59.75 0 004.582-2.105M18.137 14.421a60.07 60.07 0 012.104 15.797m0 0l1.094-.342a60.07 60.07 0 00-2.198-1.094m0-2.198c.18-.794.245-1.617.245-2.457a59.75 59.75 0 00-2.105-4.582m-2.457-1.094a60.07 60.07 0 01-15.797-2.104m0 0l-1.094 3.42a60.07 60.07 0 002.198 1.094m0 2.198c-.18.794-.245 1.617-.245 2.457a59.75 59.75 0 002.105 4.582m12.75-18.137a60.07 60.07 0 01-2.104-15.797m0 0l-.342-1.094a60.07 60.07 0 00-2.198 1.094m-2.198 0c-.794-.18-1.617-.245-2.457-.245a59.75 59.75 0 00-4.582 2.105M8.137 14.421a60.07 60.07 0 01-2.104 15.797" />
                          </svg>
                       </div>
                       <div>
                          <p className="text-sm text-gray-500">Budget estimé total ({timeRange === 'all' ? 'total' : timeRange === 'month' ? '30j' : timeRange === 'quarter' ? '90j' : '1 an'})</p>
                          <p className="text-xl font-bold text-gray-700">{formatAmount(purchaseStats.totalEstimatedBudget)}</p>
                       </div>
                    </div>
                 </div>
                 <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center">
                       <div className="rounded-full p-3 bg-purple-100 text-purple-600 mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                             <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5H8.25L9.75 9l-6 3.75 6 3.75-1.5-1.5H12l2.25 8.25L3.75 13.5z" />
                         </svg>
                       </div>
                       <div>
                          <p className="text-sm text-gray-500">Budget estimé moyen</p>
                          <p className="text-xl font-bold text-gray-700">{formatAmount(purchaseStats.averageEstimatedBudget)}</p>
                       </div>
                    </div>
                 </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center">
                       <div className="rounded-full p-3 bg-blue-100 text-blue-600 mr-4">
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15A.75.75 0 0 1 3 14.25h18a.75.75 0 0 1 .75.75v.75c0 1.08-.724 2.053-1.972 2.391-.305.086-.618.17-.943.252l-1.391 3.507a.75.75 0 0 1-1.01.42l-2.003-.932a1.125 1.125 0 0 0-1.293-.043l-1.615 1.144a1.125 1.125 0 0 0-1.293.043l-2.003-.932a.75.75 0 0 1-1.01.42l-1.392-3.507a2.173 2.173 0 0 0-.943-.252 1.972 1.972 0 0 1-1.972-2.39v-.75ZM4.5 9.75a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM15.75 9.75a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                           </svg>

                       </div>
                       <div>
                          <p className="text-sm text-gray-500">Budget moyen par demande Achat</p>
                          <p className="text-xl font-bold text-gray-700">{
                             purchaseStats.countsByType.DEMANDE_ACHAT > 0
                             ? formatAmount(filteredPurchases.filter(p => p.typeDemande === 'DEMANDE_ACHAT').reduce((sum,p) => sum + p.totalEstimated, 0) / purchaseStats.countsByType.DEMANDE_ACHAT)
                             : formatAmount(0)
                             }
                           </p>
                       </div>
                    </div>
                 </div>
             </div>

             {/* Charts Grid - Budget */}
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                 {/* Budget par priorité (Doughnut) */}
                  <div className="bg-white p-6 rounded-lg shadow-md">
                     <h2 className="text-lg font-semibold text-main-green mb-4">Budget par priorité</h2>
                     <div className="h-80">
                       <Doughnut
                         data={budgetByPriorityData}
                         options={{
                           ...commonOptions,
                           plugins: {
                             ...commonOptions.plugins,
                             title: { display: false },
                              tooltip: { // Use the default tooltip callback that handles currency
                                 callbacks: {
                                     label: commonOptions.plugins.tooltip.callbacks.label,
                                     title: function(context) {
                                         return context[0].label;
                                     }
                                 }
                             }
                           }
                         }}
                       />
                     </div>
                  </div>
                 {/* Budget par type de demande (Doughnut) */}
                  <div className="bg-white p-6 rounded-lg shadow-md">
                     <h2 className="text-lg font-semibold text-main-green mb-4">Budget par type de demande</h2>
                     <div className="h-80">
                       <Doughnut
                         data={budgetByTypeData}
                         options={{
                           ...commonOptions,
                           plugins: {
                             ...commonOptions.plugins,
                             title: { display: false },
                              tooltip: { // Use the default tooltip callback that handles currency
                                 callbacks: {
                                     label: commonOptions.plugins.tooltip.callbacks.label,
                                     title: function(context) {
                                         return context[0].label;
                                     }
                                 }
                             }
                           }
                         }}
                       />
                     </div>
                  </div>
                  {/* Budget estimé par mois (Line) */}
                   <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
                       <h2 className="text-lg font-semibold text-main-green mb-4">Tendance mensuelle du budget estimé</h2>
                       <div className="h-80">
                           <Line
                               data={budgetByMonthData}
                               options={{
                                   ...commonOptions,
                                   scales: {
                                       y: {
                                           beginAtZero: true,
                                           ticks: {
                                               callback: function(value) {
                                                    if (typeof value === 'number') {
                                                      return value.toLocaleString('fr-FR') + ' MAD';
                                                    }
                                                    return value;
                                               }
                                           }
                                       },
                                        x: {
                                            type: 'category'
                                        }
                                   },
                                   plugins: {
                                       ...commonOptions.plugins,
                                       title: { display: false },
                                        tooltip: { // Use the default tooltip callback that handles currency
                                            callbacks: {
                                                label: commonOptions.plugins.tooltip.callbacks.label,
                                                title: function(context) {
                                                    return context[0].label;
                                                }
                                            }
                                        }
                                   }
                               }}
                           />
                       </div>
                   </div>
              </div>

              {/* Top Expensive Purchases List */}
              <div className="grid grid-cols-1 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                      <h2 className="text-lg font-semibold text-main-green mb-4">Top 5 Demandes les plus coûteuses</h2>
                      <div className="overflow-x-auto">
                           <table className="min-w-full divide-y divide-gray-200">
                               <thead className="bg-gray-50">
                                   <tr>
                                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Détails</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ligne Budgétaire</th>
                                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget Est.</th>
                                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                                   </tr>
                               </thead>
                               <tbody className="bg-white divide-y divide-gray-200">
                                    {topExpensivePurchases.map((purchase, index) => (
                                         <tr key={purchase.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-main-green">{purchase.id.substring(0, 8)}...</td>
                                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 truncate max-w-[250px]" title={purchase.details}>
                                                 {purchase.details}
                                              </td>
                                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-[200px]" title={purchase.budget_line}>
                                                 {purchase.budget_line}
                                              </td>
                                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                                                {formatAmount(purchase.totalEstimated)}
                                             </td>
                                             <td className="px-6 py-4 whitespace-nowrap">
                                               <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(purchase.etatValidation)}`}>
                                                 {purchase.etatValidation}
                                               </span>
                                             </td>
                                         </tr>
                                    ))}
                                     {topExpensivePurchases.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-4 text-center text-gray-500 text-sm">Aucune demande trouvée pour cette période.</td>
                                        </tr>
                                    )}
                               </tbody>
                           </table>
                      </div>
                       {filteredPurchases.length > topExpensivePurchases.length && ( // Only show link if there are more items
                           <div className="mt-4 text-right">
                             <Link href="/purchases" className="text-main-green hover:text-main-green/80 text-sm font-medium">
                               Voir toutes les demandes →
                             </Link>
                           </div>
                       )}
                  </div>
              </div>
             </>
        )}

        {/* --- Materials & Services Tab Content --- */}
        {activeTab === 'materials' && (
             <>
              {/* Materials & Services Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center">
                       <div className="rounded-full p-3 bg-blue-100 text-blue-600 mr-4">
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15A.75.75 0 0 1 3 14.25h18a.75.75 0 0 1 .75.75v.75c0 1.08-.724 2.053-1.972 2.391-.305.086-.618.17-.943.252l-1.391 3.507a.75.75 0 0 1-1.01.42l-2.003-.932a1.125 1.125 0 0 0-1.293-.043l-1.615 1.144a1.125 1.125 0 0 0-1.293.043l-2.003-.932a.75.75 0 0 1-1.01.42l-1.392-3.507a2.173 2.173 0 0 0-.943-.252 1.972 1.972 0 0 1-1.972-2.39v-.75ZM4.5 9.75a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM15.75 9.75a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                           </svg>
                       </div>
                       <div>
                          <p className="text-sm text-gray-500">Nombre de demandes Achat</p>
                          <p className="text-xl font-bold text-gray-700">{purchaseStats.countsByType.DEMANDE_ACHAT || 0}</p>
                       </div>
                    </div>
                 </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center">
                       <div className="rounded-full p-3 bg-purple-100 text-purple-600 mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                             <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.498.42L2.25 16.072a4.5 4.5 0 0 1 1.485-.9v-.f-.75a.75.75 0 0 0-.72-.75H3a.75.75 0 0 0-.75.75v.75a.75.75 0 0 1-.72.75H.75A.75.75 0 0 0 0 15v-3a.75.75 0 0 0-.75-.75H-.75a.75.75 0 0 0-.75.75v3a.75.75 0 0 0 .75.75h.75a.75.75 0 0 1 .72-.75v-.75a.75.75 0 0 0-.75-.75H1.5ZM9.53 16.122v.518a3 3 0 0 1-.995 1.639l-.775-.775a2.25 2.25 0 0 0-1.128-5.78l-.17-.943c-.086-.305-.17-.618-.252-.943-.137-.52-.26-.748-.42-.91L2.25 10.5a4.5 4.5 0 0 1-.9 1.485h.75a.75.75 0 0 0 .75-.75v-.75a.75.75 0 0 1 .72-.75H4.5Zm-.129-4.132l-.775-.775a2.25 2.25 0 0 1-1.128 5.78l-.17-.943c-.086-.305-.17-.618-.252-.943-.137-.52-.26-.748-.42-.91L2.25 10.5a4.5 4.5 0 0 1-.9 1.485" />
                           </svg>
                       </div>
                       <div>
                          <p className="text-sm text-gray-500">Nombre de demandes Service</p>
                          <p className="text-xl font-bold text-gray-700">{purchaseStats.countsByType.DEMANDE_SERVICE || 0}</p>
                       </div>
                    </div>
                 </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center">
                       <div className="rounded-full p-3 bg-teal-100 text-teal-600 mr-4"> {/* Using a new color */}
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                               <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 14.25v2.25m2.25-4.5H15M7.5 10.5H3m0 0L3 9a2.25 2.25 0 0 1 2.25-2.25h5.25M3 10.5h.389c.059 0 .118.013.175.04L6 11.875m-2.611-1.375-.922.922c-.11.11-.18.25-.22.4-.037.146-.054.299-.054.451v2.25M12 18.75a.75.75 0 0 0 .75-.75v-2.25m-2.25 4.5H12M7.5 14.25v2.25m-4.5-4.5a4.5 4.5 0 1 1 9 0v2.25c0 1.38-.56 2.63-1.464 3.536L12 20.25l-1.464-1.464A5.25 5.25 0 0 1 7.5 14.25V12M12 4.5c1.487 0 2.91.162 4.25.468a1.5 1.5 0 0 0 1.4-.18L19 4.5a.75.75 0 0 0-.5-.915 14.737 14.737 0 0 0-3.58-1.139 15.107 15.107 0 0 0-4.32 0 14.738 14.738 0 0 0-3.58 1.139.75.75 0 0 0-.5.915l1.85.418a1.5 1.5 0 0 0 1.4.18c1.34-.306 2.763-.468 4.25-.468Z" />
                           </svg>
                       </div>
                       <div>
                          <p className="text-sm text-gray-500">Moyenne matériels par demande</p>
                          <p className="text-xl font-bold text-gray-700">{purchaseStats.averageMaterialsPerPurchase.toFixed(1)}</p> {/* Show one decimal */}
                       </div>
                    </div>
                 </div>
              </div>

               {/* Charts Grid - Materials & Services */}
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Budget par type de demande (Doughnut) - Can be repeated or a different view*/}
                   <div className="bg-white p-6 rounded-lg shadow-md">
                      <h2 className="text-lg font-semibold text-main-green mb-4">Budget par type de demande</h2>
                      <div className="h-80">
                        <Doughnut
                          data={budgetByTypeData}
                          options={{
                            ...commonOptions,
                            plugins: {
                              ...commonOptions.plugins,
                              title: { display: false },
                               tooltip: { // Use the default tooltip callback that handles currency
                                  callbacks: {
                                      label: commonOptions.plugins.tooltip.callbacks.label,
                                      title: function(context) {
                                          return context[0].label;
                                      }
                                  }
                              }
                            }
                          }}
                        />
                      </div>
                   </div>

                   {/* Top Materials by Estimated Cost (Bar) */}
                   <div className="bg-white p-6 rounded-lg shadow-md">
                       <h2 className="text-lg font-semibold text-main-green mb-4">Top 5 Matériels par Budget Estimé</h2>
                       <div className="h-80">
                           <Bar
                               data={{
                                   labels: purchaseStats.topMaterialsByCost.map(item => item.designation),
                                   datasets: [{
                                       label: 'Budget Total Estimé (MAD)',
                                       data: purchaseStats.topMaterialsByCost.map(item => item.totalCost),
                                        backgroundColor: 'rgba(0, 216, 113, 0.7)', // secondary-green shade
                                        borderColor: 'rgba(0, 216, 113, 1)', // secondary-green
                                        borderWidth: 1,
                                   }]
                               }}
                               options={{
                                   ...commonOptions,
                                    indexAxis: 'y', // Horizontal bar chart
                                   scales: {
                                       x: {
                                           beginAtZero: true,
                                           ticks: {
                                               callback: function(value) {
                                                    if (typeof value === 'number') {
                                                      return value.toLocaleString('fr-FR') + ' MAD';
                                                    }
                                                    return value;
                                               }
                                           }
                                       },
                                        y: {
                                            type: 'category'
                                        }
                                   },
                                   plugins: {
                                       ...commonOptions.plugins,
                                       title: { display: false },
                                        tooltip: { // Use the default tooltip callback that handles currency
                                             callbacks: {
                                                label: commonOptions.plugins.tooltip.callbacks.label,
                                                title: function(context) {
                                                    return context[0].label;
                                                }
                                            }
                                        }
                                   }
                               }}
                           />
                       </div>
                   </div>

              </div>
               {/* Recent Purchases List - Can be repeated or tailored */}
                <div className="grid grid-cols-1 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold text-main-green mb-4">Demandes récentes</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ligne Budgétaire</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Soumission</th>
                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget Est.</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {recentPurchases.map((purchase, index) => {
                                        const statusBadgeClass = getStatusBadgeClass(purchase.etatValidation);
                                        return (
                                            <tr key={purchase.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-main-green">{purchase.id.substring(0, 8)}...</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 truncate max-w-[200px]" title={purchase.budget_line}>
                                                    {purchase.budget_line}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{purchase.typeDemande}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {formatDate(purchase.dateDemande)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                   {formatAmount(purchase.totalEstimated)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusBadgeClass}`}>
                                                        {purchase.etatValidation}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                     {recentPurchases.length === 0 && (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-4 text-center text-gray-500 text-sm">Aucune demande récente trouvée pour cette période.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {filteredPurchases.length > recentPurchases.length && (
                           <div className="mt-4 text-right">
                             <Link href="/purchases" className="text-main-green hover:text-main-green/80 text-sm font-medium">
                               Voir toutes les demandes →
                             </Link>
                           </div>
                       )}
                    </div>
                </div>
             </>
        )}

        {/* No Data Message */}
        {filteredPurchases.length === 0 && (
           <div className="text-center py-8 bg-white rounded-lg shadow mt-4">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
             <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune donnée disponible pour cette période</h3>
             <p className="mt-1 text-sm text-gray-500">Essayez d'ajuster la plage de temps sélectionnée.</p>
           </div>
         )}

      </div>
    </div>
  );
};

export default PurchasesAnalysisPage;