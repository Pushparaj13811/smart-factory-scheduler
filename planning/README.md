# Smart Factory Scheduler - Frontend Planning Documentation

## Overview

This planning folder contains comprehensive documentation for building the **Smart Factory Scheduler** frontend application. The documentation is designed to ensure zero code duplication, maximum reusability, and strict RBAC implementation.

---

## 📚 Documentation Structure

### 1. [Architecture Plan](./01-ARCHITECTURE-PLAN.md)
**Core architecture and design principles**

- Component reusability patterns (Atomic Design)
- RBAC implementation strategy
- Multi-tenant architecture
- Technology stack details
- Folder structure
- State management strategy
- API integration approach
- Performance optimization
- Testing strategy

**When to read**: Start here to understand the overall architecture and design philosophy.

---

### 2. [RBAC Implementation](./02-RBAC-IMPLEMENTATION.md)
**Complete role-based access control system**

- 5 user roles definition (System Admin, Industry Owner, Administrator, Supervisor, Worker)
- Comprehensive permission matrix
- RBAC hooks (`useAuth`, `usePermission`)
- Route protection components
- Component-level permission guards
- Role-based routing
- Permission testing

**When to read**: Before implementing any feature that requires permission checks.

---

### 3. [Component Library](./03-COMPONENT-LIBRARY.md)
**Reusable component specifications**

- Atomic design methodology
- UI components (shadcn/ui)
- Form components (SearchableSelect, MultiSelect, DateTimePicker, etc.)
- Data display components (DataTable, StatusBadge, etc.)
- Layout components (AppLayout, Sidebar, Header)
- Business components (EmptyState, LoadingState, ConfirmDialog)
- Specialized components (GanttChart, MachineStatusIndicator)
- FormBuilder for dynamic forms

**When to read**: Before creating any UI component - check if it already exists or can be reused.

---

### 4. [Feature Modules](./04-FEATURE-MODULES.md)
**Detailed breakdown of all features**

Modules covered:
1. Authentication (login, signup, password reset)
2. Dashboard (5 role-based dashboards)
3. Machines (CRUD + maintenance)
4. Components (complex CRUD with operation steps)
5. Raw Materials (CRUD + inventory tracking)
6. Orders (CRUD + priority management)
7. Scheduling (Gantt chart + real-time updates)
8. Maintenance (calendar + impact analysis)
9. Users (CRUD + role management)
10. Reports (generation + export)
11. System Admin (industries, subscriptions)
12. Settings (industry settings)

**When to read**: When implementing a specific feature module.

---

### 5. [Implementation Phases](./05-IMPLEMENTATION-PHASES.md)
**Step-by-step development roadmap**

- **18-week timeline** broken into 11 phases
- Phase 0: Project setup (Week 1)
- Phase 1: Core infrastructure (Week 1-2)
- Phase 2: Authentication (Week 2-3)
- Phase 3: Reusable components (Week 3-4)
- Phase 4: Dashboard (Week 4-5)
- Phase 5: CRUD modules (Week 5-8)
- Phase 6: Orders & Scheduling (Week 9-10)
- Phase 7: Supporting modules (Week 11-12)
- Phase 8: System admin (Week 13)
- Phase 9: Polish & optimization (Week 14-15)
- Phase 10: Internationalization (Week 16)
- Phase 11: Final testing (Week 17-18)

**When to read**: To understand the development timeline and current phase.

---

### 6. [Code Templates](./06-CODE-TEMPLATES.md)
**Ready-to-use code templates**

- Feature module structure
- Service layer template
- React Query hooks templates
- CRUD page template
- Form component template
- Table columns template
- Types template
- Protected route usage
- Permission gate usage
- Common patterns (toast, dialogs, i18n, etc.)

**When to read**: When starting development of a new feature or component.

---

## 🚀 Quick Start Guide

### Step 1: Read Architecture
Start with `01-ARCHITECTURE-PLAN.md` to understand the big picture.

### Step 2: Setup Environment
Follow Phase 0 in `05-IMPLEMENTATION-PHASES.md`:
```bash
# Install dependencies
npm install react-router-dom @types/react-router-dom
npm install react-i18next i18next i18next-browser-languagedetector
npm install dayjs

# Add shadcn components
npx shadcn@latest add select dropdown-menu popover calendar form tabs toast textarea scroll-area pagination

# Create folder structure
mkdir -p src/app src/features src/components/{common,forms,layouts,guards}
mkdir -p src/hooks src/services/{api,websocket} src/stores src/types src/constants src/config
```

### Step 3: Understand RBAC
Read `02-RBAC-IMPLEMENTATION.md` to understand permission system.

### Step 4: Review Component Library
Check `03-COMPONENT-LIBRARY.md` before creating components.

### Step 5: Start Building
Follow the implementation phases in `05-IMPLEMENTATION-PHASES.md`.

Use templates from `06-CODE-TEMPLATES.md` for consistency.

---

## 🎯 Key Principles

### 1. **No Code Duplication**
- Always check if a component/hook/utility already exists
- Extract common logic into hooks
- Use composition over duplication
- Generic components over specific ones

### 2. **RBAC Everywhere**
- Every route must be protected
- Every action must check permissions
- Use `usePermission` hook consistently
- Client-side checks are for UX only (server validates)

### 3. **Type Safety**
- All props must be typed
- No `any` types (use `unknown` if needed)
- Zod schemas for all forms
- API response types defined

### 4. **Consistent Patterns**
- Follow the templates in `06-CODE-TEMPLATES.md`
- Same folder structure for all features
- Same naming conventions
- Same error handling approach

### 5. **User Experience**
- Loading states for all async operations
- Error states with retry options
- Empty states with call-to-action
- Toast notifications for feedback
- Confirmation dialogs for destructive actions

---

## 📊 User Roles Summary

| Role | Level | Access Scope | Key Permissions |
|------|-------|--------------|----------------|
| **System Admin** | 5 | Platform-wide | Manage industries, subscriptions, platform |
| **Industry Owner** | 4 | Industry-wide | Full industry access, subscription management |
| **Administrator** | 3 | Industry-wide | CRUD on machines, components, orders, users |
| **Supervisor** | 2 | Team-level | View/monitor schedules, approve tasks |
| **Worker** | 1 | Personal | View personal schedule, update task status |

---

## 🗂️ Folder Structure Overview

```
frontend/
├── public/
│   └── locales/              # i18n translations
├── src/
│   ├── app/                  # App initialization
│   ├── features/             # Feature modules (auth, machines, etc.)
│   ├── components/           # Reusable components
│   │   ├── ui/              # shadcn/ui
│   │   ├── common/          # Business components
│   │   ├── forms/           # Form components
│   │   ├── layouts/         # Layouts
│   │   └── guards/          # Permission guards
│   ├── hooks/               # Global hooks
│   ├── services/            # API services
│   ├── stores/              # Zustand stores
│   ├── types/               # TypeScript types
│   ├── constants/           # Constants (roles, permissions, routes)
│   ├── config/              # Configuration
│   └── lib/                 # Utilities
└── planning/                # This folder
```

---

## 🔑 Key Technologies

- **React 19.1.1**: UI library with React Compiler
- **TypeScript 5.9**: Type safety
- **Vite 7**: Build tool
- **Tailwind CSS v4**: Styling
- **shadcn/ui**: Component library
- **React Router v6**: Routing
- **Zustand**: Client state
- **TanStack Query**: Server state
- **React Hook Form + Zod**: Forms
- **react-i18next**: Internationalization
- **Axios**: HTTP client
- **Recharts**: Charts

---

## ⚡ Development Workflow

1. **Pick a feature** from `04-FEATURE-MODULES.md`
2. **Check implementation phase** in `05-IMPLEMENTATION-PHASES.md`
3. **Review relevant components** in `03-COMPONENT-LIBRARY.md`
4. **Use code templates** from `06-CODE-TEMPLATES.md`
5. **Apply RBAC** using `02-RBAC-IMPLEMENTATION.md`
6. **Follow architecture** from `01-ARCHITECTURE-PLAN.md`
7. **Test** thoroughly
8. **Document** any new patterns

---

## 📝 Naming Conventions

### Files
- Components: `PascalCase.tsx` (e.g., `MachineForm.tsx`)
- Hooks: `camelCase.ts` (e.g., `useMachines.ts`)
- Types: `camelCase.types.ts` (e.g., `machine.types.ts`)
- Services: `camelCase.service.ts` (e.g., `machine.service.ts`)
- Stores: `camelCase.store.ts` (e.g., `auth.store.ts`)

### Variables
- Components: `PascalCase` (e.g., `MachineForm`)
- Hooks: `camelCase` (e.g., `useMachines`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `USER_ROLES`)
- Functions: `camelCase` (e.g., `handleSubmit`)

### Git Commits
```
feat: add machine CRUD functionality
fix: resolve form validation issue
refactor: extract table component
docs: update RBAC documentation
test: add tests for auth hooks
style: format code with prettier
```

---

## ✅ Before Starting Development

- [ ] Read `01-ARCHITECTURE-PLAN.md`
- [ ] Understand RBAC from `02-RBAC-IMPLEMENTATION.md`
- [ ] Review component library in `03-COMPONENT-LIBRARY.md`
- [ ] Know your current phase from `05-IMPLEMENTATION-PHASES.md`
- [ ] Bookmark `06-CODE-TEMPLATES.md` for reference
- [ ] Setup development environment (Phase 0)
- [ ] Install all dependencies
- [ ] Configure ESLint and Prettier
- [ ] Setup environment variables
- [ ] Create base folder structure

---

## 🎓 Learning Resources

### React 19 & React Compiler
- [React 19 Documentation](https://react.dev/)
- [React Compiler](https://react.dev/learn/react-compiler)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### TanStack Query
- [TanStack Query Docs](https://tanstack.com/query/latest)

### shadcn/ui
- [shadcn/ui Documentation](https://ui.shadcn.com/)

### React Hook Form + Zod
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)

### Tailwind CSS
- [Tailwind CSS v4](https://tailwindcss.com/)

---

## 🐛 Troubleshooting

### Common Issues

**Issue**: Component not found
- **Solution**: Check if it's in `src/components/ui/` (shadcn) or needs to be created

**Issue**: Permission denied in UI
- **Solution**: Check permission matrix in `02-RBAC-IMPLEMENTATION.md`

**Issue**: API call failing
- **Solution**: Check API client configuration and token in auth store

**Issue**: Form validation not working
- **Solution**: Verify Zod schema and React Hook Form setup

**Issue**: Build errors
- **Solution**: Run `npm run type-check` to find TypeScript errors

---

## 📧 Questions?

If you have questions about:
- **Architecture**: Refer to `01-ARCHITECTURE-PLAN.md`
- **Permissions**: Refer to `02-RBAC-IMPLEMENTATION.md`
- **Components**: Refer to `03-COMPONENT-LIBRARY.md`
- **Features**: Refer to `04-FEATURE-MODULES.md`
- **Timeline**: Refer to `05-IMPLEMENTATION-PHASES.md`
- **Code Examples**: Refer to `06-CODE-TEMPLATES.md`

---

## 🎉 Ready to Build!

You now have a complete, detailed plan for building a production-ready, enterprise-grade frontend application with:

✅ **Zero code duplication** through reusable components
✅ **Strict RBAC** implementation
✅ **Type-safe** codebase
✅ **Scalable** architecture
✅ **Maintainable** code structure
✅ **Comprehensive** documentation
✅ **Clear** development path

**Start with Phase 0 in `05-IMPLEMENTATION-PHASES.md` and happy coding!** 🚀

---

## 📅 Version History

- **v1.0** (2025-10-21): Initial planning documentation created
  - Architecture plan
  - RBAC implementation
  - Component library
  - Feature modules
  - Implementation phases
  - Code templates

---

**Project**: Smart Factory Scheduler Frontend
**Planning Date**: October 21, 2025
**Estimated Timeline**: 18 weeks (~4.5 months)
**Target**: Production-ready multi-tenant SaaS frontend with RBAC
