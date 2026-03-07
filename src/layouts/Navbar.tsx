import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlaneTakeoff, Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Dropdown, DropdownItem } from '@/components/ui/Dropdown';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAuthStore } from '@/store';
import { logoutUser } from '@/services/authService';
import { useLocation } from 'react-router-dom';

export function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Zustand State
  const { user, isAuthenticated, isAdmin } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/');
      setMobileMenuOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="sticky top-0 z-[100] w-full border-b border-border bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Left: Logo */}
          <Link to="/" className="flex items-center space-x-2 shrink-0">
            <div className="bg-primary/10 p-1.5 rounded-lg">
              <PlaneTakeoff className="h-5 w-5 text-primary" />
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:inline-block text-foreground italic">
              TripMate
            </span>
          </Link>

          {/* Center: Desktop Nav Links */}
          <nav className="hidden md:flex items-center justify-center flex-1 max-w-md">
            <div className="flex items-center space-x-1 bg-muted/30 p-1 rounded-full border border-border/40 backdrop-blur-sm">
              <Link
                to="/search"
                className="px-4 py-1.5 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-background transition-all duration-200"
              >
                Explore
              </Link>
              <Link
                to="/search?type=destinations"
                className="px-4 py-1.5 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-background transition-all duration-200"
              >
                Destinations
              </Link>
              {isAuthenticated && (
                <Link
                  to="/dashboard"
                  className="px-4 py-1.5 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-background transition-all duration-200"
                >
                  My Trips
                </Link>
              )}
            </div>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center border-r border-border pr-3 space-x-1">
              <ThemeToggle />
            </div>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4 ml-1">
                {isAdmin && (
                  <Link to="/admin" className="hidden lg:block text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors">
                    Admin
                  </Link>
                )}
                <Dropdown
                  trigger={
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-full overflow-hidden bg-muted/40 hover:bg-muted p-0 border border-border/50 ring-offset-background transition-all hover:ring-2 hover:ring-primary/20"
                    >
                      {user?.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt="Avatar"
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center rounded-full bg-primary/10 text-primary">
                          <User className="h-4 w-4" />
                        </div>
                      )}
                    </Button>
                  }
                  align="right"
                >
                  <div className="px-4 py-3 border-b border-border bg-muted">
                    <p className="font-bold text-foreground text-sm truncate leading-none mb-1.5">
                      {user?.displayName || "User"}
                    </p>

                    <p className="text-muted-foreground text-xs truncate max-w-[180px] font-medium">
                      {user?.email}
                    </p>
                  </div>

                  <DropdownItem onClick={() => navigate("/dashboard")}>
                    Dashboard
                  </DropdownItem>

                  <DropdownItem onClick={() => navigate("/dashboard/wishlist")}>
                    Wishlist
                  </DropdownItem>

                  <DropdownItem onClick={() => navigate("/dashboard/profile")}>
                    Profile Settings
                  </DropdownItem>

                  <div className="border-t border-border my-1"></div>

                  <DropdownItem
                    className="text-destructive !font-semibold"
                    onClick={handleLogout}
                  >
                    Log out
                  </DropdownItem>
                </Dropdown>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="hidden sm:block">
                  <Button variant="ghost" size="sm" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                    Log in
                  </Button>
                </Link>
                <Link to="/register" className="hidden sm:block">
                  <Button size="sm" className="px-4 shadow-lift">Sign up</Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="h-9 w-9 rounded-lg hover:bg-muted">
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-background z-[150] flex flex-col p-6 md:hidden overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-8">
              <Link to="/" className="flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
                <PlaneTakeoff className="h-5 w-5 text-primary" />
                <span className="font-bold text-xl text-foreground italic">TripMate</span>
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} className="h-10 w-10">
                <X className="h-6 w-6" />
              </Button>
            </div>

            <nav className="flex flex-col space-y-2">
              <Link
                to="/search"
                className="text-lg font-semibold text-foreground py-3 border-b border-border flex items-center justify-between"
                onClick={() => setMobileMenuOpen(false)}
              >
                Explore Destinations
                <span className="text-muted-foreground">→</span>
              </Link>

              {isAuthenticated ? (
                <>
                  {isAdmin && (
                    <Link to="/admin" className="text-lg font-semibold text-foreground py-3 border-b border-border flex items-center justify-between" onClick={() => setMobileMenuOpen(false)}>
                      Admin Panel
                      <span className="text-muted-foreground">→</span>
                    </Link>
                  )}
                  <Link to="/dashboard" className="text-lg font-semibold text-foreground py-3 border-b border-border flex items-center justify-between" onClick={() => setMobileMenuOpen(false)}>
                    Dashboard
                    <span className="text-muted-foreground">→</span>
                  </Link>
                  <Link to="/dashboard/wishlist" className="text-lg font-semibold text-foreground py-3 border-b border-border flex items-center justify-between" onClick={() => setMobileMenuOpen(false)}>
                    Wishlist
                    <span className="text-muted-foreground">→</span>
                  </Link>
                  <Link to="/dashboard/profile" className="text-lg font-semibold text-foreground py-3 border-b border-border flex items-center justify-between" onClick={() => setMobileMenuOpen(false)}>
                    Profile Settings
                    <span className="text-muted-foreground">→</span>
                  </Link>
                  <div className="pt-6">
                    <Button variant="outline" className="w-full h-12 text-destructive border-border hover:bg-destructive/10" onClick={handleLogout}>
                      Log out
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col space-y-4 pt-6">
                  <Button
                    variant="outline"
                    className="w-full justify-center h-12 text-base font-semibold"
                    onClick={() => { navigate('/login'); setMobileMenuOpen(false); }}
                  >
                    Log in
                  </Button>
                  {location.pathname !== '/register' && (
                    <Button
                      className="w-full justify-center h-12 text-base font-semibold"
                      onClick={() => { navigate('/register'); setMobileMenuOpen(false); }}
                    >
                      Sign up
                    </Button>
                  )}
                </div>
              )}
            </nav>

            <div className="mt-auto pt-10 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm font-medium">Appearance</span>
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
