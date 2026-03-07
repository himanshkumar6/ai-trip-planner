import * as React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { PlaneTakeoff, Menu, X, User } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Dropdown, DropdownItem } from '@/components/ui/Dropdown'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeToggle } from '@/components/ThemeToggle'
import { useAuthStore } from '@/store'
import { logoutUser } from '@/services/authService'

export function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const { user, isAuthenticated, isAdmin } = useAuthStore()

  const handleLogout = async () => {
    try {
      await logoutUser()
      navigate('/')
      setMobileMenuOpen(false)
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <header className="sticky top-0 z-[100] w-full border-b border-border bg-background/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary/10 p-1.5 rounded-lg">
              <PlaneTakeoff className="h-5 w-5 text-primary" />
            </div>
            <span className="font-bold text-xl text-foreground italic">
              TripMate
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/search" className="nav-link">Explore</Link>
            <Link to="/search?type=destinations" className="nav-link">
              Destinations
            </Link>
            <Link to="/offers" className="nav-link">Offers</Link>

            {isAuthenticated && (
              <Link to="/dashboard" className="nav-link">
                My Trips
              </Link>
            )}
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-3">

            <ThemeToggle />

            {isAuthenticated ? (
              <Dropdown
                trigger={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full overflow-hidden"
                  >
                    {user?.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                  </Button>
                }
              >
                <DropdownItem onClick={() => navigate('/dashboard')}>
                  Dashboard
                </DropdownItem>

                <DropdownItem
                  onClick={() => navigate('/dashboard/profile')}
                >
                  Profile
                </DropdownItem>

                <DropdownItem
                  className="text-destructive"
                  onClick={handleLogout}
                >
                  Logout
                </DropdownItem>
              </Dropdown>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Button
                  variant="ghost"
                  onClick={() => navigate('/login')}
                >
                  Log in
                </Button>

                <Button onClick={() => navigate('/register')}>
                  Sign up
                </Button>
              </div>
            )}

            {/* Hamburger */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>

          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl"
          >
            <div className="px-6 py-6 flex flex-col space-y-4">

              <Link
                to="/search"
                onClick={() => setMobileMenuOpen(false)}
                className="mobile-nav-link"
              >
                Explore
              </Link>

              <Link
                to="/search?type=destinations"
                onClick={() => setMobileMenuOpen(false)}
                className="mobile-nav-link"
              >
                Destinations
              </Link>

              <Link
                to="/offers"
                onClick={() => setMobileMenuOpen(false)}
                className="mobile-nav-link"
              >
                Offers
              </Link>

              {isAuthenticated && (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="mobile-nav-link"
                  >
                    Dashboard
                  </Link>

                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="mt-3"
                  >
                    Logout
                  </Button>
                </>
              )}

              {!isAuthenticated && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigate('/login')
                      setMobileMenuOpen(false)
                    }}
                  >
                    Log in
                  </Button>

                  <Button
                    onClick={() => {
                      navigate('/register')
                      setMobileMenuOpen(false)
                    }}
                  >
                    Sign up
                  </Button>
                </>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}