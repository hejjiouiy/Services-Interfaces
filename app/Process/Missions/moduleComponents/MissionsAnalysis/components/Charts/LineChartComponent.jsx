import React from 'react';
import { Line } from 'react-chartjs-2';
import getCommonChartOptions from '../../config/chartOptions';


const LineChartComponent = ({ data }) => {
  const commonOptions = getCommonChartOptions();
  return (
    <Line 
      data={data}
      options={{
        ...commonOptions,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
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
export default LineChartComponent;