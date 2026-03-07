import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistState {
  wishlistTripIds: string[];
  addToWishlist: (tripId: string) => void;
  removeFromWishlist: (tripId: string) => void;
  toggleWishlist: (tripId: string) => void;
  hasInWishlist: (tripId: string) => boolean;
  syncWishlistWithServer: (serverTripIds: string[]) => void;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlistTripIds: [],
      
      addToWishlist: (tripId) => 
        set((state) => ({
          wishlistTripIds: state.wishlistTripIds.includes(tripId) 
            ? state.wishlistTripIds 
            : [...state.wishlistTripIds, tripId],
        })),
        
      removeFromWishlist: (tripId) => 
        set((state) => ({
          wishlistTripIds: state.wishlistTripIds.filter(id => id !== tripId),
        })),

      toggleWishlist: (tripId) => {
        const state = get();
        if (state.hasInWishlist(tripId)) {
          state.removeFromWishlist(tripId);
        } else {
          state.addToWishlist(tripId);
        }
      },
        
      hasInWishlist: (tripId) => {
        return get().wishlistTripIds.includes(tripId);
      },

      syncWishlistWithServer: (serverTripIds) => 
        set({ wishlistTripIds: serverTripIds }),
        
      clearWishlist: () => set({ wishlistTripIds: [] }),
    }),
    {
      name: 'tripmate-wishlist',
    }
  )
);
