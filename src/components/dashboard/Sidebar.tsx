import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Sparkles,
  Map as MapIcon,
  Heart,
  Settings,
  LogOut,
  PlaneTakeoff
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { useAuthStore } from '@/store';
import { logoutUser } from '@/services/authService';

interface SidebarProps {
  onNavigate?: () => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
    { icon: Sparkles, label: 'Generate Trip', path: '/dashboard/generate' },
    { icon: MapIcon, label: 'My Trips', path: '/dashboard/trips' },
    { icon: Heart, label: 'Wishlist', path: '/dashboard/wishlist' },
    { icon: Settings, label: 'Profile Settings', path: '/dashboard/profile' },
  ];

  return (
    <aside className="h-full flex flex-col bg-card border-r border-border shadow-sm">
      {/* Brand */}
      <div className="p-6">
        <NavLink to="/" className="flex items-center gap-3 decoration-transparent">
          <div className="h-10 w-10 rounded-xl bg-primary-gradient flex items-center justify-center shadow-lg shadow-primary/20">
            <PlaneTakeoff className="text-white h-6 w-6" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-foreground italic">TravelAI</span>
        </NavLink>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1 mt-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onNavigate}
            end={item.path === '/dashboard'}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 group",
              isActive
                ? "bg-primary/10 text-primary shadow-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <item.icon className={cn(
              "h-5 w-5 transition-colors",
              location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/dashboard')
                ? "text-primary"
                : "text-muted-foreground group-hover:text-foreground"
            )} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* User & Logout */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center gap-3 px-2 mb-4">
          <div className="h-10 w-10 rounded-full bg-primary-gradient flex items-center justify-center text-white font-bold ring-2 ring-background shadow-sm overflow-hidden">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="User" className="h-full w-full object-cover" />
            ) : (
              user?.displayName?.[0] || 'U'
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-foreground truncate">{user?.displayName || 'Traveler'}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold text-destructive hover:bg-destructive/10 rounded-xl transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
