import { Container } from '@/layouts/Container';
import { PageWrapper } from '@/layouts/PageWrapper';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Clock, MapPin, Loader2, Sparkles } from 'lucide-react';
import { useAuthStore, useWishlistStore } from '@/store';
import { useUserBookings, useTrips } from '@/hooks/useQueryHooks';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const { user } = useAuthStore();
  const { wishlistTripIds } = useWishlistStore();
  const navigate = useNavigate();

  const { data: bookings, isLoading: bookingsLoading } = useUserBookings(user?.uid || '');
  const { data: trips } = useTrips();

  const activeBookings = bookings?.filter(b => b.paymentStatus === 'completed' || b.paymentStatus === 'pending') || [];
  const pastTripsCount = 0; // Placeholder for past trips calculation

  return (
    <PageWrapper className="py-8 min-h-screen">
      <Container>
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome back, {user?.displayName || 'Traveler'}!</h1>
          <p className="text-muted-foreground mt-2 text-lg">Here is an overview of your bookings and activities.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lift transition-all duration-300">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
              <span className="text-5xl font-extrabold text-primary mb-2">{activeBookings.length}</span>
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Active Bookings</span>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lift transition-all duration-300">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
              <span className="text-5xl font-extrabold text-primary mb-2">{pastTripsCount}</span>
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Past Trips</span>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lift transition-all duration-300 cursor-pointer" onClick={() => navigate('/dashboard/wishlist')}>
            <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
              <span className="text-5xl font-extrabold text-primary mb-2">{wishlistTripIds.length}</span>
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Saved Trips</span>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">Generated AI Trips</h2>

        <div className="text-center py-16 bg-card rounded-2xl border border-border shadow-soft">
          <h3 className="text-xl font-bold mb-2 text-foreground">Your custom trips will appear here</h3>
          <p className="text-muted-foreground mb-8">Let's craft your next perfect itinerary together.</p>
          <Button onClick={() => navigate('/dashboard/generate')} className="font-bold shadow-md shadow-primary/20">
            <Sparkles className="mr-2 h-4 w-4" />
            Generate New Trip
          </Button>
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6 mt-16">Upcoming Bookings</h2>

        {bookingsLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : activeBookings.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-2xl border border-border shadow-soft">
            <h3 className="text-xl font-bold mb-2 text-foreground">No active bookings yet</h3>
            <p className="text-muted-foreground mb-8">Time to plan your next adventure!</p>
            <Button onClick={() => navigate('/search')} className="font-bold shadow-md shadow-primary/20">Explore Destinations</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeBookings.map((booking) => {
              const trip = trips?.find(t => t.id === booking.tripId);
              if (!trip) return null;

              return (
                <Card key={booking.id} className="hover:shadow-lift transition-all duration-300 overflow-hidden border border-border">
                  <CardContent className="p-0 flex flex-col sm:flex-row h-full">
                    <div className="sm:w-2/5 h-48 sm:h-auto overflow-hidden">
                      <img
                        src={trip.imageUrl || 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80'}
                        alt={trip.title}
                        className="w-full h-full object-cover transition-transform hover:scale-110 duration-700"
                      />
                    </div>
                    <div className="p-6 sm:w-3/5 flex flex-col">
                      <div className="flex items-center gap-1.5 text-xs text-primary font-bold mb-3 bg-primary/10 w-fit px-3 py-1.5 rounded-full border border-primary/10">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="uppercase tracking-wider">{booking.paymentStatus}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-foreground line-clamp-2">{trip.title}</h3>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6 font-medium">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{trip.destination}</span>
                      </div>
                      <div className="mt-auto flex gap-3">
                        <Button variant="outline" className="flex-1 font-semibold rounded-full hover:bg-muted transition-colors" onClick={() => navigate(`/trips/${trip.id}`)}>
                          View Trip Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </Container>
    </PageWrapper>
  );
}
