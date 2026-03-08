export interface User {
  uid: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar: string | null;
  createdAt: string;
  lastLogin: string;
}

export interface Trip {
  id: string;
  title: string;
  destination: string;
  price: number;
  durationDays: number;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  description?: string;
  itinerary?: string[];
  category?: string;
  attractions?: string[];
}

export interface Review {
  id: string;
  userId: string;
  tripId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  text: string;
  date: string;
}

export interface Booking {
  id: string;
  userId: string;
  tripId: string;
  guests: number;
  totalPrice: number;
  paymentStatus: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

export interface DayPlan {
  day: number;
  title: string;
  activities: {
    time: string;
    description: string;
    location?: string;
  }[];
}

export interface UserTrip {
  id: string;
  uid: string;
  destination: string;
  days: number;
  budget: 'economy' | 'standard' | 'luxury';
  style: 'adventure' | 'relaxation' | 'culture' | 'family';
  itinerary: DayPlan[];
  imageUrl?: string;
  createdAt: string;
}

