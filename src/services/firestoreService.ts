import { collection, doc, getDoc, getDocs, query, where, addDoc, serverTimestamp, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Trip, Review, Booking } from '@/types';

// Trips
export const getTrips = async (): Promise<Trip[]> => {
  const q = query(collection(db, 'trips'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Trip));
};

export const getTripById = async (id: string): Promise<Trip | null> => {
  const docRef = doc(db, 'trips', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Trip;
  }
  return null;
};

// Reviews
export const getReviewsByTripId = async (tripId: string): Promise<Review[]> => {
  const q = query(
    collection(db, 'reviews'), 
    where('tripId', '==', tripId),
    orderBy('createdAt', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    return { 
      id: doc.id,
      ...data,
      // Handle timestamp transformation if necessary
      date: data.createdAt?.toDate().toISOString() || data.date 
    } as Review;
  });
};

export const createReview = async (reviewData: Omit<Review, 'id' | 'date'>) => {
  const collectionRef = collection(db, 'reviews');
  const docRef = await addDoc(collectionRef, {
    ...reviewData,
    createdAt: serverTimestamp()
  });
  return docRef.id;
};

// Bookings
export const getUserBookings = async (userId: string): Promise<Booking[]> => {
  const q = query(
    collection(db, 'bookings'), 
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    return { 
      id: doc.id, 
      ...data,
      createdAt: data.createdAt?.toDate().toISOString() 
    } as Booking;
  });
};

export const createBooking = async (bookingData: Omit<Booking, 'id' | 'createdAt'>) => {
  const collectionRef = collection(db, 'bookings');
  const docRef = await addDoc(collectionRef, {
    ...bookingData,
    createdAt: serverTimestamp()
  });
  return docRef.id;
};

// --- Admin Operations ---

export const getAllBookings = async (): Promise<Booking[]> => {
  const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    return { 
      id: doc.id, 
      ...data,
      createdAt: data.createdAt?.toDate().toISOString() 
    } as Booking;
  });
};

import { User } from '@/types';

export const getAllUsers = async (): Promise<User[]> => {
  const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    return { 
      uid: doc.id, 
      ...data,
      createdAt: data.createdAt?.toDate?.() ? data.createdAt.toDate().toISOString() : data.createdAt 
    } as User;
  });
};

export const createTrip = async (tripData: Omit<Trip, 'id'>) => {
  const collectionRef = collection(db, 'trips');
  const docRef = await addDoc(collectionRef, tripData);
  return docRef.id;
};

import { updateDoc, deleteDoc } from 'firebase/firestore';

export const updateTrip = async (id: string, tripData: Partial<Trip>) => {
  const docRef = doc(db, 'trips', id);
  await updateDoc(docRef, tripData);
};

export const deleteTrip = async (id: string) => {
  const docRef = doc(db, 'trips', id);
  await deleteDoc(docRef);
};
