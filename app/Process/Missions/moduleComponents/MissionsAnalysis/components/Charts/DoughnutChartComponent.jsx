import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import getCommonChartOptions from '../../config/chartOptions';

const DoughnutChartComponent = ({ data }) => {
  const commonOptions = getCommonChartOptions();
  return (
    <Doughnut 
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
export default DoughnutChartComponent;