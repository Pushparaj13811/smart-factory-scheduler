# Reusable Component Library Plan

## 1. Component Architecture Principles

### 1.1 Atomic Design Methodology

```
Atoms        → Basic UI elements (Button, Input, Label)
Molecules    → Simple combinations (FormField, SearchInput)
Organisms    → Complex components (DataTable, FormBuilder, Header)
Templates    → Page layouts (AppLayout, AuthLayout)
Pages        → Actual pages (MachinesPage, DashboardPage)
```

### 1.2 Component Design Rules

- **Single Responsibility**: Each component does one thing well
- **Composition**: Build complex components from simple ones
- **Props over State**: Prefer controlled components
- **Type Safety**: Full TypeScript types for all props
- **Accessibility**: ARIA labels, keyboard navigation
- **Documentation**: JSDoc comments for complex props

## 2. UI Components (shadcn/ui - Already Available)

### 2.1 Existing shadcn/ui Components

These are already in the project and don't need to be recreated:

```typescript
// Form Components
- Button
- Input
- Label
- Checkbox
- Radio Group
- Switch

// Layout Components
- Card
- Separator
- Sheet
- Sidebar

// Feedback Components
- Alert
- Alert Dialog
- Dialog
- Tooltip
- Skeleton
- Spinner

// Data Display
- Table
- Avatar
- Badge
- Empty

// Navigation
- Breadcrumb
- Command

// Advanced
- Chart (Recharts integration)
```

### 2.2 Components to Add from shadcn/ui

```bash
# Install these shadcn components as needed
npx shadcn@latest add select
npx shadcn@latest add dropdown-menu
npx shadcn@latest add popover
npx shadcn@latest add calendar
npx shadcn@latest add form
npx shadcn@latest add tabs
npx shadcn@latest add toast
npx shadcn@latest add progress
npx shadcn@latest add accordion
npx shadcn@latest add textarea
npx shadcn@latest add scroll-area
npx shadcn@latest add context-menu
npx shadcn@latest add hover-card
npx shadcn@latest add navigation-menu
npx shadcn@latest add pagination
```

## 3. Form Components (Custom - Build on shadcn/ui)

### 3.1 FormField Component

```typescript
// src/components/forms/FormField/FormField.tsx

import {
  FormField as ShadcnFormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';

interface FormFieldProps {
  name: string;
  label?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

/**
 * Wrapper around shadcn FormField for consistent styling
 * Integrates with React Hook Form
 */
export function FormField({
  name,
  label,
  description,
  required,
  disabled,
  children,
}: FormFieldProps) {
  // Implementation
}
```

**Features:**
- Automatic error handling
- Required indicator
- Consistent spacing
- Label formatting
- Description support

### 3.2 SearchableSelect Component

```typescript
// src/components/forms/SearchableSelect/SearchableSelect.tsx

interface SearchableSelectProps<T> {
  options: T[];
  value?: T | T[];
  onChange: (value: T | T[]) => void;
  getLabel: (option: T) => string;
  getValue: (option: T) => string | number;
  placeholder?: string;
  searchPlaceholder?: string;
  multiple?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onCreate?: (inputValue: string) => void;
  renderOption?: (option: T) => React.ReactNode;
}

/**
 * Searchable dropdown with support for:
 * - Single/multiple selection
 * - Search/filter
 * - Create new option
 * - Custom rendering
 * - Async data loading
 */
export function SearchableSelect<T>({ ... }: SearchableSelectProps<T>) {
  // Implementation using Command + Popover
}
```

**Use Cases:**
- Machine selection
- Component selection
- User selection
- Category selection

### 3.3 MultiSelect Component

```typescript
// src/components/forms/MultiSelect/MultiSelect.tsx

interface MultiSelectProps<T> {
  options: T[];
  selected: T[];
  onChange: (selected: T[]) => void;
  getLabel: (option: T) => string;
  getValue: (option: T) => string | number;
  max?: number;
  placeholder?: string;
  disabled?: boolean;
}

/**
 * Multi-select with badges showing selected items
 * Used for selecting multiple machines, materials, etc.
 */
export function MultiSelect<T>({ ... }: MultiSelectProps<T>) {
  // Implementation
}
```

### 3.4 DateTimePicker Component

```typescript
// src/components/forms/DateTimePicker/DateTimePicker.tsx

interface DateTimePickerProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  mode?: 'date' | 'datetime' | 'time' | 'range';
  placeholder?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  locale?: string;
}

/**
 * Date/time picker supporting:
 * - Date only
 * - Date + time
 * - Time only
 * - Date range
 * - Localization
 */
export function DateTimePicker({ ... }: DateTimePickerProps) {
  // Implementation using Calendar + Popover
}
```

### 3.5 QuantityInput Component

```typescript
// src/components/forms/QuantityInput/QuantityInput.tsx

interface QuantityInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  disabled?: boolean;
}

/**
 * Number input with increment/decrement buttons
 * For quantities, durations, etc.
 */
export function QuantityInput({ ... }: QuantityInputProps) {
  // Implementation
}
```

### 3.6 DynamicFieldArray Component

```typescript
// src/components/forms/DynamicFieldArray/DynamicFieldArray.tsx

interface DynamicFieldArrayProps<T> {
  fields: T[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, value: T) => void;
  renderField: (field: T, index: number) => React.ReactNode;
  addButtonText?: string;
  min?: number;
  max?: number;
  disabled?: boolean;
}

/**
 * Dynamic array of fields with add/remove functionality
 * Used for:
 * - Operation steps in components
 * - Raw material assignments
 * - Time configurations
 */
export function DynamicFieldArray<T>({ ... }: DynamicFieldArrayProps<T>) {
  // Implementation
}
```

### 3.7 TimeConfigInput Component

```typescript
// src/components/forms/TimeConfigInput/TimeConfigInput.tsx

type TimeUnit = 'seconds' | 'minutes' | 'hours';

interface TimeConfigInputProps {
  value: number; // in minutes
  onChange: (value: number) => void;
  label: string;
  applyToAll?: boolean;
  onApplyToAllChange?: (applyToAll: boolean) => void;
  showApplyToAll?: boolean;
  disabled?: boolean;
}

/**
 * Time input with unit selection and "Apply to All" toggle
 * For setup time, operation time, buffer time in components
 */
export function TimeConfigInput({ ... }: TimeConfigInputProps) {
  // Implementation
}
```

### 3.8 FileUpload Component

```typescript
// src/components/forms/FileUpload/FileUpload.tsx

interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in bytes
  maxFiles?: number;
  onUpload: (files: File[]) => void;
  disabled?: boolean;
  preview?: boolean;
}

/**
 * File upload with drag & drop
 * For images, documents, etc.
 */
export function FileUpload({ ... }: FileUploadProps) {
  // Implementation
}
```

## 4. Data Display Components

### 4.1 DataTable Component

```typescript
// src/components/common/DataTable/DataTable.tsx

import { ColumnDef } from '@tanstack/react-table';

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  loading?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchKeys?: (keyof T)[];
  sortable?: boolean;
  filterable?: boolean;
  filters?: FilterConfig[];
  pagination?: boolean;
  pageSize?: number;
  selectable?: boolean;
  onSelectionChange?: (rows: T[]) => void;
  actions?: (row: T) => ActionItem[];
  bulkActions?: BulkAction[];
  emptyMessage?: string;
  className?: string;
}

/**
 * Feature-rich data table with:
 * - Search
 * - Sort
 * - Filter
 * - Pagination
 * - Row selection
 * - Row actions
 * - Bulk actions
 * - Loading state
 * - Empty state
 */
export function DataTable<T>({ ... }: DataTableProps<T>) {
  // Implementation using @tanstack/react-table
}
```

**Usage Example:**

```typescript
const columns: ColumnDef<Machine>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
];

<DataTable
  data={machines}
  columns={columns}
  searchable
  sortable
  pagination
  actions={(row) => [
    { label: 'Edit', onClick: () => handleEdit(row) },
    { label: 'Delete', onClick: () => handleDelete(row), variant: 'destructive' },
  ]}
/>
```

### 4.2 StatusBadge Component

```typescript
// src/components/common/StatusBadge/StatusBadge.tsx

type Status = 'active' | 'inactive' | 'maintenance' | 'pending' | 'completed' | 'cancelled';

interface StatusBadgeProps {
  status: Status;
  customLabel?: string;
  showIcon?: boolean;
}

/**
 * Colored badge for status display
 * Consistent styling across the app
 */
export function StatusBadge({ ... }: StatusBadgeProps) {
  // Implementation
}
```

### 4.3 StatCard Component

```typescript
// src/components/common/StatCard/StatCard.tsx

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: {
    value: number;
    label: string;
    direction: 'up' | 'down';
  };
  description?: string;
  color?: 'primary' | 'success' | 'warning' | 'danger';
  loading?: boolean;
  onClick?: () => void;
}

/**
 * Dashboard stat card
 * Shows KPIs with trend indicators
 */
export function StatCard({ ... }: StatCardProps) {
  // Implementation
}
```

### 4.4 ProgressIndicator Component

```typescript
// src/components/common/ProgressIndicator/ProgressIndicator.tsx

interface ProgressIndicatorProps {
  value: number; // 0-100
  max?: number;
  label?: string;
  showPercentage?: boolean;
  color?: 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Progress bar/circle for order completion, task progress, etc.
 */
export function ProgressIndicator({ ... }: ProgressIndicatorProps) {
  // Implementation
}
```

### 4.5 Timeline Component

```typescript
// src/components/common/Timeline/Timeline.tsx

interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  timestamp: Date;
  status?: 'completed' | 'active' | 'pending';
  icon?: LucideIcon;
}

interface TimelineProps {
  items: TimelineItem[];
  orientation?: 'vertical' | 'horizontal';
}

/**
 * Timeline for showing operation steps, order history, etc.
 */
export function Timeline({ ... }: TimelineProps) {
  // Implementation
}
```

## 5. Layout Components

### 5.1 AppLayout Component

```typescript
// src/components/layouts/AppLayout/AppLayout.tsx

/**
 * Main application layout with:
 * - Responsive sidebar
 * - Header with user menu
 * - Breadcrumbs
 * - Main content area
 * - Footer
 */
export function AppLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <Breadcrumbs />
        <main className="flex-1 overflow-auto p-6">
          <Outlet /> {/* React Router outlet */}
        </main>
        <Footer />
      </div>
    </div>
  );
}
```

### 5.2 Sidebar Component

```typescript
// src/components/layouts/Sidebar/Sidebar.tsx

/**
 * Collapsible sidebar with:
 * - Role-based navigation menu
 * - Active route highlighting
 * - Nested menu items
 * - Industry/tenant switcher (for users with multi-tenant access)
 * - Mobile responsive
 */
export function Sidebar() {
  // Implementation
}
```

### 5.3 Header Component

```typescript
// src/components/layouts/Header/Header.tsx

/**
 * App header with:
 * - Page title
 * - Search bar (global search)
 * - Notifications dropdown
 * - Language switcher
 * - User menu
 */
export function Header() {
  // Implementation
}
```

### 5.4 PageHeader Component

```typescript
// src/components/common/PageHeader/PageHeader.tsx

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  actions?: React.ReactNode;
  tabs?: Tab[];
  backLink?: string;
}

/**
 * Consistent page header with title, description, actions
 */
export function PageHeader({ ... }: PageHeaderProps) {
  // Implementation
}
```

### 5.5 AuthLayout Component

```typescript
// src/components/layouts/AuthLayout/AuthLayout.tsx

/**
 * Layout for authentication pages (login, signup, etc.)
 * - Centered form
 * - Branding
 * - Language switcher
 */
export function AuthLayout() {
  // Implementation
}
```

## 6. Common Business Components

### 6.1 EmptyState Component

```typescript
// src/components/common/EmptyState/EmptyState.tsx

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * Empty state for tables, lists, etc.
 */
export function EmptyState({ ... }: EmptyStateProps) {
  // Implementation
}
```

### 6.2 LoadingState Component

```typescript
// src/components/common/LoadingState/LoadingState.tsx

interface LoadingStateProps {
  type?: 'spinner' | 'skeleton' | 'pulse';
  message?: string;
  fullScreen?: boolean;
}

/**
 * Loading indicator
 */
export function LoadingState({ ... }: LoadingStateProps) {
  // Implementation
}
```

### 6.3 ErrorState Component

```typescript
// src/components/common/ErrorState/ErrorState.tsx

interface ErrorStateProps {
  error: Error | string;
  onRetry?: () => void;
  showDetails?: boolean;
}

/**
 * Error display with retry option
 */
export function ErrorState({ ... }: ErrorStateProps) {
  // Implementation
}
```

### 6.4 ConfirmDialog Component

```typescript
// src/components/common/ConfirmDialog/ConfirmDialog.tsx

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void | Promise<void>;
  variant?: 'default' | 'destructive';
  loading?: boolean;
}

/**
 * Confirmation dialog for destructive actions
 */
export function ConfirmDialog({ ... }: ConfirmDialogProps) {
  // Implementation
}
```

### 6.5 NotificationBell Component

```typescript
// src/components/common/NotificationBell/NotificationBell.tsx

/**
 * Notification bell icon with:
 * - Unread count badge
 * - Dropdown with recent notifications
 * - Mark as read functionality
 * - Link to full notifications page
 */
export function NotificationBell() {
  // Implementation
}
```

### 6.6 UserMenu Component

```typescript
// src/components/common/UserMenu/UserMenu.tsx

/**
 * User dropdown menu with:
 * - User profile link
 * - Settings
 * - Logout
 * - Theme switcher
 */
export function UserMenu() {
  // Implementation
}
```

### 6.7 LanguageSwitcher Component

```typescript
// src/components/common/LanguageSwitcher/LanguageSwitcher.tsx

/**
 * Language selection dropdown
 * Supports: English, Gujarati, Hindi
 */
export function LanguageSwitcher() {
  // Implementation using react-i18next
}
```

## 7. Specialized Components

### 7.1 GanttChart Component

```typescript
// src/components/common/GanttChart/GanttChart.tsx

interface GanttTask {
  id: string;
  name: string;
  start: Date;
  end: Date;
  progress: number;
  dependencies?: string[];
  resource?: string;
  color?: string;
}

interface GanttChartProps {
  tasks: GanttTask[];
  onTaskUpdate?: (task: GanttTask) => void;
  editable?: boolean;
  viewMode?: 'day' | 'week' | 'month';
}

/**
 * Gantt chart for schedule visualization
 * May use a library like gantt-task-react or build custom
 */
export function GanttChart({ ... }: GanttChartProps) {
  // Implementation
}
```

### 7.2 MachineStatusIndicator Component

```typescript
// src/components/common/MachineStatusIndicator/MachineStatusIndicator.tsx

interface MachineStatusIndicatorProps {
  status: 'idle' | 'running' | 'maintenance' | 'error';
  showLabel?: boolean;
  animated?: boolean;
}

/**
 * Visual indicator for machine status
 * Can be used in lists, dashboards, etc.
 */
export function MachineStatusIndicator({ ... }: MachineStatusIndicatorProps) {
  // Implementation
}
```

### 7.3 OrderPriorityBadge Component

```typescript
// src/components/common/OrderPriorityBadge/OrderPriorityBadge.tsx

type Priority = 'low' | 'medium' | 'high' | 'urgent';

interface OrderPriorityBadgeProps {
  priority: Priority;
  showIcon?: boolean;
}

/**
 * Priority badge with color coding
 */
export function OrderPriorityBadge({ ... }: OrderPriorityBadgeProps) {
  // Implementation
}
```

## 8. Form Builder (Advanced)

### 8.1 FormBuilder Component

```typescript
// src/components/common/FormBuilder/FormBuilder.tsx

interface FormFieldConfig {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'multiselect' | 'date' | 'textarea' | 'checkbox' | 'radio';
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  description?: string;
  options?: { label: string; value: string | number }[];
  validation?: ZodSchema;
  defaultValue?: any;
  dependencies?: {
    field: string;
    condition: (value: any) => boolean;
  };
}

interface FormBuilderProps {
  fields: FormFieldConfig[];
  onSubmit: (data: any) => void | Promise<void>;
  defaultValues?: Record<string, any>;
  submitLabel?: string;
  cancelLabel?: string;
  onCancel?: () => void;
  loading?: boolean;
}

/**
 * Generic form builder
 * Builds forms from configuration
 * Used for CRUD operations
 */
export function FormBuilder({ ... }: FormBuilderProps) {
  // Implementation using React Hook Form + Zod
}
```

## 9. Component Usage Patterns

### 9.1 CRUD Page Pattern

```typescript
// Example: Machines page using reusable components

function MachinesPage() {
  const { canCreate, canUpdate, canDelete } = usePermission('MACHINES');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);

  const { data: machines, isLoading } = useMachines();
  const createMachine = useCreateMachine();
  const updateMachine = useUpdateMachine();
  const deleteMachine = useDeleteMachine();

  return (
    <div>
      <PageHeader
        title="Machines"
        description="Manage your manufacturing machines"
        actions={
          canCreate && (
            <Button onClick={() => setIsFormOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Machine
            </Button>
          )
        }
      />

      <DataTable
        data={machines}
        columns={machineColumns}
        loading={isLoading}
        searchable
        searchPlaceholder="Search machines..."
        sortable
        pagination
        actions={(row) => [
          canUpdate && {
            label: 'Edit',
            onClick: () => {
              setSelectedMachine(row);
              setIsFormOpen(true);
            },
          },
          canDelete && {
            label: 'Delete',
            variant: 'destructive',
            onClick: () => handleDelete(row.id),
          },
        ].filter(Boolean)}
        emptyMessage="No machines found. Create your first machine to get started."
      />

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedMachine ? 'Edit Machine' : 'Create Machine'}
            </DialogTitle>
          </DialogHeader>
          <FormBuilder
            fields={machineFormFields}
            defaultValues={selectedMachine}
            onSubmit={async (data) => {
              if (selectedMachine) {
                await updateMachine.mutateAsync({ id: selectedMachine.id, data });
              } else {
                await createMachine.mutateAsync(data);
              }
              setIsFormOpen(false);
            }}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
```

## 10. Component Testing Strategy

### 10.1 Unit Tests

- Test component rendering
- Test prop variations
- Test user interactions
- Test accessibility

```typescript
// Example: DataTable.test.tsx

describe('DataTable', () => {
  it('renders data correctly', () => {
    render(<DataTable data={mockData} columns={mockColumns} />);
    expect(screen.getByText(mockData[0].name)).toBeInTheDocument();
  });

  it('handles search', () => {
    render(<DataTable data={mockData} columns={mockColumns} searchable />);
    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: 'test' } });
    // Assert filtered results
  });

  it('handles row actions', () => {
    const handleEdit = vi.fn();
    render(
      <DataTable
        data={mockData}
        columns={mockColumns}
        actions={() => [{ label: 'Edit', onClick: handleEdit }]}
      />
    );
    fireEvent.click(screen.getByText('Edit'));
    expect(handleEdit).toHaveBeenCalled();
  });
});
```

## 11. Storybook Integration (Optional but Recommended)

Consider adding Storybook for component documentation and development:

```bash
npm install --save-dev @storybook/react-vite storybook
npx storybook init
```

Benefits:
- Visual component library
- Interactive documentation
- Isolated development
- Design system showcase

## 12. Component Checklist

Before creating a component, ask:

- [ ] Does a similar component already exist?
- [ ] Can I use/extend a shadcn/ui component?
- [ ] Is this component reusable?
- [ ] Does it have clear, type-safe props?
- [ ] Does it handle loading/error states?
- [ ] Is it accessible (ARIA, keyboard navigation)?
- [ ] Is it responsive?
- [ ] Does it support internationalization?
- [ ] Can it be easily tested?

## 13. Summary

This component library provides:

✅ **Reusability**: Every component is designed for reuse
✅ **Consistency**: Consistent UI/UX across the app
✅ **Type Safety**: Full TypeScript support
✅ **Accessibility**: WCAG compliant
✅ **Performance**: Optimized with React Compiler
✅ **Maintainability**: Easy to update and extend
✅ **DRY**: Zero code duplication
✅ **Testability**: Easy to unit test
