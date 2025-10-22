// Maintenance List component

import { MaintenanceTable } from './MaintenanceTable';
import type { MaintenanceRecord } from '../types';

interface MaintenanceListProps {
  records: MaintenanceRecord[];
}

export function MaintenanceList({ records }: MaintenanceListProps) {
  return <MaintenanceTable records={records} />;
}
