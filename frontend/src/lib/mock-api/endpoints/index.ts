// Mock API endpoints registry

import type { MockEndpoint } from '../types';
import { authEndpoints } from './auth.endpoints';
import { dashboardEndpoints } from './dashboard.endpoints';
import { machinesEndpoints } from './machines.endpoints';
import { systemEndpoints } from './system.endpoints';

// Combine all endpoints
export const mockEndpoints: MockEndpoint[] = [
  ...authEndpoints,
  ...dashboardEndpoints,
  ...machinesEndpoints,
  ...systemEndpoints,
];
