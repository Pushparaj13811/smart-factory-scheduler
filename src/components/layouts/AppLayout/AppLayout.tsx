// Main application layout with sidebar, header, and footer

import { Outlet } from 'react-router-dom';
import { useSidebarStore } from '@/stores';
import { Sidebar } from '../Sidebar';
import { Header } from '../Header';
import { Footer } from '../Footer';

export function AppLayout() {
  const { isMobileSidebarOpen, toggleMobileSidebar, setMobileSidebarOpen } = useSidebarStore();

  const closeSidebar = () => {
    setMobileSidebarOpen(false);
  };

  return (
    <div className="relative flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isMobileSidebarOpen} onClose={closeSidebar} />

      {/* Main content area */}
      <div className="flex flex-1 flex-col lg:ml-64">
        {/* Header */}
        <Header onMenuClick={toggleMobileSidebar} />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-muted/30 p-6">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
