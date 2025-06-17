import React from 'react';
import { Line } from 'react-chartjs-2';
import { commonChartOptions } from '../../config/chartConfig';

const LineChart = ({ data, options = {} }) => {
  const defaultOptions = {
    ...commonChartOptions,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            if (typeof value === 'number' && options.isCurrency) {
              return value.toLocaleString('fr-FR') + ' MAD';
            }
            return value;
          },
          precision: options.isCurrency ? undefined : 0
        }
      },
      x: {
        type: 'category'
      }
    },
    plugins: {
      ...commonChartOptions.plugins,
      title: { display: false },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) label = ' ' + label;
            if (context.parsed.y !== null) {
              if (options.isCurrency) {
                label = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'MAD' }).format(context.parsed.y) + label;
              } else {
                label = context.parsed.y + ' demandes' + label;
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

  return <Line data={data} options={defaultOptions} />;
};

export default LineChart;