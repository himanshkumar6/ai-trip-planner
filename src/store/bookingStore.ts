import { create } from 'zustand';

// Client-side transient booking state (no need for localStorage persistence)
interface BookingState {
  selectedTripId: string | null;
  guests: number;
  selectedDate: Date | null;
  
  setTrip: (tripId: string) => void;
  setGuests: (count: number) => void;
  setDate: (date: Date | null) => void;
  resetBooking: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  selectedTripId: null,
  guests: 1,
  selectedDate: null,

  setTrip: (tripId) => set({ selectedTripId: tripId }),
  setGuests: (count) => set({ guests: Math.max(1, count) }), // Ensure at least 1 guest
  setDate: (date) => set({ selectedDate: date }),
  
  resetBooking: () => set({
    selectedTripId: null,
    guests: 1,
    selectedDate: null,
  }),
}));
