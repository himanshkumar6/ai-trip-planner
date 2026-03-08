import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AnimatePresence } from 'framer-motion';

export function MainLayout() {
  const location = useLocation();
  const hideFooter = location.pathname === '/search';

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 w-full bg-saas-gradient relative">
        <AnimatePresence mode="wait">
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}
