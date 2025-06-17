import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { commonChartOptions } from '../../config/chartConfig';

const DoughnutChart = ({ data, options = {} }) => {
  const chartOptions = {
    ...commonChartOptions,
    plugins: {
      ...commonChartOptions.plugins,
      title: { display: false },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) label += ': ';
            if (context.parsed !== null) {
              if (options.isCurrency) {
                label += new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'MAD' }).format(context.parsed);
              } else {
                label += context.parsed + ' demandes';
              }
            }
            return label;
          },
          title: function(context) { return context[0].label; }
        }
      }
    },
    ...options
  };

  return <Doughnut data={data} options={chartOptions} />;
};

export default DoughnutChart;
