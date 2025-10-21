// Sidebar component with role-based navigation

import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES, getAuthorizedRoutes } from '@/constants/routes';
import type { RouteConfig } from '@/constants/routes';
import type { UserRole } from '@/constants/roles';
import type { Permission } from '@/types/permissions.types';
import { cn } from '@/lib/utils';
import { Factory, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';
import * as Icons from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const { canAny, hasAnyRole } = useAuth();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // Filter routes based on user permissions
  const authorizedRoutes = getAuthorizedRoutes(
    ROUTES.filter((r) => r.showInNav),
    (permission: Permission) => canAny([permission]),
    (roles: UserRole[]) => hasAnyRole(roles)
  );

  const toggleExpanded = (path: string) => {
    setExpandedItems((prev) =>
      prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]
    );
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const renderIcon = (iconName?: string) => {
    if (!iconName) return null;
    const Icon = Icons[iconName as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
    return Icon ? <Icon className="h-5 w-5" /> : null;
  };

  const renderNavItem = (route: RouteConfig) => {
    const hasChildren = route.children && route.children.length > 0;
    const isExpanded = expandedItems.includes(route.path);
    const active = isActive(route.path);

    if (hasChildren) {
      return (
        <div key={route.path}>
          <Button
            variant="ghost"
            className={cn(
              'w-full justify-start gap-3 px-3 py-2 font-normal',
              active && 'bg-accent text-accent-foreground'
            )}
            onClick={() => toggleExpanded(route.path)}
          >
            {renderIcon(route.icon)}
            <span className="flex-1 text-left">{route.title}</span>
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
          {isExpanded && (
            <div className="ml-4 mt-1 space-y-1">
              {route.children?.map((child) => (
                <Link
                  key={child.path}
                  to={child.path}
                  onClick={onClose}
                  className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground',
                    isActive(child.path) && 'bg-accent text-accent-foreground font-medium'
                  )}
                >
                  {renderIcon(child.icon)}
                  <span>{child.title}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={route.path}
        to={route.path}
        onClick={onClose}
        className={cn(
          'flex items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-accent hover:text-accent-foreground',
          active && 'bg-accent text-accent-foreground font-medium'
        )}
      >
        {renderIcon(route.icon)}
        <span>{route.title}</span>
      </Link>
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-screen w-64 border-r bg-background transition-transform duration-300 lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <Factory className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold">Smart Factory</span>
        </div>

        <ScrollArea className="h-[calc(100vh-4rem)] px-3 py-4">
          <nav className="space-y-1">{authorizedRoutes.map(renderNavItem)}</nav>
        </ScrollArea>
      </aside>
    </>
  );
}
