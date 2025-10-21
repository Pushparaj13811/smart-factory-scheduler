// Mock API endpoints registry

import type { MockEndpoint } from '../types';
import { authEndpoints } from './auth.endpoints';
import { dashboardEndpoints } from './dashboard.endpoints';
import { machinesEndpoints } from './machines.endpoints';
import { componentsEndpoints } from './components.endpoints';
import { rawMaterialsEndpoints } from './raw-materials.endpoints';
import { ordersEndpoints } from './orders.endpoints';
import { scheduleEndpoints } from './schedule.endpoints';
import { maintenanceEndpoints } from './maintenance.endpoints';
import { systemEndpoints } from './system.endpoints';
import { usersEndpoints } from './users.endpoints';

// Combine all endpoints
export const mockEndpoints: MockEndpoint[] = [
  ...authEndpoints,
  ...dashboardEndpoints,
  ...machinesEndpoints,
  ...componentsEndpoints,
  ...rawMaterialsEndpoints,
  ...ordersEndpoints,
  ...scheduleEndpoints,
  ...maintenanceEndpoints,
  ...systemEndpoints,
  ...usersEndpoints,
];
