import { Container } from '@/layouts/Container';
import { PageWrapper } from '@/layouts/PageWrapper';
import { TripGrid } from '@/components/trips/TripGrid';
import { useTrips } from '@/hooks/useQueryHooks';
import { useWishlistStore } from '@/store';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';

export function Wishlist() {
  const { data: trips, isLoading } = useTrips();
  const { wishlistTripIds } = useWishlistStore();
  const navigate = useNavigate();

  const wishlistedTrips = trips?.filter((trip) => wishlistTripIds.includes(trip.id));

  return (
    <PageWrapper className="bg-saas-gradient min-h-screen py-8">
      <Container>
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Your Wishlist</h1>
          <p className="text-muted-foreground mt-2 text-lg">Trips you have saved for later.</p>
        </div>

        {wishlistedTrips?.length === 0 && !isLoading ? (
          <div className="text-center py-20 bg-card rounded-2xl border border-border shadow-soft">
            <h3 className="text-xl font-bold mb-2 text-foreground">Your wishlist is empty</h3>
            <p className="text-muted-foreground mb-8 text-lg">Explore our curated trips and save your favorites here.</p>
            <Button size="lg" className="rounded-full px-8 font-bold shadow-lift shadow-primary/20" onClick={() => navigate('/search')}>Explore Destinations</Button>
          </div>
        ) : (
          <TripGrid trips={wishlistedTrips} isLoading={isLoading} skeletonCount={2} />
        )}
      </Container>
    </PageWrapper>
  );
}
