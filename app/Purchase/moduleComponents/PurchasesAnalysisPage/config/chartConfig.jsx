export const commonChartOptions = {
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
  font: {
       family: 'Geist Sans, sans-serif'
  }
};