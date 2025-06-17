import React from 'react';
import { Bar } from 'react-chartjs-2';
import { commonChartOptions } from '../../config/chartConfig';

const BarChart = ({ data, options = {} }) => {
  const defaultOptions = {
    ...commonChartOptions,
    indexAxis: options.horizontal ? 'y' : 'x',
    scales: {
      [options.horizontal ? 'x' : 'y']: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            if (typeof value === 'number' && options.isCurrency) {
              return value.toLocaleString('fr-FR') + ' MAD';
            }
            return value;
          }
        }
      },
      [options.horizontal ? 'y' : 'x']: {
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
            if (label) label += ': ';
            const value = options.horizontal ? context.parsed.x : context.parsed.y;
            if (value !== null && options.isCurrency) {
              label += new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'MAD' }).format(value);
            } else if (value !== null) {
              label += value + (options.suffix || '');
            }
            return label;
          },
          title: function(context) {
            return context[0].label;
          }
        }
      }
    },
    ...options
  };

  return <Bar data={data} options={defaultOptions} />;
};

export default BarChart;