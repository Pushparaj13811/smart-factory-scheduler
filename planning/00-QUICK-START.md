# Quick Start Guide - Smart Factory Scheduler Frontend

## 🎯 Goal

Build a production-ready, multi-tenant SaaS frontend with:
- **Zero code duplication**
- **Strict RBAC** (Role-Based Access Control)
- **Full reusability**
- **Type-safe** TypeScript
- **18-week timeline**

---

## 📋 Planning Documents (Read in Order)

### For First-Time Readers: Start Here! 👇

```
1. READ THIS → 00-QUICK-START.md (you are here)
2. Then → README.md (overview of all docs)
3. Then → 01-ARCHITECTURE-PLAN.md (understand the foundation)
4. Then → 02-RBAC-IMPLEMENTATION.md (understand permissions)
5. Keep handy → 06-CODE-TEMPLATES.md (copy-paste templates)
6. Reference as needed → 03-COMPONENT-LIBRARY.md, 04-FEATURE-MODULES.md
7. Follow timeline → 05-IMPLEMENTATION-PHASES.md
```

---

## ⚡ 5-Minute Understanding

### The Big Picture

```
┌─────────────────────────────────────────────────────────────┐
│                   Smart Factory Scheduler                    │
│            Multi-Tenant Manufacturing SaaS Platform          │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
    ┌───▼────┐          ┌────▼─────┐         ┌────▼─────┐
    │Industry│          │Industry  │         │Industry  │
    │   A    │          │    B     │         │    C     │
    └───┬────┘          └────┬─────┘         └────┬─────┘
        │                    │                     │
   ┌────┴─────┐         ┌───┴────┐           ┌────┴────┐
   │ 5 User   │         │ 5 User │           │ 5 User  │
   │  Roles   │         │  Roles │           │  Roles  │
   └──────────┘         └────────┘           └─────────┘
```

### 5 User Roles (Hierarchical)

```
Level 5 → 👑 System Admin      → Manages entire platform
Level 4 → 🏭 Industry Owner    → Owns their industry
Level 3 → 🔧 Administrator     → Manages operations
Level 2 → 👨‍💼 Supervisor         → Manages teams
Level 1 → 👷 Worker            → Does tasks
```

### Key Principle: Same Route, Different Content

```typescript
// Example: /dashboard route
User Role            What They See
─────────────────────────────────────────────────────
System Admin    →    Platform analytics, all industries
Industry Owner  →    Industry performance, subscriptions
Administrator   →    Active orders, machines, schedules
Supervisor      →    Team tasks, approvals
Worker          →    Personal schedule, assigned tasks
```

---

## 🏗️ Architecture in 60 Seconds

### Technology Stack

```
┌──────────────────────────────────────────────────┐
│ UI Framework      │ React 19 + TypeScript 5.9   │
│ Routing           │ React Router v6             │
│ Styling           │ Tailwind CSS v4 + shadcn/ui │
│ State (Client)    │ Zustand                     │
│ State (Server)    │ TanStack Query              │
│ Forms             │ React Hook Form + Zod       │
│ i18n              │ react-i18next               │
│ Build Tool        │ Vite 7                      │
└──────────────────────────────────────────────────┘
```

### Folder Structure (Simplified)

```
frontend/
├── src/
│   ├── features/              ← Feature modules (auth, machines, etc.)
│   │   └── <feature>/
│   │       ├── components/    ← Feature-specific components
│   │       ├── hooks/         ← Feature-specific hooks
│   │       ├── services/      ← API calls
│   │       ├── pages/         ← Page components
│   │       └── types/         ← TypeScript types
│   │
│   ├── components/            ← Reusable components
│   │   ├── ui/               ← shadcn/ui (don't modify)
│   │   ├── common/           ← DataTable, EmptyState, etc.
│   │   ├── forms/            ← SearchableSelect, MultiSelect, etc.
│   │   ├── layouts/          ← AppLayout, Sidebar, Header
│   │   └── guards/           ← ProtectedRoute, PermissionGate
│   │
│   ├── hooks/                 ← Global hooks (useAuth, usePermission)
│   ├── stores/                ← Zustand stores (auth, tenant, ui)
│   ├── services/              ← API client, WebSocket
│   ├── constants/             ← Roles, permissions, routes
│   └── types/                 ← Global types
│
└── planning/                  ← This folder (documentation)
```

---

## 🔐 RBAC in 60 Seconds

### Permission Pattern

```typescript
// 1. Define permissions
const PERMISSIONS = {
  'MACHINES.view'   → [INDUSTRY_OWNER, ADMINISTRATOR, SUPERVISOR]
  'MACHINES.create' → [INDUSTRY_OWNER, ADMINISTRATOR]
  'MACHINES.delete' → [INDUSTRY_OWNER, ADMINISTRATOR]
}

// 2. Protect routes
<ProtectedRoute permissions={['MACHINES.view']}>
  <MachinesPage />
</ProtectedRoute>

// 3. Hide/show UI elements
<PermissionGate permissions={['MACHINES.create']}>
  <Button>Create Machine</Button>
</PermissionGate>

// 4. Use in code
const { canCreate, canDelete } = usePermission('MACHINES');
if (canCreate) {
  // Show create button
}
```

---

## 📦 12 Feature Modules

```
┌────────────────────────────────────────────────────────────┐
│ 1. Auth          → Login, Signup, Password Reset          │
│ 2. Dashboard     → 5 role-based dashboards                │
│ 3. Machines      → CRUD + maintenance toggle              │
│ 4. Components    → Complex CRUD with operation steps      │
│ 5. Raw Materials → CRUD + inventory tracking              │
│ 6. Orders        → CRUD + priority management             │
│ 7. Scheduling    → Gantt chart + real-time updates        │
│ 8. Maintenance   → Calendar + impact analysis             │
│ 9. Users         → CRUD + role management                 │
│ 10. Reports      → Generate + export (PDF/Excel/CSV)      │
│ 11. System Admin → Industries + subscriptions (Admin only)│
│ 12. Settings     → Industry settings + preferences        │
└────────────────────────────────────────────────────────────┘
```

---

## 🎯 Development Phases (18 Weeks)

```
Week 1-2   │ Phase 0-1 │ Setup + Infrastructure
Week 2-3   │ Phase 2   │ Authentication
Week 3-4   │ Phase 3   │ Reusable Components Library
Week 4-5   │ Phase 4   │ Dashboard (all 5 variants)
Week 5-8   │ Phase 5   │ CRUD Modules (Machines, Components, etc.)
Week 9-10  │ Phase 6   │ Orders + Scheduling
Week 11-12 │ Phase 7   │ Maintenance + Reports + Settings
Week 13    │ Phase 8   │ System Admin Module
Week 14-15 │ Phase 9   │ Polish + Optimization
Week 16    │ Phase 10  │ Internationalization (i18n)
Week 17-18 │ Phase 11  │ Final Testing + Documentation
```

---

## 🚀 Get Started in 10 Minutes

### Step 1: Install Dependencies (2 min)

```bash
# Routing
npm install react-router-dom

# i18n
npm install react-i18next i18next i18next-browser-languagedetector

# Utilities
npm install dayjs

# shadcn components
npx shadcn@latest add select dropdown-menu popover calendar
npx shadcn@latest add form tabs toast textarea scroll-area pagination
```

### Step 2: Create Folder Structure (1 min)

```bash
mkdir -p src/app
mkdir -p src/features/{auth,dashboard,machines,components,raw-materials,orders,scheduling,maintenance,users,reports,system-admin,settings}
mkdir -p src/components/{common,forms,layouts,guards}
mkdir -p src/hooks src/services/{api,websocket} src/stores src/types src/constants src/config
mkdir -p public/locales/{en,gu,hi}
```

### Step 3: Create Constants (3 min)

Copy from `06-CODE-TEMPLATES.md`:
- `src/constants/roles.ts`
- `src/constants/permissions.ts`
- `src/constants/routes.ts`

### Step 4: Setup Environment (1 min)

Create `.env.development`:
```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_WS_URL=ws://localhost:3001
VITE_APP_NAME=Smart Factory Scheduler
```

### Step 5: Create Base Files (3 min)

From `06-CODE-TEMPLATES.md`, create:
- `src/lib/api-client.ts`
- `src/stores/auth.store.ts`
- `src/hooks/useAuth.ts`
- `src/hooks/usePermission.ts`

**Done! Ready to build features.** 🎉

---

## 💡 Key Patterns to Remember

### 1. Every Feature Module Has:

```
features/<feature>/
├── components/     ← UI components
├── hooks/         ← useFoobar, useCreateFoo, useUpdateFoo, useDeleteFoo
├── services/      ← API calls
├── types/         ← TypeScript interfaces
└── pages/         ← Page components
```

### 2. Every CRUD Feature Needs:

```typescript
✅ Service (API calls)
✅ Hooks (React Query)
✅ Form Component (React Hook Form + Zod)
✅ List Page (with DataTable)
✅ Detail Page (optional)
✅ Types (TypeScript interfaces)
✅ Routes (with permission guards)
```

### 3. Permission Check Pattern:

```typescript
// At route level
<ProtectedRoute permissions={['RESOURCE.view']}>

// In component
const { canCreate, canUpdate, canDelete } = usePermission('RESOURCE');

// In JSX
<PermissionGate permissions={['RESOURCE.create']}>
  <CreateButton />
</PermissionGate>
```

### 4. State Management Strategy:

```typescript
// Auth, tenant, UI preferences → Zustand
const user = useAuthStore(state => state.user);

// API data → TanStack Query
const { data, isLoading } = useMachines();

// Form state → React Hook Form
const form = useForm({ resolver: zodResolver(schema) });
```

---

## 📚 Documentation Map

```
planning/
├── 00-QUICK-START.md          ← YOU ARE HERE (quick overview)
├── README.md                  ← Index of all documents
├── 01-ARCHITECTURE-PLAN.md    ← Core architecture & principles
├── 02-RBAC-IMPLEMENTATION.md  ← Complete RBAC system
├── 03-COMPONENT-LIBRARY.md    ← All reusable components
├── 04-FEATURE-MODULES.md      ← Feature-by-feature breakdown
├── 05-IMPLEMENTATION-PHASES.md← 18-week development timeline
└── 06-CODE-TEMPLATES.md       ← Copy-paste code templates
```

### When to Read What:

| Task | Read This |
|------|-----------|
| Understanding overall architecture | `01-ARCHITECTURE-PLAN.md` |
| Implementing permissions | `02-RBAC-IMPLEMENTATION.md` |
| Creating a component | `03-COMPONENT-LIBRARY.md` |
| Building a feature | `04-FEATURE-MODULES.md` |
| Planning sprint | `05-IMPLEMENTATION-PHASES.md` |
| Writing code | `06-CODE-TEMPLATES.md` |

---

## ✅ Pre-Development Checklist

Before you start coding:

- [ ] Read this quick start
- [ ] Read `README.md` for overview
- [ ] Understand architecture from `01-ARCHITECTURE-PLAN.md`
- [ ] Understand RBAC from `02-RBAC-IMPLEMENTATION.md`
- [ ] Install all dependencies
- [ ] Create folder structure
- [ ] Setup environment variables
- [ ] Bookmark `06-CODE-TEMPLATES.md`

---

## 🎓 Mental Model

Think of this project as:

```
┌─────────────────────────────────────────────────┐
│         Building Blocks (Atoms)                 │
│  Button, Input, Label, Select, etc.            │
│         ↓ shadcn/ui (already done)             │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│      Reusable Components (Molecules)            │
│  FormField, SearchableSelect, DataTable, etc.  │
│         ↓ Build these first (Phase 3)          │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│        Feature Modules (Organisms)              │
│  Machines, Orders, Scheduling, etc.            │
│         ↓ Build using reusable components      │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│             Pages (Templates)                   │
│  Dashboard, MachinesPage, OrdersPage, etc.     │
│         ↓ Compose from feature modules         │
└─────────────────────────────────────────────────┘
```

**Key Insight**: Build bottom-up (atoms → molecules → organisms → pages) to maximize reusability.

---

## 🔥 Pro Tips

### Tip 1: Don't Reinvent the Wheel
Before creating anything, check:
1. Does shadcn/ui have it? → Use it
2. Is it in `03-COMPONENT-LIBRARY.md`? → Use it
3. Does another feature have similar logic? → Extract and reuse

### Tip 2: Template Everything
For any new feature:
1. Copy template from `06-CODE-TEMPLATES.md`
2. Find/replace `<Feature>` with your feature name
3. Customize as needed
4. ✅ Consistent code across features

### Tip 3: Permission First
Before building a feature:
1. Check `02-RBAC-IMPLEMENTATION.md` for permissions
2. Add to permission matrix if needed
3. Protect route with `ProtectedRoute`
4. Add `PermissionGate` for UI elements

### Tip 4: Types First
Before writing logic:
1. Define TypeScript interfaces
2. Create Zod schemas
3. Type your API responses
4. → Type safety throughout

### Tip 5: Test as You Go
Don't leave testing for the end:
- Write unit tests for utilities
- Test critical components
- Test permission logic
- Test forms

---

## 🎬 Next Steps

### Immediate (Today):
1. ✅ Read this quick start
2. ✅ Read `README.md`
3. ✅ Skim `01-ARCHITECTURE-PLAN.md`

### This Week:
1. Complete Phase 0 (setup)
2. Start Phase 1 (infrastructure)
3. Read `02-RBAC-IMPLEMENTATION.md` thoroughly

### This Month:
1. Complete Phases 1-4
2. Have working auth + dashboard + reusable components

### This Quarter (18 weeks):
1. Complete all phases
2. Production-ready application
3. Comprehensive documentation

---

## 🆘 Help & Resources

### Questions About:
- **Architecture** → `01-ARCHITECTURE-PLAN.md`
- **Permissions** → `02-RBAC-IMPLEMENTATION.md`
- **Components** → `03-COMPONENT-LIBRARY.md`
- **Features** → `04-FEATURE-MODULES.md`
- **Timeline** → `05-IMPLEMENTATION-PHASES.md`
- **Code** → `06-CODE-TEMPLATES.md`

### External Resources:
- [React 19 Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TanStack Query](https://tanstack.com/query/latest)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 🎉 You're Ready!

You now have:
- ✅ Clear understanding of the project
- ✅ Complete architecture plan
- ✅ Detailed RBAC implementation
- ✅ Reusable component library
- ✅ Feature-by-feature breakdown
- ✅ 18-week development roadmap
- ✅ Ready-to-use code templates

**Time to build something amazing!** 🚀

---

**Remember**:
- **DRY**: Don't Repeat Yourself
- **KISS**: Keep It Simple, Stupid
- **YAGNI**: You Aren't Gonna Need It (yet)
- **Type Safe**: Always use TypeScript
- **Permission First**: RBAC everywhere

**Happy Coding!** 💻✨
