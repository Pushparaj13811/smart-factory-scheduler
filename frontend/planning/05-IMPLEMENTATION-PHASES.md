# Implementation Phases

## Overview

This document breaks down the frontend development into manageable phases, with clear milestones and dependencies. Each phase builds upon the previous one, ensuring a solid foundation before adding complexity.

---

## Phase 0: Project Setup & Foundation (Week 1)

### Goal
Set up the development environment, install dependencies, and create the foundational structure.

### Tasks

#### 0.1 Install Core Dependencies

```bash
# Routing
npm install react-router-dom
npm install @types/react-router-dom -D

# i18n
npm install react-i18next i18next i18next-browser-languagedetector

# Additional utilities
npm install dayjs
npm install @tanstack/react-router # Alternative to react-router-dom (optional)
```

#### 0.2 Add shadcn/ui Components

```bash
npx shadcn@latest add select
npx shadcn@latest add dropdown-menu
npx shadcn@latest add popover
npx shadcn@latest add calendar
npx shadcn@latest add form
npx shadcn@latest add tabs
npx shadcn@latest add toast
npx shadcn@latest add textarea
npx shadcn@latest add scroll-area
npx shadcn@latest add pagination
npx shadcn@latest add navigation-menu
npx shadcn@latest add sonner  # Toast notifications
```

#### 0.3 Create Folder Structure

```bash
# Create all directories
mkdir -p src/app
mkdir -p src/features/{auth,dashboard,machines,components,raw-materials,orders,scheduling,maintenance,users,reports,system-admin,settings}
mkdir -p src/components/{common,forms,layouts,guards}
mkdir -p src/hooks
mkdir -p src/services/{api,websocket}
mkdir -p src/stores
mkdir -p src/types
mkdir -p src/constants
mkdir -p src/config
mkdir -p public/locales/{en,gu,hi}
```

#### 0.4 Setup Constants & Types

**Files to create:**
- `src/constants/roles.ts` - User role definitions
- `src/constants/permissions.ts` - Permission matrix
- `src/constants/routes.ts` - Route configurations
- `src/constants/api-endpoints.ts` - API endpoint constants
- `src/types/permissions.types.ts` - Permission types
- `src/types/auth.types.ts` - Auth types
- `src/types/entities.types.ts` - Entity types

#### 0.5 Setup Configuration Files

- `src/config/app.config.ts` - App configuration
- `src/config/i18n.config.ts` - i18n configuration
- `src/config/query-client.config.ts` - React Query configuration

#### 0.6 Environment Variables

```env
# .env.development
VITE_API_BASE_URL=http://localhost:3001/api
VITE_WS_URL=ws://localhost:3001
VITE_APP_NAME=Smart Factory Scheduler
VITE_ENABLE_MOCK_API=false
```

#### 0.7 Setup Linting & Formatting

```bash
# Prettier
npm install --save-dev prettier
```

`.prettierrc`:
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2
}
```

### Deliverables
- ✅ All dependencies installed
- ✅ Folder structure created
- ✅ Constants and types defined
- ✅ Configuration files setup
- ✅ Development environment ready

---

## Phase 1: Core Infrastructure (Week 1-2)

### Goal
Build the foundational infrastructure: routing, authentication, state management, and API integration.

### Tasks

#### 1.1 API Client Setup

**File**: `src/lib/api-client.ts`

```typescript
import axios from 'axios';
import { useAuthStore } from '@/stores/auth.store';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

// Request interceptor
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  const tenantId = useAuthStore.getState().user?.industryId;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (tenantId) {
    config.headers['X-Tenant-ID'] = tenantId;
  }

  return config;
});

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle 401, refresh token, etc.
    return Promise.reject(error);
  }
);
```

#### 1.2 Auth Store (Zustand)

**File**: `src/stores/auth.store.ts`

Create the auth store with persist middleware.

#### 1.3 Query Client Setup

**File**: `src/config/query-client.config.ts`

```typescript
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
```

#### 1.4 i18n Setup

**File**: `src/config/i18n.config.ts`

Setup i18next with language detection and resource loading.

**Translation files**:
- `public/locales/en/common.json`
- `public/locales/gu/common.json`
- `public/locales/hi/common.json`

#### 1.5 RBAC Hooks

**Files**:
- `src/hooks/useAuth.ts`
- `src/hooks/usePermission.ts`

#### 1.6 Route Guards

**Files**:
- `src/components/guards/ProtectedRoute/ProtectedRoute.tsx`
- `src/components/guards/PermissionGate/PermissionGate.tsx`
- `src/components/guards/RoleGate/RoleGate.tsx`

#### 1.7 Router Setup

**File**: `src/app/router.tsx`

Create the router with auth and protected routes.

#### 1.8 App Providers

**File**: `src/app/providers.tsx`

```typescript
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <Toaster />
        {children}
      </I18nextProvider>
    </QueryClientProvider>
  );
}
```

#### 1.9 Update App.tsx

```typescript
import { RouterProvider } from 'react-router-dom';
import { AppProviders } from './app/providers';
import { router } from './app/router';

function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
}
```

### Deliverables
- ✅ API client configured
- ✅ Auth store implemented
- ✅ React Query setup
- ✅ i18n configured
- ✅ RBAC hooks created
- ✅ Route guards implemented
- ✅ Router configured
- ✅ App providers setup

---

## Phase 2: Authentication Module (Week 2-3)

### Goal
Complete authentication flow: login, signup, logout, password reset.

### Tasks

#### 2.1 Auth Layouts

**File**: `src/components/layouts/AuthLayout/AuthLayout.tsx`

Simple centered layout for auth pages.

#### 2.2 Auth Services

**File**: `src/features/auth/services/auth.service.ts`

All auth API calls.

#### 2.3 Auth Hooks

**Files**:
- `src/features/auth/hooks/useLogin.ts`
- `src/features/auth/hooks/useSignup.ts`
- `src/features/auth/hooks/useLogout.ts`
- `src/features/auth/hooks/useForgotPassword.ts`
- `src/features/auth/hooks/useResetPassword.ts`

#### 2.4 Auth Pages

**Files**:
- `src/features/auth/pages/LoginPage.tsx`
- `src/features/auth/pages/SignupPage.tsx`
- `src/features/auth/pages/ForgotPasswordPage.tsx`
- `src/features/auth/pages/ResetPasswordPage.tsx`

#### 2.5 Auth Components

**Files**:
- `src/features/auth/components/LoginForm.tsx`
- `src/features/auth/components/SignupForm.tsx` (multi-step)
- `src/features/auth/components/ForgotPasswordForm.tsx`
- `src/features/auth/components/ResetPasswordForm.tsx`

#### 2.6 Token Refresh Mechanism

Implement automatic token refresh in API interceptor.

#### 2.7 Protected Route Testing

Test authentication flow and route protection.

### Deliverables
- ✅ Login page functional
- ✅ Signup page functional
- ✅ Password reset functional
- ✅ Token management working
- ✅ Auth flow tested

---

## Phase 3: Reusable Components Library (Week 3-4)

### Goal
Build all reusable components that will be used across features.

### Tasks

#### 3.1 Layout Components

**Files**:
- `src/components/layouts/AppLayout/AppLayout.tsx`
- `src/components/layouts/Sidebar/Sidebar.tsx`
- `src/components/layouts/Header/Header.tsx`
- `src/components/layouts/Footer/Footer.tsx`

#### 3.2 Common Components

**Files**:
- `src/components/common/PageHeader/PageHeader.tsx`
- `src/components/common/EmptyState/EmptyState.tsx`
- `src/components/common/LoadingState/LoadingState.tsx`
- `src/components/common/ErrorState/ErrorState.tsx`
- `src/components/common/ConfirmDialog/ConfirmDialog.tsx`
- `src/components/common/NotificationBell/NotificationBell.tsx`
- `src/components/common/UserMenu/UserMenu.tsx`
- `src/components/common/LanguageSwitcher/LanguageSwitcher.tsx`
- `src/components/common/StatCard/StatCard.tsx`
- `src/components/common/StatusBadge/StatusBadge.tsx`
- `src/components/common/ProgressIndicator/ProgressIndicator.tsx`

#### 3.3 Form Components

**Files**:
- `src/components/forms/FormField/FormField.tsx`
- `src/components/forms/SearchableSelect/SearchableSelect.tsx`
- `src/components/forms/MultiSelect/MultiSelect.tsx`
- `src/components/forms/DateTimePicker/DateTimePicker.tsx`
- `src/components/forms/QuantityInput/QuantityInput.tsx`
- `src/components/forms/DynamicFieldArray/DynamicFieldArray.tsx`
- `src/components/forms/TimeConfigInput/TimeConfigInput.tsx`

#### 3.4 DataTable Component

**File**: `src/components/common/DataTable/DataTable.tsx`

Feature-rich table with TanStack Table.

#### 3.5 FormBuilder Component

**File**: `src/components/common/FormBuilder/FormBuilder.tsx`

Generic form builder for CRUD operations.

### Deliverables
- ✅ All layout components created
- ✅ All common components created
- ✅ All form components created
- ✅ DataTable functional
- ✅ FormBuilder functional
- ✅ Components documented
- ✅ Components tested

---

## Phase 4: Dashboard Module (Week 4-5)

### Goal
Create role-based dashboards for all user types.

### Tasks

#### 4.1 Dashboard Router

**File**: `src/features/dashboard/DashboardRouter.tsx`

#### 4.2 Dashboard Pages

**Files**:
- `src/features/dashboard/pages/SystemAdminDashboard.tsx`
- `src/features/dashboard/pages/IndustryOwnerDashboard.tsx`
- `src/features/dashboard/pages/AdministratorDashboard.tsx`
- `src/features/dashboard/pages/SupervisorDashboard.tsx`
- `src/features/dashboard/pages/WorkerDashboard.tsx`

#### 4.3 Dashboard Components

**Files**:
- `src/features/dashboard/components/ActivityFeed.tsx`
- `src/features/dashboard/components/QuickActions.tsx`
- `src/features/dashboard/components/ScheduleSummary.tsx`
- `src/features/dashboard/components/MachineStatusGrid.tsx`

#### 4.4 Dashboard Services

**File**: `src/features/dashboard/services/dashboard.service.ts`

APIs for dashboard metrics.

#### 4.5 Charts Integration

Setup Recharts for various dashboard charts.

### Deliverables
- ✅ All 5 role-based dashboards created
- ✅ Dashboard data fetching working
- ✅ Dashboard responsive
- ✅ Real-time updates (WebSocket) integrated

---

## Phase 5: CRUD Modules (Week 5-8)

### Goal
Implement CRUD for Machines, Components, Raw Materials, and Users.

### 5.1 Machines Module (Week 5)

**Tasks**:
1. Create services (`src/features/machines/services/machine.service.ts`)
2. Create hooks (`useMachines`, `useCreateMachine`, etc.)
3. Create components (`MachineForm`, `MachineCard`, etc.)
4. Create pages (`MachinesListPage`, `MachineDetailPage`)
5. Add routes
6. Test CRUD operations

### 5.2 Raw Materials Module (Week 6)

**Tasks**:
1. Create services
2. Create hooks
3. Create components (`RawMaterialForm`, `StockLevelIndicator`)
4. Create pages
5. Add routes
6. Test CRUD operations

### 5.3 Components Module (Week 7)

**Tasks**:
1. Create services
2. Create hooks
3. Create components:
   - `ComponentForm`
   - `OperationStepForm` (dynamic, internal/external)
   - `TimeConfigurationPanel`
   - `RawMaterialAssignment`
4. Create pages (`ComponentsListPage`, `CreateEditComponentPage`)
5. Add routes
6. Test complex form with dynamic steps

**Note**: This is the most complex CRUD due to dynamic operation steps.

### 5.4 Users Module (Week 8)

**Tasks**:
1. Create services
2. Create hooks
3. Create components (`UserForm`, `RoleSelector`)
4. Create pages
5. Add routes
6. Test CRUD with RBAC

### Deliverables
- ✅ Machines CRUD complete
- ✅ Raw Materials CRUD complete
- ✅ Components CRUD complete (with complex form)
- ✅ Users CRUD complete
- ✅ All modules tested

---

## Phase 6: Orders & Scheduling (Week 9-10)

### Goal
Implement order management and scheduling visualization.

### 6.1 Orders Module (Week 9)

**Tasks**:
1. Create services
2. Create hooks
3. Create components:
   - `OrderForm`
   - `ComponentQuantitySelector`
   - `PrioritySelector`
   - `OrderTimeline`
4. Create pages
5. Priority management
6. Impact analysis

### 6.2 Scheduling Module (Week 10)

**Tasks**:
1. Create services
2. Create hooks
3. Create components:
   - `GanttChart` or `ScheduleTimeline`
   - `OptimizationPanel`
   - `WorkloadDistribution`
4. Create pages:
   - `ScheduleDashboardPage`
   - `MachineSchedulePage`
   - `WorkerSchedulePage`
5. WebSocket integration for real-time updates
6. Drag-and-drop (admin only)

### Deliverables
- ✅ Orders CRUD complete
- ✅ Scheduling visualization working
- ✅ Real-time updates functional
- ✅ Optimization trigger working

---

## Phase 7: Supporting Modules (Week 11-12)

### Goal
Complete maintenance, reports, and settings modules.

### 7.1 Maintenance Module (Week 11)

**Tasks**:
1. Create services
2. Create hooks
3. Create components (`MaintenanceCalendar`, `ImpactAnalysisPanel`)
4. Create pages
5. Integration with scheduling

### 7.2 Reports Module (Week 11-12)

**Tasks**:
1. Create services
2. Create hooks
3. Create components (`ReportSelector`, `ReportViewer`, `ExportOptions`)
4. Create pages
5. Implement export functionality (PDF, Excel, CSV)
6. Charts and visualizations

### 7.3 Settings Module (Week 12)

**Tasks**:
1. Create services
2. Create hooks
3. Create components (tabbed settings panels)
4. Create pages
5. Industry settings
6. User preferences

### Deliverables
- ✅ Maintenance module complete
- ✅ Reports module complete
- ✅ Settings module complete

---

## Phase 8: System Admin Module (Week 13)

### Goal
Complete system administrator features.

### Tasks

#### 8.1 Industries Management

**Tasks**:
1. Create services
2. Create hooks
3. Create components (`IndustryForm`, `IndustryCard`)
4. Create pages
5. CRUD operations for industries

#### 8.2 Subscriptions Management

**Tasks**:
1. Create services
2. Create components (`SubscriptionManager`, `BillingPanel`)
3. Create pages
4. Subscription CRUD

#### 8.3 Platform Analytics

**Tasks**:
1. Create services
2. Create components (various charts)
3. Create pages
4. Cross-industry metrics

### Deliverables
- ✅ System admin dashboard complete
- ✅ Industries management complete
- ✅ Subscriptions management complete
- ✅ Platform analytics complete

---

## Phase 9: Polish & Optimization (Week 14-15)

### Goal
Refine UX, optimize performance, and ensure quality.

### Tasks

#### 9.1 UX Improvements

- Smooth transitions and animations
- Loading skeletons
- Toast notifications
- Confirmation dialogs
- Helpful empty states

#### 9.2 Performance Optimization

- Code splitting
- Lazy loading
- Image optimization
- Bundle analysis
- Lighthouse audit

#### 9.3 Accessibility

- Keyboard navigation
- ARIA labels
- Focus management
- Screen reader testing

#### 9.4 Responsive Design

- Mobile layout
- Tablet layout
- Desktop layout
- Touch interactions

#### 9.5 Error Handling

- Form validation
- API error handling
- Offline support
- Error boundaries

#### 9.6 Testing

- Unit tests (key utilities)
- Component tests (critical components)
- Integration tests (key flows)
- E2E tests (critical paths)

### Deliverables
- ✅ UX polished
- ✅ Performance optimized
- ✅ Accessibility compliant
- ✅ Fully responsive
- ✅ Error handling robust
- ✅ Tests passing

---

## Phase 10: Internationalization (Week 16)

### Goal
Complete multi-language support.

### Tasks

#### 10.1 Translation Files

- Complete English translations
- Gujarati translations
- Hindi translations

#### 10.2 RTL Support

- RTL layouts for applicable languages
- Direction switching
- Testing

#### 10.3 Localization

- Date/time formats
- Number formats
- Currency formats

### Deliverables
- ✅ All text translated
- ✅ RTL support working
- ✅ Localization complete

---

## Phase 11: Final Testing & Documentation (Week 17-18)

### Goal
Final testing, bug fixes, and documentation.

### Tasks

#### 11.1 Testing

- Cross-browser testing
- Cross-device testing
- Performance testing
- Security testing
- User acceptance testing

#### 11.2 Bug Fixes

- Fix all critical bugs
- Fix high-priority bugs
- Address UX issues

#### 11.3 Documentation

- User guide
- Admin guide
- Developer documentation
- API integration guide
- Deployment guide

#### 11.4 Final Optimizations

- Bundle size optimization
- Runtime performance
- SEO optimization

### Deliverables
- ✅ All tests passing
- ✅ All critical bugs fixed
- ✅ Documentation complete
- ✅ Production ready

---

## Development Best Practices

### Daily Workflow

1. **Start of Day**
   - Pull latest changes
   - Review tasks for the day
   - Run tests

2. **During Development**
   - Follow component checklist
   - Write tests as you go
   - Commit frequently with clear messages
   - Keep code formatted (Prettier)

3. **End of Day**
   - Run lint and tests
   - Push changes
   - Update task status

### Code Review Checklist

- [ ] Code follows TypeScript best practices
- [ ] No console.logs left in code
- [ ] Props are typed
- [ ] Error handling present
- [ ] Loading states handled
- [ ] Accessibility considered
- [ ] Responsive design implemented
- [ ] Permissions checked
- [ ] Tests written
- [ ] Documentation updated

### Git Workflow

```bash
# Feature branch naming
feature/auth-login
feature/machines-crud
feature/dashboard-admin

# Commit message format
feat: add login page
fix: resolve machine form validation
refactor: extract table component
docs: update RBAC documentation
test: add tests for auth hooks
```

---

## Milestones

### Milestone 1: Foundation Complete (End of Week 3)
- Infrastructure setup
- Auth module complete
- Reusable components ready

### Milestone 2: Core Features (End of Week 8)
- Dashboard working
- All CRUD modules complete
- RBAC fully functional

### Milestone 3: Advanced Features (End of Week 12)
- Orders & scheduling
- Maintenance & reports
- Settings

### Milestone 4: Production Ready (End of Week 18)
- System admin features
- Polish & optimization
- i18n complete
- Testing complete
- Documentation complete

---

## Timeline Summary

| Phase | Duration | Weeks |
|-------|----------|-------|
| Phase 0: Setup | 1 week | Week 1 |
| Phase 1: Infrastructure | 1 week | Week 1-2 |
| Phase 2: Auth | 1 week | Week 2-3 |
| Phase 3: Components | 1 week | Week 3-4 |
| Phase 4: Dashboard | 1 week | Week 4-5 |
| Phase 5: CRUD Modules | 4 weeks | Week 5-8 |
| Phase 6: Orders & Scheduling | 2 weeks | Week 9-10 |
| Phase 7: Supporting Modules | 2 weeks | Week 11-12 |
| Phase 8: System Admin | 1 week | Week 13 |
| Phase 9: Polish | 2 weeks | Week 14-15 |
| Phase 10: i18n | 1 week | Week 16 |
| Phase 11: Final Testing | 2 weeks | Week 17-18 |
| **Total** | **18 weeks** | **~4.5 months** |

---

## Risk Management

### Potential Risks

1. **Complex Component Form**
   - Risk: Dynamic operation steps are complex
   - Mitigation: Allocate extra time, break into sub-components

2. **WebSocket Integration**
   - Risk: Real-time updates may be tricky
   - Mitigation: Use established library, thorough testing

3. **Performance with Large Datasets**
   - Risk: Tables may slow down with many rows
   - Mitigation: Implement pagination, virtualization

4. **Browser Compatibility**
   - Risk: Modern features may not work in old browsers
   - Mitigation: Set browser requirements, use polyfills

### Contingency Plans

- **Timeline Slippage**: Prioritize core features, defer nice-to-haves
- **Technical Blockers**: Allocate research time, seek help from backend team
- **Scope Creep**: Document feature requests for future phases

---

## Success Criteria

The frontend will be considered complete when:

- ✅ All user roles can login and access their authorized pages
- ✅ All CRUD operations work for all entities
- ✅ Dashboard shows real-time data for all roles
- ✅ Scheduling visualization works with real data
- ✅ RBAC is enforced throughout the app
- ✅ Application is responsive on mobile/tablet/desktop
- ✅ All critical bugs are fixed
- ✅ Performance meets requirements (< 2s load time)
- ✅ Accessibility standards met (WCAG 2.1 AA)
- ✅ Multi-language support working
- ✅ Documentation complete
- ✅ Tests passing with good coverage

---

## Next Steps

After frontend completion:

1. **Backend Integration Testing**: End-to-end testing with real backend
2. **User Acceptance Testing**: Get feedback from stakeholders
3. **Deployment**: Deploy to staging environment
4. **Training**: Create training materials for users
5. **Launch**: Production deployment
6. **Monitoring**: Setup error tracking and analytics
7. **Iteration**: Gather feedback and plan next version

---

This implementation plan provides a clear roadmap from start to finish, ensuring a systematic and organized development process that delivers a high-quality, production-ready application.
