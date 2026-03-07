import { Trip, Review } from '@/types';

const MOCK_TRIPS: Trip[] = [
  {
    id: '1',
    title: 'Bali Paradise Escape',
    destination: 'Bali, Indonesia',
    price: 1299,
    durationDays: 7,
    rating: 4.9,
    reviewsCount: 128,
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
    description: 'Experience the magic of Bali with our curated 7-day escape. From the cultural heart of Ubud to the pristine beaches of Seminyak, immerse yourself in paradise.',
    itinerary: ['Day 1: Arrival & Welcome', 'Day 2: Ubud Cultural Tour', 'Day 3: Mount Batur Sunrise Trek', 'Day 4: Beach Day in Seminyak'],
  },
  {
    id: '2',
    title: 'Swiss Alps Adventure',
    destination: 'Zermatt, Switzerland',
    price: 2499,
    durationDays: 5,
    rating: 4.8,
    reviewsCount: 84,
    imageUrl: 'https://images.unsplash.com/photo-1531366936337-7785c64a851f?w=800&q=80',
  },
  {
    id: '3',
    title: 'Kyoto Cultural Immersion',
    destination: 'Kyoto, Japan',
    price: 1899,
    durationDays: 10,
    rating: 5.0,
    reviewsCount: 256,
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
  },
];

const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    userId: 'u1',
    tripId: '1',
    userName: 'Sarah Jenkins',
    rating: 5,
    text: 'Absolutely breathtaking! The itinerary was perfect and our guide was incredibly knowledgeable.',
    date: '2024-03-15T10:00:00Z',
  },
  {
    id: 'r2',
    userId: 'u2',
    tripId: '2',
    userName: 'Michael Chen',
    rating: 4,
    text: 'Great experience overall. The hotels were top notch, though the last day felt a bit rushed.',
    date: '2024-02-28T14:30:00Z',
  }
];

// In Phase 7, these will be replaced with actual Firestore calls
export const api = {
  getTrips: async (): Promise<Trip[]> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return MOCK_TRIPS;
  },
  getTripById: async (id: string): Promise<Trip | null> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return MOCK_TRIPS.find((t) => t.id === id) || null;
  },
  getReviewsByTripId: async (_tripId: string): Promise<Review[]> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return MOCK_REVIEWS;
  },
};
