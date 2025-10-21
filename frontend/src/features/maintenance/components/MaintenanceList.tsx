// Maintenance List component

import { MaintenanceCard } from './MaintenanceCard';
import type { MaintenanceRecord } from '../types';

interface MaintenanceListProps {
  records: MaintenanceRecord[];
}

export function MaintenanceList({ records }: MaintenanceListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {records.map((record) => (
        <MaintenanceCard key={record.id} record={record} />
      ))}
    </div>
  );
}
