import { ReactNode, useState } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { AnimatePresence, motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';

import { ThemeToggle } from '@/components/ThemeToggle';

export function DashboardLayout({ children }: { children?: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden text-foreground">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-72 h-full">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 w-72 bg-card z-50 lg:hidden shadow-2xl"
          >
            <div className="absolute top-4 right-4 focus:outline-none">
              <Button variant="ghost" size="sm" onClick={() => setIsSidebarOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <Sidebar onNavigate={() => setIsSidebarOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header (Mobile only) */}
        <header className="lg:hidden h-16 bg-background border-b border-border flex items-center px-4 justify-between flex-shrink-0 z-30">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary-gradient flex items-center justify-center">
              <span className="text-white font-bold text-lg italic">A</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground italic">TravelAI</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </header>

        {/* Scrollable Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}
