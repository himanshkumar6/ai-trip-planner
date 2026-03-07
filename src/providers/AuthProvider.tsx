import { useEffect, ReactNode } from 'react';
import { setupAuthListener } from '@/services/authService';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  useEffect(() => {
    // Initialize the Firebase Auth listener on app mount
    const unsubscribe = setupAuthListener();

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  return <>{children}</>;
}
