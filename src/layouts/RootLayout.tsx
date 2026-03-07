import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AnimatePresence } from 'framer-motion';
import { setupAuthListener } from '@/services/authService';

export function RootLayout() {
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = setupAuthListener();
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 w-full bg-saas-gradient relative">
        <AnimatePresence mode="wait">
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
