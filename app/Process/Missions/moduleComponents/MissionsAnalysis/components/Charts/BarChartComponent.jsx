import React from 'react';
import { Bar } from 'react-chartjs-2';
import getCommonChartOptions from '../../config/chartOptions';  

const BarChartComponent = ({ data }) => {
  const commonOptions = getCommonChartOptions();
  return (
    <Bar 
      data={data}
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
  );
};
export default BarChartComponent;