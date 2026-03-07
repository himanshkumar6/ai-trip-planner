import { useQuery } from '@tanstack/react-query';
import { getTrips, getTripById, getReviewsByTripId, getUserBookings } from '@/services/firestoreService';

export function useTrips() {
  return useQuery({
    queryKey: ['trips'],
    queryFn: () => getTrips(),
  });
}

export function useTrip(id: string) {
  return useQuery({
    queryKey: ['trip', id],
    queryFn: () => getTripById(id),
    enabled: !!id,
  });
}

export function useTripReviews(tripId: string) {
  return useQuery({
    queryKey: ['reviews', tripId],
    queryFn: () => getReviewsByTripId(tripId),
    enabled: !!tripId,
  });
}

export function useUserBookings(userId: string) {
  return useQuery({
    queryKey: ['bookings', userId],
    queryFn: () => getUserBookings(userId),
    enabled: !!userId,
  });
}

import { getAllBookings, getAllUsers } from '@/services/firestoreService';

export function useAllBookings() {
  return useQuery({
    queryKey: ['admin-bookings'],
    queryFn: () => getAllBookings(),
  });
}

export function useAllUsers() {
  return useQuery({
    queryKey: ['admin-users'],
    queryFn: () => getAllUsers(),
  });
}
