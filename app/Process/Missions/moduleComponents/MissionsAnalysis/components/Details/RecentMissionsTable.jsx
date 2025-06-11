import React from 'react'
import Link from 'next/link';
import MissionStatusBadge from './MissionStatusBadge';
import { formatDate } from '../../utils/formatters';


const RecentMissionsTable = ({ missions }) => (
  <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
    <h2 className="text-lg font-semibold text-main-green mb-4">Missions récentes</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="border-b">
          <tr>
            <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
            <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Période</th>
            <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
          </tr>
        </thead>
        <tbody>
          {missions.map((mission, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="py-4 text-sm text-gray-900">{mission.destination}</td>
              <td className="py-4 text-sm text-gray-900">{mission.type}</td>
              <td className="py-4 text-sm text-gray-900">
                {formatDate(mission.dateDebut)} - {formatDate(mission.dateFin)}
              </td>
              <td className="py-4">
                <MissionStatusBadge status={mission.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="mt-4 text-right">
      <Link href="/missions" className="text-main-green hover:text-main-green/80 text-sm font-medium">
        Voir toutes les missions →
      </Link>
    </div>
  </div>
);
export default RecentMissionsTable;