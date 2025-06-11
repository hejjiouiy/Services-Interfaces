import React from 'react';
import { Pie } from 'react-chartjs-2';
import getCommonChartOptions from '../../config/chartOptions';

const PieChartComponent = ({ data }) => {
  const commonOptions = getCommonChartOptions();
  return (
    <Pie 
      data={data} 
      options={{
        ...commonOptions,
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
export default PieChartComponent;