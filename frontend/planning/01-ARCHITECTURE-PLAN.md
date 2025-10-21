# Frontend Architecture Plan - Smart Factory Scheduler

## 1. Core Architecture Principles

### 1.1 Reusability First
- **Atomic Design Pattern**: Build from atoms → molecules → organisms → templates → pages
- **DRY (Don't Repeat Yourself)**: Zero code duplication through abstraction
- **Composition over Inheritance**: Use component composition for flexibility
- **Generic Components**: Build configurable components instead of specific ones
- **Custom Hooks**: Extract all reusable logic into hooks

### 1.2 RBAC (Role-Based Access Control)
- **Permission-Driven UI**: Show/hide features based on permissions
- **Route Guards**: Protect routes at the routing level
- **Component Guards**: Protect components/actions at the component level
- **Centralized Permission Logic**: Single source of truth for permissions
- **Type-Safe Permissions**: TypeScript enums and constants

### 1.3 Multi-Tenant Architecture
- **Tenant Context**: React Context for current tenant/industry
- **Tenant Isolation**: All API calls scoped to current tenant
- **Tenant Switching**: Support for users with multi-tenant access

## 2. Technology Stack (Already in Place)

### Core
- **React 19.1.1**: Latest React with Compiler
- **TypeScript 5.9**: Strict mode enabled
- **Vite 7**: Build tool with HMR

### UI & Styling
- **Tailwind CSS v4**: Utility-first CSS
- **shadcn/ui**: Radix UI component library
- **Lucide React**: Icon library

### State Management
- **Zustand**: Client state (auth, UI preferences, tenant context)
- **TanStack Query**: Server state (API data, caching)
- **React Hook Form**: Form state management
- **Zod**: Schema validation

### Routing
- **React Router v6**: Client-side routing (to be installed)

### API Communication
- **Axios**: HTTP client with interceptors
- **WebSocket**: Real-time updates (to be implemented)

### Internationalization
- **react-i18next**: i18n framework (to be installed)

## 3. Folder Structure

```
frontend/
├── public/
│   └── locales/              # Translation files
│       ├── en/
│       ├── gu/
│       └── hi/
├── src/
│   ├── app/                  # App initialization
│   │   ├── App.tsx
│   │   ├── router.tsx        # Route configuration
│   │   └── providers.tsx     # Context providers wrapper
│   │
│   ├── assets/               # Static assets
│   │   ├── images/
│   │   └── icons/
│   │
│   ├── components/           # Reusable components
│   │   ├── ui/              # shadcn/ui components (auto-generated)
│   │   ├── common/          # Shared business components
│   │   │   ├── DataTable/   # Generic table component
│   │   │   ├── FormBuilder/ # Dynamic form builder
│   │   │   ├── PageHeader/
│   │   │   ├── EmptyState/
│   │   │   ├── LoadingState/
│   │   │   ├── ErrorBoundary/
│   │   │   └── ...
│   │   ├── forms/           # Reusable form components
│   │   │   ├── FormField/
│   │   │   ├── SearchableSelect/
│   │   │   ├── DateTimePicker/
│   │   │   ├── MultiSelect/
│   │   │   └── ...
│   │   ├── layouts/         # Layout components
│   │   │   ├── AppLayout/
│   │   │   ├── AuthLayout/
│   │   │   ├── Sidebar/
│   │   │   ├── Header/
│   │   │   └── ...
│   │   └── guards/          # Permission guards
│   │       ├── ProtectedRoute/
│   │       ├── PermissionGate/
│   │       └── RoleGate/
│   │
│   ├── features/            # Feature-based modules
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   ├── stores/
│   │   │   ├── types/
│   │   │   └── routes.tsx
│   │   ├── dashboard/
│   │   ├── machines/
│   │   ├── components/      # Manufacturing components
│   │   ├── raw-materials/
│   │   ├── orders/
│   │   ├── scheduling/
│   │   ├── maintenance/
│   │   ├── users/
│   │   ├── reports/
│   │   └── system-admin/
│   │
│   ├── hooks/               # Global custom hooks
│   │   ├── useAuth.ts
│   │   ├── usePermission.ts
│   │   ├── useTenant.ts
│   │   ├── useWebSocket.ts
│   │   └── ...
│   │
│   ├── lib/                 # Utility libraries
│   │   ├── utils.ts         # General utilities
│   │   ├── api-client.ts    # Axios instance
│   │   ├── validators.ts    # Zod schemas
│   │   └── formatters.ts    # Data formatters
│   │
│   ├── services/            # API services
│   │   ├── api/
│   │   │   ├── auth.service.ts
│   │   │   ├── machines.service.ts
│   │   │   ├── components.service.ts
│   │   │   └── ...
│   │   └── websocket/
│   │       └── socket.service.ts
│   │
│   ├── stores/              # Zustand stores
│   │   ├── auth.store.ts
│   │   ├── tenant.store.ts
│   │   ├── ui.store.ts
│   │   └── notification.store.ts
│   │
│   ├── types/               # TypeScript types
│   │   ├── api.types.ts
│   │   ├── auth.types.ts
│   │   ├── entities.types.ts
│   │   ├── permissions.types.ts
│   │   └── ...
│   │
│   ├── constants/           # Application constants
│   │   ├── permissions.ts
│   │   ├── roles.ts
│   │   ├── routes.ts
│   │   ├── api-endpoints.ts
│   │   └── ...
│   │
│   ├── config/              # Configuration files
│   │   ├── app.config.ts
│   │   ├── i18n.config.ts
│   │   └── query-client.config.ts
│   │
│   ├── main.tsx             # Application entry
│   ├── index.css            # Global styles
│   └── vite-env.d.ts
│
├── planning/                # Planning documents (this folder)
├── components.json          # shadcn/ui config
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## 4. User Roles & Permissions Matrix

### 4.1 Role Definitions

```typescript
enum UserRole {
  SYSTEM_ADMIN = 'SYSTEM_ADMIN',
  INDUSTRY_OWNER = 'INDUSTRY_OWNER',
  ADMINISTRATOR = 'ADMINISTRATOR',
  SUPERVISOR = 'SUPERVISOR',
  WORKER = 'WORKER',
}
```

### 4.2 Permission Structure

```typescript
type Permission = {
  resource: string;
  actions: ('view' | 'create' | 'update' | 'delete')[];
  roles: UserRole[];
};
```

### 4.3 Permissions Map (Detailed in separate file)

## 5. Routing Strategy

### 5.1 Route Structure

```typescript
// Public routes (no authentication)
/login
/signup
/forgot-password
/reset-password

// Protected routes (authentication required)
/                           → Dashboard (role-based content)
/dashboard                  → Same as /

// System Admin only
/system/industries          → Industry management
/system/subscriptions       → Subscription management
/system/analytics           → Platform analytics
/system/support             → Support tickets

// Industry-specific routes
/machines                   → Machine management
/components                 → Component management
/raw-materials              → Raw materials management
/orders                     → Order management
/schedule                   → Scheduling dashboard
/maintenance                → Maintenance management
/users                      → User management (Owner/Admin only)
/reports                    → Reports & analytics
/settings                   → Industry settings

// User profile
/profile                    → User profile & settings
```

### 5.2 Route Protection Pattern

```typescript
// Every route wrapped with permission check
<ProtectedRoute permissions={['MACHINES.VIEW']}>
  <MachinePage />
</ProtectedRoute>

// Same route, different content based on role
<Route path="/dashboard" element={
  <ProtectedRoute>
    <DashboardRouter />  // Renders different dashboard based on role
  </ProtectedRoute>
} />
```

## 6. Component Reusability Patterns

### 6.1 Generic CRUD Pattern

```typescript
// Generic CRUD hook
useCRUD<T>(
  resource: string,
  queryKey: string,
  apiService: CRUDService<T>
)

// Generic CRUD page
<CRUDPage
  resource="machines"
  columns={machineColumns}
  form={MachineForm}
  permissions={machinePermissions}
/>
```

### 6.2 Form Builder Pattern

```typescript
<FormBuilder
  schema={machineSchema}
  fields={machineFields}
  onSubmit={handleSubmit}
  defaultValues={defaultValues}
/>
```

### 6.3 Data Table Pattern

```typescript
<DataTable
  data={machines}
  columns={columns}
  actions={actions}
  filters={filters}
  searchable
  sortable
  pagination
/>
```

## 7. State Management Strategy

### 7.1 Zustand Stores

**Auth Store**
- Current user
- Tokens (access, refresh)
- Login/logout/refresh methods
- Permission checking utilities

**Tenant Store**
- Current industry/tenant
- Tenant switching
- Tenant-specific settings

**UI Store**
- Sidebar collapsed/expanded
- Theme preferences
- Language selection
- Notification state

### 7.2 TanStack Query

- All server data fetching
- Automatic caching & revalidation
- Optimistic updates
- Query keys organized by resource

### 7.3 React Hook Form + Zod

- All form state management
- Validation schemas
- Type-safe forms

## 8. API Integration

### 8.1 Axios Configuration

```typescript
// Base configuration
- Base URL from environment
- Request/response interceptors
- Automatic token attachment
- Tenant ID header injection
- Error handling

// Interceptors
- Request: Add auth token, tenant ID
- Response: Handle 401 (refresh token), 403 (redirect)
```

### 8.2 Service Layer Pattern

```typescript
// Each resource has a service
class MachineService {
  getAll(params?)
  getById(id)
  create(data)
  update(id, data)
  delete(id)
  // Resource-specific methods
  toggleMaintenance(id)
}
```

## 9. Performance Optimization

### 9.1 Code Splitting

- Route-based code splitting
- Lazy loading for feature modules
- Dynamic imports for heavy components

### 9.2 React Compiler

- Already enabled via babel-plugin-react-compiler
- Automatic memoization (no manual useMemo/useCallback needed)

### 9.3 Query Optimization

- Proper stale times
- Background refetching
- Prefetching for predictable navigation

### 9.4 Asset Optimization

- Image lazy loading
- SVG optimization
- Font optimization

## 10. Testing Strategy

### 10.1 Unit Tests (Vitest)

- Utility functions
- Custom hooks
- Store logic
- Validators

### 10.2 Component Tests (React Testing Library)

- UI components
- Form validation
- Permission gates
- User interactions

### 10.3 Integration Tests

- Feature workflows
- CRUD operations
- Authentication flows

## 11. Accessibility

- ARIA labels
- Keyboard navigation
- Screen reader support
- Color contrast compliance
- Focus management

## 12. Internationalization (i18n)

### 12.1 Setup

- react-i18next
- Language detection
- Translation files structure
- Namespace organization

### 12.2 RTL Support

- Tailwind RTL plugin
- Direction switching
- Layout adjustments

### 12.3 Date/Time Localization

- dayjs with locale support
- Timezone handling

## 13. Error Handling

### 13.1 Error Boundary

- Global error boundary
- Feature-level error boundaries
- Error logging service integration

### 13.2 API Error Handling

- Centralized error handling in axios interceptor
- User-friendly error messages
- Toast notifications for errors

### 13.3 Form Validation Errors

- Field-level errors
- Server-side validation errors
- Inline error display

## 14. Security Considerations

### 14.1 XSS Prevention

- Sanitize user inputs
- Use dangerouslySetInnerHTML carefully
- CSP headers

### 14.2 Authentication

- JWT token storage (httpOnly cookies preferred, or secure storage)
- Token refresh mechanism
- Auto logout on token expiry

### 14.3 RBAC Enforcement

- Client-side: UI/UX only
- Server-side: Actual security enforcement
- Never trust client-side permission checks

## 15. Development Workflow

### 15.1 Component Development

1. Design component API
2. Create TypeScript types
3. Implement component
4. Add Zod validation if needed
5. Write tests
6. Document usage

### 15.2 Feature Development

1. Create feature folder
2. Define types
3. Create service layer
4. Build UI components
5. Add routes
6. Implement permission checks
7. Test feature
8. Update documentation

## 16. Environment Configuration

```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_WS_URL=ws://localhost:3001
VITE_APP_NAME=Smart Factory Scheduler
VITE_ENABLE_MOCK_API=false
```

## 17. Build & Deployment

### 17.1 Build Process

```bash
npm run build
# - TypeScript compilation
# - Vite build
# - Asset optimization
# - Code splitting
```

### 17.2 Environment-Specific Builds

- Development
- Staging
- Production

## 18. Next Steps

Refer to the following planning documents for detailed implementation:
1. `02-RBAC-IMPLEMENTATION.md` - Detailed RBAC implementation
2. `03-COMPONENT-LIBRARY.md` - Reusable component specifications
3. `04-FEATURE-MODULES.md` - Feature-by-feature breakdown
4. `05-IMPLEMENTATION-PHASES.md` - Development phases and timeline
