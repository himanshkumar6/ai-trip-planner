import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/index';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isInitialized } = useAuthStore();
  const location = useLocation();

  if (!isInitialized) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
