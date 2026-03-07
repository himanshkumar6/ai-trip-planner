import { UserTrip, DayPlan } from '@/types';

// Mock AI response latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateAIItinerary = async (
  destination: string,
  days: number,
  budget: string,
  style: string
): Promise<DayPlan[]> => {
  await delay(2000); // Simulate AI generation time

  const itinerary: DayPlan[] = [];

  for (let i = 1; i <= days; i++) {
    itinerary.push({
      day: i,
      title: `Day ${i}: Exploring ${destination}`,
      activities: [
        {
          time: "09:00 AM",
          description: `Breakfast at a local cafe and orientation in ${destination}.`,
          location: "City Center"
        },
        {
          time: "11:30 AM",
          description: `Visit to prime ${style} landmarks and sightseeing.`,
          location: "Major Sight"
        },
        {
          time: "01:30 PM",
          description: `Enjoy an ${budget}-friendly lunch featuring local specialties.`,
          location: "Local Restaurant"
        },
        {
          time: "03:30 PM",
          description: `Deep dive into ${style} activities and local culture experiences.`,
          location: "Cultural Quarter"
        },
        {
          time: "07:00 PM",
          description: "Leisurely evening walk and dinner at a recommended spot.",
          location: "Riverside/Plaza"
        }
      ]
    });
  }

  return itinerary;
};

import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const saveUserTrip = async (uid: string, tripData: Omit<UserTrip, 'id' | 'uid' | 'createdAt'>) => {
  const tripRef = collection(db, 'user_trips');
  const docRef = await addDoc(tripRef, {
    uid,
    ...tripData,
    createdAt: new Date().toISOString()
  });
  return docRef.id;
};
