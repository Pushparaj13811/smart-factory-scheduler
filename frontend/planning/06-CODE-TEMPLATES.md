# Code Templates & Quick Reference

This document provides ready-to-use code templates for common patterns in the application.

---

## 1. Feature Module Template

When creating a new feature module, use this structure:

```
features/<feature-name>/
├── components/
│   └── <Feature>Form.tsx
├── hooks/
│   ├── use<Feature>s.ts
│   ├── use<Feature>.ts
│   ├── useCreate<Feature>.ts
│   ├── useUpdate<Feature>.ts
│   └── useDelete<Feature>.ts
├── services/
│   └── <feature>.service.ts
├── types/
│   └── <feature>.types.ts
├── pages/
│   ├── <Feature>sListPage.tsx
│   └── <Feature>DetailPage.tsx
├── routes.tsx
└── index.ts
```

---

## 2. Service Template

```typescript
// src/features/<feature>/services/<feature>.service.ts

import { apiClient } from '@/lib/api-client';
import type { <Feature>, Create<Feature>Dto, Update<Feature>Dto } from '../types/<feature>.types';
import type { PaginatedResponse, QueryParams } from '@/types/api.types';

export const <feature>Service = {
  /**
   * Get all <feature>s with optional filtering
   */
  getAll: async (params?: QueryParams): Promise<PaginatedResponse<<Feature>>> => {
    const response = await apiClient.get('/<features>', { params });
    return response.data;
  },

  /**
   * Get a single <feature> by ID
   */
  getById: async (id: string): Promise<<Feature>> => {
    const response = await apiClient.get(`/<features>/${id}`);
    return response.data;
  },

  /**
   * Create a new <feature>
   */
  create: async (data: Create<Feature>Dto): Promise<<Feature>> => {
    const response = await apiClient.post('/<features>', data);
    return response.data;
  },

  /**
   * Update an existing <feature>
   */
  update: async (id: string, data: Update<Feature>Dto): Promise<<Feature>> => {
    const response = await apiClient.put(`/<features>/${id}`, data);
    return response.data;
  },

  /**
   * Delete a <feature>
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/<features>/${id}`);
  },
};
```

---

## 3. React Query Hooks Template

```typescript
// src/features/<feature>/hooks/use<Feature>s.ts

import { useQuery } from '@tanstack/react-query';
import { <feature>Service } from '../services/<feature>.service';
import { queryKeys } from '@/lib/query-keys';
import type { QueryParams } from '@/types/api.types';

export function use<Feature>s(params?: QueryParams) {
  return useQuery({
    queryKey: queryKeys.<features>.list(JSON.stringify(params)),
    queryFn: () => <feature>Service.getAll(params),
  });
}
```

```typescript
// src/features/<feature>/hooks/use<Feature>.ts

import { useQuery } from '@tanstack/react-query';
import { <feature>Service } from '../services/<feature>.service';
import { queryKeys } from '@/lib/query-keys';

export function use<Feature>(id: string) {
  return useQuery({
    queryKey: queryKeys.<features>.detail(id),
    queryFn: () => <feature>Service.getById(id),
    enabled: !!id,
  });
}
```

```typescript
// src/features/<feature>/hooks/useCreate<Feature>.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { <feature>Service } from '../services/<feature>.service';
import { queryKeys } from '@/lib/query-keys';
import { toast } from 'sonner';

export function useCreate<Feature>() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: <feature>Service.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.<features>.lists() });
      toast.success('<Feature> created successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create <feature>');
    },
  });
}
```

```typescript
// src/features/<feature>/hooks/useUpdate<Feature>.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { <feature>Service } from '../services/<feature>.service';
import { queryKeys } from '@/lib/query-keys';
import { toast } from 'sonner';

export function useUpdate<Feature>() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Update<Feature>Dto }) =>
      <feature>Service.update(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.<features>.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.<features>.detail(data.id) });
      toast.success('<Feature> updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update <feature>');
    },
  });
}
```

```typescript
// src/features/<feature>/hooks/useDelete<Feature>.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { <feature>Service } from '../services/<feature>.service';
import { queryKeys } from '@/lib/query-keys';
import { toast } from 'sonner';

export function useDelete<Feature>() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: <feature>Service.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.<features>.lists() });
      toast.success('<Feature> deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete <feature>');
    },
  });
}
```

---

## 4. CRUD Page Template

```typescript
// src/features/<feature>/pages/<Feature>sListPage.tsx

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DataTable } from '@/components/common/DataTable';
import { PageHeader } from '@/components/common/PageHeader';
import { PermissionGate } from '@/components/guards/PermissionGate';
import { usePermission } from '@/hooks/usePermission';
import { use<Feature>s, useDelete<Feature> } from '../hooks';
import { <Feature>Form } from '../components/<Feature>Form';
import { <feature>Columns } from '../components/<feature>Columns';
import type { <Feature> } from '../types/<feature>.types';

export default function <Feature>sListPage() {
  const { canCreate, canUpdate, canDelete } = usePermission('<FEATURES>');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selected<Feature>, setSelected<Feature>] = useState<<Feature> | null>(null);

  const { data, isLoading } = use<Feature>s();
  const delete<Feature> = useDelete<Feature>();

  const handleEdit = (<feature>: <Feature>) => {
    setSelected<Feature>(<feature>);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this <feature>?')) {
      await delete<Feature>.mutateAsync(id);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelected<Feature>(null);
  };

  const columns = <feature>Columns({
    onEdit: canUpdate ? handleEdit : undefined,
    onDelete: canDelete ? handleDelete : undefined,
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="<Feature>s"
        description="Manage your <feature>s"
        actions={
          <PermissionGate permissions={['<FEATURES>.create']}>
            <Button onClick={() => setIsFormOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add <Feature>
            </Button>
          </PermissionGate>
        }
      />

      <DataTable
        data={data?.data || []}
        columns={columns}
        loading={isLoading}
        searchable
        searchPlaceholder="Search <feature>s..."
        sortable
        pagination
        emptyMessage="No <feature>s found. Create your first <feature> to get started."
      />

      <Dialog open={isFormOpen} onOpenChange={handleCloseForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selected<Feature> ? 'Edit <Feature>' : 'Create <Feature>'}
            </DialogTitle>
          </DialogHeader>
          <<Feature>Form
            <feature>={selected<Feature>}
            onSuccess={handleCloseForm}
            onCancel={handleCloseForm}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
```

---

## 5. Form Component Template

```typescript
// src/features/<feature>/components/<Feature>Form.tsx

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCreate<Feature>, useUpdate<Feature> } from '../hooks';
import type { <Feature> } from '../types/<feature>.types';

const <feature>Schema = z.object({
  name: z.string().min(1, 'Name is required'),
  // Add more fields
});

type <Feature>FormValues = z.infer<typeof <feature>Schema>;

interface <Feature>FormProps {
  <feature>?: <Feature> | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function <Feature>Form({ <feature>, onSuccess, onCancel }: <Feature>FormProps) {
  const create<Feature> = useCreate<Feature>();
  const update<Feature> = useUpdate<Feature>();

  const form = useForm<<Feature>FormValues>({
    resolver: zodResolver(<feature>Schema),
    defaultValues: {
      name: <feature>?.name || '',
      // Add more defaults
    },
  });

  const onSubmit = async (data: <Feature>FormValues) => {
    try {
      if (<feature>) {
        await update<Feature>.mutateAsync({ id: <feature>.id, data });
      } else {
        await create<Feature>.mutateAsync(data);
      }
      onSuccess?.();
    } catch (error) {
      // Error is handled in the mutation
    }
  };

  const isLoading = create<Feature>.isPending || update<Feature>.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter name" disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Add more fields */}

        <div className="flex justify-end gap-3">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : <feature> ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
```

---

## 6. Table Columns Template

```typescript
// src/features/<feature>/components/<feature>Columns.tsx

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { StatusBadge } from '@/components/common/StatusBadge';
import type { <Feature> } from '../types/<feature>.types';

interface <Feature>ColumnsProps {
  onEdit?: (<feature>: <Feature>) => void;
  onDelete?: (id: string) => void;
}

export function <feature>Columns({
  onEdit,
  onDelete,
}: <Feature>ColumnsProps): ColumnDef<<Feature>>[] {
  return [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const <feature> = row.original;
        const hasActions = onEdit || onDelete;

        if (!hasActions) return null;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {onEdit && (
                <DropdownMenuItem onClick={() => onEdit(<feature>)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
              )}
              {onDelete && (
                <DropdownMenuItem
                  onClick={() => onDelete(<feature>.id)}
                  className="text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
```

---

## 7. Types Template

```typescript
// src/features/<feature>/types/<feature>.types.ts

export interface <Feature> {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  industryId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Create<Feature>Dto {
  name: string;
  // Add other fields
}

export interface Update<Feature>Dto {
  name?: string;
  // Add other fields
}

export interface <Feature>QueryParams {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}
```

---

## 8. Query Keys Template

```typescript
// src/lib/query-keys.ts

export const queryKeys = {
  <features>: {
    all: ['<features>'] as const,
    lists: () => [...queryKeys.<features>.all, 'list'] as const,
    list: (filters: string) => [...queryKeys.<features>.lists(), { filters }] as const,
    details: () => [...queryKeys.<features>.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.<features>.details(), id] as const,
  },
  // Add other resources
};
```

---

## 9. Protected Route Usage

```typescript
// In router.tsx

{
  path: '/<features>',
  element: (
    <ProtectedRoute permissions={['<FEATURES>.view']}>
      <<Feature>sListPage />
    </ProtectedRoute>
  ),
}
```

---

## 10. Permission Gate Usage

```typescript
// Hide/show elements based on permissions

<PermissionGate permissions={['<FEATURES>.create']}>
  <Button>Create <Feature></Button>
</PermissionGate>

<PermissionGate
  permissions={['<FEATURES>.update', '<FEATURES>.delete']}
  requireAll={false}  // OR logic
>
  <ActionButtons />
</PermissionGate>
```

---

## 11. Role Gate Usage

```typescript
// Show content only for specific roles

<RoleGate roles={[UserRole.SYSTEM_ADMIN, UserRole.INDUSTRY_OWNER]}>
  <AdminPanel />
</RoleGate>

<RoleGate roles={UserRole.WORKER}>
  <WorkerView />
</RoleGate>
```

---

## 12. Custom Hook Usage

```typescript
// In a component

const { can, canCreate, canUpdate, canDelete } = usePermission('<FEATURES>');

// Check specific permission
if (can('<FEATURES>.create')) {
  // Show create button
}

// Or use boolean flags
{canCreate && <Button>Create</Button>}
```

---

## 13. Toast Notifications

```typescript
import { toast } from 'sonner';

// Success
toast.success('Operation completed successfully');

// Error
toast.error('Something went wrong');

// Warning
toast.warning('Please review your input');

// Info
toast.info('New update available');

// Loading (promise-based)
toast.promise(
  apiCall(),
  {
    loading: 'Saving...',
    success: 'Saved successfully',
    error: 'Failed to save',
  }
);
```

---

## 14. Confirm Dialog Usage

```typescript
import { ConfirmDialog } from '@/components/common/ConfirmDialog';

const [showConfirm, setShowConfirm] = useState(false);

<ConfirmDialog
  open={showConfirm}
  onOpenChange={setShowConfirm}
  title="Delete <Feature>?"
  description="This action cannot be undone. Are you sure?"
  confirmLabel="Delete"
  variant="destructive"
  onConfirm={async () => {
    await delete<Feature>.mutateAsync(id);
    setShowConfirm(false);
  }}
/>
```

---

## 15. i18n Usage

```typescript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('common.welcome')}</h1>
      <p>{t('machines.list.title')}</p>
      <p>{t('common.itemCount', { count: items.length })}</p>
    </div>
  );
}
```

---

## 16. Error Boundary

```typescript
// src/components/common/ErrorBoundary/ErrorBoundary.tsx

import { Component, ReactNode } from 'react';
import { ErrorState } from '@/components/common/ErrorState';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Log to error tracking service
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <ErrorState
          error={this.state.error!}
          onRetry={() => this.setState({ hasError: false })}
        />
      );
    }

    return this.props.children;
  }
}
```

---

## 17. Suspense Usage

```typescript
import { Suspense } from 'react';
import { LoadingState } from '@/components/common/LoadingState';

// Lazy load component
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// Usage
<Suspense fallback={<LoadingState />}>
  <HeavyComponent />
</Suspense>
```

---

## 18. WebSocket Hook

```typescript
// src/hooks/useWebSocket.ts

import { useEffect, useRef } from 'react';
import { useAuthStore } from '@/stores/auth.store';

export function useWebSocket() {
  const socketRef = useRef<WebSocket | null>(null);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (!token) return;

    const ws = new WebSocket(`${import.meta.env.VITE_WS_URL}?token=${token}`);

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socketRef.current = ws;

    return () => {
      ws.close();
    };
  }, [token]);

  const emit = (event: string, data: any) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ event, data }));
    }
  };

  const on = (event: string, callback: (data: any) => void) => {
    if (!socketRef.current) return;

    const handler = (message: MessageEvent) => {
      const { event: msgEvent, data } = JSON.parse(message.data);
      if (msgEvent === event) {
        callback(data);
      }
    };

    socketRef.current.addEventListener('message', handler);

    return () => {
      socketRef.current?.removeEventListener('message', handler);
    };
  };

  return { emit, on };
}
```

---

## 19. File Structure Example

```
src/features/machines/
├── components/
│   ├── MachineForm.tsx
│   ├── MachineCard.tsx
│   ├── MachineStatusIndicator.tsx
│   └── machineColumns.tsx
├── hooks/
│   ├── useMachines.ts
│   ├── useMachine.ts
│   ├── useCreateMachine.ts
│   ├── useUpdateMachine.ts
│   ├── useDeleteMachine.ts
│   └── useToggleMaintenance.ts
├── services/
│   └── machine.service.ts
├── types/
│   └── machine.types.ts
├── pages/
│   ├── MachinesListPage.tsx
│   └── MachineDetailPage.tsx
├── routes.tsx
└── index.ts
```

---

## 20. Best Practices Checklist

When creating a new feature:

- [ ] Create types first
- [ ] Implement service layer
- [ ] Create React Query hooks
- [ ] Build form component with validation
- [ ] Build list page with DataTable
- [ ] Add permission checks
- [ ] Handle loading states
- [ ] Handle error states
- [ ] Handle empty states
- [ ] Add toast notifications
- [ ] Write basic tests
- [ ] Add to router
- [ ] Update navigation menu
- [ ] Document usage

---

## 21. Common Zod Schemas

```typescript
// Email
const emailSchema = z.string().email('Invalid email address');

// Password (min 8 chars, 1 uppercase, 1 number)
const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

// Phone number
const phoneSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number');

// URL
const urlSchema = z.string().url('Invalid URL');

// Required string
const requiredStringSchema = z.string().min(1, 'This field is required');

// Positive number
const positiveNumberSchema = z.number().positive('Must be a positive number');

// Date in future
const futureDateSchema = z.date().refine((date) => date > new Date(), {
  message: 'Date must be in the future',
});
```

---

## 22. Environment Type Definitions

```typescript
// src/vite-env.d.ts

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_WS_URL: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_ENABLE_MOCK_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

---

This templates document provides ready-to-use code for rapid development while maintaining consistency across the application.
