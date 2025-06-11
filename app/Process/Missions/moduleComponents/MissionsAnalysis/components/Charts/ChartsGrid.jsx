import ChartContainer from './ChartContainer';
import PieChartComponent from './PieChartComponent';
import DoughnutChartComponent from './DoughnutChartComponent';
import LineChartComponent from './LineChartComponent';
import BarChartComponent from './BarChartComponent';
import React from 'react';

const ChartsGrid = ({ sampleData }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
    <ChartContainer title="Missions par type">
      <PieChartComponent data={sampleData.missionsByType} />
    </ChartContainer>
    
    <ChartContainer title="Missions par statut">
      <DoughnutChartComponent data={sampleData.missionsByStatus} />
    </ChartContainer>
    
    <ChartContainer title="Tendance mensuelle des missions" colSpan="lg:col-span-2">
      <LineChartComponent data={sampleData.missionsByMonth} />
    </ChartContainer>
    
    <ChartContainer title="Budget par destination" colSpan="lg:col-span-2">
      <BarChartComponent data={sampleData.budgetByDestination} />
    </ChartContainer>
  </div>
);

export default ChartsGrid;