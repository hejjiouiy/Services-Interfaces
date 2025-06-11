import React from 'react';
import TopDestinations from './TopDestinations';
import RecentMissionsTable from './RecentMissionsTable';


const DetailsGrid = ({ sampleData }) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <TopDestinations destinations={sampleData.topDestinations} />
    <RecentMissionsTable missions={sampleData.recentMissions} />
  </div>
);
export default DetailsGrid;