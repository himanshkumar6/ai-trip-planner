import { Container } from '@/layouts/Container';
import { PageWrapper } from '@/layouts/PageWrapper';
import { TripGrid } from '@/components/trips/TripGrid';
import { useTrips } from '@/hooks/useQueryHooks';

export function Tours() {
  const { data: trips, isLoading } = useTrips();

  return (
    <PageWrapper className="bg-background pt-16 pb-24">
      <Container>
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-4 text-center">
            Guided <span className="text-primary italic">Tours</span>
          </h1>
          <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto">
            Experience the world with our expert guides and curated itineraries.
          </p>
        </div>

        <TripGrid trips={trips?.slice(2, 5)} isLoading={isLoading} />
      </Container>
    </PageWrapper>
  );
}
