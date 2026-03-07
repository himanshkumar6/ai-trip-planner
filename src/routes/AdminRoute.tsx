import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/index';
import { Loader2 } from 'lucide-react';

export function AdminRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isAdmin, isInitialized } = useAuthStore();
  const location = useLocation();

  if (!isInitialized) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
