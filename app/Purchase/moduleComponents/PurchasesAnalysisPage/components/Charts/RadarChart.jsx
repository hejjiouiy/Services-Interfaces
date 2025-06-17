import React from 'react';
import { Radar } from 'react-chartjs-2';

const RadarChart = ({ data, statistics }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        grid: { color: 'rgba(0, 0, 0, 0.1)' },
        angleLines: { color: 'rgba(0, 0, 0, 0.1)' },
        pointLabels: { font: { size: 10 } },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          backdropColor: 'rgba(255, 255, 255, 0.7)',
          callback: function(value) { return value + '%'; }
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
              const index = context.dataIndex;
              const originalLabel = data.labels[index];
              let originalValue;
              switch(originalLabel) {
                case 'Validées': originalValue = statistics.countsByStatus.VALIDEE || 0; break;
                case 'Rejetées': originalValue = statistics.countsByStatus.REJETEE || 0; break;
                case 'Urgentes': originalValue = statistics.countsByPriority.URGENT || 0; break;
                case 'Achats': originalValue = statistics.countsByType.DEMANDE_ACHAT || 0; break;
                case 'Services': originalValue = statistics.countsByType.DEMANDE_SERVICE || 0; break;
                case 'Budget Total': originalValue = statistics.totalEstimatedBudget; break;
                default: originalValue = context.parsed.r;
              }
              if (originalLabel.includes('Budget')) {
                return `${originalLabel}: ${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'MAD' }).format(originalValue)} (${Math.round(context.parsed.r)}%)`;
              } else {
                return `${originalLabel}: ${originalValue} (${Math.round(context.parsed.r)}%)`;
              }
            }
            return label;
          }
        }
      }
    }
  };

  return <Radar data={data} options={options} />;
};

export default RadarChart;