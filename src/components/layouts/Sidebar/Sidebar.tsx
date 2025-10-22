// Sidebar component with role-based navigation

import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import { useNavigationStore } from '@/stores';
import { ROUTES, getAuthorizedRoutes } from '@/constants/routes';
import type { RouteConfig } from '@/constants/routes';
import type { UserRole } from '@/constants/roles';
import type { Permission } from '@/types/permissions.types';
import { cn } from '@/lib/utils';
import { Factory, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import * as Icons from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const { t } = useTranslation();
  const { canAny, hasAnyRole } = useAuth();
  const { expandedItems, toggleItem } = useNavigationStore();

  // Filter routes based on user permissions
  const authorizedRoutes = getAuthorizedRoutes(
    ROUTES.filter((r) => r.showInNav),
    (permission: Permission) => canAny([permission]),
    (roles: UserRole[]) => hasAnyRole(roles)
  );

  const toggleExpanded = (path: string) => {
    toggleItem(path);
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

  const getTranslatedTitle = (route: RouteConfig) => {
    return route.translationKey ? t(route.translationKey) : route.title;
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
              'w-full justify-start gap-3 px-3 py-2 font-normal text-white/90 hover:text-white hover:bg-white/15 transition-all duration-200',
              active && 'bg-white/20 text-white font-medium shadow-lg'
            )}
            onClick={() => toggleExpanded(route.path)}
          >
            {renderIcon(route.icon)}
            <span className="flex-1 text-left">{getTranslatedTitle(route)}</span>
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
          {isExpanded && (
            <div className="ml-4 mt-1 space-y-1 border-l-2 border-white/20 pl-2">
              {route.children?.map((child) => (
                <Link
                  key={child.path}
                  to={child.path}
                  onClick={onClose}
                  className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white hover:translate-x-1',
                    isActive(child.path) && 'bg-white/15 text-white font-medium shadow-md'
                  )}
                >
                  {renderIcon(child.icon)}
                  <span>{getTranslatedTitle(child)}</span>
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
          'flex items-center gap-3 rounded-md px-3 py-2 text-white/90 transition-all duration-200 hover:bg-white/15 hover:text-white hover:translate-x-1',
          active && 'bg-white/20 text-white font-medium shadow-lg'
        )}
      >
        {renderIcon(route.icon)}
        <span>{getTranslatedTitle(route)}</span>
      </Link>
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-screen w-64 border-r gradient-primary shadow-xl transition-transform duration-300 lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header with gradient */}
        <div className="flex h-16 items-center gap-3 border-b border-white/10 px-6 bg-black/10">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
            <Factory className="h-6 w-6 text-white drop-shadow-lg" />
          </div>
          <span className="text-lg font-bold text-white drop-shadow-md">Smart Factory</span>
        </div>

        {/* Navigation */}
        <ScrollArea className="h-[calc(100vh-4rem)] px-3 py-4">
          <nav className="space-y-1">{authorizedRoutes.map(renderNavItem)}</nav>
        </ScrollArea>

        {/* Bottom gradient overlay for depth */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent" />
      </aside>
    </>
  );
}
