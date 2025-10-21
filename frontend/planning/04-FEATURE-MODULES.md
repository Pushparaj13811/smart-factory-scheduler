# Feature Modules Breakdown

## Module Organization Pattern

Each feature module follows this structure:

```
features/<feature-name>/
├── components/          # Feature-specific components
├── hooks/              # Feature-specific hooks
├── services/           # API service functions
├── stores/             # Zustand stores (if needed)
├── types/              # TypeScript types
├── utils/              # Feature-specific utilities
├── pages/              # Page components
├── routes.tsx          # Route configuration
└── index.ts            # Public exports
```

---

## 1. Authentication Module

**Path**: `src/features/auth/`

### 1.1 Pages

#### LoginPage
- Email/password form
- "Remember me" checkbox
- "Forgot password" link
- Language selector
- Error handling
- Loading state
- Redirect after login

#### SignupPage
- Multi-step registration:
  - Step 1: Basic info (email, password, name)
  - Step 2: Industry selection (new or join existing)
  - Step 3: Email verification
- Form validation
- Password strength indicator
- Terms & conditions checkbox

#### ForgotPasswordPage
- Email input
- Send reset link
- Success message

#### ResetPasswordPage
- New password form
- Password confirmation
- Token validation

### 1.2 Components

```typescript
// LoginForm
// SignupForm
// ForgotPasswordForm
// ResetPasswordForm
// EmailVerificationPrompt
```

### 1.3 Services

```typescript
// src/features/auth/services/auth.service.ts

export const authService = {
  login: (email: string, password: string) => Promise<AuthResponse>,
  signup: (data: SignupData) => Promise<User>,
  logout: () => Promise<void>,
  refreshToken: (refreshToken: string) => Promise<TokenResponse>,
  forgotPassword: (email: string) => Promise<void>,
  resetPassword: (token: string, password: string) => Promise<void>,
  verifyEmail: (token: string) => Promise<void>,
  getCurrentUser: () => Promise<User>,
};
```

### 1.4 Hooks

```typescript
// useLogin
// useSignup
// useLogout
// useForgotPassword
// useResetPassword
```

### 1.5 Types

```typescript
interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface SignupData {
  email: string;
  password: string;
  name: string;
  industryId?: string; // If joining existing
  industryName?: string; // If creating new
}

interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}
```

---

## 2. Dashboard Module

**Path**: `src/features/dashboard/`

### 2.1 Role-Based Pages

#### SystemAdminDashboard
- Total industries count
- Active subscriptions
- Revenue metrics
- Platform health status
- Recent activities
- Support tickets

#### IndustryOwnerDashboard
- Industry performance overview
- Subscription status
- Active orders
- Machine utilization
- Team productivity
- Revenue/costs

#### AdministratorDashboard
- Active orders
- Machine status
- Schedule overview
- Raw material inventory
- Team workload
- Recent activities

#### SupervisorDashboard
- Team performance
- Assigned tasks
- Pending approvals
- Schedule adherence
- Machine status

#### WorkerDashboard
- Personal schedule
- Today's tasks
- Completed tasks
- Performance metrics

### 2.2 Components

```typescript
// StatCard (already in common)
// ActivityFeed
// QuickActions
// ScheduleSummary
// MachineStatusGrid
// OrderStatusChart
// RecentOrders
// TeamPerformanceChart
```

### 2.3 DashboardRouter

```typescript
// src/features/dashboard/DashboardRouter.tsx

export default function DashboardRouter() {
  const { user } = useAuth();

  const DashboardComponent = useMemo(() => {
    switch (user?.role) {
      case UserRole.SYSTEM_ADMIN:
        return SystemAdminDashboard;
      case UserRole.INDUSTRY_OWNER:
        return IndustryOwnerDashboard;
      case UserRole.ADMINISTRATOR:
        return AdministratorDashboard;
      case UserRole.SUPERVISOR:
        return SupervisorDashboard;
      case UserRole.WORKER:
        return WorkerDashboard;
      default:
        return UnauthorizedPage;
    }
  }, [user?.role]);

  return <DashboardComponent />;
}
```

---

## 3. Machines Module

**Path**: `src/features/machines/`

### 3.1 Pages

#### MachinesListPage
- Data table with machines
- Search and filter
- Create machine button
- Bulk actions

#### MachineDetailPage
- Machine information
- Maintenance history
- Utilization statistics
- Assigned tasks/schedule
- Operations log

### 3.2 Components

```typescript
// MachineForm
// MachineCard
// MachineStatusIndicator
// MaintenanceToggle
// MaintenanceHistory
// UtilizationChart
```

### 3.3 Services

```typescript
export const machineService = {
  getAll: (params?: QueryParams) => Promise<PaginatedResponse<Machine>>,
  getById: (id: string) => Promise<Machine>,
  create: (data: CreateMachineDto) => Promise<Machine>,
  update: (id: string, data: UpdateMachineDto) => Promise<Machine>,
  delete: (id: string) => Promise<void>,
  toggleMaintenance: (id: string) => Promise<Machine>,
  getMaintenanceHistory: (id: string) => Promise<MaintenanceRecord[]>,
  getUtilization: (id: string, dateRange: DateRange) => Promise<UtilizationData>,
};
```

### 3.4 Hooks

```typescript
// useMachines - Get all machines
// useMachine - Get single machine
// useCreateMachine
// useUpdateMachine
// useDeleteMachine
// useToggleMaintenance
// useMachineCategories - Get available categories
```

### 3.5 Types

```typescript
interface Machine {
  id: string;
  category: string;
  name: string;
  code: string;
  status: 'active' | 'inactive' | 'maintenance';
  remarks?: string;
  industryId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CreateMachineDto {
  category: string;
  name: string;
  code: string;
  remarks?: string;
}
```

---

## 4. Components Module (Manufacturing Components)

**Path**: `src/features/components/`

### 4.1 Pages

#### ComponentsListPage
- Components table
- Search and filter
- Create component button

#### ComponentDetailPage
- Component info
- Operation steps
- Raw materials
- Production history
- Cost analysis

#### CreateEditComponentPage
- Multi-step form:
  - Step 1: Basic info
  - Step 2: Operation steps (dynamic)
  - Step 3: Raw materials
  - Step 4: Review and save

### 4.2 Components

```typescript
// ComponentForm
// OperationStepForm
// OperationStepList
// InternalOperationForm
// ExternalOperationForm
// RawMaterialAssignment
// TimeConfigurationPanel
// BufferTimeConfiguration
```

### 4.3 Operation Step Components

```typescript
// OperationTypeSelector - Toggle between Internal/External
// MachineSelector - Multi-select machines
// TimeConfigForm - Setup/Operation/Buffer times with "Apply to All" toggles
// ExternalOperationForm - Industry name + return time
```

### 4.4 Services

```typescript
export const componentService = {
  getAll: (params?: QueryParams) => Promise<PaginatedResponse<Component>>,
  getById: (id: string) => Promise<Component>,
  create: (data: CreateComponentDto) => Promise<Component>,
  update: (id: string, data: UpdateComponentDto) => Promise<Component>,
  delete: (id: string) => Promise<void>,
  getProductionHistory: (id: string) => Promise<ProductionRecord[]>,
};
```

### 4.5 Types

```typescript
interface Component {
  id: string;
  name: string;
  category: string;
  code: string;
  operationSteps: OperationStep[];
  rawMaterials: ComponentRawMaterial[];
  industryId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface OperationStep {
  id: string;
  stepNumber: number;
  type: 'internal' | 'external';

  // For internal operations
  machines?: {
    machineId: string;
    setupTime: number; // minutes
    operationTime: number;
    bufferTime: number;
  }[];

  // For external operations
  externalIndustryName?: string;
  expectedReturnTime?: number; // hours
}

interface ComponentRawMaterial {
  rawMaterialId: string;
  quantityType: 'per_unit' | 'per_100';
  quantityValue: number;
}
```

---

## 5. Raw Materials Module

**Path**: `src/features/raw-materials/`

### 5.1 Pages

#### RawMaterialsListPage
- Materials table
- Stock level indicators
- Low stock alerts
- Create material button

#### RawMaterialDetailPage
- Material info
- Stock levels
- Usage history
- Consumption patterns
- Reorder suggestions

### 5.2 Components

```typescript
// RawMaterialForm
// StockLevelIndicator
// UsageHistoryChart
// ReorderAlert
// ConsumptionChart
```

### 5.3 Services

```typescript
export const rawMaterialService = {
  getAll: (params?: QueryParams) => Promise<PaginatedResponse<RawMaterial>>,
  getById: (id: string) => Promise<RawMaterial>,
  create: (data: CreateRawMaterialDto) => Promise<RawMaterial>,
  update: (id: string, data: UpdateRawMaterialDto) => Promise<RawMaterial>,
  delete: (id: string) => Promise<void>,
  updateStock: (id: string, quantity: number) => Promise<RawMaterial>,
  getUsageHistory: (id: string, dateRange: DateRange) => Promise<UsageRecord[]>,
  getLowStockItems: () => Promise<RawMaterial[]>,
};
```

### 5.4 Types

```typescript
interface RawMaterial {
  id: string;
  type: string;
  name: string;
  specification: string;
  availableQuantity: number;
  unit: string;
  minStockLevel?: number;
  remarks?: string;
  industryId: string;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 6. Orders Module

**Path**: `src/features/orders/`

### 6.1 Pages

#### OrdersListPage
- Orders table
- Filter by status, priority, deadline
- Create order button
- Bulk actions

#### OrderDetailPage
- Order information
- Component breakdown
- Schedule timeline
- Progress tracking
- Impact analysis (for changes)

#### CreateEditOrderPage
- Component selection (multi-select with quantities)
- Deadline picker
- Priority selector
- Submit for optimization

### 6.2 Components

```typescript
// OrderForm
// ComponentQuantitySelector
// PrioritySelector
// DeadlinePicker
// OrderProgressBar
// OrderTimeline
// ImpactAnalysisPanel
// SchedulePreview
```

### 6.3 Services

```typescript
export const orderService = {
  getAll: (params?: QueryParams) => Promise<PaginatedResponse<Order>>,
  getById: (id: string) => Promise<Order>,
  create: (data: CreateOrderDto) => Promise<Order>,
  update: (id: string, data: UpdateOrderDto) => Promise<Order>,
  delete: (id: string) => Promise<void>,
  updatePriority: (id: string, priority: Priority) => Promise<Order>,
  duplicate: (id: string) => Promise<Order>,
  getImpactAnalysis: (id: string, changes: any) => Promise<ImpactAnalysis>,
  cancel: (id: string) => Promise<void>,
};
```

### 6.4 Types

```typescript
interface Order {
  id: string;
  components: {
    componentId: string;
    quantity: number;
  }[];
  deadline: Date;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  progress: number; // 0-100
  industryId: string;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 7. Scheduling Module

**Path**: `src/features/scheduling/`

### 7.1 Pages

#### ScheduleDashboardPage
- Machine schedule view (Gantt chart)
- Worker schedule view
- Filter by machine/worker/date range
- Manual adjustments (admin only)
- Optimization trigger button

#### MachineSchedulePage
- Timeline for selected machine
- Task details
- Drag-and-drop (admin)

#### WorkerSchedulePage
- Worker's personal schedule
- Task list
- Completion status updates

### 7.2 Components

```typescript
// GanttChart (from common)
// ScheduleTimeline
// TaskCard
// OptimizationPanel
// OptimizationHistory
// ScheduleFilters
// WorkloadDistribution
```

### 7.3 Services

```typescript
export const scheduleService = {
  getCurrent: (params?: ScheduleParams) => Promise<Schedule>,
  getByMachine: (machineId: string, dateRange: DateRange) => Promise<ScheduleTask[]>,
  getByWorker: (workerId: string, dateRange: DateRange) => Promise<ScheduleTask[]>,
  triggerOptimization: () => Promise<OptimizationRun>,
  getOptimizationHistory: () => Promise<OptimizationRun[]>,
  updateTask: (taskId: string, data: UpdateTaskDto) => Promise<ScheduleTask>,
};
```

### 7.4 WebSocket Integration

```typescript
// Real-time schedule updates
useEffect(() => {
  const socket = useWebSocket();

  socket.on('schedule:updated', (data) => {
    // Refetch schedule
    queryClient.invalidateQueries(['schedule']);
  });

  return () => socket.off('schedule:updated');
}, []);
```

---

## 8. Maintenance Module

**Path**: `src/features/maintenance/`

### 8.1 Pages

#### MaintenanceCalendarPage
- Calendar view of maintenance
- Planned vs emergency
- Create maintenance button

#### MaintenanceHistoryPage
- Historical maintenance records
- Statistics and trends

### 8.2 Components

```typescript
// MaintenanceForm
// MaintenanceCalendar
// MaintenanceRecord
// ImpactAnalysisPanel
// AlternativeMachinesSuggestion
```

### 8.3 Services

```typescript
export const maintenanceService = {
  getScheduled: (dateRange: DateRange) => Promise<MaintenanceSchedule[]>,
  create: (data: CreateMaintenanceDto) => Promise<MaintenanceSchedule>,
  update: (id: string, data: UpdateMaintenanceDto) => Promise<MaintenanceSchedule>,
  delete: (id: string) => Promise<void>,
  getHistory: (machineId?: string) => Promise<MaintenanceRecord[]>,
  getImpact: (machineId: string, dateRange: DateRange) => Promise<MaintenanceImpact>,
};
```

---

## 9. Users Module

**Path**: `src/features/users/`

### 9.1 Pages

#### UsersListPage
- Users table
- Filter by role, status
- Create user button
- Bulk actions

#### UserDetailPage
- User information
- Role and permissions
- Activity log
- Performance metrics

#### CreateEditUserPage
- User form with role selection
- Team assignment
- Skill/certification tracking

### 9.2 Components

```typescript
// UserForm
// RoleSelector
// TeamAssignment
// SkillManager
// UserActivityLog
// PerformanceMetrics
```

### 9.3 Services

```typescript
export const userService = {
  getAll: (params?: QueryParams) => Promise<PaginatedResponse<User>>,
  getById: (id: string) => Promise<User>,
  create: (data: CreateUserDto) => Promise<User>,
  update: (id: string, data: UpdateUserDto) => Promise<User>,
  delete: (id: string) => Promise<void>,
  updateRole: (id: string, role: UserRole) => Promise<User>,
  getActivityLog: (id: string) => Promise<Activity[]>,
};
```

---

## 10. Reports Module

**Path**: `src/features/reports/`

### 10.1 Pages

#### ReportsPage
- Report type selector
- Date range filter
- Generate report button
- Export options (PDF, Excel, CSV)

#### ReportViewerPage
- Display generated report
- Charts and visualizations
- Export functionality

### 10.2 Report Types

1. **Production Reports**
   - Component production statistics
   - Machine efficiency
   - Order completion rates

2. **Performance Reports**
   - Worker productivity
   - Schedule adherence
   - GA optimization results

3. **Inventory Reports**
   - Raw material consumption
   - Stock levels
   - Cost analysis

### 10.3 Components

```typescript
// ReportSelector
// DateRangeFilter
// ReportViewer
// ExportOptions
// ChartDisplay (various chart types)
```

### 10.4 Services

```typescript
export const reportService = {
  generate: (type: ReportType, params: ReportParams) => Promise<Report>,
  export: (reportId: string, format: 'pdf' | 'excel' | 'csv') => Promise<Blob>,
  getScheduled: () => Promise<ScheduledReport[]>,
  schedule: (config: ScheduleReportConfig) => Promise<ScheduledReport>,
};
```

---

## 11. System Admin Module

**Path**: `src/features/system-admin/`

**Access**: System Administrator only

### 11.1 Pages

#### IndustriesPage
- Industries table
- Create/suspend/activate
- Subscription management

#### SubscriptionsPage
- All subscriptions
- Billing management
- Plan changes

#### PlatformAnalyticsPage
- Cross-industry metrics
- Revenue tracking
- Usage statistics

#### SupportPage
- Support ticket management
- Industry communications

### 11.2 Components

```typescript
// IndustryForm
// IndustryCard
// SubscriptionManager
// BillingPanel
// PlatformMetrics
// SupportTicketList
```

### 11.3 Services

```typescript
export const systemAdminService = {
  // Industries
  getAllIndustries: () => Promise<Industry[]>,
  createIndustry: (data: CreateIndustryDto) => Promise<Industry>,
  updateIndustry: (id: string, data: UpdateIndustryDto) => Promise<Industry>,
  suspendIndustry: (id: string) => Promise<void>,
  activateIndustry: (id: string) => Promise<void>,

  // Subscriptions
  getAllSubscriptions: () => Promise<Subscription[]>,
  updateSubscription: (id: string, data: UpdateSubscriptionDto) => Promise<Subscription>,

  // Analytics
  getPlatformMetrics: (dateRange: DateRange) => Promise<PlatformMetrics>,
};
```

---

## 12. Settings Module

**Path**: `src/features/settings/`

### 12.1 Pages

#### SettingsPage (Tabbed)
- **General**: Industry name, logo, timezone
- **Subscription**: Plan details, usage, billing
- **Notifications**: Email/SMS preferences
- **Integrations**: API keys, webhooks
- **Security**: Password policy, 2FA

### 12.2 Components

```typescript
// GeneralSettings
// SubscriptionSettings
// NotificationSettings
// IntegrationSettings
// SecuritySettings
```

---

## 13. Feature Module Checklist

For each feature module, ensure:

- [ ] Page components created
- [ ] Reusable components created
- [ ] Services implemented
- [ ] Hooks created
- [ ] Types defined
- [ ] Routes configured
- [ ] Permissions applied
- [ ] Loading states handled
- [ ] Error states handled
- [ ] Empty states handled
- [ ] Forms validated (Zod schemas)
- [ ] API integration complete
- [ ] Tests written
- [ ] Documentation added

---

## 14. Module Dependencies

```
auth → (no dependencies)
dashboard → auth, machines, orders, scheduling
machines → auth
components → auth, machines, raw-materials
raw-materials → auth
orders → auth, components
scheduling → auth, machines, orders, users
maintenance → auth, machines, scheduling
users → auth
reports → auth, (all data modules)
system-admin → auth
settings → auth
```

---

## 15. Shared Utilities Across Modules

```typescript
// src/lib/api-client.ts
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // ... configuration
});

// src/lib/query-keys.ts
export const queryKeys = {
  machines: {
    all: ['machines'] as const,
    lists: () => [...queryKeys.machines.all, 'list'] as const,
    list: (filters: string) => [...queryKeys.machines.lists(), { filters }] as const,
    details: () => [...queryKeys.machines.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.machines.details(), id] as const,
  },
  // ... other query keys
};
```

---

## Summary

This feature breakdown provides:

✅ **Clear Module Structure**: Consistent organization across features
✅ **Complete Coverage**: All SRS requirements addressed
✅ **Type Safety**: TypeScript interfaces for all entities
✅ **Reusability**: Shared components and utilities
✅ **Maintainability**: Modular, independent features
✅ **Scalability**: Easy to add new features
✅ **RBAC Integration**: Permissions baked into each feature
✅ **Testing Ready**: Clear boundaries for testing
