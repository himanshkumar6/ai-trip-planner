import { Container } from '@/layouts/Container';
import { PageWrapper } from '@/layouts/PageWrapper';
import { TripGrid } from '@/components/trips/TripGrid';
import { useTrips } from '@/hooks/useQueryHooks';

export function Destinations() {
  const { data: trips, isLoading } = useTrips();

  return (
    <PageWrapper className="bg-background pt-16 pb-24">
      <Container>
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-4 text-center">
            Top <span className="text-primary italic">Destinations</span>
          </h1>
          <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto">
            Discover breathtaking places around the world curated just for you.
          </p>
        </div>

        <TripGrid trips={trips} isLoading={isLoading} />
      </Container>
    </PageWrapper>
  );
}
