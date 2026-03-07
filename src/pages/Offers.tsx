import { Container } from '@/layouts/Container';
import { PageWrapper } from '@/layouts/PageWrapper';
import { TripGrid } from '@/components/trips/TripGrid';
import { useTrips } from '@/hooks/useQueryHooks';

export function Offers() {
  const { data: trips, isLoading } = useTrips();

  return (
    <PageWrapper className="bg-background pt-16 pb-24">
      <Container>
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-4 text-center">
            Exclusive <span className="text-primary italic">Offers</span>
          </h1>
          <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto">
            Find the best deals and limited-time discounts for your next adventure.
          </p>
        </div>

        <TripGrid trips={trips?.slice(0, 2)} isLoading={isLoading} />
      </Container>
    </PageWrapper>
  );
}
