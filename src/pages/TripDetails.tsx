import { useParams, useNavigate } from 'react-router-dom';
import { Container } from '@/layouts/Container';
import { PageWrapper } from '@/layouts/PageWrapper';
import { useTrip, useTripReviews } from '@/hooks/useQueryHooks';
import { useBookingStore } from '@/store/index';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { ReviewList } from '@/components/trips/ReviewList';
import { MapPin, Clock, Star, CalendarDays, CheckCircle2 } from 'lucide-react';

export function TripDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: trip, isLoading: isTripLoading } = useTrip(id || '');
  const { data: reviews = [], isLoading: isReviewsLoading } = useTripReviews(id || '');
  const { setDate, setTrip, setGuests } = useBookingStore();

  if (isTripLoading) {
    return (
      <PageWrapper>
        <Container className="py-8">
          <Skeleton className="w-full h-[400px] rounded-2xl mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-32 w-full" />
            </div>
            <div className="lg:col-span-1">
              <Skeleton className="h-[300px] w-full rounded-2xl" />
            </div>
          </div>
        </Container>
      </PageWrapper>
    );
  }

  if (!trip) {
    return (
      <PageWrapper className="flex items-center justify-center">
        <h2 className="text-2xl font-semibold">Trip not found</h2>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper className="bg-gray-50 pb-20">
      {/* Hero Image Gallery */}
      <div className="relative h-[40vh] md:h-[50vh] min-h-[400px] w-full">
        <img
          src={trip.imageUrl}
          alt={trip.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <Container className="absolute bottom-0 left-0 right-0 pb-8 text-white">
          <div className="flex items-center gap-2 mb-2 text-white/90">
            <MapPin className="h-5 w-5" />
            <span className="text-lg font-medium">{trip.destination}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{trip.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
            <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{trip.rating}</span>
              <span className="text-white/80">({trip.reviewsCount} reviews)</span>
            </div>
            <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full">
              <Clock className="h-4 w-4" />
              <span>{trip.durationDays} Days</span>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About this trip</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {trip.description || 'Join us for an unforgettable journey exploring beautiful destinations with expert guides and premium accommodations.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Itinerary</h2>
              <div className="space-y-4">
                {trip.itinerary?.map((day, index) => (
                  <div key={index} className="flex gap-4 p-4 rounded-xl bg-white border shadow-sm">
                    <div className="flex flex-col items-center">
                      <div className="bg-primary/10 text-primary h-10 w-10 rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      {index !== trip.itinerary!.length - 1 && (
                        <div className="h-full w-px bg-gray-200 my-2" />
                      )}
                    </div>
                    <div className="pt-2">
                      <h4 className="font-semibold text-lg text-gray-900">{day}</h4>
                      <p className="text-gray-500 mt-1">Detailed activities for the day...</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Guest Reviews</h2>
              {isReviewsLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-32 w-full rounded-xl" />
                  <Skeleton className="h-32 w-full rounded-xl" />
                </div>
              ) : (
                <ReviewList reviews={reviews} />
              )}
            </section>
          </div>

          {/* Sticky Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="border-primary/20 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex justify-between items-end mb-6">
                    <div>
                      <span className="text-gray-500 text-sm block mb-1">Price per person</span>
                      <span className="text-3xl font-bold text-gray-900">${trip.price}</span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <CalendarDays className="text-primary h-5 w-5" />
                        <div>
                          <p className="text-sm font-medium">Select Date</p>
                          <p className="text-xs text-gray-500">Multiple dates available</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setDate(new Date())}>Edit</Button>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="w-full text-lg h-14 mb-4 shadow-lift"
                    onClick={() => {
                      setTrip(trip.id);
                      setGuests(1);
                      navigate(`/checkout/${trip.id}`);
                    }}
                  >
                    Book Now
                  </Button>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Free cancellation up to 48 hours</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Secure payment via Razorpay</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>24/7 dedicated support</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

        </div>
      </Container>
    </PageWrapper>
  );
}
