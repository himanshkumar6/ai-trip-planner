import { ReactNode, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, Settings, Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/utils/cn';

function AdminSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const location = useLocation();
  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/admin', exact: true },
    { label: 'Manage Trips', icon: Settings, path: '/admin/manage-trips' },
    { label: 'Add Trip', icon: PlusCircle, path: '/admin/add-trip' },
  ];

  const isActive = (path: string, exact?: boolean) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex flex-col h-full bg-card border-r border-border text-foreground">
      <div className="p-6 border-b border-border flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-primary-gradient flex items-center justify-center shadow-md">
          <span className="text-white font-bold text-lg italic">A</span>
        </div>
        <span className="text-xl font-bold tracking-tight">Admin<span className="text-primary italic">Panel</span></span>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium transition-all duration-200",
              isActive(item.path, item.exact)
                ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <Link to="/" className="flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-muted-foreground hover:bg-muted transition-all duration-200">
          <Globe className="h-5 w-5" />
          Return to Site
        </Link>
      </div>
    </div>
  );
}

export function AdminLayout({ children }: { children?: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden text-foreground">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-72 h-full z-10 relative">
        <AdminSidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
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
            <div className="absolute top-4 right-4 focus:outline-none z-50">
              <Button variant="ghost" size="icon" className="hover:bg-muted" onClick={() => setIsSidebarOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <AdminSidebar onNavigate={() => setIsSidebarOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-muted/10 relative">
        {/* Top Header (Mobile only) */}
        <header className="lg:hidden h-16 bg-card border-b border-border flex items-center px-4 justify-between flex-shrink-0 z-30 shadow-subtle">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg tracking-tight">Admin<span className="text-primary italic">Panel</span></span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </header>

        {/* Global Desktop Header Tools */}
        <div className="hidden lg:flex absolute top-4 right-8 z-20">
          <ThemeToggle />
        </div>

        {/* Scrollable Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}
