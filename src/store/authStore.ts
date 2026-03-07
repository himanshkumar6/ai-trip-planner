import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: 'user' | 'admin';
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isInitialized: boolean;
  setUser: (user: AuthUser | null) => void;
  setInitialized: (initialized: boolean) => void;
  // Note: We removed the manual login/logout overrides to ensure 
  // onAuthStateChanged is the single source of truth for the UI.
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isAdmin: false,
      isInitialized: false,
      
      setUser: (user) => set({ 
        user, 
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isInitialized: true
      }),
      
      setInitialized: (isInitialized) => set({ isInitialized }),
    }),
    {
      name: 'tripmate-auth',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated, 
        isAdmin: state.isAdmin 
      }),
    }
  )
);
